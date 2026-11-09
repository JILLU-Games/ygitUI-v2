# YGIT PLATFORM UI — COMPREHENSIVE FORENSIC AUDIT REPORT
**Document ID:** `YGIT-DOC-001-FORENSIC-AUDIT`  
**Date:** November 8, 2026  
**Auditor:** Senior Forensic Software Engineer  
**Audit Scope:** 100% of all JSX/TSX views, components, layouts, styles, and modals across `src/`  
**Target Codebase:** `ygit-UI-v2`  
**Audit Mode:** Read-Only Static and Structural Inspection (Zero unprompted code modifications)

---

## 1. Executive Summary & Raw Metric Evidence

A line-by-line forensic inspection of every source file across `src/` confirms that while foundational design system documents (`BUTTON.md`, `COLORS.md`, `CARDS.md`, `SIDEBAR.md`, `SPACING.md`) exist, the codebase suffers from severe implementation debt:

| Inspection Category | Discovered Count | Root Cause & Assessment |
| :--- | :--- | :--- |
| **Arbitrary Background Hexes (`bg-[#...]`)** | **590+ occurrences** | Bypasses `src/index.css` `@theme` definitions |
| **Arbitrary Border Hexes (`border-[#...]`)** | **518+ occurrences** | Unstandardized (`border-[#21262d]` 326x, `border-[#30363d]` 126x) |
| **Arbitrary Text Color Hexes (`text-[#...]`)** | **1,098+ occurrences** | Missing theme tokens (`#58a6ff` 100x, `#c9d1d9` 71x not in `@theme`) |
| **Raw `<button>` Elements Bypassing Components** | **68 raw buttons** | Hand-rolled inline classes bypassing `PrimaryButton`, `SecondaryButton`, `IconButton` |
| **Missing Core Component Primitive (`Card.tsx`)** | **0 instances** | Documented in `CARDS.md` but missing in `src/components/`, causing radius drift (4px vs 6px vs 8px) |
| **Modal Shell Architectural Bypasses** | **3 dialogs** | Hand-rolled overlay divs in `SettingsView` (2 modals) and `TemplateModal` (1 modal) |

---

## 2. Answers to User's 4 Core Audit Questions

### ❓ Question 1: "Kono pages er moddhe ki ekhono hardcoded design add kora ace?"
**Answer:** **YES — Systemic hardcoding exists across 100% of the views.**
- `src/index.css` defines Tailwind v4 `@theme` tokens (`--color-canvas-default: #0d1117`, `--color-canvas-subtle: #161b22`, `--color-border-default: #30363d`, `--color-fg-default: #f0f6fc`).
- However, **NOT A SINGLE VIEW uses semantic classes** such as `bg-canvas-subtle`, `border-border-default`, or `text-fg-default`.
- Instead, engineers hardcoded raw bracket notation everywhere:
  - `bg-[#090d13]` (227 times)
  - `bg-[#161b22]` (165 times)
  - `border-[#21262d]` (326 times)
  - `text-[#f0f6fc]` (336 times)
  - `text-[#8b949e]` (253 times)
  - `text-[#7d8590]` (181 times)
- **Consequence**: Changing a theme color in `index.css` changes 0% of the UI because the values are hardcoded in the markup.

---

### ❓ Question 2: "Kono pages er moddhe ki emon design CSS add kora ace, jeta component/Global UI design Css theke load kora uchit?"
**Answer:** **YES — Particularly Buttons, Cards, and Modals:**
1. **Buttons**: `PrimaryButton`, `SecondaryButton`, and `IconButton` exist in `src/components/buttons/`, but views contain 68 raw `<button>` elements with hand-copied Tailwind utility strings.
2. **Cards**: `CARDS.md` specifies 14 Card Archetypes, but no `Card.tsx` component exists. Every page re-invents the container div with inconsistent padding and border radiuses.
3. **Modals**: `ModalShell.tsx` was built as the single source of truth for dialog windows, yet `TemplateModal.tsx` and `SettingsView.tsx` render raw fixed backdrop divs with inline close buttons.

---

### ❓ Question 3: "Ekhono ki UI project er kono pages er moddhe self hardcoded CSS use hocce, ja globally use na korar jnno pore update/fix/newFeature er somoy UI/UX mismatch hote pare?"
**Answer:** **YES — Severe Visual Mismatches Already Exist:**
1. **Card Border Radius Drift**:
   - `DashboardView.tsx`: `rounded` (4px)
   - `ProjectsView.tsx`: `rounded` (4px)
   - `SettingsView.tsx`: `rounded-md` (6px)
   - `DeploymentsView.tsx`: `rounded-lg` (8px)
   - `AccountsView.tsx`: `rounded-lg` (8px)
   - `CloudflareTab.tsx`: `rounded` (4px)
   *Cards that belong to the exact same visual hierarchy have conflicting 4px, 6px, and 8px radiuses depending on which file you open.*
