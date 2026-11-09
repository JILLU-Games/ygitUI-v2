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
 * 
 * DESIGN CONSTITUTION:
 * - Component-only architecture: Card, Input, Select, Table, PrimaryButton, SecondaryButton, IconButton.
 * - Zero border radius (`rounded-none`) and zero box shadow (`shadow-none`).
 * - Full Dark/Light dual-theme token coverage via semantic CSS variables.
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
    <div className="flex flex-col gap-2.5 animate-in fade-in duration-100 font-sans">
      {/* Hidden File Input for .env Import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onImportEnvFile}
        accept=".env,.env.production,.env.preview,.env.local,.env.development,.txt"
        className="hidden"
      />

      {/* Header Actions Strip */}
      <Card variant="default" className="p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-none bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center text-accent-primary shrink-0 shadow-none">
            <Key className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs font-semibold text-fg-default">Environment Variables & Secrets</h3>
          <MetricPill variant="neutral">{envVars.length} total</MetricPill>
        </div>

        {/* Top Action Buttons (Import, Export, Paste, Bulk) */}
        <div className="flex flex-wrap items-center gap-1.5 self-end sm:self-auto">
          <SecondaryButton
            size="sm"
            icon={<Upload className="w-3 h-3 text-accent-primary" />}
            onClick={() => fileInputRef.current?.click()}
            title="Import variables from a local .env file"
          >
            Import .env
          </SecondaryButton>

          <SecondaryButton
            size="sm"
            icon={<Download className="w-3 h-3 text-emerald-500" />}
            onClick={onExportEnvFile}
            title="Export all variables as a .env file"
          >
            Export .env
          </SecondaryButton>

          <SecondaryButton
            size="sm"
            icon={<Clipboard className="w-3 h-3 text-amber-400" />}
            onClick={onOpenPasteEnvModal}
            title="Paste multiple KEY=VALUE pairs in bulk"
          >
            Paste .env
          </SecondaryButton>
        </div>
      </Card>

      {/* Pending Rebuild Warning Banner */}
      {envNeedsRebuild && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-none p-2 sm:p-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs animate-in fade-in duration-100 shadow-none">
          <div className="flex items-center gap-2 text-amber-500">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <div>
              <span className="font-medium text-fg-default">Environment changes pending:</span>{' '}
              <span className="text-fg-muted text-[11px]">
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
      <Card variant="default" className="p-2.5 flex flex-col gap-2">
        <div className="text-[10px] font-mono text-fg-subtle uppercase tracking-wider">
          + Add New Variable
        </div>
        <form onSubmit={onAddEnvVar} className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="KEY (e.g. VITE_API_URL)"
              value={newEnvKey}
              onChange={(e) => onSetNewEnvKey(e.target.value)}
              isMono
              className="uppercase"
            />
          </div>

          <div className="flex-1">
            <Input
              type="text"
              placeholder="Value"
              value={newEnvVal}
              onChange={(e) => onSetNewEnvVal(e.target.value)}
              isMono
            />
          </div>

          <div className="w-full md:w-36">
            <Select
              value={newEnvTarget}
              onChange={(e) => onSetNewEnvTarget(e.target.value as any)}
              aria-label="Target environment"
            >
              <option value="All">All Envs</option>
              <option value="Production">Production</option>
              <option value="Preview">Preview</option>
              <option value="Development">Development</option>
            </Select>
          </div>

          <label className="flex items-center gap-1.5 text-xs text-fg-muted select-none cursor-pointer px-1">
            <input
              type="checkbox"
              checked={newEnvIsSecret}
              onChange={(e) => onSetNewEnvIsSecret(e.target.checked)}
              className="rounded-none bg-canvas-inset border-border-default text-accent-primary focus:ring-0 cursor-pointer"
            />
            <span className="flex items-center gap-1 text-[11px]">
              <Lock className="w-3 h-3 text-purple-400" />
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
      </Card>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-0.5">
        {/* Search input */}
        <div className="flex-1 max-w-xs">
          <Input
            type="text"
            placeholder="Search keys or values..."
            value={envSearchQuery}
            onChange={(e) => onSetEnvSearchQuery(e.target.value)}
            prefixIcon={<Search className="w-3.5 h-3.5" />}
          />
        </div>

        {/* Environment Filter Tabs & Reveal Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-1.5">
          <div className="flex items-center gap-1 bg-canvas-subtle border border-border-default p-0.5 text-[10.5px] rounded-none shadow-none">
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
                  className={`px-2 py-0.5 rounded-none cursor-pointer font-medium transition-colors ${
                    envFilterEnvironment === env
                      ? 'bg-canvas-default text-fg-default'
                      : 'text-fg-muted hover:text-fg-default'
                  }`}
                >
                  <span>{env}</span>
                  <span className="ml-1 text-[9px] font-mono text-fg-subtle">({count})</span>
                </button>
              );
            })}
          </div>

          <SecondaryButton
            size="sm"
            onClick={onToggleAllSecrets}
            title={showAllSecrets ? 'Mask all secret values' : 'Reveal all secret values'}
            icon={showAllSecrets ? <EyeOff className="w-3 h-3 text-amber-400" /> : <Eye className="w-3 h-3 text-accent-primary" />}
          >
            <span className="text-[10px] hidden md:inline">{showAllSecrets ? 'Mask All' : 'Reveal All'}</span>
          </SecondaryButton>
        </div>
      </div>

      {/* High-Density Environment Variables Table */}
      <Table>
        <TableHeader>
          <TableRow isHeader>
            <TableHeadCell>Key & Ast Metadata</TableHeadCell>
            <TableHeadCell>Value</TableHeadCell>
            <TableHeadCell>Environment</TableHeadCell>
            <TableHeadCell className="hidden md:table-cell">Updated</TableHeadCell>
            <TableHeadCell align="right">Actions</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
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
                <TableRow key={v.id}>
                  {/* Key Column */}
                  <TableCell>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono font-medium text-fg-default text-xs select-all">
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
                  </TableCell>

                  {/* Value Column */}
                  <TableCell className="font-mono text-xs">
                    <div className="flex items-center gap-1.5 max-w-md">
                      <span
                        className={`truncate ${
                          !isRevealed ? 'text-fg-subtle select-none tracking-widest' : 'text-fg-default select-all'
                        }`}
                      >
                        {!isRevealed ? '••••••••••••••••' : v.value}
                      </span>

                      {v.isSecret && (
                        <button
                          type="button"
                          onClick={() => onToggleSecretVisibility(v.id)}
                          title={isRevealed ? 'Hide secret value' : 'Show secret value'}
                          className="text-fg-subtle hover:text-fg-default p-0.5 rounded-none cursor-pointer transition-colors shrink-0"
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
                        className="text-fg-subtle hover:text-fg-default p-0.5 rounded-none cursor-pointer transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </TableCell>

                  {/* Environment Target Badge */}
                  <TableCell>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-none ${
                        v.environment === 'Production'
                          ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
                          : v.environment === 'Preview'
                          ? 'bg-accent-primary/15 text-accent-primary border border-accent-primary/30'
                          : v.environment === 'Development'
                          ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                          : 'bg-canvas-subtle text-fg-muted border border-border-subtle'
                      }`}
                    >
                      {v.environment}
                    </span>
                  </TableCell>

                  {/* Updated At */}
                  <TableCell className="hidden md:table-cell font-mono text-[10px] text-fg-subtle">
                    {v.updatedAt}
                  </TableCell>

                  {/* Action Buttons (Edit & Delete) */}
                  <TableCell align="right">
                    <div className="flex items-center justify-end gap-1">
                      <IconButton
                        size="sm"
                        icon={<Edit3 className="w-3.5 h-3.5" />}
                        title={`Edit ${v.key}`}
                        onClick={() => onEditEnvVar(v)}
                        className="hover:text-accent-primary"
                      />
                      <IconButton
                        size="sm"
                        icon={<Trash2 className="w-3.5 h-3.5" />}
                        title={`Delete ${v.key}`}
                        onClick={() => onDeleteEnvVar(v.id)}
                        className="hover:text-red-400"
                      />
                    </div>
                  </TableCell>
                </TableRow>
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
            <TableRow>
              <TableCell colSpan={5} align="center" className="p-6 text-fg-muted">
                <div className="flex flex-col items-center gap-1.5">
                  <Key className="w-5 h-5 text-fg-subtle" />
                  <div className="text-xs font-medium text-fg-default">No environment variables found</div>
                  <div className="text-[11px] text-fg-subtle">
                    Try adjusting your search query or environment filter, or paste new variables.
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
