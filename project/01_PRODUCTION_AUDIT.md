# YGIT PLATFORM UI — COMPREHENSIVE FORENSIC AUDIT REPORT
**Document ID:** `YGIT-DOC-001-FORENSIC-AUDIT`  
**Date:** November 8, 2026  
**Auditor:** Senior Forensic Software Engineer  
**Audit Scope:** 100% of all JSX/TSX views, components, layouts, styles, and modals across `src/`  
**Target Codebase:** `ygit-UI-v2`  

---

## 1. Executive Summary & Root Cause Matrix

A forensic inspection of every line of code across the entire `src/` directory reveals that while design specifications (`BUTTON.md`, `COLORS.md`, `CARDS.md`, `SPACING.md`) and dedicated UI atomic components (`PrimaryButton`, `SecondaryButton`, `IconButton`, `FrameworkBadge`, `StatusBadge`, `MetricPill`) were architected, the application views almost completely bypass these shared components and global CSS tokens in favor of inline, copy-pasted Tailwind utility classes.

### High-Level Forensic Metrics:
- **Hardcoded Arbitrary Hex Utilities (`bg-[#...]`, `text-[#...]`, `border-[#...]`)**: **1,541 instances**.
- **Global CSS Theme Tokens Used (`bg-canvas-default`, etc.)**: **0 instances** (0% utilization of `src/index.css` `@theme` block).
- **Raw `<button>` Elements**: **184 instances** written with duplicated class strings.
- **Shared Button Component Utilization**:
  - `PrimaryButton`: Used in **1 location** (`src/App.tsx:2284`).
  - `SecondaryButton`: Used in **1 location** (`src/App.tsx:2274`).
  - `IconButton`: Used in **0 locations** (completely unused dead-weight).
  - `FrameworkBadge`: Used in **0 locations** (completely unused dead-weight).
- **Broken / Non-Standard Tailwind Class (`py-0.2`)**: **35 instances** across components and views.
- **Arbitrary Fractional Font Sizes (`text-[Xpx]`)**: **449 instances** (`text-[9.5px]`, `text-[10.5px]`, `text-[8.5px]`, `text-[11.5px]`, `text-[12.5px]`, `text-[13.5px]`, etc.).

---

## 2. Forensic Defect Catalog with Code Proof & File Paths

### Defect 01: Complete Disconnect Between `src/index.css` `@theme` and Page Classes
- **Severity**: HIGH (Architectural Debt & Maintenance Blocker)
- **Root Cause**: `src/index.css` defines semantic tokens under `@theme` (Tailwind v4 syntax), such as `--color-canvas-default: #0d1117`, `--color-canvas-subtle: #161b22`, `--color-border-default: #30363d`, `--color-brand-primary: #1d6cf6`, `--color-fg-default: #f0f6fc`. However, not a single component or page uses classes like `bg-canvas-default`, `text-fg-default`, or `border-border-muted`. Instead, 1,541 instances of raw bracket notation (`bg-[#090d13]`, `bg-[#161b22]`, `text-[#f0f6fc]`) are hardcoded.
- **Exact Code Proof**:
  - Defined in `/src/index.css` (lines 3–20):
    ```css
    @theme {
      --color-canvas-default: #0d1117;
      --color-canvas-subtle: #161b22;
      --color-canvas-inset: #090d13;
      --color-border-default: #30363d;
      --color-border-muted: #21262d;
      --color-brand-primary: #1d6cf6;
      --color-fg-default: #f0f6fc;
      --color-fg-muted: #8b949e;
      --color-fg-subtle: #7d8590;
    }
    ```
  - Actually used in `/src/features/dashboard/DashboardView.tsx` (lines 79, 81):
    ```tsx
    <div className="bg-[#161b22] border border-[#30363d] rounded p-2">
      <div className="text-[9.5px] font-semibold text-[#8b949e] uppercase">Projects</div>
      <div className="text-sm font-semibold text-[#f0f6fc] font-mono">
    ```
- **Consequence**: Any global theme tweak, contrast adjustment, or dark-mode calibration done in `src/index.css` has zero effect on the application.

---

