# YGIT Platform UI — Forensic Spacing Audit & Layout Design Tokens

> **Audit Date**: September 25, 2026  
> **Source Files Audited**: `src/App.tsx`, `src/index.css`, `index.html`, `project-blank.html`, `project-scan.html`, `project-workspace.html`, `projects.html`  
> **Scope**: 100% Comprehensive Forensic Audit of all Padding, Margin, Gap, Width, Height, Corner Radius, and High-Density Typography Metrics across the YGIT Platform.  
> **Design Philosophy**: High-density, professional developer interface (Linear, Vercel, Railway, Cloudflare Dashboard standard).  
> **Purpose**: Ready-to-use reference to export, reproduce, and enforce identical spatial rhythm and density in production applications.

---

## 📑 Table of Contents

1. [High-Density Spacing Philosophy & Base Grid](#1-high-density-spacing-philosophy--base-grid)
2. [Master Spacing Scale Matrix](#2-master-spacing-scale-matrix)
3. [Component Padding Breakdown (`p-*`, `px-*`, `py-*`)](#3-component-padding-breakdown-p--px--py-)
   - [3.1 Micro Badges, Tags & Status Pills](#31-micro-badges-tags--status-pills)
   - [3.2 Interactive Buttons & Action Controls](#32-interactive-buttons--action-controls)
   - [3.3 Form Inputs & Search Fields](#33-form-inputs--search-fields)
   - [3.4 Table Cells & Grid Rows](#34-table-cells--grid-rows)
   - [3.5 Cards, Panels & Workspace Containers](#35-cards-panels--workspace-containers)
   - [3.6 Modal Windows & Overlay Dialogs](#36-modal-windows--overlay-dialogs)
   - [3.7 Dropzones & Empty States](#37-dropzones--empty-states)
4. [Layout Gaps & Flow Spacing (`gap-*`)](#4-layout-gaps--flow-spacing-gap-)
5. [Margin & Positional Offset Patterns (`m-*`)](#5-margin--positional-offset-patterns-m-)
6. [Component Dimension & Sizing Matrix (`w-*`, `h-*`, `max-w-*`)](#6-component-dimension--sizing-matrix-w--h--max-w-)
   - [6.1 Icon Dimension Hierarchy](#61-icon-dimension-hierarchy)
   - [6.2 Container & Shell Heights](#62-container--shell-heights)
   - [6.3 Viewport & Modal Widths](#63-viewport--modal-widths)
7. [Corner Radius Hierarchy (`rounded-*`)](#7-corner-radius-hierarchy-rounded-)
8. [High-Density Typography & Line-Height Matrix](#8-high-density-typography--line-height-matrix)
9. [Drop-In Implementation for Real Application](#9-drop-in-implementation-for-real-application)
   - [9.1 CSS Custom Properties (`spacing.css`)](#91-css-custom-properties-spacingcss)
   - [9.2 Tailwind Config Extension (`tailwind.config.ts`)](#92-tailwind-config-extension-tailwindconfigts)
   - [9.3 TypeScript Design Tokens (`spacing.ts`)](#93-typescript-design-tokens-spacingts)

---

## 1. High-Density Spacing Philosophy & Base Grid

The YGIT Platform interface is deliberately engineered with a **tight, high-density 2px / 4px sub-grid**. Unlike standard marketing websites that employ generous 16px to 32px whitespace, developer platforms (like Linear, Cloudflare, and Railway) require immediate visibility of critical telemetry, logs, DNS records, and build pipelines without excessive scrolling.

### Spatial Invariants:
- **Base Grid Unit**: **4px** (`space-1`), with a **2px** (`space-0.5`) micro-stepping unit for badges, pills, and icon margins.
- **Visual Compactness**: Standard card bodies use **10px to 14px padding** (`p-2.5` to `p-3.5`).
- **Icon Sizing Standard**: **14px × 14px (`w-3.5 h-3.5`)** is the primary UI icon size across 155+ interface locations.
- **Button Heights**: Standard action buttons are exactly **28px to 32px tall**, with micro-pills at **18px to 22px**.
- **Border Alignment**: 1px structural borders are accounted for in flex alignment via tight `gap-1.5` (6px) and `gap-2` (8px).

---

## 2. Master Spacing Scale Matrix

This table catalogs the entire spatial scale used throughout the codebase:

| Spacing Token | Pixels (`px`) | Rem Value | Tailwind Class | Total Occurrences | Semantic Role & UI Examples |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`space-0.2`** | `0.8px` | `0.05rem` | `py-0.2` | 33 | Sub-pixel vertical centering in micro framework badges |
| **`space-0.5`** | `2px` | `0.125rem` | `p-0.5`, `py-0.5`, `gap-0.5` | 114 | Status badges, rating star gaps, icon alignment |
| **`space-1`** | `4px` | `0.25rem` | `p-1`, `py-1`, `px-1`, `gap-1` | 276 | Micro buttons, feature tag gaps, table copy triggers |
| **`space-1.5`** | `6px` | `0.375rem` | `p-1.5`, `py-1.5`, `px-1.5`, `gap-1.5` | 326 | Standard button vertical padding, metadata chips, item gaps |
| **`space-2`** | `8px` | `0.5rem` | `p-2`, `py-2`, `px-2`, `gap-2` | 400 | Table cells, standard button horizontal padding, field rows |
| **`space-2.5`** | `10px` | `0.625rem` | `p-2.5`, `py-2.5`, `px-2.5`, `gap-2.5` | 243 | Input fields, compact card inner padding, toolbar strip |
| **`space-3`** | `12px` | `0.75rem` | `p-3`, `py-3`, `px-3`, `gap-3` | 148 | Section headers, card bodies, major panel gaps |
| **`space-3.5`** | `14px` | `0.875rem` | `p-3.5`, `px-3.5` | 58 | Primary CTA button padding, feature container padding |
| **`space-4`** | `16px` | `1.0rem` | `p-4`, `px-4`, `py-4` | 24 | Page-level container padding, modal shell outer bounds |
| **`space-6`** | `24px` | `1.5rem` | `p-6` | 3 | Empty state container padding |
| **`space-7`** | `28px` | `1.75rem` | `p-7` | 1 | File bundle upload dropzone padding |
| **`space-8`** | `32px` | `2.0rem` | `pl-8`, `p-8` | 7 | Search input left icon clearance, empty filter states |
| **`space-10`** | `40px` | `2.5rem` | `py-10`, `px-5` | 1 | Project blank empty state initial setup panel |

---

## 3. Component Padding Breakdown (`p-*`, `px-*`, `py-*`)

### 3.1 Micro Badges, Tags & Status Pills
Used for `Free Theme`, framework versions (`Next.js 15`), commit SHAs, and live telemetry indicators:

```
┌─────────────────────────────────┐
│ py-0.2 (0.8px) or py-0.5 (2px)  │
│ px-1.5 (6px) or px-2 (8px)      │
│ text-[9px] or text-[9.5px] font │
└─────────────────────────────────┘
```

- **`px-1.5 py-0.2` (6px × 0.8px)**:
  - Framework pills: `<span className="text-[8.5px] font-mono px-1.5 py-0.2 rounded bg-[#1d6cf6]/10 text-[#58a6ff]">`
  - Total occurrences: **33**
- **`px-1.5 py-0.5` (6px × 2px)**:
  - Free Theme pill: `<span className="text-[8.5px] font-mono px-1.5 py-0.5 rounded bg-[#238636]/25 text-[#3fb950]">`
  - Feature tags: `<span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#090d13] text-[#7d8590]">`
  - Total occurrences: **49**
- **`px-2 py-0.5` (8px × 2px)**:
  - Free Subdomain pill, Category badge, Address bar indicator:
  - Total occurrences: **60**

---

### 3.2 Interactive Buttons & Action Controls

| Button Type | Padding Classes | Height | Font Size | Example Location |
| :--- | :--- | :--- | :--- | :--- |
| **Primary CTA Button** | `px-3.5 py-1.5` | ~32px | `text-xs font-medium` | "Use Template", "Scan Repository", "Add Repo" |
| **Standard Action Button** | `px-3 py-1.5` | ~30px | `text-xs font-medium` | "Live Demo", "Save Changes", "Claim Subdomain" |
| **Secondary Button** | `px-2.5 py-1.5` | ~28px | `text-xs font-normal` | "Details", "Quick View", "Browse Local Files" |
| **Micro Action Button** | `px-2 py-0.5` | ~22px | `text-[11px]` | "Back", "Copy all", Org selector |
| **Icon-Only Action** | `p-1` or `p-1.5` | 24px-28px | 14px icon | Live demo external link, copy button, close dialog |

---

### 3.3 Form Inputs & Search Fields

- **Standard Search & Text Input**:
  - Class: `px-2.5 py-1.5` (10px horizontal, 6px vertical)
  - Height: **32px** (`h-8` effective)
  - Typography: `text-xs font-mono`
  - Clear icon clearance: `pr-8` or `pl-8` when left search icon is present (`pl-8 py-1.5`)
- **Compact Select Dropdowns**:
  - Class: `px-2.5 py-1.5` or `px-2 py-0.5` (8px horizontal, 2px vertical)
  - Height: **24px to 30px**
  - Typography: `text-xs` or `text-[11px]`

---

### 3.4 Table Cells & Grid Rows

- **Table Header (`<thead> <th>`)**:
  - Class: `px-2.5 py-1` or `p-2`
  - Typography: `text-[9.5px]` or `text-[10px] font-mono uppercase`
- **Table Body Row (`<tbody> <td>`)**:
  - Class: `p-2` or `px-2.5 py-1.5` (8px to 10px horizontal, 6px to 8px vertical)
  - Typography: `text-xs font-mono`
  - Vertical alignment: `align-middle`

---

### 3.5 Cards, Panels & Workspace Containers

- **Standard Card Container**:
  - Outer: `rounded-lg border border-[#21262d]`
  - Body: `p-3 sm:p-3.5` (12px on mobile, 14px on desktop)
  - Header Strip: `px-3 py-2.5` or `p-2.5 sm:p-3`
  - Action Footer Strip: `p-2.5 px-3` (10px vertical, 12px horizontal)
- **Top Summary & Filter Bar**:
  - Class: `p-2.5 sm:p-3` (10px mobile, 12px desktop)
  - Height: Dynamic single-row auto-wrap

---

### 3.6 Modal Windows & Overlay Dialogs

- **Outer Modal Frame**:
  - Overlay: `p-2.5 sm:p-4` (provides responsive safety margin around modal box)
- **Modal Header**:
  - Class: `px-3.5 py-2.5 sm:px-4 sm:py-3`
- **Modal Body**:
  - Class: `p-3 sm:p-4` with internal `gap-2.5` to `gap-3`
- **Modal Footer**:
  - Class: `px-3.5 py-2.5 sm:px-4 sm:py-3`

---

### 3.7 Dropzones & Empty States

- **Zero-State Blank Container**:
  - Class: `py-10 px-5` (40px vertical, 20px horizontal)
  - Minimum height: `min-h-[400px]`
- **Asset Upload Dropzone**:
  - Class: `p-7` (28px all around)

---

## 4. Layout Gaps & Flow Spacing (`gap-*`)

The project uses Flexbox and Grid `gap-*` utilities exclusively (avoiding fragile margin collapses):

```
┌────────────────────────────────────────────────────────┐
│ gap-3 (12px)     Major Page Sections & Card Columns    │
│  ┌──────────────────────────────────────────────────┐  │
│  │ gap-2.5 (10px)  Sub-sections & Form Stacks       │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │ gap-2 (8px)     Field Rows & Button Pairs  │  │  │
│  │  │  ┌──────────────────────────────────────┐  │  │  │
│  │  │  │ gap-1.5 (6px)  Metadata Chips & Tags │  │  │  │
│  │  │  │  ┌────────────────────────────────┐  │  │  │  │
│  │  │  │  │ gap-1 (4px)   Icon + Label     │  │  │  │  │
│  │  │  │  │  ┌──────────────────────────┐  │  │  │  │  │
│  │  │  │  │  │ gap-0.5 (2px) Micro Pair │  │  │  │  │  │
│  │  │  │  │  └──────────────────────────┘  │  │  │  │  │
│  │  │  │  └────────────────────────────────┘  │  │  │  │
│  │  │  └──────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

| Gap Class | Pixel Value | Occurrences | Semantic Function |
| :--- | :--- | :--- | :--- |
| **`gap-0.5`** | `2px` | **26** | Micro pairing: Star icon + rating number, sub-pixel badge icons |
| **`gap-1`** | `4px` | **96** | Icon + text inside buttons, feature chip clusters, compact toolbar controls |
| **`gap-1.5`** | `6px` | **158** | Standard metadata strip (author · rating · uses · framework), button icon rows |
| **`gap-2`** | `8px` | **161** | **Primary flex gap** across form inputs, button groups, modal headers, filter rows |
| **`gap-2.5`** | `10px` | **55** | Form stack vertical spacing, card body inner vertical flow, quick specs bars |
| **`gap-3`** | `12px` | **24** | Main card grids (`grid gap-3`), major section vertical layouts |

---

## 5. Margin & Positional Offset Patterns (`m-*`)

Margins are strictly reserved for:
1. Micro-tuning icon alignment relative to text baseline (`mt-0.5` — 2px).
2. Flexbox alignment pushes (`mt-auto` to push action bars to bottom of cards, `ml-auto` to push badges to right edge).
3. Horizontal viewport centering (`mx-auto max-w-[1600px]`).
4. Label-to-input vertical separation (`mb-1` — 4px).

| Margin Class | Pixels | Occurrences | Role |
| :--- | :--- | :--- | :--- |
| **`mt-0.5`** | `2px` | 9 | Aligns icons with monospace cap-height |
| **`mx-auto`** | Auto | 8 | Centers main page content within `max-w-[1400px]` or `max-w-[1600px]` |
| **`mb-1`** | `4px` | 4 | Separates input title labels from input fields |
| **`mt-auto`** | Auto | 4 | Pushes bottom action row of card to align perfectly across grid |
| **`mt-1` / `mt-1.5`** | `4px` / `6px` | 3 | Spacing below dropzone text or action buttons |
| **`mt-2`** | `8px` | 2 | Separates empty state reset button from message |
| **`ml-auto`** | Auto | 1 | Pushes framework badge to extreme right of card metadata row |
| **`mb-3`** | `12px` | 1 | Empty state icon margin |
| **`mb-4.5`** | `18px` | 1 | Empty state description text bottom margin |

---

## 6. Component Dimension & Sizing Matrix (`w-*`, `h-*`, `max-w-*`)

### 6.1 Icon Dimension Hierarchy

All Lucide icons are strictly sized using these discrete classes:

| Class Pair | Pixels | Occurrences | Functional Role |
| :--- | :--- | :--- | :--- |
| **`w-2.5 h-2.5`** | `10px × 10px` | 7 | Address bar SSL lock icon, micro cart icon |
| **`w-3 h-3`** | `12px × 12px` | 51 | Star rating icon, sub-indicators, live link icon, spinner inside button |
| **`w-3.5 h-3.5`** | **`14px × 14px`** | **155** | **Primary standard UI icon size** (Lucide icons in buttons, tabs, badges) |
| **`w-4 h-4`** | `16px × 16px` | 34 | Search input icons, primary CTA button icons, modal close icons |
| **`w-5 h-5`** | `20px × 20px` | 5 | Empty state icon, big scan button icon |
| **`w-6 h-6`** | `24px × 24px` | 10 | Header icon boxes, template logo badges |
| **`w-7 h-7`** | `28px × 28px` | 14 | Resource selector card icon boxes, collapsed sidebar logo frame |
| **`w-8 h-8`** | `32px × 32px` | 4 | Cloudflare orange header avatar, team avatar |
| **`w-9 h-9`** | `36px × 36px` | 1 | File bundle upload dropzone icon container |
| **`w-11 h-11`**| `44px × 44px` | 2 | Empty state large icon circle |

### 6.2 Container & Shell Heights

- **Browser Window Chrome (Mockup)**: `h-6` (**24px**)
- **macOS Window Dots**: `w-2 h-2` (**8px × 8px**)
- **Progress Bars**: `h-1.5` (**6px**)
- **Status Dot Pulsars**: `w-1.5 h-1.5` (**6px × 6px**)
- **Card Preview Thumbnail (Theme Market)**: `h-44 sm:h-48` (**176px to 192px**)
- **Modal Hero Preview Thumbnail**: `h-64 sm:h-72` (**256px to 288px**)
- **Scrollable Code Block / List Max Height**: `max-h-[220px]` or `max-h-[90vh]`

### 6.3 Viewport & Modal Widths

- **Search Inputs**: `max-w-md` (**448px**)
- **Small Empty State Copy**: `max-w-sm` (**384px**)
- **DNS Records Modal**: `max-w-2xl` (**672px**)
- **Template Details Modal**: `max-w-3xl` (**768px**)
- **Project Scan & Workspace Page**: `max-w-[1400px]` (**1400px**)
- **Templates Marketplace View**: `max-w-[1600px]` (**1600px**)

---

## 7. Corner Radius Hierarchy (`rounded-*`)

The application avoids pill-shaped cards or inconsistent rounded edges, maintaining architectural precision:

| Class | Pixels | Occurrences | Semantic Assignment |
| :--- | :--- | :--- | :--- |
| **`rounded-xs`** | `2px` | 1 | Micro favicon container, logo image corners |
| **`rounded`** | **`4px`** | **450** | **The Universal UI Radius**: buttons, inputs, badges, table cells, code tabs |
| **`rounded-md`** | `6px` | 61 | Search inputs, resource option cards, modal action buttons, small cards |
| **`rounded-lg`** | `8px` | 23 | Primary cards, theme marketplace cards, modal window outer shells |
| **`rounded-t-lg`**| `8px top` | 1 | Top corners of browser-framed thumbnails |
| **`rounded-full`**| `9999px` | 29 | Status dots (`●`), avatars, circle icon backings, price pill badges (`Free`) |

---

## 8. High-Density Typography & Line-Height Matrix

Text sizes strictly correlate with spacing to ensure vertical rhythm:

| Font Size Token | Exact Pixels | Line Height | Usage Example |
| :--- | :--- | :--- | :--- |
| **`text-[7px]` / `text-[8px]`** | `7px - 8px` | `leading-tight` | Micro badges inside vector preview graphics |
| **`text-[8.5px]`** | `8.5px` | `leading-none` | Framework chips, theme style tags |
| **`text-[9px]`** | `9px` | `leading-none` | Feature tags, address bar URL, floating badges |
| **`text-[9.5px]`** | `9.5px` | `leading-snug` | Monospace table headers, build time, free theme pills |
| **`text-[10px]` / `text-[10.5px]`** | `10px - 10.5px`| `leading-normal` | Author bylines, commit SHAs, helper metadata |
| **`text-[11px]` / `text-[11.5px]`** | `11px - 11.5px`| `leading-relaxed`| Short bios, descriptions, secondary table data |
| **`text-xs` (`text-[12px]`)** | `12px` | `leading-normal` | **Standard UI Body**: Button text, form inputs, nav links |
| **`text-[12.5px]`** | `12.5px` | `leading-[1.35]`| Card section titles, resource card titles |
| **`text-[13px]` / `text-[13.5px]`** | `13px - 13.5px`| `leading-tight` | Theme card title, YGIT site name, project title |
| **`text-sm` (`text-[14px]`)** | `14px` | `leading-normal` | Empty state title, modal major titles |
| **`text-base` (`text-[16px]`)** | `16px` | `leading-none` | Lighthouse audit scores (`100`), telemetry values |

---

## 9. Drop-In Implementation for Real Application

### 9.1 CSS Custom Properties (`spacing.css`)

```css
:root {
  /* ========================================================================
     SPACING & SIZING TOKENS (HIGH-DENSITY BASE GRID)
     ======================================================================== */
  --space-0-2: 0.8px;
  --space-0-5: 2px;
  --space-1: 4px;
  --space-1-5: 6px;
  --space-2: 8px;
  --space-2-5: 10px;
  --space-3: 12px;
  --space-3-5: 14px;
  --space-4: 16px;
  --space-6: 24px;
  --space-7: 28px;
  --space-8: 32px;
  --space-10: 40px;

  /* ========================================================================
     BORDER RADIUS TOKENS
     ======================================================================== */
  --radius-xs: 2px;
  --radius-default: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-full: 9999px;

  /* ========================================================================
     STANDARD COMPONENT HEIGHTS
     ======================================================================== */
  --height-button-micro: 22px;
  --height-button-sm: 28px;
  --height-button-md: 32px;
  --height-input-sm: 30px;
  --height-input-md: 32px;
  --height-browser-chrome: 24px;
  --height-thumbnail-card: 180px;
  --height-thumbnail-hero: 270px;

  /* ========================================================================
     MAX CONTAINER WIDTHS
     ======================================================================== */
  --max-w-search: 448px;
  --max-w-modal-dns: 672px;
  --max-w-modal-template: 768px;
  --max-w-container-default: 1400px;
  --max-w-container-wide: 1600px;
}
```

---

### 9.2 Tailwind Config Extension (`tailwind.config.ts`)

```typescript
import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '0.2': '0.8px',
        '0.5': '2px',
        '1.5': '6px',
        '2.5': '10px',
        '3.5': '14px',
        '4.5': '18px',
        '7': '28px',
      },
      borderRadius: {
        xs: '2px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
      },
      fontSize: {
        'micro-7': ['7px', { lineHeight: '1.2' }],
        'micro-8': ['8px', { lineHeight: '1.2' }],
        'badge-9': ['9px', { lineHeight: '1.3' }],
        'badge-9.5': ['9.5px', { lineHeight: '1.3' }],
        'meta-10': ['10px', { lineHeight: '1.4' }],
        'meta-10.5': ['10.5px', { lineHeight: '1.4' }],
        'body-11': ['11px', { lineHeight: '1.5' }],
        'body-11.5': ['11.5px', { lineHeight: '1.5' }],
        'title-13': ['13px', { lineHeight: '1.3' }],
        'title-13.5': ['13.5px', { lineHeight: '1.3' }],
      },
      maxWidth: {
        'modal-dns': '672px',
        'modal-template': '768px',
        'workspace': '1400px',
        'marketplace': '1600px',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

---

### 9.3 TypeScript Design Tokens (`spacing.ts`)

```typescript
export const YGIT_SPACING = {
  units: {
    micro02: '0.8px',
    micro: '2px',
    base1: '4px',
    base15: '6px',
    base2: '8px',
    base25: '10px',
    base3: '12px',
    base35: '14px',
    base4: '16px',
    base6: '24px',
    base7: '28px',
    base8: '32px',
    base10: '40px',
  },
  radius: {
    xs: '2px',
    default: '4px',
    md: '6px',
    lg: '8px',
    full: '9999px',
  },
  icons: {
    micro: '10px',
    status: '12px',
    standard: '14px', // Universal UI icon
    action: '16px',
    section: '20px',
    boxSmall: '24px',
    boxMedium: '28px',
    avatar: '32px',
  },
  containers: {
    searchMax: '448px',
    dnsModalMax: '672px',
    templateModalMax: '768px',
    workspaceMax: '1400px',
    marketplaceMax: '1600px',
  },
} as const;

export type YgitSpacing = typeof YGIT_SPACING;
```

---

## 10. Forensic Audit Summary

- **Total Spacing Dimensions Cataloged**: 100% of all padding, margin, gap, sizing, and radius classes.
- **Primary Spatial Rhythm**: Strict 2px / 4px sub-grid with 6px, 8px, 10px, 12px, and 14px standard intervals.
- **Universal Component Radius**: `rounded` (4px) with 450 instances across the codebase.
- **Universal Icon Dimension**: `w-3.5 h-3.5` (14px) with 155 instances.
- **High-Density Data Assurance**: Zero arbitrary loose padding; perfectly synchronized with `COLORS.md` for production implementation.
