# STEP-BY-STEP PRODUCTION REFACTOR ROADMAP & SCOPE LOCK PLAN
**Document ID:** `YGIT-DOC-002`  
**Date:** November 8, 2026  
**Status:** `READY FOR REVIEW & EXECUTION`  
**Execution Mode:** Sequential, Scope-Locked, Zero-Regression Phases

---

## 1. Roadmap Architecture & Execution Principles

To ensure zero risk of breaking working features, all bug fixes and improvements are broken down into **5 strictly scope-locked Phases**. 

### Rules of Engagement:
1. **Never combine phases:** Each phase must be initiated, validated via `tsc --noEmit` + `vite build`, and signed off in `notes/003_phase_execution_logs.md` before advancing.
2. **Scope Lock Guarantee:** Edits during a phase must be constrained strictly to the targeted files. Any file not listed in a phase's Scope Lock boundary is immutable.
3. **Rollback Safety:** If any phase introduces unexpected visual drift, the previous phase commit/state can be restored immediately without collateral damage.

---

## 2. Phase Breakdown & Scope-Lock Specifications

```
  ┌──────────────────────────────────────────────────────────────┐
  │ PHASE 1: Design System Tokenization (Tailwind v4 Theme)       │
  └──────────────────────────────┬───────────────────────────────┘
                                 │
                                 ▼
  ┌──────────────────────────────────────────────────────────────┐
  │ PHASE 2: Shared Component Harmonization (Badges & Buttons)    │
  └──────────────────────────────┬───────────────────────────────┘
                                 │
                                 ▼
  ┌──────────────────────────────────────────────────────────────┐
  │ PHASE 3: Modal Architecture Consolidation (`ModalShell`)     │
  └──────────────────────────────┬───────────────────────────────┘
                                 │
                                 ▼
  ┌──────────────────────────────────────────────────────────────┐
  │ PHASE 4: App.tsx Slimming & Modal Registry Extraction         │
  └──────────────────────────────┬───────────────────────────────┘
                                 │
                                 ▼
  ┌──────────────────────────────────────────────────────────────┐
  │ PHASE 5: Error Boundary & Resilience Hardening               │
  └──────────────────────────────────────────────────────────────┘
```

---

### PHASE 1: Design System Tokenization (Tailwind v4 `@theme`)
- **Objective:** Centralize all hardcoded arbitrary hex codes into official Tailwind v4 design tokens inside `src/index.css`.
- **Target Deliverables:**
  1. Map existing CSS variables into Tailwind `@theme` directives in `src/index.css`:
     - `--color-canvas-default: #0d1117;`
     - `--color-canvas-subtle: #161b22;`
     - `--color-canvas-inset: #090d13;`
     - `--color-border-default: #30363d;`
     - `--color-border-muted: #21262d;`
     - `--color-brand-primary: #1d6cf6;`
     - `--color-brand-hover: #2f7af8;`
     - `--color-fg-default: #f0f6fc;`
     - `--color-fg-muted: #8b949e;`
     - `--color-fg-subtle: #7d8590;`
  2. Verify that Tailwind v4 generates utility classes (`bg-canvas-default`, `border-border-muted`, etc.) without altering any runtime HTML.
- **Strict Scope Lock:**
  - **Permitted File:** `src/index.css` ONLY.
  - **Forbidden Files:** All TSX components (`src/App.tsx`, `src/features/*`, `src/components/*`).
- **Success Criteria:** Zero visual changes in dev preview; zero compile errors.

---

### PHASE 2: Shared Component Harmonization (Badges & Buttons)
- **Objective:** Replace inconsistent inline status spans and raw `<button>` elements with unified `StatusBadge`, `MetricPill`, and `PrimaryButton`/`SecondaryButton` instances.
- **Target Deliverables:**
  1. Create `src/components/badges/MetricPill.tsx` for general-purpose metadata pills (e.g., `2 Linked`, `Pro`, `pnpm`, `main`, `Ready`).
  2. Audit and replace scattered inline badge classes across `VariablesTab.tsx`, `CloudflareTab.tsx`, `OverviewTab.tsx`, and `App.tsx` header.
  3. Standardize raw action buttons in `App.tsx` and workspace tabs to use `PrimaryButton` and `SecondaryButton`.
