/**
 * ============================================================================
 * YGIT PLATFORM UI — STANDALONE MAIN VIEW: READY TEMPLATES
 * FILE: src/features/templates/TemplatesView.tsx
 * ============================================================================
 * 
 * PURPOSE:
 * Curated marketplace of production-grade ready website themes and full-stack
 * starters (Shopify / Wix Theme Store style) for rapid 1-click deployment to
 * Cloudflare Pages edge network.
 * 
 * ARCHITECTURE & LIFECYCLE:
 * 1. Top Header Summary Strip:
 *    - Starters count (`8 Production Starters`).
 *    - Deployment target indicator (`Cloudflare Pages Edge & Jamstack`).
 * 2. Search & Category Filter Toolbar:
 *    - Search input filtering name, bio, description, stack, and features.
 *    - Framework filter selector (All Frameworks, Next.js 15, React + Vite 6, Astro 5).
 *    - Horizontal category filter pills with live marketplace count badges.
 * 3. Theme Cards Grid (1-4 columns responsive):
 *    - Dynamic CSS/SVG browser-framed theme thumbnail preview (TemplateThumbnailGraphic).
 *    - Theme title with "Free" marketplace pill.
 *    - Metadata strip (author, star rating, deploy count, framework tag).
 *    - Short bio & capability feature tags with remaining count pill.
 *    - Build time estimate (`~8.4s`).
 *    - Card Actions footer: Details (opens deep inspection modal), Live Demo link,
 *      and 1-Click "Use Template" action with spinning clone state.
 * 4. Empty Search State:
 *    - Helpful suggestion with 1-click "Reset Filters" action button.
 * 
 * DATA CONTRACT:
 * - templateSearch: string
 * - onTemplateSearchChange: (search: string) => void
 * - templateCategoryFilter: string
 * - onTemplateCategoryFilterChange: (category: any) => void
 * - templateFrameworkFilter: string
 * - onTemplateFrameworkFilterChange: (framework: any) => void
 * - onSelectTemplateForDetails: (template: ReadyTemplate) => void
 * - onUseTemplate: (template: ReadyTemplate) => void
 * - deployingTemplateId: string | null
 * ============================================================================
 */

