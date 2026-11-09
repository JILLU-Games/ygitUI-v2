# YGIT PLATFORM BASELINE AUDIT & FREEZE MANIFEST
**Document ID:** `YGIT-DOC-000-FREEZE`  
**Date:** November 8, 2026  
**Status:** `BASELINE FROZEN (PRE-REFACTORING)`  
**Branch / Target:** `main`  
**Framework Stack:** React 19 + TypeScript + Vite 8.3 + Tailwind CSS v4.3.3 + Motion 12.23  
**Verified Commands:** `npm run lint` (`tsc --noEmit`) ✅ PASSED | `npm run build` (`vite build`) ✅ PASSED  

---

## 1. Executive Summary & Freeze Declaration

This document formally establishes the **Production Baseline Freeze** for the **YGIT Platform Web Application**. Before any production refactoring, token centralization, button standardization, or component extraction commences, all current capabilities, routes, invariants, components, and layout structures are frozen as the inviolable baseline reference point.

### Strict Governance Constraints (as defined in `AGENTS.md` Rule 03):
- **Zero Unprompted Redesigns / Modifications**: Under NO circumstance should any existing page, UI component, layout structure, color palette, or styling outside the explicitly requested scope be altered, refactored, restyled, or redesigned.
- **Preserve Existing State & Invariants**: Everything outside the exact targeted delta must remain 100% untouched, intact, and unchanged.
- **Scope Locked Phases**: Every phase of the upcoming refactoring roadmap must only modify its assigned files.

---

## 2. Complete Codebase Inventory & Line Count Baseline

