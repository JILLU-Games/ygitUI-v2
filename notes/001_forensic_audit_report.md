# YGIT PLATFORM UI — FORENSIC DESIGN & ARCHITECTURE AUDIT REPORT
**Document ID:** `YGIT-DOC-001-AUDIT`  
**Date:** November 8, 2026  
**Status:** `AUDITED — PENDING IMPLEMENTATION AUTHORIZATION`  
**Auditor:** Senior Forensic Software Engineer  
**Audit Scope:** 100% Comprehensive Codebase Forensic Scan (`src/`, `components/`, `features/`, `layouts/`, `styles/`, `index.html`)  

---

## 1. Executive Forensic Summary & Key Metrics

A comprehensive line-by-line static analysis of all source files in `src/` and `index.html` was conducted to identify all violations against the **YGIT UI & Architecture Guidelines** and the user's explicit design constitution:

| Metric Category | Count / State | System Requirement | Audit Finding |
| :--- | :--- | :--- | :--- |
| **Hardcoded Hex Colors** | **1,562 instances** across 36 files | Single global token / 1-2 compact colors | ❌ **CRITICAL DEFECT** |
| **Border-Radius Classes** | **120+ instances** (`rounded`, `rounded-md`, `rounded-lg`, `rounded-full`) | `--radius: 0rem` (Zero border radius) | ❌ **CRITICAL VIOLATION** |
| **Box Shadows & Glows** | **64+ instances** (`shadow-sm`, `shadow-md`, `shadow-2xl`, `shadow-[...]`) | Zero shadow & no glow highlights | ❌ **CRITICAL VIOLATION** |
| **Font Family Stack** | `'Plus Jakarta Sans'` + Google Fonts link | `"Segoe UI", "Segoe UI Web", system-ui, -apple-system, "Helvetica Neue", sans-serif` | ❌ **CONFLICT** |
| **Light/Dark Themes** | **0% Light support** (Hardcoded dark `#0d1117`) | Dark & Light duitai supported | ❌ **MISSING FEATURE** |
| **Component-Only Architecture** | Raw `<input>`, `<select>`, `<table>`, `<div>` per page | Shared `components/ui/` primitives | ❌ **ARCHITECTURAL DRIFT** |

---

## 2. Root Cause Analysis (মূল কারণসমূহ)

1. **Root Cause 01 — Inline Arbitrary Hex Styling:**  
   `src/index.css` defines theme tokens, but views, modals, and components bypass them completely with inline Tailwind arbitrary values (`bg-[#161b22]`, `border-[#21262d]`, `text-[#f0f6fc]`). Changing a token in `index.css` has zero effect on the 1,562 hardcoded instances.
2. **Root Cause 02 — Bypassed Component Architecture:**  
   Reusable UI primitives for `Table`, `Input`, `Select`, `Form`, `SectionHeader`, and `PageContainer` do not exist in the codebase. Every page implements its own ad-hoc JSX elements with fragmented classes.
3. **Root Cause 03 — Legacy GitHub Primer Clone Leftovers:**  
   The initial codebase carried over GitHub Primer Dark styles, including `rounded-lg (8px)`, `rounded-md`, `rounded-full`, `shadow-sm`, `shadow-md`, `shadow-2xl`, and ambient glow drop-shadows, directly violating the zero-radius and zero-shadow mandates.
4. **Root Cause 04 — Font Stack Config Error:**  
   `index.html` loads `Plus Jakarta Sans` via Google Fonts, and `src/index.css` sets it as the default font, overriding the mandatory `Segoe UI` system stack.
5. **Root Cause 05 — Hardcoded Dark Canvas:**  
   `index.html`, `DualSidebarLayout.tsx`, and `App.tsx` hardcode `bg-[#0d1117]` directly, making a light theme impossible without a global CSS variable engine.

---

## 3. Exact Code Block Proofs & Line References

### 🚨 Proof 01: Font Stack & Google Fonts Conflict

