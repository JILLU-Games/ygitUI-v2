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
 * Reference: SIDEBAR.md (Section 4)
 * Width: 195px (Fixed)
 * Background: #12161d (Dark Inset Charcoal) | Border-Right: #30363d
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
    <aside className="w-[195px] shrink-0 bg-[#12161d] border-r border-[#30363d] flex flex-col justify-between h-screen sticky top-0 select-none z-20 font-sans">
      <div>
        {/* Project Context Header */}
        <div className="p-2.5 border-b border-[#21262d] flex flex-col gap-0.5">
          <div className="text-xs font-medium text-[#f0f6fc] truncate">{projectName}</div>
          <div className="text-[10px] font-mono text-[#7d8590] truncate">{projectRepo}</div>
        </div>

        {/* Workspace Sub-Navigation Tabs */}
        <div className="p-1.5 flex flex-col gap-0.5">
          {/* Overview */}
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers
                className={`w-3.5 h-3.5 ${
                  activeTab === 'overview' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'
                }`}
              />
              <span>Overview</span>
            </div>
          </button>

          {/* Variables */}
          <button
            type="button"
            onClick={() => setActiveTab('env')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
              activeTab === 'env'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Key
                className={`w-3.5 h-3.5 ${
                  activeTab === 'env' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'
                }`}
              />
              <span>Variables</span>
            </div>
            <span className="text-[9px] font-mono px-1 rounded bg-[#090d13] border border-[#21262d] text-[#8b949e]">
              {envVarsCount}
            </span>
          </button>

          {/* Cloudflare */}
          <button
            type="button"
            onClick={() => setActiveTab('cloudflare')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
              activeTab === 'cloudflare'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Cloud
                className={`w-3.5 h-3.5 ${
                  activeTab === 'cloudflare' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'
                }`}
              />
              <span>Cloudflare</span>
            </div>
          </button>

          {/* Domains */}
          <button
            type="button"
            onClick={() => setActiveTab('domains')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
              activeTab === 'domains'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Globe
                className={`w-3.5 h-3.5 ${
                  activeTab === 'domains' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'
                }`}
              />
              <span>Domains</span>
            </div>
          </button>

          {/* Logs */}
          <button
            type="button"
            onClick={() => setActiveTab('logs')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
              activeTab === 'logs'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Terminal
                className={`w-3.5 h-3.5 ${
                  activeTab === 'logs' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'
                }`}
              />
              <span>Logs</span>
            </div>
          </button>

          {/* History */}
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
              activeTab === 'history'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <History
                className={`w-3.5 h-3.5 ${
                  activeTab === 'history' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'
                }`}
              />
              <span>History</span>
            </div>
          </button>
        </div>
      </div>

      {/* Quick Action Footer */}
      <div className="p-2 border-t border-[#21262d] bg-[#12161d]">
        <button
          type="button"
          onClick={onReScan}
          className="w-full bg-[#21262d] hover:bg-[#282e36] text-[#c9d1d9] hover:text-[#f0f6fc] border border-[#21262d] py-1 text-[10.5px] font-normal rounded flex items-center justify-center gap-1 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3 h-3 text-[#7d8590]" />
          <span>Re-scan</span>
        </button>
      </div>
    </aside>
  );
};

export default SecondarySidebar;