2. **Card Outer Border Drift**:
   - `DashboardView` & `ProjectsView`: `border-[#30363d]` (Slate Border Default)
   - `DeploymentsView`, `AccountsView`, `CloudflareTab`: `border-[#21262d]` (Slate Border Muted)
3. **Button Sizing Drift**:
   - In `SettingsView.tsx`, buttons use `h-6` (24px), which does not exist anywhere in `BUTTON.md` (where standard heights are 26px and 28px).

---

### ❓ Question 4: "UI project er sokol pages er moddhe ki component/global CSS use hocce? naki kono risky ba mismatch ace?"
**Answer:** **HIGH RISK OF REGRESSION & INCONSISTENCY.**
- Because the component system lacks **Danger & Destructive** variants and **Warning/Telemetry** variants:
  - Destructive actions ("Disconnect", "Delete Project", "Unbind Subdomain") are coded differently in every file.
  - Telemetry warning buttons ("Purge Cache", "Pause Deployments") are coded differently in every file.
  - Any future feature or re-skin will create more disjointed styling unless centralized.

---

## 3. Exact Code Proofs with File Paths & Line Numbers

### Proof 01: Destructive Button Handcoded (AccountsView)
- **File**: `src/features/accounts/AccountsView.tsx`
- **Lines**: 218–224 and 349–355
```tsx
// ❌ RAW BUTTON INSTEAD OF CENTRALIZED DANGER BUTTON COMPONENT
<button
  type="button"
  onClick={onToggleGithub}
  className="text-[#f85149] hover:bg-[#da3633]/15 px-2.5 py-1 rounded text-xs border border-[#da3633]/30 cursor-pointer transition-colors active:scale-95"
>
  Disconnect
</button>
```

---

### Proof 02: Primary and Danger Actions Handcoded (CloudflareTab)
- **File**: `src/features/workspace/tabs/CloudflareTab.tsx`
- **Lines**: 1137–1144, 1180–1187, 1265–1272
```tsx
// ❌ Create Hook Button (Bypasses PrimaryButton)
<button
  type="button"
  onClick={() => setIsAddDeployHookModalOpen(true)}
  className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white text-xs font-normal px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
>
  <Plus className="w-3 h-3" />
  <span>Create Hook</span>
</button>

// ❌ Trash Action (Bypasses IconButton)
<button
  type="button"
  onClick={() => handleDeleteDeployHook(hook.id)}
  className="p-1 text-[#8b949e] hover:text-[#f85149] rounded cursor-pointer transition-colors"
>
  <Trash2 className="w-3.5 h-3.5" />
</button>

// ❌ Danger Zone Delete (Handcoded raw button)
<button
  type="button"
  onClick={() => setIsDeleteProjectModalOpen(true)}
  className="bg-[#da3633]/20 hover:bg-[#da3633]/30 text-[#f85149] border border-[#da3633]/40 px-2.5 py-1 rounded text-xs cursor-pointer transition-colors"
>
  Delete
</button>
```

---

### Proof 03: Green and Suggestion Actions Handcoded (DomainsTab)
- **File**: `src/features/workspace/tabs/DomainsTab.tsx`
- **Lines**: 208–215, 220–229, 268–275
```tsx
// ❌ Production Green CTA handcoded
<button
  type="button"
  onClick={() => onClaimFreeSubdomain(subdomainSearchResult.query, subdomainSearchResult.zone)}
  className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-normal px-3 py-1 rounded-md cursor-pointer transition-colors shrink-0 shadow-sm flex items-center gap-1.5"
>
  <Plus className="w-3.5 h-3.5" />
  <span>Claim Subdomain</span>
</button>
```

---

### Proof 04: Terminal Toolbar Bypasses `IconButton` (LogsTab)
- **File**: `src/features/workspace/tabs/LogsTab.tsx`
- **Lines**: 116–128, 143–214
```tsx
// ❌ 7 individual controls hand-coded with raw classes
<button
  type="button"
  onClick={() => onSetShowLogTimestamps(!showLogTimestamps)}
  className={`p-1.5 rounded flex items-center justify-center cursor-pointer transition-colors ${
    showLogTimestamps
      ? 'bg-[#21262d] text-[#58a6ff] border border-[#30363d]'
      : 'bg-[#090d13] border border-[#21262d] text-[#8b949e] hover:text-[#f0f6fc]'
  }`}
  title="Toggle Timestamps"
>
  <Clock className="w-3.5 h-3.5" />
</button>
```

---

