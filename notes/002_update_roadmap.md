# YGIT PLATFORM UI — MASTER PRODUCTION UPDATE ROADMAP
**Document ID:** `YGIT-DOC-002-ROADMAP`  
**Date:** November 8, 2026  
**Status:** `READY FOR IMPLEMENTATION (PENDING USER APPROVAL)`  
**Methodology:** Incremental Step-by-Step Phased Execution with Strict Scope Locking  
**Guiding Policy:** Rule 03 Zero Unprompted Redesigns & Full Invariant Preservation  

---

## 1. Roadmap Architecture & Execution Philosophy

To prevent regressions, maintain continuous build passing (`npm run lint` && `npm run build`), and ensure zero unintended alterations across working features, all bug fixes and improvements are organized into **6 sequential, self-contained phases**.

Each Phase is **Strictly Scope-Locked**:
- An engineer or agent working on Phase X must ONLY touch files designated for Phase X.
- No redesigns, restyling, or unprompted layout modifications may occur.
- Every phase concludes with a mandatory verification checkpoint: `npm run lint` + `npm run build`.

```
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 1: Spacing & Broken Utility Fix (py-0.2 Elimination)            │
│ Target: Fix 35 instances of broken Tailwind py-0.2 across all files.   │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 2: Dead Component Wiring & Badge Centralization                  │
│ Target: Wire FrameworkBadge, clean raw spans in MetricPill/StatusBadge.│
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 3: Atomic Button Centralization across Global Views              │
│ Target: Replace raw buttons in Dashboard, Projects, Deployments.      │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 4: Atomic Button Centralization across Scanner & Workspace Views │
│ Target: Replace raw buttons in IntakePipeline, ScanConsole, Tabs.      │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 5: Modal Architecture Standardization & App.tsx De-bloat        │
│ Target: Standardize AccountsModal into ModalShell; extract 3 modals.   │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 6: End-to-End System Integration & Forensic Parity Audit         │
│ Target: Full lint, build, runtime verification, and log freeze.        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Phase-by-Phase Detailed Specifications

### 🎯 PHASE 1: Spacing & Broken CSS Utility Fix (`py-0.2` Elimination)
- **Primary Goal**: Eradicate all 35 occurrences of the invalid `py-0.2` Tailwind class, replacing them with standard, valid micro-padding `py-0.5` (or `py-[1px]` where ultra-compact density is essential).
- **Scope-Locked Target Files**:
  1. `src/components/badges/MetricPill.tsx`
  2. `src/components/navigation/PrimarySidebar.tsx`
  3. `src/components/modals/TemplateModal.tsx`
  4. `src/components/modals/DnsConfigModal.tsx`
  5. `src/components/brand/BetaPill.tsx`
  6. `src/features/workspace/tabs/CloudflareTab.tsx`
  7. `src/features/workspace/tabs/OverviewTab.tsx`
  8. `src/features/templates/TemplatesView.tsx`
  9. `src/features/accounts/AccountsView.tsx`
  10. `src/features/settings/SettingsView.tsx`
  11. `src/features/scanner/IntakePipeline.tsx`
  12. `src/App.tsx`
- **Verification Criteria**:
  - `grep -rn "py-0.2" src` returns **0 results**.
  - All badges, counters, and tags render with clean, unclipt vertical padding.
  - `npm run lint` passes with 0 errors.

---

### 🎯 PHASE 2: Dead Component Wiring & Badge Centralization
- **Primary Goal**: Wire the unused `FrameworkBadge.tsx` component into template cards and workspace summaries; replace raw `<span>` badges with `<StatusBadge>` and `<MetricPill>`.
- **Scope-Locked Target Files**:
  1. `src/components/badges/FrameworkBadge.tsx` (ensure clean props and exports).
  2. `src/features/templates/TemplatesView.tsx` (replace raw framework tag with `<FrameworkBadge framework={tmpl.framework} />`).
  3. `src/features/dashboard/DashboardView.tsx` (replace hardcoded provider and status spans with `<MetricPill>`).
  4. `src/features/workspace/tabs/OverviewTab.tsx` (replace raw status pill with `<StatusBadge>`).
  5. `src/App.tsx` (replace header status tag with `<StatusBadge status="live" />`).
- **Verification Criteria**:
  - `FrameworkBadge` is actively utilized in production cards.
  - No visual regression in card dimensions or text alignment.
  - `npm run lint` passes with 0 errors.

---

### 🎯 PHASE 3: Atomic Button Centralization across Global Views
- **Primary Goal**: Replace raw `<button>` elements in the primary top-level views with `<PrimaryButton>`, `<SecondaryButton>`, and `<IconButton>` from `src/components/buttons/`.
- **Scope-Locked Target Files**:
  1. `src/features/dashboard/DashboardView.tsx` (Pipeline start button, Deploy button).
  2. `src/features/projects/ProjectsView.tsx` (Create Project CTA, Manage buttons).
  3. `src/features/deployments/DeploymentsView.tsx` (Connect Accounts, Create Project, Terminal Logs icon button, Redeploy icon button).
  4. `src/features/accounts/AccountsView.tsx` (Re-sync, Disconnect, Connect buttons).
  5. `src/features/templates/TemplatesView.tsx` (Details button, Use Template CTA with spinner).
- **Verification Criteria**:
  - All buttons retain exact click callbacks, disabled states, and tooltips.
  - Buttons gain standardized `active:scale-95` tactile click feedback.
  - `npm run lint` passes with 0 errors.

---

### 🎯 PHASE 4: Atomic Button Centralization across Scanner & Workspace Views
- **Primary Goal**: Replace raw `<button>` elements in the deep scanner engine and workspace sub-tabs with atomic button components.
- **Scope-Locked Target Files**:
  1. `src/features/scanner/IntakePipeline.tsx` (Add Repo button, Back button, Channel CTA buttons, Big Scan Repository CTA).
  2. `src/features/scanner/ScanConsole.tsx` (Re-scan button, Open Workspace CTA).
  3. `src/features/workspace/tabs/OverviewTab.tsx` (Instant Deploy CTA, Re-scan button).
  4. `src/features/workspace/tabs/VariablesTab.tsx` (Import .env, Export .env, Paste .env, Add Variable, Reveal All secrets).
  5. `src/features/workspace/tabs/CloudflareTab.tsx` (Save Cloudflare Settings, Purge Cache trigger, Binding action triggers).
  6. `src/features/workspace/tabs/DomainsTab.tsx` (Claim Subdomain, Check Subdomain, Add Custom Domain, Verify DNS).
- **Verification Criteria**:
  - Deep scan engine and intake pipeline transitions execute without any event interruption.
  - Variables management, DNS probes, and Cloudflare configuration forms work identically.
  - `npm run lint` passes with 0 errors.

---

### 🎯 PHASE 5: Modal Architecture Standardization & `App.tsx` De-bloat
- **Primary Goal**: Standardize the raw `Connected Accounts & Providers` dialog into `<ModalShell>` and extract inline modals (`CreateProjectModal`, `PasteEnvModal`, `EditEnvModal`) from `App.tsx` into clean, testable component files in `src/components/modals/`.
- **Scope-Locked Target Files**:
  1. `src/components/modals/CreateProjectModal.tsx` (new extraction).
  2. `src/components/modals/PasteEnvModal.tsx` (new extraction).
  3. `src/components/modals/EditEnvModal.tsx` (new extraction).
  4. `src/components/modals/AccountsModal.tsx` (wrap in `ModalShell`).
  5. `src/components/modals/index.ts` (export newly created modals).
  6. `src/App.tsx` (replace inline modal blocks with extracted components, reducing line count by ~400 lines).
- **Verification Criteria**:
  - Modal opening, form submission, validation, and dismissal via ESC key or overlay click work smoothly.
  - `App.tsx` becomes significantly cleaner and modular.
  - `npm run lint` passes with 0 errors.

---

### 🎯 PHASE 6: End-to-End System Integration & Forensic Parity Audit
- **Primary Goal**: Final verification and documentation of the entire platform.
- **Scope-Locked Target Files**:
  1. Full project lint (`tsc --noEmit`).
  2. Full project production build (`vite build`).
  3. Update `notes/003_phase_execution_logs.md` with final metrics.
  4. Update `notes/005_feature_parity_matrix.md` with 100% verified status.
- **Verification Criteria**:
  - Zero TypeScript compiler errors.
  - Zero build warnings or bundling errors.
  - 100% feature parity verified against baseline.