import React from 'react';
import {
  Sparkles,
  Search,
  X,
  Star,
  Eye,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { ReadyTemplate } from '../../types';
import { READY_TEMPLATES } from '../../mocks';
import { TemplateThumbnailGraphic } from '../../components/templates/TemplateThumbnailGraphic';

export interface TemplatesViewProps {
  templateSearch: string;
  onTemplateSearchChange: (search: string) => void;
  templateCategoryFilter: 'All' | 'E-Commerce' | 'SaaS' | 'AI & Tooling' | 'Portfolio' | 'Blog' | 'Agency';
  onTemplateCategoryFilterChange: (cat: 'All' | 'E-Commerce' | 'SaaS' | 'AI & Tooling' | 'Portfolio' | 'Blog' | 'Agency') => void;
  templateFrameworkFilter: 'All' | 'Next.js' | 'React + Vite' | 'Astro';
  onTemplateFrameworkFilterChange: (fw: 'All' | 'Next.js' | 'React + Vite' | 'Astro') => void;
  onSelectTemplateForDetails: (template: ReadyTemplate) => void;
  onUseTemplate: (template: ReadyTemplate) => void;
  deployingTemplateId: string | null;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  templateSearch,
  onTemplateSearchChange,
  templateCategoryFilter,
  onTemplateCategoryFilterChange,
  templateFrameworkFilter,
  onTemplateFrameworkFilterChange,
  onSelectTemplateForDetails,
  onUseTemplate,
  deployingTemplateId,
}) => {
  // Filter logic
  const filteredTemplates = READY_TEMPLATES.filter((tmpl) => {
    const matchCat = templateCategoryFilter === 'All' || tmpl.category === templateCategoryFilter;
    const matchFw = templateFrameworkFilter === 'All' || tmpl.framework === templateFrameworkFilter;
    const q = templateSearch.toLowerCase();
    const matchQuery =
      !templateSearch ||
      tmpl.name.toLowerCase().includes(q) ||
      tmpl.shortBio.toLowerCase().includes(q) ||
      tmpl.description.toLowerCase().includes(q) ||
      tmpl.stack.some((s) => s.toLowerCase().includes(q)) ||
      tmpl.features.some((f) => f.toLowerCase().includes(q));
    return matchCat && matchFw && matchQuery;
  });

  return (
    <div className="p-3 sm:p-4 flex flex-col gap-3 max-w-[1600px] w-full mx-auto animate-in fade-in duration-150">
      {/* 
        ========================================================================
        1. TOP HEADER SUMMARY STRIP
        ========================================================================
      */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-2.5 sm:p-3 flex items-center justify-between gap-2 shadow-sm flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#1d6cf6]/10 border border-[#1d6cf6]/20 text-[#58a6ff] flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-xs font-medium text-[#f0f6fc]">
            Ready Website Templates
          </h2>
          <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-[#090d13] border border-[#21262d] text-[#8b949e]">
            {READY_TEMPLATES.length} Production Starters
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[#7d8590]">
          <span className="hidden sm:inline">Deployment Target:</span>
          <span className="text-[#3fb950] font-normal flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]"></span>
            Cloudflare Pages Edge & Jamstack
          </span>
        </div>
      </div>

      {/* 
        ========================================================================
        2. SEARCH & CATEGORY FILTER TOOLBAR
        ========================================================================
      */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-2.5 sm:p-3 flex flex-col gap-2.5 shadow-sm">
        {/* Top Row: Search & Framework Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
          {/* Search input */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="w-3.5 h-3.5 text-[#7d8590] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search templates by name, feature, stack..."
              value={templateSearch}
              onChange={(e) => onTemplateSearchChange(e.target.value)}
              className="w-full bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded-md px-2.5 pl-8 py-1.5 text-xs text-[#f0f6fc] font-mono placeholder:text-[#484f58] transition-colors"
            />
            {templateSearch && (
              <button
                type="button"
                onClick={() => onTemplateSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7d8590] hover:text-[#f0f6fc] cursor-pointer"
                title="Clear Search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Framework Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[10.5px] text-[#7d8590] shrink-0">Framework:</span>
            <select
              value={templateFrameworkFilter}
              onChange={(e) => onTemplateFrameworkFilterChange(e.target.value as any)}
              className="bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded-md px-2.5 py-1.5 text-xs text-[#f0f6fc] cursor-pointer transition-colors"
            >
              <option value="All">All Frameworks</option>
              <option value="Next.js">Next.js 15</option>
              <option value="React + Vite">React + Vite 6</option>
              <option value="Astro">Astro 5</option>
            </select>
          </div>
        </div>

        {/* Bottom Row: Category Pills with Marketplace Counts */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 pt-1 border-t border-[#21262d]">
          {(['All', 'E-Commerce', 'SaaS', 'AI & Tooling', 'Portfolio', 'Blog', 'Agency'] as const).map((cat) => {
            const count =
              cat === 'All'
                ? READY_TEMPLATES.length
                : READY_TEMPLATES.filter((t) => t.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onTemplateCategoryFilterChange(cat)}
                className={`px-2.5 py-1 rounded text-[11px] font-normal cursor-pointer transition-colors shrink-0 flex items-center gap-1.5 ${
                  templateCategoryFilter === cat
                    ? 'bg-[#1d6cf6] text-white font-medium shadow-sm'
                    : 'bg-[#090d13] hover:bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] border border-[#21262d]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[9px] font-mono px-1 py-0.2 rounded ${
                    templateCategoryFilter === cat ? 'bg-white/20 text-white' : 'bg-[#161b22] text-[#7d8590]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 
        ========================================================================
        3. TEMPLATES CARD GRID
        ========================================================================
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filteredTemplates.map((tmpl) => (
          <div
            key={tmpl.id}
            className="bg-[#161b22] border border-[#21262d] hover:border-[#1d6cf6]/60 rounded-lg flex flex-col justify-between overflow-hidden group transition-all duration-200 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5"
          >
            <div className="flex flex-col">
              {/* BROWSER-FRAMED THEME THUMBNAIL (Wix / Shopify / WordPress Style) */}
              <div
                onClick={() => onSelectTemplateForDetails(tmpl)}
                className="cursor-pointer"
                title={`Click to view ${tmpl.name} details & live routes`}
              >
                <TemplateThumbnailGraphic
                  template={tmpl}
                  variant="card"
                  onInspect={() => onSelectTemplateForDetails(tmpl)}
                />
              </div>

              {/* THEME CARD BODY */}
              <div className="p-3 sm:p-3.5 flex flex-col gap-2.5 flex-1">
                {/* Title & Free Marketplace Badge */}
                <div className="flex items-start justify-between gap-1.5">
                  <h3
                    onClick={() => onSelectTemplateForDetails(tmpl)}
                    className="text-[13px] font-semibold text-[#f0f6fc] group-hover:text-[#58a6ff] transition-colors line-clamp-1 cursor-pointer"
                    title={tmpl.name}
                  >
                    {tmpl.name}
                  </h3>
                  <span className="text-[9.5px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30 shrink-0">
                    Free
                  </span>
                </div>

                {/* Metadata Row: Author · Framework · Rating · Deploys */}
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

                {/* Short Description */}
                <p className="text-[11px] text-[#8b949e] line-clamp-2 leading-relaxed">
                  {tmpl.shortBio}
                </p>

                {/* Feature Tags & Compilation Speed Strip */}
                <div className="flex items-center justify-between gap-1 pt-1 border-t border-[#21262d]/60 flex-wrap">
                  <div className="flex flex-wrap gap-1">
                    {tmpl.features.slice(0, 2).map((feat) => (
                      <span
                        key={feat}
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#090d13] text-[#7d8590] border border-[#21262d]"
                      >
                        {feat}
                      </span>
                    ))}
                    {tmpl.features.length > 2 && (
                      <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-[#090d13] text-[#7d8590] border border-[#21262d]">
                        +{tmpl.features.length - 2}
                      </span>
                    )}
                  </div>
                  <span className="text-[9.5px] font-mono text-[#3fb950] flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]"></span>
                    <span>~{tmpl.buildTime}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* CARD ACTIONS FOOTER */}
            <div className="p-2.5 px-3 border-t border-[#21262d] bg-[#090d13]/70 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                {/* Quick View / Details Trigger */}
                <button
                  type="button"
                  onClick={() => onSelectTemplateForDetails(tmpl)}
                  className="bg-[#21262d] hover:bg-[#282e36] text-[#c9d1d9] hover:text-[#f0f6fc] border border-[#30363d] px-2.5 py-1.5 rounded text-xs font-normal flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs active:scale-95"
                >
                  <Eye className="w-3.5 h-3.5 text-[#58a6ff]" />
                  <span>Details</span>
                </button>

                {/* Live Demo Link */}
                <a
                  href={tmpl.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Open Live Demo Preview"
                  className="p-1.5 text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#21262d] rounded cursor-pointer transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Use Template Action Button */}
              <button
                type="button"
                onClick={() => onUseTemplate(tmpl)}
                disabled={deployingTemplateId === tmpl.id}
                className="bg-[#1d6cf6] hover:bg-[#2f7af8] disabled:bg-[#1d6cf6]/50 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-all shadow-sm active:scale-95"
              >
                {deployingTemplateId === tmpl.id ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span>Cloning...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3" />
                    <span>Use Template</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="col-span-full bg-[#161b22] border border-[#21262d] rounded-lg p-8 text-center text-[#8b949e] flex flex-col items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#7d8590]" />
            <div className="text-xs font-medium text-[#f0f6fc]">No ready templates found</div>
            <div className="text-[11px] text-[#7d8590]">Try adjusting search query or category filters.</div>
            <button
              type="button"
              onClick={() => {
                onTemplateSearchChange('');
                onTemplateCategoryFilterChange('All');
                onTemplateFrameworkFilterChange('All');
              }}
              className="mt-2 bg-[#21262d] hover:bg-[#282e36] text-[#f0f6fc] text-xs px-3 py-1 rounded cursor-pointer border border-[#30363d]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
