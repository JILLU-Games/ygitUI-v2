import React, { useState } from 'react';
import {
  Sparkles,
  Star,
  Layout,
  Globe,
  Database,
  SlidersHorizontal,
  ExternalLink,
  CheckCircle2,
  Check,
  Copy,
  Plus,
  Github,
} from 'lucide-react';
import { ReadyTemplate } from '../../types/template';
import { TemplateThumbnailGraphic } from '../templates/TemplateThumbnailGraphic';
import { ModalShell } from './ModalShell';
import { PrimaryButton, SecondaryButton } from '../buttons';

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
    <ModalShell
      isOpen={Boolean(template)}
      onClose={() => {
        onClose();
        setTemplateModalTab('overview');
      }}
      maxWidth="3xl"
      icon={<Sparkles className="w-3.5 h-3.5" />}
      title={
        <div className="flex items-center gap-1.5 text-xs truncate">
          <span className="text-fg-muted hidden sm:inline font-mono">Templates / {template.category} /</span>
          <span className="font-semibold text-fg-default truncate">{template.name}</span>
          <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded-none bg-canvas-inset text-accent-primary border border-border-subtle shrink-0">
            {template.frameworkBadge}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10.5px] font-mono text-[#e3b341] bg-canvas-default px-2 py-0.5 rounded-none border border-border-subtle ml-2">
            <Star className="w-3 h-3 fill-[#e3b341]" />
            <span>{template.stars} ({template.deploys})</span>
          </span>
        </div>
      }
    >
      <div className="flex flex-col h-full">
        {/* Segmented Navigation Tabs */}
        <div className="px-3.5 pt-2 pb-0 bg-canvas-default border-b border-border-subtle flex items-center gap-1 overflow-x-auto shrink-0">
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
                    className={`px-3 py-1.5 text-xs font-normal border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors rounded-none ${
                      isActive
                        ? 'border-accent-primary text-accent-primary font-medium bg-canvas-inset'
                        : 'border-transparent text-fg-muted hover:text-fg-default hover:bg-canvas-inset/50'
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
                  <div className="relative rounded-none overflow-hidden border border-border-subtle">
                    <TemplateThumbnailGraphic template={template} variant="hero" />
                    <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-2">
                      <a
                        href={template.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-canvas-default/90 hover:bg-canvas-default text-accent-primary border border-border-subtle px-2.5 py-1 rounded-none text-xs font-medium flex items-center gap-1.5 shadow-none cursor-pointer transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Open Live Preview</span>
                      </a>
                    </div>
                  </div>

                  {/* 4-Metric Quick Specs Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                    <div className="bg-canvas-inset border border-border-subtle rounded-none p-2 flex flex-col gap-0.5">
                      <span className="text-[9.5px] uppercase text-fg-muted">Framework & Runtime</span>
                      <span className="text-fg-default font-medium truncate">{template.framework}</span>
                    </div>
                    <div className="bg-canvas-inset border border-border-subtle rounded-none p-2 flex flex-col gap-0.5">
                      <span className="text-[9.5px] uppercase text-fg-muted">Average Compilation</span>
                      <span className="text-[#3fb950] font-medium">~{template.buildTime}</span>
                    </div>
                    <div className="bg-canvas-inset border border-border-subtle rounded-none p-2 flex flex-col gap-0.5">
                      <span className="text-[9.5px] uppercase text-fg-muted">Edge Cold Start</span>
                      <span className="text-accent-primary font-medium">0ms (Jamstack CDN)</span>
                    </div>
                    <div className="bg-canvas-inset border border-border-subtle rounded-none p-2 flex flex-col gap-0.5">
                      <span className="text-[9.5px] uppercase text-fg-muted">Target Platform</span>
                      <span className="text-fg-muted font-medium truncate">Cloudflare Pages</span>
                    </div>
                  </div>

                  {/* Architecture Prose */}
                  <div className="bg-canvas-inset border border-border-subtle rounded-none p-3 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-fg-muted tracking-wider">
                        Production Architecture
                      </span>
                      <span className="text-[10.5px] text-fg-muted font-mono">
                        Author: <span className="text-fg-default font-medium">{template.author}</span>
                      </span>
                    </div>
                    <p className="text-[12px] text-fg-default leading-relaxed">
                      {template.description}
                    </p>
                  </div>

                  {/* Lighthouse Audit Performance Metrics */}
                  <div className="bg-canvas-inset border border-border-subtle rounded-none p-2.5 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase text-fg-muted tracking-wider">
                      <span>Lighthouse Performance Verification</span>
                      <span className="text-[#3fb950] font-normal">100/100 Target Verified</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                      <div className="bg-canvas-default border border-border-subtle rounded-none p-1.5 flex flex-col items-center">
                        <span className="text-base font-bold font-mono text-[#3fb950]">{template.lighthouse.perf}</span>
                        <span className="text-[9.5px] text-fg-muted">Performance</span>
                      </div>
                      <div className="bg-canvas-default border border-border-subtle rounded-none p-1.5 flex flex-col items-center">
                        <span className="text-base font-bold font-mono text-[#3fb950]">{template.lighthouse.acc}</span>
                        <span className="text-[9.5px] text-fg-muted">Accessibility</span>
                      </div>
                      <div className="bg-canvas-default border border-border-subtle rounded-none p-1.5 flex flex-col items-center">
                        <span className="text-base font-bold font-mono text-[#3fb950]">{template.lighthouse.best}</span>
                        <span className="text-[9.5px] text-fg-muted">Best Practices</span>
                      </div>
                      <div className="bg-canvas-default border border-border-subtle rounded-none p-1.5 flex flex-col items-center">
                        <span className="text-base font-bold font-mono text-[#3fb950]">{template.lighthouse.seo}</span>
                        <span className="text-[9.5px] text-fg-muted">SEO</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {template.highlights.map((high, idx) => (
                      <div key={idx} className="bg-canvas-inset border border-border-subtle rounded-none p-2.5 flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-fg-default">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950] shrink-0" />
                          <span>{high.title}</span>
                        </div>
                        <p className="text-[10.5px] text-fg-muted leading-relaxed">{high.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= TAB 2: LIVE ROUTES & PAGES ================= */}
              {templateModalTab === 'routes' && (
                <div className="flex flex-col gap-2.5 animate-in fade-in duration-100">
                  <div className="bg-canvas-inset border border-border-subtle rounded-none p-2.5 flex items-center justify-between text-xs text-fg-muted">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-accent-primary" />
                      <span className="text-fg-default font-medium">Included Routes & Application Pages</span>
                    </div>
                    <span className="font-mono text-[10.5px] text-fg-muted">
                      {template.routesDetailed.length} Verified Endpoints
                    </span>
                  </div>

                  <div className="bg-canvas-inset border border-border-subtle rounded-none overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-canvas-default border-b border-border-subtle text-fg-muted font-mono text-[10px] uppercase">
                        <tr>
                          <th className="py-2 px-3">Route Path</th>
                          <th className="py-2 px-3">Page Name</th>
                          <th className="py-2 px-3">Strategy</th>
                          <th className="py-2 px-3">Purpose & Features</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-subtle">
                        {template.routesDetailed.map((route, i) => (
                          <tr key={i} className="hover:bg-canvas-default/50 transition-colors">
                            <td className="py-2 px-3 font-mono text-accent-primary whitespace-nowrap">
                              {route.path}
                            </td>
                            <td className="py-2 px-3 font-medium text-fg-default whitespace-nowrap">
                              {route.name}
                            </td>
                            <td className="py-2 px-3 whitespace-nowrap">
                              <span className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded-none border ${
                                route.type === 'Edge SSR'
                                  ? 'bg-[#1d6cf6]/10 text-accent-primary border-accent-primary/30'
                                  : route.type === 'Static SSG'
                                  ? 'bg-[#238636]/10 text-[#3fb950] border-[#238636]/30'
                                  : route.type === 'Dynamic API'
                                  ? 'bg-[#a371f7]/10 text-[#d8b4fe] border-[#a371f7]/30'
                                  : 'bg-canvas-default text-fg-muted border-border-subtle'
                              }`}>
                                {route.type}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-fg-muted text-[11px] leading-relaxed">
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
                  <div className="bg-canvas-inset border border-border-subtle rounded-none p-3 flex flex-col gap-2">
                    <span className="text-[10px] font-mono uppercase text-fg-muted tracking-wider">
                      Edge Database & Storage Model
                    </span>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-7 h-7 rounded-none bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary shrink-0">
                        <Database className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-mono text-xs font-semibold text-fg-default">
                          {template.database}
                        </div>
                        <div className="text-[11px] text-fg-muted">
                          Auto-provisioned with Cloudflare Pages zero-egress SQLite / KV runtime binding.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Core Dependencies & Stack Chips */}
                  <div className="bg-canvas-inset border border-border-subtle rounded-none p-3 flex flex-col gap-2">
                    <span className="text-[10px] font-mono uppercase text-fg-muted tracking-wider">
                      Core Frameworks & Dependencies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {template.stack.map((item) => (
                        <div
                          key={item}
                          className="bg-canvas-default border border-border-subtle px-2.5 py-1 rounded-none text-xs font-mono text-accent-primary flex items-center gap-1.5"
                        >
                          <Check className="w-3 h-3 text-[#3fb950]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Git Repository Source */}
                  <div className="bg-canvas-inset border border-border-subtle rounded-none p-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-none bg-canvas-default border border-border-subtle flex items-center justify-center text-fg-default shrink-0">
                        <Github className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono font-medium text-fg-default">{template.repo}</div>
                        <div className="text-[10.5px] text-fg-muted">Public open-source starter repository (branch: main)</div>
                      </div>
                    </div>

                    <a
                      href={`https://github.com/${template.repo}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-canvas-default hover:bg-canvas-inset text-fg-default border border-border-subtle px-2.5 py-1 rounded-none text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
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
                  <div className="bg-canvas-inset border border-border-subtle rounded-none p-3 flex flex-col gap-2 font-mono text-xs">
                    <span className="text-[10px] uppercase text-fg-muted tracking-wider">
                      Cloudflare Pages Build Specification
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="bg-canvas-default border border-border-subtle rounded-none p-2 flex items-center justify-between">
                        <div>
                          <div className="text-[9.5px] text-fg-muted uppercase">Build Command</div>
                          <div className="text-[#3fb950] font-semibold">{template.buildCommand}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(template.buildCommand);
                            showToast('Build command copied to clipboard');
                          }}
                          className="p-1 text-fg-muted hover:text-fg-default hover:bg-canvas-inset rounded-none cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="bg-canvas-default border border-border-subtle rounded-none p-2 flex items-center justify-between">
                        <div>
                          <div className="text-[9.5px] text-fg-muted uppercase">Output Directory</div>
                          <div className="text-accent-primary font-semibold">{template.outputDir}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(template.outputDir);
                            showToast('Output directory copied to clipboard');
                          }}
                          className="p-1 text-fg-muted hover:text-fg-default hover:bg-canvas-inset rounded-none cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Environment Variables Table */}
                  <div className="bg-canvas-inset border border-border-subtle rounded-none overflow-hidden">
                    <div className="px-3 py-2 bg-canvas-default border-b border-border-subtle flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] uppercase text-fg-muted tracking-wider">
                        Required & Optional Environment Variables
                      </span>
                      <span className="text-[10px] font-mono text-fg-muted">
                        {template.envVars.length} Variables Defined
                      </span>
                    </div>

                    <table className="w-full text-left text-xs">
                      <thead className="bg-canvas-default border-b border-border-subtle text-fg-muted font-mono text-[9.5px] uppercase">
                        <tr>
                          <th className="py-1.5 px-3">Variable Key</th>
                          <th className="py-1.5 px-3">Example Value</th>
                          <th className="py-1.5 px-3">Description</th>
                          <th className="py-1.5 px-3 text-right">Requirement</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-subtle">
                        {template.envVars.map((env) => (
                          <tr key={env.key} className="hover:bg-canvas-default/50 transition-colors">
                            <td className="py-2 px-3 font-mono text-accent-primary whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <span>{env.key}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(env.key);
                                    setCopiedEnvKey(env.key);
                                    setTimeout(() => setCopiedEnvKey(null), 1500);
                                  }}
                                  className="text-fg-muted hover:text-fg-default"
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
                            <td className="py-2 px-3 font-mono text-fg-muted text-[11px] truncate max-w-[150px]">
                              {env.example}
                            </td>
                            <td className="py-2 px-3 text-fg-default text-[11px]">
                              {env.desc}
                            </td>
                            <td className="py-2 px-3 text-right whitespace-nowrap">
                              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-none border ${
                                env.required
                                  ? 'bg-[#da3633]/15 text-[#f85149] border-[#da3633]/30'
                                  : 'bg-canvas-default text-fg-muted border-border-subtle'
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
            <div className="px-3.5 py-2.5 border-t border-border-subtle bg-canvas-default flex items-center justify-between gap-2 shrink-0">
              <a
                href={template.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-canvas-default hover:bg-canvas-inset text-fg-default border border-border-subtle px-3 py-1.5 rounded-none text-xs font-normal flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-accent-primary" />
                <span>Live Demo</span>
              </a>

              <div className="flex items-center gap-2">
                <SecondaryButton
                  size="sm"
                  onClick={() => {
                    onClose();
                    setTemplateModalTab('overview');
                  }}
                >
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  size="sm"
                  onClick={() => onUseTemplate(template)}
                  disabled={isDeploying}
                  isLoading={isDeploying}
                  loadingText="Cloning Template..."
                  icon={<Plus className="w-3.5 h-3.5" />}
                >
                  Use This Template
                </PrimaryButton>
              </div>
            </div>
          </div>
        </ModalShell>
  );
};

export default TemplateModal;
