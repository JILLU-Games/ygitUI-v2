# YGIT PLATFORM BASELINE AUDIT & FREEZE MANIFEST
**Document ID:** `YGIT-DOC-000-FREEZE`  
**Date:** November 8, 2026  
**Status:** `BASELINE FROZEN (PRE-REFACTORING)`  
**Branch / Target:** `main`  
**Framework Stack:** React 19 + TypeScript 5.8 + Vite 8.3 + Tailwind CSS v4.3.3 + Motion 12.23  
**Verified Commands:** `npm run lint` (`tsc --noEmit`) ✅ 0 ERRORS | `npm run build` (`vite build`) ✅ PASSED  

---

## 1. Executive Summary & Freeze Declaration

This document formally establishes the **Production Baseline Freeze** for the **YGIT Platform Web Application**. Before any production refactoring, token centralization, button standardization, or component extraction commences, all current capabilities, routes, invariants, components, and layout structures are frozen as the inviolable baseline reference point.

### Strict Governance Constraints (as defined in `AGENTS.md` Rule 03):
- **Zero Unprompted Redesigns / Modifications**: Under NO circumstance should any existing page, UI component, layout structure, color palette, or styling outside the explicitly requested scope be altered, refactored, restyled, or redesigned.
- **Preserve Existing State & Invariants**: Everything outside the exact targeted delta must remain 100% untouched, intact, and unchanged.
- **Scope Locked Phases**: Every phase of the upcoming refactoring roadmap must only modify its assigned files.
- **Zero Breaking Changes**: Every refactoring phase must pass `tsc --noEmit` and `npm run build` with zero regressions.

---

## 2. Complete Codebase Inventory & Line Count Baseline

| Path / Module | Purpose | Lines of Code | Baseline Status |
| :--- | :--- | :--- | :--- |
| **`/src/App.tsx`** | Global application shell, navigation state, routes, modals, toasts | 2,057 | `FROZEN` |
| **`/src/index.css`** | Tailwind CSS v4 entry point, `@theme` token definitions, scrollbar styles | 119 | `FROZEN` |
| **`/src/main.tsx`** | Application bootstrap with `StrictMode` and `AppErrorBoundary` | 16 | `FROZEN` |
| **`/src/layouts/DualSidebarLayout.tsx`** | Dual-sidebar viewport layout shell orchestrator | 90 | `FROZEN` |
| **`src/components/navigation/PrimarySidebar.tsx`** | Primary global navigation sidebar (collapsed / expanded modes) | 265 | `FROZEN` |
| **`src/components/navigation/SecondarySidebar.tsx`** | Secondary project-scoped navigation sidebar (Workspace tabs) | 188 | `FROZEN` |
| **`src/components/brand/YGitLogo.tsx`** | Authentic SVG vector brand logo with precision ambient glow | 110 | `FROZEN` |
| **`src/components/brand/BetaPill.tsx`** | Micro beta badge component | 22 | `FROZEN` |
| **`src/components/buttons/PrimaryButton.tsx`** | Standard YGIT Electric Blue Primary Action Button (Archetype 1) | 63 | `FROZEN` |
| **`src/components/buttons/SecondaryButton.tsx`** | Standard YGIT Neutral Slate Secondary Action Button (Archetype 2) | 62 | `FROZEN` |
| **`src/components/buttons/IconButton.tsx`** | Standard Square Micro Icon Action Button (Archetype 7) | 35 | `FROZEN` |
| **`src/components/buttons/Button.tsx`** | Unified Button component with 8 archetypes | 154 | `FROZEN` |
| **`src/components/cards/Card.tsx`** | Card containers with default, interactive, selected variants | 131 | `FROZEN` |
| **`src/components/badges/StatusBadge.tsx`** | Semantic status indicator (`live`, `passed`, `building`, `failed`) | 91 | `FROZEN` |
| **`src/components/badges/MetricPill.tsx`** | Monospace telemetry pill (`blue`, `green`, `amber`, `red`, `purple`) | 59 | `FROZEN` |
| **`src/components/badges/FrameworkBadge.tsx`** | Monospace framework classification chip | 33 | `FROZEN` |
| **`src/components/errors/AppErrorBoundary.tsx`** | Class component React error boundary for runtime exceptions | 67 | `FROZEN` |
| **`src/components/templates/TemplateThumbnailGraphic.tsx`** | Interactive mockup graphics preview for deployment templates | 231 | `FROZEN` |
| **`src/components/modals/ModalShell.tsx`** | Common modal backdrop and header wrapper | 115 | `FROZEN` |
| **`src/components/modals/CreateProjectModal.tsx`** | Project creation intake dialog with GitHub / HTTPS / Upload options | 148 | `FROZEN` |
| **`src/components/modals/AccountsModal.tsx`** | GitHub and Cloudflare OAuth account status dialog | 84 | `FROZEN` |
| **`src/components/modals/TemplateModal.tsx`** | 3-tab template inspection modal (Overview, Architecture, Files) | 415 | `FROZEN` |
| **`src/components/modals/PasteEnvModal.tsx`** | Bulk `.env` key-value parser and importer modal | 112 | `FROZEN` |
| **`src/components/modals/EditEnvModal.tsx`** | Single environment variable edit modal | 118 | `FROZEN` |
| **`src/components/modals/DnsConfigModal.tsx`** | Cloudflare DNS CNAME verification record modal | 97 | `FROZEN` |
| **`src/components/modals/EditCustomDomainModal.tsx`** | Custom domain configuration modal | 94 | `FROZEN` |
| **`src/components/modals/CloudflareBindingsModals.tsx`** | KV, D1, R2, Deploy Hooks and Worker Route bindings modals | 315 | `FROZEN` |
| **`src/components/modals/PurgeCacheModal.tsx`** | Cloudflare Pages edge cache purge dialog | 72 | `FROZEN` |
| **`src/components/modals/DeleteProjectModal.tsx`** | Irreversible project deletion confirmation modal | 84 | `FROZEN` |
| **`src/features/dashboard/DashboardView.tsx`** | Executive telemetry dashboard and 4-step pipeline launcher | 276 | `FROZEN` |
| **`src/features/projects/ProjectsView.tsx`** | Projects gallery and filter view | 154 | `FROZEN` |
| **`src/features/deployments/DeploymentsView.tsx`** | Global deployment ledger and execution table | 417 | `FROZEN` |
| **`src/features/accounts/AccountsView.tsx`** | GitHub, Cloudflare, Fastly connected provider accounts view | 267 | `FROZEN` |
| **`src/features/templates/TemplatesView.tsx`** | Production ready starter templates catalog | 247 | `FROZEN` |
| **`src/features/settings/SettingsView.tsx`** | Comprehensive 6-tab platform configuration manager | 812 | `FROZEN` |
| **`src/features/scanner/IntakePipeline.tsx`** | 4-step repository intake wizard | 525 | `FROZEN` |
| **`src/features/scanner/ScanConsole.tsx`** | 14-stage deep analysis scanner terminal & verification grid | 465 | `FROZEN` |
| **`src/features/workspace/WorkspaceView.tsx`** | Project workspace container with secondary sidebar tabs | 185 | `FROZEN` |
| **`src/features/workspace/tabs/OverviewTab.tsx`** | Project overview, recent deployments, and build settings tab | 276 | `FROZEN` |
| **`src/features/workspace/tabs/VariablesTab.tsx`** | Environment variables and secrets management table | 445 | `FROZEN` |
| **`src/features/workspace/tabs/CloudflareTab.tsx`** | Pages bindings management (KV, D1, R2, Hooks, Routes) | 398 | `FROZEN` |
| **`src/features/workspace/tabs/DomainsTab.tsx`** | Default pages.dev and custom domains manager | 362 | `FROZEN` |
| **`src/features/workspace/tabs/LogsTab.tsx`** | Real-time edge streaming build terminal logs | 210 | `FROZEN` |
| **`src/features/workspace/tabs/HistoryTab.tsx`** | Chronological deployment history table | 133 | `FROZEN` |
| **`src/mocks/*`** | Mock datasets for projects, deployments, templates, checkpoints | 610 | `FROZEN` |
| **`src/types/*`** | TypeScript type definitions for all platform entities | 380 | `FROZEN` |

