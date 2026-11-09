import React from 'react';
import { Copy } from 'lucide-react';
import { Project } from '../../types';
import { MetricPill } from '../../components/badges/MetricPill';
import { PrimaryButton, IconButton } from '../../components/buttons';
import { Card, Input } from '../../components/ui';

export interface DashboardViewProps {
  projects: Project[];
  deploymentsCount?: number;
  successRate?: number;
  isDeploying: boolean;
  deployTimer: number;
  repoInputUrl: string;
  onRepoInputUrlChange: (url: string) => void;
  onTriggerDeployment: (repoName: string) => void;
  onCopyToClipboard: (text: string) => void;
  isGithubConnected?: boolean;
  isCloudflareConnected?: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  deploymentsCount = 28,
  successRate = 98,
  isDeploying,
  deployTimer,
  repoInputUrl,
  onRepoInputUrlChange,
  onTriggerDeployment,
  onCopyToClipboard,
  isGithubConnected = true,
  isCloudflareConnected = true,
}) => {
  return (
    <div className="p-3 flex flex-col gap-2 max-w-[1600px] w-full mx-auto animate-in fade-in duration-150 font-sans">
      {/* 
        ========================================================================
        TELEMETRY METRICS STRIP (6 HIGH-DENSITY NODES)
        ========================================================================
      */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {/* Metric 1: Total Projects */}
        <Card variant="default" className="p-2 flex flex-col justify-between">
          <div className="text-[9.5px] font-medium text-fg-muted uppercase">Projects</div>
          <div className="text-sm font-medium text-fg-default font-mono">
            {projects.length.toString().padStart(2, '0')}
          </div>
        </Card>

        {/* Metric 2: Total Deployments */}
        <Card variant="default" className="p-2 flex flex-col justify-between">
          <div className="text-[9.5px] font-medium text-fg-muted uppercase">Deployments</div>
          <div className="text-sm font-medium text-fg-default font-mono">
            {deploymentsCount.toString().padStart(2, '0')}
          </div>
        </Card>

        {/* Metric 3: Success Rate */}
        <Card variant="default" className="p-2 flex flex-col justify-between">
          <div className="text-[9.5px] font-medium text-fg-muted uppercase">Success</div>
          <div className="text-sm font-medium text-accent-green-text font-mono">{successRate}%</div>
        </Card>

        {/* Metric 4: Active Providers */}
        <Card variant="default" className="p-2 flex flex-col justify-between">
          <div className="text-[9.5px] font-medium text-fg-muted uppercase">Providers</div>
          <div className="text-sm font-medium text-accent-green-text font-mono">
            {((isGithubConnected ? 1 : 0) + (isCloudflareConnected ? 1 : 0))}/2
          </div>
        </Card>

        {/* Metric 5: Platform Operational State */}
        <Card variant="default" className="p-2 flex flex-col justify-between">
          <div className="text-[9.5px] font-medium text-fg-muted uppercase">Platform</div>
          <div className="text-xs font-medium text-accent-green-text flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-none bg-accent-green-text"></span> Operational
          </div>
        </Card>

        {/* Metric 6: Queue Engine State */}
        <Card variant="default" className="p-2 flex flex-col justify-between">
          <div className="text-[9.5px] font-medium text-fg-muted uppercase">Queue</div>
          <div className="text-xs font-medium text-fg-muted mt-0.5">
            {isDeploying ? '1 Active' : 'Idle'}
          </div>
        </Card>
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
          <Card variant="default" className="p-2.5 flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-border-default text-xs font-medium text-fg-default">
              <span>Pipeline</span>
              <PrimaryButton
                size="sm"
                onClick={() => onTriggerDeployment('Git Repo')}
              >
                Start
              </PrimaryButton>
            </div>

            {/* 4-Step Visual Progress Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
              <div className="bg-accent-green/10 border border-accent-green/30 rounded-none p-1.5">
                <div className="text-[9px] font-mono text-accent-green-text">0.2s</div>
                <span className="text-[11px] font-medium text-fg-default">1. Paste</span>
              </div>
              <div className="bg-accent-green/10 border border-accent-green/30 rounded-none p-1.5">
                <div className="text-[9px] font-mono text-accent-green-text">1.1s</div>
                <span className="text-[11px] font-medium text-fg-default">2. Analyze</span>
              </div>
              <div className="bg-accent-green/10 border border-accent-green/30 rounded-none p-1.5">
                <div className="text-[9px] font-mono text-accent-green-text">0.6s</div>
                <span className="text-[11px] font-medium text-fg-default">3. Connect</span>
              </div>
              <div className="bg-brand-primary/10 border border-brand-primary/30 rounded-none p-1.5">
                <div className="text-[9px] font-mono text-brand-primary">Active</div>
                <span className="text-[11px] font-medium text-fg-default">4. Deploy</span>
              </div>
            </div>

            {/* Runtime Target Context */}
            <div className="flex items-center justify-between bg-canvas-inset border border-border-default rounded-none px-2 py-1 text-[11px] text-fg-muted">
              <div>Target: <span className="font-medium text-fg-default">Pages</span></div>
              <div>Branch: <span className="font-medium text-fg-default">main</span></div>
              <div>Worker: <span className="font-medium text-accent-green-text">Ready</span></div>
            </div>

            {/* Rapid URL Intake Form */}
            <div className="flex gap-1 items-center">
              <Input
                type="text"
                placeholder="https://github.com/..."
                value={repoInputUrl}
                onChange={(e) => onRepoInputUrlChange(e.target.value)}
                mono={true}
                fullWidth={true}
                className="flex-1"
              />
              <PrimaryButton
                size="sm"
                onClick={() => onTriggerDeployment(repoInputUrl || 'vibtools/app')}
              >
                Deploy
              </PrimaryButton>
            </div>
          </Card>

          {/* Provider Micro-Cards */}
          <div className="grid grid-cols-2 gap-2">
            <Card variant="default" className="p-2 text-xs flex flex-col justify-between gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-medium text-fg-default">GitHub</span>
                <MetricPill variant={isGithubConnected ? 'green' : 'neutral'} size="xs">
                  {isGithubConnected ? 'Connected' : 'Disconnected'}
                </MetricPill>
              </div>
              <div className="bg-canvas-inset border border-border-default p-1.5 rounded-none text-[11px] font-mono text-fg-muted">
                {isGithubConnected ? '@vibtools' : 'No account linked'}
              </div>
            </Card>

            <Card variant="default" className="p-2 text-xs flex flex-col justify-between gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-medium text-fg-default">Cloudflare</span>
                <MetricPill variant={isCloudflareConnected ? 'green' : 'neutral'} size="xs">
                  {isCloudflareConnected ? 'Edge Verified' : 'Disconnected'}
                </MetricPill>
              </div>
              <div className="bg-canvas-inset border border-border-default p-1.5 rounded-none text-[11px] font-mono text-fg-muted">
                {isCloudflareConnected ? '310+ Edge POPs' : 'API token required'}
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column: Live Path & Build Status Feed */}
        <Card variant="default" className="p-2.5 flex flex-col gap-2">
          <div className="flex items-center justify-between pb-1 border-b border-border-default text-xs font-medium text-fg-default">
            <span>Live Path</span>
            <span className="font-mono text-[10px] text-fg-muted">{deployTimer}s</span>
          </div>

          {/* Step Timing Ledger */}
          <div className="flex flex-col gap-1.5 text-[11px]">
            <div className="flex justify-between text-fg-default">
              <span>Repo connected</span>
              <span className="text-fg-subtle font-mono">0.4s</span>
            </div>
            <div className="flex justify-between text-fg-default">
              <span>Analysis done</span>
              <span className="text-fg-subtle font-mono">1.1s</span>
            </div>
            <div className="flex justify-between text-fg-default">
              <span>Accounts ready</span>
              <span className="text-fg-subtle font-mono">0.6s</span>
            </div>
            <div className="flex justify-between text-brand-primary">
              <span>Deploying to Pages</span>
              <span className="font-mono">12.5s</span>
            </div>
          </div>

          {/* Edge Terminal Micro-Feed */}
          <div className="bg-canvas-inset border border-border-default rounded-none p-2 font-mono text-[10px] text-fg-muted flex flex-col gap-0.5">
            <div className="text-accent-green-text">✓ Cloned in 340ms</div>
            <div className="text-accent-green-text">✓ Bundle optimized</div>
            <div className="text-brand-primary">⚡ Uploading chunks...</div>
          </div>

          {/* Live Edge URL Box */}
          <div className="bg-canvas-inset border border-border-default rounded-none px-2 py-1 flex items-center justify-between text-xs">
            <a
              href="https://ygit.pages.dev"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-brand-primary hover:underline truncate"
            >
              ygit.pages.dev
            </a>
            <IconButton
              size="sm"
              icon={<Copy className="w-3 h-3" />}
              title="Copy Edge URL"
              onClick={() => onCopyToClipboard('https://ygit.pages.dev')}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
