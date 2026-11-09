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
 * Characteristics:
 * - 0rem border radius (rounded-none)
 * - Zero box-shadow (shadow-none)
 * - Theme-tokenized (bg-canvas-subtle, border-border-default, text-fg-default)
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
      } shrink-0 bg-canvas-subtle border-r border-border-default flex flex-col justify-between h-screen sticky top-0 select-none z-30 transition-all duration-200 ease-in-out font-sans`}
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
            className={`w-full flex items-center rounded-none text-xs transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
            } ${
              activeRoute === 'dashboard'
                ? 'bg-surface-hover text-fg-default font-medium'
                : 'text-fg-muted hover:bg-surface-hover hover:text-fg-default font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers
                className={`w-3.5 h-3.5 shrink-0 ${
                  activeRoute === 'dashboard' ? 'text-brand-primary' : 'text-fg-muted'
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
            className={`w-full flex items-center rounded-none text-xs transition-colors cursor-pointer relative ${
              isCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
            } ${
              activeRoute === 'projects'
                ? 'bg-surface-hover text-fg-default font-medium'
                : 'text-fg-muted hover:bg-surface-hover hover:text-fg-default font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <FolderGit2
                className={`w-3.5 h-3.5 shrink-0 ${
                  activeRoute === 'projects' ? 'text-brand-primary' : 'text-fg-muted'
                }`}
              />
              {!isCollapsed && <span>Projects</span>}
            </div>
            {!isCollapsed ? (
              <span className="text-[10px] font-mono text-fg-muted bg-canvas-inset px-1 py-0.5 rounded-none border border-border-default">
                {projectsCount}
              </span>
            ) : (
              <span className="w-1.5 h-1.5 rounded-none bg-brand-primary absolute top-1.5 right-1.5"></span>
            )}
          </button>

          {/* Deployments Link */}
          <button
            type="button"
            onClick={() => setActiveRoute('deployments')}
            title={isCollapsed ? `Deployments (${deploymentsCount})` : undefined}
            className={`w-full flex items-center rounded-none text-xs transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
            } ${
              activeRoute === 'deployments'
                ? 'bg-surface-hover text-fg-default font-medium'
                : 'text-fg-muted hover:bg-surface-hover hover:text-fg-default font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Activity
                className={`w-3.5 h-3.5 shrink-0 ${
                  activeRoute === 'deployments' ? 'text-brand-primary' : 'text-fg-muted'
                }`}
              />
              {!isCollapsed && <span>Deployments</span>}
            </div>
            {!isCollapsed && (
              <span className="text-[10px] font-mono text-fg-muted bg-canvas-inset px-1 py-0.5 rounded-none border border-border-default">
                {deploymentsCount}
              </span>
            )}
          </button>

          {/* Accounts Link */}
          <button
            type="button"
            onClick={() => setActiveRoute('accounts')}
            title={isCollapsed ? 'Connected Accounts' : undefined}
            className={`w-full flex items-center rounded-none text-xs transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
            } ${
              activeRoute === 'accounts'
                ? 'bg-surface-hover text-fg-default font-medium'
                : 'text-fg-muted hover:bg-surface-hover hover:text-fg-default font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Github
                className={`w-3.5 h-3.5 shrink-0 ${
                  activeRoute === 'accounts' ? 'text-brand-primary' : 'text-fg-muted'
                }`}
              />
              {!isCollapsed && <span>Accounts</span>}
            </div>
            {!isCollapsed && (
              <span
                className={`text-[9px] font-mono px-1 py-0.5 rounded-none border ${
                  isGithubConnected && isCloudflareConnected
                    ? 'text-accent-green-text bg-accent-green/10 border-accent-green/30'
                    : isGithubConnected || isCloudflareConnected
                    ? 'text-brand-primary bg-brand-primary/10 border-brand-primary/30'
                    : 'text-fg-muted bg-canvas-inset border-border-default'
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
            className={`w-full flex items-center rounded-none text-xs transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
            } ${
              activeRoute === 'templates'
                ? 'bg-surface-hover text-fg-default font-medium'
                : 'text-fg-muted hover:bg-surface-hover hover:text-fg-default font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles
                className={`w-3.5 h-3.5 shrink-0 ${
                  activeRoute === 'templates' ? 'text-brand-primary' : 'text-fg-muted'
                }`}
              />
              {!isCollapsed && <span>Templates</span>}
            </div>
            {!isCollapsed && (
              <span className="text-[10px] font-mono text-fg-muted bg-canvas-inset px-1 py-0.5 rounded-none border border-border-default">
                {templatesCount}
              </span>
            )}
          </button>

          {/* Settings Link */}
          <button
            type="button"
            onClick={() => setActiveRoute('settings')}
            title={isCollapsed ? 'Platform Settings' : undefined}
            className={`w-full flex items-center rounded-none text-xs transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center py-2 px-1' : 'justify-between px-2 py-1.5'
            } ${
              activeRoute === 'settings'
                ? 'bg-surface-hover text-fg-default font-medium'
                : 'text-fg-muted hover:bg-surface-hover hover:text-fg-default font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings
                className={`w-3.5 h-3.5 shrink-0 ${
                  activeRoute === 'settings' ? 'text-brand-primary' : 'text-fg-muted'
                }`}
              />
              {!isCollapsed && <span>Settings</span>}
            </div>
          </button>
        </div>
      </div>

      {/* Worker Status Footer */}
      <div
        className={`border-t border-border-default bg-canvas-subtle ${
          isCollapsed ? 'p-2 flex justify-center' : 'p-2'
        }`}
      >
        {!isCollapsed ? (
          <div className="flex items-center justify-between text-[10.5px] text-fg-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-none bg-accent-green-text inline-block"></span>
              <span>Worker</span>
            </span>
            <span className="font-mono text-[9px] text-accent-green-text font-normal">
              {isWorkerOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>
        ) : (
          <div
            title={`Worker: ${isWorkerOnline ? 'ONLINE' : 'OFFLINE'}`}
            className="w-5 h-5 rounded-none flex items-center justify-center cursor-default text-accent-green-text"
          >
            <span className="w-2 h-2 rounded-none bg-accent-green-text animate-pulse"></span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default PrimarySidebar;
