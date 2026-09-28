/**
 * ============================================================================
 * YGIT PLATFORM UI — STANDALONE MAIN VIEW: DEPLOYMENTS
 * FILE: src/features/deployments/DeploymentsView.tsx
 * ============================================================================
 * 
 * PURPOSE:
 * Real-time global chronological deployments stream across all repositories
 * and projects in the YGIT platform (Vercel / Cloudflare Dashboard style).
 * Provides commit evidence tracking, live edge preview URLs, instant terminal logs
 * navigation, and re-deployment triggers.
 * 
 * ARCHITECTURE & LIFECYCLE:
 * 1. Platform Metrics Strip:
 *    - Total Deployments count.
 *    - Success Rate (100% operational).
 *    - Average Build Time (12.8s edge build).
 *    - Global POPs (310+ Edge locations).
 * 2. Search & Multi-Filter Toolbar:
 *    - Search input filtering across commit SHA, commit message, repository, and project name.
 *    - Environment selector (All, Production, Preview, Development).
 *    - Status selector (All, Live, Passed, Building, Failed).
 *    - Action triggers: "Connect Accounts" and "Create Project".
 * 3. High-Density Deployments Table:
 *    - Project & Repository with click-through to workspace.
 *    - Monospace Commit Evidence (`<sha>`, `@author`, `<message>`).
 *    - Environment & Branch badges.
 *    - StatusBadge atomic component.
 *    - Trigger & Duration telemetry.
 *    - Action toolbar: Workspace link, Logs terminal viewer, Live URL, and Re-deploy commit.
 * 
 * DATA CONTRACT:
 * - deploymentsList: GlobalDeployment[]
 * - deploymentSearch: string
 * - onDeploymentSearchChange: (search: string) => void
 * - deploymentEnvFilter: 'All' | 'Production' | 'Preview' | 'Development'
 * - onDeploymentEnvFilterChange: (env: any) => void
 * - deploymentStatusFilter: 'All' | 'live' | 'passed' | 'building' | 'failed'
 * - onDeploymentStatusFilterChange: (status: any) => void
 * - onConnectAccounts: () => void
 * - onCreateProject: () => void
 * - onNavigateWorkspace: (project: { name: string; repo: string }, tab: 'overview' | 'logs') => void
 * - onRedeploy: (project: { name: string; repo: string }) => void
 * ============================================================================
 */

