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

---

### ❓ Question 2: "Kono pages er moddhe ki emon design CSS add kora ace, jeta component/Global UI design Css theke load kora uchit?"
**Answer:** **YES — Particularly Buttons, Cards, and Modals:**
1. **Buttons**: `PrimaryButton`, `SecondaryButton`, and `IconButton` exist in `src/components/buttons/`, but views contain 68 raw `<button>` elements with hand-copied Tailwind utility strings.
2. **Cards**: `CARDS.md` specifies 14 Card Archetypes, but no `Card.tsx` component exists. Every page re-invents the container div with inconsistent padding and border radiuses.
3. **Modals**: `ModalShell.tsx` was built as the single source of truth for dialog windows, yet `TemplateModal.tsx` and `SettingsView.tsx` render raw fixed backdrop divs with inline close buttons.

---

### ❓ Question 3: "Ekhono ki UI project er kono pages er moddhe self hardcoded CSS use hocce, ja globally use na korar jnno pore update/fix/newFeature er somoy UI/UX mismatch hote pare?"
**Answer:** **YES — Severe Visual Mismatches Already Exist:**
1. **Card Border Radius Drift**: Conflicting 4px, 6px, and 8px radiuses depending on which file you open.
2. **Card Outer Border Drift**: `border-[#30363d]` vs `border-[#21262d]`.
3. **Button Sizing Drift**: In `SettingsView.tsx`, buttons use non-standard `h-6` (24px).

---

### ❓ Question 4: "UI project er sokol pages er moddhe ki component/global CSS use hocce? naki kono risky ba mismatch ace?"
**Answer:** **HIGH RISK OF REGRESSION & INCONSISTENCY.**
- Danger and warning actions are hand-coded differently in every file.
- Any future feature or re-skin will create more disjointed styling unless centralized.

---

## 3. Phase-Specific Scope Locks (Strict Scope Boundary)

| Phase | Scope-Locked Target Files | Forbidden Changes |
| :--- | :--- | :--- |
| **Phase 1: Token & Theme Register** | `src/index.css` | No TSX/JSX views or components may be touched |
| **Phase 2: Universal Button System Expansion** | `src/components/buttons/*` | No pages or layout files may be touched |
| **Phase 3: Card Primitive Implementation** | `src/components/cards/*`, `src/components/index.ts` | No existing views may be modified during creation |
| **Phase 4: Modal Standardization** | `src/components/modals/*`, `SettingsView.tsx` (modals) | No routing, data mocks, or logic may be altered |
| **Phase 5: Global View Harmonization** | Views in `src/features/*`, `src/App.tsx` | Visual layouts, texts, and invariants must remain 100% identical |