### Proof 05: Arbitrary Height & Hand-Rolled Modals (SettingsView)
- **File**: `src/features/settings/SettingsView.tsx`
- **Lines**: 212–260, 703–780, 790–848
```tsx
// ❌ Non-standard arbitrary height 'h-6' (24px)
<button
  type="button"
  onClick={() => setShowJsonInspector(true)}
  className="h-6 px-2 rounded bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
>
  <Code2 className="w-3.5 h-3.5 text-[#58a6ff]" />
  <span>JSON</span>
</button>

// ❌ Modal bypasses ModalShell.tsx with raw text ✕
{showAddTokenModal && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 z-50 animate-in fade-in duration-100">
    <div className="bg-[#161b22] border border-[#30363d] rounded-md max-w-sm w-full p-3.5 flex flex-col gap-2.5 shadow-xl">
      <div className="flex items-center justify-between border-b border-[#21262d] pb-1.5">
        <h3 className="text-xs font-semibold text-[#f0f6fc]">New Access Token</h3>
        <button type="button" onClick={() => setShowAddTokenModal(false)} className="text-[#8b949e] hover:text-white text-xs cursor-pointer">
          ✕
        </button>
      </div>
```

---

### Proof 06: Modal Footers Bypassing Button Components
- **File**: `src/components/modals/CloudflareBindingsModals.tsx` (Lines 77–91, 169–183, 261–275, 335–349)
- **File**: `src/components/modals/DeleteProjectModal.tsx` (Lines 55–69)
- **File**: `src/components/modals/EditCustomDomainModal.tsx` (Lines 86–100)
- **File**: `src/components/modals/PurgeCacheModal.tsx` (Lines 86–100)
```tsx
<div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-end gap-2">
  <button
    type="button"
    onClick={onClose}
    className="bg-[#21262d] hover:bg-[#282e36] text-[#f0f6fc] px-3 py-1 text-xs rounded transition-colors cursor-pointer"
  >
    Cancel
  </button>
  <button
    type="button"
    disabled={!name.trim() || !namespaceId.trim()}
    onClick={onAdd}
    className="bg-[#1d6cf6] hover:bg-[#2f7af8] disabled:opacity-50 text-white px-3 py-1 text-xs font-medium rounded cursor-pointer transition-colors shadow-sm"
  >
    Add Binding
  </button>
</div>
```

---

### Proof 07: Top Header Buttons Bypassing `PrimaryButton`
- **File**: `src/App.tsx`
- **Lines**: 1369–1385
```tsx
// ❌ Deploy Button
<button
  onClick={() => triggerDeployment(currentProject.name)}
  title="Deploy to Cloudflare Pages"
  className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white text-xs font-medium px-3 py-1 rounded flex items-center gap-1.5 cursor-pointer shadow-sm transition-all active:scale-[0.98]"
>
  <Play className="w-3.5 h-3.5 fill-current" />
  <span className="hidden sm:inline">Deploy</span>
</button>

// ❌ New Project Button
<button
  onClick={() => setIsModalOpen(true)}
  className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white text-xs font-medium px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer"
>
  <Plus className="w-3.5 h-3.5" />
  <span>New Project</span>
</button>
```

---

### Proof 08: Unregistered Color Hexes Missing from `src/index.css`
- **File**: `src/index.css`
- The following colors are used repeatedly across components but are NOT registered in `@theme`:
  - `#58a6ff` (Light Accent Blue — 100 occurrences)
  - `#c9d1d9` (Secondary Text — 71 occurrences)
  - `#e3b341` (Warning Amber — 23 occurrences)
  - `#da3633` (Critical Crimson Red — 21 occurrences)
  - `#282e36` (Slate Hover State — 20 occurrences)
  - `#05080d` (Deep Backdrop / Table Header — 7 occurrences)
  - `#484f58` (Placeholder Gray — 8 occurrences)

---

## 4. Phase-Specific Scope Locks (Strict Scope Boundary)

To eliminate regression risks, each planned phase is locked to exact files:

| Phase | Scope-Locked Target Files | Forbidden Changes |
| :--- | :--- | :--- |
| **Phase 1: Token & Theme Register** | `src/index.css` | No TSX/JSX views or components may be touched |
| **Phase 2: Universal Button System Expansion** | `src/components/buttons/PrimaryButton.tsx`, `SecondaryButton.tsx`, `IconButton.tsx`, `index.ts` | No pages or layout files may be touched |
| **Phase 3: Card Primitive Implementation** | `src/components/cards/Card.tsx`, `src/components/cards/index.ts`, `src/components/index.ts` | No existing views may be modified during creation |
| **Phase 4: Modal Standardization** | `src/components/modals/TemplateModal.tsx`, `CloudflareBindingsModals.tsx`, `DeleteProjectModal.tsx`, `EditCustomDomainModal.tsx`, `PurgeCacheModal.tsx`, `SettingsView.tsx` | No routing, data mocks, or logic may be altered |
| **Phase 5: Global View Harmonization** | `src/features/dashboard/DashboardView.tsx`, `ProjectsView.tsx`, `DeploymentsView.tsx`, `AccountsView.tsx`, `TemplatesView.tsx`, `SettingsView.tsx`, `IntakePipeline.tsx`, `ScanConsole.tsx`, Workspace Tabs, `src/App.tsx` | Visual layouts, texts, and invariants must remain 100% identical |
