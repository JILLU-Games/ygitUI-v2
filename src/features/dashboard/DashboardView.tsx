/**
 * ============================================================================
 * YGIT PLATFORM UI — STANDALONE MAIN VIEW: DASHBOARD
 * FILE: src/features/dashboard/DashboardView.tsx
 * ============================================================================
 * 
 * PURPOSE:
 * Executive telemetry console and rapid intake pipeline launcher.
 * Displays high-density operational telemetry (Projects count, Deployments count,
 * Success rate, Provider connectivity, Platform operational state, and Build queue),
 * coupled with a 4-step pipeline preview and quick repository deploy trigger.
 * 
 * ARCHITECTURE & LIFECYCLE:
 * 1. Telemetry Strip: 6-metric responsive grid with monospace precision.
 * 2. Rapid Pipeline Card:
 *    - 4-step visual progress breakdown (1. Paste 0.2s, 2. Analyze 1.1s, 3. Connect 0.6s, 4. Deploy Active).
 *    - Target resolution summary (Target: Pages, Branch: main, Worker: Ready).
 *    - Direct URL intake input with instant "Deploy" action.
 * 3. Provider Connectivity Micro-Cards:
 *    - GitHub integration status (@vibtools).
 *    - Cloudflare Edge verification status (Edge Verified).
 * 4. Live Edge Telemetry:
 *    - Step timing ledger with real-time deploy timer clock.
 *    - Real-time build milestone checklist (Cloned in 340ms, Bundle optimized, Uploading chunks...).
 *    - Live default deployment link (ygit.pages.dev) with 1-click clipboard copy.
 * 
 * DATA CONTRACT:
 * - projects: Project[] (to display current project count)
 * - isDeploying: boolean (shows queue active/idle state)
 * - deployTimer: number (elapsed seconds on active deployments)
 * - repoInputUrl: string (quick deploy input state)
 * - onRepoInputUrlChange: (url: string) => void
 * - onTriggerDeployment: (repoName: string) => void
 * - onCopyToClipboard: (text: string) => void
 * ============================================================================
 */

import React from 'react';
import { Copy } from 'lucide-react';
import { Project } from '../../types';

