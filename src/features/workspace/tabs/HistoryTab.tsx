/**
 * ============================================================================
 * YGIT PLATFORM UI — WORKSPACE SUB-TAB: HISTORY
 * FILE: src/features/workspace/tabs/HistoryTab.tsx
 * ============================================================================
 * 
 * PURPOSE:
 * Chronological deployment history table for the selected project per AGENTS.md:
 * - Commit messages and deterministic commit SHAs
 * - Branch tracking (main, preview, prod)
 * - Standardized status pills (StatusBadge atomic component)
 * - Duration & elapsed build latency readouts
 * - Interactive Re-deploy trigger action
 * 
 * DESIGN CONSTITUTION:
 * - Component-only architecture: Card, Table suite, StatusBadge, SecondaryButton.
 * - Zero border radius (`rounded-none`) and zero box shadow (`shadow-none`).
 * - Full Dark/Light dual-theme token coverage via semantic CSS variables.
 * ============================================================================
 */

import React from 'react';
import { GitBranch, RotateCcw, Clock } from 'lucide-react';
import { GlobalDeployment } from '../../../types';
import { StatusBadge } from '../../../components/badges/StatusBadge';
import { SecondaryButton } from '../../../components/buttons';
import { INITIAL_DEPLOYMENTS } from '../../../mocks/mockDeployments';
import {
  Card,
  Table,
  TableHeader,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from '../../../components/ui';

export interface HistoryTabProps {
  currentProject: { name: string; repo: string };
  deploymentsList?: GlobalDeployment[];
  onRedeploy?: (project: { name: string; repo: string }) => void;
  onNavigateToLogs?: () => void;
}

export const HistoryTab: React.FC<HistoryTabProps> = ({
  currentProject,
  deploymentsList = INITIAL_DEPLOYMENTS,
  onRedeploy,
}) => {
  // Filter deployments for this project, or fallback to project-relevant deployments
  const projectDeployments = deploymentsList.filter(
    (d) =>
      d.projectName.toLowerCase() === currentProject.name.toLowerCase() ||
      d.repo.toLowerCase() === currentProject.repo.toLowerCase()
  );

  const displayList = projectDeployments.length > 0 ? projectDeployments : deploymentsList.slice(0, 4);

  return (
    <div className="flex flex-col gap-2.5 animate-in fade-in duration-100 font-sans">
      {/* Top Summary Bar */}
      <Card variant="default" className="p-2.5 px-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-accent-primary" />
          <span className="font-medium text-fg-default">Deployment History</span>
          <span className="text-[10px] font-mono text-fg-subtle">
            ({displayList.length} recorded events)
          </span>
        </div>
        <div className="text-[10.5px] font-mono text-fg-subtle">
          Auto-synced with Git webhooks
        </div>
      </Card>

      {/* Deployments History Table */}
      <Table>
        <TableHeader>
          <TableRow isHeader>
            <TableHeadCell>Commit</TableHeadCell>
            <TableHeadCell>Message</TableHeadCell>
            <TableHeadCell>Branch</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Duration</TableHeadCell>
            <TableHeadCell align="right">Actions</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayList.map((dep) => (
            <TableRow key={dep.id}>
              {/* Commit SHA */}
              <TableCell className="font-mono text-accent-primary">
                <span className="bg-accent-primary/10 border border-accent-primary/20 px-1.5 py-0.5 rounded-none select-all font-medium">
                  {dep.commitSha}
                </span>
              </TableCell>

              {/* Commit Message */}
              <TableCell className="max-w-[260px] truncate text-fg-muted" title={dep.commitMsg}>
                {dep.commitMsg}
              </TableCell>

              {/* Branch */}
              <TableCell className="font-mono text-fg-muted">
                <span className="flex items-center gap-1">
                  <GitBranch className="w-3 h-3 text-fg-subtle" />
                  <span>{dep.branch}</span>
                </span>
              </TableCell>

              {/* Status Badge */}
              <TableCell>
                <StatusBadge status={dep.status} />
              </TableCell>

              {/* Duration & Timestamp */}
              <TableCell className="font-mono text-fg-subtle text-[11px]">
                <div>{dep.duration}</div>
                <div className="text-[9.5px] text-fg-subtle">{dep.timestamp}</div>
              </TableCell>

              {/* Actions: Re-deploy */}
              <TableCell align="right">
                <div className="flex items-center justify-end gap-1.5">
                  {onRedeploy && (
                    <SecondaryButton
                      size="compact"
                      icon={<RotateCcw className="w-2.5 h-2.5" />}
                      onClick={() => onRedeploy(currentProject)}
                      title="Re-deploy this commit"
                    >
                      Redeploy
                    </SecondaryButton>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