### Defect 02: 184 Raw `<button>` Elements Bypassing Atomic Button Components
- **Severity**: HIGH (UI Inconsistency & Interaction Mismatch)
- **Root Cause**: `PrimaryButton.tsx`, `SecondaryButton.tsx`, and `IconButton.tsx` were created in `src/components/buttons/` with standardized active scaling (`active:scale-95`), loading spinners, icon gaps, and accessibility attributes. Yet throughout all 9 views and tabs, engineers wrote `<button type="button" className="...">` by hand.
- **Exact Code Proof**:
  - `/src/features/projects/ProjectsView.tsx` (lines 85–92):
    ```tsx
    <button
      type="button"
      onClick={onCreateProject}
      className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer transition-colors"
    >
      <Plus className="w-3.5 h-3.5" />
      <span>Create Project</span>
    </button>
    ```
    *Should be*: `<PrimaryButton size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={onCreateProject}>Create Project</PrimaryButton>`
  - `/src/features/projects/ProjectsView.tsx` (lines 133–139):
    ```tsx
    <button
      type="button"
      onClick={() => onSelectProject({ name: proj.name, repo: proj.repo })}
      className="bg-[#21262d] hover:bg-[#282e36] text-[#f0f6fc] px-2 py-0.5 rounded cursor-pointer transition-colors"
    >
      Manage
    </button>
    ```
    *Should be*: `<SecondaryButton size="sm" onClick={...}>Manage</SecondaryButton>`
  - `/src/features/deployments/DeploymentsView.tsx` (lines 368–376):
    ```tsx
    <button
      type="button"
      onClick={() => onNavigateWorkspace({ name: dep.projectName, repo: dep.repo }, 'logs')}
      title="View Terminal Logs"
      className="p-1 text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#21262d] rounded cursor-pointer transition-colors"
    >
      <Terminal className="w-3.5 h-3.5" />
    </button>
    ```
    *Should be*: `<IconButton icon={<Terminal className="w-3.5 h-3.5" />} title="View Terminal Logs" size="sm" onClick={...} />`
- **Consequence**: When buttons are clicked, standard `active:scale-95` feedback is missing in 95% of controls; hover states vary arbitrarily between `#282e36`, `#30363d`, and `#161b22`.

---