#### Location: `/index.html` (Lines 16-17)
```html
16: <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
17: <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

#### Location: `/src/index.css` (Lines 48 & 97)
```css
48:   --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
...
97:   font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```
> **Violation:** User rule specifies `"Segoe UI", "Segoe UI Web", system-ui, -apple-system, "Helvetica Neue", sans-serif`. The application is currently loading and applying `Plus Jakarta Sans`.

---

### 🚨 Proof 02: Border Radius Violations (`--radius: 0rem` Rule Breached)

#### Location: `/src/components/cards/Card.tsx` (Lines 16, 26, 28, 30, 32, 34)
```tsx
16:  * - Normalized corner radius: rounded-lg (8px) across all card containers
...
26:     default: 'bg-[#161b22] border border-[#21262d] rounded-lg shadow-sm',
28:       'bg-[#161b22] border border-[#21262d] hover:border-[#1d6cf6]/60 rounded-lg transition-all duration-150 hover:shadow-lg hover:shadow-black/30 cursor-pointer',
30:       'bg-[#0e1828] border border-[#1d6cf6] rounded-lg shadow-[0_0_0_1px_#1d6cf6]',
32:       'bg-[#090d13] border border-[#21262d] rounded-md font-mono text-[11px]',
34:       'bg-[#090d13]/60 border border-[#21262d] rounded-lg',
```

#### Location: `/src/components/buttons/Button.tsx` (Lines 64-69)
```tsx
64:     micro: 'px-2 py-0.5 text-[10.5px] rounded gap-1 active:scale-95',
65:     compact: 'px-2.5 py-1 text-xs rounded gap-1.5 active:scale-95',
66:     sm: 'px-2.5 py-1 text-xs rounded gap-1.5 active:scale-95',
67:     md: 'px-3 py-1.5 text-xs rounded-md gap-1.5 active:scale-95',
68:     lg: 'px-4 py-2 text-xs font-bold rounded-md gap-2 active:scale-95',
69:     cta: 'py-2.5 px-4 text-xs font-bold rounded-md gap-2 active:scale-[0.99]',
```

#### Location: `/src/components/modals/ModalShell.tsx` (Line 79)
```tsx
79:   className={`w-full ${widthClasses} bg-[#161b22] border border-[#30363d] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ${className}`}
```

#### Location: `/src/components/badges/StatusBadge.tsx` (Lines 76 & 80)
```tsx
76:   className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-mono border ${config.bg} ${config.text} ${config.border} select-none ${className}`}
...
80:   className={`w-1.5 h-1.5 rounded-full ${config.dot} ${
```

---

### 🚨 Proof 03: Box Shadow & High-Glow Violations

#### Location: `/src/features/scanner/ScanConsole.tsx` (Lines 165 & 199)
```tsx
165:  className="h-full bg-[#1d6cf6] transition-all duration-200 ease-out shadow-[0_0_8px_rgba(29,108,246,0.6)]"
...
199:  ? 'bg-[#0e1828] border-[#1d6cf6] text-[#f0f6fc] shadow-[0_0_12px_rgba(29,108,246,0.3)]'
```

#### Location: `/src/features/scanner/IntakePipeline.tsx` (Lines 162 & 484)
```tsx
162:  ? 'border-[#1d6cf6] bg-[#0e1828] shadow-[0_0_0_1px_#1d6cf6]'
...
484:  <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 flex flex-col gap-2.5 shadow-md">
```

#### Location: `/src/features/settings/SettingsView.tsx` (Line 176)
```tsx
176:  <div className="bg-[#161b22] border border-[#21262d] rounded-md px-3 py-2 flex flex-wrap items-center justify-between gap-2 shadow-xs">
```

#### Location: `/src/App.tsx` (Line 1423)
```tsx
1423: className="absolute right-0 top-full mt-1.5 w-60 bg-[#161b22] border border-[#30363d] rounded-md shadow-2xl py-1 z-50 text-xs animate-in fade-in zoom-in-95 duration-100"
```

---

### 🚨 Proof 04: Component Architecture Bypass (Self-Hardcoded Page Elements)

#### A. Raw Input Hardcoding (Bypassing `Input` Component)
- **`src/features/dashboard/DashboardView.tsx` (Line 181):**
  ```tsx
  className="flex-1 bg-[#090d13] border border-[#30363d] rounded px-2.5 py-1 text-xs text-[#f0f6fc] font-mono placeholder:text-[#484f58] focus:border-[#1d6cf6] focus:outline-none"
  ```
- **`src/features/projects/ProjectsView.tsx` (Line 73):**
  ```tsx
  className="bg-[#090d13] border border-[#30363d] rounded text-xs text-[#f0f6fc] font-mono placeholder:text-[#484f58] px-2.5 py-1 w-48 focus:border-[#1d6cf6] focus:outline-none transition-colors"
  ```
- **`src/features/deployments/DeploymentsView.tsx` (Line 203):**
  ```tsx
  className="w-full bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded-md px-2.5 pl-8 py-1.5 text-xs text-[#f0f6fc] font-mono placeholder:text-[#484f58] transition-colors"
  ```
- **`src/features/workspace/tabs/VariablesTab.tsx` (Lines 181, 191, 242):**
  ```tsx
  className="w-full bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded px-2.5 py-1 text-xs text-[#f0f6fc] font-mono uppercase"
  ```
- **`src/App.tsx` (Line 1361):**
  ```tsx
  className="bg-[#090d13] border border-[#21262d] rounded text-xs text-[#f0f6fc] pl-8 pr-3 py-1 w-52 focus:outline-none focus:border-[#1d6cf6]"
  ```
> **Drift Impact:** `DashboardView` uses border `#30363d` with `px-2.5 py-1`, while `DeploymentsView` uses border `#21262d` with `px-2.5 pl-8 py-1.5` and `rounded-md`. When a theme changes, these inputs remain fragmented.

#### B. Raw Table Hardcoding (Bypassing `Table` Component)
- **`src/features/deployments/DeploymentsView.tsx` (Lines 268-271):**
  ```tsx
  268: <div className="border border-[#21262d] rounded-lg bg-[#090d13] overflow-x-auto text-xs shadow-sm">
  269:   <table className="w-full text-left min-w-[780px]">
  270:     <thead>
  271:       <tr className="border-b border-[#21262d] bg-[#161b22] text-[9.5px] font-mono uppercase text-[#7d8590] tracking-wider">
  ```
- **`src/features/workspace/tabs/HistoryTab.tsx` (Lines 63-66):**
  ```tsx
  63: <div className="border border-[#21262d] rounded bg-[#090d13] text-xs overflow-hidden shadow-sm">
  64:   <table className="w-full text-left">
  65:     <thead>
  66:       <tr className="border-b border-[#21262d] bg-[#161b22] text-[9.5px] font-mono uppercase text-[#7d8590]">
  ```
> **Drift Impact:** One table is wrapped in `rounded-lg` with `shadow-sm`, the other in `rounded`. Neither uses a shared `Table` component.

#### C. Card Component Bypassed
- **`src/features/projects/ProjectsView.tsx` (Line 104):**
  ```tsx
  <div className="bg-[#161b22] border border-[#30363d] rounded p-2.5 flex flex-col justify-between gap-2 hover:border-[#1d6cf6] transition-colors">
  ```
- **`src/features/dashboard/DashboardView.tsx` (Lines 81, 89, 97, 103, 111, 119, 136):**
  ```tsx
  <div className="bg-[#161b22] border border-[#30363d] rounded p-2">
  ```
> **Drift Impact:** `Card` component in `src/components/cards/Card.tsx` is completely ignored in the primary views.

---

### 🚨 Proof 05: Dark & Light Theme Architecture Mismatch

#### Location: `/index.html` (Line 19)
```html
19: <body class="bg-[#0d1117] text-[#f0f6fc] antialiased">
```

#### Location: `/src/layouts/DualSidebarLayout.tsx` (Line 54)
```tsx
54: <div className="flex min-h-screen bg-[#0d1117] text-[#f0f6fc] font-sans antialiased selection:bg-[#1d6cf6] selection:text-white">
```

#### Location: `/src/features/settings/SettingsView.tsx` (Lines 338-344)
```tsx
338: <select
339:   value={formState.preferences.theme}
340:   onChange={(e) => updatePreferences('theme', e.target.value as any)}
341: >
342:   <option value="dark">Dark Charcoal (Default - #0d1117)</option>
343:   <option value="dim">Dim Slate</option>
344:   <option value="system">System Default</option>
345: </select>
```
> **Violation:** No Light theme option exists. The theme selector in Settings has zero impact on the DOM because background `#0d1117` is hardcoded directly into the layout root.

---

## 4. Phase Scope Locks (Strict Implementation Boundaries)

To guarantee zero regression, every phase is strictly **Scope Locked**:

- **Phase 1 Scope Lock:** `index.html` + `src/index.css` ONLY.
  - Fix font stack to `"Segoe UI", "Segoe UI Web", system-ui, -apple-system, "Helvetica Neue", sans-serif`.
  - Set `--radius: 0rem` and eliminate all border-radius/shadow defaults.
  - Define dark and light CSS variable tokens (1 border token, 2 accent tokens).
- **Phase 2 Scope Lock:** `src/components/ui/` ONLY.
  - Standardize `Card`, `Button`, `Input`, `Select`, `Table`, `Badge`, `Modal` as single source of truth.
  - Enforce zero radius and zero box shadow.
- **Phase 3 Scope Lock:** `src/layouts/DualSidebarLayout.tsx` + `src/components/navigation/*` + `src/App.tsx` Header ONLY.
  - Replace hardcoded `#0d1117` with theme variables.
  - Add smooth Dark/Light mode toggle in top navigation header.
- **Phase 4 Scope Lock:** Primary views (`DashboardView.tsx`, `ProjectsView.tsx`, `DeploymentsView.tsx`, `AccountsView.tsx`, `TemplatesView.tsx`, `SettingsView.tsx`) ONLY.
  - Replace raw inputs, tables, and divs with shared `components/ui/` primitives.
- **Phase 5 Scope Lock:** Scanner & Workspace tabs (`IntakePipeline.tsx`, `ScanConsole.tsx`, `WorkspaceView.tsx`, tabs) ONLY.
  - Replace raw elements with shared `components/ui/` primitives.
  - Remove glow shadows (`shadow-[0_0_8px...]`).
- **Phase 6 Scope Lock:** Verification & Regression Testing (`compile_applet`, `lint_applet`).
  - Verify zero TypeScript errors and full feature parity.
