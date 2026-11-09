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
 * ============================================================================
 */

import React from 'react';
import { GitBranch, RotateCcw, Clock } from 'lucide-react';
import { GlobalDeployment } from '../../../types';
import { StatusBadge } from '../../../components/badges/StatusBadge';
import { SecondaryButton } from '../../../components/buttons';
import { INITIAL_DEPLOYMENTS } from '../../../mocks/mockDeployments';

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
  onNavigateToLogs,
}) => {
  // Filter deployments for this project, or fallback to project-relevant deployments
  const projectDeployments = deploymentsList.filter(
    (d) =>
      d.projectName.toLowerCase() === currentProject.name.toLowerCase() ||
      d.repo.toLowerCase() === currentProject.repo.toLowerCase()
  );

  const displayList = projectDeployments.length > 0 ? projectDeployments : deploymentsList.slice(0, 4);

  return (
    <div className="flex flex-col gap-2.5 animate-in fade-in duration-150">
      {/* Top Summary Bar */}
      <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 px-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#58a6ff]" />
          <span className="font-medium text-[#f0f6fc]">Deployment History</span>
          <span className="text-[10px] font-mono text-[#8b949e]">
            ({displayList.length} recorded events)
          </span>
        </div>
        <div className="text-[10.5px] font-mono text-[#7d8590]">
          Auto-synced with Git webhooks
        </div>
      </div>

      {/* Deployments History Table */}
      <div className="border border-[#21262d] rounded bg-[#090d13] text-xs overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#21262d] bg-[#161b22] text-[9.5px] font-mono uppercase text-[#7d8590]">
              <th className="p-2.5">Commit</th>
              <th className="p-2.5">Message</th>
              <th className="p-2.5">Branch</th>
              <th className="p-2.5">Status</th>
              <th className="p-2.5">Duration</th>
              <th className="p-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#21262d]">
            {displayList.map((dep) => (
              <tr key={dep.id} className="hover:bg-[#161b22]/50 transition-colors group">
                {/* Commit SHA */}
                <td className="p-2.5 font-mono text-[#58a6ff] align-middle">
                  <span className="bg-[#1d6cf6]/10 border border-[#1d6cf6]/20 px-1.5 py-0.5 rounded select-all font-medium">
                    {dep.commitSha}
                  </span>
                </td>

                {/* Commit Message */}
                <td className="p-2.5 align-middle max-w-[260px] truncate text-[#c9d1d9]" title={dep.commitMsg}>
                  {dep.commitMsg}
                </td>

                {/* Branch */}
                <td className="p-2.5 font-mono text-[#8b949e] align-middle">
                  <span className="flex items-center gap-1">
                    <GitBranch className="w-3 h-3 text-[#7d8590]" />
                    <span>{dep.branch}</span>
                  </span>
                </td>

                {/* Status Badge */}
                <td className="p-2.5 align-middle">
                  <StatusBadge status={dep.status} />
                </td>

                {/* Duration & Timestamp */}
                <td className="p-2.5 font-mono text-[#7d8590] align-middle text-[11px]">
                  <div>{dep.duration}</div>
                  <div className="text-[9.5px] text-[#484f58]">{dep.timestamp}</div>
                </td>

                {/* Actions: Re-deploy */}
                <td className="p-2.5 align-middle text-right">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