import React from 'react';
import {
  Activity,
  CheckCircle2,
  Clock,
  Cloud,
  Search,
  X,
  Github,
  Plus,
  FolderGit2,
  ArrowRight,
  Terminal,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import { GlobalDeployment } from '../../types';
import { StatusBadge } from '../../components/badges/StatusBadge';

export interface DeploymentsViewProps {
  deploymentsList: GlobalDeployment[];
  deploymentSearch: string;
  onDeploymentSearchChange: (search: string) => void;
  deploymentEnvFilter: 'All' | 'Production' | 'Preview' | 'Development';
  onDeploymentEnvFilterChange: (env: 'All' | 'Production' | 'Preview' | 'Development') => void;
  deploymentStatusFilter: 'All' | 'live' | 'passed' | 'building' | 'failed';
  onDeploymentStatusFilterChange: (status: 'All' | 'live' | 'passed' | 'building' | 'failed') => void;
  onConnectAccounts: () => void;
  onCreateProject: () => void;
  onNavigateWorkspace: (project: { name: string; repo: string }, tab: 'overview' | 'logs') => void;
  onRedeploy: (project: { name: string; repo: string }) => void;
}

export const DeploymentsView: React.FC<DeploymentsViewProps> = ({
  deploymentsList,
  deploymentSearch,
  onDeploymentSearchChange,
  deploymentEnvFilter,
  onDeploymentEnvFilterChange,
  deploymentStatusFilter,
  onDeploymentStatusFilterChange,
  onConnectAccounts,
  onCreateProject,
  onNavigateWorkspace,
  onRedeploy,
}) => {
  // Filtered deployment pipeline calculation
  const filteredDeployments = deploymentsList.filter((dep) => {
    const matchQuery =
      !deploymentSearch ||
      dep.projectName.toLowerCase().includes(deploymentSearch.toLowerCase()) ||
      dep.repo.toLowerCase().includes(deploymentSearch.toLowerCase()) ||
      dep.commitSha.toLowerCase().includes(deploymentSearch.toLowerCase()) ||
      dep.commitMsg.toLowerCase().includes(deploymentSearch.toLowerCase());
    const matchEnv = deploymentEnvFilter === 'All' || dep.environment === deploymentEnvFilter;
    const matchStatus = deploymentStatusFilter === 'All' || dep.status === deploymentStatusFilter;
    return matchQuery && matchEnv && matchStatus;
  });

  // Dynamic telemetry calculations
  const successfulCount = deploymentsList.filter(
    (d) => d.status === 'live' || d.status === 'passed'
  ).length;
  const successRate =
    deploymentsList.length > 0
      ? Math.round((successfulCount / deploymentsList.length) * 100)
      : 100;

  const avgBuildTime =
    deploymentsList.length > 0
      ? (
          deploymentsList.reduce(
            (acc, d) => acc + (parseFloat(d.duration) || 0),
            0
          ) / deploymentsList.length
        ).toFixed(1) + 's'
      : '12.8s';

  return (
    <div className="p-3 sm:p-4 flex flex-col gap-3 max-w-[1600px] w-full mx-auto animate-in fade-in duration-150">
      {/* 
        ========================================================================
        1. TOP METRICS STRIP (4 METRICS: VOLUME, SUCCESS RATE, LATENCY, NODES)
        ========================================================================
      */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {/* Metric 1: Total Deployments */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-2.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#7d8590]">Total Deployments</div>
            <div className="text-sm font-semibold text-[#f0f6fc] font-mono mt-0.5">
              {deploymentsList.length}
            </div>
          </div>
          <div className="w-7 h-7 rounded bg-[#1d6cf6]/10 border border-[#1d6cf6]/20 text-[#58a6ff] flex items-center justify-center">
            <Activity className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Metric 2: Success Rate */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-2.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#7d8590]">Success Rate</div>
            <div className="text-sm font-semibold text-[#3fb950] font-mono mt-0.5">
              {successRate}%
            </div>
          </div>
          <div className="w-7 h-7 rounded bg-[#238636]/10 border border-[#238636]/20 text-[#3fb950] flex items-center justify-center">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Metric 3: Avg Build Latency */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-2.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#7d8590]">Avg Build Time</div>
            <div className="text-sm font-semibold text-[#f0f6fc] font-mono mt-0.5">
              {avgBuildTime}
            </div>
          </div>
          <div className="w-7 h-7 rounded bg-[#8957e5]/10 border border-[#8957e5]/20 text-[#a371f7] flex items-center justify-center">
            <Clock className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Metric 4: Edge POPs */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-2.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#7d8590]">Edge Nodes</div>
            <div className="text-xs font-medium text-[#3fb950] flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]"></span>
              <span>310+ Global POPs</span>
            </div>
          </div>
          <div className="w-7 h-7 rounded bg-[#090d13] border border-[#21262d] text-[#58a6ff] flex items-center justify-center">
            <Cloud className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        2. SEARCH & FILTER TOOLBAR WITH ACTION CTAs
        ========================================================================
      */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-2.5 sm:p-3 flex flex-col md:flex-row md:items-center justify-between gap-2.5 shadow-sm">
        {/* Search & Select Filters */}
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-3.5 h-3.5 text-[#7d8590] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by commit, repo, or project..."
              value={deploymentSearch}
              onChange={(e) => onDeploymentSearchChange(e.target.value)}
              className="w-full bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded-md px-2.5 pl-8 py-1.5 text-xs text-[#f0f6fc] font-mono placeholder:text-[#484f58] transition-colors"
            />
            {deploymentSearch && (
              <button
                type="button"
                onClick={() => onDeploymentSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7d8590] hover:text-[#f0f6fc] cursor-pointer"
                title="Clear Search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Environment Filter */}
          <select
            value={deploymentEnvFilter}
            onChange={(e) => onDeploymentEnvFilterChange(e.target.value as any)}
            className="bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded-md px-2.5 py-1.5 text-xs text-[#f0f6fc] cursor-pointer transition-colors"
          >
            <option value="All">All Environments</option>
            <option value="Production">Production</option>
            <option value="Preview">Preview</option>
            <option value="Development">Development</option>
          </select>

          {/* Status Filter */}
          <select
            value={deploymentStatusFilter}
            onChange={(e) => onDeploymentStatusFilterChange(e.target.value as any)}
            className="bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded-md px-2.5 py-1.5 text-xs text-[#f0f6fc] cursor-pointer transition-colors"
          >
            <option value="All">All Statuses</option>
            <option value="live">Live</option>
            <option value="passed">Passed</option>
            <option value="building">Building</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Action CTA Buttons (Create Project & Connect Accounts) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onConnectAccounts}
            className="bg-[#21262d] hover:bg-[#282e36] text-[#c9d1d9] hover:text-[#f0f6fc] border border-[#30363d] px-3 py-1.5 rounded-md text-xs font-normal flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
          >
            <Github className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span>Connect Accounts</span>
          </button>

          <button
            type="button"
            onClick={onCreateProject}
            className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white px-3 py-1.5 rounded-md text-xs font-normal flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Project</span>
          </button>
        </div>
      </div>

      {/* 
        ========================================================================
        3. HIGH-DENSITY DEPLOYMENTS TABLE
        ========================================================================
      */}
      <div className="border border-[#21262d] rounded-lg bg-[#090d13] overflow-x-auto text-xs shadow-sm">
        <table className="w-full text-left min-w-[780px]">
          <thead>
            <tr className="border-b border-[#21262d] bg-[#161b22] text-[9.5px] font-mono uppercase text-[#7d8590] tracking-wider">
              <th className="p-2.5 px-3">Project & Repository</th>
              <th className="p-2.5">Commit Evidence</th>
              <th className="p-2.5">Environment</th>
              <th className="p-2.5">Status</th>
              <th className="p-2.5">Trigger & Duration</th>
              <th className="p-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#21262d]">
            {filteredDeployments.map((dep) => (
              <tr key={dep.id} className="hover:bg-[#161b22]/50 transition-colors">
                {/* Project & Repo (Clickable to Workspace) */}
                <td className="p-2.5 px-3 align-middle">
                  <div className="flex flex-col gap-0.5">
                    <button
                      type="button"
                      onClick={() => onNavigateWorkspace({ name: dep.projectName, repo: dep.repo }, 'overview')}
                      className="font-medium text-xs text-[#f0f6fc] hover:text-[#58a6ff] text-left transition-colors flex items-center gap-1.5 cursor-pointer group"
                    >
                      <FolderGit2 className="w-3.5 h-3.5 text-[#58a6ff] shrink-0" />
                      <span className="group-hover:underline">{dep.projectName}</span>
                    </button>
                    <span className="font-mono text-[10.5px] text-[#7d8590]">
                      {dep.repo}
                    </span>
                  </div>
                </td>

                {/* Commit Evidence */}
                <td className="p-2.5 align-middle">
                  <div className="flex flex-col gap-0.5 max-w-[280px]">
                    <div className="flex items-center gap-1.5">
                      <code className="text-[#58a6ff] text-[11px] font-mono select-all">
                        {dep.commitSha}
                      </code>
                      <span className="text-[10px] text-[#7d8590] font-mono">@{dep.author}</span>
                    </div>
                    <span className="text-[11px] text-[#c9d1d9] truncate" title={dep.commitMsg}>
                      {dep.commitMsg}
                    </span>
                  </div>
                </td>

                {/* Environment & Branch */}
                <td className="p-2.5 align-middle">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded font-normal ${
                        dep.environment === 'Production'
                          ? 'bg-[#8957e5]/15 text-[#a371f7] border border-[#8957e5]/30'
                          : 'bg-[#1d6cf6]/15 text-[#58a6ff] border border-[#1d6cf6]/30'
                      }`}
                    >
                      {dep.environment}
                    </span>
                    <span className="text-[10px] font-mono text-[#8b949e]">
                      {dep.branch}
                    </span>
                  </div>
                </td>

                {/* Status Badge */}
                <td className="p-2.5 align-middle">
                  <StatusBadge status={dep.status as any} />
                </td>

                {/* Trigger & Duration */}
                <td className="p-2.5 align-middle">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5 text-[10.5px] text-[#c9d1d9]">
                      <span className="font-mono text-[#8b949e]">{dep.duration}</span>
                      <span className="text-[#7d8590]">·</span>
                      <span className="text-[#7d8590]">{dep.timestamp}</span>
                    </div>
                    <span className="text-[9.5px] text-[#7d8590] font-mono">
                      via {dep.trigger}
                    </span>
                  </div>
                </td>

                {/* Action Buttons */}
                <td className="p-2.5 px-3 align-middle text-right">
                  <div className="flex items-center justify-end gap-1.5 flex-wrap">
                    {/* Open Project Workspace */}
                    <button
                      type="button"
                      onClick={() => onNavigateWorkspace({ name: dep.projectName, repo: dep.repo }, 'overview')}
                      title="Go to Project Workspace"
                      className="bg-[#21262d] hover:bg-[#282e36] text-[#c9d1d9] hover:text-[#f0f6fc] text-[10.5px] px-2 py-0.5 rounded cursor-pointer transition-colors border border-[#30363d] flex items-center gap-1 font-normal"
                    >
                      <span>Workspace</span>
                      <ArrowRight className="w-3 h-3 text-[#58a6ff]" />
                    </button>

                    {/* View Build Logs */}
                    <button
                      type="button"
                      onClick={() => onNavigateWorkspace({ name: dep.projectName, repo: dep.repo }, 'logs')}
                      title="View Terminal Logs"
                      className="p-1 text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#21262d] rounded cursor-pointer transition-colors"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                    </button>

                    {/* Open Live URL */}
                    <a
                      href={`https://${dep.domain}`}
                      target="_blank"
                      rel="noreferrer"
                      title="Open Live Deployment"
                      className="p-1 text-[#8b949e] hover:text-[#3fb950] hover:bg-[#21262d] rounded cursor-pointer transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {/* Redeploy Trigger */}
                    <button
                      type="button"
                      onClick={() => onRedeploy({ name: dep.projectName, repo: dep.repo })}
                      title="Redeploy Commit"
                      className="p-1 text-[#8b949e] hover:text-[#e3b341] hover:bg-[#21262d] rounded cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* Empty State */}
            {filteredDeployments.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-[#8b949e]">
                  <div className="flex flex-col items-center gap-1.5">
                    <Activity className="w-5 h-5 text-[#7d8590]" />
                    <div className="text-xs font-normal text-[#f0f6fc]">No deployments match the filter</div>
                    <div className="text-[10.5px] text-[#7d8590]">Try clearing search or filter selections.</div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
