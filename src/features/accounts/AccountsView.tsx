/**
 * ============================================================================
 * YGIT PLATFORM UI — STANDALONE MAIN VIEW: ACCOUNTS & INTEGRATIONS
 * FILE: src/features/accounts/AccountsView.tsx
 * ============================================================================
 * 
 * PURPOSE:
 * Connected accounts and provider integration management view.
 * Configures external Git providers (GitHub OAuth) and Cloudflare Pages
 * Edge API credentials with real-time status, detailed metadata, last sync
 * timestamps, granular OAuth scopes tags, and disconnect capabilities.
 * 
 * DESIGN CONSTITUTION:
 * - Component-only architecture: UI built exclusively with Card primitives,
 *   PrimaryButton, SecondaryButton, and DangerOutlineButton.
 * - Zero border radius (`rounded-none`) and zero box shadow (`shadow-none`).
 * - Full Dark/Light dual-theme token coverage via semantic CSS variables.
 * - Monospace precision for technical identifiers (handles, IDs, hashes, timestamps).
 * 
 * DATA CONTRACT:
 * - isGithubConnected: boolean
 * - isCloudflareConnected: boolean
 * - githubLastSync: string
 * - cloudflareLastSync: string
 * - isGithubSyncing: boolean
 * - isCloudflareSyncing: boolean
 * - onSyncGithub: () => void
 * - onToggleGithub: () => void
 * - onSyncCloudflare: () => void
 * - onToggleCloudflare: () => void
 * ============================================================================
 */

import React from 'react';
import { Key, Github, RefreshCw, Cloud, ShieldCheck } from 'lucide-react';
import { PrimaryButton, SecondaryButton, DangerOutlineButton } from '../../components/buttons';
import { Card } from '../../components/ui';

export interface AccountsViewProps {
  isGithubConnected: boolean;
  isCloudflareConnected: boolean;
  githubLastSync: string;
  cloudflareLastSync: string;
  isGithubSyncing: boolean;
  isCloudflareSyncing: boolean;
  onSyncGithub: () => void;
  onToggleGithub: () => void;
  onSyncCloudflare: () => void;
  onToggleCloudflare: () => void;
}

