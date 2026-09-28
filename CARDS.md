# YGIT Platform UI — Forensic Cards Audit & Design System Architecture

> **Audit Date**: September 26, 2026  
> **Source Files Audited**: `src/App.tsx`, `src/index.css`, `index.html`, `project-blank.html`, `project-scan.html`, `project-workspace.html`, `projects.html`  
> **Scope**: 100% Comprehensive Forensic Audit of all Card containers, Card archetypes, nested telemetry blocks, interactive radio cards, borders, corner radiuses, and padding scales across the YGIT Platform.  
> **Purpose**: Production-ready reference and drop-in React/Tailwind components for reproducing the exact card designs in the real application.

---

## 📑 Table of Contents

1. [Executive Summary & Card Design Constitution](#1-executive-summary--card-design-constitution)
2. [Master Card Sizing, Spacing & Corner Radius Scale](#2-master-card-sizing-spacing--corner-radius-scale)
3. [The 14 Forensic Card Archetypes](#3-the-14-forensic-card-archetypes)
   - [3.1 Projects Grid Card](#31-projects-grid-card)
   - [3.2 Theme Marketplace Template Card (Wix / Shopify Style)](#32-theme-marketplace-template-card-wix--shopify-style)
   - [3.3 Connected Integration Provider Card (GitHub & Cloudflare)](#33-connected-integration-provider-card-github--cloudflare)
   - [3.4 Resource Selection Intake Card (4-Source Selector)](#34-resource-selection-intake-card-4-source-selector)
   - [3.5 Resource Workspace Sub-Cards (Clone, Search, Upload)](#35-resource-workspace-sub-cards-clone-search-upload)
   - [3.6 Intake Pipeline Progress & Big Scan Trigger Card](#36-intake-pipeline-progress--big-scan-trigger-card)
   - [3.7 14-Stage Deep Scan Invariant Cards](#37-14-stage-deep-scan-invariant-cards)
   - [3.8 Dashboard Overview Metric Card (Stats Card)](#38-dashboard-overview-metric-card-stats-card)
   - [3.9 Project Workspace 6-Specification Cards](#39-project-workspace-6-specification-cards)
   - [3.10 Interactive Option & Radio Cards (Framework & SSL Selector)](#310-interactive-option--radio-cards-framework--ssl-selector)
   - [3.11 Subdomain Availability & Suggestion Cards](#311-subdomain-availability--suggestion-cards)
   - [3.12 Danger Zone Security Card](#312-danger-zone-security-card)
   - [3.13 Security & Zero-Secret Leakage Callout Card](#313-security--zero-secret-leakage-callout-card)
   - [3.14 Template Modal Quick Specs & Lighthouse Audit Cards](#314-template-modal-quick-specs--lighthouse-audit-cards)
4. [Internal Anatomy & Structural Anatomy of YGIT Cards](#4-internal-anatomy--structural-anatomy-of-ygit-cards)
5. [Interactive States: Hover, Focus & Active Elevation Matrix](#5-interactive-states-hover-focus--active-elevation-matrix)
6. [Drop-In Implementation for Real Application](#6-drop-in-implementation-for-real-application)
   - [6.1 Reusable React Card Primitives (`Card.tsx`)](#61-reusable-react-card-primitives-cardtsx)
   - [6.2 Production Tailwind Card Classes](#62-production-tailwind-card-classes)

---

## 1. Executive Summary & Card Design Constitution

The YGIT Platform utilizes a high-density, professional card architecture heavily influenced by **Cloudflare Dashboard**, **GitHub Repository Cards**, and **Linear/Vercel Project Workspaces**.

### Core Card Design Rules:
1. **Multi-Layered Surface Contrast**:
   - Outer Card Container: `#161b22` (Canvas Subtle Charcoal).
   - Inner Nested Telemetry Block: `#090d13` (Deep Inset Graphite) with `#21262d` borders.
   - Background Hover State: `#0f1622` or `#1c2128`.
   - Selected / Active Tint: `#0e1828` with `#1971c2` or `#1d6cf6` border and ring.
2. **Monospace Inset Telemetry Enclave**:
   - Important specifications (repo paths, commit SHAs, edge domains, AST digests, ports) are **never** displayed on bare card backgrounds; they are always grouped inside a nested `bg-[#090d13]` container.
3. **Discrete Structural Compartments**:
   - Header, body, and footer are visually distinguished with thin, low-contrast dividers (`border-b border-[#21262d]`, `border-t border-[#21262d]`).
4. **Zero-Pill Discipline & Micro Status Indicators**:
   - Cards display status with precision micro-dots (`● Live`, `● Ready`, `● Jamstack`) using `text-[9px]` or `text-[9.5px]` font-mono.

---

## 2. Master Card Sizing, Spacing & Corner Radius Scale

| Card Archetype | Outer Padding | Border Radius | Outer Border | Background Color | Hover Elevation & Border |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Projects Grid Card** | `p-2.5` (10px) | `rounded` (4px) | `#30363d` | `#161b22` | `hover:border-[#1d6cf6]` |
| **Theme Template Card** | Full-bleed + `p-3.5` | `rounded-lg` (8px) | `#21262d` | `#161b22` | `hover:border-[#1d6cf6]/60 hover:shadow-xl hover:-translate-y-0.5` |
| **Connected Provider** | `p-3.5` (14px) | `rounded-lg` (8px) | `#21262d` | `#161b22` | `shadow-sm` |
| **Resource Intake (Active)** | `p-3` (12px) | `rounded-md` (6px) | `#1971c2` (1px) | `#0e1828` | `shadow-[0_0_0_1px_#1971c2]` |
| **Resource Intake (Idle)** | `p-3` (12px) | `rounded-md` (6px) | `#30363d` | `#090d13` | `hover:border-[#1971c2] hover:bg-[#0f1622]` |
| **Pipeline Progress Card** | `p-3.5` (14px) | `rounded-md` (6px) | `#30363d` | `#161b22` | `shadow-md` |
| **Invariant Checkpoint** | `p-2` (8px) | `rounded` (4px) | `#21262d` | `#090d13` | Neutral Static |
| **Metric Stat Card** | `p-2` (8px) | `rounded` (4px) | `#30363d` | `#161b22` | Neutral Static |
| **Workspace 6-Spec Card**| `p-2.5` (10px) | `rounded` (4px) | `#21262d` | `#161b22` | Neutral Static |
| **Framework Preset Option**| `p-1.5` (6px) | `rounded` (4px) | Dynamic | `#090d13` | `hover:border-[#30363d]` / Active: `#1d6cf6` |
| **SSL Radio Option** | `p-2` (8px) | `rounded` (4px) | Dynamic | Dynamic | Active: `#1d6cf6]/15` + `#1d6cf6` border |
| **Danger Zone Card** | `p-3` (12px) | `rounded` (4px) | `#da3633]/30` | `#161b22` | Static Alert Perimeter |
| **Security Callout Card** | `p-3` (12px) | `rounded-lg` (8px) | `#21262d` | `#161b22` | Neutral Static |
| **Quick Specs Modal Card**| `p-2` (8px) | `rounded-md` (6px) | `#21262d` | `#090d13` | Neutral Static |

---

## 3. The 14 Forensic Card Archetypes

### 3.1 Projects Grid Card

- **Location**: `src/App.tsx` (Lines 2760–2800)
- **Role**: Primary card displaying active projects on the Projects page.
- **Anatomy**:
  - Container: `bg-[#161b22] border border-[#30363d] rounded p-2.5 flex flex-col justify-between gap-2 hover:border-[#1d6cf6] transition-colors`
  - Header: Project name button + Live indicator badge (`bg-[#238636]/10 text-[#3fb950] ● Live`).
  - Nested Spec Box: `bg-[#090d13] border border-[#21262d] rounded p-1.5 text-[10.5px] font-mono flex flex-col gap-1`.
  - Footer Strip: Updated timestamp (`text-[#7d8590]`) + "Manage" secondary button.

```tsx
<div className="bg-[#161b22] border border-[#30363d] rounded p-2.5 flex flex-col justify-between gap-2 hover:border-[#1d6cf6] transition-colors">
  {/* Header */}
  <div className="flex items-center justify-between">
    <button className="text-xs font-semibold text-[#f0f6fc] hover:text-[#1d6cf6] truncate text-left">
      {proj.name}
    </button>
    <span className="text-[9px] font-semibold px-1 py-0.2 rounded bg-[#238636]/10 text-[#3fb950]">● Live</span>
  </div>

  {/* Nested Inset Enclave */}
  <div className="bg-[#090d13] border border-[#21262d] rounded p-1.5 text-[10.5px] font-mono flex flex-col gap-1">
    <div className="flex justify-between text-[#8b949e]">
      <span>REPO</span>
      <span className="text-[#f0f6fc] truncate">{proj.repo}</span>
    </div>
    <div className="flex justify-between text-[#8b949e]">
      <span>EDGE</span>
      <span className="text-[#1d6cf6] truncate">{proj.domain}</span>
    </div>
  </div>

  {/* Footer */}
  <div className="flex items-center justify-between pt-1 border-t border-[#21262d] text-[10px]">
    <span className="text-[#7d8590] font-mono">{proj.updated}</span>
    <button className="bg-[#21262d] hover:bg-[#282e36] text-[#f0f6fc] px-2 py-0.5 rounded cursor-pointer">
      Manage
    </button>
  </div>
</div>
```

---

### 3.2 Theme Marketplace Template Card (Wix / Shopify Style)

- **Location**: `src/App.tsx` (Lines 3585–3695)
- **Role**: Premium themes showcase card featuring realistic browser mockup thumbnails, free tags, metadata strip, and 1-click clone actions.
- **Anatomy**:
  - Container: `bg-[#161b22] border border-[#21262d] hover:border-[#1d6cf6]/60 rounded-lg flex flex-col justify-between overflow-hidden group transition-all duration-200 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5`
  - Visual Top: Full-bleed `TemplateThumbnailGraphic` (`h-44 sm:h-48`) with macOS dots and hover action overlay.
  - Card Body: `p-3 sm:p-3.5 flex flex-col gap-2.5 flex-1`
    - Row 1: Title (`text-[13px]`) + "Free" Pill (`bg-[#238636]/15 text-[#3fb950] border-[#238636]/30`).
    - Row 2: Metadata (`by @author · ★ 4.9 · 2.8k uses · Framework`).
    - Row 3: Short bio description (`text-[11px] text-[#8b949e] line-clamp-2`).
    - Row 4: Specs & Compilation speed (`~14s`).
  - Action Footer: `p-2.5 px-3 border-t border-[#21262d] bg-[#090d13]/70 flex items-center justify-between gap-2` with Details, Live Demo, and "Use Template" CTA.

```tsx
<div className="bg-[#161b22] border border-[#21262d] hover:border-[#1d6cf6]/60 rounded-lg flex flex-col justify-between overflow-hidden group transition-all duration-200 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5">
  <div className="flex flex-col">
    {/* Browser-Framed Thumbnail */}
    <div onClick={onInspect} className="cursor-pointer">
      <TemplateThumbnailGraphic template={tmpl} variant="card" onInspect={onInspect} />
    </div>

    {/* Body */}
    <div className="p-3 sm:p-3.5 flex flex-col gap-2.5 flex-1">
      <div className="flex items-start justify-between gap-1.5">
        <h3 className="text-[13px] font-semibold text-[#f0f6fc] group-hover:text-[#58a6ff] transition-colors line-clamp-1">
          {tmpl.name}
        </h3>
        <span className="text-[9.5px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30 shrink-0">
          Free
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-[10.5px] font-mono text-[#7d8590] flex-wrap">
        <span>by {tmpl.author}</span>
        <span>·</span>
        <span className="text-[#e3b341] flex items-center gap-0.5 font-medium">
          <Star className="w-3 h-3 fill-[#e3b341]" />
          <span>{tmpl.stars}</span>
        </span>
        <span>·</span>
        <span className="text-[#8b949e]">{tmpl.deploys} uses</span>
        <span className="ml-auto text-[9px] px-1.5 py-0.2 rounded bg-[#090d13] text-[#58a6ff] border border-[#21262d]">
          {tmpl.framework}
        </span>
      </div>

      <p className="text-[11px] text-[#8b949e] line-clamp-2 leading-relaxed">
        {tmpl.shortBio}
      </p>

      <div className="flex items-center justify-between gap-1 pt-1 border-t border-[#21262d]/60 flex-wrap">
        <div className="flex flex-wrap gap-1">
          {tmpl.features.slice(0, 2).map((feat) => (
            <span key={feat} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#090d13] text-[#7d8590] border border-[#21262d]">
              {feat}
            </span>
          ))}
        </div>
        <span className="text-[9.5px] font-mono text-[#3fb950] flex items-center gap-1 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]"></span>
          <span>~{tmpl.buildTime}</span>
        </span>
      </div>
    </div>
  </div>

  {/* Footer */}
  <div className="p-2.5 px-3 border-t border-[#21262d] bg-[#090d13]/70 flex items-center justify-between gap-2">
    <div className="flex items-center gap-1.5">
      <button className="bg-[#21262d] hover:bg-[#282e36] text-[#c9d1d9] hover:text-[#f0f6fc] border border-[#30363d] px-2.5 py-1.5 rounded text-xs font-normal flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs active:scale-95">
        <Eye className="w-3.5 h-3.5 text-[#58a6ff]" />
        <span>Details</span>
      </button>
      <a href={tmpl.demoUrl} target="_blank" className="p-1.5 text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#21262d] rounded cursor-pointer transition-colors">
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
    <button className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-all shadow-sm active:scale-95">
      <Sparkles className="w-3 h-3" />
      <span>Use Template</span>
    </button>
  </div>
</div>
```

---

### 3.3 Connected Integration Provider Card (GitHub & Cloudflare)

- **Location**: `src/App.tsx` (Lines 3175–3250)
- **Role**: Displays authentication status, account handle, quota limits, and scopes for OAuth integrations.
- **Anatomy**:
  - Container: `bg-[#161b22] border border-[#21262d] rounded-lg p-3.5 flex flex-col justify-between gap-3 shadow-sm`
  - Header: Provider brand icon (in `w-8 h-8 rounded bg-[#090d13]`), title, and "Connected" badge.
  - Inset Table: `bg-[#090d13] border border-[#21262d] rounded-md p-2.5 flex flex-col gap-1.5 font-mono text-[11px]`.
  - Footer Action: Re-sync secondary button and Disconnect red outline button.

```tsx
<div className="bg-[#161b22] border border-[#21262d] rounded-lg p-3.5 flex flex-col justify-between gap-3 shadow-sm">
  {/* Header */}
  <div className="flex items-center justify-between pb-2 border-b border-[#21262d]">
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded bg-[#090d13] border border-[#21262d] flex items-center justify-center text-[#f0f6fc]">
        <Github className="w-4 h-4" />
      </div>
      <div>
        <h3 className="text-xs font-medium text-[#f0f6fc]">GitHub Account</h3>
        <p className="text-[10px] text-[#8b949e]">Repository webhook triggers & automatic commits</p>
      </div>
    </div>
    <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30 flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]"></span>
      Connected
    </span>
  </div>

  {/* Inset Telemetry */}
  <div className="bg-[#090d13] border border-[#21262d] rounded-md p-2.5 flex flex-col gap-1.5 font-mono text-[11px]">
    <div className="flex justify-between items-center text-[#8b949e]">
      <span>Account Handle</span>
      <span className="text-[#f0f6fc] font-medium">@vibtools (Organization)</span>
    </div>
    <div className="flex justify-between items-center text-[#8b949e]">
      <span>OAuth Scopes</span>
      <span className="text-[#3fb950]">repo, read:org, workflow</span>
    </div>
  </div>

  {/* Action Footer */}
  <div className="pt-2 border-t border-[#21262d] flex items-center justify-between">
    <button className="bg-[#21262d] hover:bg-[#282e36] text-[#c9d1d9] hover:text-[#f0f6fc] border border-[#30363d] px-2.5 py-1 rounded text-xs flex items-center gap-1.5 cursor-pointer transition-colors">
      <RefreshCw className="w-3 h-3 text-[#8b949e]" />
      <span>Re-sync</span>
    </button>
    <button className="text-[#f85149] hover:bg-[#da3633]/15 px-2.5 py-1 rounded text-xs border border-[#da3633]/30 cursor-pointer transition-colors">
      Disconnect
    </button>
  </div>
</div>
```

---

### 3.4 Resource Selection Intake Card (4-Source Selector)

- **Location**: `src/App.tsx` (Lines 3840–3920)
- **Role**: Radio-selection card allowing users to pick a project intake source (`Public Git Clone`, `Import Repo`, `Upload`, `Deploy Starter Template`).
- **Anatomy**:
  - Dimensions: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5`
  - Active State: `border-[#1971c2] bg-[#0e1828] shadow-[0_0_0_1px_#1971c2]`
  - Idle State: `border-[#30363d] bg-[#090d13] hover:border-[#1971c2] hover:bg-[#0f1622]`
  - Internal: Icon container (`w-7 h-7 rounded`), Title (`text-[12.5px] font-semibold`), Subtitle (`text-[11px] text-[#8b949e]`), and bottom action prompt.

```tsx
<div
  onClick={() => setResourceSelected('clone')}
  className={`border rounded-md p-3 flex flex-col gap-1.5 cursor-pointer transition-all select-none ${
    resourceSelected === 'clone'
      ? 'border-[#1971c2] bg-[#0e1828] shadow-[0_0_0_1px_#1971c2]'
      : 'border-[#30363d] bg-[#090d13] hover:border-[#1971c2] hover:bg-[#0f1622]'
  }`}
>
  <div className={`w-7 h-7 rounded flex items-center justify-center ${
    resourceSelected === 'clone'
      ? 'bg-[#1971c2]/15 border border-[#1971c2] text-[#1971c2]'
      : 'bg-[#161b22] border border-[#21262d] text-[#1971c2]'
  }`}>
    <Globe className="w-3.5 h-3.5" />
  </div>
  <div className="text-[12.5px] font-semibold text-[#f0f6fc]">Public Git Clone</div>
  <div className="text-[11px] text-[#8b949e] leading-[1.35]">Clone any public repository via direct HTTPS URL.</div>
  <div className="mt-auto pt-1.5 flex items-center justify-between font-mono text-[9.5px] text-[#7d8590] border-t border-[#21262d]/50">
    <span>● HTTPS Git</span>
    <span className="text-[#1971c2]">Configure →</span>
  </div>
</div>
```

---

### 3.5 Resource Workspace Sub-Cards (Clone, Search, Upload)

- **Location**: `src/App.tsx` (Lines 3930–4150)
- **Role**: Contextual configuration panel matching the active resource selector.
- **Anatomy**:
  - Container: `bg-[#161b22] border border-[#30363d] rounded-md p-3.5 flex flex-col gap-3 animate-in fade-in duration-150`
  - Upload Dropzone Card: `border border-dashed border-[#30363d] hover:border-[#1971c2] rounded-md bg-[#090d13] hover:bg-[#0f1622] p-7 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all`
  - GitHub Repo List Row Cards: `flex items-center justify-between p-2 px-2.5 hover:bg-[#ffffff05] transition-colors`

---

### 3.6 Intake Pipeline Progress & Big Scan Trigger Card

- **Location**: `src/App.tsx` (Lines 4155–4195)
- **Role**: Realtime ingestion progress card (0% → 100%) that dynamically displays the prominent **Scan Repository** CTA button upon completion.
- **Anatomy**:
  - Container: `bg-[#161b22] border border-[#30363d] rounded-md p-3.5 flex flex-col gap-2.5 shadow-md`
  - Progress Gauge: `w-full h-1.5 rounded bg-[#090d13] overflow-hidden border border-[#21262d]`
  - Big Scan CTA: `w-full py-2.5 bg-[#1971c2] hover:bg-[#1668b0] text-white font-bold text-xs rounded-md flex items-center justify-center gap-2 cursor-pointer mt-1 shadow-md transition-all active:scale-[0.99]`

```tsx
<div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 flex flex-col gap-2.5 shadow-md">
  <div className="flex items-center justify-between text-xs">
    <div className="flex items-center gap-2">
      {intakeCompleted ? (
        <CheckCircle2 className="w-4 h-4 text-[#3fb950]" />
      ) : (
        <RefreshCw className="w-4 h-4 text-[#1971c2] animate-spin" />
      )}
      <span className="font-semibold text-[#f0f6fc]">{intakeStatusText}</span>
    </div>
    <span className="font-mono text-xs font-bold text-[#1971c2]">{intakeProgress}%</span>
  </div>

  <div className="w-full h-1.5 rounded bg-[#090d13] overflow-hidden border border-[#21262d]">
    <div className="h-full bg-[#1971c2] transition-all duration-300 ease-out" style={{ width: `${intakeProgress}%` }}></div>
  </div>

  {intakeCompleted && (
    <button onClick={startDeepScan} className="w-full py-2.5 bg-[#1971c2] hover:bg-[#1668b0] text-white font-bold text-xs rounded-md flex items-center justify-center gap-2 cursor-pointer mt-1 shadow-md transition-all active:scale-[0.99]">
      <Search className="w-4 h-4" />
      <span>Scan Repository</span>
      <ArrowRight className="w-4 h-4" />
    </button>
  )}
</div>
```

---

### 3.7 14-Stage Deep Scan Invariant Cards

- **Location**: `src/App.tsx` (Lines 4420–4500)
- **Role**: High-density checklist card rendering the 14 AST invariant inspection points in real time.
- **Anatomy**:
  - Container: `bg-[#090d13] border border-[#21262d] rounded p-2`
  - Uppercase Label: `text-[8.5px] uppercase font-mono text-[#7d8590] block`
  - Value / Digest: `text-[#1d6cf6] text-[10.5px] font-mono block`
  - Sub-metric: `text-[9.5px] text-[#8b949e]`

```tsx
<div className="bg-[#090d13] border border-[#21262d] rounded p-2">
  <span className="text-[8.5px] uppercase font-mono text-[#7d8590] block">Monorepo Root Guard</span>
  <code className="text-[#1d6cf6] text-[10.5px] font-mono block">/ (Root Project)</code>
  <span className="text-[9.5px] text-[#8b949e]">0 Nested ambiguities</span>
</div>
```

---

### 3.8 Dashboard Overview Metric Card (Stats Card)

- **Location**: `src/App.tsx` (Lines 2595–2625)
- **Role**: High-level platform telemetry counters.
- **Anatomy**:
  - Container: `bg-[#161b22] border border-[#30363d] rounded p-2`
  - Label: `text-[9.5px] font-semibold text-[#8b949e] uppercase`
  - Metric: `text-sm font-semibold text-[#f0f6fc] font-mono`

```tsx
<div className="bg-[#161b22] border border-[#30363d] rounded p-2">
  <div className="text-[9.5px] font-semibold text-[#8b949e] uppercase">Active Deployments</div>
  <div className="text-sm font-semibold text-[#f0f6fc] font-mono">{deployments.length}</div>
</div>
```

---

### 3.9 Project Workspace 6-Specification Cards

- **Location**: `src/App.tsx` (Lines 4630–4760)
- **Role**: Overview tab cards detailing the 6 architectural dimensions:
  1. Repository & AST Evidence
  2. Monorepo Root & Path Isolation
  3. Framework Preset & Output
  4. Package Manager & Script Engine
  5. Cloudflare Pages & Durable Worker
  6. Migration Engine & Readiness
- **Anatomy**:
  - Outer: `bg-[#161b22] border border-[#21262d] rounded p-2.5 flex flex-col gap-1.5`
  - Header: Icon + Title (`text-xs font-medium text-[#f0f6fc]`) + Status badge (`text-[#3fb950] font-mono`)
  - Inner Inset: `bg-[#090d13] p-2 rounded text-[11px] font-mono flex flex-col gap-1`

```tsx
<div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 flex flex-col gap-1.5">
  <div className="flex items-center justify-between pb-1 border-b border-[#21262d] text-xs">
    <span className="flex items-center gap-1.5 font-medium text-[#f0f6fc]">
      <Github className="w-3.5 h-3.5 text-[#1d6cf6]" />
      <span>Repository & AST Evidence</span>
    </span>
    <span className="text-[9.5px] font-mono text-[#3fb950]">Verified</span>
  </div>
  <div className="bg-[#090d13] p-2 rounded text-[11px] font-mono flex flex-col gap-1">
    <div className="flex justify-between text-[#8b949e]">
      <span>REPO SOURCE</span>
      <span className="text-[#f0f6fc] truncate">{currentProject.repo}</span>
    </div>
    <div className="flex justify-between text-[#8b949e]">
      <span>AST SHA-256</span>
      <span className="text-[#58a6ff] truncate">sha256:e3b0c44</span>
    </div>
  </div>
</div>
```

---

### 3.10 Interactive Option & Radio Cards (Framework & SSL Selector)

- **Location**: `src/App.tsx` (Lines 5380–5410 & 5880–5920)
- **Role**: Clickable option cards for configuring Vite, Next.js, Remix, Astro, and Cloudflare SSL/TLS modes.
- **Anatomy**:
  - Framework Card: `p-1.5 rounded border flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all`
    - Active: `bg-[#1d6cf6]/15 border-[#1d6cf6] text-[#f0f6fc] font-medium`
    - Inactive: `bg-[#090d13] border-[#21262d] text-[#8b949e] hover:border-[#30363d] hover:text-[#f0f6fc] font-normal`
  - SSL Mode Card: `p-2 rounded border text-left flex flex-col gap-0.5 cursor-pointer transition-all`
    - Active: `bg-[#1d6cf6]/15 border-[#1d6cf6]`

---

### 3.11 Subdomain Availability & Suggestion Cards

- **Location**: `src/App.tsx` (Lines 6410–6460)
- **Role**: Displays search availability feedback when claiming free `*.ygit.net` subdomains.
- **Anatomy**:
  - Available: `bg-[#238636]/10 border-[#238636]/30 text-[#f0f6fc] p-2.5 rounded-md border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5`
  - Taken: `bg-[#da3633]/10 border-[#da3633]/30 text-[#f0f6fc] p-2.5 rounded-md border text-xs`

---

### 3.12 Danger Zone Security Card

- **Location**: `src/App.tsx` (Lines 6280–6320)
- **Role**: High-risk project actions (pause builds, permanent project deletion).
- **Anatomy**:
  - Container: `bg-[#161b22] border border-[#da3633]/30 rounded p-3 flex flex-col gap-2`
  - Header: `flex items-center gap-2 pb-1 border-b border-[#da3633]/20` with `AlertTriangle text-[#f85149]`.
  - Body: `flex flex-col divide-y divide-[#21262d] text-xs`.

```tsx
<div className="bg-[#161b22] border border-[#da3633]/30 rounded p-3 flex flex-col gap-2">
  <div className="flex items-center gap-2 pb-1 border-b border-[#da3633]/20">
    <AlertTriangle className="w-3.5 h-3.5 text-[#f85149]" />
    <h3 className="text-xs font-medium text-[#f85149]">Danger Zone</h3>
  </div>
  <div className="flex flex-col divide-y divide-[#21262d] text-xs">
    <div className="py-2 flex items-center justify-between gap-2">
      <div className="flex flex-col">
        <span className="font-medium text-[#f85149]">Delete Project</span>
        <span className="text-[10px] text-[#8b949e]">Permanently delete this project and custom domain bindings.</span>
      </div>
      <button className="bg-[#da3633]/20 hover:bg-[#da3633]/30 text-[#f85149] border border-[#da3633]/40 px-2.5 py-1 rounded text-xs cursor-pointer transition-colors">
        Delete
      </button>
    </div>
  </div>
</div>
```

---

### 3.13 Security & Zero-Secret Leakage Callout Card

- **Location**: `src/App.tsx` (Lines 3255–3270)
- **Role**: Trust and security guarantee panel in connected accounts.
- **Anatomy**: `bg-[#161b22] border border-[#21262d] rounded-lg p-3 flex items-start gap-2.5 text-xs text-[#8b949e]` with `ShieldCheck text-[#3fb950]`.

---

### 3.14 Template Modal Quick Specs & Lighthouse Audit Cards

- **Location**: `src/App.tsx` (Lines 8330–8390)
- **Role**: Multi-metric grid in the template details modal.
- **Anatomy**:
  - Specs Card: `bg-[#090d13] border border-[#21262d] rounded-md p-2 flex flex-col gap-0.5`
  - Lighthouse Score Card: `bg-[#161b22] border border-[#21262d] rounded p-1.5 flex flex-col items-center` with `text-base font-bold font-mono text-[#3fb950]`.

---

## 4. Internal Anatomy & Structural Anatomy of YGIT Cards

```
┌────────────────────────────────────────────────────────────────────────┐
│ OUTER CARD CONTAINER (bg-[#161b22] border-[#21262d] rounded-lg)        │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ CARD HEADER (pb-2 border-b border-[#21262d] flex justify-between)│  │
│  │ [Icon] Title Text                       [Micro Status Pill]      │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ NESTED TELEMETRY ENCLAVE (bg-[#090d13] border-[#21262d] rounded)│  │
│  │ REPO SOURCE                          vibtools/main               │  │
│  │ EDGE GATEWAY                         vib.pages.dev               │  │
│  │ AST DIGEST                           sha256:e3b0c44              │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ CARD FOOTER / ACTIONS (pt-2 border-t border-[#21262d])           │  │
│  │ Updated: 2m ago                 [Secondary Action] [Primary CTA] │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Interactive States: Hover, Focus & Active Elevation Matrix

| State | Border Styling | Background Styling | Box Shadow / Halo |
| :--- | :--- | :--- | :--- |
| **Idle (Default)** | `border-[#21262d]` / `border-[#30363d]` | `bg-[#161b22]` | None |
| **Hover (Interactive)** | `hover:border-[#1d6cf6]/60` | Unchanged or `hover:bg-[#0f1622]` | `hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5` |
| **Active / Selected** | `border-[#1d6cf6]` / `border-[#1971c2]` | `bg-[#0e1828]` | `shadow-[0_0_0_1px_#1d6cf6]` |
| **Danger / High Risk**| `border-[#da3633]/30` | `bg-[#161b22]` | `border-[#da3633]/40` on trigger |
| **Success / Verified**| `border-[#238636]/30` | `bg-[#238636]/10` | None |

---

## 6. Drop-In Implementation for Real Application

### 6.1 Reusable React Card Primitives (`Card.tsx`)

You can directly copy and paste this modular component set into your real production app (`src/components/ui/Card.tsx`):

```tsx
import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'nested' | 'interactive' | 'active' | 'danger';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-[#161b22] border border-[#21262d] rounded-lg shadow-sm',
    nested: 'bg-[#090d13] border border-[#21262d] rounded-md',
    interactive:
      'bg-[#161b22] border border-[#21262d] hover:border-[#1d6cf6]/60 rounded-lg transition-all duration-200 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5 cursor-pointer',
    active:
      'bg-[#0e1828] border border-[#1d6cf6] rounded-md shadow-[0_0_0_1px_#1d6cf6]',
    danger: 'bg-[#161b22] border border-[#da3633]/30 rounded-lg',
  };

  return (
    <div
      className={`${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div
    className={`p-3 sm:p-3.5 pb-2.5 border-b border-[#21262d] flex items-center justify-between gap-2 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-3 sm:p-3.5 flex flex-col gap-2.5 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div
    className={`p-2.5 px-3 sm:px-3.5 border-t border-[#21262d] bg-[#090d13]/50 flex items-center justify-between gap-2 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardTelemetryEnclave: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ children, className = '', ...props }) => (
  <div
    className={`bg-[#090d13] border border-[#21262d] rounded-md p-2 sm:p-2.5 font-mono text-[11px] flex flex-col gap-1.5 ${className}`}
    {...props}
  >
    {children}
  </div>
);
```

---

### 6.2 Production Tailwind Card Classes

```typescript
// Shared Tailwind classes for direct string usage
export const YGIT_CARD_CLASSES = {
  // Standard Container
  container: 'bg-[#161b22] border border-[#21262d] rounded-lg p-3 sm:p-3.5',
  
  // High-Density Interactive Container
  interactive: 'bg-[#161b22] border border-[#21262d] hover:border-[#1d6cf6]/60 rounded-lg transition-all duration-200 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5',
  
  // Selected State
  selected: 'bg-[#0e1828] border border-[#1d6cf6] rounded-md shadow-[0_0_0_1px_#1d6cf6]',
  
  // Nested Monospace Enclave
  telemetryEnclave: 'bg-[#090d13] border border-[#21262d] rounded-md p-2.5 font-mono text-[11px] flex flex-col gap-1.5',
  
  // Card Footer Strip
  footer: 'p-2.5 px-3 border-t border-[#21262d] bg-[#090d13]/70 flex items-center justify-between gap-2',
};
```
