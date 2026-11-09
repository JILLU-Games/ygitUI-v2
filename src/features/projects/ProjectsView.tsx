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
 * ARCHITECTURE & LIFECYCLE:
 * 1. Filter & Search Toolbar:
 *    - Search input filtering across project names and repository paths.
 *    - Provider selector (All, Cloudflare Pages, GitHub Actions).
 *    - "+ Create Project" CTA triggering the new project intake modal.
 * 2. High-Density Project Cards:
 *    - Monospace project and repository links with hover transitions.
 *    - Live status badge (`● Live`).
 *    - Monospace metadata box (`REPO: <repo>`, `EDGE: <domain>`).
 *    - Last updated timestamp and "Manage" workspace trigger button.
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
import { Plus } from 'lucide-react';
import { Project } from '../../types';
import { StatusBadge } from '../../components/badges/StatusBadge';
import { PrimaryButton, SecondaryButton } from '../../components/buttons';

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
    <div className="p-3 flex flex-col gap-2.5 max-w-[1600px] w-full mx-auto animate-in fade-in duration-150">
      {/* 
        ========================================================================
        TOOLBAR: SEARCH INPUT, PROVIDER FILTER & CREATE PROJECT ACTION
        ========================================================================
      */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <input
            type="text"
            placeholder="Filter projects..."
            value={projectSearch}
            onChange={(e) => onProjectSearchChange(e.target.value)}
            className="bg-[#090d13] border border-[#30363d] rounded text-xs text-[#f0f6fc] font-mono placeholder:text-[#484f58] px-2.5 py-1 w-48 focus:border-[#1d6cf6] focus:outline-none transition-colors"
          />
          <select
            value={providerFilter}
            onChange={(e) => onProviderFilterChange(e.target.value as any)}
            className="bg-[#090d13] border border-[#30363d] rounded text-xs text-[#8b949e] px-2 py-1 focus:border-[#1d6cf6] focus:outline-none cursor-pointer transition-colors"
          >
            <option value="all">All</option>
            <option value="cloudflare">Cloudflare Pages</option>
            <option value="github">GitHub Actions</option>
          </select>
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
          <div
            key={proj.id}
            className="bg-[#161b22] border border-[#30363d] rounded p-2.5 flex flex-col justify-between gap-2 hover:border-[#1d6cf6] transition-colors"
          >
            {/* Card Header: Project Name & Status */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => onSelectProject({ name: proj.name, repo: proj.repo })}
                className="text-xs font-semibold text-[#f0f6fc] hover:text-[#1d6cf6] truncate text-left cursor-pointer transition-colors"
              >
                {proj.name}
              </button>
              <StatusBadge status={(proj.status || 'live') as any} />
            </div>

            {/* Card Body: Repository & Edge Monospace Specs */}
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

            {/* Card Footer: Timestamp & Manage Trigger */}
            <div className="flex items-center justify-between pt-1 border-t border-[#21262d] text-[10px]">
              <span className="text-[#7d8590] font-mono">{proj.updated}</span>
              <SecondaryButton
                size="sm"
                onClick={() => onSelectProject({ name: proj.name, repo: proj.repo })}
              >
                Manage
              </SecondaryButton>
            </div>
          </div>
        ))}

        {/* Empty Search Filter State */}
        {filteredProjects.length === 0 && (
          <div className="col-span-full bg-[#161b22] border border-[#21262d] rounded-lg p-6 text-center text-[#8b949e] flex flex-col items-center gap-1.5">
            <div className="text-xs font-medium text-[#f0f6fc]">No projects match your filter</div>
            <div className="text-[11px] text-[#7d8590]">Try searching with a different name or clearing provider filters.</div>
          </div>
        )}
      </div>
    </div>
  );
};
