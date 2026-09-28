/**
 * ============================================================================
 * YGIT PLATFORM UI — WORKSPACE SUB-TAB: HISTORY
 * FILE: src/features/workspace/tabs/HistoryTab.tsx
 * ============================================================================
 * 
 * PURPOSE:
 * Chronological deployment history table for the selected project with
 * commit SHAs, branch tracking, status pills, and build latency readouts.
 * ============================================================================
 */

import React from 'react';

export interface HistoryTabProps {
  currentProject: { name: string; repo: string };
}

export const HistoryTab: React.FC<HistoryTabProps> = () => {
  return (
    <div className="border border-[#21262d] rounded bg-[#090d13] text-xs animate-in fade-in duration-150">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#21262d] text-[9.5px] font-mono uppercase text-[#7d8590]">
            <th className="p-2">Commit</th>
            <th className="p-2">Branch</th>
            <th className="p-2">Status</th>
            <th className="p-2">Time</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#21262d]">
          {[
            { sha: '7f3b891', branch: 'main', status: 'Live', time: '14.8s' },
            { sha: '6a1c842', branch: 'main', status: 'Passed', time: '12.2s' },
            { sha: '5e9f110', branch: 'main', status: 'Passed', time: '11.0s' },
          ].map((b, i) => (
            <tr key={i} className="hover:bg-[#161b22]/50 transition-colors">
              <td className="p-2 font-mono text-[#58a6ff]">{b.sha}</td>
              <td className="p-2 font-mono text-[#8b949e]">{b.branch}</td>
              <td className="p-2 text-[#3fb950]">● {b.status}</td>
              <td className="p-2 font-mono text-[#7d8590]">{b.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
