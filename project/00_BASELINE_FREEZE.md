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
| **`/src/index.css`** | Tailwind CSS v4 entry point, `@theme` token definitions, scrollbar styles | 88 | `FROZEN` |
| **`/src/main.tsx`** | Application bootstrap with `StrictMode` and `AppErrorBoundary` | 16 | `FROZEN` |
| **`/src/layouts/DualSidebarLayout.tsx`** | Dual-sidebar viewport layout shell orchestrator | 90 | `FROZEN` |
| **`src/components/navigation/PrimarySidebar.tsx`** | Primary global navigation sidebar (collapsed / expanded modes) | 265 | `FROZEN` |
| **`src/components/navigation/SecondarySidebar.tsx`** | Secondary project-scoped navigation sidebar (Workspace tabs) | 188 | `FROZEN` |
| **`src/components/brand/YGitLogo.tsx`** | Authentic SVG vector brand logo with precision ambient glow | 110 | `FROZEN` |
| **`src/components/brand/BetaPill.tsx`** | Micro beta badge component | 22 | `FROZEN` |
| **`src/components/buttons/PrimaryButton.tsx`** | Standard YGIT Electric Blue Primary Action Button (Archetype 1) | 63 | `FROZEN` (Underutilized) |
| **`src/components/buttons/SecondaryButton.tsx`** | Standard YGIT Neutral Slate Secondary Action Button (Archetype 2) | 62 | `FROZEN` (Underutilized) |
| **`src/components/buttons/IconButton.tsx`** | Standard Square Micro Icon Action Button (Archetype 7) | 35 | `FROZEN` (Underutilized) |
| **`src/components/badges/StatusBadge.tsx`** | Semantic status indicator (`live`, `passed`, `building`, `failed`) | 91 | `FROZEN` |
| **`src/components/badges/MetricPill.tsx`** | Monospace telemetry pill (`blue`, `green`, `amber`, `red`, `purple`) | 59 | `FROZEN` |
| **`src/components/badges/FrameworkBadge.tsx`** | Monospace framework classification chip | 33 | `FROZEN` |
| **`src/components/templates/TemplateThumbnailGraphic.tsx`** | macOS window frame browser graphic generator for templates | 215 | `FROZEN` |
| **`src/components/modals/ModalShell.tsx`** | Standardized accessible dialog window shell with backdrop | 115 | `FROZEN` |
| **`src/components/modals/TemplateModal.tsx`** | Deep template specifications, live routes, and architecture dialog | 499 | `FROZEN` |
| **`src/components/modals/DnsConfigModal.tsx`** | Custom domain DNS verification & live probe console modal | 219 | `FROZEN` |
| **`src/components/modals/EditCustomDomainModal.tsx`** | Custom domain branch routing & SSL settings modal | 106 | `FROZEN` |
| **`src/components/modals/PurgeCacheModal.tsx`** | Cloudflare Edge cache purge trigger modal | 117 | `FROZEN` |
| **`src/components/modals/DeleteProjectModal.tsx`** | Destructive safeguard confirmation modal | 76 | `FROZEN` |
| **`src/components/modals/CloudflareBindingsModals.tsx`** | KV, D1 SQL, R2, and Webhook binding creation modals | 354 | `FROZEN` |
| **`src/components/errors/AppErrorBoundary.tsx`** | React class-based runtime crash interceptor & recovery screen | 65 | `FROZEN` |
| **`src/features/dashboard/DashboardView.tsx`** | High-density telemetry strip, 4-step pipeline preview, quick deploy | 276 | `FROZEN` |
| **`src/features/projects/ProjectsView.tsx`** | Project catalog, search filter, provider selector, status cards | 154 | `FROZEN` |
| **`src/features/deployments/DeploymentsView.tsx`** | Global chronological deployment stream, multi-filter toolbar, stats | 417 | `FROZEN` |
| **`src/features/accounts/AccountsView.tsx`** | GitHub & Cloudflare provider health, OAuth sync, scopes ledger | 391 | `FROZEN` |
| **`src/features/templates/TemplatesView.tsx`** | Marketplace of ready Jamstack starters with category/framework filter | 350 | `FROZEN` |
| **`src/features/settings/SettingsView.tsx`** | Platform preferences, git defaults, access token manager, webhooks | 855 | `FROZEN` |
| **`src/features/scanner/IntakePipeline.tsx`** | 4-channel intake pipeline (Git clone, GitHub import, upload, template) | 524 | `FROZEN` |
| **`src/features/scanner/ScanConsole.tsx`** | 14-stage deep codebase AST analyzer console & checkpoint visualizer | 465 | `FROZEN` |
| **`src/features/workspace/WorkspaceView.tsx`** | Project workspace parent orchestrator | 17 | `FROZEN` |
| **`src/features/workspace/tabs/OverviewTab.tsx`** | Codebase analysis summary, commit verification, instant deploy | 321 | `FROZEN` |
| **`src/features/workspace/tabs/VariablesTab.tsx`** | Environment variables table, encrypted secret toggle, import/export | 445 | `FROZEN` |
| **`src/features/workspace/tabs/CloudflareTab.tsx`** | Cloudflare Pages config, KV/D1/R2 bindings, webhooks, wrangler.toml | 1,280 | `FROZEN` |
| **`src/features/workspace/tabs/DomainsTab.tsx`** | Free ygit subdomains claim engine, custom domains, DNS verification | 578 | `FROZEN` |
| **`src/features/workspace/tabs/LogsTab.tsx`** | Edge terminal build stream, timestamps, line wrapping, find filter | 347 | `FROZEN` |
| **`src/features/workspace/tabs/HistoryTab.tsx`** | Chronological deployment table with re-deploy triggers | 133 | `FROZEN` |