- **Strict Scope Lock:**
  - **Permitted Files:**
    - `src/components/badges/MetricPill.tsx` (New)
    - `src/components/badges/index.ts`
    - `src/components/index.ts`
    - Targeted badge replacements in `src/features/workspace/tabs/VariablesTab.tsx` and `src/App.tsx` (header badge only).
  - **Forbidden Files:** Business logic, state hooks, scanner engine, backend mocks.
- **Success Criteria:** Pixel-perfect visual alignment; reduction of 50+ lines of arbitrary badge boilerplate.

---

### PHASE 3: Modal Architecture Consolidation (`ModalShell.tsx`)
- **Objective:** Eliminate repetitive modal backdrop, container, title bar, and close button boilerplate.
- **Target Deliverables:**
  1. Create `src/components/modals/ModalShell.tsx` featuring:
     - Backdrop blur and click-outside dismissal option.
     - ESC key listener.
     - Clean header with title, subtitle, and close button.
     - Flexible max-width sizing (`xs`, `sm`, `md`, `lg`, `xl`).
  2. Export `ModalShell` from `src/components/modals/index.ts`.
  3. Refactor 3 highest-frequency modals (Create Project, Paste .env, Edit Variable) to use `ModalShell`.
- **Strict Scope Lock:**
  - **Permitted Files:**
    - `src/components/modals/ModalShell.tsx` (New)
    - `src/components/modals/index.ts`
    - Modal render sections in `src/App.tsx` (lines 1874 to 2050).
  - **Forbidden Files:** Form inputs, submission handlers, validation logic.
- **Success Criteria:** Identical visual dialog appearance with improved keyboard accessibility and code readability.

---

### PHASE 4: App.tsx Slimming & Modal Registry Extraction
- **Objective:** Reduce `src/App.tsx` from 3,025 lines down to a clean orchestration shell (~1,200 lines) by extracting Cloudflare & DNS modal dialogs into dedicated modal components.
- **Target Deliverables:**
  1. Create `src/components/modals/DnsConfigModal.tsx`.
  2. Create `src/components/modals/CloudflareBindingsModals.tsx` (KV, D1, R2, Webhooks).
  3. Create `src/components/modals/PurgeCacheModal.tsx` and `DeleteProjectModal.tsx`.
  4. Wire modal state props cleanly from `App.tsx`.
- **Strict Scope Lock:**
  - **Permitted Files:**
    - `src/components/modals/*`
    - Modal invocation blocks in `src/App.tsx`.
  - **Forbidden Files:** Feature tabs (`src/features/*`), Navigation layout (`src/layouts/*`).
- **Success Criteria:** `App.tsx` file size reduced by > 50%; zero state regressions.

---

### PHASE 5: Error Boundary & Resilience Hardening
- **Objective:** Implement comprehensive client-side error protection and graceful fallback states.
- **Target Deliverables:**
  1. Create `src/components/errors/AppErrorBoundary.tsx` catching React render exceptions.
  2. Implement empty state views for Projects (0 projects found), Deployments (no deployment history), and Variables (no env vars configured).
  3. Document all error handling strategies in `notes/004_error_handling_architecture.md`.
- **Strict Scope Lock:**
  - **Permitted Files:**
    - `src/components/errors/AppErrorBoundary.tsx` (New)
    - Root wrapping in `src/main.tsx` or `src/App.tsx`.
  - **Forbidden Files:** Core business logic and scanner state machines.
- **Success Criteria:** 100% crash resilience with clear recovery affordances for end users.