| Path / Module | Purpose | Lines of Code | Baseline Status |
| :--- | :--- | :--- | :--- |
| **`/src/App.tsx`** | Global application shell, navigation state, routes, modals, toasts | 2,318 | `FROZEN` |
| **`/src/index.css`** | Tailwind CSS v4 entry point, `@theme` token definitions, scrollbar styles | 88 | `FROZEN` |
| **`/src/main.tsx`** | Application bootstrap with `StrictMode` and `AppErrorBoundary` | 15 | `FROZEN` |
| **`/src/layouts/DualSidebarLayout.tsx`** | Dual-sidebar viewport layout shell orchestrator | 89 | `FROZEN` |
| **`src/components/navigation/PrimarySidebar.tsx`** | Primary global navigation sidebar (collapsed / expanded modes) | 265 | `FROZEN` |
| **`src/components/navigation/SecondarySidebar.tsx`** | Secondary project-scoped navigation sidebar (Workspace tabs) | 188 | `FROZEN` |
| **`src/components/brand/YGitLogo.tsx`** | Authentic SVG vector brand logo with precision ambient glow | 110 | `FROZEN` |
| **`src/components/brand/BetaPill.tsx`** | Micro beta badge component | 22 | `FROZEN` |
| **`src/components/buttons/PrimaryButton.tsx`** | Standard YGIT Electric Blue Primary Action Button (Archetype 1) | 63 | `FROZEN` (Underutilized) |
| **`src/components/buttons/SecondaryButton.tsx`** | Standard YGIT Neutral Slate Secondary Action Button (Archetype 2) | 62 | `FROZEN` (Underutilized) |
| **`src/components/buttons/IconButton.tsx`** | Standard Square Micro Icon Action Button (Archetype 7) | 35 | `FROZEN` (Zero Usage) |
| **`src/components/badges/StatusBadge.tsx`** | Semantic status indicator (`live`, `passed`, `building`, `failed`) | 89 | `FROZEN` |
| **`src/components/badges/MetricPill.tsx`** | Monospace telemetry pill (`blue`, `green`, `amber`, `red`, `purple`) | 59 | `FROZEN` |
| **`src/components/badges/FrameworkBadge.tsx`** | Monospace framework classification chip | 26 | `FROZEN` (Zero Usage) |
| **`src/components/templates/TemplateThumbnailGraphic.tsx`** | macOS window frame browser graphic generator for templates | 215 | `FROZEN` |
| **`src/components/modals/ModalShell.tsx`** | Standardized accessible dialog window shell with backdrop | 115 | `FROZEN` |
| **`src/components/modals/TemplateModal.tsx`** | Deep template specifications, live routes, and architecture dialog | 499 | `FROZEN` |
| **`src/components/modals/DnsConfigModal.tsx`** | Custom domain DNS verification & live probe console modal | 219 | `FROZEN` |
| **`src/components/modals/EditCustomDomainModal.tsx`** | Custom domain branch routing & SSL settings modal | 106 | `FROZEN` |
| **`src/components/modals/PurgeCacheModal.tsx`** | Cloudflare Edge cache purge trigger modal | 117 | `FROZEN` |
| **`src/components/modals/DeleteProjectModal.tsx`** | Destructive safeguard confirmation modal | 76 | `FROZEN` |
| **`src/components/modals/CloudflareBindingsModals.tsx`** | KV, D1 SQL, R2, and Webhook binding creation modals | 354 | `FROZEN` |
| **`src/components/errors/AppErrorBoundary.tsx`** | React class-based runtime crash interceptor & recovery screen | 65 | `FROZEN` |
| **`src/features/dashboard/DashboardView.tsx`** | High-density telemetry strip, 4-step pipeline preview, quick deploy | 278 | `FROZEN` |
| **`src/features/projects/ProjectsView.tsx`** | Project catalog, search filter, provider selector, status cards | 155 | `FROZEN` |
| **`src/features/deployments/DeploymentsView.tsx`** | Chronological deployment pipeline table, telemetry, redeploy action | 420 | `FROZEN` |
| **`src/features/accounts/AccountsView.tsx`** | GitHub OAuth & Cloudflare Pages edge integration management | 406 | `FROZEN` |
| **`src/features/templates/TemplatesView.tsx`** | Curated Jamstack theme marketplace with browser-framed cards | 360 | `FROZEN` |
| **`src/features/settings/SettingsView.tsx`** | User workspace settings (Preferences, Git Defaults, PAT Tokens, Alerts) | 855 | `FROZEN` |
| **`src/features/scanner/IntakePipeline.tsx`** | 4-channel repository intake pipeline (Clone, Import, Upload, Template) | 527 | `FROZEN` |
| **`src/features/scanner/ScanConsole.tsx`** | 14-Stage Deep Codebase AST Analyzer & inspection terminal stream | 465 | `FROZEN` |
| **`src/features/workspace/WorkspaceView.tsx`** | Workspace sub-view router orchestrator | 64 | `FROZEN` |
| **`src/features/workspace/tabs/OverviewTab.tsx`** | Codebase analysis summary, commit verification, instant deploy | 352 | `FROZEN` |
| **`src/features/workspace/tabs/VariablesTab.tsx`** | Key-value environment variables, encrypted secrets, bulk paste/export | 460 | `FROZEN` |
| **`src/features/workspace/tabs/CloudflareTab.tsx`** | Cloudflare Pages presets, WAF/SSL, KV, D1, R2 storage bindings | 1,283 | `FROZEN` |
| **`src/features/workspace/tabs/DomainsTab.tsx`** | Free gateway subdomains (`*.ygit.net`), custom domain DNS verification | 583 | `FROZEN` |
| **`src/features/workspace/tabs/LogsTab.tsx`** | Real-time streaming edge terminal build logs with full-screen viewer | 346 | `FROZEN` |
| **`src/features/workspace/tabs/HistoryTab.tsx`** | Chronological deployment run history, commit SHAs, rollbacks | 132 | `FROZEN` |

---

## 3. Operational State Verification

1. **Compilation Check**:
   - `tsc --noEmit`: Exited with code 0.
   - `vite build`: Successfully bundled client assets into `dist/`.
2. **Dev Server Verification**:
   - Listening on `0.0.0.0:3000` with `allowedHosts: true`.
3. **Current Invariants**:
   - All 14 scan engine checkpoints operational.
   - Dual-sidebar navigation switching between all 9 routes operational.
   - State mutations (add/edit/delete variables, bindings, domains) working in mock memory.
