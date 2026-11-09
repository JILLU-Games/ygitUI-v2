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
 * 
 * DESIGN CONSTITUTION:
 * - Component-only architecture: Card, Input, Select, Table suite, PrimaryButton, SecondaryButton, IconButton, SuccessButton.
 * - Zero border radius (`rounded-none`) and zero box shadow (`shadow-none`).
 * - Full Dark/Light dual-theme token coverage via semantic CSS variables.
 * ============================================================================
 */

import React from 'react';
import {
  Globe,
  Search,
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
import { PrimaryButton, SecondaryButton, IconButton, SuccessButton } from '../../../components/buttons';
import {
  Card,
  Input,
  Select,
  Table,
  TableHeader,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from '../../../components/ui';

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
    <div className="flex flex-col gap-3 animate-in fade-in duration-100 font-sans">
      {/* 
        ====================================================================
        SECTION 1: FREE SUBDOMAIN SEARCH & INSTANT CLAIM ENGINE
        ====================================================================
      */}
      <Card variant="default" className="p-3 sm:p-3.5 flex flex-col gap-2.5">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-none bg-accent-primary/10 text-accent-primary border border-accent-primary/20 flex items-center justify-center shrink-0 shadow-none">
              <Globe className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-medium text-fg-default">
                Free Subdomains
              </h3>
              <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded-none bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 font-normal">
                Auto SSL
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-fg-subtle">
            <span>Active:</span>
            <span className="text-fg-default font-medium bg-canvas-inset px-1.5 py-0.5 rounded-none border border-border-subtle">
              {freeSubdomains.length}
            </span>
          </div>
        </div>

        {/* Search Bar for Free Subdomains */}
        <form onSubmit={onSearchFreeSubdomain} className="flex flex-col sm:flex-row items-stretch gap-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search free subdomain (e.g. my-app)"
              value={subdomainSearchInput}
              onChange={(e) => {
                onSetSubdomainSearchInput(e.target.value);
                if (subdomainSearchResult) onSetSubdomainSearchResult(null);
              }}
              prefixIcon={<Search className="w-3.5 h-3.5" />}
              isMono
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-56">
              <Select
                value={subdomainSearchZone}
                onChange={(e) => {
                  onSetSubdomainSearchZone(e.target.value as '.ygit.net' | '.pages.dev' | '.ygit.app');
                  if (subdomainSearchResult) onSetSubdomainSearchResult(null);
                }}
              >
                <option value=".ygit.net">.ygit.net (Global Gateway)</option>
                <option value=".pages.dev">.pages.dev (Cloudflare Edge)</option>
                <option value=".ygit.app">.ygit.app (Fastly CDN)</option>
              </Select>
            </div>

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
            className={`p-2.5 rounded-none border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-all shadow-none ${
              subdomainSearchResult.isAvailable
                ? 'bg-emerald-500/10 border-emerald-500/30 text-fg-default'
                : 'bg-red-500/10 border-red-500/30 text-fg-default'
            }`}
          >
            <div className="flex items-center gap-2">
              {subdomainSearchResult.isAvailable ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              )}
              <div className="font-mono text-xs flex items-center gap-2 flex-wrap">
                <span className="text-fg-default font-medium">
                  {subdomainSearchResult.query}
                  {subdomainSearchResult.zone}
                </span>
                <span
                  className={`text-[9.5px] px-1.5 py-0.5 rounded-none font-normal ${
                    subdomainSearchResult.isAvailable
                      ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
                      : 'bg-red-500/20 text-red-400 border border-red-500/40'
                  }`}
                >
                  {subdomainSearchResult.isAvailable ? 'Available' : 'Taken'}
                </span>
              </div>
            </div>

            {subdomainSearchResult.isAvailable ? (
              <SuccessButton
                size="sm"
                icon={<Plus className="w-3.5 h-3.5" />}
                onClick={() => onClaimFreeSubdomain(subdomainSearchResult.query, subdomainSearchResult.zone)}
              >
                Claim Subdomain
              </SuccessButton>
            ) : (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10.5px] text-fg-muted">Suggestions:</span>
                {subdomainSearchResult.suggestions.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => onClaimFreeSubdomain(sug, subdomainSearchResult.zone)}
                    className="bg-canvas-subtle hover:bg-canvas-default border border-border-default text-accent-primary text-[10px] font-mono px-2 py-0.5 rounded-none cursor-pointer transition-colors font-normal shadow-none"
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
          <div className="text-[10px] font-mono uppercase text-fg-subtle tracking-wider">
            Active Subdomains
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {freeSubdomains.map((fs) => {
              const fullDomain = `${fs.subdomain}${fs.zone}`;
              return (
                <div
                  key={fs.id}
                  className="bg-canvas-inset border border-border-subtle hover:border-border-default rounded-none p-2 px-3 flex flex-wrap items-center justify-between gap-2.5 transition-colors text-xs shadow-none"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-accent-primary text-xs font-normal select-all">
                      {fullDomain}
                    </span>

                    {fs.isPrimary && (
                      <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded-none bg-accent-primary/10 text-accent-primary border border-accent-primary/30 font-normal">
                        Primary
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-500">
                      <span className="w-1.5 h-1.5 rounded-none bg-emerald-500"></span>
                      Active SSL
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {!fs.isPrimary && (
                      <button
                        type="button"
                        onClick={() => onSetPrimarySubdomain(fs.id)}
                        className="text-[10px] text-fg-muted hover:text-fg-default hover:bg-canvas-subtle px-2 py-0.5 rounded-none border border-border-subtle cursor-pointer transition-colors font-normal shadow-none"
                      >
                        Set Primary
                      </button>
                    )}

                    <IconButton
                      size="xs"
                      variant="ghost"
                      onClick={() => {
                        onCopyToClipboard(`https://${fullDomain}`);
                        onShowToast(`Copied https://${fullDomain}`);
                      }}
                      aria-label="Copy URL"
                      title="Copy URL"
                      icon={<Copy className="w-3.5 h-3.5" />}
                    />

                    <a
                      href={`https://${fullDomain}`}
                      target="_blank"
                      rel="noreferrer"
                      title="Open Live Site"
                      className="p-1 text-fg-muted hover:text-accent-primary hover:bg-canvas-subtle rounded-none cursor-pointer transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {freeSubdomains.length > 1 && (
                      <IconButton
                        size="xs"
                        variant="ghost"
                        onClick={() => onDeleteFreeSubdomain(fs.id)}
                        aria-label="Unbind Subdomain"
                        title="Unbind Subdomain"
                        icon={<Trash2 className="w-3.5 h-3.5 text-fg-muted hover:text-red-400" />}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* 
        ====================================================================
        SECTION 2: CUSTOM DOMAINS MANAGEMENT SUITE
        ====================================================================
      */}
      <Card variant="default" className="p-3 sm:p-3.5 flex flex-col gap-2.5">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-none bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0 shadow-none">
              <Key className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-medium text-fg-default">
                Custom Domains & DNS
              </h3>
              <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded-none bg-purple-500/15 text-purple-400 border border-purple-500/30 font-normal">
                Production
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-fg-subtle">
            <span>Configured:</span>
            <span className="text-fg-default font-medium bg-canvas-inset px-1.5 py-0.5 rounded-none border border-border-subtle">
              {customDomainList.length}
            </span>
          </div>
        </div>

        {/* Add Custom Domain Form */}
        <form onSubmit={onAddCustomDomain} className="bg-canvas-inset border border-border-subtle rounded-none p-2.5 flex flex-col gap-2 shadow-none">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="e.g. app.vibtools.dev or mydomain.com"
                value={newCustomDomainInput}
                onChange={(e) => onSetNewCustomDomainInput(e.target.value)}
                isMono
              />
            </div>

            <div className="w-full md:w-44">
              <Select
                value={newCustomDomainBranch}
                onChange={(e) => onSetNewCustomDomainBranch(e.target.value)}
                aria-label="Target Branch"
              >
                <option value="main">Production (main)</option>
                <option value="preview">Preview (staging)</option>
                <option value="development">Development (dev)</option>
              </Select>
            </div>

            <div className="w-full md:w-48">
              <Select
                value={newCustomDomainRedirect}
                onChange={(e) => onSetNewCustomDomainRedirect(e.target.value as any)}
                aria-label="Redirect mode"
              >
                <option value="https_only">Force HTTPS Only</option>
                <option value="apex_to_www">Redirect apex to www</option>
                <option value="www_to_apex">Redirect www to apex</option>
                <option value="none">No Redirect</option>
              </Select>
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
        <Table>
          <TableHeader>
            <TableRow isHeader>
              <TableHeadCell className="px-3">Domain & Target</TableHeadCell>
              <TableHeadCell>Routing Record</TableHeadCell>
              <TableHeadCell>SSL</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell align="right" className="px-3">Actions</TableHeadCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customDomainList.map((dom) => {
              const isVerifying = !!verifyingDomainIdMap[dom.id];

              return (
                <TableRow key={dom.id}>
                  {/* Domain Name & Branch */}
                  <TableCell className="px-3">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-mono text-fg-default text-xs select-all font-normal">
                          {dom.domain}
                        </span>
                        {dom.isApex ? (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-none bg-purple-500/15 text-purple-400 border border-purple-500/30 font-normal">
                            Apex
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-none bg-accent-primary/15 text-accent-primary border border-accent-primary/30 font-normal">
                            CNAME
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-fg-subtle flex items-center gap-1">
                        <span>
                          Branch: <span className="text-fg-muted font-mono">{dom.targetBranch}</span>
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Routing Record */}
                  <TableCell className="font-mono text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-fg-muted text-[10.5px] truncate max-w-[170px]">
                        {dom.isApex ? `A → ${dom.apexIp}` : `CNAME → ${dom.cnameTarget}`}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          onCopyToClipboard(dom.isApex ? dom.apexIp : dom.cnameTarget);
                          onShowToast(`Copied routing target`);
                        }}
                        title="Copy target"
                        className="text-fg-subtle hover:text-fg-default p-0.5 rounded-none cursor-pointer transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </TableCell>

                  {/* SSL / TLS Status */}
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1 text-[9.5px] font-normal px-1.5 py-0.5 rounded-none ${
                        dom.sslStatus === 'active'
                          ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                      }`}
                    >
                      <Lock className="w-2.5 h-2.5" />
                      <span>{dom.sslStatus === 'active' ? 'Active' : 'Pending'}</span>
                    </span>
                  </TableCell>

                  {/* DNS Status Badge */}
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span
                        className={`inline-flex items-center gap-1 text-[9.5px] font-normal px-1.5 py-0.5 rounded-none w-fit ${
                          dom.dnsStatus === 'verified'
                            ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
                            : dom.dnsStatus === 'pending'
                            ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                            : 'bg-red-500/15 text-red-400 border border-red-500/30'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-none ${
                            dom.dnsStatus === 'verified' ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                        ></span>
                        <span>{dom.dnsStatus === 'verified' ? 'Verified' : 'Pending'}</span>
                      </span>
                    </div>
                  </TableCell>

                  {/* Actions Column */}
                  <TableCell align="right" className="px-3">
                    <div className="flex items-center justify-end gap-1.5 flex-wrap">
                      {/* DNS BUTTON (OPENS POPUP WITH DNS RECORDS) */}
                      <SecondaryButton
                        size="sm"
                        icon={<FileText className="w-3 h-3 text-accent-primary" />}
                        onClick={() => onOpenDnsModal(dom)}
                        title="View DNS Records"
                      >
                        DNS
                      </SecondaryButton>

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
                        className="hover:text-accent-primary"
                      />

                      {/* External Link */}
                      <a
                        href={`https://${dom.domain}`}
                        target="_blank"
                        rel="noreferrer"
                        title="Open Domain"
                        className="p-1 text-fg-muted hover:text-emerald-500 hover:bg-canvas-subtle rounded-none cursor-pointer transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      {/* Delete Domain */}
                      <IconButton
                        size="sm"
                        icon={<Trash2 className="w-3.5 h-3.5" />}
                        title="Delete Domain"
                        onClick={() => onDeleteCustomDomain(dom.id)}
                        className="hover:text-red-400"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}

            {customDomainList.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" className="p-6 text-fg-muted">
                  <div className="flex flex-col items-center gap-1.5">
                    <Globe className="w-5 h-5 text-fg-subtle" />
                    <div className="text-xs font-normal text-fg-default">No custom domains configured</div>
                    <div className="text-[10.5px] text-fg-subtle">
                      Add an apex or subdomain above to configure custom DNS routing.
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
