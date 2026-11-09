import React from 'react';
import {
  Layers,
  Key,
  Cloud,
  Globe,
  Terminal,
  History,
  RotateCcw,
} from 'lucide-react';
import { WorkspaceTab } from '../../types';

export interface SecondarySidebarProps {
  projectName: string;
  projectRepo: string;
  activeTab: WorkspaceTab;
  setActiveTab: (tab: WorkspaceTab) => void;
  envVarsCount?: number;
  onReScan?: () => void;
}

/**
 * Secondary Project Workspace Sidebar
 * Characteristics:
 * - 0rem border radius (rounded-none)
 * - Zero box-shadow (shadow-none)
 * - Theme-tokenized (bg-canvas-inset-secondary, border-border-default, text-fg-default)
 */
export const SecondarySidebar: React.FC<SecondarySidebarProps> = ({
  projectName,
  projectRepo,
  activeTab,
  setActiveTab,
  envVarsCount = 0,
  onReScan,
}) => {
  return (
    <aside className="w-[195px] shrink-0 bg-canvas-inset-secondary border-r border-border-default flex flex-col justify-between h-screen sticky top-0 select-none z-20 font-sans">
      <div>
        {/* Project Context Header */}
        <div className="p-2.5 border-b border-border-default flex flex-col gap-0.5">
          <div className="text-xs font-medium text-fg-default truncate">{projectName}</div>
          <div className="text-[10px] font-mono text-fg-muted truncate">{projectRepo}</div>
        </div>

        {/* Workspace Sub-Navigation Tabs */}
        <div className="p-1.5 flex flex-col gap-0.5">
          {/* Overview */}
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded-none text-xs transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-surface-hover text-fg-default font-medium'
                : 'text-fg-muted hover:bg-surface-hover hover:text-fg-default font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers
                className={`w-3.5 h-3.5 ${
                  activeTab === 'overview' ? 'text-brand-primary' : 'text-fg-muted'
                }`}
              />
              <span>Overview</span>
            </div>
          </button>

          {/* Variables */}
          <button
            type="button"
            onClick={() => setActiveTab('env')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded-none text-xs transition-colors cursor-pointer ${
              activeTab === 'env'
                ? 'bg-surface-hover text-fg-default font-medium'
                : 'text-fg-muted hover:bg-surface-hover hover:text-fg-default font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Key
                className={`w-3.5 h-3.5 ${
                  activeTab === 'env' ? 'text-brand-primary' : 'text-fg-muted'
                }`}
              />
              <span>Variables</span>
            </div>
            <span className="text-[9px] font-mono px-1 rounded-none bg-canvas-inset border border-border-default text-fg-muted">
              {envVarsCount}
            </span>
          </button>

          {/* Cloudflare */}
          <button
            type="button"
            onClick={() => setActiveTab('cloudflare')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded-none text-xs transition-colors cursor-pointer ${
              activeTab === 'cloudflare'
                ? 'bg-surface-hover text-fg-default font-medium'
                : 'text-fg-muted hover:bg-surface-hover hover:text-fg-default font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Cloud
                className={`w-3.5 h-3.5 ${
                  activeTab === 'cloudflare' ? 'text-brand-primary' : 'text-fg-muted'
                }`}
              />
              <span>Cloudflare</span>
            </div>
          </button>

          {/* Domains */}
          <button
            type="button"
            onClick={() => setActiveTab('domains')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded-none text-xs transition-colors cursor-pointer ${
              activeTab === 'domains'
                ? 'bg-surface-hover text-fg-default font-medium'
                : 'text-fg-muted hover:bg-surface-hover hover:text-fg-default font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Globe
                className={`w-3.5 h-3.5 ${
                  activeTab === 'domains' ? 'text-brand-primary' : 'text-fg-muted'
                }`}
              />
              <span>Domains</span>
            </div>
          </button>

          {/* Logs */}
          <button
            type="button"
            onClick={() => setActiveTab('logs')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded-none text-xs transition-colors cursor-pointer ${
              activeTab === 'logs'
                ? 'bg-surface-hover text-fg-default font-medium'
                : 'text-fg-muted hover:bg-surface-hover hover:text-fg-default font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Terminal
                className={`w-3.5 h-3.5 ${
                  activeTab === 'logs' ? 'text-brand-primary' : 'text-fg-muted'
                }`}
              />
              <span>Logs</span>
            </div>
          </button>

          {/* History */}
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded-none text-xs transition-colors cursor-pointer ${
              activeTab === 'history'
                ? 'bg-surface-hover text-fg-default font-medium'
                : 'text-fg-muted hover:bg-surface-hover hover:text-fg-default font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <History
                className={`w-3.5 h-3.5 ${
                  activeTab === 'history' ? 'text-brand-primary' : 'text-fg-muted'
                }`}
              />
              <span>History</span>
            </div>
          </button>
        </div>
      </div>

      {/* Quick Action Footer */}
      <div className="p-2 border-t border-border-default bg-canvas-inset-secondary">
        <button
          type="button"
          onClick={onReScan}
          className="w-full bg-canvas-subtle hover:bg-surface-hover text-fg-default border border-border-default py-1 text-[10.5px] font-normal rounded-none shadow-none flex items-center justify-center gap-1 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3 h-3 text-fg-muted" />
          <span>Re-scan</span>
        </button>
      </div>
    </aside>
  );
};

export default SecondarySidebar;