export const AccountsView: React.FC<AccountsViewProps> = ({
  isGithubConnected,
  isCloudflareConnected,
  githubLastSync,
  cloudflareLastSync,
  isGithubSyncing,
  isCloudflareSyncing,
  onSyncGithub,
  onToggleGithub,
  onSyncCloudflare,
  onToggleCloudflare,
}) => {
  return (
    <div className="p-3 sm:p-4 flex flex-col gap-3 max-w-[1400px] w-full mx-auto animate-in fade-in duration-100 font-sans">
      {/* 
        ========================================================================
        1. TOP PROVIDER SUMMARY STRIP (CLEAN & COMPACT)
        ========================================================================
      */}
      <Card variant="default" className="p-2.5 sm:p-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-accent-primary/10 border border-accent-primary/20 text-accent-primary flex items-center justify-center shrink-0 rounded-none shadow-none">
            <Key className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-xs font-medium text-fg-default">
            Connected Accounts
          </h2>
          <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded-none bg-canvas-inset border border-border-subtle text-fg-muted">
            {(isGithubConnected ? 1 : 0) + (isCloudflareConnected ? 1 : 0)} / 2 Active
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-fg-subtle">
          <span>Status:</span>
          <span className="text-emerald-500 font-normal flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none"></span>
            Operational
          </span>
        </div>
      </Card>

      {/* 
        ========================================================================
        2. PROVIDER CARDS GRID
        ========================================================================
      */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* CARD 1: GITHUB INTEGRATION */}
        <Card variant="default" className="p-3.5 flex flex-col justify-between gap-3">
          <div className="flex flex-col gap-2.5">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-none bg-canvas-inset border border-border-subtle flex items-center justify-center text-fg-default shadow-none">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-fg-default">GitHub Integration</div>
                  <div className="text-[10.5px] text-fg-subtle">Source Code & Push Webhooks</div>
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 text-[9.5px] font-mono px-2 py-0.5 rounded-none border ${
                  isGithubConnected
                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                    : 'bg-canvas-inset text-fg-muted border-border-subtle'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-none ${isGithubConnected ? 'bg-emerald-500' : 'bg-fg-subtle'}`}
                ></span>
                <span>{isGithubConnected ? 'Connected' : 'Disconnected'}</span>
              </span>
            </div>

            {/* Connected Details */}
            {isGithubConnected ? (
              <div className="flex flex-col gap-2.5 text-xs">
                {/* Basic Details Grid */}
                <div className="bg-canvas-inset border border-border-subtle rounded-none p-2.5 flex flex-col gap-1.5 font-mono text-[11px] shadow-none">
                  <div className="flex justify-between items-center text-fg-muted">
                    <span>Account Handle</span>
                    <span className="text-fg-default font-medium">@vibtools (Organization)</span>
                  </div>
                  <div className="flex justify-between items-center text-fg-muted">
                    <span>Linked Repositories</span>
                    <span className="text-fg-default">12 Repositories accessible</span>
                  </div>
                  <div className="flex justify-between items-center text-fg-muted">
                    <span>Webhook Engine</span>
                    <span className="text-emerald-500">Active (Auto-deploy on push)</span>
                  </div>
                  <div className="flex justify-between items-center text-fg-muted">
                    <span>Connected Since</span>
                    <span className="text-fg-default">2026-Sep-12</span>
                  </div>
                  <div className="flex justify-between items-center text-fg-muted">
                    <span>Last Sync</span>
                    <span className="text-accent-primary">{githubLastSync}</span>
                  </div>
                </div>

                {/* Scopes Tag List */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase text-fg-subtle tracking-wider">
                    Granted OAuth Scopes
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {[
                      'repo (Full Control)',
                      'read:org',
                      'write:repo_hook',
                      'user:email',
                      'workflow',
                    ].map((scope) => (
                      <span
                        key={scope}
                        className="text-[9.5px] font-mono px-2 py-0.5 rounded-none bg-canvas-subtle text-accent-primary border border-border-subtle font-normal shadow-none"
                      >
                        {scope}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Disconnected State View */
              <div className="bg-canvas-inset border border-border-subtle rounded-none p-3 flex flex-col gap-2 text-xs shadow-none">
                <p className="text-fg-muted leading-relaxed">
                  Connect your GitHub account to import repositories and enable automated Git push Jamstack deployments.
                </p>
                <div className="text-[10.5px] text-fg-subtle">
                  Requires read access to repo contents and webhook write access.
                </div>
              </div>
            )}
          </div>

          {/* Card Action Buttons */}
          <div className="pt-2 border-t border-border-subtle flex items-center justify-between gap-2">
            {isGithubConnected ? (
              <>
                <SecondaryButton
                  size="sm"
                  onClick={onSyncGithub}
                  disabled={isGithubSyncing}
                  isLoading={isGithubSyncing}
                  loadingText="Syncing..."
                  icon={<RefreshCw className="w-3 h-3 text-fg-subtle" />}
                >
                  Re-sync Account
                </SecondaryButton>

                <DangerOutlineButton
                  size="sm"
                  onClick={onToggleGithub}
                >
                  Disconnect
                </DangerOutlineButton>
              </>
            ) : (
              <PrimaryButton
                fullWidth
                size="md"
                onClick={onToggleGithub}
                disabled={isGithubSyncing}
                isLoading={isGithubSyncing}
                loadingText="Connecting GitHub..."
                icon={<Github className="w-3.5 h-3.5" />}
              >
                Connect GitHub Account
              </PrimaryButton>
            )}
          </div>
        </Card>

        {/* CARD 2: CLOUDFLARE PAGES & EDGE INTEGRATION */}
        <Card variant="default" className="p-3.5 flex flex-col justify-between gap-3">
          <div className="flex flex-col gap-2.5">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-none bg-canvas-inset border border-border-subtle flex items-center justify-center text-amber-500 shadow-none">
                  <Cloud className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-fg-default">Cloudflare Pages & Edge API</div>
                  <div className="text-[10.5px] text-fg-subtle">Edge Network & Serverless Runtimes</div>
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 text-[9.5px] font-mono px-2 py-0.5 rounded-none border ${
                  isCloudflareConnected
                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                    : 'bg-canvas-inset text-fg-muted border-border-subtle'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-none ${isCloudflareConnected ? 'bg-emerald-500' : 'bg-fg-subtle'}`}
                ></span>
                <span>{isCloudflareConnected ? 'Verified' : 'Disconnected'}</span>
              </span>
            </div>

            {/* Connected Details */}
            {isCloudflareConnected ? (
              <div className="flex flex-col gap-2.5 text-xs">
                {/* Basic Details Grid */}
                <div className="bg-canvas-inset border border-border-subtle rounded-none p-2.5 flex flex-col gap-1.5 font-mono text-[11px] shadow-none">
                  <div className="flex justify-between items-center text-fg-muted">
                    <span>Account Name</span>
                    <span className="text-fg-default font-medium">VibTools Cloudflare (Production)</span>
                  </div>
                  <div className="flex justify-between items-center text-fg-muted">
                    <span>Account ID</span>
                    <span className="text-fg-default select-all">cf_acc_9014882194</span>
                  </div>
                  <div className="flex justify-between items-center text-fg-muted">
                    <span>Edge POPs</span>
                    <span className="text-emerald-500">310+ Global Edge Locations</span>
                  </div>
                  <div className="flex justify-between items-center text-fg-muted">
                    <span>Database Bindings</span>
                    <span className="text-fg-default">KV, D1 SQL, R2 Buckets</span>
                  </div>
                  <div className="flex justify-between items-center text-fg-muted">
                    <span>Last Verified</span>
                    <span className="text-accent-primary">{cloudflareLastSync}</span>
                  </div>
                </div>

                {/* Scopes Tag List */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase text-fg-subtle tracking-wider">
                    API Scopes & Permissions
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {[
                      'pages:write',
                      'workers_kv:edit',
                      'd1:edit',
                      'r2:admin',
                      'dns:edit',
                    ].map((scope) => (
                      <span
                        key={scope}
                        className="text-[9.5px] font-mono px-2 py-0.5 rounded-none bg-canvas-subtle text-purple-400 border border-border-subtle font-normal shadow-none"
                      >
                        {scope}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Disconnected State View */
              <div className="bg-canvas-inset border border-border-subtle rounded-none p-3 flex flex-col gap-2 text-xs shadow-none">
                <p className="text-fg-muted leading-relaxed">
                  Connect your Cloudflare account to publish fast static web apps to Cloudflare Pages (*.pages.dev) and configure custom domains.
                </p>
                <div className="text-[10.5px] text-fg-subtle">
                  Requires Pages write and KV/D1 database bindings authorization.
                </div>
              </div>
            )}
          </div>

          {/* Card Action Buttons */}
          <div className="pt-2 border-t border-border-subtle flex items-center justify-between gap-2">
            {isCloudflareConnected ? (
              <>
                <SecondaryButton
                  size="sm"
                  onClick={onSyncCloudflare}
                  disabled={isCloudflareSyncing}
                  isLoading={isCloudflareSyncing}
                  loadingText="Verifying..."
                  icon={<RefreshCw className="w-3 h-3 text-fg-subtle" />}
                >
                  Verify API Token
                </SecondaryButton>

                <DangerOutlineButton
                  size="sm"
                  onClick={onToggleCloudflare}
                >
                  Disconnect
                </DangerOutlineButton>
              </>
            ) : (
              <PrimaryButton
                fullWidth
                size="md"
                onClick={onToggleCloudflare}
                disabled={isCloudflareSyncing}
                isLoading={isCloudflareSyncing}
                loadingText="Verifying Credentials..."
                icon={<Cloud className="w-3.5 h-3.5" />}
              >
                Connect Cloudflare API
              </PrimaryButton>
            )}
          </div>
        </Card>
      </div>

      {/* 
        ========================================================================
        3. SECURITY & CREDENTIAL PRIVACY SAFEGUARD
        ========================================================================
      */}
      <Card variant="subtle" className="p-3 flex items-start gap-2.5 text-xs text-fg-muted">
        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-0.5">
          <span className="text-fg-default font-medium text-[11.5px]">Zero Secret Leakage Guarantee</span>
          <p className="text-[11px] leading-relaxed text-fg-muted">
            All OAuth tokens and API keys are stored in encrypted hardware-backed memory enclaves. Build workers run in isolated sandboxes with zero code execution privileges on provider host machines.
          </p>
        </div>
      </Card>
    </div>
  );
};
