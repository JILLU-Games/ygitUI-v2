/**
 * ============================================================================
 * YGIT PLATFORM UI — WORKSPACE SUB-TAB: DOMAINS & DNS SUITE
 * FILE: src/features/workspace/tabs/DomainsTab.tsx
 * ============================================================================
 * 
 * PURPOSE:
 * Implements complete domain management:
 * 1. Free Subdomain search and instant claim engine (*.ygit.net, *.pages.dev, *.ygit.app).
 * 2. Active Free Subdomains list with SSL status, Set Primary trigger, and live preview links.
 * 3. Custom Domains management suite with branch targeting, apex/CNAME records,
 *    DNS records modal viewer, resolver probe verification, and SSL status.
 * ============================================================================
 */

import React from 'react';
import {
  Globe,
  Search,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Copy,
  ExternalLink,
  Trash2,
  Key,
  Lock,
  FileText,
  Edit3,
} from 'lucide-react';
import { FreeSubdomainItem, CustomDomainItem } from '../../../types';
import { PrimaryButton, SecondaryButton, IconButton } from '../../../components/buttons';

export interface DomainsTabProps {
  freeSubdomains: FreeSubdomainItem[];
  customDomainList: CustomDomainItem[];
  subdomainSearchInput: string;
  onSetSubdomainSearchInput: (val: string) => void;
  subdomainSearchZone: '.ygit.net' | '.pages.dev' | '.ygit.app';
  onSetSubdomainSearchZone: (zone: '.ygit.net' | '.pages.dev' | '.ygit.app') => void;
  isSearchingSubdomain: boolean;
  subdomainSearchResult: {
    query: string;
    zone: string;
    isAvailable: boolean;
    suggestions: string[];
  } | null;
  onSetSubdomainSearchResult: (res: any) => void;
  onSearchFreeSubdomain: (e: React.FormEvent) => void;
  onClaimFreeSubdomain: (subdomain: string, zone: string) => void;
  onSetPrimarySubdomain: (id: string) => void;
  onDeleteFreeSubdomain: (id: string) => void;
  newCustomDomainInput: string;
  onSetNewCustomDomainInput: (val: string) => void;
  newCustomDomainBranch: string;
  onSetNewCustomDomainBranch: (branch: string) => void;
  newCustomDomainRedirect: 'https_only' | 'apex_to_www' | 'www_to_apex' | 'none';
  onSetNewCustomDomainRedirect: (redir: 'https_only' | 'apex_to_www' | 'www_to_apex' | 'none') => void;
  onAddCustomDomain: (e: React.FormEvent) => void;
  verifyingDomainIdMap: Record<string, boolean>;
  onOpenDnsModal: (domain: CustomDomainItem) => void;
  onVerifyCustomDomain: (id: string) => void;
  onEditCustomDomain: (domain: CustomDomainItem) => void;
  onDeleteCustomDomain: (id: string) => void;
  onCopyToClipboard: (val: string) => void;
  onShowToast: (msg: string) => void;
}

