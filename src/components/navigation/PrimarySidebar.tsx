import React from 'react';
import {
  Layers,
  FolderGit2,
  Activity,
  Github,
  Sparkles,
  Settings,
} from 'lucide-react';
import { ActiveRoute } from '../../types';
import { YGitLogo } from '../brand/YGitLogo';

export interface PrimarySidebarProps {
  activeRoute: ActiveRoute;
  setActiveRoute: (route: ActiveRoute) => void;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  projectsCount?: number;
  deploymentsCount?: number;
  templatesCount?: number;
  isGithubConnected?: boolean;
  isCloudflareConnected?: boolean;
  isWorkerOnline?: boolean;
}

/**
 * Primary Global Platform Sidebar
 * Reference: SIDEBAR.md (Section 3)
 * Dimensions: 190px (Expanded) / 54px (Collapsed)
 * Background: #161b22 (Canvas Subtle) | Border-Right: #30363d
 */
export const PrimarySidebar: React.FC<PrimarySidebarProps> = ({
  activeRoute,
  setActiveRoute,
  isCollapsed,
  setIsCollapsed,
  projectsCount = 0,
  deploymentsCount = 0,
  templatesCount = 0,
  isGithubConnected = true,
  isCloudflareConnected = true,
  isWorkerOnline = true,
}) => {
  return (
    <aside
      className={`${
        isCollapsed ? 'w-[54px]' : 'w-[190px]'
      } shrink-0 bg-[#161b22] border-r border-[#30363d] flex flex-col justify-between h-screen sticky top-0 select-none z-30 transition-all duration-200 ease-in-out font-sans`}
    >
      <div>
        {/* Header Brand Bar (Design System: YGitLogo) */}
        <YGitLogo
          isCollapsed={isCollapsed}
          onNavigateHome={() => setActiveRoute('dashboard')}
          onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
          showBetaBadge={true}
        />

        {/* Global Navigation Links */}
        <div className="p-1.5 flex flex-col gap-0.5">
          {/* Dashboard Link */}
          <button
            type="button"
            onClick={() => setActiveRoute('dashboard')}
            title={isCollapsed ? 'Dashboard' : undefined}
            className={`w-full flex items-center rounded text-xs transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
            } ${
              activeRoute === 'dashboard'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers
                className={`w-3.5 h-3.5 shrink-0 ${
                  activeRoute === 'dashboard' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'
                }`}
              />
              {!isCollapsed && <span>Dashboard</span>}
            </div>
          </button>

          {/* Projects Link */}
          <button
            type="button"
            onClick={() => setActiveRoute('projects')}
            title={isCollapsed ? `Projects (${projectsCount})` : undefined}
            className={`w-full flex items-center rounded text-xs transition-colors cursor-pointer relative ${
              isCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
            } ${
              activeRoute === 'projects'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <FolderGit2
                className={`w-3.5 h-3.5 shrink-0 ${
                  activeRoute === 'projects' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'
                }`}
              />
              {!isCollapsed && <span>Projects</span>}
            </div>
            {!isCollapsed ? (
              <span className="text-[10px] font-mono text-[#8b949e] bg-[#090d13] px-1 py-0.2 rounded border border-[#21262d]">
                {projectsCount}
              </span>
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-[#1d6cf6] absolute top-1.5 right-1.5"></span>
            )}
          </button>

          {/* Deployments Link */}
          <button
            type="button"
            onClick={() => setActiveRoute('deployments')}
            title={isCollapsed ? `Deployments (${deploymentsCount})` : undefined}
            className={`w-full flex items-center rounded text-xs transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
            } ${
              activeRoute === 'deployments'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Activity
                className={`w-3.5 h-3.5 shrink-0 ${
                  activeRoute === 'deployments' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'
                }`}
              />
              {!isCollapsed && <span>Deployments</span>}
            </div>
            {!isCollapsed && (
              <span className="text-[10px] font-mono text-[#8b949e] bg-[#090d13] px-1 py-0.2 rounded border border-[#21262d]">
                {deploymentsCount}
              </span>
            )}
          </button>

          {/* Accounts Link */}
          <button
            type="button"
            onClick={() => setActiveRoute('accounts')}
            title={isCollapsed ? 'Connected Accounts' : undefined}
            className={`w-full flex items-center rounded text-xs transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
            } ${
              activeRoute === 'accounts'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Github
                className={`w-3.5 h-3.5 shrink-0 ${
                  activeRoute === 'accounts' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'
                }`}
              />
              {!isCollapsed && <span>Accounts</span>}
            </div>
            {!isCollapsed && (
              <span
                className={`text-[9px] font-mono px-1 py-0.2 rounded border ${
                  isGithubConnected && isCloudflareConnected
                    ? 'text-[#3fb950] bg-[#238636]/10 border-[#238636]/30'
                    : isGithubConnected || isCloudflareConnected
                    ? 'text-[#58a6ff] bg-[#1d6cf6]/10 border-[#1d6cf6]/30'
                    : 'text-[#8b949e] bg-[#090d13] border-[#21262d]'
                }`}
              >
                {isGithubConnected && isCloudflareConnected
                  ? '2 Linked'
                  : isGithubConnected || isCloudflareConnected
                  ? '1 Linked'
                  : '0 Linked'}
              </span>
            )}
          </button>

          {/* Templates Link */}
          <button
            type="button"
            onClick={() => setActiveRoute('templates')}
            title={isCollapsed ? `Templates (${templatesCount})` : undefined}
            className={`w-full flex items-center rounded text-xs transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
            } ${
              activeRoute === 'templates'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles
                className={`w-3.5 h-3.5 shrink-0 ${
                  activeRoute === 'templates' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'
                }`}
              />
              {!isCollapsed && <span>Templates</span>}
            </div>
            {!isCollapsed && (
              <span className="text-[10px] font-mono text-[#8b949e] bg-[#090d13] px-1 py-0.2 rounded border border-[#21262d]">
                {templatesCount}
              </span>
            )}
          </button>

          {/* Settings Link */}
          <button
            type="button"
            onClick={() => setActiveRoute('settings')}
            title={isCollapsed ? 'Platform Settings' : undefined}
            className={`w-full flex items-center rounded text-xs transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
            } ${
              activeRoute === 'settings'
                ? 'bg-[#21262d] text-[#f0f6fc] font-medium'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings
                className={`w-3.5 h-3.5 shrink-0 ${
                  activeRoute === 'settings' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'
                }`}
              />
              {!isCollapsed && <span>Settings</span>}
            </div>
          </button>
        </div>
      </div>

      {/* Worker Status Footer */}
      <div
        className={`border-t border-[#21262d] bg-[#161b22] ${
          isCollapsed ? 'p-2 flex justify-center' : 'p-2'
        }`}
      >
        {!isCollapsed ? (
          <div className="flex items-center justify-between text-[10.5px] text-[#8b949e]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] inline-block"></span>
              <span>Worker</span>
            </span>
            <span className="font-mono text-[9px] text-[#3fb950] font-normal">
              {isWorkerOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>
        ) : (
          <div
            title={`Worker: ${isWorkerOnline ? 'ONLINE' : 'OFFLINE'}`}
            className="w-5 h-5 rounded flex items-center justify-center cursor-default text-[#3fb950]"
          >
            <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse"></span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default PrimarySidebar;
