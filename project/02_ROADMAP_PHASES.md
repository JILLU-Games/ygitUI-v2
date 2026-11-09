# YGIT PLATFORM UI — MASTER PRODUCTION UPDATE ROADMAP
**Document ID:** `YGIT-DOC-002-ROADMAP`  
**Date:** November 8, 2026  
**Status:** `READY FOR IMPLEMENTATION (PENDING USER APPROVAL)`  
**Methodology:** Incremental Step-by-Step Phased Execution with Strict Scope Locking  
**Guiding Policy:** Rule 03 Zero Unprompted Redesigns & Full Invariant Preservation  

---

## 1. Roadmap Architecture & Execution Philosophy

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
- **Strict Scope Lock**: `src/index.css` ONLY.
- **Verification Gate**: `npm run lint` && `npm run build` (0 errors).

### 🎯 PHASE 2: Universal Button System Expansion
- **Primary Goal**: Enhance button components to support all 7 archetypes from `BUTTON.md` (Primary, Secondary, Danger, Warning, Success, Ghost, Icon).
- **Target Invariant**: Eliminate the need for raw `<button>` elements for destructive or telemetry actions.
- **Strict Scope Lock**: `src/components/buttons/*` ONLY.
- **Verification Gate**: `npm run lint` && `npm run build` (0 errors).

### 🎯 PHASE 3: Reusable Card Primitive Extraction (`Card.tsx`)
- **Primary Goal**: Implement the missing `Card.tsx` primitive defined in `CARDS.md` Section 6.
- **Target Invariant**: Establish uniform border radius (`rounded-lg`), uniform outer border (`border-[#21262d]`), and standardized nested telemetry enclaves.
- **Strict Scope Lock**: `src/components/cards/*` and `src/components/index.ts` ONLY.
- **Verification Gate**: `npm run lint` && `npm run build` (0 errors).

### 🎯 PHASE 4: Modal Architecture & Dialog Standardization
- **Primary Goal**: Standardize all application dialogs to use `ModalShell.tsx` and centralized button components for cancel/submit footers.
- **Strict Scope Lock**: `src/components/modals/*` and `SettingsView.tsx` modals.
- **Verification Gate**: `npm run lint` && `npm run build` (0 errors).

### 🎯 PHASE 5: Viewport & Page-Level Action Harmonization
- **Primary Goal**: Replace the remaining raw `<button>` elements in the main views with standardized design system components.
- **Strict Scope Lock**: `src/features/*` and `src/App.tsx`.
- **Verification Gate**: `npm run lint` && `npm run build` (0 errors).
