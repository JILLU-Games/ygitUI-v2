# YGIT PLATFORM UI — MASTER PRODUCTION UPDATE ROADMAP
**Document ID:** `YGIT-DOC-002-ROADMAP`  
**Date:** November 8, 2026  
**Status:** `READY FOR IMPLEMENTATION (PENDING USER APPROVAL)`  
**Methodology:** Incremental Step-by-Step Phased Execution with Strict Scope Locking  
**Guiding Policy:** Rule 03 Zero Unprompted Redesigns & Full Invariant Preservation  

---

## 1. Roadmap Architecture & Execution Philosophy

To prevent regressions, ensure 100% build stability (`npm run lint` && `npm run build`), and eliminate UI/UX mismatches without collateral damage, all required updates are structured into **5 sequential, scope-locked phases**.

```
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 1: Theme & Color Token Centralization (`src/index.css`)          │
│ Scope Lock: src/index.css ONLY.                                        │
│ Register missing tokens (#58a6ff, #c9d1d9, #e3b341, #da3633, etc.).   │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 2: Universal Button System Expansion                             │
│ Scope Lock: src/components/buttons/* ONLY.                             │
│ Add danger, warning, success variants to Button architecture.          │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 3: Reusable Card Primitive Extraction (`Card.tsx`)               │
│ Scope Lock: src/components/cards/* and src/components/index.ts ONLY.   │
│ Create Container, Header, Body, Footer, TelemetryEnclave primitives.   │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 4: Modal Architecture & Dialog Standardization                   │
│ Scope Lock: src/components/modals/* and SettingsView modal dialogs.    │
│ Standardize all dialogs onto ModalShell and centralized buttons.       │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 5: Viewport & Page-Level Action Harmonization                    │
│ Scope Lock: src/features/* and src/App.tsx action buttons.             │
│ Replace 68 raw <button> tags with standardized components.             │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Phase-by-Phase Detailed Specifications

### 🎯 PHASE 1: Theme & Color Token Centralization
- **Primary Goal**: Register all 7 missing, heavily-used color hexes into `@theme` and `:root` custom properties inside `src/index.css`.
- **Target Invariant**: Ensure every semantic shade defined in `COLORS.md` has an official Tailwind v4 property.
- **Strict Scope Lock**:
  - Target File: `src/index.css` ONLY.
  - FORBIDDEN: Do not modify any TSX, JSX, mock data, or config files.
- **Tokens to Register**:
  - `--color-fg-secondary: #c9d1d9;` (High-contrast secondary typography)
  - `--color-accent-blue-light: #58a6ff;` (Light blue telemetry & branch tags)
  - `--color-accent-amber-telemetry: #e3b341;` (Telemetry warning & star rating)
  - `--color-accent-red-critical: #da3633;` (Destructive action background & borders)
  - `--color-surface-hover: #282e36;` (Secondary button & row hover state)
  - `--color-canvas-overlay-dark: #05080d;` (Deep backdrop & table headers)
  - `--color-fg-placeholder: #484f58;` (Monospace input placeholders)
- **Verification Gate**:
  - Command: `npm run lint` && `npm run build`
  - Expected Result: 0 errors, styles compiled cleanly.

---

### 🎯 PHASE 2: Universal Button System Expansion
- **Primary Goal**: Enhance `PrimaryButton`, `SecondaryButton`, and `IconButton` (or introduce universal `Button.tsx` / `DangerButton.tsx`) to support all 7 archetypes from `BUTTON.md` (Primary, Secondary, Danger, Warning, Success, Ghost, Icon).
- **Target Invariant**: Eliminate the need for raw `<button>` elements when creating destructive ("Disconnect", "Delete") or telemetry ("Purge Cache", "Pause") actions.
- **Strict Scope Lock**:
  - Target Files:
    - `src/components/buttons/PrimaryButton.tsx`
    - `src/components/buttons/SecondaryButton.tsx`
    - `src/components/buttons/IconButton.tsx`
    - `src/components/buttons/index.ts`
  - FORBIDDEN: Do not touch any page views or feature folders yet.
