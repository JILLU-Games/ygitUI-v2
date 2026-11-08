# YGIT PLATFORM BASELINE AUDIT & FREEZE MANIFEST
**Document ID:** `YGIT-DOC-000`  
**Date:** November 8, 2026  
**Status:** `BASELINE FROZEN`  
**Branch / Target:** `main`  
**Environment:** React 19 + TypeScript + Vite 8 + Tailwind CSS v4

---

## 1. Executive Summary & Freeze Declaration

This document establishes the official **Baseline Freeze** for the **YGIT Platform Web Application**. Before any production refactoring, token centralization, or component extraction begins, all current capabilities, routes, invariants, and styling architecture are frozen as the baseline reference point.

### Baseline Health Status
- **TypeScript Strict Validation (`tsc --noEmit`):** ✅ 0 Errors
- **Vite Production Bundler (`vite build`):** ✅ Succeeded (Bundle Size: ~340kB gzip)
- **Runtime Environment:** Pure client SPA running on Port 3000 with Express dev proxy readiness.
- **Rule Compliance:** Full adherence to `AGENTS.md` (Rule 01: Clean & Compact, Rule 02: In-Code JSX Documentation, Rule 03: Strict Scope Lock).

---

## 2. Inventory of Frozen Views & Components

### 2.1 Navigation & Global Views (`src/features/`)
| View Key | File Path | Functional State | Lines of Code | Status |
| :--- | :--- | :--- | :--- | :--- |
| `dashboard` | `src/features/dashboard/DashboardView.tsx` | Telemetry stats, live deployment metrics, quick deploy trigger | 277 | FROZEN |
| `projects` | `src/features/projects/ProjectsView.tsx` | Project catalog, search, provider filters (GitHub/Cloudflare), status pills | 154 | FROZEN |
| `deployments`| `src/features/deployments/DeploymentsView.tsx` | Chronological deployment pipeline, duration, commit SHA, instant redeploy | 419 | FROZEN |
| `accounts` | `src/features/accounts/AccountsView.tsx` | GitHub & Cloudflare live connect/disconnect, sync triggers, token scopes | 405 | FROZEN |
| `templates` | `src/features/templates/TemplatesView.tsx` | 4 production Jamstack templates, live preview graphics, 1-click clone | 359 | FROZEN |
| `settings` | `src/features/settings/SettingsView.tsx` | Clean developer settings (Preferences, Git Defaults, PAT Tokens, Alerts) | 854 | FROZEN |

### 2.2 Scanner & Intake Pipeline (`src/features/scanner/`)
| Component | File Path | Invariant / Lifecycle Step | Lines of Code | Status |
| :--- | :--- | :--- | :--- | :--- |
| `IntakePipeline` | `src/features/scanner/IntakePipeline.tsx` | Source selection (Clone, Import, Upload, Template), repo creation, progress fill | 526 | FROZEN |
| `ScanConsole` | `src/features/scanner/ScanConsole.tsx` | **14-Stage Deep Scan Engine** with deterministic SHA, AST parser, Jamstack validator | 464 | FROZEN |

### 2.3 Post-Scan Dual-Sidebar Workspace (`src/features/workspace/`)
| Tab Key | File Path | Domain Scope | Lines of Code | Status |
| :--- | :--- | :--- | :--- | :--- |
| `overview` | `src/features/workspace/tabs/OverviewTab.tsx` | Project commit digest, target platform readiness (`100% READY`), quick actions | 352 | FROZEN |
| `env` | `src/features/workspace/tabs/VariablesTab.tsx` | Key-value table, bulk .env paste/import/export, secret masking (`••••••••`) | 457 | FROZEN |
| `cloudflare` | `src/features/workspace/tabs/CloudflareTab.tsx` | Cloudflare Pages presets, edge caching, WAF/SSL, KV, D1, R2 storage bindings | 1,283 | FROZEN |
| `domains` | `src/features/workspace/tabs/DomainsTab.tsx` | Free gateway subdomains (`*.ygit.net`), custom domains with DNS CNAME records | 583 | FROZEN |
| `logs` | `src/features/workspace/tabs/LogsTab.tsx` | Streaming edge build logs, category filtering, search, full-screen terminal | 346 | FROZEN |
| `history` | `src/features/workspace/tabs/HistoryTab.tsx` | Commit history, branch tracking, deployment run duration, rollback/redeploy | 132 | FROZEN |

### 2.4 Navigation & Shared Components (`src/components/`, `src/layouts/`)
- `PrimarySidebar.tsx` (190px / 54px collapsible platform-scoped sidebar)
- `SecondarySidebar.tsx` (Project-scoped contextual sidebar)
- `DualSidebarLayout.tsx` (3-tier background stepping: `#161b22` → `#12161d` → `#0d1117`)
- `YGitLogo.tsx` (Deterministic branding SVG with morphing collapse behavior)
- `TemplateModal.tsx` (Template deep architecture & specifications inspector)
- `PrimaryButton.tsx`, `SecondaryButton.tsx`, `IconButton.tsx`
- `FrameworkBadge.tsx`, `StatusBadge.tsx`, `BetaPill.tsx`

---

## 3. Freeze Safeguards & Invariants

1. **Zero UI Regression:** No visual appearance, layout hierarchy, or component alignment may degrade during tokenization or refactoring.
2. **Deterministic State Preservation:** All mock data arrays (`src/mocks/`), event handlers, and callback signatures must retain exact structural compatibility.
3. **Strict Scope Lock:** Edits in Phase N may not touch components reserved for Phase N+1 without an explicit scope override in the roadmap.
