/**
 * ============================================================================
 * YGIT PLATFORM UI — STANDALONE MAIN VIEW: PROJECTS
 * FILE: src/features/projects/ProjectsView.tsx
 * ============================================================================
 * 
 * PURPOSE:
 * Central project repository registry. Displays all active user projects in a
 * compact, high-density card grid with live status indicators, repository names,
 * Cloudflare Edge domain endpoints, and fast navigation to project workspaces.
 * 
 * DESIGN CONSTITUTION:
 * - Component-only architecture: UI built exclusively with Card, Input, Select,
 *   StatusBadge, PrimaryButton, and SecondaryButton primitives.
 * - Zero border radius (`rounded-none`) and zero box shadow (`shadow-none`).
 * - Full Dark/Light dual-theme token coverage via semantic CSS variables.
 * - Monospace precision for technical identifiers (paths, domains, timestamps).
 * 
 * DATA CONTRACT:
 * - projectSearch: string
 * - onProjectSearchChange: (search: string) => void
 * - providerFilter: 'all' | 'cloudflare' | 'github'
 * - onProviderFilterChange: (filter: 'all' | 'cloudflare' | 'github') => void
 * - filteredProjects: Project[]
 * - onCreateProject: () => void
 * - onSelectProject: (project: { name: string; repo: string }) => void
 * ============================================================================
 */

import React from 'react';
import { Plus, Search, FolderGit2 } from 'lucide-react';
import { Project } from '../../types';
import { StatusBadge } from '../../components/badges/StatusBadge';
import { PrimaryButton, SecondaryButton } from '../../components/buttons';
import { Card, Input, Select } from '../../components/ui';

export interface ProjectsViewProps {
  projectSearch: string;
  onProjectSearchChange: (search: string) => void;
  providerFilter: 'all' | 'cloudflare' | 'github';
  onProviderFilterChange: (filter: 'all' | 'cloudflare' | 'github') => void;
  filteredProjects: Project[];
  onCreateProject: () => void;
  onSelectProject: (project: { name: string; repo: string }) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projectSearch,
  onProjectSearchChange,
  providerFilter,
  onProviderFilterChange,
  filteredProjects,
  onCreateProject,
  onSelectProject,
}) => {
  return (
    <div className="p-3 flex flex-col gap-2.5 max-w-[1600px] w-full mx-auto animate-in fade-in duration-100 font-sans">
      {/* 
        ========================================================================
        TOOLBAR: SEARCH INPUT, PROVIDER FILTER & CREATE PROJECT ACTION
        ========================================================================
      */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="w-56">
            <Input
              type="text"
              placeholder="Filter projects..."
              value={projectSearch}
              onChange={(e) => onProjectSearchChange(e.target.value)}
              prefixIcon={<Search className="w-3.5 h-3.5" />}
              isMono
            />
          </div>
          <div className="w-44">
            <Select
              value={providerFilter}
              onChange={(e) => onProviderFilterChange(e.target.value as any)}
            >
              <option value="all">All Providers</option>
              <option value="cloudflare">Cloudflare Pages</option>
              <option value="github">GitHub Actions</option>
            </Select>
          </div>
        </div>

        <PrimaryButton
          size="sm"
          icon={<Plus className="w-3.5 h-3.5" />}
          onClick={onCreateProject}
        >
          Create Project
        </PrimaryButton>
      </div>

      {/* 
        ========================================================================
        HIGH-DENSITY PROJECT CARDS GRID
        ========================================================================
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {filteredProjects.map((proj) => (
          <Card
            key={proj.id}
            variant="interactive"
            className="p-2.5 flex flex-col justify-between gap-2"
          >
            {/* Card Header: Project Name & Status */}
            <div className="flex items-center justify-between gap-1.5">
              <button
                type="button"
                onClick={() => onSelectProject({ name: proj.name, repo: proj.repo })}
                className="text-xs font-semibold text-fg-default hover:text-accent-primary truncate text-left cursor-pointer transition-colors flex items-center gap-1.5"
              >
                <FolderGit2 className="w-3.5 h-3.5 text-accent-primary shrink-0" />
                <span className="truncate">{proj.name}</span>
              </button>
              <StatusBadge status={(proj.status || 'live') as any} />
            </div>

            {/* Card Body: Repository & Edge Monospace Specs */}
            <div className="bg-canvas-inset border border-border-subtle p-1.5 text-[10.5px] font-mono flex flex-col gap-1 rounded-none shadow-none">
              <div className="flex justify-between items-center text-fg-muted">
                <span className="text-fg-subtle">REPO</span>
                <span className="text-fg-default truncate select-all">{proj.repo}</span>
              </div>
              <div className="flex justify-between items-center text-fg-muted">
                <span className="text-fg-subtle">EDGE</span>
                <span className="text-accent-primary truncate select-all">{proj.domain}</span>
              </div>
            </div>

            {/* Card Footer: Timestamp & Manage Trigger */}
            <div className="flex items-center justify-between pt-1 border-t border-border-subtle text-[10px]">
              <span className="text-fg-subtle font-mono">{proj.updated}</span>
              <SecondaryButton
                size="sm"
                onClick={() => onSelectProject({ name: proj.name, repo: proj.repo })}
              >
                Manage
              </SecondaryButton>
            </div>
          </Card>
        ))}

        {/* Empty Search Filter State */}
        {filteredProjects.length === 0 && (
          <div className="col-span-full">
            <Card variant="subtle" className="p-6 text-center text-fg-muted flex flex-col items-center gap-1.5">
              <div className="text-xs font-medium text-fg-default">No projects match your filter</div>
              <div className="text-[11px] text-fg-subtle">Try searching with a different name or clearing provider filters.</div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
