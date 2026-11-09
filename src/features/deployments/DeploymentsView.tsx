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
 * DESIGN CONSTITUTION:
 * - Component-only architecture: UI built exclusively with Card, Input, Select,
 *   Table primitives, StatusBadge, PrimaryButton, SecondaryButton, and IconButton.
 * - Zero border radius (`rounded-none`) and zero box shadow (`shadow-none`).
 * - Full Dark/Light dual-theme token coverage via semantic CSS variables.
 * - Monospace precision for technical identifiers (commit SHAs, timings, branches).
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
import { PrimaryButton, SecondaryButton, IconButton } from '../../components/buttons';
import {
  Card,
  Input,
  Select,
  Table,
  TableHeader,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from '../../components/ui';

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
    <div className="p-3 sm:p-4 flex flex-col gap-3 max-w-[1600px] w-full mx-auto animate-in fade-in duration-100 font-sans">
      {/* 
        ========================================================================
        1. TOP METRICS STRIP (4 METRICS: VOLUME, SUCCESS RATE, LATENCY, NODES)
        ========================================================================
      */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {/* Metric 1: Total Deployments */}
        <Card variant="default" className="p-2.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-fg-subtle">Total Deployments</div>
            <div className="text-sm font-semibold text-fg-default font-mono mt-0.5">
              {deploymentsList.length}
            </div>
          </div>
          <div className="w-7 h-7 bg-accent-primary/10 border border-accent-primary/20 text-accent-primary flex items-center justify-center rounded-none shadow-none">
            <Activity className="w-3.5 h-3.5" />
          </div>
        </Card>

        {/* Metric 2: Success Rate */}
        <Card variant="default" className="p-2.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-fg-subtle">Success Rate</div>
            <div className="text-sm font-semibold text-emerald-500 font-mono mt-0.5">
              {successRate}%
            </div>
          </div>
          <div className="w-7 h-7 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center rounded-none shadow-none">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </Card>

        {/* Metric 3: Avg Build Latency */}
        <Card variant="default" className="p-2.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-fg-subtle">Avg Build Time</div>
            <div className="text-sm font-semibold text-fg-default font-mono mt-0.5">
              {avgBuildTime}
            </div>
          </div>
          <div className="w-7 h-7 bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center rounded-none shadow-none">
            <Clock className="w-3.5 h-3.5" />
          </div>
        </Card>

        {/* Metric 4: Edge POPs */}
        <Card variant="default" className="p-2.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-fg-subtle">Edge Nodes</div>
            <div className="text-xs font-medium text-emerald-500 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none"></span>
              <span>310+ Global POPs</span>
            </div>
          </div>
          <div className="w-7 h-7 bg-canvas-inset border border-border-subtle text-accent-primary flex items-center justify-center rounded-none shadow-none">
            <Cloud className="w-3.5 h-3.5" />
          </div>
        </Card>
      </div>

      {/* 
        ========================================================================
        2. SEARCH & FILTER TOOLBAR WITH ACTION CTAs
        ========================================================================
      */}
      <Card variant="default" className="p-2.5 sm:p-3 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        {/* Search & Select Filters */}
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="flex-1 min-w-[200px] max-w-sm">
            <Input
              type="text"
              placeholder="Filter by commit, repo, or project..."
              value={deploymentSearch}
              onChange={(e) => onDeploymentSearchChange(e.target.value)}
              prefixIcon={<Search className="w-3.5 h-3.5" />}
              suffixIcon={
                deploymentSearch ? (
                  <button
                    type="button"
                    onClick={() => onDeploymentSearchChange('')}
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

          {/* Environment Filter */}
          <div className="w-40">
            <Select
              value={deploymentEnvFilter}
              onChange={(e) => onDeploymentEnvFilterChange(e.target.value as any)}
            >
              <option value="All">All Environments</option>
              <option value="Production">Production</option>
              <option value="Preview">Preview</option>
              <option value="Development">Development</option>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="w-36">
            <Select
              value={deploymentStatusFilter}
              onChange={(e) => onDeploymentStatusFilterChange(e.target.value as any)}
            >
              <option value="All">All Statuses</option>
              <option value="live">Live</option>
              <option value="passed">Passed</option>
              <option value="building">Building</option>
              <option value="failed">Failed</option>
            </Select>
          </div>
        </div>

        {/* Action CTA Buttons (Create Project & Connect Accounts) */}
        <div className="flex items-center gap-2 shrink-0">
          <SecondaryButton
            size="md"
            icon={<Github className="w-3.5 h-3.5 text-accent-primary" />}
            onClick={onConnectAccounts}
          >
            Connect Accounts
          </SecondaryButton>

          <PrimaryButton
            size="md"
            icon={<Plus className="w-3.5 h-3.5" />}
            onClick={onCreateProject}
          >
            Create Project
          </PrimaryButton>
        </div>
      </Card>

      {/* 
        ========================================================================
        3. HIGH-DENSITY DEPLOYMENTS TABLE
        ========================================================================
      */}
      <Table>
        <TableHeader>
          <TableRow isHeader>
            <TableHeadCell className="px-3">Project & Repository</TableHeadCell>
            <TableHeadCell>Commit Evidence</TableHeadCell>
            <TableHeadCell>Environment</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Trigger & Duration</TableHeadCell>
            <TableHeadCell align="right" className="px-3">Actions</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDeployments.map((dep) => (
            <TableRow key={dep.id}>
              {/* Project & Repo (Clickable to Workspace) */}
              <TableCell className="px-3">
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() => onNavigateWorkspace({ name: dep.projectName, repo: dep.repo }, 'overview')}
                    className="font-medium text-xs text-fg-default hover:text-accent-primary text-left transition-colors flex items-center gap-1.5 cursor-pointer group"
                  >
                    <FolderGit2 className="w-3.5 h-3.5 text-accent-primary shrink-0" />
                    <span className="group-hover:underline">{dep.projectName}</span>
                  </button>
                  <span className="font-mono text-[10.5px] text-fg-subtle select-all">
                    {dep.repo}
                  </span>
                </div>
              </TableCell>

              {/* Commit Evidence */}
              <TableCell>
                <div className="flex flex-col gap-0.5 max-w-[280px]">
                  <div className="flex items-center gap-1.5">
                    <code className="text-accent-primary text-[11px] font-mono select-all">
                      {dep.commitSha}
                    </code>
                    <span className="text-[10px] text-fg-subtle font-mono">@{dep.author}</span>
                  </div>
                  <span className="text-[11px] text-fg-muted truncate" title={dep.commitMsg}>
                    {dep.commitMsg}
                  </span>
                </div>
              </TableCell>

              {/* Environment & Branch */}
              <TableCell>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded-none font-normal ${
                      dep.environment === 'Production'
                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                        : 'bg-accent-primary/10 text-accent-primary border border-accent-primary/30'
                    }`}
                  >
                    {dep.environment}
                  </span>
                  <span className="text-[10px] font-mono text-fg-muted">
                    {dep.branch}
                  </span>
                </div>
              </TableCell>

              {/* Status Badge */}
              <TableCell>
                <StatusBadge status={dep.status as any} />
              </TableCell>

              {/* Trigger & Duration */}
              <TableCell>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5 text-[10.5px] text-fg-muted">
                    <span className="font-mono text-fg-default">{dep.duration}</span>
                    <span className="text-fg-subtle">·</span>
                    <span className="text-fg-subtle">{dep.timestamp}</span>
                  </div>
                  <span className="text-[9.5px] text-fg-subtle font-mono">
                    via {dep.trigger}
                  </span>
                </div>
              </TableCell>

              {/* Action Buttons */}
              <TableCell align="right" className="px-3">
                <div className="flex items-center justify-end gap-1.5 flex-wrap">
                  {/* Open Project Workspace */}
                  <SecondaryButton
                    size="sm"
                    icon={<ArrowRight className="w-3 h-3 text-accent-primary" />}
                    iconPosition="right"
                    title="Go to Project Workspace"
                    onClick={() => onNavigateWorkspace({ name: dep.projectName, repo: dep.repo }, 'overview')}
                  >
                    Workspace
                  </SecondaryButton>

                  {/* View Build Logs */}
                  <IconButton
                    size="sm"
                    icon={<Terminal className="w-3.5 h-3.5" />}
                    title="View Terminal Logs"
                    onClick={() => onNavigateWorkspace({ name: dep.projectName, repo: dep.repo }, 'logs')}
                    className="hover:text-accent-primary"
                  />

                  {/* Open Live URL */}
                  <a
                    href={`https://${dep.domain}`}
                    target="_blank"
                    rel="noreferrer"
                    title="Open Live Deployment"
                    className="p-1 text-fg-muted hover:text-emerald-500 hover:bg-canvas-subtle rounded-none cursor-pointer transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {/* Redeploy Trigger */}
                  <IconButton
                    size="sm"
                    icon={<RotateCcw className="w-3.5 h-3.5" />}
                    title="Redeploy Commit"
                    onClick={() => onRedeploy({ name: dep.projectName, repo: dep.repo })}
                    className="hover:text-amber-400"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}

          {/* Empty State */}
          {filteredDeployments.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center" className="p-6 text-fg-muted">
                <div className="flex flex-col items-center gap-1.5">
                  <Activity className="w-5 h-5 text-fg-subtle" />
                  <div className="text-xs font-normal text-fg-default">No deployments match the filter</div>
                  <div className="text-[10.5px] text-fg-subtle">Try clearing search or filter selections.</div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
