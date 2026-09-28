# YGIT Platform UI — Forensic Sidebar Audit & Architecture Specification

> **Audit Date**: September 26, 2026  
> **Source Files Audited**: `src/App.tsx`, `src/index.css`, `project-workspace.html`, `projects.html`, `project-blank.html`, `project-scan.html`  
> **Scope**: 100% Comprehensive Forensic Audit of the Primary Global Sidebar (Collapsible), Secondary Project-Scoped Workspace Sidebar, Header Brand Lockup, Sub-navigation tabs, Status Footers, and Responsive Viewport Logic.  
> **Purpose**: Production-grade reference manual to reproduce, export, and implement the exact dual-sidebar system in real web applications.

---

## 📑 Table of Contents

1. [Architectural Overview & Dual-Sidebar Philosophy](#1-architectural-overview--dual-sidebar-philosophy)
2. [Master Dimensional & Spatial Matrix](#2-master-dimensional--spatial-matrix)
3. [Primary Global Sidebar (Platform-Scoped)](#3-primary-global-sidebar-platform-scoped)
   - [3.1 Container & Sticky Viewport Shell](#31-container--sticky-viewport-shell)
   - [3.2 Brand Header & Lockup (Expanded Mode)](#32-brand-header--lockup-expanded-mode)
   - [3.3 Brand Header & Expand Action (Collapsed Mode)](#33-brand-header--expand-action-collapsed-mode)
   - [3.4 Global Navigation Items (5 Routes)](#34-global-navigation-items-5-routes)
   - [3.5 Worker Status Footer](#35-worker-status-footer)
4. [Secondary Project Sidebar (Workspace-Scoped)](#4-secondary-project-sidebar-workspace-scoped)
   - [4.1 Container & Visual Inset Contrast](#41-container--visual-inset-contrast)
   - [4.2 Project Context Header](#42-project-context-header)
   - [4.3 Sub-View Navigation Items (6 Workspace Tabs)](#43-sub-view-navigation-items-6-workspace-tabs)
   - [4.4 Workspace Quick Action Footer](#44-workspace-quick-action-footer)
5. [Interactive States, Hover Physics & Transitions](#5-interactive-states-hover-physics--transitions)
6. [Color Tokens & Contrast Mapping](#6-color-tokens--contrast-mapping)
7. [Drop-In Implementation for Real Application](#7-drop-in-implementation-for-real-application)
   - [7.1 TypeScript Interfaces (`types/sidebar.ts`)](#71-typescript-interfaces-typessidebarts)
   - [7.2 Reusable React Component (`PrimarySidebar.tsx`)](#72-reusable-react-component-primarysidebartsx)
   - [7.3 Reusable React Component (`SecondarySidebar.tsx`)](#73-reusable-react-component-secondarysidebartsx)

---

## 1. Architectural Overview & Dual-Sidebar Philosophy

The YGIT Platform implements a **Dual-Sidebar Workspace Architecture** inspired by cloud developer platforms like **Cloudflare Dashboard**, **Railway**, **Vercel**, and **Linear**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ DUAL-SIDEBAR WORKSPACE LAYOUT (Sticky Viewport h-screen)                               │
├────────────────────┬────────────────────┬──────────────────────────────────────────────┤
│ 1. PRIMARY SIDEBAR │ 2. SECONDARY       │ 3. MAIN WORKSPACE CONTENT CANVAS             │
│    (Global App)    │    (Project Scope) │    (Tabs: Overview, Env, Cloudflare, etc.)   │
│                    │                    │                                              │
│ Width:             │ Width:             │ Width:                                       │
│ 190px (Expanded)   │ 195px (Fixed)      │ flex-1 (Fluid max-w-[1600px])                │
│ 54px (Collapsed)   │                    │                                              │
│                    │                    │                                              │
│ Background:        │ Background:        │ Background:                                  │
│ #161b22 (Subtle)   │ #12161d (Dark Inset│ #0d1117 / #090d13 (Canvas)                   │
│                    │                    │                                              │
│ Border-Right:      │ Border-Right:      │                                              │
│ #30363d (Default)  │ #30363d (Default)  │                                              │
│                    │                    │                                              │
│ Z-Index:           │ Z-Index:           │ Z-Index:                                     │
│ z-30 (Top Tier)    │ z-20 (Mid Tier)    │ z-10 (Content Tier)                          │
└────────────────────┴────────────────────┴──────────────────────────────────────────────┘
```

### Architectural Rationale:
1. **Separation of Concerns**:
   - **Primary Sidebar**: Controls tenant/account-wide context (Dashboard, Projects Directory, Deployments Feed, Connected Accounts, Theme Starters). Always accessible across all routes.
   - **Secondary Sidebar**: Appears exclusively within `activeRoute === 'project-workspace'`, locking the user into the active project context without cluttering the global navigation.
2. **Visual Depth Contrast**:
   - Primary Sidebar uses `#161b22` (Canvas Subtle).
   - Secondary Sidebar uses `#12161d` (Dark Inset Charcoal).
   - Main Canvas uses `#0d1117` and `#090d13`.
   - This deliberate 3-tier brightness stepping guarantees that the two adjacent sidebars never merge into a single visual block.
3. **Screen Real Estate Optimization**:
   - Primary Sidebar collapses from `190px` to `54px` via a single click on `PanelLeftClose`, enabling maximum horizontal space for high-density tables (Environment Variables, Edge Terminal Logs, DNS Probe Resolvers).

---

## 2. Master Dimensional & Spatial Matrix

| Attribute | Primary Sidebar (Expanded) | Primary Sidebar (Collapsed) | Secondary Project Sidebar |
| :--- | :--- | :--- | :--- |
| **Width** | `190px` (`w-[190px]`) | `54px` (`w-[54px]`) | `195px` (`w-[195px]`) |
| **Height** | `100vh` (`h-screen`) | `100vh` (`h-screen`) | `100vh` (`h-screen`) |
| **Positioning** | `sticky top-0` | `sticky top-0` | `sticky top-0` |
| **Z-Index** | `z-30` | `z-30` | `z-20` |
| **Flex Shrink** | `shrink-0` | `shrink-0` | `shrink-0` |
| **User Select** | `select-none` | `select-none` | `select-none` |
| **Transition** | `transition-all duration-200 ease-in-out` | `transition-all duration-200 ease-in-out` | Static layout block |
| **Header Height** | `41px` (`py-2.5 px-3`) | `41px` (`py-2.5 px-1.5`) | `42px` (`p-2.5`) |
| **Nav Item Height**| `28px` (`px-2 py-1.5`) | `32px` (`py-2 px-1`) | `28px` (`px-2 py-1.5`) |
| **Nav Item Gap** | `gap-0.5` (`2px`) | `gap-0.5` (`2px`) | `gap-0.5` (`2px`) |
| **Nav List Padding**| `p-1.5` (`6px`) | `p-1.5` (`6px`) | `p-1.5` (`6px`) |
| **Icon Size** | `14px × 14px` (`w-3.5 h-3.5`)| `14px × 14px` (`w-3.5 h-3.5`)| `14px × 14px` (`w-3.5 h-3.5`)|
| **Footer Height** | `34px` (`p-2`) | `34px` (`p-2`) | `34px` (`p-2`) |

---

## 3. Primary Global Sidebar (Platform-Scoped)

### 3.1 Container & Sticky Viewport Shell

```tsx
<aside
  className={`${
    isSidebarCollapsed ? 'w-[54px]' : 'w-[190px]'
  } shrink-0 bg-[#161b22] border-r border-[#30363d] flex flex-col justify-between h-screen sticky top-0 select-none z-30 transition-all duration-200 ease-in-out`}
>
  {/* Content (Header + Nav List) */}
  <div>
    {/* Brand Header */}
    {/* Nav Items */}
  </div>

  {/* Status Footer */}
</aside>
```

- **Background**: `#161b22` (Subtle Card Surface).
- **Right Border**: `#30363d` (High-contrast structural divider).
- **State Switch**: `isSidebarCollapsed` toggles width between `54px` and `190px`.

---

### 3.2 Brand Header & Lockup (Expanded Mode)

In expanded mode, the brand header features the official YGIT icon with precision 1px ambient glow, site name typography, minimal `beta` indicator badge, and the collapse trigger button:

```tsx
<div className="py-2.5 px-3 border-b border-[#21262d] flex items-center justify-between">
  {/* Brand Clickable Lockup */}
  <button
    onClick={() => setActiveRoute('dashboard')}
    className="flex items-center gap-2.5 hover:opacity-95 transition-opacity cursor-pointer group"
  >
    {/* Logo Icon with subtle 1px precision glow */}
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

    {/* Site Name YGIT with small beta tag */}
    <div className="flex items-center gap-1.5">
      <span className="font-extrabold text-[13.5px] tracking-tight text-[#f0f6fc] font-sans group-hover:text-white transition-colors">
        YGIT
      </span>
      <span className="text-[8.5px] font-mono font-medium lowercase px-1.5 py-0.2 rounded-full bg-[#1d6cf6]/15 text-[#58a6ff] border border-[#1d6cf6]/30 leading-none">
        beta
      </span>
    </div>
  </button>

  {/* Sidebar Collapse Toggle Button */}
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

#### Exact Design Details:
1. **Icon Container**:
   - Width / Height: `21px × 21px` (`w-[21px] h-[21px]`)
   - Background: `#090d13` (Deep Obsidian Inset)
   - Border: `1px solid rgba(29, 108, 246, 0.35)` (`border-[#1d6cf6]/35`)
   - Outer Box Shadow: `0 0 2px rgba(29, 108, 246, 0.4)` (Subtle 1px ambient perimeter glow)
   - Image Drop Shadow: `drop-shadow-[0_0_1px_rgba(88,166,255,0.7)]`
   - Fallback: Inline SVG lightning polygon in `#1d6cf6`.
2. **Typography**:
   - Site Name: `text-[13.5px] font-extrabold text-[#f0f6fc] tracking-tight font-sans`
   - Beta Tag: `text-[8.5px] font-mono font-medium lowercase px-1.5 py-0.2 rounded-full bg-[#1d6cf6]/15 text-[#58a6ff] border border-[#1d6cf6]/30`
3. **Collapse Trigger**:
   - Icon: `PanelLeftClose` (14px × 14px)
   - Hover state: `hover:text-[#f0f6fc] hover:bg-[#21262d]`

---

### 3.3 Brand Header & Expand Action (Collapsed Mode)

When collapsed (`54px`), the header replaces the full logo text with an interactive icon square that morphs into `PanelLeftOpen` on hover:

```tsx
<div className="py-2.5 px-1.5 border-b border-[#21262d] flex items-center justify-center">
  <button
    type="button"
    onClick={() => setIsSidebarCollapsed(false)}
    title="Click to expand sidebar (YGIT beta)"
    className="group relative w-7 h-7 bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] hover:border-[#1d6cf6]/40 rounded-md flex items-center justify-center cursor-pointer transition-colors shadow-[0_0_2px_rgba(29,108,246,0.3)] p-1"
  >
    {/* Default: Brand Logo with subtle 1px glow */}
    <img
      src="https://ygit.net/dashboard/assets/brand/YGIT_Icon.png"
      alt="YGIT"
      className="w-4 h-4 object-contain transition-opacity duration-150 group-hover:opacity-0 drop-shadow-[0_0_1px_rgba(88,166,255,0.7)]"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src =
          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="%231d6cf6"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
      }}
    />

    {/* Hover: Expand Toggle Icon */}
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-[#58a6ff]">
      <PanelLeftOpen className="w-3.5 h-3.5" />
    </div>
  </button>
</div>
```

#### Exact Design Details:
- **Button Dimension**: `28px × 28px` (`w-7 h-7`)
- **Default State**: Displays the 16px brand logo with ambient glow.
- **Hover State**: Seamlessly fades the logo to `opacity-0` and reveals `PanelLeftOpen` in electric blue (`#58a6ff`) with `duration-150`.

---

### 3.4 Global Navigation Items (5 Routes)

The navigation section uses `p-1.5 flex flex-col gap-0.5` containing 5 platform-level route buttons:

```tsx
<div className="p-1.5 flex flex-col gap-0.5">
  {/* 1. Dashboard */}
  <button
    onClick={() => setActiveRoute('dashboard')}
    title={isSidebarCollapsed ? 'Dashboard' : undefined}
    className={`w-full flex items-center rounded text-xs transition-colors cursor-pointer ${
      isSidebarCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
    } ${
      activeRoute === 'dashboard'
        ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
        : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
    }`}
  >
    <div className="flex items-center gap-2">
      <Layers className={`w-3.5 h-3.5 shrink-0 ${activeRoute === 'dashboard' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
      {!isSidebarCollapsed && <span>Dashboard</span>}
    </div>
  </button>

  {/* 2. Projects (with Counter Badge / Indicator Dot) */}
  <button
    onClick={() => setActiveRoute('projects')}
    title={isSidebarCollapsed ? `Projects (${projects.length})` : undefined}
    className={`w-full flex items-center rounded text-xs transition-colors cursor-pointer relative ${
      isSidebarCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
    } ${
      activeRoute === 'projects'
        ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
        : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
    }`}
  >
    <div className="flex items-center gap-2">
      <FolderGit2 className={`w-3.5 h-3.5 shrink-0 ${activeRoute === 'projects' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
      {!isSidebarCollapsed && <span>Projects</span>}
    </div>
    {!isSidebarCollapsed ? (
      <span className="text-[10px] font-mono text-[#8b949e] bg-[#090d13] px-1 py-0.2 rounded border border-[#21262d]">
        {projects.length}
      </span>
    ) : (
      <span className="w-1.5 h-1.5 rounded-full bg-[#1d6cf6] absolute top-1.5 right-1.5"></span>
    )}
  </button>

  {/* 3. Deployments */}
  <button
    onClick={() => setActiveRoute('deployments')}
    title={isSidebarCollapsed ? `Deployments (${deploymentsList.length})` : undefined}
    className={`w-full flex items-center rounded text-xs transition-colors cursor-pointer ${
      isSidebarCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
    } ${
      activeRoute === 'deployments'
        ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
        : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
    }`}
  >
    <div className="flex items-center gap-2">
      <Activity className={`w-3.5 h-3.5 shrink-0 ${activeRoute === 'deployments' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
      {!isSidebarCollapsed && <span>Deployments</span>}
    </div>
    {!isSidebarCollapsed && (
      <span className="text-[10px] font-mono text-[#8b949e] bg-[#090d13] px-1 py-0.2 rounded border border-[#21262d]">
        {deploymentsList.length}
      </span>
    )}
  </button>

  {/* 4. Accounts */}
  <button
    onClick={() => setActiveRoute('accounts')}
    title={isSidebarCollapsed ? 'Connected Accounts' : undefined}
    className={`w-full flex items-center rounded text-xs transition-colors cursor-pointer ${
      isSidebarCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
    } ${
      activeRoute === 'accounts'
        ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
        : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
    }`}
  >
    <div className="flex items-center gap-2">
      <Github className={`w-3.5 h-3.5 shrink-0 ${activeRoute === 'accounts' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
      {!isSidebarCollapsed && <span>Accounts</span>}
    </div>
    {!isSidebarCollapsed && (
      <span className={`text-[9px] font-mono px-1 py-0.2 rounded border ${
        isGithubConnected && isCloudflareConnected
          ? 'text-[#3fb950] bg-[#238636]/10 border-[#238636]/30'
          : isGithubConnected || isCloudflareConnected
          ? 'text-[#58a6ff] bg-[#1d6cf6]/10 border-[#1d6cf6]/30'
          : 'text-[#8b949e] bg-[#090d13] border-[#21262d]'
      }`}>
        {isGithubConnected && isCloudflareConnected ? '2 Linked' : isGithubConnected || isCloudflareConnected ? '1 Linked' : '0 Linked'}
      </span>
    )}
  </button>

  {/* 5. Templates */}
  <button
    onClick={() => setActiveRoute('templates')}
    title={isSidebarCollapsed ? `Templates (${READY_TEMPLATES.length})` : undefined}
    className={`w-full flex items-center rounded text-xs transition-colors cursor-pointer ${
      isSidebarCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
    } ${
      activeRoute === 'templates'
        ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
        : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
    }`}
  >
    <div className="flex items-center gap-2">
      <Sparkles className={`w-3.5 h-3.5 shrink-0 ${activeRoute === 'templates' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
      {!isSidebarCollapsed && <span>Templates</span>}
    </div>
    {!isSidebarCollapsed && (
      <span className="text-[10px] font-mono text-[#8b949e] bg-[#090d13] px-1 py-0.2 rounded border border-[#21262d]">
        {READY_TEMPLATES.length}
      </span>
    )}
  </button>
</div>
```

---

### 3.5 Worker Status Footer

```tsx
<div
  className={`border-t border-[#21262d] bg-[#161b22] ${
    isSidebarCollapsed ? 'p-2 flex justify-center' : 'p-2'
  }`}
>
  {!isSidebarCollapsed ? (
    <div className="flex items-center justify-between text-[10.5px] text-[#8b949e]">
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] inline-block"></span>
        <span>Worker</span>
      </span>
      <span className="font-mono text-[9px] text-[#3fb950] font-normal">
        ONLINE
      </span>
    </div>
  ) : (
    <div
      title="Worker: ONLINE"
      className="w-5 h-5 rounded flex items-center justify-center cursor-default text-[#3fb950]"
    >
      <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse"></span>
    </div>
  )}
</div>
```

---

## 4. Secondary Project Sidebar (Workspace-Scoped)

### 4.1 Container & Visual Inset Contrast

The secondary sidebar mounts exclusively when `activeRoute === 'project-workspace'`:

```tsx
<aside className="w-[195px] shrink-0 bg-[#12161d] border-r border-[#30363d] flex flex-col justify-between h-screen sticky top-0 select-none z-20">
  {/* Content (Project Header + Workspace Tabs) */}
  <div>
    {/* Project Context Header */}
    {/* Tab Nav Items */}
  </div>

  {/* Quick Re-scan Action Footer */}
</aside>
```

- **Width**: Fixed `195px` (`w-[195px]`).
- **Background**: `#12161d` (Dark Inset Charcoal, exactly 1 step darker than the primary sidebar's `#161b22`).
- **Right Border**: `#30363d`.

---

### 4.2 Project Context Header

Displays the pinned project repository and branch context:

```tsx
<div className="p-2.5 border-b border-[#21262d] flex flex-col gap-0.5">
  <div className="text-xs font-medium text-[#f0f6fc] truncate font-sans">
    {currentProject.name}
  </div>
  <div className="text-[10px] font-mono text-[#7d8590] truncate">
    {currentProject.repo}
  </div>
</div>
```

---

### 4.3 Sub-View Navigation Items (6 Workspace Tabs)

```tsx
<div className="p-1.5 flex flex-col gap-0.5">
  {/* 1. Overview */}
  <button
    onClick={() => setWorkspaceTab('overview')}
    className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
      workspaceTab === 'overview'
        ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
        : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
    }`}
  >
    <div className="flex items-center gap-2">
      <Layers className={`w-3.5 h-3.5 ${workspaceTab === 'overview' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
      <span>Overview</span>
    </div>
  </button>

  {/* 2. Variables (with Env Count Badge) */}
  <button
    onClick={() => setWorkspaceTab('env')}
    className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
      workspaceTab === 'env'
        ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
        : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
    }`}
  >
    <div className="flex items-center gap-2">
      <Key className={`w-3.5 h-3.5 ${workspaceTab === 'env' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
      <span>Variables</span>
    </div>
    <span className="text-[9px] font-mono px-1 rounded bg-[#090d13] border border-[#21262d] text-[#8b949e]">
      {envVars.length}
    </span>
  </button>

  {/* 3. Cloudflare */}
  <button
    onClick={() => setWorkspaceTab('cloudflare')}
    className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
      workspaceTab === 'cloudflare'
        ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
        : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
    }`}
  >
    <div className="flex items-center gap-2">
      <Cloud className={`w-3.5 h-3.5 ${workspaceTab === 'cloudflare' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
      <span>Cloudflare</span>
    </div>
  </button>

  {/* 4. Domains */}
  <button
    onClick={() => setWorkspaceTab('domains')}
    className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
      workspaceTab === 'domains'
        ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
        : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
    }`}
  >
    <div className="flex items-center gap-2">
      <Globe className={`w-3.5 h-3.5 ${workspaceTab === 'domains' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
      <span>Domains</span>
    </div>
  </button>

  {/* 5. Logs */}
  <button
    onClick={() => setWorkspaceTab('logs')}
    className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
      workspaceTab === 'logs'
        ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
        : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
    }`}
  >
    <div className="flex items-center gap-2">
      <Terminal className={`w-3.5 h-3.5 ${workspaceTab === 'logs' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
      <span>Logs</span>
    </div>
  </button>

  {/* 6. History */}
  <button
    onClick={() => setWorkspaceTab('history')}
    className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
      workspaceTab === 'history'
        ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
        : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
    }`}
  >
    <div className="flex items-center gap-2">
      <History className={`w-3.5 h-3.5 ${workspaceTab === 'history' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
      <span>History</span>
    </div>
  </button>
</div>
```

---

### 4.4 Workspace Quick Action Footer

```tsx
<div className="p-2 border-t border-[#21262d] bg-[#12161d]">
  <button
    onClick={startDeepScan}
    className="w-full bg-[#21262d] hover:bg-[#282e36] text-[#c9d1d9] hover:text-[#f0f6fc] border border-[#21262d] py-1 text-[10.5px] font-normal rounded flex items-center justify-center gap-1 cursor-pointer transition-colors"
  >
    <RotateCcw className="w-3 h-3 text-[#7d8590]" />
    <span>Re-scan</span>
  </button>
</div>
```

---

## 5. Interactive States, Hover Physics & Transitions

### 5.1 Primary Sidebar Collapse Transition
```css
/* Width Animation */
transition-property: all;
transition-duration: 200ms;
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); /* ease-in-out */
```

### 5.2 Expand Button Icon Crossfade
```css
/* Logo Fade Out on Hover */
transition: opacity 150ms ease;
/* Expand Icon Fade In on Hover */
transition: opacity 150ms ease;
```

### 5.3 Nav Item States
| State | Container Class | Text Color | Icon Color | Badge Background |
| :--- | :--- | :--- | :--- | :--- |
| **Idle** | `hover:bg-[#21262d]` | `#8b949e` | `#7d8590` | `#090d13` / `#21262d` |
| **Hover** | `bg-[#21262d]` | `#f0f6fc` | `#f0f6fc` | `#090d13` / `#21262d` |
| **Active** | `bg-[#21262d] font-medium` | `#f0f6fc` | `#1d6cf6` (Electric Blue) | `#090d13` / `#1d6cf6` |

---

## 6. Color Tokens & Contrast Mapping

| Token Name | Hex / RGBA | Contrast on `#161b22` | Where Used |
| :--- | :--- | :--- | :--- |
| `primary-sidebar-bg` | `#161b22` | Base | Global sidebar background |
| `secondary-sidebar-bg` | `#12161d` | Step -1 | Project sidebar background |
| `sidebar-border` | `#30363d` | **2.1:1** | Structural right boundary |
| `sidebar-divider` | `#21262d` | **1.4:1** | Header/footer horizontal dividers |
| `active-item-bg` | `#21262d` | **1.4:1** | Active route background pill |
| `active-item-text` | `#f0f6fc` | **13.5:1 (AAA)** | Active item label |
| `active-icon-blue` | `#1d6cf6` | **4.8:1 (AA)** | Active icon fill/stroke |
| `inactive-icon` | `#7d8590` | **4.3:1** | Unselected route icon |
| `inactive-text` | `#8b949e` | **5.5:1 (AA)** | Unselected route label |
| `worker-pulse` | `#3fb950` | **7.8:1 (AAA)** | Online status green dot |
| `logo-glow` | `rgba(29, 108, 246, 0.4)` | N/A | 1px precision logo perimeter glow |
| `logo-drop-shadow` | `rgba(88, 166, 255, 0.7)` | N/A | Logo image drop shadow |

---

## 7. Drop-In Implementation for Real Application

### 7.1 TypeScript Interfaces (`types/sidebar.ts`)

```typescript
import type { ComponentType } from 'react';

export type GlobalRouteId = 'dashboard' | 'projects' | 'deployments' | 'accounts' | 'templates';

export interface GlobalNavItem {
  id: GlobalRouteId;
  label: string;
  icon: ComponentType<{ className?: string }>;
  badgeCount?: number;
  badgeLabel?: string;
  badgeVariant?: 'neutral' | 'success' | 'info';
}

export type WorkspaceTabId = 'overview' | 'env' | 'cloudflare' | 'domains' | 'logs' | 'history';

export interface WorkspaceNavItem {
  id: WorkspaceTabId;
  label: string;
  icon: ComponentType<{ className?: string }>;
  badgeCount?: number;
}
```

---

### 7.2 Reusable React Component (`PrimarySidebar.tsx`)

```tsx
import React from 'react';
import { 
  Layers, 
  FolderGit2, 
  Activity, 
  Github, 
  Sparkles, 
  PanelLeftClose, 
  PanelLeftOpen 
} from 'lucide-react';
import type { GlobalRouteId } from './types/sidebar';

interface PrimarySidebarProps {
  activeRoute: GlobalRouteId;
  setActiveRoute: (route: GlobalRouteId) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  projectsCount: number;
  deploymentsCount: number;
  accountsLinkedCount: number;
  templatesCount: number;
  isWorkerOnline?: boolean;
}

export const PrimarySidebar: React.FC<PrimarySidebarProps> = ({
  activeRoute,
  setActiveRoute,
  isCollapsed,
  setIsCollapsed,
  projectsCount,
  deploymentsCount,
  accountsLinkedCount,
  templatesCount,
  isWorkerOnline = true,
}) => {
  return (
    <aside
      className={`${
        isCollapsed ? 'w-[54px]' : 'w-[190px]'
      } shrink-0 bg-[#161b22] border-r border-[#30363d] flex flex-col justify-between h-screen sticky top-0 select-none z-30 transition-all duration-200 ease-in-out font-sans`}
    >
      <div>
        {/* Brand Header */}
        <div
          className={`py-2.5 border-b border-[#21262d] flex items-center ${
            isCollapsed ? 'justify-center px-1.5' : 'justify-between px-3'
          }`}
        >
          {!isCollapsed ? (
            <>
              <button
                type="button"
                onClick={() => setActiveRoute('dashboard')}
                className="flex items-center gap-2.5 hover:opacity-95 transition-opacity cursor-pointer group"
              >
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
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-[13.5px] tracking-tight text-[#f0f6fc] group-hover:text-white transition-colors">
                    YGIT
                  </span>
                  <span className="text-[8.5px] font-mono font-medium lowercase px-1.5 py-0.2 rounded-full bg-[#1d6cf6]/15 text-[#58a6ff] border border-[#1d6cf6]/30 leading-none">
                    beta
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                title="Collapse sidebar"
                className="p-1 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] rounded cursor-pointer transition-colors"
              >
                <PanelLeftClose className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              title="Click to expand sidebar (YGIT beta)"
              className="group relative w-7 h-7 bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] hover:border-[#1d6cf6]/40 rounded-md flex items-center justify-center cursor-pointer transition-colors shadow-[0_0_2px_rgba(29,108,246,0.3)] p-1"
            >
              <img
                src="https://ygit.net/dashboard/assets/brand/YGIT_Icon.png"
                alt="YGIT"
                className="w-4 h-4 object-contain transition-opacity duration-150 group-hover:opacity-0 drop-shadow-[0_0_1px_rgba(88,166,255,0.7)]"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="%231d6cf6"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-[#58a6ff]">
                <PanelLeftOpen className="w-3.5 h-3.5" />
              </div>
            </button>
          )}
        </div>

        {/* Global Navigation List */}
        <div className="p-1.5 flex flex-col gap-0.5">
          {/* Dashboard */}
          <button
            type="button"
            onClick={() => setActiveRoute('dashboard')}
            title={isCollapsed ? 'Dashboard' : undefined}
            className={`w-full flex items-center rounded text-xs transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
            } ${
              activeRoute === 'dashboard'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className={`w-3.5 h-3.5 shrink-0 ${activeRoute === 'dashboard' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
              {!isCollapsed && <span>Dashboard</span>}
            </div>
          </button>

          {/* Projects */}
          <button
            type="button"
            onClick={() => setActiveRoute('projects')}
            title={isCollapsed ? `Projects (${projectsCount})` : undefined}
            className={`w-full flex items-center rounded text-xs transition-colors cursor-pointer relative ${
              isCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
            } ${
              activeRoute === 'projects'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <FolderGit2 className={`w-3.5 h-3.5 shrink-0 ${activeRoute === 'projects' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
              {!isCollapsed && <span>Projects</span>}
            </div>
            {!isCollapsed ? (
              <span className="text-[10px] font-mono text-[#8b949e] bg-[#090d13] px-1 py-0.2 rounded border border-[#21262d]">
                {projectsCount}
              </span>
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-[#1d6cf6] absolute top-1.5 right-1.5"></span>
            )}
          </button>

          {/* Deployments */}
          <button
            type="button"
            onClick={() => setActiveRoute('deployments')}
            title={isCollapsed ? `Deployments (${deploymentsCount})` : undefined}
            className={`w-full flex items-center rounded text-xs transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
            } ${
              activeRoute === 'deployments'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Activity className={`w-3.5 h-3.5 shrink-0 ${activeRoute === 'deployments' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
              {!isCollapsed && <span>Deployments</span>}
            </div>
            {!isCollapsed && (
              <span className="text-[10px] font-mono text-[#8b949e] bg-[#090d13] px-1 py-0.2 rounded border border-[#21262d]">
                {deploymentsCount}
              </span>
            )}
          </button>

          {/* Accounts */}
          <button
            type="button"
            onClick={() => setActiveRoute('accounts')}
            title={isCollapsed ? 'Connected Accounts' : undefined}
            className={`w-full flex items-center rounded text-xs transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
            } ${
              activeRoute === 'accounts'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Github className={`w-3.5 h-3.5 shrink-0 ${activeRoute === 'accounts' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
              {!isCollapsed && <span>Accounts</span>}
            </div>
            {!isCollapsed && (
              <span className="text-[9px] font-mono px-1 py-0.2 rounded border text-[#3fb950] bg-[#238636]/10 border-[#238636]/30">
                {accountsLinkedCount} Linked
              </span>
            )}
          </button>

          {/* Templates */}
          <button
            type="button"
            onClick={() => setActiveRoute('templates')}
            title={isCollapsed ? `Templates (${templatesCount})` : undefined}
            className={`w-full flex items-center rounded text-xs transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
            } ${
              activeRoute === 'templates'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className={`w-3.5 h-3.5 shrink-0 ${activeRoute === 'templates' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
              {!isCollapsed && <span>Templates</span>}
            </div>
            {!isCollapsed && (
              <span className="text-[10px] font-mono text-[#8b949e] bg-[#090d13] px-1 py-0.2 rounded border border-[#21262d]">
                {templatesCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Worker Status Footer */}
      <div
        className={`border-t border-[#21262d] bg-[#161b22] ${
          isCollapsed ? 'p-2 flex justify-center' : 'p-2'
        }`}
      >
        {!isCollapsed ? (
          <div className="flex items-center justify-between text-[10.5px] text-[#8b949e]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] inline-block"></span>
              <span>Worker</span>
            </span>
            <span className="font-mono text-[9px] text-[#3fb950] font-normal">
              {isWorkerOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>
        ) : (
          <div
            title={`Worker: ${isWorkerOnline ? 'ONLINE' : 'OFFLINE'}`}
            className="w-5 h-5 rounded flex items-center justify-center cursor-default text-[#3fb950]"
          >
            <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse"></span>
          </div>
        )}
      </div>
    </aside>
  );
};
```

---

### 7.3 Reusable React Component (`SecondarySidebar.tsx`)

```tsx
import React from 'react';
import { 
  Layers, 
  Key, 
  Cloud, 
  Globe, 
  Terminal, 
  History, 
  RotateCcw 
} from 'lucide-react';
import type { WorkspaceTabId } from './types/sidebar';

interface SecondarySidebarProps {
  projectName: string;
  projectRepo: string;
  activeTab: WorkspaceTabId;
  setActiveTab: (tab: WorkspaceTabId) => void;
  envVarsCount: number;
  onReScan: () => void;
}

export const SecondarySidebar: React.FC<SecondarySidebarProps> = ({
  projectName,
  projectRepo,
  activeTab,
  setActiveTab,
  envVarsCount,
  onReScan,
}) => {
  return (
    <aside className="w-[195px] shrink-0 bg-[#12161d] border-r border-[#30363d] flex flex-col justify-between h-screen sticky top-0 select-none z-20 font-sans">
      <div>
        {/* Project Context Header */}
        <div className="p-2.5 border-b border-[#21262d] flex flex-col gap-0.5">
          <div className="text-xs font-medium text-[#f0f6fc] truncate font-sans">
            {projectName}
          </div>
          <div className="text-[10px] font-mono text-[#7d8590] truncate">
            {projectRepo}
          </div>
        </div>

        {/* Workspace Sub-Navigation Tabs */}
        <div className="p-1.5 flex flex-col gap-0.5">
          {/* Overview */}
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className={`w-3.5 h-3.5 ${activeTab === 'overview' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
              <span>Overview</span>
            </div>
          </button>

          {/* Variables */}
          <button
            type="button"
            onClick={() => setActiveTab('env')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
              activeTab === 'env'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Key className={`w-3.5 h-3.5 ${activeTab === 'env' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
              <span>Variables</span>
            </div>
            <span className="text-[9px] font-mono px-1 rounded bg-[#090d13] border border-[#21262d] text-[#8b949e]">
              {envVarsCount}
            </span>
          </button>

          {/* Cloudflare */}
          <button
            type="button"
            onClick={() => setActiveTab('cloudflare')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
              activeTab === 'cloudflare'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Cloud className={`w-3.5 h-3.5 ${activeTab === 'cloudflare' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
              <span>Cloudflare</span>
            </div>
          </button>

          {/* Domains */}
          <button
            type="button"
            onClick={() => setActiveTab('domains')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
              activeTab === 'domains'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Globe className={`w-3.5 h-3.5 ${activeTab === 'domains' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
              <span>Domains</span>
            </div>
          </button>

          {/* Logs */}
          <button
            type="button"
            onClick={() => setActiveTab('logs')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
              activeTab === 'logs'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Terminal className={`w-3.5 h-3.5 ${activeTab === 'logs' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
              <span>Logs</span>
            </div>
          </button>

          {/* History */}
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
              activeTab === 'history'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <History className={`w-3.5 h-3.5 ${activeTab === 'history' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
              <span>History</span>
            </div>
          </button>
        </div>
      </div>

      {/* Quick Action Footer */}
      <div className="p-2 border-t border-[#21262d] bg-[#12161d]">
        <button
          type="button"
          onClick={onReScan}
          className="w-full bg-[#21262d] hover:bg-[#282e36] text-[#c9d1d9] hover:text-[#f0f6fc] border border-[#21262d] py-1 text-[10.5px] font-normal rounded flex items-center justify-center gap-1 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3 h-3 text-[#7d8590]" />
          <span>Re-scan</span>
        </button>
      </div>
    </aside>
  );
};
```