export interface DashboardViewProps {
  projects: Project[];
  isDeploying: boolean;
  deployTimer: number;
  repoInputUrl: string;
  onRepoInputUrlChange: (url: string) => void;
  onTriggerDeployment: (repoName: string) => void;
  onCopyToClipboard: (text: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  isDeploying,
  deployTimer,
  repoInputUrl,
  onRepoInputUrlChange,
  onTriggerDeployment,
  onCopyToClipboard,
}) => {
  return (
    <div className="p-3 flex flex-col gap-2 max-w-[1600px] w-full mx-auto animate-in fade-in duration-150">
      {/* 
        ========================================================================
        TELEMETRY METRICS STRIP (6 HIGH-DENSITY NODES)
        Shows real-time platform statistics with monospace numerical readouts.
        ========================================================================
      */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {/* Metric 1: Total Projects */}
        <div className="bg-[#161b22] border border-[#30363d] rounded p-2">
          <div className="text-[9.5px] font-semibold text-[#8b949e] uppercase">Projects</div>
          <div className="text-sm font-semibold text-[#f0f6fc] font-mono">
            {projects.length.toString().padStart(2, '0')}
          </div>
        </div>

        {/* Metric 2: Total Deployments */}
        <div className="bg-[#161b22] border border-[#30363d] rounded p-2">
          <div className="text-[9.5px] font-semibold text-[#8b949e] uppercase">Deployments</div>
          <div className="text-sm font-semibold text-[#f0f6fc] font-mono">28</div>
        </div>

        {/* Metric 3: Success Rate */}
        <div className="bg-[#161b22] border border-[#30363d] rounded p-2">
          <div className="text-[9.5px] font-semibold text-[#8b949e] uppercase">Success</div>
          <div className="text-sm font-semibold text-[#3fb950] font-mono">100%</div>
        </div>

        {/* Metric 4: Active Providers */}
        <div className="bg-[#161b22] border border-[#30363d] rounded p-2">
          <div className="text-[9.5px] font-semibold text-[#8b949e] uppercase">Providers</div>
          <div className="text-sm font-semibold text-[#3fb950] font-mono">2/2</div>
        </div>

        {/* Metric 5: Platform Operational State */}
        <div className="bg-[#161b22] border border-[#30363d] rounded p-2">
          <div className="text-[9.5px] font-semibold text-[#8b949e] uppercase">Platform</div>
          <div className="text-xs font-semibold text-[#3fb950] flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]"></span> Operational
          </div>
        </div>

        {/* Metric 6: Queue Engine State */}
        <div className="bg-[#161b22] border border-[#30363d] rounded p-2">
          <div className="text-[9.5px] font-semibold text-[#8b949e] uppercase">Queue</div>
          <div className="text-xs font-semibold text-[#8b949e] mt-0.5">
            {isDeploying ? '1 Active' : 'Idle'}
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        MAIN SPLIT VIEW: PIPELINE INTAKE (LEFT) & LIVE EDGE TELEMETRY (RIGHT)
        ========================================================================
      */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-2">
        {/* Left Column: Pipeline Execution & Provider Cards */}
        <div className="flex flex-col gap-2">
          {/* Quick Pipeline Intake Card */}
          <div className="bg-[#161b22] border border-[#30363d] rounded p-2.5 flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-[#21262d] text-xs font-semibold text-[#f0f6fc]">
              <span>Pipeline</span>
              <button
                type="button"
                onClick={() => onTriggerDeployment('Git Repo')}
                className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white px-2.5 py-0.5 text-[11px] font-semibold rounded cursor-pointer transition-colors"
              >
                Start
              </button>
            </div>

            {/* 4-Step Visual Progress Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
              <div className="bg-[#238636]/15 border border-[#238636] rounded p-1.5">
                <div className="text-[9px] font-mono text-[#3fb950]">0.2s</div>
                <strong className="text-[11px] text-[#f0f6fc]">1. Paste</strong>
              </div>
              <div className="bg-[#238636]/15 border border-[#238636] rounded p-1.5">
                <div className="text-[9px] font-mono text-[#3fb950]">1.1s</div>
                <strong className="text-[11px] text-[#f0f6fc]">2. Analyze</strong>
              </div>
              <div className="bg-[#238636]/15 border border-[#238636] rounded p-1.5">
                <div className="text-[9px] font-mono text-[#3fb950]">0.6s</div>
                <strong className="text-[11px] text-[#f0f6fc]">3. Connect</strong>
              </div>
              <div className="bg-[#1d6cf6]/15 border border-[#1d6cf6] rounded p-1.5">
                <div className="text-[9px] font-mono text-[#1d6cf6]">Active</div>
                <strong className="text-[11px] text-[#f0f6fc]">4. Deploy</strong>
              </div>
            </div>

            {/* Runtime Target Context */}
            <div className="flex items-center justify-between bg-[#090d13] border border-[#21262d] rounded px-2 py-1 text-[11px] text-[#8b949e]">
              <div>Target: <strong className="text-[#f0f6fc]">Pages</strong></div>
              <div>Branch: <strong className="text-[#f0f6fc]">main</strong></div>
              <div>Worker: <strong className="text-[#3fb950]">Ready</strong></div>
            </div>

            {/* Rapid URL Intake Form */}
            <div className="flex gap-1">
              <input
                type="text"
                placeholder="https://github.com/..."
                value={repoInputUrl}
                onChange={(e) => onRepoInputUrlChange(e.target.value)}
                className="flex-1 bg-[#090d13] border border-[#30363d] rounded px-2.5 py-1 text-xs text-[#f0f6fc] font-mono placeholder:text-[#484f58] focus:border-[#1d6cf6] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => onTriggerDeployment(repoInputUrl || 'vibtools/app')}
                className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white text-xs font-semibold px-3 py-1 rounded cursor-pointer transition-colors"
              >
                Deploy
              </button>
            </div>
          </div>

          {/* Provider Micro-Cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#161b22] border border-[#30363d] rounded p-2 text-xs">
              <div className="flex items-center justify-between mb-1">
                <strong className="text-[#f0f6fc]">GitHub</strong>
                <span className="text-[9.5px] text-[#3fb950]">Connected</span>
              </div>
              <div className="bg-[#090d13] p-1.5 rounded text-[11px] font-mono text-[#8b949e]">@vibtools</div>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded p-2 text-xs">
              <div className="flex items-center justify-between mb-1">
                <strong className="text-[#f0f6fc]">Cloudflare</strong>
                <span className="text-[9.5px] text-[#3fb950]">Connected</span>
              </div>
              <div className="bg-[#090d13] p-1.5 rounded text-[11px] font-mono text-[#8b949e]">Edge Verified</div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Path & Build Status Feed */}
        <div className="bg-[#161b22] border border-[#30363d] rounded p-2.5 flex flex-col gap-2">
          <div className="flex items-center justify-between pb-1 border-b border-[#21262d] text-xs font-semibold text-[#f0f6fc]">
            <span>Live Path</span>
            <span className="font-mono text-[10px] text-[#8b949e]">{deployTimer}s</span>
          </div>

          {/* Step Timing Ledger */}
          <div className="flex flex-col gap-1.5 text-[11px]">
            <div className="flex justify-between text-[#f0f6fc]">
              <span>Repo connected</span>
              <span className="text-[#7d8590] font-mono">0.4s</span>
            </div>
            <div className="flex justify-between text-[#f0f6fc]">
              <span>Analysis done</span>
              <span className="text-[#7d8590] font-mono">1.1s</span>
            </div>
            <div className="flex justify-between text-[#f0f6fc]">
              <span>Accounts ready</span>
              <span className="text-[#7d8590] font-mono">0.6s</span>
            </div>
            <div className="flex justify-between text-[#1d6cf6]">
              <span>Deploying to Pages</span>
              <span className="font-mono">12.5s</span>
            </div>
          </div>

          {/* Edge Terminal Micro-Feed */}
          <div className="bg-[#090d13] border border-[#21262d] rounded p-2 font-mono text-[10px] text-[#8b949e] flex flex-col gap-0.5">
            <div className="text-[#3fb950]">✓ Cloned in 340ms</div>
            <div className="text-[#3fb950]">✓ Bundle optimized</div>
            <div className="text-[#1d6cf6]">⚡ Uploading chunks...</div>
          </div>

          {/* Live Edge URL Box */}
          <div className="bg-[#090d13] border border-[#21262d] rounded px-2 py-1 flex items-center justify-between text-xs">
            <a
              href="https://ygit.pages.dev"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[#1d6cf6] hover:underline"
            >
              ygit.pages.dev
            </a>
            <button
              type="button"
              onClick={() => onCopyToClipboard('https://ygit.pages.dev')}
              className="text-[#8b949e] hover:text-[#f0f6fc] cursor-pointer transition-colors p-0.5"
              title="Copy Edge URL"
            >
              <Copy className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