export const DomainsTab: React.FC<DomainsTabProps> = ({
  freeSubdomains,
  customDomainList,
  subdomainSearchInput,
  onSetSubdomainSearchInput,
  subdomainSearchZone,
  onSetSubdomainSearchZone,
  isSearchingSubdomain,
  subdomainSearchResult,
  onSetSubdomainSearchResult,
  onSearchFreeSubdomain,
  onClaimFreeSubdomain,
  onSetPrimarySubdomain,
  onDeleteFreeSubdomain,
  newCustomDomainInput,
  onSetNewCustomDomainInput,
  newCustomDomainBranch,
  onSetNewCustomDomainBranch,
  newCustomDomainRedirect,
  onSetNewCustomDomainRedirect,
  onAddCustomDomain,
  verifyingDomainIdMap,
  onOpenDnsModal,
  onVerifyCustomDomain,
  onEditCustomDomain,
  onDeleteCustomDomain,
  onCopyToClipboard,
  onShowToast,
}) => {
  return (
    <div className="flex flex-col gap-3 animate-in fade-in duration-150">
      {/* 
        ====================================================================
        SECTION 1: FREE SUBDOMAIN SEARCH & INSTANT CLAIM ENGINE
        ====================================================================
      */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-3 sm:p-3.5 flex flex-col gap-2.5 shadow-sm">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#21262d]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#1d6cf6]/10 text-[#58a6ff] border border-[#1d6cf6]/20 flex items-center justify-center shrink-0">
              <Globe className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-medium text-[#f0f6fc]">
                Free Subdomains
              </h3>
              <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30 font-normal">
                Auto SSL
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#7d8590]">
            <span>Active:</span>
            <span className="text-[#f0f6fc] font-medium bg-[#090d13] px-1.5 py-0.5 rounded border border-[#21262d]">
              {freeSubdomains.length}
            </span>
          </div>
        </div>

        {/* Search Bar for Free Subdomains */}
        <form onSubmit={onSearchFreeSubdomain} className="flex flex-col sm:flex-row items-stretch gap-2">
          <div className="relative flex-1 flex items-center">
            <Search className="w-3.5 h-3.5 absolute left-2.5 text-[#7d8590]" />
            <input
              type="text"
              placeholder="Search free subdomain (e.g. my-app)"
              value={subdomainSearchInput}
              onChange={(e) => {
                onSetSubdomainSearchInput(e.target.value);
                if (subdomainSearchResult) onSetSubdomainSearchResult(null);
              }}
              className="w-full bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded-md px-2.5 pl-8 py-1.5 text-xs text-[#f0f6fc] font-mono placeholder:text-[#484f58] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={subdomainSearchZone}
              onChange={(e) => {
                onSetSubdomainSearchZone(e.target.value as '.ygit.net' | '.pages.dev' | '.ygit.app');
                if (subdomainSearchResult) onSetSubdomainSearchResult(null);
              }}
              className="bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded-md px-2.5 py-1.5 text-xs text-[#f0f6fc] font-mono cursor-pointer transition-colors"
            >
              <option value=".ygit.net">.ygit.net (Global Gateway)</option>
              <option value=".pages.dev">.pages.dev (Cloudflare Edge)</option>
              <option value=".ygit.app">.ygit.app (Fastly CDN)</option>
            </select>

            <PrimaryButton
              type="submit"
              size="md"
              disabled={!subdomainSearchInput.trim() || isSearchingSubdomain}
              isLoading={isSearchingSubdomain}
              loadingText="Checking..."
              icon={<Search className="w-3 h-3" />}
              className="shrink-0"
            >
              Check
            </PrimaryButton>
          </div>
        </form>

        {/* Subdomain Search Result Card */}
        {subdomainSearchResult && (
          <div
            className={`p-2.5 rounded-md border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-all ${
              subdomainSearchResult.isAvailable
                ? 'bg-[#238636]/10 border-[#238636]/30 text-[#f0f6fc]'
                : 'bg-[#da3633]/10 border-[#da3633]/30 text-[#f0f6fc]'
            }`}
          >
            <div className="flex items-center gap-2">
              {subdomainSearchResult.isAvailable ? (
                <CheckCircle2 className="w-4 h-4 text-[#3fb950] shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-[#f85149] shrink-0" />
              )}
              <div className="font-mono text-xs flex items-center gap-2 flex-wrap">
                <span className="text-[#f0f6fc] font-medium">
                  {subdomainSearchResult.query}
                  {subdomainSearchResult.zone}
                </span>
                <span
                  className={`text-[9.5px] px-1.5 py-0.5 rounded font-normal ${
                    subdomainSearchResult.isAvailable
                      ? 'bg-[#238636]/20 text-[#3fb950] border border-[#238636]/40'
                      : 'bg-[#da3633]/20 text-[#f85149] border border-[#da3633]/40'
                  }`}
                >
                  {subdomainSearchResult.isAvailable ? 'Available' : 'Taken'}
                </span>
              </div>
            </div>

            {subdomainSearchResult.isAvailable ? (
              <button
                type="button"
                onClick={() => onClaimFreeSubdomain(subdomainSearchResult.query, subdomainSearchResult.zone)}
                className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-normal px-3 py-1 rounded-md cursor-pointer transition-colors shrink-0 shadow-sm flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Claim Subdomain</span>
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10.5px] text-[#8b949e]">Suggestions:</span>
                {subdomainSearchResult.suggestions.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => onClaimFreeSubdomain(sug, subdomainSearchResult.zone)}
                    className="bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-[#58a6ff] hover:text-[#79c0ff] text-[10px] font-mono px-2 py-0.5 rounded cursor-pointer transition-colors font-normal"
                  >
                    + {sug}
                    {subdomainSearchResult.zone}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Active Free Subdomains List */}
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="text-[10px] font-mono uppercase text-[#7d8590] tracking-wider">
            Active Subdomains
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {freeSubdomains.map((fs) => {
              const fullDomain = `${fs.subdomain}${fs.zone}`;
              return (
                <div
                  key={fs.id}
                  className="bg-[#090d13] border border-[#21262d] hover:border-[#30363d] rounded-md p-2 px-3 flex flex-wrap items-center justify-between gap-2.5 transition-colors text-xs"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[#58a6ff] text-xs font-normal select-all">
                      {fullDomain}
                    </span>

                    {fs.isPrimary && (
                      <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-[#1d6cf6]/15 text-[#58a6ff] border border-[#1d6cf6]/30 font-normal">
                        Primary
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1.5 text-[10px] text-[#3fb950]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]"></span>
                      Active SSL
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {!fs.isPrimary && (
                      <button
                        type="button"
                        onClick={() => onSetPrimarySubdomain(fs.id)}
                        className="text-[10px] text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#161b22] px-2 py-0.5 rounded border border-[#21262d] cursor-pointer transition-colors font-normal"
                      >
                        Set Primary
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        onCopyToClipboard(`https://${fullDomain}`);
                        onShowToast(`Copied https://${fullDomain}`);
                      }}
                      title="Copy URL"
                      className="p-1 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#161b22] rounded cursor-pointer transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`https://${fullDomain}`}
                      target="_blank"
                      rel="noreferrer"
                      title="Open Live Site"
                      className="p-1 text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#161b22] rounded cursor-pointer transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {freeSubdomains.length > 1 && (
                      <button
                        type="button"
                        onClick={() => onDeleteFreeSubdomain(fs.id)}
                        title="Unbind Subdomain"
                        className="p-1 text-[#8b949e] hover:text-[#f85149] hover:bg-[#161b22] rounded cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 
        ====================================================================
        SECTION 2: CUSTOM DOMAINS MANAGEMENT SUITE
        ====================================================================
      */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-3 sm:p-3.5 flex flex-col gap-2.5 shadow-sm">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#21262d]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#8957e5]/10 text-[#a371f7] border border-[#8957e5]/20 flex items-center justify-center shrink-0">
              <Key className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-medium text-[#f0f6fc]">
                Custom Domains & DNS
              </h3>
              <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-[#8957e5]/15 text-[#a371f7] border border-[#8957e5]/30 font-normal">
                Production
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#7d8590]">
            <span>Configured:</span>
            <span className="text-[#f0f6fc] font-medium bg-[#090d13] px-1.5 py-0.5 rounded border border-[#21262d]">
              {customDomainList.length}
            </span>
          </div>
        </div>

        {/* Add Custom Domain Form */}
        <form onSubmit={onAddCustomDomain} className="bg-[#090d13] border border-[#21262d] rounded-md p-2.5 flex flex-col gap-2">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
            <div className="flex-1">
              <input
                type="text"
                placeholder="e.g. app.vibtools.dev or mydomain.com"
                value={newCustomDomainInput}
                onChange={(e) => onSetNewCustomDomainInput(e.target.value)}
                className="w-full bg-[#161b22] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded-md px-2.5 py-1.5 text-xs text-[#f0f6fc] font-mono placeholder:text-[#484f58] transition-colors"
              />
            </div>

            <div className="w-full md:w-44">
              <select
                value={newCustomDomainBranch}
                onChange={(e) => onSetNewCustomDomainBranch(e.target.value)}
                aria-label="Target Branch"
                className="w-full bg-[#161b22] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded-md px-2 py-1.5 text-xs text-[#f0f6fc] font-mono cursor-pointer transition-colors"
              >
                <option value="main">Production (main)</option>
                <option value="preview">Preview (staging)</option>
                <option value="development">Development (dev)</option>
              </select>
            </div>

            <div className="w-full md:w-48">
              <select
                value={newCustomDomainRedirect}
                onChange={(e) => onSetNewCustomDomainRedirect(e.target.value as any)}
                aria-label="Redirect mode"
                className="w-full bg-[#161b22] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded-md px-2 py-1.5 text-xs text-[#f0f6fc] cursor-pointer transition-colors"
              >
                <option value="https_only">Force HTTPS Only</option>
                <option value="apex_to_www">Redirect apex to www</option>
                <option value="www_to_apex">Redirect www to apex</option>
                <option value="none">No Redirect</option>
              </select>
            </div>

            <PrimaryButton
              type="submit"
              size="md"
              disabled={!newCustomDomainInput.trim()}
              icon={<Plus className="w-3.5 h-3.5" />}
              className="shrink-0"
            >
              Add Domain
            </PrimaryButton>
          </div>
        </form>

        {/* Custom Domains Table */}
        <div className="border border-[#21262d] rounded-md bg-[#090d13] overflow-x-auto text-xs">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="border-b border-[#21262d] bg-[#161b22] text-[9.5px] font-mono uppercase text-[#7d8590] tracking-wider">
                <th className="p-2.5 px-3">Domain & Target</th>
                <th className="p-2.5">Routing Record</th>
                <th className="p-2.5">SSL</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262d]">
              {customDomainList.map((dom) => {
                const isVerifying = !!verifyingDomainIdMap[dom.id];

                return (
                  <tr key={dom.id} className="hover:bg-[#161b22]/50 transition-colors">
                    {/* Domain Name & Branch */}
                    <td className="p-2.5 px-3 align-middle">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono text-[#f0f6fc] text-xs select-all font-normal">
                            {dom.domain}
                          </span>
                          {dom.isApex ? (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#8957e5]/15 text-[#a371f7] border border-[#8957e5]/30 font-normal">
                              Apex
                            </span>
                          ) : (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#1d6cf6]/15 text-[#58a6ff] border border-[#1d6cf6]/30 font-normal">
                              CNAME
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-[#7d8590] flex items-center gap-1">
                          <span>
                            Branch: <span className="text-[#8b949e] font-mono">{dom.targetBranch}</span>
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Routing Record */}
                    <td className="p-2.5 align-middle font-mono text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#c9d1d9] text-[10.5px] truncate max-w-[170px]">
                          {dom.isApex ? `A → ${dom.apexIp}` : `CNAME → ${dom.cnameTarget}`}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            onCopyToClipboard(dom.isApex ? dom.apexIp : dom.cnameTarget);
                            onShowToast(`Copied routing target`);
                          }}
                          title="Copy target"
                          className="text-[#8b949e] hover:text-[#f0f6fc] p-0.5 rounded cursor-pointer transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    {/* SSL / TLS Status */}
                    <td className="p-2.5 align-middle">
                      <span
                        className={`inline-flex items-center gap-1 text-[9.5px] font-normal px-1.5 py-0.5 rounded ${
                          dom.sslStatus === 'active'
                            ? 'bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30'
                            : 'bg-[#d29922]/15 text-[#e3b341] border border-[#d29922]/30'
                        }`}
                      >
                        <Lock className="w-2.5 h-2.5" />
                        <span>{dom.sslStatus === 'active' ? 'Active' : 'Pending'}</span>
                      </span>
                    </td>

                    {/* DNS Status Badge */}
                    <td className="p-2.5 align-middle">
                      <div className="flex flex-col gap-0.5">
                        <span
                          className={`inline-flex items-center gap-1 text-[9.5px] font-normal px-1.5 py-0.5 rounded w-fit ${
                            dom.dnsStatus === 'verified'
                              ? 'bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30'
                              : dom.dnsStatus === 'pending'
                              ? 'bg-[#d29922]/15 text-[#e3b341] border border-[#d29922]/30'
                              : 'bg-[#da3633]/15 text-[#f85149] border border-[#da3633]/30'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              dom.dnsStatus === 'verified' ? 'bg-[#3fb950]' : 'bg-[#e3b341]'
                            }`}
                          ></span>
                          <span>{dom.dnsStatus === 'verified' ? 'Verified' : 'Pending'}</span>
                        </span>
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="p-2.5 px-3 align-middle text-right">
                      <div className="flex items-center justify-end gap-1.5 flex-wrap">
                        {/* DNS BUTTON (OPENS POPUP WITH DNS RECORDS) */}
                        <button
                          type="button"
                          onClick={() => onOpenDnsModal(dom)}
                          title="View DNS Records"
                          className="bg-[#1d6cf6]/15 hover:bg-[#1d6cf6]/25 text-[#58a6ff] border border-[#1d6cf6]/30 text-[10.5px] font-normal px-2 py-0.5 rounded cursor-pointer transition-colors flex items-center gap-1"
                        >
                          <FileText className="w-3 h-3" />
                          <span>DNS</span>
                        </button>

                        {/* Verify DNS Resolver Action */}
                        <SecondaryButton
                          size="sm"
                          onClick={() => onVerifyCustomDomain(dom.id)}
                          disabled={isVerifying}
                          isLoading={isVerifying}
                          loadingText="Verifying"
                          title="Verify DNS"
                        >
                          <span className="hidden sm:inline">Verify</span>
                        </SecondaryButton>

                        {/* Edit Domain Action */}
                        <IconButton
                          size="sm"
                          icon={<Edit3 className="w-3.5 h-3.5" />}
                          title="Edit Domain"
                          onClick={() => onEditCustomDomain(dom)}
                          className="hover:text-[#58a6ff]"
                        />

                        {/* External Link */}
                        <a
                          href={`https://${dom.domain}`}
                          target="_blank"
                          rel="noreferrer"
                          title="Open Domain"
                          className="p-1 text-[#8b949e] hover:text-[#3fb950] hover:bg-[#21262d] rounded cursor-pointer transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        {/* Delete Domain */}
                        <IconButton
                          size="sm"
                          icon={<Trash2 className="w-3.5 h-3.5" />}
                          title="Delete Domain"
                          onClick={() => onDeleteCustomDomain(dom.id)}
                          className="hover:text-[#f85149]"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}

              {customDomainList.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-[#8b949e]">
                    <div className="flex flex-col items-center gap-1.5">
                      <Globe className="w-5 h-5 text-[#7d8590]" />
                      <div className="text-xs font-normal text-[#f0f6fc]">No custom domains configured</div>
                      <div className="text-[10.5px] text-[#7d8590]">
                        Add an apex or subdomain above to configure custom DNS routing.
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
