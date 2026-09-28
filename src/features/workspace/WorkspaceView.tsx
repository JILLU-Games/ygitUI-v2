/**
 * ============================================================================
 * YGIT PLATFORM UI — POST-SCAN DUAL-SIDEBAR WORKSPACE VIEW
 * FILE: src/features/workspace/WorkspaceView.tsx
 * ============================================================================
 * 
 * PURPOSE:
 * Orchestrates the complete post-scan dual-sidebar workspace across 6 sub-tabs:
 * 1. Overview: Codebase analysis summary, commit verification, instant deploy action.
 * 2. Variables (env): Environment variables table, encrypted secret toggle, production/preview targets.
 * 3. Cloudflare: Auto-resolved Pages build configuration, project name, branch, and bindings.
 * 4. Domains: Free YGIT gateway (*.ygit.net), Pages dev (*.pages.dev), custom domain addition.
 * 5. Logs: Real-time streaming edge terminal build logs with copy logs affordance.
 * 6. History: Chronological deployment history table with commit messages and duration.
 * ============================================================================
 */

import React from 'react';
import {
  OverviewTab,
  OverviewTabProps,
  VariablesTab,
  VariablesTabProps,
  CloudflareTab,
  CloudflareTabProps,
  DomainsTab,
  DomainsTabProps,
  LogsTab,
  LogsTabProps,
  HistoryTab,
  HistoryTabProps,
} from './tabs';

export interface WorkspaceViewProps {
  workspaceTab: 'overview' | 'env' | 'cloudflare' | 'domains' | 'logs' | 'history';
  overviewProps: OverviewTabProps;
  variablesProps: VariablesTabProps;
  cloudflareProps: CloudflareTabProps;
  domainsProps: DomainsTabProps;
  logsProps: LogsTabProps;
  historyProps: HistoryTabProps;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  workspaceTab,
  overviewProps,
  variablesProps,
  cloudflareProps,
  domainsProps,
  logsProps,
  historyProps,
}) => {
  return (
    <div className="p-3 flex flex-col gap-2 max-w-[1400px] w-full mx-auto flex-1 animate-in fade-in duration-150">
      {workspaceTab === 'overview' && <OverviewTab {...overviewProps} />}
      {workspaceTab === 'env' && <VariablesTab {...variablesProps} />}
      {workspaceTab === 'cloudflare' && <CloudflareTab {...cloudflareProps} />}
      {workspaceTab === 'domains' && <DomainsTab {...domainsProps} />}
      {workspaceTab === 'logs' && <LogsTab {...logsProps} />}
      {workspaceTab === 'history' && <HistoryTab {...historyProps} />}
    </div>
  );
};
