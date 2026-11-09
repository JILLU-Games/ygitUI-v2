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
 * 
 * DESIGN CONSTITUTION:
 * - Component-only architecture: Card, IconButton, Input, theme tokens.
 * - Zero border radius (`rounded-none`) and zero box shadow (`shadow-none`).
 * - Full Dark/Light dual-theme token coverage via semantic CSS variables.
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
import { Card, Input } from '../../../components/ui';

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
    <div className="flex flex-col gap-2.5 animate-in fade-in duration-100 font-sans">
      {/* 1. TOP DEPLOYMENT EXECUTION ROW */}
      <Card variant="default" className="p-2.5 px-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Status Pill */}
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none text-[10.5px] font-normal border ${
              activeDeploymentStatus === 'running'
                ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                : 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-none ${
                activeDeploymentStatus === 'running' ? 'bg-purple-400 animate-ping' : 'bg-emerald-500'
              }`}
            ></span>
            <span>{activeDeploymentStatus === 'running' ? 'Running' : 'Success'}</span>
          </span>

          {/* Trigger Type */}
          <span className="text-fg-subtle text-[11px] font-normal">Webhook</span>

          {/* Commit & Message */}
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="text-accent-primary hover:underline cursor-pointer select-all">7f3b891</span>
            <span className="text-fg-muted truncate max-w-[280px] sm:max-w-[420px]">
              fix(edge): verified pages edge worker bundle
            </span>
          </div>

          {/* Time & Duration */}
          <div className="flex items-center gap-2 text-[10.5px] text-fg-subtle font-mono">
            <span>{activeDeploymentStatus === 'running' ? 'Just now' : '2 mins ago'}</span>
            <span>·</span>
            <span>{activeDeploymentStatus === 'running' ? `${deployTimer}s` : '00m 18s'}</span>
            <span>·</span>
            <span className="text-fg-muted">Cloudflare Edge</span>
          </div>
        </div>

        {/* Right Pagination Indicator */}
        <div className="flex items-center gap-2 text-[10.5px] text-fg-subtle font-mono">
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
      </Card>

      {/* 2. TERMINAL CONSOLE CARD */}
      <div
        className={`bg-canvas-inset border border-border-default rounded-none flex flex-col overflow-hidden shadow-none transition-all ${
          logFullScreen ? 'fixed inset-4 z-50 bg-canvas-inset' : ''
        }`}
      >
        {/* Controls Header */}
        <div className="bg-canvas-subtle border-b border-border-default px-3 py-1.5 flex flex-wrap items-center justify-between gap-2">
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
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none text-[10.5px] font-normal font-mono border ${
                activeDeploymentStatus === 'running'
                  ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                  : 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-none ${
                  activeDeploymentStatus === 'running' ? 'bg-purple-400 animate-pulse' : 'bg-emerald-500'
                }`}
              ></span>
              <span>{activeDeploymentStatus === 'running' ? 'Running' : 'Finished'}</span>
            </span>
          </div>

          {/* Right Search Input: Find in logs */}
          <div className="w-48 sm:w-64">
            <Input
              type="text"
              placeholder="Find in logs"
              value={logSearch}
              onChange={(e) => onSetLogSearch(e.target.value)}
              prefixIcon={<Search className="w-3.5 h-3.5" />}
              suffixIcon={
                logSearch ? (
                  <button
                    type="button"
                    onClick={() => onSetLogSearch('')}
                    className="text-fg-subtle hover:text-fg-default cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                ) : undefined
              }
              isMono
            />
          </div>
        </div>

        {/* Terminal Log Stream Body */}
        <div
          className={`p-3 font-mono text-[11px] text-fg-muted overflow-y-auto flex flex-col gap-0.5 select-text bg-canvas-inset ${
            logFullScreen ? 'flex-1' : 'h-[440px]'
          }`}
        >
          {deployLogsList
            .filter((entry) => (logSearch ? entry.text.toLowerCase().includes(logSearch.toLowerCase()) : true))
            .map((entry) => {
              return (
                <div
                  key={entry.id}
                  className={`flex items-start gap-3 hover:bg-canvas-subtle/50 px-1.5 py-0.5 rounded-none transition-colors ${
                    logWrapLines ? 'flex-wrap' : 'whitespace-nowrap'
                  }`}
                >
                  {/* Timestamp Column */}
                  {showLogTimestamps && (
                    <span className="text-fg-subtle text-[10.5px] select-none shrink-0 font-mono">
                      {entry.time}
                    </span>
                  )}

                  {/* Message Line with high-contrast readable colors in both light & dark */}
                  <span
                    className={`text-[11px] font-mono leading-tight ${
                      entry.highlight === 'yellow' ||
                      entry.text.startsWith('#11') ||
                      entry.text.startsWith('#14') ||
                      entry.text.startsWith('#12') ||
                      entry.text.startsWith('#13')
                        ? 'text-amber-700 dark:text-amber-400 font-medium'
                        : entry.highlight === 'green' ||
                          entry.text.includes('✓') ||
                          entry.text.includes('Healthy') ||
                          entry.text.includes('Started') ||
                          entry.text.includes('DONE') ||
                          entry.text.includes('✨')
                        ? 'text-emerald-700 dark:text-emerald-400 font-medium'
                        : entry.highlight === 'blue' || entry.text.startsWith('Importing')
                        ? 'text-accent-primary font-medium'
                        : entry.highlight === 'muted' || entry.text.startsWith('---') || entry.text.startsWith('Gracefully')
                        ? 'text-fg-subtle'
                        : 'text-fg-default'
                    }`}
                  >
                    {entry.text}
                  </span>
                </div>
              );
            })}

          {/* Live Streaming Indicator */}
          {activeDeploymentStatus === 'running' && (
            <div className="flex items-center gap-2 text-accent-primary mt-2 px-1.5 text-xs font-mono">
              <span className="inline-block w-2 h-3.5 bg-accent-primary animate-pulse"></span>
              <span className="text-fg-muted text-[10.5px]">Streaming live build chunks... ({deployTimer}s)</span>
            </div>
          )}

          <div ref={logsEndRef} />
        </div>

        {/* Terminal Bottom Telemetry Bar */}
        <div className="bg-canvas-subtle border-t border-border-default px-3.5 py-1.5 flex flex-wrap items-center justify-between text-[10.5px] font-mono text-fg-muted">
          <div className="flex items-center gap-3">
            <span>
              Bundle: <span className="text-fg-default font-mono">142.92 kB</span>
            </span>
            <span>
              Memory: <span className="text-fg-default font-mono">48.2 MB / 512 MB</span>
            </span>
            <span>
              Worker: <span className="text-emerald-500 font-mono">#wk-8924</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://${currentProject.name}.pages.dev`}
              target="_blank"
              rel="noreferrer"
              className="text-accent-primary hover:underline flex items-center gap-1"
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
