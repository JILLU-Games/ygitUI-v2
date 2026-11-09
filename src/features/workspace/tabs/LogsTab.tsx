/**
 * ============================================================================
 * YGIT PLATFORM UI — WORKSPACE SUB-TAB: DEVELOPER LOGS (EDGE TERMINAL)
 * FILE: src/features/workspace/tabs/LogsTab.tsx
 * ============================================================================
 * 
 * PURPOSE:
 * Real-time streaming edge terminal build logs viewer matching Vercel and Cloudflare
 * Dashboard terminal experiences. Features search in logs, timestamp toggle,
 * line wrapping, auto-scroll, fullscreen expansion, and 1-click clipboard copy.
 * ============================================================================
 */

import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  ArrowDown,
  AlignLeft,
  Minimize2,
  Maximize2,
  Copy,
  Download,
  Search,
  X,
  ExternalLink,
} from 'lucide-react';
import { DeployLogEntry } from '../../../types';
import { IconButton } from '../../../components/buttons';

export interface LogsTabProps {
  activeDeploymentStatus: 'running' | 'finished' | 'idle';
  deployTimer: number;
  deployLogsList: DeployLogEntry[];
  logFullScreen: boolean;
  onSetLogFullScreen: (full: boolean) => void;
  showLogTimestamps: boolean;
  onSetShowLogTimestamps: (show: boolean) => void;
  logAutoScroll: boolean;
  onSetLogAutoScroll: (scroll: boolean) => void;
  logWrapLines: boolean;
  onSetLogWrapLines: (wrap: boolean) => void;
  logSearch: string;
  onSetLogSearch: (s: string) => void;
  logsEndRef: React.RefObject<HTMLDivElement | null>;
  currentProject: { name: string; repo: string };
  onCopyToClipboard: (text: string) => void;
  onShowToast: (msg: string) => void;
}

