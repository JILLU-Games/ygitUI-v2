/**
 * ============================================================================
 * YGIT PLATFORM UI — WORKSPACE SUB-TAB: CLOUDFLARE PAGES & WORKERS
 * FILE: src/features/workspace/tabs/CloudflareTab.tsx
 * ============================================================================
 * 
 * PURPOSE:
 * Complete edge computing and runtime configuration suite strictly matching
 * Cloudflare Dashboard and Vercel Project Settings across 8 modular tabs:
 * 1. Build & Engine: Framework presets, Package manager, Node runtime, flags.
 * 2. Functions & Routes: Pages functions routing, smart placement, Worker Routes.
 * 3. Speed & Caching: Early hints, minification, Brotli, HTTP/3, Edge Cache TTL.
 * 4. SSL/TLS & Security: Full Strict encryption, HSTS, WAF, Bot Fight Mode.
 * 5. Bindings & Storage: KV Namespaces, D1 SQL Databases, R2 Storage, Workers AI.
 * 6. Webhooks & Deploy Hooks: Custom rebuild webhook URLs for CMS triggers.
 * 7. Live Wrangler TOML / JSONC Inspector with dynamic configuration export.
 * 8. Danger Zone: Project pause, suspension, and deletion safeguard.
 * 
 * DESIGN CONSTITUTION:
 * - Component-only architecture: Card, Table suite, PrimaryButton, SecondaryButton, IconButton, WarningButton, DangerOutlineButton.
 * - Zero border radius (`rounded-none`) and zero box shadow (`shadow-none`).
 * - Full Dark/Light dual-theme token coverage via semantic CSS variables.
 * ============================================================================
 */

