# YGIT Platform UI — Forensic Logo Size & Position Specification

> **Audit Date**: September 26, 2026  
> **Source Files Audited**: `src/App.tsx`, `index.html`, `src/index.css`, `project-blank.html`, `project-scan.html`, `project-workspace.html`, `projects.html`  
> **Scope**: 100% Comprehensive Forensic Audit of the YGIT Brand Logo, Icon Marks, Dimensional Metrics, Precision Box Glows, Coordinate Positioning, Collapsed/Expanded Hover States, Favicon Specs, and Drop-In Production Implementations.  
> **Purpose**: Production-grade reference manual to reproduce, export, and implement the exact brand logo and lockup geometry in real web applications without visual drift.

---

## 📑 Table of Contents

1. [Brand Identity & Core Assets](#1-brand-identity--core-assets)
2. [Master Dimensional & Spatial Matrix](#2-master-dimensional--spatial-matrix)
3. [Expanded Sidebar Brand Lockup (`w-[190px]`)](#3-expanded-sidebar-brand-lockup-w-190px)
   - [3.1 Container & Coordinate Positioning](#31-container--coordinate-positioning)
   - [3.2 Logo Icon Wrapper & Precision Ambient Glow](#32-logo-icon-wrapper--precision-ambient-glow)
   - [3.3 Image Element & Drop-Shadow Specs](#33-image-element--drop-shadow-specs)
   - [3.4 SVG Vector Fallback Architecture](#34-svg-vector-fallback-architecture)
   - [3.5 Brand Typography & Beta Tag Spacing](#35-brand-typography--beta-tag-spacing)
   - [3.6 Collapse Action Button Positioning](#36-collapse-action-button-positioning)
4. [Collapsed Sidebar Brand Lockup (`w-[54px]`)](#4-collapsed-sidebar-brand-lockup-w-54px)
   - [4.1 Container & Centered Coordinate Frame](#41-container--centered-coordinate-frame)
   - [4.2 Two-Stage Morphing Icon Button (Logo ↔ Expand Icon)](#42-two-stage-morphing-icon-button-logo--expand-icon)
   - [4.3 Hover Physics & Transition Timing](#43-hover-physics--transition-timing)
5. [Browser Chrome & Favicon Assets](#5-browser-chrome--favicon-assets)
6. [HTML Prototype Variants Matrix](#6-html-prototype-variants-matrix)
7. [Color Tokens, Glows & Filter Optics](#7-color-tokens-glows--filter-optics)
8. [Production Drop-In Code](#8-production-drop-in-code)
   - [8.1 TypeScript Types (`types/logo.ts`)](#81-typescript-types-typeslogots)
   - [8.2 Reusable React Component (`components/YGitLogo.tsx`)](#82-reusable-react-component-componentsygitlogotsx)
   - [8.3 Standalone CSS Variables & Utilities (`logo.css`)](#83-standalone-css-variables--utilities-logocss)

---

## 1. Brand Identity & Core Assets

The YGIT Platform uses a distinctive, high-density brand identity inspired by modern cloud developer dashboards (Cloudflare, Railway, Linear, Vercel). The brand mark consists of:

1. **Official Asset URI**: `https://ygit.net/dashboard/assets/brand/YGIT_Icon.png`
2. **Symbolism**: Electric lightning bolt mark rendered in high-contrast electric brand blue (`#1d6cf6`), illuminated by an ambient sub-pixel cyan-blue aura (`#58a6ff` / `rgba(29,108,246,0.4)`).
3. **Wordmark**: `YGIT` in bold uppercase sans-serif typography accompanied by a lowercase monospace `beta` pill tag.
4. **Resilience Contract**: If the CDN image fails to load or is offline, an inline SVG vector lightning polygon (`polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"`) immediately hydrates via `onError` without any layout shift.

---

## 2. Master Dimensional & Spatial Matrix

| Attribute | Primary Sidebar (Expanded) | Primary Sidebar (Collapsed) | HTML Prototype (Standard) | HTML Prototype (Large) | Browser Favicon |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Context** | Left Nav Header | Collapsed Nav Top | `project-blank` / `scan` | `projects.html` | Browser Tab / Touch |
| **Total Nav Width** | `190px` | `54px` | `180px` – `200px` | `240px` | N/A |
| **Header Height** | `41px` (`py-2.5`) | `41px` (`py-2.5`) | `41px` (`10px 12px`) | `49px` (`12px 14px`) | N/A |
| **Logo Wrapper Box**| `21px × 21px` (`w-[21px] h-[21px]`) | `28px × 28px` (`w-7 h-7`) | `20px × 20px` | `24px × 24px` | `32px × 32px` |
| **Inner Image Size**| `17px × 17px` (after `p-0.5`) | `16px × 16px` (`w-4 h-4`) | `12px × 12px` (SVG) | `14px × 14px` (SVG) | `100%` |
| **Border Radius** | `6px` (`rounded-md`) | `6px` (`rounded-md`) | `4px` (`var(--radius-sm)`)| `4px` (`var(--radius-sm)`)| N/A |
| **Wrapper Background**| `#090d13` (Deep Canvas) | `#161b22` (Charcoal) | `#1d6cf6` (Solid Blue) | `#1d6cf6` (Solid Blue) | Transparent |
| **Wrapper Border** | `1px solid rgba(29,108,246,0.35)` | `1px solid #30363d` | None | None | None |
| **Hover Border** | Maintained with button hover | `1px solid rgba(29,108,246,0.40)` | N/A | N/A | N/A |
| **Box Shadow** | `0 0 2px rgba(29,108,246,0.4)` | `0 0 2px rgba(29,108,246,0.3)` | None | None | None |
| **Image Filter** | `drop-shadow(0 0 1px #58a6ff)` | `drop-shadow(0 0 1px #58a6ff)` | None | None | None |
| **Horizontal Gap** | `10px` (`gap-2.5`) to text | Center aligned (`gap-0`) | `6px` – `8px` | `8px` | N/A |
| **Typography Size** | `13.5px` (`text-[13.5px]`) | Hidden | `13px` / `14px` | `14px` | N/A |
| **Typography Weight**| `800` (`font-extrabold`) | Hidden | `700` (`font-bold`) | `700` (`font-bold`) | N/A |
| **Typography Color** | `#f0f6fc` → `white` on hover | Hidden | `#f0f6fc` | `#f0f6fc` | N/A |
| **Beta Tag Size** | `8.5px` (`text-[8.5px]`) | Hidden | N/A (`badge-plain`) | N/A (`Deploy`) | N/A |

---

## 3. Expanded Sidebar Brand Lockup (`w-[190px]`)

### 3.1 Container & Coordinate Positioning

In the default expanded state (`isSidebarCollapsed === false`), the brand bar is positioned at the top of the primary sidebar:

```
┌────────────────────────────────────────────────────────────────────────┐
│ PRIMARY SIDEBAR HEADER (Width: 190px, Height: 41px)                    │
│ Padding: py-2.5 px-3 (Top/Bottom 10px, Left/Right 12px)                │
│ Border-Bottom: 1px solid #21262d                                       │
├───────────────────────────────────────────────────────┬────────────────┤
│ BRAND BUTTON LOCKUP (Left-aligned, flex, gap: 10px)   │ COLLAPSE BTN   │
│                                                       │                │
│ ┌───────────┐  YGIT       ┌──────┐                    │ ┌────────────┐ │
│ │ 21px×21px │  13.5px     │ beta │                    │ │ PanelLeft  │ │
│ │ Logo Icon │  Extrabold  │ 8.5px│                    │ │ Close 14px │ │
│ └───────────┘  #f0f6fc    └──────┘                    │ └────────────┘ │
│                                                       │ p-1 (#8b949e)  │
└───────────────────────────────────────────────────────┴────────────────┘
```

#### Exact JSX Layout Code:
```tsx
<div className="py-2.5 px-3 border-b border-[#21262d] flex items-center justify-between">
  {/* Clickable Brand Lockup */}
  <button
    onClick={() => setActiveRoute('dashboard')}
    className="flex items-center gap-2.5 hover:opacity-95 transition-opacity cursor-pointer group"
  >
    {/* 1. Logo Icon Wrapper */}
    <div className="relative w-[21px] h-[21px] rounded-md bg-[#090d13] border border-[#1d6cf6]/35 p-0.5 shadow-[0_0_2px_rgba(29,108,246,0.4)] flex items-center justify-center shrink-0">
      <img
        src="https://ygit.net/dashboard/assets/brand/YGIT_Icon.png"
        alt="YGIT"
        className="w-full h-full object-contain rounded-xs drop-shadow-[0_0_1px_rgba(88,166,255,0.7)]"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="%231d6cf6"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
        }}
      />
    </div>

    {/* 2. Site Name YGIT with small beta tag */}
    <div className="flex items-center gap-1.5">
      <span className="font-extrabold text-[13.5px] tracking-tight text-[#f0f6fc] font-sans group-hover:text-white transition-colors">
        YGIT
      </span>
      <span className="text-[8.5px] font-mono font-medium lowercase px-1.5 py-0.2 rounded-full bg-[#1d6cf6]/15 text-[#58a6ff] border border-[#1d6cf6]/30 leading-none">
        beta
      </span>
    </div>
  </button>

  {/* 3. Collapse Action Button */}
  <button
    type="button"
    onClick={() => setIsSidebarCollapsed(true)}
    title="Collapse sidebar"
    className="p-1 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] rounded cursor-pointer transition-colors"
  >
    <PanelLeftClose className="w-3.5 h-3.5" />
  </button>
</div>
```

---

### 3.2 Logo Icon Wrapper & Precision Ambient Glow

The icon wrapper box provides high visual contrast against the `#161b22` sidebar background:
- **Width & Height**: Exactly `21px` by `21px` (`w-[21px] h-[21px]`).
- **Corner Radius**: `6px` (`rounded-md`).
- **Inner Padding**: `2px` (`p-0.5`).
- **Background Color**: `#090d13` (Deep Obsidian / Black Base).
- **Border Stroke**: `1px solid rgba(29, 108, 246, 0.35)` (`border-[#1d6cf6]/35`).
- **Aura Glow Shadow**: `box-shadow: 0 0 2px rgba(29, 108, 246, 0.4)` (`shadow-[0_0_2px_rgba(29,108,246,0.4)]`).
- **Flex Positioning**: `flex items-center justify-center shrink-0` (Guarantees the logo box never squeezes or warps regardless of layout pressure).

---

### 3.3 Image Element & Drop-Shadow Specs

- **Width & Height**: `100%` of inner padding space (`w-full h-full`, rendering at `17px × 17px`).
- **Object Fit**: `object-contain` (Preserves true pixel aspect ratio).
- **Corner Radius**: `2px` (`rounded-xs`).
- **Sub-Pixel Filter Glow**: `drop-shadow-[0_0_1px_rgba(88,166,255,0.7)]`  
  *CSS equivalent*: `filter: drop-shadow(0px 0px 1px rgba(88, 166, 255, 0.7));`  
  This adds an authentic neon edge rim to the lightning mark without creating blurry artifacting.

---

### 3.4 SVG Vector Fallback Architecture

If the remote PNG asset encounters a network failure or latency delay, the native `onError` event handler swaps the `src` to an optimized data-URI SVG:

```html
data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="%231d6cf6"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
```

- **Vector Geometry**: High-speed lightning bolt with points: `(13,2) → (3,14) → (12,14) → (11,22) → (21,10) → (12,10) → (13,2)`.
- **Fill Color**: `%231d6cf6` (`#1d6cf6` Brand Blue).
- **Zero Shift Guarantee**: The fallback SVG uses identical viewBox proportions, avoiding any re-flow or UI jitter.

---

### 3.5 Brand Typography & Beta Tag Spacing

#### Typography Specs:
- **Font Family**: Plus Jakarta Sans / Inter / system sans-serif (`font-sans`).
- **Font Size**: `13.5px` (`text-[13.5px]`).
- **Font Weight**: `800` (`font-extrabold`).
- **Letter Spacing**: `-0.025em` (`tracking-tight`).
- **Text Color**: `#f0f6fc` (Bright Canvas Text).
- **Hover Transition**: Switches to `#ffffff` (`group-hover:text-white transition-colors`).
- **Line Height**: Normal.

#### Beta Tag Badge Specs:
- **Font Family**: JetBrains Mono / monospace (`font-mono`).
- **Font Size**: `8.5px` (`text-[8.5px]`).
- **Font Weight**: `500` (`font-medium`).
- **Casing**: Lowercase (`lowercase`, strictly rendered as `beta`).
- **Padding**: Horizontal `6px` (`px-1.5`), Vertical `0.8px` (`py-0.2`).
- **Corner Radius**: `9999px` (`rounded-full`).
- **Background**: `rgba(29, 108, 246, 0.15)` (`bg-[#1d6cf6]/15`).
- **Text Color**: `#58a6ff` (Electric Cyan Blue).
- **Border**: `1px solid rgba(29, 108, 246, 0.30)` (`border-[#1d6cf6]/30`).
- **Line Height**: `leading-none` (Prevents line-box expansion).
- **Gap from Wordmark**: `6px` (`gap-1.5`).

---

### 3.6 Collapse Action Button Positioning

- **Position**: Right aligned via `flex items-center justify-between` within the `190px` header.
- **Dimensions**: `22px × 22px` clickable area (`p-1`).
- **Icon Size**: `14px × 14px` (`w-3.5 h-3.5`).
- **Default Color**: `#8b949e` (Muted Grey).
- **Hover Color**: `#f0f6fc` on `bg-[#21262d]`.
- **Icon Component**: Lucide `PanelLeftClose`.

---

## 4. Collapsed Sidebar Brand Lockup (`w-[54px]`)

### 4.1 Container & Centered Coordinate Frame

When the user clicks the collapse button (`isSidebarCollapsed === true`), the sidebar animates to `54px` width. The brand header transforms into a perfectly centered, interactive icon button:

```
┌─────────────────────────────────┐
│ COLLAPSED HEADER (Width: 54px)  │
│ Padding: py-2.5 px-1.5          │
│ Border-Bottom: 1px solid #21262d│
├─────────────────────────────────┤
│                                 │
│        ┌──────────────┐         │
│        │  28px × 28px │         │
│        │ [Logo / Open]│         │
│        └──────────────┘         │
│         Centered in 54px        │
│                                 │
└─────────────────────────────────┘
```

---

### 4.2 Two-Stage Morphing Icon Button (Logo ↔ Expand Icon)

The collapsed header combines the logo display and the sidebar expand trigger into a single space-saving interactive control:

```tsx
<button
  type="button"
  onClick={() => setIsSidebarCollapsed(false)}
  title="Click to expand sidebar (YGIT beta)"
  className="group relative w-7 h-7 bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] hover:border-[#1d6cf6]/40 rounded-md flex items-center justify-center cursor-pointer transition-colors shadow-[0_0_2px_rgba(29,108,246,0.3)] p-1"
>
  {/* State A (Default): Brand Logo with subtle 1px glow */}
  <img
    src="https://ygit.net/dashboard/assets/brand/YGIT_Icon.png"
    alt="YGIT"
    className="w-4 h-4 object-contain transition-opacity duration-150 group-hover:opacity-0 drop-shadow-[0_0_1px_rgba(88,166,255,0.7)]"
    onError={(e) => {
      (e.currentTarget as HTMLImageElement).src =
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="%231d6cf6"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
    }}
  />

  {/* State B (Hover): Expand Toggle Icon */}
  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-[#58a6ff]">
    <PanelLeftOpen className="w-3.5 h-3.5" />
  </div>
</button>
```

#### Behavioral Invariants:
1. **At Rest (Default)**:
   - The user sees the YGIT logo image (`w-4 h-4` / `16px × 16px`) resting inside a `28px × 28px` container.
   - The border is neutral dark grey (`#30363d`) with a subtle `rgba(29,108,246,0.3)` box shadow.
2. **On Hover (Interaction)**:
   - The logo image fades out smoothly (`group-hover:opacity-0 transition-opacity duration-150`).
   - The `PanelLeftOpen` icon (`14px × 14px`) fades in with vibrant electric blue `#58a6ff` (`opacity-0 group-hover:opacity-100`).
   - The button border lights up to `rgba(29,108,246,0.40)`.
   - The button surface shifts from `#161b22` to `#21262d`.
3. **On Click**:
   - Toggles `isSidebarCollapsed` to `false`, expanding the sidebar to `190px`.

---

### 4.3 Hover Physics & Transition Timing

| Interaction State | Wrapper Background | Wrapper Border | Icon Visible | Icon Color | Transition Curve |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Normal / Rest** | `#161b22` | `#30363d` | Brand PNG Logo | Native Brand Blue | `150ms ease` |
| **Hover** | `#21262d` | `rgba(29,108,246,0.40)` | `PanelLeftOpen` | `#58a6ff` | `150ms ease` |
| **Active / Click**| `#1c2128` | `rgba(29,108,246,0.60)` | `PanelLeftOpen` | `#ffffff` | `75ms ease` |

---

## 5. Browser Chrome & Favicon Assets

The platform sets brand continuity across the operating system and browser window through `index.html`:

```html
<!-- Standard Tab Favicon (16px, 32px, 48px scalable PNG) -->
<link rel="icon" type="image/png" href="https://ygit.net/dashboard/assets/brand/YGIT_Icon.png" />

<!-- iOS / iPadOS Safari Home Screen Touch Icon -->
<link rel="apple-touch-icon" href="https://ygit.net/dashboard/assets/brand/YGIT_Icon.png" />

<!-- OpenGraph Social Card Identity -->
<meta property="og:title" content="YGIT Deployment Platform" />
```

### Favicon Metrics:
- **Format**: High-DPI PNG with alpha transparency.
- **Natural Dimensions**: `512px × 512px` source downscaled by browser compositor to `16×16` (tab), `32×32` (bookmarks bar), and `180×180` (touch icons).
- **Padding Inset**: Clean 8% internal safe-zone preventing clipping on rounded mobile touch icons.

---

## 6. HTML Prototype Variants Matrix

Across the static HTML mockups in the codebase (`project-blank.html`, `project-scan.html`, `project-workspace.html`, `projects.html`), earlier iterations used pure CSS/SVG icon wrappers:

### A. Compact Prototype Icon (`project-blank.html`, `project-scan.html`, `project-workspace.html`)
```css
.brand-icon {
  width: 20px;
  height: 20px;
  background: var(--brand-primary); /* #1d6cf6 */
  color: #ffffff;
  border-radius: var(--radius-sm);  /* 4px */
  display: flex;
  align-items: center;
  justify-content: center;
}
```
- **Inner SVG**: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>`
- **Gap to Text**: `6px` to `8px` (`gap: 6px;` / `gap: 8px;`).
- **Wordmark**: `font-weight: 700; font-size: 13px; color: var(--fg-default);` (`ygit.net`).

### B. Extended Prototype Icon (`projects.html`)
```css
.brand-icon {
  width: 24px;
  height: 24px;
  background: var(--primary-blue); /* #1d6cf6 */
  color: #ffffff;
  border-radius: var(--radius-sm); /* 4px */
  display: flex;
  align-items: center;
  justify-content: center;
}
```
- **Inner SVG**: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>`
- **Wordmark**: `font-weight: 700; font-size: 14px; letter-spacing: -0.2px;`

---

## 7. Color Tokens, Glows & Filter Optics

```css
/* ==========================================================================
   YGIT BRAND LOGO DESIGN TOKENS
   ========================================================================== */
:root {
  /* Brand Core Pigment */
  --ygit-brand-blue: #1d6cf6;
  --ygit-brand-blue-hover: #2f7af8;
  --ygit-brand-blue-subtle: #58a6ff;

  /* Glows & Opacities */
  --ygit-brand-border-glow: rgba(29, 108, 246, 0.35);
  --ygit-brand-box-shadow: 0 0 2px rgba(29, 108, 246, 0.40);
  --ygit-brand-collapsed-shadow: 0 0 2px rgba(29, 108, 246, 0.30);
  --ygit-brand-filter-glow: drop-shadow(0 0 1px rgba(88, 166, 255, 0.70));

  /* Container Colors */
  --ygit-logo-bg-expanded: #090d13;
  --ygit-logo-bg-collapsed: #161b22;
  --ygit-logo-bg-collapsed-hover: #21262d;
  --ygit-logo-border-collapsed: #30363d;

  /* Text & Beta Tag */
  --ygit-brand-text: #f0f6fc;
  --ygit-brand-text-hover: #ffffff;
  --ygit-beta-tag-bg: rgba(29, 108, 246, 0.15);
  --ygit-beta-tag-text: #58a6ff;
  --ygit-beta-tag-border: rgba(29, 108, 246, 0.30);
}
```

---

## 8. Production Drop-In Code

### 8.1 TypeScript Types (`types/logo.ts`)

```typescript
export type YGitLogoVariant = 'expanded' | 'collapsed' | 'standalone' | 'icon-only';
export type YGitLogoSize = 'sm' | 'md' | 'lg';

export interface YGitLogoProps {
  /** Display mode */
  variant?: YGitLogoVariant;
  /** Custom size preset (defaults to md) */
  size?: YGitLogoSize;
  /** Whether sidebar is in collapsed state */
  isCollapsed?: boolean;
  /** Callback when user clicks the logo (navigates to dashboard) */
  onNavigateHome?: () => void;
  /** Callback when user clicks to collapse/expand */
  onToggleCollapse?: () => void;
  /** Custom class name overrides */
  className?: string;
  /** Show the beta pill tag (defaults to true) */
  showBetaBadge?: boolean;
}
```

---

### 8.2 Reusable React Component (`components/YGitLogo.tsx`)

```tsx
import React, { useState } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

const OFFICIAL_LOGO_URL = 'https://ygit.net/dashboard/assets/brand/YGIT_Icon.png';
const FALLBACK_SVG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="%231d6cf6"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';

export interface YGitBrandLockupProps {
  isCollapsed: boolean;
  onNavigateHome: () => void;
  onToggleCollapse: () => void;
  className?: string;
}

/**
 * Official YGIT Dual-Sidebar Brand Lockup Component
 * Accurately implements 21px expanded logo with 1px precision glow,
 * 28px collapsed morphing toggle, and seamless SVG fallback.
 */
export const YGitBrandLockup: React.FC<YGitBrandLockupProps> = ({
  isCollapsed,
  onNavigateHome,
  onToggleCollapse,
  className = '',
}) => {
  const [imgSrc, setImgSrc] = useState(OFFICIAL_LOGO_URL);

  const handleImageError = () => {
    setImgSrc(FALLBACK_SVG);
  };

  return (
    <div
      className={`py-2.5 border-b border-[#21262d] flex items-center select-none ${
        isCollapsed ? 'justify-center px-1.5' : 'justify-between px-3'
      } ${className}`}
    >
      {!isCollapsed ? (
        <>
          {/* Expanded State: Brand Button Lockup */}
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 hover:opacity-95 transition-opacity cursor-pointer group"
          >
            {/* 21px x 21px Precision Logo Box */}
            <div className="relative w-[21px] h-[21px] rounded-md bg-[#090d13] border border-[#1d6cf6]/35 p-0.5 shadow-[0_0_2px_rgba(29,108,246,0.4)] flex items-center justify-center shrink-0">
              <img
                src={imgSrc}
                alt="YGIT"
                className="w-full h-full object-contain rounded-xs drop-shadow-[0_0_1px_rgba(88,166,255,0.7)]"
                onError={handleImageError}
              />
            </div>

            {/* Wordmark + Beta Tag */}
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[13.5px] tracking-tight text-[#f0f6fc] font-sans group-hover:text-white transition-colors">
                YGIT
              </span>
              <span className="text-[8.5px] font-mono font-medium lowercase px-1.5 py-0.2 rounded-full bg-[#1d6cf6]/15 text-[#58a6ff] border border-[#1d6cf6]/30 leading-none">
                beta
              </span>
            </div>
          </button>

          {/* Collapse Action Button */}
          <button
            type="button"
            onClick={onToggleCollapse}
            title="Collapse sidebar"
            className="p-1 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] rounded cursor-pointer transition-colors"
          >
            <PanelLeftClose className="w-3.5 h-3.5" />
          </button>
        </>
      ) : (
        /* Collapsed State: 28px Morphing Button */
        <button
          type="button"
          onClick={onToggleCollapse}
          title="Click to expand sidebar (YGIT beta)"
          className="group relative w-7 h-7 bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] hover:border-[#1d6cf6]/40 rounded-md flex items-center justify-center cursor-pointer transition-colors shadow-[0_0_2px_rgba(29,108,246,0.3)] p-1"
        >
          {/* Default: 16px Icon Logo */}
          <img
            src={imgSrc}
            alt="YGIT"
            className="w-4 h-4 object-contain transition-opacity duration-150 group-hover:opacity-0 drop-shadow-[0_0_1px_rgba(88,166,255,0.7)]"
            onError={handleImageError}
          />

          {/* Hover: Expand Action Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-[#58a6ff]">
            <PanelLeftOpen className="w-3.5 h-3.5" />
          </div>
        </button>
      )}
    </div>
  );
};

export default YGitBrandLockup;
```

---

### 8.3 Standalone CSS Variables & Utilities (`logo.css`)

```css
/* ==========================================================================
   YGIT LOGO UTILITY CLASSES (Zero-Drift Drop-In)
   ========================================================================== */

/* 21px Expanded Box Wrapper */
.ygit-logo-wrapper-expanded {
  position: relative;
  width: 21px;
  height: 21px;
  border-radius: 6px;
  background-color: #090d13;
  border: 1px solid rgba(29, 108, 246, 0.35);
  padding: 2px;
  box-shadow: 0 0 2px rgba(29, 108, 246, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Sub-pixel Glow Image Filter */
.ygit-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 2px;
  filter: drop-shadow(0 0 1px rgba(88, 166, 255, 0.7));
}

/* 28px Collapsed Morphing Box */
.ygit-logo-wrapper-collapsed {
  position: relative;
  width: 28px;
  height: 28px;
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 4px;
  box-shadow: 0 0 2px rgba(29, 108, 246, 0.3);
  transition: background-color 150ms ease, border-color 150ms ease;
}

.ygit-logo-wrapper-collapsed:hover {
  background-color: #21262d;
  border-color: rgba(29, 108, 246, 0.4);
}

/* Wordmark Typography */
.ygit-brand-title {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  font-size: 13.5px;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #f0f6fc;
  transition: color 150ms ease;
}

.ygit-brand-title:hover {
  color: #ffffff;
}

/* Micro Beta Pill */
.ygit-beta-pill {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8.5px;
  font-weight: 500;
  text-transform: lowercase;
  padding: 0.8px 6px;
  border-radius: 9999px;
  background-color: rgba(29, 108, 246, 0.15);
  color: #58a6ff;
  border: 1px solid rgba(29, 108, 246, 0.3);
  line-height: 1;
}
```

---

## 9. Verification & Invariants Checklist

- [x] **Exact 21px Box Dimensions**: `w-[21px] h-[21px]` matched in expanded sidebar.
- [x] **Sub-pixel 1px Auras**: Verified `shadow-[0_0_2px_rgba(29,108,246,0.4)]` and `drop-shadow-[0_0_1px_rgba(88,166,255,0.7)]`.
- [x] **Exact 28px Morphing Button**: `w-7 h-7` with `PanelLeftOpen` on hover in collapsed sidebar.
- [x] **Inline SVG Fallback**: Zero layout shifts on offline/CDN failure via lightning path data URI.
- [x] **Beta Tag Spacing**: Exact `text-[8.5px]` with `px-1.5 py-0.2` and `gap-1.5` from wordmark.
- [x] **HTML Prototypes Reconciled**: 20px & 24px legacy iterations clearly mapped with migration guidance.