- **Features to Add**:
  - `variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'ghost'`
  - Support for `active:scale-95` on clicks.
  - Standardized loading spinners (`<RefreshCw className="w-3.5 h-3.5 animate-spin" />`).
  - Standardized sizes: `sm` (24px/26px), `md` (28px), `lg` (34px), `cta` (38px).
- **Verification Gate**:
  - Command: `npm run lint` && `npm run build`
  - Expected Result: 0 TypeScript errors.

---

### 🎯 PHASE 3: Reusable Card Primitive Extraction (`Card.tsx`)
- **Primary Goal**: Implement the missing `Card.tsx` primitive defined in `CARDS.md` Section 6.
- **Target Invariant**: Establish uniform border radius (`rounded-lg`), uniform outer border (`border-[#21262d]`), and standardized nested telemetry enclaves (`bg-[#090d13] border border-[#21262d]`).
- **Strict Scope Lock**:
  - Target Files:
    - `src/components/cards/Card.tsx` (new)
    - `src/components/cards/index.ts` (new)
    - `src/components/index.ts` (barrel export)
  - FORBIDDEN: Do not alter any existing views until the primitive is compiled and tested.
- **Components to Provide**:
  - `<Card>`: Outer container (`bg-[#161b22] border border-[#21262d] rounded-lg`)
  - `<CardHeader>`: Divider header (`border-b border-[#21262d] p-3`)
  - `<CardBody>`: Padding block (`p-3 sm:p-3.5`)
  - `<CardFooter>`: Divider footer (`border-t border-[#21262d] bg-[#090d13]/50 p-2.5 px-3`)
  - `<CardTelemetryEnclave>`: Monospace telemetry block (`bg-[#090d13] border border-[#21262d] rounded-md p-2 font-mono text-[11px]`)
- **Verification Gate**:
  - Command: `npm run lint` && `npm run build`
  - Expected Result: Clean build and clean exports.

---

### 🎯 PHASE 4: Modal Architecture & Dialog Standardization
- **Primary Goal**: Standardize all application dialogs to use `ModalShell.tsx` and centralized button components for cancel/submit footers.
- **Strict Scope Lock**:
  - Target Files:
    - `src/components/modals/TemplateModal.tsx`
    - `src/components/modals/CloudflareBindingsModals.tsx`
    - `src/components/modals/DeleteProjectModal.tsx`
    - `src/components/modals/EditCustomDomainModal.tsx`
    - `src/components/modals/PurgeCacheModal.tsx`
    - `src/features/settings/SettingsView.tsx` (modals section only: `showAddTokenModal`, `showJsonInspector`)
  - FORBIDDEN: Do not alter core data state, props, or modal triggers.
- **Actions**:
  - Replace raw backdrop divs in `TemplateModal.tsx` and `SettingsView.tsx` with `<ModalShell>`.
  - Replace raw `<button>` footers with `<PrimaryButton>`, `<SecondaryButton>`, `<DangerButton>`.
- **Verification Gate**:
  - Command: `npm run lint` && `npm run build`
  - Verify: All dialogs open, dismiss on ESC, dismiss on backdrop click, and submit correctly.

---

### 🎯 PHASE 5: Viewport & Page-Level Action Harmonization
- **Primary Goal**: Replace the remaining raw `<button>` elements in the main views with standardized design system components.
- **Strict Scope Lock**:
  - Target Files:
    - `src/features/accounts/AccountsView.tsx` (Disconnect actions)
    - `src/features/workspace/tabs/CloudflareTab.tsx` (Create Hook, Delete, Copy, Pause, Delete actions)
    - `src/features/workspace/tabs/DomainsTab.tsx` (Claim, Suggestion pills, Set Primary, Delete actions)
    - `src/features/workspace/tabs/LogsTab.tsx` (7 terminal toolbar controls using `IconButton`)
    - `src/features/workspace/tabs/HistoryTab.tsx` (Redeploy button)
    - `src/features/settings/SettingsView.tsx` (JSON, Export, Discard, Save Changes)
    - `src/features/scanner/IntakePipeline.tsx` (Browse Local Files button)
    - `src/App.tsx` (Header Deploy, New Project, Profile menu items)
  - FORBIDDEN: Do not alter any component layout geometry, text, or business logic.
- **Verification Gate**:
  - Command: `npm run lint` && `npm run build`
  - Verify: Zero regressions, 100% feature parity.
