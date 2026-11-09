/**
 * ============================================================================
 * YGIT PLATFORM UI — WORKSPACE SUB-TAB: VARIABLES & SECRETS MANAGER
 * FILE: src/features/workspace/tabs/VariablesTab.tsx
 * ============================================================================
 * 
 * PURPOSE:
 * Production-grade environment variables & encrypted secrets workspace
 * (Vercel / Cloudflare / Railway style) with AST reference detection,
 * .env file import/export, raw bulk paste, and pending rebuild alerts.
 * ============================================================================
 */

import React from 'react';
import {
  Key,
  Upload,
  Download,
  Clipboard,
  AlertTriangle,
  Play,
  Lock,
  Search,
  Eye,
  EyeOff,
  Copy,
  Edit3,
  Trash2,
} from 'lucide-react';
import { EnvVar } from '../../../types';
import { MetricPill, PrimaryButton, SecondaryButton, IconButton } from '../../../components';

export interface VariablesTabProps {
  envVars: EnvVar[];
  envNeedsRebuild: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onImportEnvFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExportEnvFile: () => void;
  onOpenPasteEnvModal: () => void;
  onTriggerDeployment: () => void;
  newEnvKey: string;
  onSetNewEnvKey: (k: string) => void;
  newEnvVal: string;
  onSetNewEnvVal: (v: string) => void;
  newEnvTarget: 'All' | 'Production' | 'Preview' | 'Development';
  onSetNewEnvTarget: (t: 'All' | 'Production' | 'Preview' | 'Development') => void;
  newEnvIsSecret: boolean;
  onSetNewEnvIsSecret: (s: boolean) => void;
  onAddEnvVar: (e: React.FormEvent) => void;
  envSearchQuery: string;
  onSetEnvSearchQuery: (q: string) => void;
  envFilterEnvironment: 'All' | 'Production' | 'Preview' | 'Development';
  onSetEnvFilterEnvironment: (env: 'All' | 'Production' | 'Preview' | 'Development') => void;
  showAllSecrets: boolean;
  onToggleAllSecrets: () => void;
  showSecretMap: Record<string, boolean>;
  onToggleSecretVisibility: (id: string) => void;
  onCopyToClipboard: (val: string) => void;
  onShowToast: (msg: string) => void;
  onEditEnvVar: (v: EnvVar) => void;
  onDeleteEnvVar: (id: string) => void;
}

