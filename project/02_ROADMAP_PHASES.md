# YGIT Platform UI — A-Z Phased Roadmap & Execution Protocol

> **Document**: 02_ROADMAP_PHASES.md  
> **Architecture Target**: Pure UI Modular Refactoring (Phase 1 Broken Down into 5 Sub-Phases)  
> **Guiding Principle**: Step-by-step verified execution with zero regression and live UI checkpoints.

---

## 🗺️ Master Phased Roadmap Overview

```
Phase 1.1 ────────► Phase 1.2 ────────► Phase 1.3 ────────► Phase 1.4 ────────► Phase 1.5
Foundation & Mocks  Atomic Components   Sidebar Layout      Main Standalone     Scanner Engine &
(Types & Data)      (Design System)     (Dual-Sidebar)      Views (5 Screens)   Workspace Tabs
```

---

## 📋 Phase-by-Phase Execution Details

### 🔹 Phase 1.1: Foundation, Types & Isolated Mocks
* **Primary Objective**: Decouple data definitions and sample mock state from `App.tsx` into typed files.
* **Input State**: `src/App.tsx` (8,692 lines containing embedded data structures).
* **Deliverables**:
  1. `src/types/project.ts`: `Project`, `FrameworkInfo`, `BuildSettings`, `GitCommit`
  2. `src/types/template.ts`: `ReadyTemplate`, `TemplateMetricSpec`, `TemplateFeature`
  3. `src/types/deployment.ts`: `DeploymentRecord`, `DeploymentStatus`, `DeploymentLogEntry`
  4. `src/types/scanner.ts`: `ScanCheckpoint`, `14Invariants`, `DiagnosticMetric`
  5. `src/mocks/mockProjects.ts`: `INITIAL_PROJECTS` array
  6. `src/mocks/mockTemplates.ts`: `READY_TEMPLATES` array (8 full themes)
  7. `src/mocks/mockCheckpoints.ts`: 14 deep scan pipeline stages
  8. `src/mocks/mockDeployments.ts`: Global deployments feed
  9. `src/mocks/mockEnvVars.ts`: Sample encrypted environment variables
* **Verification & Acceptance Criteria**:
  - `src/App.tsx` imports from `src/types/` and `src/mocks/`.
  - Line count of `App.tsx` reduced by ~1,200 lines.
  - `npm run build` & `tsc --noEmit` exit with 0 errors.
  - UI visual and functional test confirms 100% parity.

---

### 🔹 Phase 1.2: Design System & Atomic Components
* **Primary Objective**: Extract shared, repetitive UI controls into typed design system components per canonical specs (`BUTTON.md`, `CARDS.md`, `LOGO.md`).
* **Deliverables**:
  1. `src/components/brand/YGitLogo.tsx`: 21px expanded logo with 1px precision aura & 28px collapsed morphing toggle.
  2. `src/components/brand/BetaPill.tsx`: 8.5px monospace `beta` tag.
  3. `src/components/buttons/PrimaryButton.tsx`: Electric blue action button (`bg-[#1d6cf6]`).
  4. `src/components/buttons/SecondaryButton.tsx`: Dark charcoal button (`bg-[#21262d]`).
  5. `src/components/buttons/IconButton.tsx`: Compact icon action button.
  6. `src/components/badges/StatusBadge.tsx`: Standardized status pills (Ready, Running, Error).
  7. `src/components/badges/FrameworkBadge.tsx`: Framework tag chips (React, Vite, Next.js, Astro).
  8. `src/components/modals/TemplateModal.tsx`: Extracted 400-line theme preview modal.
* **Verification & Acceptance Criteria**:
  - Brand header and buttons across views consume atomic components.
  - Modal open/close behavior, thumbnail previews, and specs display remain identical.
  - Zero CSS drift across all button states.
  - Build and lint pass cleanly.

---

