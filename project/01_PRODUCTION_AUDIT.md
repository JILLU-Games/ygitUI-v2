# YGIT Platform UI — Forensic Production Readiness Audit & Scope Lock

> **Audit Document**: 01_PRODUCTION_AUDIT.md  
> **Target**: Transforming the monolithic prototype into a modular, production-ready frontend architecture without visual drift.

---

## 1. Executive Summary & Gaps Analysis

The YGIT UI prototype is visually complete, feature-dense, and highly responsive. However, prior to connecting live backend APIs and deploying to production, several structural and architectural bottlenecks must be addressed:

```
┌──────────────────────────────────────────┬──────────────────────────────────────────┐
│ CURRENT PROTOTYPE BOTTLENECKS            │ TARGET PRODUCTION ARCHITECTURE           │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│ • 8,692 lines in a single App.tsx file   │ • Modular domain folders under src/      │
│ • Inlined mock state mixed with UI logic │ • Isolated mock fixtures in src/mocks/   │
│ • Repetitive atomic markup across views  │ • Shared atomic design system components │
│ • Fragile monolithic state re-renders    │ • Scoped state per feature / view        │
│ • Hardcoded HTML mockups outside React   │ • Integrated React SPA routes            │
│ • Unmanaged error states for data ops    │ • Comprehensive error boundary & UI      │
└──────────────────────────────────────────┴──────────────────────────────────────────┘
```

---

## 2. Forensic Issue Register (Discovered Gaps & Technical Debt)

| Issue ID | Category | Location | Discovered Gap / Technical Debt | Production Remedy |
| :--- | :--- | :--- | :--- | :--- |
| **GAP-01** | Monolithic Shell | `src/App.tsx:1-8692` | All views, navigation, state, and modals reside in one massive 8.7k-line file. | Split into structured feature directories (`features/`, `layouts/`, `components/`). |
| **GAP-02** | Inline Mock Data | `src/App.tsx:50-950` | `INITIAL_PROJECTS`, `READY_TEMPLATES`, and 14 scan stages occupy ~1,200 lines inside UI code. | Extract to dedicated files in `src/mocks/` with TypeScript interfaces. |
| **GAP-03** | Redundant Buttons | Across all views | Action buttons (Re-scan, Deploy, Details, Export) redefine identical Tailwind classes inline. | Centralize in `components/buttons/` (`PrimaryButton`, `SecondaryButton`, `IconButton`). |
| **GAP-04** | Redundant Badges | Across all views | Status pills (Ready, Building, Failed) and Framework tags reimplement pill styling inline. | Centralize in `components/badges/` (`StatusBadge`, `FrameworkBadge`). |
| **GAP-05** | Dual-Sidebar Coupling | `src/App.tsx:2180-2450` | Sidebar navigation is tightly coupled to application state inside `App.tsx`. | Extract to `components/navigation/PrimarySidebar.tsx` and `SecondarySidebar.tsx`. |
| **GAP-06** | Complex Modal Logic | `src/App.tsx:8250-8650` | Template Details preview modal (~400 lines) is embedded directly at the bottom of `App.tsx`. | Extract to `components/modals/TemplateModal.tsx` with clean open/close props. |
| **GAP-07** | Workspace Sub-Tabs | `src/App.tsx:4300-8200` | 6 workspace tabs (Overview, Env, Cloudflare, Domains, Logs, History) span ~4,000 lines. | Modularize into `features/workspace/tabs/` with dedicated tab components. |
| **GAP-08** | Error Handling Gaps | Global | Network failure, empty state tables, and failed domain DNS lookups lack structured fallback UI. | Implement standardized Error Handlers & Fallbacks per `project/04_ERROR_HANDLING.md`. |

---

## 3. Mandatory Scope Lock Policy

To ensure zero visual drift and eliminate any possibility of breaking existing functionality, each phase operates under a **Strict Scope Lock**:

```
                       ┌────────────────────────┐
                       │  STRICT SCOPE LOCK     │
                       └───────────┬────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
   TOUCH ONLY TARGET        PRESERVE EXISTING         ZERO UNPROMPTED
   COMPONENTS / FILES       INVARIANTS & STYLES       VISUAL REDESIGN
```

### Exact Scope Lock Per Phase:

#### Phase 1.1 Scope Lock:
- **Target Files**: `src/types/*.ts`, `src/mocks/*.ts`, import references in `src/App.tsx`.
- **Locked / Untouched**: Zero changes to JSX rendering, DOM structure, CSS classes, or component hierarchies.

#### Phase 1.2 Scope Lock:
- **Target Files**: `src/components/brand/`, `src/components/buttons/`, `src/components/badges/`, `src/components/modals/`.
- **Locked / Untouched**: Only replace repetitive inline button/badge/logo markup with the corresponding atomic component; zero layout alterations.

#### Phase 1.3 Scope Lock:
- **Target Files**: `src/components/navigation/`, `src/layouts/DualSidebarLayout.tsx`.
- **Locked / Untouched**: Only extract sidebar markup into components; widths (`190px`, `54px`, `195px`), backgrounds (`#161b22`, `#12161d`), and animations remain identical.

#### Phase 1.4 Scope Lock:
- **Target Files**: `src/features/dashboard/`, `src/features/projects/`, `src/features/templates/`, `src/features/deployments/`, `src/features/accounts/`.
- **Locked / Untouched**: Scanner engine and Workspace tabs remain completely untouched during this phase.

#### Phase 1.5 Scope Lock:
- **Target Files**: `src/features/scanner/`, `src/features/workspace/`, clean orchestration in `src/App.tsx`.
- **Locked / Untouched**: Previously extracted atomic components, navigation, and features remain stable and untouched.