### Defect 03: 35 Instances of Broken & Invalid Tailwind Class `py-0.2`
- **Severity**: MEDIUM-HIGH (Rendering Bug & Broken Box Model)
- **Root Cause**: Someone invented the utility class `py-0.2`. Tailwind CSS has no such utility (the standard scale is `py-0.5` = 2px, `py-1` = 4px). In browsers, `py-0.2` is an unrecognized CSS class and is completely ignored, causing vertical padding to drop to 0px, causing text to clip against borders.
- **Exact Code Proof Locations**:
  1. `src/components/badges/MetricPill.tsx:43`:
     ```tsx
     const sizeClasses = {
       xs: 'text-[9.5px] px-1.5 py-0.2',
       sm: 'text-xs px-2 py-0.5',
     }[size];
     ```
  2. `src/components/navigation/PrimarySidebar.tsx:106, 136, 165, 204`:
     ```tsx
     <span className="text-[10px] font-mono text-[#8b949e] bg-[#090d13] px-1 py-0.2 rounded border border-[#21262d]">
     ```
  3. `src/components/modals/TemplateModal.tsx:64, 246, 432`:
     ```tsx
     <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-[#21262d] text-[#58a6ff] border border-[#30363d] shrink-0">
     ```
  4. `src/components/modals/DnsConfigModal.tsx:41, 97, 122`:
     ```tsx
     <span className="px-1.5 py-0.2 rounded bg-[#1d6cf6]/15 text-[#58a6ff] font-normal text-[10px]">
     ```
  5. `src/components/brand/BetaPill.tsx:14`:
     ```tsx
     className={`text-[8.5px] font-mono font-medium lowercase px-1.5 py-0.2 rounded-full bg-[#1d6cf6]/15 ...`}
     ```
  6. `src/features/workspace/tabs/CloudflareTab.tsx:251, 255, 312, 981, 1034, 1087`:
     ```tsx
     <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#238636]/15 text-[#3fb950] ...">
     ```
  7. `src/features/workspace/tabs/OverviewTab.tsx:64`:
     ```tsx
     <span className="text-[9.5px] font-normal px-1.5 py-0.2 rounded bg-[#238636]/15 text-[#3fb950] ...">
     ```
  8. `src/features/templates/TemplatesView.tsx:111, 191, 254`:
     ```tsx
     <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-[#090d13] border border-[#21262d] text-[#8b949e]">
     ```
  9. `src/features/accounts/AccountsView.tsx:90`:
     ```tsx
     <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-[#090d13] border border-[#21262d] text-[#8b949e]">
     ```
  10. `src/features/settings/SettingsView.tsx:186, 190, 195, 309, 515, 595`:
      ```tsx
      <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-[#1d6cf6]/10 border border-[#1d6cf6]/30 text-[#58a6ff]">
      ```
  11. `src/features/scanner/IntakePipeline.tsx:359`:
      ```tsx
      className={`text-[9.5px] font-semibold uppercase px-1.5 py-0.2 rounded border ...`}
      ```
  12. `src/App.tsx:1347, 2242, 2267`:
      ```tsx
      <span className="text-[9.5px] font-normal px-1.5 py-0.2 rounded bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30">Ready</span>
      ```
- **Consequence**: Badges appear visually cramped with text touching the border edges on high-DPI displays.

---

### Defect 04: FrameworkBadge Component is 100% Unused Dead Code
- **Severity**: MEDIUM
- **Root Cause**: `FrameworkBadge.tsx` is implemented and exported in `src/components/badges/FrameworkBadge.tsx`, but no page imports or renders it. In `TemplatesView.tsx:254`, developers wrote:
  ```tsx
  <span className="ml-auto text-[9px] px-1.5 py-0.2 rounded bg-[#090d13] text-[#58a6ff] border border-[#21262d]">
    {tmpl.framework}
  </span>
  ```
  instead of:
  ```tsx
  <FrameworkBadge framework={tmpl.framework} />
  ```
- **Consequence**: Redundant boilerplate across cards and missed central styling.

---

### Defect 05: Inconsistent Modal Architecture & Inline Modal Bloat in `src/App.tsx`
- **Severity**: MEDIUM-HIGH (Code Cleanliness & Layout Duplication)
- **Root Cause**: `ModalShell.tsx` was created to standardize modal backdrops, headers, close buttons, and focus traps. However:
  1. `src/App.tsx:2216–2292` implements the `Connected Accounts & Providers` dialog with raw inline `fixed inset-0 bg-[#05080d]/80 backdrop-blur-sm ...` instead of `<ModalShell>`.
  2. `src/App.tsx:1878–2099` contains 3 inline modals (`Create Project`, `Paste .env`, `Edit Variable`) directly inside `App.tsx`, inflating `App.tsx` to 2,318 lines.
- **Consequence**: Inconsistent backdrop blur, missing keyboard escape handlers, and poor separation of concerns.

---

### Defect 06: Chaotic Arbitrary Font Size Scales (449 Occurrences)
- **Severity**: MEDIUM (Visual Polish & Typography Hierarchy)
- **Root Cause**: Uncontrolled fractional font sizes without a strict design token scale:
  - `text-[7px]` (4x)
  - `text-[7.5px]` (1x)
  - `text-[8px]` (7x)
  - `text-[8.5px]` (13x)
  - `text-[9px]` (35x)
  - `text-[9.5px]` (101x)
  - `text-[10px]` (99x)
  - `text-[10.5px]` (64x)
  - `text-[11px]` (106x)
  - `text-[11.5px]` (3x)
  - `text-[12px]` (2x)
  - `text-[12.5px]` (9x)
  - `text-[13px]` (2x)
  - `text-[13.5px]` (2x)
  - `text-[14px]` (1x)
- **Consequence**: Visual clutter where adjacent elements have subtly conflicting font sizes (e.g. 9.5px next to 10px next to 10.5px).

---

## 3. Strict Scope Lock Definitions for Each Target Area

As mandated by **Rule 03 (Strict Scope Lock & Zero Unprompted Redesign Policy)**, during the upcoming implementation phases:
1. **Scope Lock 1: CSS & Spacing Fix**: ONLY replace `py-0.2` with `py-0.5` (or `py-[1px]`) and establish token classes without changing any visual layout, color palette, or DOM structure.
2. **Scope Lock 2: Atomic Button Replacement**: ONLY replace raw `<button>` elements with `<PrimaryButton>`, `<SecondaryButton>`, and `<IconButton>` on identical click handlers, props, and labels without touching adjacent elements.
3. **Scope Lock 3: Badge & Metric Pill Centralization**: ONLY replace raw `<span>` badges with `<StatusBadge>`, `<MetricPill>`, and `<FrameworkBadge>` preserving exact text, colors, and layout.
4. **Scope Lock 4: Modal Standardization**: ONLY wrap the unstandardized `AccountsModal` and extract inline modals into clean component files without changing any input state or callbacks.
