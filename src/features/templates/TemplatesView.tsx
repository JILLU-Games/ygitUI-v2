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
 * DESIGN CONSTITUTION:
 * - Component-only architecture: UI built exclusively with Card, Input, Select,
 *   FrameworkBadge, MetricPill, PrimaryButton, and SecondaryButton primitives.
 * - Zero border radius (`rounded-none`) and zero box shadow (`shadow-none`).
 * - Full Dark/Light dual-theme token coverage via semantic CSS variables.
 * - Monospace precision for technical identifiers (speed, stack tags, ratings).
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
} from 'lucide-react';
import { ReadyTemplate } from '../../types';
import { READY_TEMPLATES } from '../../mocks';
import { TemplateThumbnailGraphic } from '../../components/templates/TemplateThumbnailGraphic';
import { FrameworkBadge } from '../../components/badges/FrameworkBadge';
import { MetricPill } from '../../components/badges/MetricPill';
import { PrimaryButton, SecondaryButton } from '../../components/buttons';
import { Card, Input, Select } from '../../components/ui';

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
    <div className="p-3 sm:p-4 flex flex-col gap-3 max-w-[1600px] w-full mx-auto animate-in fade-in duration-100 font-sans">
      {/* 
        ========================================================================
        1. TOP HEADER SUMMARY STRIP
        ========================================================================
      */}
      <Card variant="default" className="p-2.5 sm:p-3 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-accent-primary/10 border border-accent-primary/20 text-accent-primary flex items-center justify-center shrink-0 rounded-none shadow-none">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-xs font-medium text-fg-default">
            Ready Website Templates
          </h2>
          <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded-none bg-canvas-inset border border-border-subtle text-fg-muted">
            {READY_TEMPLATES.length} Production Starters
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-fg-subtle">
          <span className="hidden sm:inline">Deployment Target:</span>
          <span className="text-emerald-500 font-normal flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none"></span>
            Cloudflare Pages Edge & Jamstack
          </span>
        </div>
      </Card>

      {/* 
        ========================================================================
        2. SEARCH & CATEGORY FILTER TOOLBAR
        ========================================================================
      */}
      <Card variant="default" className="p-2.5 sm:p-3 flex flex-col gap-2.5">
        {/* Top Row: Search & Framework Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
          {/* Search input */}
          <div className="flex-1 min-w-[200px] max-w-md">
            <Input
              type="text"
              placeholder="Search templates by name, feature, stack..."
              value={templateSearch}
              onChange={(e) => onTemplateSearchChange(e.target.value)}
              prefixIcon={<Search className="w-3.5 h-3.5" />}
              suffixIcon={
                templateSearch ? (
                  <button
                    type="button"
                    onClick={() => onTemplateSearchChange('')}
                    className="text-fg-subtle hover:text-fg-default cursor-pointer"
                    title="Clear Search"
                  >
                    <X className="w-3 h-3" />
                  </button>
                ) : undefined
              }
              isMono
            />
          </div>

          {/* Framework Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[10.5px] text-fg-subtle shrink-0">Framework:</span>
            <div className="w-44">
              <Select
                value={templateFrameworkFilter}
                onChange={(e) => onTemplateFrameworkFilterChange(e.target.value as any)}
              >
                <option value="All">All Frameworks</option>
                <option value="Next.js">Next.js 15</option>
                <option value="React + Vite">React + Vite 6</option>
                <option value="Astro">Astro 5</option>
              </Select>
            </div>
          </div>
        </div>

        {/* Bottom Row: Category Pills with Marketplace Counts */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 pt-1 border-t border-border-subtle">
          {(['All', 'E-Commerce', 'SaaS', 'AI & Tooling', 'Portfolio', 'Blog', 'Agency'] as const).map((cat) => {
            const count =
              cat === 'All'
                ? READY_TEMPLATES.length
                : READY_TEMPLATES.filter((t) => t.category === cat).length;
            const isSelected = templateCategoryFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onTemplateCategoryFilterChange(cat)}
                className={`px-2.5 py-1 text-[11px] font-normal cursor-pointer transition-colors shrink-0 flex items-center gap-1.5 rounded-none shadow-none border ${
                  isSelected
                    ? 'bg-accent-primary text-white border-accent-primary'
                    : 'bg-canvas-inset hover:bg-canvas-subtle text-fg-muted hover:text-fg-default border-border-subtle'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[9px] font-mono px-1 py-0.5 rounded-none ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-canvas-subtle text-fg-subtle'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* 
        ========================================================================
        3. TEMPLATES CARD GRID
        ========================================================================
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filteredTemplates.map((tmpl) => (
          <Card
            key={tmpl.id}
            variant="interactive"
            className="flex flex-col justify-between overflow-hidden group p-0"
          >
            <div className="flex flex-col">
              {/* BROWSER-FRAMED THEME THUMBNAIL */}
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
                    className="text-[13px] font-semibold text-fg-default group-hover:text-accent-primary transition-colors line-clamp-1 cursor-pointer"
                    title={tmpl.name}
                  >
                    {tmpl.name}
                  </h3>
                  <MetricPill variant="green" size="xs">Free</MetricPill>
                </div>

                {/* Metadata Row: Author · Framework · Rating · Deploys */}
                <div className="flex items-center gap-1.5 text-[10.5px] font-mono text-fg-subtle flex-wrap">
                  <span>by {tmpl.author}</span>
                  <span>·</span>
                  <span className="text-amber-400 flex items-center gap-0.5 font-medium">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{tmpl.stars}</span>
                  </span>
                  <span>·</span>
                  <span className="text-fg-muted">{tmpl.deploys} uses</span>
                  <FrameworkBadge framework={tmpl.framework} variant="blue" className="ml-auto" />
                </div>

                {/* Short Description */}
                <p className="text-[11px] text-fg-muted line-clamp-2 leading-relaxed">
                  {tmpl.shortBio}
                </p>

                {/* Feature Tags & Compilation Speed Strip */}
                <div className="flex items-center justify-between gap-1 pt-1 border-t border-border-subtle flex-wrap">
                  <div className="flex flex-wrap gap-1">
                    {tmpl.features.slice(0, 2).map((feat) => (
                      <span
                        key={feat}
                        className="text-[9px] font-mono px-1.5 py-0.5 bg-canvas-inset text-fg-subtle border border-border-subtle rounded-none shadow-none"
                      >
                        {feat}
                      </span>
                    ))}
                    {tmpl.features.length > 2 && (
                      <span className="text-[9px] font-mono px-1 py-0.5 bg-canvas-inset text-fg-subtle border border-border-subtle rounded-none shadow-none">
                        +{tmpl.features.length - 2}
                      </span>
                    )}
                  </div>
                  <span className="text-[9.5px] font-mono text-emerald-500 flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none"></span>
                    <span>~{tmpl.buildTime}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* CARD ACTIONS FOOTER */}
            <div className="p-2.5 px-3 border-t border-border-subtle bg-canvas-inset flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                {/* Quick View / Details Trigger */}
                <SecondaryButton
                  size="md"
                  icon={<Eye className="w-3.5 h-3.5 text-accent-primary" />}
                  onClick={() => onSelectTemplateForDetails(tmpl)}
                >
                  Details
                </SecondaryButton>

                {/* Live Demo Link */}
                <a
                  href={tmpl.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Open Live Demo Preview"
                  className="p-1.5 text-fg-muted hover:text-accent-primary hover:bg-canvas-subtle rounded-none cursor-pointer transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Use Template Action Button */}
              <PrimaryButton
                size="md"
                onClick={() => onUseTemplate(tmpl)}
                disabled={deployingTemplateId === tmpl.id}
                isLoading={deployingTemplateId === tmpl.id}
                loadingText="Cloning..."
                icon={<Sparkles className="w-3 h-3" />}
              >
                Use Template
              </PrimaryButton>
            </div>
          </Card>
        ))}

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="col-span-full">
            <Card variant="subtle" className="p-8 text-center text-fg-muted flex flex-col items-center gap-2">
              <Sparkles className="w-6 h-6 text-fg-subtle" />
              <div className="text-xs font-medium text-fg-default">No ready templates found</div>
              <div className="text-[11px] text-fg-subtle">Try adjusting search query or category filters.</div>
              <SecondaryButton
                size="sm"
                onClick={() => {
                  onTemplateSearchChange('');
                  onTemplateCategoryFilterChange('All');
                  onTemplateFrameworkFilterChange('All');
                }}
                className="mt-2"
              >
                Reset Filters
              </SecondaryButton>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