import React from 'react';
import {
  Cloud,
  Flame,
  Check,
  Boxes,
  Cpu,
  Gauge,
  ShieldCheck,
  Database,
  Webhook,
  Terminal,
  AlertTriangle,
  SlidersHorizontal,
  Plus,
  Trash2,
  Copy,
  Sparkles,
  HardDrive,
  Network,
  Sliders,
} from 'lucide-react';
import {
  CfKvBinding,
  CfD1Binding,
  CfR2Binding,
  CfDeployHook,
  CfWorkerRoute,
} from '../../../types';
import { PrimaryButton, SecondaryButton, IconButton, WarningButton, DangerOutlineButton } from '../../../components/buttons';
import {
  Card,
  Table,
  TableHeader,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from '../../../components/ui';

export interface CloudflareTabProps {
  cfActiveSection: 'build' | 'functions' | 'performance' | 'security' | 'bindings' | 'webhooks' | 'wrangler' | 'danger';
  setCfActiveSection: (section: 'build' | 'functions' | 'performance' | 'security' | 'bindings' | 'webhooks' | 'wrangler' | 'danger') => void;
  cfProjectName: string;
  setCfProjectName: (name: string) => void;
  cfProductionBranch: string;
  setCfProductionBranch: (branch: string) => void;
  cfFrameworkPreset: string;
  handleFrameworkPresetChange: (preset: string) => void;
  cfBuildCommand: string;
  setCfBuildCommand: (cmd: string) => void;
  cfOutputDir: string;
  setCfOutputDir: (dir: string) => void;
  cfRootDir: string;
  setCfRootDir: (dir: string) => void;
  cfPackageManager: 'pnpm' | 'npm' | 'yarn' | 'bun';
  setCfPackageManager: (pm: 'pnpm' | 'npm' | 'yarn' | 'bun') => void;
  cfNodeVersion: string;
  setCfNodeVersion: (v: string) => void;
  cfBranchDeployments: 'all' | 'preview_only' | 'none';
  setCfBranchDeployments: (b: 'all' | 'preview_only' | 'none') => void;
  cfAutomaticComments: boolean;
  setCfAutomaticComments: (b: boolean) => void;
  cfFailOpen: boolean;
  setCfFailOpen: (b: boolean) => void;
  cfFunctionsEnabled: boolean;
  setCfFunctionsEnabled: (b: boolean) => void;
  cfSmartPlacement: boolean;
  setCfSmartPlacement: (b: boolean) => void;
  cfCompatDate: string;
  setCfCompatDate: (d: string) => void;
  cfCompatFlags: string[];
  setCfCompatFlags: React.Dispatch<React.SetStateAction<string[]>>;
  cfWorkerRoutes: CfWorkerRoute[];
  newRoutePattern: string;
  setNewRoutePattern: (p: string) => void;
  newRouteHandler: string;
  setNewRouteHandler: (h: string) => void;
  handleAddWorkerRoute: (e: React.FormEvent) => void;
  handleDeleteWorkerRoute: (id: string) => void;
  cfEarlyHints: boolean;
  setCfEarlyHints: (b: boolean) => void;
  cfAutoMinifyHtml: boolean;
  setCfAutoMinifyHtml: (b: boolean) => void;
  cfAutoMinifyCss: boolean;
  setCfAutoMinifyCss: (b: boolean) => void;
  cfAutoMinifyJs: boolean;
  setCfAutoMinifyJs: (b: boolean) => void;
  cfBrotli: boolean;
  setCfBrotli: (b: boolean) => void;
  cfHttp3Quic: boolean;
  setCfHttp3Quic: (b: boolean) => void;
  cfEdgeCacheTtl: string;
  setCfEdgeCacheTtl: (ttl: string) => void;
  cfBrowserCacheTtl: string;
  setCfBrowserCacheTtl: (ttl: string) => void;
  cfImageOptimization: boolean;
  setCfImageOptimization: (b: boolean) => void;
  cfSslMode: 'off' | 'flexible' | 'full' | 'strict';
  setCfSslMode: (mode: 'off' | 'flexible' | 'full' | 'strict') => void;
  cfAlwaysHttps: boolean;
  setCfAlwaysHttps: (b: boolean) => void;
  cfHstsEnabled: boolean;
  setCfHstsEnabled: (b: boolean) => void;
  cfHstsMaxAge: string;
  setCfHstsMaxAge: (age: string) => void;
  cfWafEnabled: boolean;
  setCfWafEnabled: (b: boolean) => void;
  cfBotFightMode: boolean;
  setCfBotFightMode: (b: boolean) => void;
  cfAccessPreviewAuth: boolean;
  setCfAccessPreviewAuth: (b: boolean) => void;
  cfKvBindings: CfKvBinding[];
  handleDeleteKvBinding: (id: string) => void;
  cfD1Bindings: CfD1Binding[];
  handleDeleteD1Binding: (id: string) => void;
  cfR2Bindings: CfR2Binding[];
  handleDeleteR2Binding: (id: string) => void;
  cfAiBindingEnabled: boolean;
  setCfAiBindingEnabled: (b: boolean) => void;
  cfDeployHooks: CfDeployHook[];
  handleDeleteDeployHook: (id: string) => void;
  setIsAddKvModalOpen: (open: boolean) => void;
  setIsAddD1ModalOpen: (open: boolean) => void;
  setIsAddR2ModalOpen: (open: boolean) => void;
  setIsAddDeployHookModalOpen: (open: boolean) => void;
  setIsPurgeModalOpen: (open: boolean) => void;
  setIsDeleteProjectModalOpen: (open: boolean) => void;
  generateWranglerToml: () => string;
  handleSaveCfSettings: () => void;
  copyToClipboard: (text: string) => void;
  showToast: (msg: string) => void;
}

export const CloudflareTab: React.FC<CloudflareTabProps> = ({
  cfActiveSection,
  setCfActiveSection,
  cfProjectName,
  setCfProjectName,
  cfProductionBranch,
  setCfProductionBranch,
  cfFrameworkPreset,
  handleFrameworkPresetChange,
  cfBuildCommand,
  setCfBuildCommand,
  cfOutputDir,
  setCfOutputDir,
  cfRootDir,
  setCfRootDir,
  cfPackageManager,
  setCfPackageManager,
  cfNodeVersion,
  setCfNodeVersion,
  cfBranchDeployments,
  setCfBranchDeployments,
  cfAutomaticComments,
  setCfAutomaticComments,
  cfFailOpen,
  setCfFailOpen,
  cfFunctionsEnabled,
  setCfFunctionsEnabled,
  cfSmartPlacement,
  setCfSmartPlacement,
  cfCompatDate,
  setCfCompatDate,
  cfCompatFlags,
  setCfCompatFlags,
  cfWorkerRoutes,
  newRoutePattern,
  setNewRoutePattern,
  newRouteHandler,
  setNewRouteHandler,
  handleAddWorkerRoute,
  handleDeleteWorkerRoute,
  cfEarlyHints,
  setCfEarlyHints,
  cfAutoMinifyHtml,
  setCfAutoMinifyHtml,
  cfAutoMinifyCss,
  setCfAutoMinifyCss,
  cfAutoMinifyJs,
  setCfAutoMinifyJs,
  cfBrotli,
  setCfBrotli,
  cfHttp3Quic,
  setCfHttp3Quic,
  cfEdgeCacheTtl,
  setCfEdgeCacheTtl,
  cfBrowserCacheTtl,
  setCfBrowserCacheTtl,
  cfImageOptimization,
  setCfImageOptimization,
  cfSslMode,
  setCfSslMode,
  cfAlwaysHttps,
  setCfAlwaysHttps,
  cfHstsEnabled,
  setCfHstsEnabled,
  cfHstsMaxAge,
  setCfHstsMaxAge,
  cfWafEnabled,
  setCfWafEnabled,
  cfBotFightMode,
  setCfBotFightMode,
  cfAccessPreviewAuth,
  setCfAccessPreviewAuth,
  cfKvBindings,
  handleDeleteKvBinding,
  cfD1Bindings,
  handleDeleteD1Binding,
  cfR2Bindings,
  handleDeleteR2Binding,
  cfAiBindingEnabled,
  setCfAiBindingEnabled,
  cfDeployHooks,
  handleDeleteDeployHook,
  setIsAddKvModalOpen,
  setIsAddD1ModalOpen,
  setIsAddR2ModalOpen,
  setIsAddDeployHookModalOpen,
  setIsPurgeModalOpen,
  setIsDeleteProjectModalOpen,
  generateWranglerToml,
  handleSaveCfSettings,
  copyToClipboard,
  showToast,
}) => {
  return (
    <div className="flex flex-col gap-2.5 animate-in fade-in duration-100 font-sans">
      {/* Top Cloudflare Platform Header Banner */}
      <Card variant="default" className="p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-none bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-500 shrink-0 shadow-none">
            <Cloud className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xs font-semibold text-fg-default">
                Cloudflare Pages & Workers
              </h3>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-none bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-none bg-emerald-500 inline-block"></span>
                310+ Global PoPs
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-none bg-accent-primary/15 text-accent-primary border border-accent-primary/30">
                V8 Isolates
              </span>
            </div>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
          <SecondaryButton
            size="sm"
            icon={<Flame className="w-3.5 h-3.5 text-amber-400" />}
            onClick={() => setIsPurgeModalOpen(true)}
          >
            Purge Cache
          </SecondaryButton>
          <PrimaryButton
            size="sm"
            icon={<Check className="w-3.5 h-3.5" />}
            onClick={handleSaveCfSettings}
          >
            Save
          </PrimaryButton>
        </div>
      </Card>

      {/* Horizontal Navigation Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1.5 border-b border-border-default text-[11px] sm:text-xs">
        {[
          { id: 'build', label: 'Build & Engine', shortLabel: 'Build', icon: SlidersHorizontal },
          { id: 'functions', label: 'Functions & Routes', shortLabel: 'Functions', icon: Cpu },
          { id: 'performance', label: 'Speed & Caching', shortLabel: 'Speed', icon: Gauge },
          { id: 'security', label: 'SSL/TLS & Security', shortLabel: 'Security', icon: ShieldCheck },
          { id: 'bindings', label: 'Bindings', shortLabel: 'Bindings', icon: Database, badge: `${cfKvBindings.length + cfD1Bindings.length + cfR2Bindings.length}` },
          { id: 'webhooks', label: 'Deploy Hooks', shortLabel: 'Hooks', icon: Webhook, badge: `${cfDeployHooks.length}` },
          { id: 'wrangler', label: 'wrangler.toml', shortLabel: 'Wrangler', icon: Terminal },
          { id: 'danger', label: 'Danger Zone', shortLabel: 'Danger', icon: AlertTriangle },
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = cfActiveSection === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCfActiveSection(tab.id as any)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1 rounded-none text-[11px] sm:text-xs cursor-pointer whitespace-nowrap shrink-0 transition-colors shadow-none ${
                isActive
                  ? 'bg-canvas-subtle text-fg-default font-medium border border-border-default'
                  : 'text-fg-muted hover:text-fg-default hover:bg-canvas-subtle/50 border border-transparent font-normal'
              }`}
            >
              <IconComp className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${isActive ? 'text-accent-primary' : 'text-fg-subtle'}`} />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
              {tab.badge && (
                <span className="text-[9px] font-mono px-1 py-0.5 rounded-none bg-canvas-inset text-fg-muted border border-border-subtle">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 
        ============================================================
        SECTION 1: BUILD & RUNTIME ENGINE
        ============================================================
      */}
      {cfActiveSection === 'build' && (
        <div className="flex flex-col gap-2.5">
          {/* Framework Preset Selector */}
          <Card variant="default" className="p-2.5 sm:p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-border-subtle">
              <div className="text-xs font-medium text-fg-default flex items-center gap-1.5">
                <Boxes className="w-3.5 h-3.5 text-accent-primary" />
                <span>Framework Preset</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 text-xs">
              {[
                { id: 'vite', name: 'Vite 6', icon: '⚡' },
                { id: 'nextjs', name: 'Next.js', icon: '▲' },
                { id: 'remix', name: 'Remix', icon: '💿' },
                { id: 'astro', name: 'Astro', icon: '🚀' },
                { id: 'sveltekit', name: 'SvelteKit', icon: '🔥' },
                { id: 'react-spa', name: 'React SPA', icon: '⚛' },
                { id: 'nuxt', name: 'Nuxt 3', icon: '💚' },
                { id: 'static', name: 'Static HTML', icon: '📄' },
              ].map((fw) => (
                <button
                  key={fw.id}
                  type="button"
                  onClick={() => handleFrameworkPresetChange(fw.id)}
                  className={`p-1.5 rounded-none border flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all shadow-none ${
                    cfFrameworkPreset === fw.id
                      ? 'bg-accent-primary/15 border-accent-primary text-fg-default font-medium'
                      : 'bg-canvas-inset border-border-subtle text-fg-muted hover:border-border-default hover:text-fg-default font-normal'
                  }`}
                >
                  <span className="text-sm">{fw.icon}</span>
                  <span className="text-[10.5px] truncate">{fw.name}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Build & Deployment Pipeline Configuration */}
          <Card variant="default" className="p-2.5 sm:p-3 flex flex-col gap-2.5">
            <div className="text-xs font-medium text-fg-default pb-1 border-b border-border-subtle flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-accent-primary" />
                <span>Build Pipeline & Directory</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] font-mono uppercase text-fg-subtle">Project Name</label>
                <input
                  type="text"
                  value={cfProjectName}
                  onChange={(e) => setCfProjectName(e.target.value)}
                  className="bg-canvas-inset border border-border-default focus:border-accent-primary focus:outline-none rounded-none px-2.5 py-1 font-mono text-xs text-fg-default shadow-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] font-mono uppercase text-fg-subtle">Production Branch</label>
                <input
                  type="text"
                  value={cfProductionBranch}
                  onChange={(e) => setCfProductionBranch(e.target.value)}
                  className="bg-canvas-inset border border-border-default focus:border-accent-primary focus:outline-none rounded-none px-2.5 py-1 font-mono text-xs text-fg-default shadow-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] font-mono uppercase text-fg-subtle">Package Manager</label>
                <select
                  value={cfPackageManager}
                  onChange={(e) => setCfPackageManager(e.target.value as any)}
                  className="bg-canvas-inset border border-border-default focus:border-accent-primary focus:outline-none rounded-none px-2.5 py-1 text-xs text-fg-default font-mono cursor-pointer shadow-none"
                >
                  <option value="pnpm">pnpm (Fast lockfile v6)</option>
                  <option value="npm">npm (Standard Node)</option>
                  <option value="yarn">yarn (Classic / Berry)</option>
                  <option value="bun">bun (JS runtime)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] font-mono uppercase text-fg-subtle">Build Command</label>
                <input
                  type="text"
                  value={cfBuildCommand}
                  onChange={(e) => setCfBuildCommand(e.target.value)}
                  className="bg-canvas-inset border border-border-default focus:border-accent-primary focus:outline-none rounded-none px-2.5 py-1 font-mono text-xs text-fg-default shadow-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] font-mono uppercase text-fg-subtle">Build Output Directory</label>
                <input
                  type="text"
                  value={cfOutputDir}
                  onChange={(e) => setCfOutputDir(e.target.value)}
                  className="bg-canvas-inset border border-border-default focus:border-accent-primary focus:outline-none rounded-none px-2.5 py-1 font-mono text-xs text-fg-default shadow-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] font-mono uppercase text-fg-subtle">Monorepo Root Directory</label>
                <input
                  type="text"
                  value={cfRootDir}
                  onChange={(e) => setCfRootDir(e.target.value)}
                  className="bg-canvas-inset border border-border-default focus:border-accent-primary focus:outline-none rounded-none px-2.5 py-1 font-mono text-xs text-fg-default shadow-none"
                />
              </div>
            </div>
          </Card>

          {/* Runtime Compatibility & Flags */}
          <Card variant="default" className="p-2.5 sm:p-3 flex flex-col gap-2.5">
            <div className="text-xs font-medium text-fg-default pb-1 border-b border-border-subtle flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-accent-primary" />
                <span>Runtime Compatibility</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] font-mono uppercase text-fg-subtle">Node.js Version</label>
                <select
                  value={cfNodeVersion}
                  onChange={(e) => setCfNodeVersion(e.target.value)}
                  className="bg-canvas-inset border border-border-default focus:border-accent-primary focus:outline-none rounded-none px-2.5 py-1 text-xs text-fg-default font-mono cursor-pointer shadow-none"
                >
                  <option value="20.18.0">Node.js 20.18.0 (LTS Iron)</option>
                  <option value="22.9.0">Node.js 22.9.0 (Current Jod)</option>
                  <option value="18.20.4">Node.js 18.20.4 (Maintenance)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] font-mono uppercase text-fg-subtle">Compatibility Date</label>
                <input
                  type="text"
                  value={cfCompatDate}
                  onChange={(e) => setCfCompatDate(e.target.value)}
                  className="bg-canvas-inset border border-border-default focus:border-accent-primary focus:outline-none rounded-none px-2.5 py-1 font-mono text-xs text-fg-default shadow-none"
                />
              </div>
            </div>

            {/* Compatibility Flags */}
            <div className="flex flex-col gap-1 pt-1">
              <label className="text-[9.5px] font-mono uppercase text-fg-subtle">Compatibility Flags</label>
              <div className="flex flex-wrap items-center gap-1.5">
                {cfCompatFlags.map((flag) => (
                  <span
                    key={flag}
                    className="px-2 py-0.5 rounded-none bg-canvas-inset border border-border-default text-accent-primary font-mono text-[10px] flex items-center gap-1 shadow-none"
                  >
                    <span>{flag}</span>
                    <button
                      type="button"
                      onClick={() => setCfCompatFlags((prev) => prev.filter((f) => f !== flag))}
                      className="text-fg-subtle hover:text-red-400 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newFlag = prompt('Enter compatibility flag name (e.g. url_standard):');
                    if (newFlag && !cfCompatFlags.includes(newFlag)) {
                      setCfCompatFlags((prev) => [...prev, newFlag.trim()]);
                    }
                  }}
                  className="px-2 py-0.5 rounded-none bg-canvas-subtle hover:bg-canvas-default text-fg-muted hover:text-fg-default border border-border-default text-[10px] font-mono cursor-pointer transition-colors shadow-none"
                >
                  + Add Flag
                </button>
              </div>
            </div>

            {/* Branch Deployment Rules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-border-subtle text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] font-mono uppercase text-fg-subtle">Branch Preview Deployments</label>
                <select
                  value={cfBranchDeployments}
                  onChange={(e) => setCfBranchDeployments(e.target.value as any)}
                  className="bg-canvas-inset border border-border-default focus:border-accent-primary focus:outline-none rounded-none px-2.5 py-1 text-xs text-fg-default font-mono cursor-pointer shadow-none"
                >
                  <option value="all">Automatically deploy all branches</option>
                  <option value="preview_only">Only deploy non-production branches</option>
                  <option value="none">Disable preview deployments</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-2 rounded-none bg-canvas-inset border border-border-subtle self-end shadow-none">
                <div className="flex flex-col">
                  <span className="font-medium text-xs text-fg-default">Automatic PR Comments</span>
                  <span className="text-[10px] text-fg-muted">Post preview deployment URLs on PRs</span>
                </div>
                <input
                  type="checkbox"
                  checked={cfAutomaticComments}
                  onChange={(e) => setCfAutomaticComments(e.target.checked)}
                  className="w-4 h-4 rounded-none bg-canvas-subtle border-border-default text-accent-primary focus:ring-0 cursor-pointer"
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 
        ============================================================
        SECTION 2: FUNCTIONS & EDGE WORKER ROUTES
        ============================================================
      */}
      {cfActiveSection === 'functions' && (
        <div className="flex flex-col gap-2.5">
          <Card variant="default" className="p-2.5 sm:p-3 flex flex-col gap-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-border-subtle">
              <div className="text-xs font-medium text-fg-default flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-accent-primary" />
                <span>Pages Functions & Middleware</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-none bg-canvas-inset border border-border-subtle shadow-none">
                <div className="flex flex-col">
                  <span className="font-medium text-fg-default">Pages Functions</span>
                  <span className="text-[10px] text-fg-muted">Execute TypeScript / JS routes</span>
                </div>
                <input
                  type="checkbox"
                  checked={cfFunctionsEnabled}
                  onChange={(e) => setCfFunctionsEnabled(e.target.checked)}
                  className="w-4 h-4 rounded-none bg-canvas-subtle border-border-default text-accent-primary focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded-none bg-canvas-inset border border-border-subtle shadow-none">
                <div className="flex flex-col">
                  <span className="font-medium text-fg-default">Smart Placement</span>
                  <span className="text-[10px] text-fg-muted">Route compute near backend DB</span>
                </div>
                <input
                  type="checkbox"
                  checked={cfSmartPlacement}
                  onChange={(e) => setCfSmartPlacement(e.target.checked)}
                  className="w-4 h-4 rounded-none bg-canvas-subtle border-border-default text-accent-primary focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded-none bg-canvas-inset border border-border-subtle shadow-none">
                <div className="flex flex-col">
                  <span className="font-medium text-fg-default">Fail Open on Error</span>
                  <span className="text-[10px] text-fg-muted">Serve static cache if function fails</span>
                </div>
                <input
                  type="checkbox"
                  checked={cfFailOpen}
                  onChange={(e) => setCfFailOpen(e.target.checked)}
                  className="w-4 h-4 rounded-none bg-canvas-subtle border-border-default text-accent-primary focus:ring-0 cursor-pointer"
                />
              </div>
            </div>
          </Card>

          {/* Edge Worker Routes Table */}
          <Card variant="default" className="p-2.5 sm:p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-border-subtle">
              <div className="text-xs font-medium text-fg-default flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5 text-accent-primary" />
                <span>Edge Worker Routes</span>
              </div>
            </div>

            {/* Add Route Form */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 text-xs bg-canvas-inset p-1.5 rounded-none border border-border-subtle shadow-none">
              <div className="sm:col-span-6 flex flex-col gap-0.5">
                <input
                  type="text"
                  placeholder="Pattern glob (e.g. /api/*)"
                  value={newRoutePattern}
                  onChange={(e) => setNewRoutePattern(e.target.value)}
                  className="bg-canvas-subtle border border-border-default rounded-none px-2 py-1 text-xs text-fg-default font-mono focus:border-accent-primary focus:outline-none shadow-none"
                />
              </div>
              <div className="sm:col-span-4 flex flex-col gap-0.5">
                <input
                  type="text"
                  placeholder="Handler module (e.g. functions/api)"
                  value={newRouteHandler}
                  onChange={(e) => setNewRouteHandler(e.target.value)}
                  className="bg-canvas-subtle border border-border-default rounded-none px-2 py-1 text-xs text-fg-default font-mono focus:border-accent-primary focus:outline-none shadow-none"
                />
              </div>
              <div className="sm:col-span-2 flex items-center justify-end">
                <PrimaryButton
                  size="sm"
                  fullWidth
                  onClick={handleAddWorkerRoute}
                  disabled={!newRoutePattern.trim() || !newRouteHandler.trim()}
                  icon={<Plus className="w-3 h-3" />}
                >
                  Add
                </PrimaryButton>
              </div>
            </div>

            {/* Routes Table */}
            <Table>
              <TableHeader>
                <TableRow isHeader>
                  <TableHeadCell>Pattern Glob</TableHeadCell>
                  <TableHeadCell>Target Handler</TableHeadCell>
                  <TableHeadCell>Latency</TableHeadCell>
                  <TableHeadCell align="right">Actions</TableHeadCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cfWorkerRoutes.map((route) => (
                  <TableRow key={route.id}>
                    <TableCell className="font-mono text-accent-primary">{route.pattern}</TableCell>
                    <TableCell className="font-mono text-fg-default">{route.handler}</TableCell>
                    <TableCell className="font-mono text-[10.5px] text-emerald-500">~0.4ms</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="sm"
                        onClick={() => handleDeleteWorkerRoute(route.id)}
                        aria-label="Delete worker route"
                        icon={<Trash2 className="w-3.5 h-3.5 text-fg-muted hover:text-red-400" />}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}

      {/* 
        ============================================================
        SECTION 3: SPEED, CACHING & PERFORMANCE
        ============================================================
      */}
      {cfActiveSection === 'performance' && (
        <div className="flex flex-col gap-2.5">
          <Card variant="default" className="p-2.5 sm:p-3 flex flex-col gap-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-border-subtle">
              <div className="text-xs font-medium text-fg-default flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-accent-primary" />
                <span>Speed & Caching</span>
              </div>
            </div>

            {/* Performance Toggles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-none bg-canvas-inset border border-border-subtle shadow-none">
                <div className="flex flex-col">
                  <span className="font-medium text-fg-default">Early Hints (103)</span>
                  <span className="text-[10px] text-fg-muted">Preload CSS & fonts</span>
                </div>
                <input
                  type="checkbox"
                  checked={cfEarlyHints}
                  onChange={(e) => setCfEarlyHints(e.target.checked)}
                  className="w-4 h-4 rounded-none bg-canvas-subtle border-border-default text-accent-primary focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded-none bg-canvas-inset border border-border-subtle shadow-none">
                <div className="flex flex-col">
                  <span className="font-medium text-fg-default">Brotli Compression</span>
                  <span className="text-[10px] text-fg-muted">~20% smaller than Gzip</span>
                </div>
                <input
                  type="checkbox"
                  checked={cfBrotli}
                  onChange={(e) => setCfBrotli(e.target.checked)}
                  className="w-4 h-4 rounded-none bg-canvas-subtle border-border-default text-accent-primary focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded-none bg-canvas-inset border border-border-subtle shadow-none">
                <div className="flex flex-col">
                  <span className="font-medium text-fg-default">HTTP/3 (QUIC)</span>
                  <span className="text-[10px] text-fg-muted">Zero-RTT UDP protocol</span>
                </div>
                <input
                  type="checkbox"
                  checked={cfHttp3Quic}
                  onChange={(e) => setCfHttp3Quic(e.target.checked)}
                  className="w-4 h-4 rounded-none bg-canvas-subtle border-border-default text-accent-primary focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded-none bg-canvas-inset border border-border-subtle shadow-none">
                <div className="flex flex-col">
                  <span className="font-medium text-fg-default">Image Optimization</span>
                  <span className="text-[10px] text-fg-muted">Auto WebP conversion</span>
                </div>
                <input
                  type="checkbox"
                  checked={cfImageOptimization}
                  onChange={(e) => setCfImageOptimization(e.target.checked)}
                  className="w-4 h-4 rounded-none bg-canvas-subtle border-border-default text-accent-primary focus:ring-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Auto Minification Suite */}
            <div className="bg-canvas-inset border border-border-subtle rounded-none p-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs shadow-none">
              <div className="flex items-center gap-2">
                <span className="font-medium text-fg-default">Auto Minify Assets:</span>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cfAutoMinifyHtml}
                    onChange={(e) => setCfAutoMinifyHtml(e.target.checked)}
                    className="w-3.5 h-3.5 rounded-none bg-canvas-subtle border-border-default text-accent-primary"
                  />
                  <span className="font-mono text-[11px] text-fg-default">HTML</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cfAutoMinifyCss}
                    onChange={(e) => setCfAutoMinifyCss(e.target.checked)}
                    className="w-3.5 h-3.5 rounded-none bg-canvas-subtle border-border-default text-accent-primary"
                  />
                  <span className="font-mono text-[11px] text-fg-default">CSS</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cfAutoMinifyJs}
                    onChange={(e) => setCfAutoMinifyJs(e.target.checked)}
                    className="w-3.5 h-3.5 rounded-none bg-canvas-subtle border-border-default text-accent-primary"
                  />
                  <span className="font-mono text-[11px] text-fg-default">JavaScript</span>
                </label>
              </div>
            </div>

            {/* TTL Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] font-mono uppercase text-fg-subtle">Edge Cache TTL</label>
                <select
                  value={cfEdgeCacheTtl}
                  onChange={(e) => setCfEdgeCacheTtl(e.target.value)}
                  className="bg-canvas-inset border border-border-default focus:border-accent-primary focus:outline-none rounded-none px-2.5 py-1 text-xs text-fg-default font-mono cursor-pointer shadow-none"
                >
                  <option value="2h">2 Hours</option>
                  <option value="4h">4 Hours (Recommended)</option>
                  <option value="12h">12 Hours</option>
                  <option value="1d">1 Day</option>
                  <option value="7d">7 Days</option>
                  <option value="respect">Respect Origin Headers</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] font-mono uppercase text-fg-subtle">Browser Cache TTL</label>
                <select
                  value={cfBrowserCacheTtl}
                  onChange={(e) => setCfBrowserCacheTtl(e.target.value)}
                  className="bg-canvas-inset border border-border-default focus:border-accent-primary focus:outline-none rounded-none px-2.5 py-1 text-xs text-fg-default font-mono cursor-pointer shadow-none"
                >
                  <option value="respect">Respect Existing Headers</option>
                  <option value="1h">1 Hour</option>
                  <option value="4h">4 Hours</option>
                  <option value="1d">1 Day</option>
                  <option value="1y">1 Year (Immutable)</option>
                </select>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 
        ============================================================
        SECTION 4: SSL/TLS, ENCRYPTION & SECURITY
        ============================================================
      */}
      {cfActiveSection === 'security' && (
        <div className="flex flex-col gap-2.5">
          <Card variant="default" className="p-2.5 sm:p-3 flex flex-col gap-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-border-subtle">
              <div className="text-xs font-medium text-fg-default flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>SSL/TLS & Security</span>
              </div>
              <span className="text-[9.5px] font-mono text-emerald-500">TLS 1.3</span>
            </div>

            {/* SSL Encryption Mode */}
            <div className="flex flex-col gap-1">
              <label className="text-[9.5px] font-mono uppercase text-fg-subtle">SSL / TLS Mode</label>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-1.5 text-xs">
                {[
                  { id: 'strict', name: 'Full (Strict)', desc: 'End-to-end with CA certs' },
                  { id: 'full', name: 'Full', desc: 'Encrypts end-to-end' },
                  { id: 'flexible', name: 'Flexible', desc: 'Edge to browser only' },
                  { id: 'off', name: 'Off', desc: 'Plaintext HTTP' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setCfSslMode(mode.id as any)}
                    className={`p-2 rounded-none border text-left flex flex-col gap-0.5 cursor-pointer transition-all shadow-none ${
                      cfSslMode === mode.id
                        ? 'bg-emerald-500/15 border-emerald-500 text-fg-default'
                        : 'bg-canvas-inset border-border-default text-fg-muted hover:border-border-default'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-xs text-fg-default">{mode.name}</span>
                      {cfSslMode === mode.id && <span className="text-emerald-500">●</span>}
                    </div>
                    <span className="text-[10px] text-fg-subtle">{mode.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Security Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs pt-1">
              <div className="flex items-center justify-between p-2 rounded-none bg-canvas-inset border border-border-subtle shadow-none">
                <div className="flex flex-col">
                  <span className="font-medium text-fg-default">Always HTTPS</span>
                  <span className="text-[10px] text-fg-muted">Redirect HTTP to HTTPS</span>
                </div>
                <input
                  type="checkbox"
                  checked={cfAlwaysHttps}
                  onChange={(e) => setCfAlwaysHttps(e.target.checked)}
                  className="w-4 h-4 rounded-none bg-canvas-subtle border-border-default text-accent-primary focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded-none bg-canvas-inset border border-border-subtle shadow-none">
                <div className="flex flex-col">
                  <span className="font-medium text-fg-default">WAF Shield</span>
                  <span className="text-[10px] text-fg-muted">OWASP rule protection</span>
                </div>
                <input
                  type="checkbox"
                  checked={cfWafEnabled}
                  onChange={(e) => setCfWafEnabled(e.target.checked)}
                  className="w-4 h-4 rounded-none bg-canvas-subtle border-border-default text-accent-primary focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded-none bg-canvas-inset border border-border-subtle shadow-none">
                <div className="flex flex-col">
                  <span className="font-medium text-fg-default">Bot Fight Mode</span>
                  <span className="text-[10px] text-fg-muted">Block automated scrapers</span>
                </div>
                <input
                  type="checkbox"
                  checked={cfBotFightMode}
                  onChange={(e) => setCfBotFightMode(e.target.checked)}
                  className="w-4 h-4 rounded-none bg-canvas-subtle border-border-default text-accent-primary focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded-none bg-canvas-inset border border-border-subtle shadow-none">
                <div className="flex flex-col">
                  <span className="font-medium text-fg-default">Zero Trust Auth</span>
                  <span className="text-[10px] text-fg-muted">Protect preview URLs</span>
                </div>
                <input
                  type="checkbox"
                  checked={cfAccessPreviewAuth}
                  onChange={(e) => setCfAccessPreviewAuth(e.target.checked)}
                  className="w-4 h-4 rounded-none bg-canvas-subtle border-border-default text-accent-primary focus:ring-0 cursor-pointer"
                />
              </div>
            </div>

            {/* HSTS Settings */}
            <div className="bg-canvas-inset border border-border-subtle rounded-none p-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs shadow-none">
              <div className="flex flex-col">
                <span className="font-medium text-fg-default">HTTP Strict Transport Security (HSTS)</span>
                <span className="text-[10.5px] text-fg-muted">Enforces secure HTTPS connections on browser clients.</span>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cfHstsEnabled}
                    onChange={(e) => setCfHstsEnabled(e.target.checked)}
                    className="w-3.5 h-3.5 rounded-none bg-canvas-subtle border-border-default text-accent-primary"
                  />
                  <span className="text-[11px] text-fg-default">Enabled ({cfHstsMaxAge})</span>
                </label>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 
        ============================================================
        SECTION 5: BINDINGS (KV, D1, R2, AI GATEWAY)
        ============================================================
      */}
      {cfActiveSection === 'bindings' && (
        <div className="flex flex-col gap-2.5">
          {/* KV Namespaces */}
          <Card variant="default" className="p-2.5 sm:p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-border-subtle">
              <div className="text-xs font-medium text-fg-default flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-accent-primary" />
                <span>KV Namespaces</span>
              </div>
              <SecondaryButton
                size="sm"
                icon={<Plus className="w-3 h-3" />}
                onClick={() => setIsAddKvModalOpen(true)}
              >
                Add KV
              </SecondaryButton>
            </div>

            <Table>
              <TableHeader>
                <TableRow isHeader>
                  <TableHeadCell>Variable</TableHeadCell>
                  <TableHeadCell>Namespace ID</TableHeadCell>
                  <TableHeadCell>Target</TableHeadCell>
                  <TableHeadCell align="right">Actions</TableHeadCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cfKvBindings.map((kv) => (
                  <TableRow key={kv.id}>
                    <TableCell className="font-mono text-accent-primary">{kv.name}</TableCell>
                    <TableCell className="font-mono text-fg-default truncate max-w-[200px]">{kv.namespaceId}</TableCell>
                    <TableCell>
                      <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded-none bg-canvas-subtle text-fg-muted border border-border-subtle">
                        {kv.environment}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="sm"
                        icon={<Trash2 className="w-3.5 h-3.5" />}
                        onClick={() => handleDeleteKvBinding(kv.id)}
                        className="hover:text-red-400"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* D1 SQL Databases */}
          <Card variant="default" className="p-2.5 sm:p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-border-subtle">
              <div className="text-xs font-medium text-fg-default flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-emerald-500" />
                <span>D1 SQL Databases</span>
              </div>
              <SecondaryButton
                size="sm"
                icon={<Plus className="w-3 h-3" />}
                onClick={() => setIsAddD1ModalOpen(true)}
              >
                Add D1
              </SecondaryButton>
            </div>

            <Table>
              <TableHeader>
                <TableRow isHeader>
                  <TableHeadCell>Variable</TableHeadCell>
                  <TableHeadCell>Database ID</TableHeadCell>
                  <TableHeadCell>Target</TableHeadCell>
                  <TableHeadCell align="right">Actions</TableHeadCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cfD1Bindings.map((d1) => (
                  <TableRow key={d1.id}>
                    <TableCell className="font-mono text-emerald-500">{d1.name}</TableCell>
                    <TableCell className="font-mono text-fg-default truncate max-w-[200px]">{d1.databaseId}</TableCell>
                    <TableCell>
                      <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded-none bg-canvas-subtle text-fg-muted border border-border-subtle">
                        {d1.environment}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="sm"
                        icon={<Trash2 className="w-3.5 h-3.5" />}
                        onClick={() => handleDeleteD1Binding(d1.id)}
                        className="hover:text-red-400"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* R2 Storage Buckets */}
          <Card variant="default" className="p-2.5 sm:p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-border-subtle">
              <div className="text-xs font-medium text-fg-default flex items-center gap-1.5">
                <Boxes className="w-3.5 h-3.5 text-amber-400" />
                <span>R2 Storage Buckets</span>
              </div>
              <SecondaryButton
                size="sm"
                icon={<Plus className="w-3 h-3" />}
                onClick={() => setIsAddR2ModalOpen(true)}
              >
                Add R2
              </SecondaryButton>
            </div>

            <Table>
              <TableHeader>
                <TableRow isHeader>
                  <TableHeadCell>Variable</TableHeadCell>
                  <TableHeadCell>Bucket Name</TableHeadCell>
                  <TableHeadCell>Target</TableHeadCell>
                  <TableHeadCell align="right">Actions</TableHeadCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cfR2Bindings.map((r2) => (
                  <TableRow key={r2.id}>
                    <TableCell className="font-mono text-amber-400">{r2.name}</TableCell>
                    <TableCell className="font-mono text-fg-default truncate max-w-[200px]">{r2.bucketName}</TableCell>
                    <TableCell>
                      <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded-none bg-canvas-subtle text-fg-muted border border-border-subtle">
                        {r2.environment}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="sm"
                        icon={<Trash2 className="w-3.5 h-3.5" />}
                        onClick={() => handleDeleteR2Binding(r2.id)}
                        className="hover:text-red-400"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Workers AI Binding */}
          <Card variant="subtle" className="p-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-none bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-none">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-fg-default">Workers AI Binding (env.AI)</span>
                <span className="text-[10px] text-fg-muted">Direct access to Llama 3 and Whisper at the Edge</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={cfAiBindingEnabled}
              onChange={(e) => setCfAiBindingEnabled(e.target.checked)}
              className="w-4 h-4 rounded-none bg-canvas-subtle border-border-default text-accent-primary focus:ring-0 cursor-pointer"
            />
          </Card>
        </div>
      )}

      {/* 
        ============================================================
        SECTION 6: DEPLOY HOOKS / CI/CD WEBHOOKS
        ============================================================
      */}
      {cfActiveSection === 'webhooks' && (
        <div className="flex flex-col gap-2.5">
          <Card variant="default" className="p-2.5 sm:p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-border-subtle">
              <div className="text-xs font-medium text-fg-default flex items-center gap-1.5">
                <Webhook className="w-3.5 h-3.5 text-accent-primary" />
                <span>Deploy Hooks</span>
              </div>
              <PrimaryButton
                size="sm"
                icon={<Plus className="w-3 h-3" />}
                onClick={() => setIsAddDeployHookModalOpen(true)}
              >
                Create Hook
              </PrimaryButton>
            </div>

            <Table>
              <TableHeader>
                <TableRow isHeader>
                  <TableHeadCell>Name</TableHeadCell>
                  <TableHeadCell>Branch</TableHeadCell>
                  <TableHeadCell>Webhook URL</TableHeadCell>
                  <TableHeadCell>Created</TableHeadCell>
                  <TableHeadCell align="right">Actions</TableHeadCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cfDeployHooks.map((hook) => (
                  <TableRow key={hook.id}>
                    <TableCell className="font-medium text-fg-default">{hook.name}</TableCell>
                    <TableCell className="font-mono text-accent-primary">{hook.branch}</TableCell>
                    <TableCell className="font-mono text-fg-default truncate max-w-[220px]">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate">{hook.url}</span>
                        <button
                          type="button"
                          onClick={() => {
                            copyToClipboard(hook.url);
                            showToast('Copied webhook URL');
                          }}
                          className="p-1 text-fg-subtle hover:text-fg-default cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="text-[10px] text-fg-subtle">{hook.createdAt}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="sm"
                        onClick={() => handleDeleteDeployHook(hook.id)}
                        aria-label="Delete deploy hook"
                        icon={<Trash2 className="w-3.5 h-3.5 text-fg-muted hover:text-red-400" />}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}

      {/* 
        ============================================================
        SECTION 7: WRANGLER TOML / JSONC INSPECTOR
        ============================================================
      */}
      {cfActiveSection === 'wrangler' && (
        <div className="flex flex-col gap-2.5">
          <Card variant="default" className="p-2.5 sm:p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-border-subtle">
              <div className="text-xs font-medium text-fg-default flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-accent-primary" />
                <span>wrangler.toml</span>
              </div>
              <div className="flex items-center gap-1.5">
                <SecondaryButton
                  size="sm"
                  icon={<Copy className="w-3 h-3" />}
                  onClick={() => {
                    copyToClipboard(generateWranglerToml());
                    showToast('Copied configuration');
                  }}
                >
                  Copy
                </SecondaryButton>
              </div>
            </div>

            <pre className="bg-canvas-inset border border-border-subtle rounded-none p-2.5 font-mono text-[10.5px] text-accent-primary overflow-x-auto max-h-[350px] shadow-none select-all">
              {generateWranglerToml()}
            </pre>
          </Card>
        </div>
      )}

      {/* 
        ============================================================
        SECTION 8: DANGER ZONE
        ============================================================
      */}
      {cfActiveSection === 'danger' && (
        <div className="flex flex-col gap-2.5">
          <div className="bg-canvas-subtle border border-red-500/30 rounded-none p-3 flex flex-col gap-2 shadow-none">
            <div className="flex items-center gap-2 pb-1 border-b border-red-500/20">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <h3 className="text-xs font-medium text-red-400">Danger Zone</h3>
            </div>

            <div className="flex flex-col divide-y divide-border-subtle text-xs">
              <div className="py-2 flex items-center justify-between gap-2">
                <div className="flex flex-col">
                  <span className="font-medium text-fg-default">Pause Deployments</span>
                  <span className="text-[10px] text-fg-muted">Stop building new commits pushed to GitHub.</span>
                </div>
                <WarningButton
                  size="sm"
                  onClick={() => showToast('Deployments paused.')}
                >
                  Pause
                </WarningButton>
              </div>

              <div className="py-2 flex items-center justify-between gap-2">
                <div className="flex flex-col">
                  <span className="font-medium text-red-400">Delete Project</span>
                  <span className="text-[10px] text-fg-muted">Permanently delete this project and custom domain bindings.</span>
                </div>
                <DangerOutlineButton
                  size="sm"
                  onClick={() => setIsDeleteProjectModalOpen(true)}
                >
                  Delete
                </DangerOutlineButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
