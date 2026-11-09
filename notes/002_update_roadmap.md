# YGIT PLATFORM UI — COMPREHENSIVE UPDATE ROADMAP (PHASED EXECUTION)
**Document ID:** `YGIT-DOC-002-ROADMAP`  
**Date:** November 8, 2026  
**Status:** `READY FOR SEQUENTIAL EXECUTION`  
**Governance:** `AGENTS.md` Rule 03 (Strict Scope Lock & Zero Unprompted Redesigns)  

---

## 1. Roadmap Architecture & Sequential Progression

```
[Phase 1: Foundation Tokens & Font Engine]
                  │
                  ▼
[Phase 2: Universal UI Components Primitives]
                  │
                  ▼
[Phase 3: Layout, Navigation & Dual-Theme Switcher]
                  │
                  ▼
[Phase 4: Main Platform Feature Views Refactoring]
                  │
                  ▼
[Phase 5: Scanner & Project Workspace Refactoring]
                  │
                  ▼
[Phase 6: End-to-End Verification & Regression Testing]
```

---

## 2. Phase-by-Phase Technical Specifications

### Phase 1: Foundation Tokens & Font Engine
- **Target Files:**
  - `/index.html`
  - `/src/index.css`
- **Scope Lock Boundary:** Strictly limited to global font definitions, root styles, and CSS theme tokens. Zero modifications to JSX views or business logic.
- **Tasks:**
  1. Remove external Google Fonts reference for `Plus Jakarta Sans` in `index.html`.
  2. Configure native font stack in `src/index.css`:
     `font-family: "Segoe UI", "Segoe UI Web", system-ui, -apple-system, "Helvetica Neue", sans-serif;`
  3. Enforce shadcn / universal override:
     `--radius: 0rem;`
     `box-shadow: none !important;`
  4. Define strict dual-theme tokens:
     - Light Mode: Clean crisp background (`#ffffff` / `#f6f8fa`), subtle border (`#d0d7de`), primary text (`#1f2328`), 2 accent tokens.
     - Dark Mode: Obsidian background (`#0d1117` / `#161b22`), subtle border (`#30363d`), primary text (`#f0f6fc`), 2 accent tokens.
- **Verification Gate:** `tsc --noEmit` and dev server preview loads clean Segoe UI font.

---

### Phase 2: Universal UI Components Primitives (`components/ui/`)
- **Target Files:**
  - `/src/components/ui/Button.tsx` (or standardizing `src/components/buttons/*`)
  - `/src/components/ui/Card.tsx` (or standardizing `src/components/cards/*`)
  - `/src/components/ui/Input.tsx` (new unified input primitive)
  - `/src/components/ui/Select.tsx` (new unified select dropdown primitive)
  - `/src/components/ui/Table.tsx` (new unified table component suite)
  - `/src/components/ui/Modal.tsx` & `/src/components/modals/ModalShell.tsx`
  - `/src/components/badges/StatusBadge.tsx` & `MetricPill.tsx`
- **Scope Lock Boundary:** Strictly limited to the shared component library. No changes to pages or route state.
- **Tasks:**
  1. Remove all `rounded-lg`, `rounded-md`, `rounded-full`, and `rounded` classes (enforce `rounded-none`).
  2. Remove all `shadow-sm`, `shadow-md`, `shadow-2xl`, and glow classes (`shadow-none`).
  3. Wire all components to the CSS custom properties (`bg-canvas-default`, `border-border-default`, `text-fg-default`).
  4. Provide accessible props (`size`, `variant`, `disabled`, `className`).
- **Verification Gate:** `tsc --noEmit` passes with all component unit tests intact.

---

### Phase 3: Layout, Navigation & Dual-Theme Switcher
- **Target Files:**
  - `/src/layouts/DualSidebarLayout.tsx`
  - `/src/components/navigation/PrimarySidebar.tsx`
  - `/src/components/navigation/SecondarySidebar.tsx`
  - `/src/App.tsx` (Header bar only)
- **Scope Lock Boundary:** Navigation frames, sidebars, and top bar theme toggle only.
- **Tasks:**
  1. Replace hardcoded `bg-[#0d1117]` in layout root with dynamic theme class / CSS variable.
  2. Implement an elegant, compact Sun/Moon theme toggle in the header.
  3. Ensure both Primary Sidebar and Secondary Sidebar adapt smoothly to Light and Dark modes.
  4. Preserve all 8 navigation routes, counter badges, and collapse states.
- **Verification Gate:** Theme toggle instantly swaps between dark and light themes across the layout frame without layout shift.

---

### Phase 4: Main Platform Feature Views Refactoring
- **Target Files:**
  - `/src/features/dashboard/DashboardView.tsx`
  - `/src/features/projects/ProjectsView.tsx`
  - `/src/features/deployments/DeploymentsView.tsx`
  - `/src/features/accounts/AccountsView.tsx`
  - `/src/features/templates/TemplatesView.tsx`
  - `/src/features/settings/SettingsView.tsx`
- **Scope Lock Boundary:** Main platform views only. Feature logic, data calculations, and handlers remain 100% intact.
- **Tasks:**
  1. Replace ad-hoc `div` cards with the unified `Card` component.
  2. Replace raw `<input>` and `<select>` with unified `Input` and `Select` components.
  3. Replace the raw deployments `<table>` in `DeploymentsView` with the unified `Table` component.
  4. Strip all inline `rounded-*` and `shadow-*` classes.
  5. Replace hardcoded hex colors with semantic token classes.
- **Verification Gate:** All 6 primary views render flawlessly in both Light and Dark modes with zero inline design divergence.

---

### Phase 5: Scanner & Project Workspace Refactoring
- **Target Files:**
  - `/src/features/scanner/IntakePipeline.tsx`
  - `/src/features/scanner/ScanConsole.tsx`
  - `/src/features/workspace/WorkspaceView.tsx`
  - `/src/features/workspace/tabs/OverviewTab.tsx`
  - `/src/features/workspace/tabs/VariablesTab.tsx`
  - `/src/features/workspace/tabs/CloudflareTab.tsx`
  - `/src/features/workspace/tabs/DomainsTab.tsx`
  - `/src/features/workspace/tabs/LogsTab.tsx`
  - `/src/features/workspace/tabs/HistoryTab.tsx`
- **Scope Lock Boundary:** Scanner wizard and workspace tabs only. Preserve all 14 scanner checkpoints and terminal streaming logs.
- **Tasks:**
  1. Remove glow drop-shadows from `ScanConsole` progress bar and step cards.
  2. Standardize `IntakePipeline` 4-step wizard cards to 0 border radius and 0 shadow.
  3. Replace raw tables in `HistoryTab` and `VariablesTab` with the unified `Table` component.
  4. Ensure terminal log viewer (`LogsTab`) maintains high-contrast monospace clarity in both themes.
- **Verification Gate:** 14-stage deep scan completes smoothly from start to finish with deterministic verification.

---

### Phase 6: End-to-End Verification & Regression Testing
- **Target Files:** Full repository verification.
- **Tasks:**
  1. Run `npm run lint` (`tsc --noEmit`).
  2. Run `npm run build` (`vite build`).
  3. Check browser dev server on `http://localhost:3000`.
  4. Test route transitions across all 8 screens and modal triggers.
  5. Test theme toggle switching across all views.
- **Verification Gate:** 100% clean build, zero linter warnings, zero visual regressions.