---

## 3. Inviolable Functional Invariants (Baseline Guarantees)

The following core behaviors must be strictly maintained across all refactoring phases:

1. **Active Route Routing**:
   The app provides full SPA routing across 8 active screens:
   `dashboard` | `projects` | `deployments` | `accounts` | `templates` | `settings` | `project-blank` | `project-scan` | `project-workspace`.
2. **14 Deep Analysis Checkpoints**:
   During repository scan, all 14 checkpoints must transition through scanning -> passed -> verified:
   1. Commit Evidence
   2. Root Detection
   3. Framework Detection
   4. Package Manager & Lockfile
   5. Command Resolution
   6. Output Directory
   7. Environment Variables
   8. Runtime Detection
   9. Cloudflare Pages Compatibility
   10. Durable Worker Lifecycle
   11. Project Readiness
   12. Database Migration Sync
   13. Analyzer Tooling
   14. Security Boundaries
3. **Dual-Sidebar Workspace Orchestration**:
   - Primary Sidebar collapsible with brand lockup and global navigation.
   - Secondary Sidebar for project workspace with tabs: `overview`, `variables`, `cloudflare`, `domains`, `logs`, `history`.
4. **Interactive Modal Management**:
   All 12 modals must open, close with ESC or outside click, and manage their local form states seamlessly.
5. **Toast Notification Engine**:
   Real-time feedback for all user actions (copy to clipboard, save settings, add env var, trigger deployment).
6. **Data Immutability & Reactivity**:
   All state updates (projects, env vars, deployments, settings) persist in React state without crashes.

---

## 4. Compilation & Verification Baseline Check

```bash
$ tsc --noEmit
# Exit code: 0 (Zero TypeScript errors)

$ vite build
# Exit code: 0 (Build succeeded)
```

Baseline is officially locked. No unauthorized modifications permitted.
