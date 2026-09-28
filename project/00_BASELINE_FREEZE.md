# YGIT Platform UI — Baseline Freeze & Architectural Registry

> **Baseline Snapshot Date**: September 28, 2026  
> **Status**: FROZEN (Immutable Reference State)  
> **Purpose**: Serves as the immutable reference point prior to commencing the 5-phase modular refactoring. Any code modifications must strictly preserve visual and behavioral parity against this baseline.

---

## 1. Baseline File System Inventory

| File Path | Total Lines | File Size (Bytes) | Role & Status |
| :--- | :--- | :--- | :--- |
| `src/App.tsx` | 8,692 lines | 474,351 bytes | Current monolithic application shell (Frozen) |
| `src/index.css` | 50 lines | 1,446 bytes | Global CSS tokens & Tailwind imports (Frozen) |
| `index.html` | 22 lines | 1,413 bytes | HTML entry point & font links (Frozen) |
| `package.json` | 37 lines | 887 bytes | Dependencies: React 19, Vite 8, Tailwind v4 (Frozen) |
| `metadata.json` | 7 lines | 329 bytes | Applet capabilities & metadata (Frozen) |
| `COLORS.md` | 637 lines | 31,284 bytes | Canonical Color Design Tokens Reference |
| `SPACING.md` | 470 lines | 22,477 bytes | Canonical Spacing, Radius & Typographic Scale |
| `BUTTON.md` | 646 lines | 29,310 bytes | Canonical Button System Specification |
| `CARDS.md` | 651 lines | 32,835 bytes | Canonical Card Layouts & Marketplace Specs |
| `SIDEBAR.md` | 1,041 lines | 44,670 bytes | Canonical Dual-Sidebar System Specification |
| `LOGO.md` | 615 lines | 27,275 bytes | Canonical Logo Coordinates, Glow & Morphing Specs |

---

## 2. Forensic Audit Cross-Verification

All existing design token documents have been audited and verified against the current baseline:

1. **Color Integrity (`COLORS.md`)**:
   - Primary Canvas: `#0d1117`, Deep Charcoal: `#090d13`
   - Primary Sidebar: `#161b22`, Secondary Workspace Sidebar: `#12161d`
   - Structural Border: `#30363d`, Subtle Border: `#21262d`
   - Brand Blue: `#1d6cf6`, Hover Blue: `#2f7af8`, Cyan Accent: `#58a6ff`
   - Success Green: `#3fb950`, Running Amber: `#d29922`, Error Red: `#f85149`
2. **Spacing & Geometry (`SPACING.md`)**:
   - Sidebar Expanded: `190px`, Collapsed: `54px`, Secondary Sidebar: `195px`
   - Micro Badges: `py-0.2 px-1.5`, Micro Pills: `text-[8.5px]`, `text-[9px]`
   - Modals: `max-w-2xl` (672px), `max-w-3xl` (768px), Content Canvas: `max-w-[1600px]`
3. **Interactive Buttons (`BUTTON.md`)**:
   - Primary Action: `bg-[#1d6cf6] hover:bg-[#2f7af8] text-white`
   - Secondary Outline: `bg-[#21262d] hover:bg-[#282e36] text-[#c9d1d9] border-[#21262d]`
   - Monospace Action: `font-mono text-xs tracking-wide uppercase`
4. **Card Systems (`CARDS.md`)**:
   - Theme Marketplace Card: `bg-[#161b22] border-[#21262d] hover:border-[#1d6cf6]/60`
   - Thumbnail Proportions: `h-44 sm:h-48`, macOS browser dots (`#ff5f56`, `#ffbd2e`, `#27c93f`)
5. **Dual-Sidebar System (`SIDEBAR.md`)**:
   - 3-tier visual depth stepping (`#161b22` → `#12161d` → `#0d1117`)
   - 5 Platform Routes: `dashboard`, `projects`, `deployments`, `accounts`, `templates`
   - 6 Workspace Sub-Tabs: `overview`, `env`, `cloudflare`, `domains`, `logs`, `history`
6. **Brand Lockup (`LOGO.md`)**:
   - Expanded: `21px × 21px` box with `0 0 2px rgba(29,108,246,0.4)` glow
   - Collapsed: `28px × 28px` morphing button (Logo ↔ `PanelLeftOpen`)

---

## 3. Baseline Freeze Invariant Declarations

- **Invariant 01 (Zero Visual Drift)**: Any extracted component must render identical CSS classes, dimensions, colors, and transitions as the baseline.
- **Invariant 02 (Zero Feature Removal)**: All 14 scan pipeline stages, live simulated telemetry, mock dataset items, and interactive modals must remain 100% operational.
- **Invariant 03 (Compilation Continuity)**: At the conclusion of every refactoring step, `npm run build` and `tsc --noEmit` must pass with zero errors.