---

## 3. Core Baseline Architectural Invariants

### Invariant 01: Multi-Stage Codebase Scanner (14 Inspection Checkpoints)
Whenever the codebase scanner runs (`src/features/scanner/ScanConsole.tsx`), all 14 checkpoints must execute and pass:
1. `Commit Evidence` (deterministic SHA digest `sha256:e3b0c44`)
2. `Root Detection` (`/` vs `apps/web`)
3. `Framework Detection` (Vite, React, Vue, Astro, Next.js, Static HTML)
4. `Package Manager & Lockfile` (`pnpm`, `npm`, `yarn`, `bun`)
5. `Command Resolution` (`pnpm run build`, `npm run build`)
6. `Output Directory` (`dist`, `build`, `public`, `_site`, `.vercel/output/static`)
7. `Environment Variables` (`VITE_*`, `CF_*`)
8. `Runtime Detection` (Static Jamstack execution verification)
9. `Cloudflare Pages Compatibility` (`wrangler.toml` schema validation)
10. `Durable Worker Lifecycle` (worker lease, retry engine)
11. `Project Readiness` (`100% READY`)
12. `Database Migration` (`0013_repository_analysis_deep_architecture`)
13. `Analyzer Tooling` (`go-enry`, Tree-sitter, Python analyzer)
14. `Security Boundaries` (isolated workers, zero secret persistence)

### Invariant 02: Dual-Sidebar Viewport Hierarchy
- **Primary Sidebar (Global)**: 190px (expanded) / 54px (collapsed), Background `#161b22`, Border-Right `#30363d`.
- **Secondary Sidebar (Project-Scoped)**: 195px (fixed), Background `#12161d`, Border-Right `#30363d`.
- **Main Viewport Canvas**: Fluid width, Background `#0d1117`.

### Invariant 03: Zero Unrelated Fluff Policy
All functional sub-descriptions, helper hints, workflow subtitles, status indicators, and logs are preserved. No mock chat bots or artificial assistants may be introduced.