export const LogsTab: React.FC<LogsTabProps> = ({
  activeDeploymentStatus,
  deployTimer,
  deployLogsList,
  logFullScreen,
  onSetLogFullScreen,
  showLogTimestamps,
  onSetShowLogTimestamps,
  logAutoScroll,
  onSetLogAutoScroll,
  logWrapLines,
  onSetLogWrapLines,
  logSearch,
  onSetLogSearch,
  logsEndRef,
  currentProject,
  onCopyToClipboard,
  onShowToast,
}) => {
  return (
    <div className="flex flex-col gap-2.5 animate-in fade-in duration-150">
      {/* 1. TOP DEPLOYMENT EXECUTION ROW */}
      <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 px-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Status Pill */}
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10.5px] font-normal border ${
              activeDeploymentStatus === 'running'
                ? 'bg-[#7950f2]/15 text-[#c084fc] border-[#7950f2]/30'
                : 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/30'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                activeDeploymentStatus === 'running' ? 'bg-[#c084fc] animate-ping' : 'bg-[#3fb950]'
              }`}
            ></span>
            <span>{activeDeploymentStatus === 'running' ? 'Running' : 'Success'}</span>
          </span>

          {/* Trigger Type */}
          <span className="text-[#8b949e] text-[11px] font-normal">Webhook</span>

          {/* Commit & Message */}
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="text-[#58a6ff] hover:underline cursor-pointer">7f3b891</span>
            <span className="text-[#8b949e] truncate max-w-[280px] sm:max-w-[420px]">
              fix(edge): verified pages edge worker bundle
            </span>
          </div>

          {/* Time & Duration */}
          <div className="flex items-center gap-2 text-[10.5px] text-[#7d8590] font-mono">
            <span>{activeDeploymentStatus === 'running' ? 'Just now' : '2 mins ago'}</span>
            <span>·</span>
            <span>{activeDeploymentStatus === 'running' ? `${deployTimer}s` : '00m 18s'}</span>
            <span>·</span>
            <span className="text-[#8b949e]">Cloudflare Edge</span>
          </div>
        </div>

        {/* Right Pagination Indicator */}
        <div className="flex items-center gap-2 text-[10.5px] text-[#7d8590] font-mono">
          <span>1-3 of 18</span>
          <div className="flex items-center gap-1">
            <IconButton
              size="xs"
              variant="outline"
              aria-label="Previous page"
              icon={<ArrowLeft className="w-3 h-3" />}
            />
            <IconButton
              size="xs"
              variant="outline"
              aria-label="Next page"
              icon={<ArrowRight className="w-3 h-3" />}
            />
          </div>
        </div>
      </div>

      {/* 2. TERMINAL CONSOLE CARD */}
      <div
        className={`bg-[#090d13] border border-[#21262d] rounded flex flex-col overflow-hidden shadow-sm transition-all ${
          logFullScreen ? 'fixed inset-4 z-50 bg-[#090d13]' : ''
        }`}
      >
        {/* Controls Header */}
        <div className="bg-[#161b22] border-b border-[#21262d] px-3 py-1.5 flex flex-wrap items-center justify-between gap-2">
          {/* Left Icon Controls Group */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Timestamp Toggle */}
            <IconButton
              size="sm"
              variant="outline"
              isActive={showLogTimestamps}
              onClick={() => onSetShowLogTimestamps(!showLogTimestamps)}
              aria-label="Toggle Timestamps"
              title="Toggle Timestamps"
              icon={<Clock className="w-3.5 h-3.5" />}
            />

            {/* Scroll To Bottom */}
            <IconButton
              size="sm"
              variant="outline"
              isActive={logAutoScroll}
              onClick={() => {
                onSetLogAutoScroll(true);
                logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="Scroll to bottom"
              title="Scroll to bottom"
              icon={<ArrowDown className="w-3.5 h-3.5" />}
            />

            {/* Line Wrap Toggle */}
            <IconButton
              size="sm"
              variant="outline"
              isActive={logWrapLines}
              onClick={() => onSetLogWrapLines(!logWrapLines)}
              aria-label="Toggle line wrapping"
              title="Toggle line wrapping"
              icon={<AlignLeft className="w-3.5 h-3.5" />}
            />

            {/* Expand / Fullscreen */}
            <IconButton
              size="sm"
              variant="outline"
              onClick={() => onSetLogFullScreen(!logFullScreen)}
              aria-label={logFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
              title={logFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
              icon={logFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            />

            {/* Copy Logs */}
            <IconButton
              size="sm"
              variant="outline"
              onClick={() => {
                const allText = deployLogsList.map((l) => `${l.time}  ${l.text}`).join('\n');
                onCopyToClipboard(allText);
              }}
              aria-label="Copy logs"
              title="Copy logs"
              icon={<Copy className="w-3.5 h-3.5" />}
            />

            {/* Download Logs */}
            <IconButton
              size="sm"
              variant="outline"
              onClick={() => onShowToast('Downloading deployment.log')}
              aria-label="Download .log file"
              title="Download .log file"
              icon={<Download className="w-3.5 h-3.5" />}
            />

            {/* Status Finished / Running Pill */}
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10.5px] font-normal font-mono border ${
                activeDeploymentStatus === 'running'
                  ? 'bg-[#7950f2]/15 text-[#c084fc] border-[#7950f2]/30'
                  : 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/30'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  activeDeploymentStatus === 'running' ? 'bg-[#c084fc] animate-pulse' : 'bg-[#3fb950]'
                }`}
              ></span>
              <span>{activeDeploymentStatus === 'running' ? 'Running' : 'Finished'}</span>
            </span>
          </div>

          {/* Right Search Input: Find in logs */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#7d8590] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Find in logs"
              value={logSearch}
              onChange={(e) => onSetLogSearch(e.target.value)}
              className="bg-[#090d13] border border-[#21262d] rounded text-xs text-[#f0f6fc] pl-8 pr-3 py-1 w-48 sm:w-64 focus:outline-none focus:border-[#1d6cf6] transition-colors font-mono"
            />
            {logSearch && (
              <button
                type="button"
                onClick={() => onSetLogSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7d8590] hover:text-[#f0f6fc]"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Terminal Log Stream Body */}
        <div
          className={`p-3 font-mono text-[11px] text-[#8b949e] overflow-y-auto flex flex-col gap-0.5 select-text bg-[#090d13] ${
            logFullScreen ? 'flex-1' : 'h-[440px]'
          }`}
        >
          {deployLogsList
            .filter((entry) => (logSearch ? entry.text.toLowerCase().includes(logSearch.toLowerCase()) : true))
            .map((entry) => {
              return (
                <div
                  key={entry.id}
                  className={`flex items-start gap-3 hover:bg-[#161b22]/50 px-1.5 py-0.5 rounded transition-colors ${
                    logWrapLines ? 'flex-wrap' : 'whitespace-nowrap'
                  }`}
                >
                  {/* Timestamp Column */}
                  {showLogTimestamps && (
                    <span className="text-[#6e7681] text-[10.5px] select-none shrink-0 font-mono">
                      {entry.time}
                    </span>
                  )}

                  {/* Message Line with subtle balanced colors */}
                  <span
                    className={`text-[11px] font-mono leading-tight ${
                      entry.highlight === 'yellow' ||
                      entry.text.startsWith('#11') ||
                      entry.text.startsWith('#14') ||
                      entry.text.startsWith('#12') ||
                      entry.text.startsWith('#13')
                        ? 'text-[#e3b341]'
                        : entry.highlight === 'green' ||
                          entry.text.includes('✓') ||
                          entry.text.includes('Healthy') ||
                          entry.text.includes('Started') ||
                          entry.text.includes('DONE') ||
                          entry.text.includes('✨')
                        ? 'text-[#3fb950]'
                        : entry.highlight === 'blue' || entry.text.startsWith('Importing')
                        ? 'text-[#58a6ff]'
                        : entry.highlight === 'muted' || entry.text.startsWith('---') || entry.text.startsWith('Gracefully')
                        ? 'text-[#6e7681]'
                        : 'text-[#f0f6fc]'
                    }`}
                  >
                    {entry.text}
                  </span>
                </div>
              );
            })}

          {/* Live Streaming Indicator */}
          {activeDeploymentStatus === 'running' && (
            <div className="flex items-center gap-2 text-[#58a6ff] mt-2 px-1.5 text-xs font-mono">
              <span className="inline-block w-2 h-3.5 bg-[#58a6ff] animate-pulse"></span>
              <span className="text-[#8b949e] text-[10.5px]">Streaming live build chunks... ({deployTimer}s)</span>
            </div>
          )}

          <div ref={logsEndRef} />
        </div>

        {/* Terminal Bottom Telemetry Bar */}
        <div className="bg-[#161b22] border-t border-[#21262d] px-3.5 py-1.5 flex flex-wrap items-center justify-between text-[10.5px] font-mono text-[#8b949e]">
          <div className="flex items-center gap-3">
            <span>
              Bundle: <span className="text-[#f0f6fc] font-mono">142.92 kB</span>
            </span>
            <span>
              Memory: <span className="text-[#f0f6fc] font-mono">48.2 MB / 512 MB</span>
            </span>
            <span>
              Worker: <span className="text-[#3fb950] font-mono">#wk-8924</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://${currentProject.name}.pages.dev`}
              target="_blank"
              rel="noreferrer"
              className="text-[#58a6ff] hover:underline flex items-center gap-1"
            >
              <span>{currentProject.name}.pages.dev</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
