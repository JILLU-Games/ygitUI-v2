# YGIT UI & Architecture Guidelines for Agents

This document defines the mandatory design principles, architectural rules, and documentation standards for developing and maintaining the **YGIT Platform UI**.

---

## 📜 Core UI Design Rules

### Rule 01: Clean & Professional UI (Feature-Connected Clarity & Zero Unrelated Fluff)
- **Compact, High-Density & Professional**: The user interface must be clean, professional, and dense (similar to Vercel, Railway, Linear, Cloudflare Dashboard).
- **Preserve All Feature-Required Details**:
  - All functional text, sub-descriptions, helper hints, workflow subtitles, progress states, status indicators, and logs that explain or power a feature MUST be fully present and maintained.
  - These are essential functional components of the product UX and must NOT be stripped away.
- **Eliminate Only Unrelated Fluff**:
  - Only remove unprompted, extraneous marketing copy, generic placeholder filler, or text that is completely unconnected to the active feature.
- **Monospace Precision**: All technical identifiers (commit SHAs, file paths, commands, domain names, hashes, and elapsed times) must be styled in monospace (`font-mono`).

---

### Rule 02: Comprehensive In-Code HTML / JSX Architecture Comments
- **Realtime Technical Documentation**: Whenever creating or modifying any page, view, or feature mockup, the code MUST include structured HTML/JSX comments.
- **Step-by-Step Flow Documentation**:
  - What each component/section is and its primary purpose.
  - Why it is designed this way and how it operates in the lifecycle.
  - Exact event triggers, sequential state transitions, and step orders (e.g., *Intake Pipeline → Progress Fill → Push to GitHub → Big Scan Button → Full-Page 14-Stage Deep Scan → Post-Scan Dual-Sidebar Workspace*).
  - Data contracts, payload structures, and expected invariants.

---

### Rule 03: Strict Scope Lock & Zero Unprompted Redesign Policy (MANDATORY)
- **Strict Scope Locking**: Whenever a specific update, feature, bug fix, or modification is requested, ONLY touch and modify that exact targeted page, component, or feature.
- **Zero Unprompted Redesigns / Modifications**: Under NO circumstance should any existing page, UI component, layout structure, color palette, or styling outside the explicitly requested scope be altered, refactored, restyled, or redesigned.
- **Preserve Existing State & Invariants**: Everything outside the exact requested change must remain 100% untouched, intact, and unchanged.
- **Surgical Precision**: Focus solely and exclusively on delivering the exact requested delta without collateral modifications across the rest of the application.

---

## 🛠️ YGIT Platform Architecture Reference

### 1. Multi-Stage Pipeline & Deep Analysis Suite (14 Invariants)
Whenever the codebase scanner runs, all 14 inspection checkpoints must be maintained:
1. **Commit Evidence**: Commit-pinned AST analysis with deterministic SHA digest (`sha256:e3b0c44`).
2. **Root Detection**: Monorepo detection with root selection (`/` vs `apps/web`) and fail-closed blocker safeguards.
3. **Framework Detection**: Vite, React, Vue, Astro, Hugo, Jekyll, Docusaurus, Static HTML.
4. **Package Manager & Lockfile**: `pnpm`, `npm`, `yarn`, `bun` with zero-conflict validation.
5. **Command Resolution**: Package script inspection resolving install & build commands (`pnpm run build`).
6. **Output Directory**: Target `dist`, `build`, `public`, `_site`, and Wrangler output paths.
7. **Environment Variables**: AST variable reference detector (`VITE_*`, `CF_*`) with zero secret leakage.
8. **Runtime Detection**: Static Jamstack execution verification.
9. **Cloudflare Pages Compatibility**: Framework registry validator & `wrangler.toml` schema validation.
10. **Durable Worker Lifecycle**: Job queue allocation, worker lease, and retry engine registration.
11. **Project Readiness**: Context attachment to project metadata and readiness state update (`100% READY`).
12. **Database Migration**: `0013_repository_analysis_deep_architecture` metadata sync & Alembic width fix.
13. **Analyzer Tooling**: Go `go-enry` helper, Node helper, Tree-sitter, Python analyzer, and Docker integration.
14. **Security Boundaries**: Provider execution disabled, zero code execution, zero secret persistence, isolated workers.

---

### 2. Dual-Sidebar Workspace Architecture
After scanning completes:
- **Primary Sidebar (Global)**: Brand lockup, Platform navigation (`Dashboard`, `Projects`, `Deployments`, `Accounts`, `Templates`).
- **Secondary Sidebar (Project-Scoped)**: Project repository context and sub-views:
  - `Overview`: Codebase analysis summary, commit verification, instant deploy action.
  - `Variables`: Environment variables table, encrypted secret toggle (`••••••••`), production/preview targets.
  - `Cloudflare`: Auto-resolved Pages build configuration, project name, production branch, and output directory.
  - `Domains`: Default Cloudflare Pages domain (`*.pages.dev`), free YGIT gateway (`*.ygit.net`), custom domain addition with DNS CNAME records.
  - `Logs`: Real-time streaming edge terminal build logs with copy logs affordance.
  - `History`: Chronological deployment history table with commit messages, branch, duration, status pills, and re-deploy triggers.
