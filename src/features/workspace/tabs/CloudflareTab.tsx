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
              <div className="flex flex-col gap-2.5">
                {/* Top Cloudflare Platform Header Banner */}
                <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-[#f6821f]/10 border border-[#f6821f]/25 flex items-center justify-center text-[#f6821f] shrink-0">
                      <Cloud className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xs font-semibold text-[#f0f6fc]">
                          Cloudflare Pages & Workers
                        </h3>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] inline-block"></span>
                          310+ Global PoPs
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#1d6cf6]/15 text-[#58a6ff] border border-[#1d6cf6]/30">
                          V8 Isolates
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Header Action Buttons */}
                  <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                    <SecondaryButton
                      size="sm"
                      icon={<Flame className="w-3.5 h-3.5 text-[#e3b341]" />}
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
                </div>

                {/* Horizontal Navigation Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1.5 border-b border-[#21262d] text-[11px] sm:text-xs scrollbar-thin scrollbar-thumb-[#21262d] scrollbar-track-transparent">
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
                        className={`flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1 rounded text-[11px] sm:text-xs cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                          isActive
                            ? 'bg-[#21262d] text-[#f0f6fc] font-medium border border-[#30363d]'
                            : 'text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#161b22] border border-transparent font-normal'
                        }`}
                      >
                        <IconComp className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${isActive ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
                        <span className="hidden sm:inline">{tab.label}</span>
                        <span className="sm:hidden">{tab.shortLabel}</span>
                        {tab.badge && (
                          <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-[#090d13] text-[#8b949e] border border-[#21262d]">
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
                    <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 sm:p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between pb-1 border-b border-[#21262d]">
                        <div className="text-xs font-medium text-[#f0f6fc] flex items-center gap-1.5">
                          <Boxes className="w-3.5 h-3.5 text-[#1d6cf6]" />
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
                            className={`p-1.5 rounded border flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all ${
                              cfFrameworkPreset === fw.id
                                ? 'bg-[#1d6cf6]/15 border-[#1d6cf6] text-[#f0f6fc] font-medium'
                                : 'bg-[#090d13] border-[#21262d] text-[#8b949e] hover:border-[#30363d] hover:text-[#f0f6fc] font-normal'
                            }`}
                          >
                            <span className="text-sm">{fw.icon}</span>
                            <span className="text-[10.5px] truncate">{fw.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Build & Deployment Pipeline Configuration */}
                    <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 sm:p-3 flex flex-col gap-2.5">
                      <div className="text-xs font-medium text-[#f0f6fc] pb-1 border-b border-[#21262d] flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-[#1d6cf6]" />
                          <span>Build Pipeline & Directory</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9.5px] font-mono uppercase text-[#7d8590]">Project Name</label>
                          <input
                            type="text"
                            value={cfProjectName}
                            onChange={(e) => setCfProjectName(e.target.value)}
                            className="bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded px-2.5 py-1 font-mono text-xs text-[#f0f6fc]"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[9.5px] font-mono uppercase text-[#7d8590]">Production Branch</label>
                          <input
                            type="text"
                            value={cfProductionBranch}
                            onChange={(e) => setCfProductionBranch(e.target.value)}
                            className="bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded px-2.5 py-1 font-mono text-xs text-[#f0f6fc]"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[9.5px] font-mono uppercase text-[#7d8590]">Package Manager</label>
                          <select
                            value={cfPackageManager}
                            onChange={(e) => setCfPackageManager(e.target.value as any)}
                            className="bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded px-2.5 py-1 text-xs text-[#f0f6fc] font-mono cursor-pointer"
                          >
                            <option value="pnpm">pnpm (Fast lockfile v6)</option>
                            <option value="npm">npm (Standard Node)</option>
                            <option value="yarn">yarn (Classic / Berry)</option>
                            <option value="bun">bun (JS runtime)</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[9.5px] font-mono uppercase text-[#7d8590]">Build Command</label>
                          <input
                            type="text"
                            value={cfBuildCommand}
                            onChange={(e) => setCfBuildCommand(e.target.value)}
                            className="bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded px-2.5 py-1 font-mono text-xs text-[#f0f6fc]"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[9.5px] font-mono uppercase text-[#7d8590]">Build Output Directory</label>
                          <input
                            type="text"
                            value={cfOutputDir}
                            onChange={(e) => setCfOutputDir(e.target.value)}
                            className="bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded px-2.5 py-1 font-mono text-xs text-[#f0f6fc]"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[9.5px] font-mono uppercase text-[#7d8590]">Monorepo Root Directory</label>
                          <input
                            type="text"
                            value={cfRootDir}
                            onChange={(e) => setCfRootDir(e.target.value)}
                            className="bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded px-2.5 py-1 font-mono text-xs text-[#f0f6fc]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Runtime Compatibility & Flags */}
                    <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 sm:p-3 flex flex-col gap-2.5">
                      <div className="text-xs font-medium text-[#f0f6fc] pb-1 border-b border-[#21262d] flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-[#1d6cf6]" />
                          <span>Runtime Compatibility</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9.5px] font-mono uppercase text-[#7d8590]">Node.js Version</label>
                          <select
                            value={cfNodeVersion}
                            onChange={(e) => setCfNodeVersion(e.target.value)}
                            className="bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded px-2.5 py-1 text-xs text-[#f0f6fc] font-mono cursor-pointer"
                          >
                            <option value="20.18.0">Node.js 20.18.0 (LTS Iron)</option>
                            <option value="22.9.0">Node.js 22.9.0 (Current Jod)</option>
                            <option value="18.20.4">Node.js 18.20.4 (Maintenance)</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[9.5px] font-mono uppercase text-[#7d8590]">Compatibility Date</label>
                          <input
                            type="text"
                            value={cfCompatDate}
                            onChange={(e) => setCfCompatDate(e.target.value)}
                            className="bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded px-2.5 py-1 font-mono text-xs text-[#f0f6fc]"
                          />
                        </div>
                      </div>

                      {/* Compatibility Flags */}
                      <div className="flex flex-col gap-1 pt-1">
                        <label className="text-[9.5px] font-mono uppercase text-[#7d8590]">Compatibility Flags</label>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {cfCompatFlags.map((flag) => (
                            <span
                              key={flag}
                              className="px-2 py-0.5 rounded bg-[#090d13] border border-[#21262d] text-[#58a6ff] font-mono text-[10px] flex items-center gap-1"
                            >
                              <span>{flag}</span>
                              <button
                                type="button"
                                onClick={() => setCfCompatFlags((prev) => prev.filter((f) => f !== flag))}
                                className="text-[#8b949e] hover:text-[#f85149] cursor-pointer"
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
                            className="px-2 py-0.5 rounded bg-[#21262d] hover:bg-[#282e36] text-[#8b949e] hover:text-[#f0f6fc] border border-[#30363d] text-[10px] font-mono cursor-pointer transition-colors"
                          >
                            + Add Flag
                          </button>
                        </div>
                      </div>

                      {/* Branch Deployment Rules */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#21262d] text-xs">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9.5px] font-mono uppercase text-[#7d8590]">Branch Preview Deployments</label>
                          <select
                            value={cfBranchDeployments}
                            onChange={(e) => setCfBranchDeployments(e.target.value as any)}
                            className="bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded px-2.5 py-1 text-xs text-[#f0f6fc] font-mono cursor-pointer"
                          >
                            <option value="all">Automatically deploy all branches</option>
                            <option value="preview_only">Only deploy non-production branches</option>
                            <option value="none">Disable preview deployments</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded bg-[#090d13] border border-[#21262d] self-end">
                          <div className="flex flex-col">
                            <span className="font-medium text-xs text-[#f0f6fc]">Automatic PR Comments</span>
                            <span className="text-[10px] text-[#8b949e]">Post preview deployment URLs on PRs</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={cfAutomaticComments}
                            onChange={(e) => setCfAutomaticComments(e.target.checked)}
                            className="w-4 h-4 rounded bg-[#161b22] border-[#30363d] text-[#1d6cf6] focus:ring-0 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 
                  ============================================================
                  SECTION 2: FUNCTIONS & EDGE WORKER ROUTES
                  ============================================================
                */}
                {cfActiveSection === 'functions' && (
                  <div className="flex flex-col gap-2.5">
                    <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 sm:p-3 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between pb-1 border-b border-[#21262d]">
                        <div className="text-xs font-medium text-[#f0f6fc] flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-[#1d6cf6]" />
                          <span>Pages Functions & Middleware</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div className="flex items-center justify-between p-2 rounded bg-[#090d13] border border-[#21262d]">
                          <div className="flex flex-col">
                            <span className="font-medium text-[#f0f6fc]">Pages Functions</span>
                            <span className="text-[10px] text-[#8b949e]">Execute TypeScript / JS routes</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={cfFunctionsEnabled}
                            onChange={(e) => setCfFunctionsEnabled(e.target.checked)}
                            className="w-4 h-4 rounded bg-[#161b22] border-[#30363d] text-[#1d6cf6] focus:ring-0 cursor-pointer"
                          />
                        </div>

                        <div className="flex items-center justify-between p-2 rounded bg-[#090d13] border border-[#21262d]">
                          <div className="flex flex-col">
                            <span className="font-medium text-[#f0f6fc]">Smart Placement</span>
                            <span className="text-[10px] text-[#8b949e]">Route compute near backend DB</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={cfSmartPlacement}
                            onChange={(e) => setCfSmartPlacement(e.target.checked)}
                            className="w-4 h-4 rounded bg-[#161b22] border-[#30363d] text-[#1d6cf6] focus:ring-0 cursor-pointer"
                          />
                        </div>

                        <div className="flex items-center justify-between p-2 rounded bg-[#090d13] border border-[#21262d]">
                          <div className="flex flex-col">
                            <span className="font-medium text-[#f0f6fc]">Fail Open on Error</span>
                            <span className="text-[10px] text-[#8b949e]">Serve static cache if function fails</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={cfFailOpen}
                            onChange={(e) => setCfFailOpen(e.target.checked)}
                            className="w-4 h-4 rounded bg-[#161b22] border-[#30363d] text-[#1d6cf6] focus:ring-0 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Edge Worker Routes Table */}
                    <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 sm:p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between pb-1 border-b border-[#21262d]">
                        <div className="text-xs font-medium text-[#f0f6fc] flex items-center gap-1.5">
                          <Network className="w-3.5 h-3.5 text-[#58a6ff]" />
                          <span>Edge Worker Routes</span>
                        </div>
                      </div>

                      {/* Add Route Form */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 text-xs bg-[#090d13] p-1.5 rounded border border-[#21262d]">
                        <div className="sm:col-span-6 flex flex-col gap-0.5">
                          <input
                            type="text"
                            placeholder="Pattern glob (e.g. /api/*)"
                            value={newRoutePattern}
                            onChange={(e) => setNewRoutePattern(e.target.value)}
                            className="bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-[#f0f6fc] font-mono focus:border-[#1d6cf6] focus:outline-none"
                          />
                        </div>
                        <div className="sm:col-span-4 flex flex-col gap-0.5">
                          <input
                            type="text"
                            placeholder="Handler module (e.g. functions/api)"
                            value={newRouteHandler}
                            onChange={(e) => setNewRouteHandler(e.target.value)}
                            className="bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-[#f0f6fc] font-mono focus:border-[#1d6cf6] focus:outline-none"
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
                      <div className="border border-[#21262d] rounded overflow-hidden text-xs bg-[#090d13]">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-[#21262d] bg-[#05080d] text-[9.5px] font-mono uppercase text-[#7d8590]">
                              <th className="p-2">Pattern Glob</th>
                              <th className="p-2">Target Handler</th>
                              <th className="p-2">Latency</th>
                              <th className="p-2 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#21262d]">
                            {cfWorkerRoutes.map((route) => (
                              <tr key={route.id} className="hover:bg-[#161b22] transition-colors">
                                <td className="p-2 font-mono text-[#58a6ff]">{route.pattern}</td>
                                <td className="p-2 font-mono text-[#f0f6fc]">{route.handler}</td>
                                <td className="p-2 font-mono text-[10.5px] text-[#3fb950]">~0.4ms</td>
                                <td className="p-2 text-right">
                                  <IconButton
                                    size="sm"
                                    onClick={() => handleDeleteWorkerRoute(route.id)}
                                    aria-label="Delete worker route"
                                    icon={<Trash2 className="w-3.5 h-3.5 text-[#8b949e] hover:text-[#f85149]" />}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 
                  ============================================================
                  SECTION 3: SPEED, CACHING & PERFORMANCE
                  ============================================================
                */}
                {cfActiveSection === 'performance' && (
                  <div className="flex flex-col gap-2.5">
                    <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 sm:p-3 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between pb-1 border-b border-[#21262d]">
                        <div className="text-xs font-medium text-[#f0f6fc] flex items-center gap-1.5">
                          <Gauge className="w-3.5 h-3.5 text-[#1d6cf6]" />
                          <span>Speed & Caching</span>
                        </div>
                      </div>

                      {/* Performance Toggles Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                        <div className="flex items-center justify-between p-2 rounded bg-[#090d13] border border-[#21262d]">
                          <div className="flex flex-col">
                            <span className="font-medium text-[#f0f6fc]">Early Hints (103)</span>
                            <span className="text-[10px] text-[#8b949e]">Preload CSS & fonts</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={cfEarlyHints}
                            onChange={(e) => setCfEarlyHints(e.target.checked)}
                            className="w-4 h-4 rounded bg-[#161b22] border-[#30363d] text-[#1d6cf6] focus:ring-0 cursor-pointer"
                          />
                        </div>

                        <div className="flex items-center justify-between p-2 rounded bg-[#090d13] border border-[#21262d]">
                          <div className="flex flex-col">
                            <span className="font-medium text-[#f0f6fc]">Brotli Compression</span>
                            <span className="text-[10px] text-[#8b949e]">~20% smaller than Gzip</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={cfBrotli}
                            onChange={(e) => setCfBrotli(e.target.checked)}
                            className="w-4 h-4 rounded bg-[#161b22] border-[#30363d] text-[#1d6cf6] focus:ring-0 cursor-pointer"
                          />
                        </div>

                        <div className="flex items-center justify-between p-2 rounded bg-[#090d13] border border-[#21262d]">
                          <div className="flex flex-col">
                            <span className="font-medium text-[#f0f6fc]">HTTP/3 (QUIC)</span>
                            <span className="text-[10px] text-[#8b949e]">Zero-RTT UDP protocol</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={cfHttp3Quic}
                            onChange={(e) => setCfHttp3Quic(e.target.checked)}
                            className="w-4 h-4 rounded bg-[#161b22] border-[#30363d] text-[#1d6cf6] focus:ring-0 cursor-pointer"
                          />
                        </div>

                        <div className="flex items-center justify-between p-2 rounded bg-[#090d13] border border-[#21262d]">
                          <div className="flex flex-col">
                            <span className="font-medium text-[#f0f6fc]">Image Optimization</span>
                            <span className="text-[10px] text-[#8b949e]">Auto WebP conversion</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={cfImageOptimization}
                            onChange={(e) => setCfImageOptimization(e.target.checked)}
                            className="w-4 h-4 rounded bg-[#161b22] border-[#30363d] text-[#1d6cf6] focus:ring-0 cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Auto Minification Suite */}
                      <div className="bg-[#090d13] border border-[#21262d] rounded p-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#f0f6fc]">Auto Minify Assets:</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={cfAutoMinifyHtml}
                              onChange={(e) => setCfAutoMinifyHtml(e.target.checked)}
                              className="w-3.5 h-3.5 rounded bg-[#161b22] border-[#30363d] text-[#1d6cf6]"
                            />
                            <span className="font-mono text-[11px] text-[#f0f6fc]">HTML</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={cfAutoMinifyCss}
                              onChange={(e) => setCfAutoMinifyCss(e.target.checked)}
                              className="w-3.5 h-3.5 rounded bg-[#161b22] border-[#30363d] text-[#1d6cf6]"
                            />
                            <span className="font-mono text-[11px] text-[#f0f6fc]">CSS</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={cfAutoMinifyJs}
                              onChange={(e) => setCfAutoMinifyJs(e.target.checked)}
                              className="w-3.5 h-3.5 rounded bg-[#161b22] border-[#30363d] text-[#1d6cf6]"
                            />
                            <span className="font-mono text-[11px] text-[#f0f6fc]">JavaScript</span>
                          </label>
                        </div>
                      </div>

                      {/* TTL Settings */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9.5px] font-mono uppercase text-[#7d8590]">Edge Cache TTL</label>
                          <select
                            value={cfEdgeCacheTtl}
                            onChange={(e) => setCfEdgeCacheTtl(e.target.value)}
                            className="bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded px-2.5 py-1 text-xs text-[#f0f6fc] font-mono cursor-pointer"
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
                          <label className="text-[9.5px] font-mono uppercase text-[#7d8590]">Browser Cache TTL</label>
                          <select
                            value={cfBrowserCacheTtl}
                            onChange={(e) => setCfBrowserCacheTtl(e.target.value)}
                            className="bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded px-2.5 py-1 text-xs text-[#f0f6fc] font-mono cursor-pointer"
                          >
                            <option value="respect">Respect Existing Headers</option>
                            <option value="1h">1 Hour</option>
                            <option value="4h">4 Hours</option>
                            <option value="1d">1 Day</option>
                            <option value="1y">1 Year (Immutable)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 
                  ============================================================
                  SECTION 4: SSL/TLS, ENCRYPTION & SECURITY
                  ============================================================
                */}
                {cfActiveSection === 'security' && (
                  <div className="flex flex-col gap-2.5">
                    <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 sm:p-3 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between pb-1 border-b border-[#21262d]">
                        <div className="text-xs font-medium text-[#f0f6fc] flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#3fb950]" />
                          <span>SSL/TLS & Security</span>
                        </div>
                        <span className="text-[9.5px] font-mono text-[#3fb950]">TLS 1.3</span>
                      </div>

                      {/* SSL Encryption Mode */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[9.5px] font-mono uppercase text-[#7d8590]">SSL / TLS Mode</label>
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
                              className={`p-2 rounded border text-left flex flex-col gap-0.5 cursor-pointer transition-all ${
                                cfSslMode === mode.id
                                  ? 'bg-[#238636]/15 border-[#238636] text-[#f0f6fc]'
                                  : 'bg-[#090d13] border-[#21262d] text-[#8b949e] hover:border-[#30363d]'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-xs text-[#f0f6fc]">{mode.name}</span>
                                {cfSslMode === mode.id && <span className="text-[#3fb950]">●</span>}
                              </div>
                              <span className="text-[10px] text-[#8b949e]">{mode.desc}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Security Features */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs pt-1">
                        <div className="flex items-center justify-between p-2 rounded bg-[#090d13] border border-[#21262d]">
                          <div className="flex flex-col">
                            <span className="font-medium text-[#f0f6fc]">Always HTTPS</span>
                            <span className="text-[10px] text-[#8b949e]">Redirect HTTP to HTTPS</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={cfAlwaysHttps}
                            onChange={(e) => setCfAlwaysHttps(e.target.checked)}
                            className="w-4 h-4 rounded bg-[#161b22] border-[#30363d] text-[#1d6cf6] focus:ring-0 cursor-pointer"
                          />
                        </div>

                        <div className="flex items-center justify-between p-2 rounded bg-[#090d13] border border-[#21262d]">
                          <div className="flex flex-col">
                            <span className="font-medium text-[#f0f6fc]">WAF Shield</span>
                            <span className="text-[10px] text-[#8b949e]">OWASP rule protection</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={cfWafEnabled}
                            onChange={(e) => setCfWafEnabled(e.target.checked)}
                            className="w-4 h-4 rounded bg-[#161b22] border-[#30363d] text-[#1d6cf6] focus:ring-0 cursor-pointer"
                          />
                        </div>

                        <div className="flex items-center justify-between p-2 rounded bg-[#090d13] border border-[#21262d]">
                          <div className="flex flex-col">
                            <span className="font-medium text-[#f0f6fc]">Bot Fight Mode</span>
                            <span className="text-[10px] text-[#8b949e]">Block automated scrapers</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={cfBotFightMode}
                            onChange={(e) => setCfBotFightMode(e.target.checked)}
                            className="w-4 h-4 rounded bg-[#161b22] border-[#30363d] text-[#1d6cf6] focus:ring-0 cursor-pointer"
                          />
                        </div>

                        <div className="flex items-center justify-between p-2 rounded bg-[#090d13] border border-[#21262d]">
                          <div className="flex flex-col">
                            <span className="font-medium text-[#f0f6fc]">Zero Trust Auth</span>
                            <span className="text-[10px] text-[#8b949e]">Protect preview URLs</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={cfAccessPreviewAuth}
                            onChange={(e) => setCfAccessPreviewAuth(e.target.checked)}
                            className="w-4 h-4 rounded bg-[#161b22] border-[#30363d] text-[#1d6cf6] focus:ring-0 cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* HSTS Settings */}
                      <div className="bg-[#090d13] border border-[#21262d] rounded p-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div className="flex flex-col">
                          <span className="font-medium text-[#f0f6fc]">HTTP Strict Transport Security (HSTS)</span>
                          <span className="text-[10.5px] text-[#8b949e]">Enforces secure HTTPS connections on browser clients.</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={cfHstsEnabled}
                              onChange={(e) => setCfHstsEnabled(e.target.checked)}
                              className="w-3.5 h-3.5 rounded bg-[#161b22] border-[#30363d] text-[#1d6cf6]"
                            />
                            <span className="text-[11px] text-[#f0f6fc]">Enabled ({cfHstsMaxAge})</span>
                          </label>
                        </div>
                      </div>
                    </div>
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
                    <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 sm:p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between pb-1 border-b border-[#21262d]">
                        <div className="text-xs font-medium text-[#f0f6fc] flex items-center gap-1.5">
                          <Database className="w-3.5 h-3.5 text-[#1d6cf6]" />
                          <span>KV Namespaces</span>
                        </div>
                        <SecondaryButton
                          size="sm"
                          icon={<Plus className="w-3 h-3" />}
                          onClick={() => setIsAddKvModalOpen(true)}
                          className="text-[#58a6ff] hover:text-[#79c0ff]"
                        >
                          Add KV
                        </SecondaryButton>
                      </div>

                      <div className="border border-[#21262d] rounded overflow-hidden text-xs bg-[#090d13]">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-[#21262d] bg-[#05080d] text-[9.5px] font-mono uppercase text-[#7d8590]">
                              <th className="p-2">Variable</th>
                              <th className="p-2">Namespace ID</th>
                              <th className="p-2">Target</th>
                              <th className="p-2 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#21262d]">
                            {cfKvBindings.map((kv) => (
                              <tr key={kv.id} className="hover:bg-[#161b22] transition-colors">
                                <td className="p-2 font-mono text-[#58a6ff]">{kv.name}</td>
                                <td className="p-2 font-mono text-[#c9d1d9] truncate max-w-[200px]">{kv.namespaceId}</td>
                                <td className="p-2">
                                  <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-[#21262d] text-[#8b949e]">
                                    {kv.environment}
                                  </span>
                                </td>
                                <td className="p-2 text-right">
                                  <IconButton
                                    size="sm"
                                    icon={<Trash2 className="w-3.5 h-3.5" />}
                                    onClick={() => handleDeleteKvBinding(kv.id)}
                                    className="hover:text-[#f85149]"
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* D1 SQL Databases */}
                    <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 sm:p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between pb-1 border-b border-[#21262d]">
                        <div className="text-xs font-medium text-[#f0f6fc] flex items-center gap-1.5">
                          <HardDrive className="w-3.5 h-3.5 text-[#3fb950]" />
                          <span>D1 SQL Databases</span>
                        </div>
                        <SecondaryButton
                          size="sm"
                          icon={<Plus className="w-3 h-3" />}
                          onClick={() => setIsAddD1ModalOpen(true)}
                          className="text-[#3fb950] hover:text-[#56d364]"
                        >
                          Add D1
                        </SecondaryButton>
                      </div>

                      <div className="border border-[#21262d] rounded overflow-hidden text-xs bg-[#090d13]">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-[#21262d] bg-[#05080d] text-[9.5px] font-mono uppercase text-[#7d8590]">
                              <th className="p-2">Variable</th>
                              <th className="p-2">Database ID</th>
                              <th className="p-2">Target</th>
                              <th className="p-2 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#21262d]">
                            {cfD1Bindings.map((d1) => (
                              <tr key={d1.id} className="hover:bg-[#161b22] transition-colors">
                                <td className="p-2 font-mono text-[#3fb950]">{d1.name}</td>
                                <td className="p-2 font-mono text-[#c9d1d9] truncate max-w-[200px]">{d1.databaseId}</td>
                                <td className="p-2">
                                  <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-[#21262d] text-[#8b949e]">
                                    {d1.environment}
                                  </span>
                                </td>
                                <td className="p-2 text-right">
                                  <IconButton
                                    size="sm"
                                    icon={<Trash2 className="w-3.5 h-3.5" />}
                                    onClick={() => handleDeleteD1Binding(d1.id)}
                                    className="hover:text-[#f85149]"
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* R2 Storage Buckets */}
                    <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 sm:p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between pb-1 border-b border-[#21262d]">
                        <div className="text-xs font-medium text-[#f0f6fc] flex items-center gap-1.5">
                          <Boxes className="w-3.5 h-3.5 text-[#e3b341]" />
                          <span>R2 Storage Buckets</span>
                        </div>
                        <SecondaryButton
                          size="sm"
                          icon={<Plus className="w-3 h-3" />}
                          onClick={() => setIsAddR2ModalOpen(true)}
                          className="text-[#e3b341] hover:text-[#f2cc60]"
                        >
                          Add R2
                        </SecondaryButton>
                      </div>

                      <div className="border border-[#21262d] rounded overflow-hidden text-xs bg-[#090d13]">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-[#21262d] bg-[#05080d] text-[9.5px] font-mono uppercase text-[#7d8590]">
                              <th className="p-2">Variable</th>
                              <th className="p-2">Bucket Name</th>
                              <th className="p-2">Target</th>
                              <th className="p-2 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#21262d]">
                            {cfR2Bindings.map((r2) => (
                              <tr key={r2.id} className="hover:bg-[#161b22] transition-colors">
                                <td className="p-2 font-mono text-[#e3b341]">{r2.name}</td>
                                <td className="p-2 font-mono text-[#c9d1d9] truncate max-w-[200px]">{r2.bucketName}</td>
                                <td className="p-2">
                                  <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-[#21262d] text-[#8b949e]">
                                    {r2.environment}
                                  </span>
                                </td>
                                <td className="p-2 text-right">
                                  <IconButton
                                    size="sm"
                                    icon={<Trash2 className="w-3.5 h-3.5" />}
                                    onClick={() => handleDeleteR2Binding(r2.id)}
                                    className="hover:text-[#f85149]"
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Workers AI Binding */}
                    <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-[#8957e5]/10 border border-[#8957e5]/30 flex items-center justify-center text-[#a371f7]">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-[#f0f6fc]">Workers AI Binding (env.AI)</span>
                          <span className="text-[10px] text-[#8b949e]">Direct access to Llama 3 and Whisper at the Edge</span>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={cfAiBindingEnabled}
                        onChange={(e) => setCfAiBindingEnabled(e.target.checked)}
                        className="w-4 h-4 rounded bg-[#161b22] border-[#30363d] text-[#1d6cf6] focus:ring-0 cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* 
                  ============================================================
                  SECTION 6: DEPLOY HOOKS / CI/CD WEBHOOKS
                  ============================================================
                */}
                {cfActiveSection === 'webhooks' && (
                  <div className="flex flex-col gap-2.5">
                    <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 sm:p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between pb-1 border-b border-[#21262d]">
                        <div className="text-xs font-medium text-[#f0f6fc] flex items-center gap-1.5">
                          <Webhook className="w-3.5 h-3.5 text-[#1d6cf6]" />
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

                      <div className="border border-[#21262d] rounded overflow-hidden text-xs bg-[#090d13]">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-[#21262d] bg-[#05080d] text-[9.5px] font-mono uppercase text-[#7d8590]">
                              <th className="p-2">Name</th>
                              <th className="p-2">Branch</th>
                              <th className="p-2">Webhook URL</th>
                              <th className="p-2">Created</th>
                              <th className="p-2 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#21262d]">
                            {cfDeployHooks.map((hook) => (
                              <tr key={hook.id} className="hover:bg-[#161b22] transition-colors">
                                <td className="p-2 font-medium text-[#f0f6fc]">{hook.name}</td>
                                <td className="p-2 font-mono text-[#58a6ff]">{hook.branch}</td>
                                <td className="p-2 font-mono text-[#c9d1d9] truncate max-w-[220px]">
                                  <div className="flex items-center gap-1.5">
                                    <span className="truncate">{hook.url}</span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        copyToClipboard(hook.url);
                                        showToast('Copied webhook URL');
                                      }}
                                      className="p-1 text-[#8b949e] hover:text-[#f0f6fc] cursor-pointer"
                                    >
                                      <Copy className="w-3 h-3" />
                                    </button>
                                  </div>
                                </td>
                                <td className="p-2 text-[10px] text-[#7d8590]">{hook.createdAt}</td>
                                <td className="p-2 text-right">
                                  <IconButton
                                    size="sm"
                                    onClick={() => handleDeleteDeployHook(hook.id)}
                                    aria-label="Delete deploy hook"
                                    icon={<Trash2 className="w-3.5 h-3.5 text-[#8b949e] hover:text-[#f85149]" />}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 
                  ============================================================
                  SECTION 7: WRANGLER TOML / JSONC INSPECTOR
                  ============================================================
                */}
                {cfActiveSection === 'wrangler' && (
                  <div className="flex flex-col gap-2.5">
                    <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 sm:p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between pb-1 border-b border-[#21262d]">
                        <div className="text-xs font-medium text-[#f0f6fc] flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-[#58a6ff]" />
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

                      <pre className="bg-[#090d13] border border-[#21262d] rounded p-2.5 font-mono text-[10.5px] text-[#58a6ff] overflow-x-auto max-h-[350px]">
                        {generateWranglerToml()}
                      </pre>
                    </div>
                  </div>
                )}

                {/* 
                  ============================================================
                  SECTION 8: DANGER ZONE
                  ============================================================
                */}
                {cfActiveSection === 'danger' && (
                  <div className="flex flex-col gap-2.5">
                    <div className="bg-[#161b22] border border-[#da3633]/30 rounded p-3 flex flex-col gap-2">
                      <div className="flex items-center gap-2 pb-1 border-b border-[#da3633]/20">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#f85149]" />
                        <h3 className="text-xs font-medium text-[#f85149]">Danger Zone</h3>
                      </div>

                      <div className="flex flex-col divide-y divide-[#21262d] text-xs">
                        <div className="py-2 flex items-center justify-between gap-2">
                          <div className="flex flex-col">
                            <span className="font-medium text-[#f0f6fc]">Pause Deployments</span>
                            <span className="text-[10px] text-[#8b949e]">Stop building new commits pushed to GitHub.</span>
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
                            <span className="font-medium text-[#f85149]">Delete Project</span>
                            <span className="text-[10px] text-[#8b949e]">Permanently delete this project and custom domain bindings.</span>
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
