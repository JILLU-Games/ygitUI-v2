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
 * ARCHITECTURE & LIFECYCLE:
 * 1. Provider Health & Connection Summary Strip:
 *    - Active accounts count indicator (`X / 2 Active`).
 *    - Global provider health status (`Operational` with green pulsing dot).
 * 2. Provider Cards Grid (2-Column Responsive):
 *    - Card 1: GitHub Integration:
 *      * Connected: Handle (@vibtools), Repos count (12 repos accessible),
 *        Webhook Engine (Active), Connected Since, Last Sync.
 *      * Granted OAuth scopes list (`repo`, `read:org`, `write:repo_hook`, `user:email`, `workflow`).
 *      * Actions: Re-sync Account (with spinner) and Disconnect button.
 *      * Disconnected: Overview, permissions notice, and Connect button.
 *    - Card 2: Cloudflare Pages & Edge API:
 *      * Connected: Account Name, Account ID (`cf_acc_9014882194`), Edge POPs (310+ Global Edge Locations),
 *        Database Bindings (KV, D1 SQL, R2 Buckets), Last Verified timestamp.
 *      * API scopes list (`pages:write`, `workers_kv:edit`, `d1:edit`, `r2:admin`, `dns:edit`).
 *      * Actions: Verify API Token (with spinner) and Disconnect button.
 *      * Disconnected: API token requirement and Connect button.
 * 3. Zero Secret Leakage Safeguard:
 *    - Hardware-backed memory enclave policy banner.
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
import { PrimaryButton, SecondaryButton } from '../../components/buttons';

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
    <div className="p-3 sm:p-4 flex flex-col gap-3 max-w-[1400px] w-full mx-auto animate-in fade-in duration-150">
      {/* 
        ========================================================================
        1. TOP PROVIDER SUMMARY STRIP (CLEAN & COMPACT)
        ========================================================================
      */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-2.5 sm:p-3 flex items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#1d6cf6]/10 border border-[#1d6cf6]/20 text-[#58a6ff] flex items-center justify-center shrink-0">
            <Key className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-xs font-medium text-[#f0f6fc]">
            Connected Accounts
          </h2>
          <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-[#090d13] border border-[#21262d] text-[#8b949e]">
            {(isGithubConnected ? 1 : 0) + (isCloudflareConnected ? 1 : 0)} / 2 Active
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#7d8590]">
          <span>Status:</span>
          <span className="text-[#3fb950] font-normal flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]"></span>
            Operational
          </span>
        </div>
      </div>

      {/* 
        ========================================================================
        2. PROVIDER CARDS GRID
        ========================================================================
      */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* CARD 1: GITHUB INTEGRATION */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-3.5 flex flex-col justify-between gap-3 shadow-sm">
          <div className="flex flex-col gap-2.5">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#21262d]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#090d13] border border-[#30363d] flex items-center justify-center text-[#f0f6fc]">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-[#f0f6fc]">GitHub Integration</div>
                  <div className="text-[10.5px] text-[#7d8590]">Source Code & Push Webhooks</div>
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 text-[9.5px] font-mono px-2 py-0.5 rounded border ${
                  isGithubConnected
                    ? 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/30'
                    : 'bg-[#21262d] text-[#8b949e] border-[#30363d]'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${isGithubConnected ? 'bg-[#3fb950]' : 'bg-[#7d8590]'}`}
                ></span>
                <span>{isGithubConnected ? 'Connected' : 'Disconnected'}</span>
              </span>
            </div>

            {/* Connected Details */}
            {isGithubConnected ? (
              <div className="flex flex-col gap-2.5 text-xs">
                {/* Basic Details Grid */}
                <div className="bg-[#090d13] border border-[#21262d] rounded-md p-2.5 flex flex-col gap-1.5 font-mono text-[11px]">
                  <div className="flex justify-between items-center text-[#8b949e]">
                    <span>Account Handle</span>
                    <span className="text-[#f0f6fc] font-medium">@vibtools (Organization)</span>
                  </div>
                  <div className="flex justify-between items-center text-[#8b949e]">
                    <span>Linked Repositories</span>
                    <span className="text-[#c9d1d9]">12 Repositories accessible</span>
                  </div>
                  <div className="flex justify-between items-center text-[#8b949e]">
                    <span>Webhook Engine</span>
                    <span className="text-[#3fb950]">Active (Auto-deploy on push)</span>
                  </div>
                  <div className="flex justify-between items-center text-[#8b949e]">
                    <span>Connected Since</span>
                    <span className="text-[#c9d1d9]">2026-Sep-12</span>
                  </div>
                  <div className="flex justify-between items-center text-[#8b949e]">
                    <span>Last Sync</span>
                    <span className="text-[#58a6ff]">{githubLastSync}</span>
                  </div>
                </div>

                {/* Scopes Tag List */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase text-[#7d8590] tracking-wider">
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
                        className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-[#161b22] text-[#58a6ff] border border-[#30363d] font-normal"
                      >
                        {scope}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Disconnected State View */
              <div className="bg-[#090d13] border border-[#21262d] rounded-md p-3 flex flex-col gap-2 text-xs">
                <p className="text-[#c9d1d9] leading-relaxed">
                  Connect your GitHub account to import repositories and enable automated Git push Jamstack deployments.
                </p>
                <div className="text-[10.5px] text-[#7d8590]">
                  Requires read access to repo contents and webhook write access.
                </div>
              </div>
            )}
          </div>

          {/* Card Action Buttons */}
          <div className="pt-2 border-t border-[#21262d] flex items-center justify-between gap-2">
            {isGithubConnected ? (
              <>
                <SecondaryButton
                  size="sm"
                  onClick={onSyncGithub}
                  disabled={isGithubSyncing}
                  isLoading={isGithubSyncing}
                  loadingText="Syncing..."
                  icon={<RefreshCw className="w-3 h-3 text-[#7d8590]" />}
                >
                  Re-sync Account
                </SecondaryButton>

                <button
                  type="button"
                  onClick={onToggleGithub}
                  className="text-[#f85149] hover:bg-[#da3633]/15 px-2.5 py-1 rounded text-xs border border-[#da3633]/30 cursor-pointer transition-colors active:scale-95"
                >
                  Disconnect
                </button>
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
        </div>

        {/* CARD 2: CLOUDFLARE PAGES & EDGE INTEGRATION */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-3.5 flex flex-col justify-between gap-3 shadow-sm">
          <div className="flex flex-col gap-2.5">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#21262d]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#090d13] border border-[#30363d] flex items-center justify-center text-[#f38020]">
                  <Cloud className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-[#f0f6fc]">Cloudflare Pages & Edge API</div>
                  <div className="text-[10.5px] text-[#7d8590]">Edge Network & Serverless Runtimes</div>
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 text-[9.5px] font-mono px-2 py-0.5 rounded border ${
                  isCloudflareConnected
                    ? 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/30'
                    : 'bg-[#21262d] text-[#8b949e] border-[#30363d]'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${isCloudflareConnected ? 'bg-[#3fb950]' : 'bg-[#7d8590]'}`}
                ></span>
                <span>{isCloudflareConnected ? 'Verified' : 'Disconnected'}</span>
              </span>
            </div>

            {/* Connected Details */}
            {isCloudflareConnected ? (
              <div className="flex flex-col gap-2.5 text-xs">
                {/* Basic Details Grid */}
                <div className="bg-[#090d13] border border-[#21262d] rounded-md p-2.5 flex flex-col gap-1.5 font-mono text-[11px]">
                  <div className="flex justify-between items-center text-[#8b949e]">
                    <span>Account Name</span>
                    <span className="text-[#f0f6fc] font-medium">VibTools Cloudflare (Production)</span>
                  </div>
                  <div className="flex justify-between items-center text-[#8b949e]">
                    <span>Account ID</span>
                    <span className="text-[#c9d1d9] select-all">cf_acc_9014882194</span>
                  </div>
                  <div className="flex justify-between items-center text-[#8b949e]">
                    <span>Edge POPs</span>
                    <span className="text-[#3fb950]">310+ Global Edge Locations</span>
                  </div>
                  <div className="flex justify-between items-center text-[#8b949e]">
                    <span>Database Bindings</span>
                    <span className="text-[#c9d1d9]">KV, D1 SQL, R2 Buckets</span>
                  </div>
                  <div className="flex justify-between items-center text-[#8b949e]">
                    <span>Last Verified</span>
                    <span className="text-[#58a6ff]">{cloudflareLastSync}</span>
                  </div>
                </div>

                {/* Scopes Tag List */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase text-[#7d8590] tracking-wider">
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
                        className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-[#161b22] text-[#a371f7] border border-[#30363d] font-normal"
                      >
                        {scope}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Disconnected State View */
              <div className="bg-[#090d13] border border-[#21262d] rounded-md p-3 flex flex-col gap-2 text-xs">
                <p className="text-[#c9d1d9] leading-relaxed">
                  Connect your Cloudflare account to publish fast static web apps to Cloudflare Pages (*.pages.dev) and configure custom domains.
                </p>
                <div className="text-[10.5px] text-[#7d8590]">
                  Requires Pages write and KV/D1 database bindings authorization.
                </div>
              </div>
            )}
          </div>

          {/* Card Action Buttons */}
          <div className="pt-2 border-t border-[#21262d] flex items-center justify-between gap-2">
            {isCloudflareConnected ? (
              <>
                <SecondaryButton
                  size="sm"
                  onClick={onSyncCloudflare}
                  disabled={isCloudflareSyncing}
                  isLoading={isCloudflareSyncing}
                  loadingText="Verifying..."
                  icon={<RefreshCw className="w-3 h-3 text-[#7d8590]" />}
                >
                  Verify API Token
                </SecondaryButton>

                <button
                  type="button"
                  onClick={onToggleCloudflare}
                  className="text-[#f85149] hover:bg-[#da3633]/15 px-2.5 py-1 rounded text-xs border border-[#da3633]/30 cursor-pointer transition-colors active:scale-95"
                >
                  Disconnect
                </button>
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
        </div>
      </div>

      {/* 
        ========================================================================
        3. SECURITY & CREDENTIAL PRIVACY SAFEGUARD
        ========================================================================
      */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-3 flex items-start gap-2.5 text-xs text-[#8b949e]">
        <ShieldCheck className="w-4 h-4 text-[#3fb950] shrink-0 mt-0.5" />
        <div className="flex flex-col gap-0.5">
          <span className="text-[#f0f6fc] font-medium text-[11.5px]">Zero Secret Leakage Guarantee</span>
          <p className="text-[11px] leading-relaxed text-[#8b949e]">
            All OAuth tokens and API keys are stored in encrypted hardware-backed memory enclaves. Build workers run in isolated sandboxes with zero code execution privileges on provider host machines.
          </p>
        </div>
      </div>
    </div>
  );
};