### 🔹 Phase 1.3: Navigation & Dual-Sidebar Layout Shell
* **Primary Objective**: Encapsulate the global and project-scoped sidebars into a modular dual-sidebar layout per `SIDEBAR.md`.
* **Deliverables**:
  1. `src/components/navigation/PrimarySidebar.tsx`:
     - 190px expanded state, 54px collapsed state
     - 5 Platform routes with active states and badge counters
     - Worker status ping footer (38ms, animated pulse)
  2. `src/components/navigation/SecondarySidebar.tsx`:
     - 195px workspace sidebar with `#12161d` visual inset
     - Active project repository header & branch tag
     - 6 workspace sub-tabs with active blue indicator icons
     - Re-scan trigger button
  3. `src/layouts/DualSidebarLayout.tsx`:
     - Sticky viewport orchestration (`h-screen`, `sticky top-0`)
     - Fluid content canvas container (`max-w-[1600px]`)
* **Verification & Acceptance Criteria**:
  - Collapse / expand toggle functions smoothly.
  - Route switching between global views and workspace views works seamlessly.
  - Background contrast hierarchy (`#161b22` vs `#12161d` vs `#0d1117`) preserved.

---

### 🔹 Phase 1.4: Standalone Main Views
* **Primary Objective**: Modularize the self-contained platform views from `App.tsx` into `src/features/`.
* **Deliverables**:
  1. `src/features/dashboard/DashboardView.tsx`: Telemetry grid, stats cards, and recent deployments.
  2. `src/features/projects/ProjectsView.tsx`: Project card grid, search bar, and filter pills.
  3. `src/features/templates/TemplatesView.tsx`: Shopify/Wix-style theme card grid, thumbnail graphic, category filters with real-time item counts.
  4. `src/features/deployments/DeploymentsView.tsx`: Global chronological deployment history feed.
  5. `src/features/accounts/AccountsView.tsx`: Connected Git providers and Cloudflare settings.
* **Verification & Acceptance Criteria**:
  - All 5 routes render their respective view components.
  - Instant filtering, searching, and badge updates operate identically.
  - `App.tsx` contains zero embedded markup for these 5 screens.

---

### 🔹 Phase 1.5: Scanner Engine & Post-Scan Workspace Tabs
* **Primary Objective**: Modularize the core intellectual property—the 14-stage deep scan engine and post-scan project workspace.
* **Deliverables**:
  1. `src/features/scanner/IntakePipeline.tsx`: Git repository URL input, protocol validation, and progress fill.
  2. `src/features/scanner/ScanView.tsx`: 14-stage deep AST analyzer console, live simulated logs stream, and progress metrics.
  3. `src/features/workspace/WorkspaceView.tsx`: Workspace container shell with tab dispatcher.
  4. `src/features/workspace/tabs/OverviewTab.tsx`: Codebase architecture card, commit evidence, and instant deploy button.
  5. `src/features/workspace/tabs/VariablesTab.tsx`: Encrypted environment variables table with toggle visibility.
  6. `src/features/workspace/tabs/CloudflareTab.tsx`: Pages build presets, output directory, and wrangler config.
  7. `src/features/workspace/tabs/DomainsTab.tsx`: Pages default URL, YGIT gateway, and custom domain DNS probe.
  8. `src/features/workspace/tabs/LogsTab.tsx`: Edge terminal build logs stream with copy affordance.
  9. `src/features/workspace/tabs/HistoryTab.tsx`: Chronological deployment history table.
  10. `src/App.tsx` Final Cleanup: Slim orchestrator (~120 lines).
* **Verification & Acceptance Criteria**:
  - Full end-to-end user journey works flawlessly:
    `Dashboard` ➡️ `New Project` ➡️ `Scan 14 Invariants` ➡️ `Workspace (6 Tabs)` ➡️ `Deploy`.
  - Zero visual or behavioral regression.
  - Complete code compilation without any warnings or type errors.
