import React, { useState } from 'react';
import {
  Sparkles,
  Star,
  X,
  Layout,
  Globe,
  Database,
  SlidersHorizontal,
  ExternalLink,
  CheckCircle2,
  Check,
  Cpu,
  Layers,
  Terminal,
  Code2,
  Copy,
  Plus,
  RefreshCw,
  Github,
} from 'lucide-react';
import { ReadyTemplate } from '../../types/template';
import { TemplateThumbnailGraphic } from '../templates/TemplateThumbnailGraphic';

export interface TemplateModalProps {
  template: ReadyTemplate | null;
  onClose: () => void;
  onUseTemplate: (template: ReadyTemplate) => void;
  isDeploying?: boolean;
  onToast?: (message: string) => void;
}

export const TemplateModal: React.FC<TemplateModalProps> = ({
  template,
  onClose,
  onUseTemplate,
  isDeploying = false,
  onToast,
}) => {
  const [templateModalTab, setTemplateModalTab] = useState<'overview' | 'routes' | 'stack' | 'config'>('overview');
  const [copiedEnvKey, setCopiedEnvKey] = useState<string | null>(null);

  const showToast = (message: string) => {
    if (onToast) {
      onToast(message);
    }
  };

  if (!template) return null;

  return (

        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-3xl w-full flex flex-col overflow-hidden shadow-2xl max-h-[92vh]">
            {/* 1. Modal Header (Clean Breadcrumb & Badges) */}
            <div className="px-3.5 py-2.5 border-b border-[#21262d] flex items-center justify-between bg-[#090d13] shrink-0">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-6 h-6 rounded bg-[#1d6cf6]/10 border border-[#1d6cf6]/20 text-[#58a6ff] flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-1.5 text-xs truncate">
                  <span className="text-[#7d8590] hidden sm:inline font-mono">Templates / {template.category} /</span>
                  <span className="font-semibold text-[#f0f6fc] truncate">{template.name}</span>
                  <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-[#21262d] text-[#58a6ff] border border-[#30363d] shrink-0">
                    {template.frameworkBadge}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:flex items-center gap-1 text-[10.5px] font-mono text-[#e3b341] bg-[#090d13] px-2 py-0.5 rounded border border-[#21262d]">
                  <Star className="w-3 h-3 fill-[#e3b341]" />
                  <span>{template.stars} ({template.deploys})</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setTemplateModalTab('overview');
                  }}
                  className="text-[#8b949e] hover:text-[#f0f6fc] p-1 rounded hover:bg-[#21262d] cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. Modal Segmented Navigation Tabs */}
            <div className="px-3.5 pt-2 pb-0 bg-[#090d13] border-b border-[#21262d] flex items-center gap-1 overflow-x-auto shrink-0">
              {[
                { id: 'overview', label: 'Overview & Highlights', icon: Layout },
                { id: 'routes', label: `Live Routes (${template.routesDetailed.length})`, icon: Globe },
                { id: 'stack', label: 'Tech Stack & Storage', icon: Database },
                { id: 'config', label: 'Deploy Config & Env', icon: SlidersHorizontal },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = templateModalTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setTemplateModalTab(tab.id as any)}
                    className={`px-3 py-1.5 text-xs font-normal border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors ${
                      isActive
                        ? 'border-[#1d6cf6] text-[#58a6ff] font-medium bg-[#161b22]/50 rounded-t'
                        : 'border-transparent text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#161b22]/30 rounded-t'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* 3. Modal Body Content */}
            <div className="p-3.5 flex-1 overflow-y-auto text-xs flex flex-col gap-3">
              {/* ================= TAB 1: OVERVIEW & HIGHLIGHTS ================= */}
              {templateModalTab === 'overview' && (
                <div className="flex flex-col gap-3 animate-in fade-in duration-100">
                  {/* Hero Graphic Preview with Live Demo Action */}
                  <div className="relative rounded-lg overflow-hidden border border-[#21262d]">
                    <TemplateThumbnailGraphic template={template} variant="hero" />
                    <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-2">
                      <a
                        href={template.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#090d13]/90 hover:bg-[#090d13] text-[#58a6ff] border border-[#1d6cf6]/40 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Open Live Preview</span>
                      </a>
                    </div>
                  </div>

                  {/* 4-Metric Quick Specs Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                    <div className="bg-[#090d13] border border-[#21262d] rounded-md p-2 flex flex-col gap-0.5">
                      <span className="text-[9.5px] uppercase text-[#7d8590]">Framework & Runtime</span>
                      <span className="text-[#f0f6fc] font-medium truncate">{template.framework}</span>
                    </div>
                    <div className="bg-[#090d13] border border-[#21262d] rounded-md p-2 flex flex-col gap-0.5">
                      <span className="text-[9.5px] uppercase text-[#7d8590]">Average Compilation</span>
                      <span className="text-[#3fb950] font-medium">~{template.buildTime}</span>
                    </div>
                    <div className="bg-[#090d13] border border-[#21262d] rounded-md p-2 flex flex-col gap-0.5">
                      <span className="text-[9.5px] uppercase text-[#7d8590]">Edge Cold Start</span>
                      <span className="text-[#58a6ff] font-medium">0ms (Jamstack CDN)</span>
                    </div>
                    <div className="bg-[#090d13] border border-[#21262d] rounded-md p-2 flex flex-col gap-0.5">
                      <span className="text-[9.5px] uppercase text-[#7d8590]">Target Platform</span>
                      <span className="text-[#c9d1d9] font-medium truncate">Cloudflare Pages</span>
                    </div>
                  </div>

                  {/* Architecture Prose */}
                  <div className="bg-[#090d13] border border-[#21262d] rounded-md p-3 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-[#7d8590] tracking-wider">
                        Production Architecture
                      </span>
                      <span className="text-[10.5px] text-[#7d8590] font-mono">
                        Author: <span className="text-[#f0f6fc] font-medium">{template.author}</span>
                      </span>
                    </div>
                    <p className="text-[12px] text-[#c9d1d9] leading-relaxed">
                      {template.description}
                    </p>
                  </div>

                  {/* Lighthouse Audit Performance Metrics */}
                  <div className="bg-[#090d13] border border-[#21262d] rounded-md p-2.5 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#7d8590] tracking-wider">
                      <span>Lighthouse Performance Verification</span>
                      <span className="text-[#3fb950] font-normal">100/100 Target Verified</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                      <div className="bg-[#161b22] border border-[#21262d] rounded p-1.5 flex flex-col items-center">
                        <span className="text-base font-bold font-mono text-[#3fb950]">{template.lighthouse.perf}</span>
                        <span className="text-[9.5px] text-[#8b949e]">Performance</span>
                      </div>
                      <div className="bg-[#161b22] border border-[#21262d] rounded p-1.5 flex flex-col items-center">
                        <span className="text-base font-bold font-mono text-[#3fb950]">{template.lighthouse.acc}</span>
                        <span className="text-[9.5px] text-[#8b949e]">Accessibility</span>
                      </div>
                      <div className="bg-[#161b22] border border-[#21262d] rounded p-1.5 flex flex-col items-center">
                        <span className="text-base font-bold font-mono text-[#3fb950]">{template.lighthouse.best}</span>
                        <span className="text-[9.5px] text-[#8b949e]">Best Practices</span>
                      </div>
                      <div className="bg-[#161b22] border border-[#21262d] rounded p-1.5 flex flex-col items-center">
                        <span className="text-base font-bold font-mono text-[#3fb950]">{template.lighthouse.seo}</span>
                        <span className="text-[9.5px] text-[#8b949e]">SEO</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {template.highlights.map((high, idx) => (
                      <div key={idx} className="bg-[#090d13] border border-[#21262d] rounded-md p-2.5 flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#f0f6fc]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950] shrink-0" />
                          <span>{high.title}</span>
                        </div>
                        <p className="text-[10.5px] text-[#8b949e] leading-relaxed">{high.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= TAB 2: LIVE ROUTES & PAGES ================= */}
              {templateModalTab === 'routes' && (
                <div className="flex flex-col gap-2.5 animate-in fade-in duration-100">
                  <div className="bg-[#090d13] border border-[#21262d] rounded-md p-2.5 flex items-center justify-between text-xs text-[#8b949e]">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#58a6ff]" />
                      <span className="text-[#f0f6fc] font-medium">Included Routes & Application Pages</span>
                    </div>
                    <span className="font-mono text-[10.5px] text-[#7d8590]">
                      {template.routesDetailed.length} Verified Endpoints
                    </span>
                  </div>

                  <div className="bg-[#090d13] border border-[#21262d] rounded-md overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#161b22] border-b border-[#21262d] text-[#8b949e] font-mono text-[10px] uppercase">
                        <tr>
                          <th className="py-2 px-3">Route Path</th>
                          <th className="py-2 px-3">Page Name</th>
                          <th className="py-2 px-3">Strategy</th>
                          <th className="py-2 px-3">Purpose & Features</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#21262d]">
                        {template.routesDetailed.map((route, i) => (
                          <tr key={i} className="hover:bg-[#161b22]/50 transition-colors">
                            <td className="py-2 px-3 font-mono text-[#58a6ff] whitespace-nowrap">
                              {route.path}
                            </td>
                            <td className="py-2 px-3 font-medium text-[#f0f6fc] whitespace-nowrap">
                              {route.name}
                            </td>
                            <td className="py-2 px-3 whitespace-nowrap">
                              <span className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded border ${
                                route.type === 'Edge SSR'
                                  ? 'bg-[#1d6cf6]/10 text-[#58a6ff] border-[#1d6cf6]/30'
                                  : route.type === 'Static SSG'
                                  ? 'bg-[#238636]/10 text-[#3fb950] border-[#238636]/30'
                                  : route.type === 'Dynamic API'
                                  ? 'bg-[#a371f7]/10 text-[#d8b4fe] border-[#a371f7]/30'
                                  : 'bg-[#21262d] text-[#8b949e] border-[#30363d]'
                              }`}>
                                {route.type}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-[#8b949e] text-[11px] leading-relaxed">
                              {route.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ================= TAB 3: TECH STACK & STORAGE ================= */}
              {templateModalTab === 'stack' && (
                <div className="flex flex-col gap-3 animate-in fade-in duration-100">
                  {/* Database & Edge Storage Binding */}
                  <div className="bg-[#090d13] border border-[#21262d] rounded-md p-3 flex flex-col gap-2">
                    <span className="text-[10px] font-mono uppercase text-[#7d8590] tracking-wider">
                      Edge Database & Storage Model
                    </span>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-7 h-7 rounded bg-[#1d6cf6]/10 border border-[#1d6cf6]/20 flex items-center justify-center text-[#58a6ff] shrink-0">
                        <Database className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-mono text-xs font-semibold text-[#f0f6fc]">
                          {template.database}
                        </div>
                        <div className="text-[11px] text-[#8b949e]">
                          Auto-provisioned with Cloudflare Pages zero-egress SQLite / KV runtime binding.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Core Dependencies & Stack Chips */}
                  <div className="bg-[#090d13] border border-[#21262d] rounded-md p-3 flex flex-col gap-2">
                    <span className="text-[10px] font-mono uppercase text-[#7d8590] tracking-wider">
                      Core Frameworks & Dependencies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {template.stack.map((item) => (
                        <div
                          key={item}
                          className="bg-[#161b22] border border-[#30363d] px-2.5 py-1 rounded text-xs font-mono text-[#58a6ff] flex items-center gap-1.5"
                        >
                          <Check className="w-3 h-3 text-[#3fb950]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Git Repository Source */}
                  <div className="bg-[#090d13] border border-[#21262d] rounded-md p-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded bg-[#161b22] border border-[#30363d] flex items-center justify-center text-white shrink-0">
                        <Github className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono font-medium text-[#f0f6fc]">{template.repo}</div>
                        <div className="text-[10.5px] text-[#7d8590]">Public open-source starter repository (branch: main)</div>
                      </div>
                    </div>

                    <a
                      href={`https://github.com/${template.repo}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#21262d] hover:bg-[#282e36] text-[#c9d1d9] hover:text-[#f0f6fc] border border-[#30363d] px-2.5 py-1 rounded text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View GitHub</span>
                    </a>
                  </div>
                </div>
              )}

              {/* ================= TAB 4: DEPLOY CONFIG & ENV ================= */}
              {templateModalTab === 'config' && (
                <div className="flex flex-col gap-3 animate-in fade-in duration-100">
                  {/* Build & Output Configuration */}
                  <div className="bg-[#090d13] border border-[#21262d] rounded-md p-3 flex flex-col gap-2 font-mono text-xs">
                    <span className="text-[10px] uppercase text-[#7d8590] tracking-wider">
                      Cloudflare Pages Build Specification
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="bg-[#161b22] border border-[#21262d] rounded p-2 flex items-center justify-between">
                        <div>
                          <div className="text-[9.5px] text-[#7d8590] uppercase">Build Command</div>
                          <div className="text-[#3fb950] font-semibold">{template.buildCommand}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(template.buildCommand);
                            showToast('Build command copied to clipboard');
                          }}
                          className="p-1 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] rounded cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="bg-[#161b22] border border-[#21262d] rounded p-2 flex items-center justify-between">
                        <div>
                          <div className="text-[9.5px] text-[#7d8590] uppercase">Output Directory</div>
                          <div className="text-[#58a6ff] font-semibold">{template.outputDir}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(template.outputDir);
                            showToast('Output directory copied to clipboard');
                          }}
                          className="p-1 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] rounded cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Environment Variables Table */}
                  <div className="bg-[#090d13] border border-[#21262d] rounded-md overflow-hidden">
                    <div className="px-3 py-2 bg-[#161b22] border-b border-[#21262d] flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] uppercase text-[#7d8590] tracking-wider">
                        Required & Optional Environment Variables
                      </span>
                      <span className="text-[10px] font-mono text-[#8b949e]">
                        {template.envVars.length} Variables Defined
                      </span>
                    </div>

                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#0e131a] border-b border-[#21262d] text-[#8b949e] font-mono text-[9.5px] uppercase">
                        <tr>
                          <th className="py-1.5 px-3">Variable Key</th>
                          <th className="py-1.5 px-3">Example Value</th>
                          <th className="py-1.5 px-3">Description</th>
                          <th className="py-1.5 px-3 text-right">Requirement</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#21262d]">
                        {template.envVars.map((env) => (
                          <tr key={env.key} className="hover:bg-[#161b22]/50 transition-colors">
                            <td className="py-2 px-3 font-mono text-[#58a6ff] whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <span>{env.key}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(env.key);
                                    setCopiedEnvKey(env.key);
                                    setTimeout(() => setCopiedEnvKey(null), 1500);
                                  }}
                                  className="text-[#7d8590] hover:text-[#f0f6fc]"
                                  title="Copy Variable Name"
                                >
                                  {copiedEnvKey === env.key ? (
                                    <Check className="w-3 h-3 text-[#3fb950]" />
                                  ) : (
                                    <Copy className="w-2.5 h-2.5" />
                                  )}
                                </button>
                              </div>
                            </td>
                            <td className="py-2 px-3 font-mono text-[#8b949e] text-[11px] truncate max-w-[150px]">
                              {env.example}
                            </td>
                            <td className="py-2 px-3 text-[#c9d1d9] text-[11px]">
                              {env.desc}
                            </td>
                            <td className="py-2 px-3 text-right whitespace-nowrap">
                              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                                env.required
                                  ? 'bg-[#da3633]/15 text-[#f85149] border-[#da3633]/30'
                                  : 'bg-[#21262d] text-[#8b949e] border-[#30363d]'
                              }`}>
                                {env.required ? 'Required' : 'Optional'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Modal Action Footer */}
            <div className="px-3.5 py-2.5 border-t border-[#21262d] bg-[#090d13] flex items-center justify-between gap-2 shrink-0">
              <a
                href={template.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-[#21262d] hover:bg-[#282e36] text-[#c9d1d9] hover:text-[#f0f6fc] border border-[#30363d] px-3 py-1.5 rounded text-xs font-normal flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#58a6ff]" />
                <span>Live Demo</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setTemplateModalTab('overview');
                  }}
                  className="bg-[#21262d] hover:bg-[#282e36] text-[#8b949e] hover:text-[#f0f6fc] px-3 py-1.5 rounded text-xs font-normal cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => onUseTemplate(template)}
                  disabled={isDeploying}
                  className="bg-[#1d6cf6] hover:bg-[#2f7af8] disabled:bg-[#1d6cf6]/50 text-white px-3.5 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                >
                  {isDeploying ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Cloning Template...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Use This Template</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      
  );
};

export default TemplateModal;