export const VariablesTab: React.FC<VariablesTabProps> = ({
  envVars,
  envNeedsRebuild,
  fileInputRef,
  onImportEnvFile,
  onExportEnvFile,
  onOpenPasteEnvModal,
  onTriggerDeployment,
  newEnvKey,
  onSetNewEnvKey,
  newEnvVal,
  onSetNewEnvVal,
  newEnvTarget,
  onSetNewEnvTarget,
  newEnvIsSecret,
  onSetNewEnvIsSecret,
  onAddEnvVar,
  envSearchQuery,
  onSetEnvSearchQuery,
  envFilterEnvironment,
  onSetEnvFilterEnvironment,
  showAllSecrets,
  onToggleAllSecrets,
  showSecretMap,
  onToggleSecretVisibility,
  onCopyToClipboard,
  onShowToast,
  onEditEnvVar,
  onDeleteEnvVar,
}) => {
  return (
    <div className="flex flex-col gap-2.5 animate-in fade-in duration-150">
      {/* Hidden File Input for .env Import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onImportEnvFile}
        accept=".env,.env.production,.env.preview,.env.local,.env.development,.txt"
        className="hidden"
      />

      {/* Header Actions Strip */}
      <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#1d6cf6]/10 border border-[#1d6cf6]/30 flex items-center justify-center text-[#1d6cf6] shrink-0">
            <Key className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs font-semibold text-[#f0f6fc]">Environment Variables & Secrets</h3>
          <MetricPill variant="neutral">{envVars.length} total</MetricPill>
        </div>

        {/* Top Action Buttons (Import, Export, Paste, Bulk) */}
        <div className="flex flex-wrap items-center gap-1.5 self-end sm:self-auto">
          <SecondaryButton
            size="sm"
            icon={<Upload className="w-3 h-3 text-[#1d6cf6]" />}
            onClick={() => fileInputRef.current?.click()}
            title="Import variables from a local .env file"
          >
            Import .env
          </SecondaryButton>

          <SecondaryButton
            size="sm"
            icon={<Download className="w-3 h-3 text-[#3fb950]" />}
            onClick={onExportEnvFile}
            title="Export all variables as a .env file"
          >
            Export .env
          </SecondaryButton>

          <SecondaryButton
            size="sm"
            icon={<Clipboard className="w-3 h-3 text-[#e3b341]" />}
            onClick={onOpenPasteEnvModal}
            title="Paste multiple KEY=VALUE pairs in bulk"
          >
            Paste .env
          </SecondaryButton>
        </div>
      </div>

      {/* Pending Rebuild Warning Banner */}
      {envNeedsRebuild && (
        <div className="bg-[#d29922]/10 border border-[#d29922]/30 rounded p-2 sm:p-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-[#e3b341]">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <div>
              <span className="font-medium text-[#f0f6fc]">Environment changes pending:</span>{' '}
              <span className="text-[#c9d1d9] text-[11px]">
                Variables have been modified. A rebuild / new deployment is required for changes to take effect on edge runtime.
              </span>
            </div>
          </div>
          <PrimaryButton
            size="sm"
            icon={<Play className="w-3 h-3 fill-current" />}
            onClick={onTriggerDeployment}
            className="shrink-0 self-end sm:self-auto"
          >
            Deploy & Apply
          </PrimaryButton>
        </div>
      )}

      {/* Quick Add Variable Form */}
      <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 flex flex-col gap-2">
        <div className="text-[10px] font-mono text-[#7d8590] uppercase tracking-wider">
          + Add New Variable
        </div>
        <form onSubmit={onAddEnvVar} className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="KEY (e.g. VITE_API_URL)"
              value={newEnvKey}
              onChange={(e) => onSetNewEnvKey(e.target.value)}
              className="w-full bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded px-2.5 py-1 text-xs text-[#f0f6fc] font-mono uppercase"
            />
          </div>

          <div className="flex-1">
            <input
              type="text"
              placeholder="Value"
              value={newEnvVal}
              onChange={(e) => onSetNewEnvVal(e.target.value)}
              className="w-full bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded px-2.5 py-1 text-xs text-[#f0f6fc] font-mono"
            />
          </div>

          <div className="w-full md:w-36">
            <select
              value={newEnvTarget}
              onChange={(e) => onSetNewEnvTarget(e.target.value as any)}
              aria-label="Target environment"
              className="w-full bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded px-2 py-1 text-xs text-[#f0f6fc]"
            >
              <option value="All">All Envs</option>
              <option value="Production">Production</option>
              <option value="Preview">Preview</option>
              <option value="Development">Development</option>
            </select>
          </div>

          <label className="flex items-center gap-1.5 text-xs text-[#8b949e] select-none cursor-pointer px-1">
            <input
              type="checkbox"
              checked={newEnvIsSecret}
              onChange={(e) => onSetNewEnvIsSecret(e.target.checked)}
              className="rounded bg-[#090d13] border-[#21262d] text-[#1d6cf6] focus:ring-0 cursor-pointer"
            />
            <span className="flex items-center gap-1 text-[11px]">
              <Lock className="w-3 h-3 text-[#8957e5]" />
              Secret
            </span>
          </label>

          <PrimaryButton
            type="submit"
            size="sm"
            disabled={!newEnvKey.trim()}
          >
            + Add
          </PrimaryButton>
        </form>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-0.5">
        {/* Search input */}
        <div className="relative flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#7d8590]" />
          <input
            type="text"
            placeholder="Search keys or values..."
            value={envSearchQuery}
            onChange={(e) => onSetEnvSearchQuery(e.target.value)}
            className="w-full bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded pl-8 pr-2.5 py-1 text-xs text-[#f0f6fc]"
          />
        </div>

        {/* Environment Filter Tabs & Reveal Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-1.5">
          <div className="flex items-center gap-1 bg-[#161b22] border border-[#21262d] rounded p-0.5 text-[10.5px]">
            {(['All', 'Production', 'Preview', 'Development'] as const).map((env) => {
              const count =
                env === 'All'
                  ? envVars.length
                  : envVars.filter((v) => v.environment === env || v.environment === 'All').length;
              return (
                <button
                  key={env}
                  type="button"
                  onClick={() => onSetEnvFilterEnvironment(env)}
                  className={`px-2 py-0.5 rounded cursor-pointer font-medium transition-colors ${
                    envFilterEnvironment === env
                      ? 'bg-[#21262d] text-[#f0f6fc]'
                      : 'text-[#8b949e] hover:text-[#f0f6fc]'
                  }`}
                >
                  <span>{env}</span>
                  <span className="ml-1 text-[9px] font-mono text-[#7d8590]">({count})</span>
                </button>
              );
            })}
          </div>

          <SecondaryButton
            size="sm"
            onClick={onToggleAllSecrets}
            title={showAllSecrets ? 'Mask all secret values' : 'Reveal all secret values'}
            icon={showAllSecrets ? <EyeOff className="w-3 h-3 text-[#e3b341]" /> : <Eye className="w-3 h-3 text-[#1d6cf6]" />}
          >
            <span className="text-[10px] hidden md:inline">{showAllSecrets ? 'Mask All' : 'Reveal All'}</span>
          </SecondaryButton>
        </div>
      </div>

      {/* High-Density Environment Variables Table */}
      <div className="border border-[#21262d] rounded bg-[#161b22] overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#21262d] bg-[#090d13] text-[9.5px] font-mono uppercase text-[#7d8590]">
              <th className="p-2.5">Key & Ast Metadata</th>
              <th className="p-2.5">Value</th>
              <th className="p-2.5">Environment</th>
              <th className="p-2.5 hidden md:table-cell">Updated</th>
              <th className="p-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#21262d]">
            {envVars
              .filter((v) => {
                const matchesSearch =
                  v.key.toLowerCase().includes(envSearchQuery.toLowerCase()) ||
                  v.value.toLowerCase().includes(envSearchQuery.toLowerCase());
                const matchesEnv =
                  envFilterEnvironment === 'All' ||
                  v.environment === envFilterEnvironment ||
                  v.environment === 'All';
                return matchesSearch && matchesEnv;
              })
              .map((v) => {
                const isRevealed = showSecretMap[v.id] || !v.isSecret;
                const isAstRef = v.key.startsWith('VITE_') || v.key.startsWith('CF_');

                return (
                  <tr key={v.id} className="hover:bg-[#1c2128] transition-colors group">
                    {/* Key Column */}
                    <td className="p-2.5 align-middle">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-mono font-medium text-[#f0f6fc] text-xs select-all">
                          {v.key}
                        </span>
                        {v.isSecret && (
                          <MetricPill
                            variant="purple"
                            size="xs"
                            icon={<Lock className="w-2.5 h-2.5" />}
                          >
                            SECRET
                          </MetricPill>
                        )}
                        {isAstRef && (
                          <MetricPill variant="blue" size="xs">
                            AST REF
                          </MetricPill>
                        )}
                      </div>
                    </td>

                    {/* Value Column */}
                    <td className="p-2.5 align-middle font-mono text-xs">
                      <div className="flex items-center gap-1.5 max-w-md">
                        <span
                          className={`truncate ${
                            !isRevealed ? 'text-[#8b949e] select-none tracking-widest' : 'text-[#c9d1d9] select-all'
                          }`}
                        >
                          {!isRevealed ? '••••••••••••••••' : v.value}
                        </span>

                        {v.isSecret && (
                          <button
                            type="button"
                            onClick={() => onToggleSecretVisibility(v.id)}
                            title={isRevealed ? 'Hide secret value' : 'Show secret value'}
                            className="text-[#8b949e] hover:text-[#f0f6fc] p-0.5 rounded cursor-pointer transition-colors shrink-0"
                          >
                            {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            onCopyToClipboard(v.value);
                            onShowToast(`Copied ${v.key} value`);
                          }}
                          title="Copy value"
                          className="text-[#8b949e] hover:text-[#f0f6fc] p-0.5 rounded cursor-pointer transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    {/* Environment Target Badge */}
                    <td className="p-2.5 align-middle">
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                          v.environment === 'Production'
                            ? 'bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30'
                            : v.environment === 'Preview'
                            ? 'bg-[#1f6feb]/15 text-[#58a6ff] border border-[#1f6feb]/30'
                            : v.environment === 'Development'
                            ? 'bg-[#d29922]/15 text-[#e3b341] border border-[#d29922]/30'
                            : 'bg-[#21262d] text-[#c9d1d9] border border-[#21262d]'
                        }`}
                      >
                        {v.environment}
                      </span>
                    </td>

                    {/* Updated At */}
                    <td className="p-2.5 align-middle hidden md:table-cell font-mono text-[10px] text-[#7d8590]">
                      {v.updatedAt}
                    </td>

                    {/* Action Buttons (Edit & Delete) */}
                    <td className="p-2.5 align-middle text-right">
                      <div className="flex items-center justify-end gap-1">
                        <IconButton
                          size="sm"
                          icon={<Edit3 className="w-3.5 h-3.5" />}
                          title={`Edit ${v.key}`}
                          onClick={() => onEditEnvVar(v)}
                          className="hover:text-[#58a6ff]"
                        />
                        <IconButton
                          size="sm"
                          icon={<Trash2 className="w-3.5 h-3.5" />}
                          title={`Delete ${v.key}`}
                          onClick={() => onDeleteEnvVar(v.id)}
                          className="hover:text-[#f85149]"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}

            {envVars.filter((v) => {
              const matchesSearch =
                v.key.toLowerCase().includes(envSearchQuery.toLowerCase()) ||
                v.value.toLowerCase().includes(envSearchQuery.toLowerCase());
              const matchesEnv =
                envFilterEnvironment === 'All' ||
                v.environment === envFilterEnvironment ||
                v.environment === 'All';
              return matchesSearch && matchesEnv;
            }).length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-[#8b949e]">
                  <div className="flex flex-col items-center gap-1.5">
                    <Key className="w-5 h-5 text-[#7d8590]" />
                    <div className="text-xs font-medium text-[#f0f6fc]">No environment variables found</div>
                    <div className="text-[11px] text-[#8b949e]">
                      Try adjusting your search query or environment filter, or paste new variables.
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
