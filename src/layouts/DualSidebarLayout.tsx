import React from 'react';
import { ActiveRoute, WorkspaceTab } from '../types';
import { PrimarySidebar, SecondarySidebar } from '../components/navigation';

export interface DualSidebarLayoutProps {
  activeRoute: ActiveRoute;
  setActiveRoute: (route: ActiveRoute) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  projectsCount?: number;
  deploymentsCount?: number;
  templatesCount?: number;
  isGithubConnected?: boolean;
  isCloudflareConnected?: boolean;
  isWorkerOnline?: boolean;

  // Secondary Project Sidebar Props
  currentProject?: { name: string; repo: string };
  workspaceTab?: WorkspaceTab;
  setWorkspaceTab?: (tab: WorkspaceTab) => void;
  envVarsCount?: number;
  onReScan?: () => void;

  children: React.ReactNode;
}

/**
 * Dual-Sidebar Viewport Orchestrator Shell
 * Reference: SIDEBAR.md (Section 1)
 * Preserves the 3-tier background brightness stepping:
 * - Primary Sidebar: #161b22 (Subtle)
 * - Secondary Sidebar: #12161d (Dark Inset Charcoal)
 * - Content Canvas: #0d1117 (Deep Background)
 */
export const DualSidebarLayout: React.FC<DualSidebarLayoutProps> = ({
  activeRoute,
  setActiveRoute,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  projectsCount = 0,
  deploymentsCount = 0,
  templatesCount = 0,
  isGithubConnected = true,
  isCloudflareConnected = true,
  isWorkerOnline = true,
  currentProject,
  workspaceTab = 'overview',
  setWorkspaceTab,
  envVarsCount = 0,
  onReScan,
  children,
}) => {
  return (
    <div className="flex min-h-screen bg-[#0d1117] text-[#f0f6fc] font-sans antialiased selection:bg-[#1d6cf6] selection:text-white">
      {/* 1. PRIMARY SIDEBAR (Platform-Scoped) */}
      <PrimarySidebar
        activeRoute={activeRoute}
        setActiveRoute={setActiveRoute}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        projectsCount={projectsCount}
        deploymentsCount={deploymentsCount}
        templatesCount={templatesCount}
        isGithubConnected={isGithubConnected}
        isCloudflareConnected={isCloudflareConnected}
        isWorkerOnline={isWorkerOnline}
      />

      {/* 2. SECONDARY PROJECT SIDEBAR (Workspace-Scoped) */}
      {activeRoute === 'project-workspace' && currentProject && setWorkspaceTab && (
        <SecondarySidebar
          projectName={currentProject.name}
          projectRepo={currentProject.repo}
          activeTab={workspaceTab}
          setActiveTab={setWorkspaceTab}
          envVarsCount={envVarsCount}
          onReScan={onReScan}
        />
      )}

      {/* 3. MAIN VIEWPORT CANVAS */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0d1117]">
        {children}
      </main>
    </div>
  );
};

export default DualSidebarLayout;
