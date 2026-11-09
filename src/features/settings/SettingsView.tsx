/**
 * ============================================================================
 * YGIT PLATFORM UI — USER WORKSPACE SETTINGS
 * FILE: src/features/settings/SettingsView.tsx
 * ============================================================================
 * 
 * PURPOSE:
 * User-level developer workspace settings (UI Preferences, Git Defaults,
 * Personal Access Tokens, and Notification Alerts).
 * Clean, compact developer dashboard settings with zero profile editing controls
 * or server-owner infrastructure clutter.
 * 
 * DESIGN CONSTITUTION:
 * - Component-only architecture: UI built exclusively with Card, Input, Select,
 *   Table, ModalShell, PrimaryButton, SecondaryButton, and IconButton primitives.
 * - Zero border radius (`rounded-none`) and zero box shadow (`shadow-none`).
 * - Full Dark/Light dual-theme token coverage via semantic CSS variables.
 * - Monospace precision for technical identifiers (tokens, commands, paths).
 * ============================================================================
 */

import React, { useState } from 'react';
import {
  Sliders,
  FolderGit2,
  Key,
  Bell,
  Save,
  RotateCcw,
  Download,
  Copy,
  Check,
  Plus,
  Trash2,
  Activity,
  Code2,
} from 'lucide-react';
import { UserSettings, SettingsTab, UserPersonalToken } from '../../types';
import { ModalShell } from '../../components/modals/ModalShell';
import { PrimaryButton, SecondaryButton, IconButton } from '../../components/buttons';
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
} from '../../components/ui';

export interface SettingsViewProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: UserSettings) => void;
  onCopyToClipboard?: (text: string, label: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onCopyToClipboard,
}) => {
  // Active Settings Sub-Tab
  const [activeTab, setActiveTab] = useState<SettingsTab>('preferences');

  // Local working copy for live state editing
  const [formState, setFormState] = useState<UserSettings>({ ...settings });

  // Dirty tracking for unsaved indicator
  const isDirty = JSON.stringify(formState) !== JSON.stringify(settings);

  // Save feedback state
  const [isSaving, setIsSaving] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // New Personal Access Token Modal State
  const [showAddTokenModal, setShowAddTokenModal] = useState(false);
  const [newTokenName, setNewTokenName] = useState('');
  const [newTokenScope, setNewTokenScope] = useState<'Full Access' | 'Deploy Only' | 'Read Only'>('Deploy Only');
  const [newTokenExpires, setNewTokenExpires] = useState('90 days');
  const [generatedTokenPreview, setGeneratedTokenPreview] = useState<string | null>(null);

  // JSON Config Inspection Modal State
  const [showJsonInspector, setShowJsonInspector] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  // Helper functions for nested state updating
  const updatePreferences = <K extends keyof UserSettings['preferences']>(key: K, value: UserSettings['preferences'][K]) => {
    setFormState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value },
    }));
  };

  const updateGitDefaults = <K extends keyof UserSettings['gitDefaults']>(key: K, value: UserSettings['gitDefaults'][K]) => {
    setFormState((prev) => ({
      ...prev,
      gitDefaults: { ...prev.gitDefaults, [key]: value },
    }));
  };

  const updateNotifications = <K extends keyof UserSettings['notifications']>(key: K, value: UserSettings['notifications'][K]) => {
    setFormState((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }));
  };

  // Handle Save
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdateSettings(formState);
      setIsSaving(false);
      setSaveToast('Saved');
      setTimeout(() => setSaveToast(null), 2500);
    }, 350);
  };

  // Handle Reset to Defaults
  const handleReset = () => {
    if (window.confirm('Discard unsaved changes and reset to current saved profile?')) {
      setFormState({ ...settings });
      setSaveToast('Reset');
      setTimeout(() => setSaveToast(null), 2000);
    }
  };

  // Handle Export JSON
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ygit.user-settings.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Create Token
  const handleCreateToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTokenName.trim()) return;

    const randomSuffix = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    const fullKey = `ygt_pat_${randomSuffix}`;
    const masked = `ygt_pat_${randomSuffix.substring(0, 4)}••••••••••••••••••••••••${randomSuffix.substring(randomSuffix.length - 4)}`;

    const newToken: UserPersonalToken = {
      id: `pat_${Date.now()}`,
      name: newTokenName.trim(),
      tokenMasked: masked,
      fullToken: fullKey,
      created: 'Just now',
      lastUsed: 'Never',
      expiresIn: newTokenExpires,
      scope: newTokenScope,
    };

    setFormState((prev) => ({
      ...prev,
      tokens: [newToken, ...prev.tokens],
    }));
    setGeneratedTokenPreview(fullKey);
    setNewTokenName('');
  };

  // Revoke Token
  const handleRevokeToken = (tokenId: string) => {
    setFormState((prev) => ({
      ...prev,
      tokens: prev.tokens.filter((t) => t.id !== tokenId),
    }));
  };

  return (
    <div className="p-2.5 sm:p-3 flex flex-col gap-2.5 max-w-[1400px] w-full mx-auto animate-in fade-in duration-100 font-sans">
      {/* 
        ========================================================================
        1. USER ACCOUNT HEADER STRIP (CLEAN & COMPACT)
        ========================================================================
      */}
      <Card variant="default" className="px-3 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-none bg-accent-primary text-white flex items-center justify-center text-xs font-semibold shrink-0 shadow-none">
            {formState.profile.avatarInitial || 'U'}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-fg-default">
              {formState.profile.displayName}
            </span>
            <span className="text-[11px] font-mono text-fg-subtle">
              @{formState.profile.username}
            </span>
            <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded-none bg-accent-primary/10 border border-accent-primary/30 text-accent-primary">
              {formState.profile.plan}
            </span>
            {isDirty ? (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-none bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-none bg-amber-500 animate-pulse"></span>
                Unsaved
              </span>
            ) : (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-none bg-emerald-500"></span>
                Synced
              </span>
            )}
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-1.5">
          {saveToast && (
            <span className="text-[10px] text-emerald-500 font-mono flex items-center gap-1 mr-1 animate-in fade-in duration-150">
              <Check className="w-3 h-3" />
              {saveToast}
            </span>
          )}

          <SecondaryButton
            size="compact"
            icon={<Code2 className="w-3 h-3 text-accent-primary" />}
            onClick={() => setShowJsonInspector(true)}
          >
            JSON
          </SecondaryButton>

          <SecondaryButton
            size="compact"
            icon={<Download className="w-3 h-3 text-fg-muted" />}
            onClick={handleExportJson}
          >
            Export
          </SecondaryButton>

          {isDirty && (
            <SecondaryButton
              size="compact"
              icon={<RotateCcw className="w-3 h-3" />}
              onClick={handleReset}
            >
              Discard
            </SecondaryButton>
          )}

          <PrimaryButton
            size="compact"
            icon={<Save className="w-3 h-3" />}
            disabled={isSaving || !isDirty}
            isLoading={isSaving}
            loadingText="Saving..."
            onClick={handleSave}
          >
            Save Changes
          </PrimaryButton>
        </div>
      </Card>

      {/* 
        ========================================================================
        2. USER SETTINGS SUB-TAB NAVIGATION (4 WORKSPACE TABS)
        ========================================================================
      */}
      <div className="bg-canvas-subtle border border-border-subtle p-0.5 flex items-center gap-0.5 overflow-x-auto rounded-none shadow-none">
        <button
          type="button"
          onClick={() => setActiveTab('preferences')}
          className={`px-2.5 py-1 text-[11px] font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer rounded-none border ${
            activeTab === 'preferences'
              ? 'bg-canvas-default text-fg-default border-border-default'
              : 'text-fg-muted hover:bg-canvas-default/50 hover:text-fg-default border-transparent'
          }`}
        >
          <Sliders className={`w-3 h-3 ${activeTab === 'preferences' ? 'text-accent-primary' : 'text-fg-subtle'}`} />
          <span>Preferences</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('git')}
          className={`px-2.5 py-1 text-[11px] font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer rounded-none border ${
            activeTab === 'git'
              ? 'bg-canvas-default text-fg-default border-border-default'
              : 'text-fg-muted hover:bg-canvas-default/50 hover:text-fg-default border-transparent'
          }`}
        >
          <FolderGit2 className={`w-3 h-3 ${activeTab === 'git' ? 'text-accent-primary' : 'text-fg-subtle'}`} />
          <span>Git Defaults</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tokens')}
          className={`px-2.5 py-1 text-[11px] font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer rounded-none border ${
            activeTab === 'tokens'
              ? 'bg-canvas-default text-fg-default border-border-default'
              : 'text-fg-muted hover:bg-canvas-default/50 hover:text-fg-default border-transparent'
          }`}
        >
          <Key className={`w-3 h-3 ${activeTab === 'tokens' ? 'text-accent-primary' : 'text-fg-subtle'}`} />
          <span>Access Tokens</span>
          <span className="text-[9px] font-mono px-1 py-0.5 rounded-none bg-canvas-inset text-fg-muted border border-border-subtle">
            {formState.tokens.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('notifications')}
          className={`px-2.5 py-1 text-[11px] font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer rounded-none border ${
            activeTab === 'notifications'
              ? 'bg-canvas-default text-fg-default border-border-default'
              : 'text-fg-muted hover:bg-canvas-default/50 hover:text-fg-default border-transparent'
          }`}
        >
          <Bell className={`w-3 h-3 ${activeTab === 'notifications' ? 'text-accent-primary' : 'text-fg-subtle'}`} />
          <span>Alerts</span>
        </button>
      </div>

      {/* 
        ========================================================================
        3. USER SETTINGS SECTIONS (4 SUB-VIEWS)
        ========================================================================
      */}

      {/* ----------------- TAB 1: PREFERENCES ----------------- */}
      {activeTab === 'preferences' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {/* Card: UI Appearance */}
          <Card variant="default" className="p-3 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 border-b border-border-subtle pb-1.5">
              <Sliders className="w-3.5 h-3.5 text-accent-primary" />
              <h3 className="text-xs font-semibold text-fg-default">Appearance & Editor</h3>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-fg-default">
                Theme Appearance
              </label>
              <Select
                value={formState.preferences.theme}
                onChange={(e) => updatePreferences('theme', e.target.value as any)}
              >
                <option value="dark">Dark Charcoal</option>
                <option value="light">Light Crisp</option>
                <option value="system">System Default</option>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-fg-default">
                Monospace Font Family
              </label>
              <Select
                value={formState.preferences.fontFamily}
                onChange={(e) => updatePreferences('fontFamily', e.target.value as any)}
              >
                <option value="JetBrains Mono">JetBrains Mono</option>
                <option value="Geist Mono">Geist Mono</option>
                <option value="Fira Code">Fira Code</option>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-fg-default">
                Default Project Workspace Tab
              </label>
              <Select
                value={formState.preferences.defaultLandingView}
                onChange={(e) => updatePreferences('defaultLandingView', e.target.value as any)}
              >
                <option value="overview">Overview</option>
                <option value="deployments">Deployments</option>
                <option value="logs">Logs Terminal</option>
              </Select>
            </div>
          </Card>

          {/* Card: Privacy & Telemetry */}
          <Card variant="default" className="p-3 flex flex-col justify-between gap-2.5">
            <div>
              <div className="flex items-center gap-2 border-b border-border-subtle pb-1.5">
                <Activity className="w-3.5 h-3.5 text-accent-primary" />
                <h3 className="text-xs font-semibold text-fg-default">Privacy Preferences</h3>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-[11px] font-medium text-fg-default">
                  Opt-Out of Anonymous Analytics
                </span>
                <button
                  type="button"
                  onClick={() => updatePreferences('telemetryOptOut', !formState.preferences.telemetryOptOut)}
                  className={`w-8 h-4 rounded-none p-0.5 transition-colors cursor-pointer relative border border-border-subtle ${
                    formState.preferences.telemetryOptOut ? 'bg-accent-primary' : 'bg-canvas-inset'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-none bg-white transition-transform ${
                      formState.preferences.telemetryOptOut ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-border-subtle text-[10.5px] text-fg-muted">
              YGIT respects developer privacy. No source code or environment variables are ever stored outside your local workspace enclave.
            </div>
          </Card>
        </div>
      )}

      {/* ----------------- TAB 2: GIT DEFAULTS ----------------- */}
      {activeTab === 'git' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <Card variant="default" className="p-3 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 border-b border-border-subtle pb-1.5">
              <FolderGit2 className="w-3.5 h-3.5 text-accent-primary" />
              <h3 className="text-xs font-semibold text-fg-default">Git Defaults</h3>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-fg-default">
                Default Production Branch
              </label>
              <Select
                value={formState.gitDefaults.defaultBranch}
                onChange={(e) => updateGitDefaults('defaultBranch', e.target.value as any)}
              >
                <option value="main">main</option>
                <option value="master">master</option>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-fg-default">
                Preferred Package Manager
              </label>
              <div className="grid grid-cols-4 gap-1">
                {(['pnpm', 'bun', 'yarn', 'npm'] as const).map((pm) => (
                  <button
                    key={pm}
                    type="button"
                    onClick={() => updateGitDefaults('packageManager', pm)}
                    className={`py-1 px-1.5 rounded-none text-[11px] font-mono font-medium border transition-colors cursor-pointer text-center ${
                      formState.gitDefaults.packageManager === pm
                        ? 'bg-accent-primary/10 border-accent-primary text-accent-primary'
                        : 'bg-canvas-inset border-border-subtle text-fg-muted hover:border-border-default'
                    }`}
                  >
                    {pm}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-fg-default">
                Default Output Directory
              </label>
              <Input
                type="text"
                value={formState.gitDefaults.defaultOutputDir}
                onChange={(e) => updateGitDefaults('defaultOutputDir', e.target.value)}
                placeholder="dist"
                isMono
              />
            </div>

            <div className="pt-1.5 border-t border-border-subtle flex items-center justify-between">
              <span className="text-[11px] font-medium text-fg-default">
                Auto-Deploy on Push
              </span>
              <button
                type="button"
                onClick={() => updateGitDefaults('autoDeployOnPush', !formState.gitDefaults.autoDeployOnPush)}
                className={`w-8 h-4 rounded-none p-0.5 transition-colors cursor-pointer relative border border-border-subtle ${
                  formState.gitDefaults.autoDeployOnPush ? 'bg-accent-primary' : 'bg-canvas-inset'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-none bg-white transition-transform ${
                    formState.gitDefaults.autoDeployOnPush ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* ----------------- TAB 3: ACCESS TOKENS ----------------- */}
      {activeTab === 'tokens' && (
        <div className="flex flex-col gap-2.5">
          <Card variant="default" className="p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between border-b border-border-subtle pb-1.5">
              <div className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-accent-primary" />
                <h3 className="text-xs font-semibold text-fg-default">
                  Personal Access Tokens (PAT)
                </h3>
                <span className="text-[9px] font-mono px-1 py-0.5 rounded-none bg-canvas-inset text-fg-muted border border-border-subtle">
                  {formState.tokens.length}
                </span>
              </div>

              <PrimaryButton
                size="compact"
                icon={<Plus className="w-3 h-3" />}
                onClick={() => setShowAddTokenModal(true)}
              >
                New Token
              </PrimaryButton>
            </div>

            {/* Generated Token Banner */}
            {generatedTokenPreview && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-none p-2 flex items-center justify-between gap-2 shadow-none">
                <div className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-emerald-500" />
                  <code className="text-[11px] font-mono text-fg-default select-all bg-canvas-inset px-1.5 py-0.5 rounded-none border border-border-subtle">
                    {generatedTokenPreview}
                  </code>
                </div>
                <div className="flex items-center gap-1">
                  <PrimaryButton
                    size="compact"
                    icon={<Copy className="w-2.5 h-2.5" />}
                    onClick={() => {
                      if (onCopyToClipboard) {
                        onCopyToClipboard(generatedTokenPreview, 'Token');
                      } else {
                        navigator.clipboard.writeText(generatedTokenPreview);
                      }
                    }}
                  >
                    Copy
                  </PrimaryButton>
                  <SecondaryButton
                    size="compact"
                    onClick={() => setGeneratedTokenPreview(null)}
                  >
                    Done
                  </SecondaryButton>
                </div>
              </div>
            )}

            {/* Tokens Table */}
            <Table>
              <TableHeader>
                <TableRow isHeader>
                  <TableHeadCell>Token Name</TableHeadCell>
                  <TableHeadCell>Key Prefix</TableHeadCell>
                  <TableHeadCell>Scope</TableHeadCell>
                  <TableHeadCell>Expires</TableHeadCell>
                  <TableHeadCell>Last Used</TableHeadCell>
                  <TableHeadCell align="right">Revoke</TableHeadCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formState.tokens.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" className="py-3 text-fg-muted text-[11px]">
                      No active access tokens. Create one to authenticate YGIT CLI.
                    </TableCell>
                  </TableRow>
                ) : (
                  formState.tokens.map((token) => (
                    <TableRow key={token.id}>
                      <TableCell className="font-medium text-fg-default text-[11px]">
                        {token.name}
                      </TableCell>
                      <TableCell className="font-mono text-fg-subtle text-[10.5px]">
                        {token.tokenMasked}
                      </TableCell>
                      <TableCell>
                        <span className="text-[9px] font-mono px-1 py-0.5 rounded-none border text-accent-primary bg-accent-primary/10 border-accent-primary/30">
                          {token.scope}
                        </span>
                      </TableCell>
                      <TableCell className="text-fg-subtle text-[10.5px]">
                        {token.expiresIn}
                      </TableCell>
                      <TableCell className="text-fg-subtle text-[10.5px]">
                        {token.lastUsed}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="xs"
                          variant="ghost"
                          onClick={() => handleRevokeToken(token.id)}
                          aria-label="Revoke token"
                          title="Revoke"
                          icon={<Trash2 className="w-3 h-3 text-red-400" />}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}

      {/* ----------------- TAB 4: ALERTS & NOTIFICATIONS ----------------- */}
      {activeTab === 'notifications' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <Card variant="default" className="p-3 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 border-b border-border-subtle pb-1.5">
              <Bell className="w-3.5 h-3.5 text-accent-primary" />
              <h3 className="text-xs font-semibold text-fg-default">Notification Alerts</h3>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-fg-default">
                Alert Email
              </label>
              <Input
                type="email"
                value={formState.notifications.notifyEmail}
                onChange={(e) => updateNotifications('notifyEmail', e.target.value)}
                placeholder="developer@example.com"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-fg-default">
                Discord / Slack Incoming Webhook
              </label>
              <Input
                type="url"
                value={formState.notifications.discordWebhook}
                onChange={(e) => updateNotifications('discordWebhook', e.target.value)}
                placeholder="https://discord.com/api/webhooks/..."
                isMono
              />
            </div>

            <div className="pt-1.5 border-t border-border-subtle flex items-center justify-between">
              <span className="text-[11px] font-medium text-fg-default">Email on Build Failures</span>
              <button
                type="button"
                onClick={() => updateNotifications('emailOnFailure', !formState.notifications.emailOnFailure)}
                className={`w-8 h-4 rounded-none p-0.5 transition-colors cursor-pointer relative border border-border-subtle ${
                  formState.notifications.emailOnFailure ? 'bg-red-500' : 'bg-canvas-inset'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-none bg-white transition-transform ${
                    formState.notifications.emailOnFailure ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-fg-default">Email on Success</span>
              <button
                type="button"
                onClick={() => updateNotifications('emailOnSuccess', !formState.notifications.emailOnSuccess)}
                className={`w-8 h-4 rounded-none p-0.5 transition-colors cursor-pointer relative border border-border-subtle ${
                  formState.notifications.emailOnSuccess ? 'bg-emerald-500' : 'bg-canvas-inset'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-none bg-white transition-transform ${
                    formState.notifications.emailOnSuccess ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* 
        ========================================================================
        4. MODAL: GENERATE NEW PERSONAL ACCESS TOKEN
        ========================================================================
      */}
      {showAddTokenModal && (
        <ModalShell
          isOpen={showAddTokenModal}
          onClose={() => setShowAddTokenModal(false)}
          title="New Access Token"
          icon={<Key className="w-3.5 h-3.5 text-accent-primary" />}
          maxWidth="sm"
        >
          <form onSubmit={(e) => { handleCreateToken(e); setShowAddTokenModal(false); }} className="flex flex-col">
            <div className="p-3.5 flex flex-col gap-2.5 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-fg-default">
                  Token Name
                </label>
                <Input
                  type="text"
                  required
                  value={newTokenName}
                  onChange={(e) => setNewTokenName(e.target.value)}
                  placeholder="e.g. Laptop CLI"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-fg-default">
                  Scope
                </label>
                <Select
                  value={newTokenScope}
                  onChange={(e) => setNewTokenScope(e.target.value as any)}
                >
                  <option value="Deploy Only">Deploy Only</option>
                  <option value="Full Access">Full Access</option>
                  <option value="Read Only">Read Only</option>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-fg-default">
                  Expiration
                </label>
                <Select
                  value={newTokenExpires}
                  onChange={(e) => setNewTokenExpires(e.target.value)}
                >
                  <option value="30 days">30 days</option>
                  <option value="90 days">90 days</option>
                  <option value="1 year">1 year</option>
                  <option value="Never">Never</option>
                </Select>
              </div>
            </div>

            <div className="px-3.5 py-2 border-t border-border-subtle bg-canvas-inset flex items-center justify-end gap-2">
              <SecondaryButton
                size="sm"
                onClick={() => setShowAddTokenModal(false)}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                size="sm"
                type="submit"
                disabled={!newTokenName.trim()}
              >
                Generate
              </PrimaryButton>
            </div>
          </form>
        </ModalShell>
      )}

      {/* 
        ========================================================================
        5. MODAL: JSON SPECIFICATION INSPECTOR
        ========================================================================
      */}
      {showJsonInspector && (
        <ModalShell
          isOpen={showJsonInspector}
          onClose={() => setShowJsonInspector(false)}
          title="User Settings JSON"
          icon={<Code2 className="w-3.5 h-3.5 text-accent-primary" />}
          maxWidth="xl"
        >
          <div className="p-3.5 flex flex-col gap-2.5">
            <pre className="bg-canvas-inset border border-border-subtle rounded-none p-2.5 text-[10.5px] font-mono text-accent-primary overflow-auto max-h-[50vh] select-all leading-snug shadow-none">
              {JSON.stringify(formState, null, 2)}
            </pre>
          </div>

          <div className="px-3.5 py-2 border-t border-border-subtle bg-canvas-inset flex items-center justify-end gap-2">
            <SecondaryButton
              size="sm"
              icon={copiedJson ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              onClick={() => {
                const text = JSON.stringify(formState, null, 2);
                if (onCopyToClipboard) {
                  onCopyToClipboard(text, 'User JSON');
                } else {
                  navigator.clipboard.writeText(text);
                }
                setCopiedJson(true);
                setTimeout(() => setCopiedJson(false), 2000);
              }}
            >
              {copiedJson ? 'Copied' : 'Copy'}
            </SecondaryButton>
            <PrimaryButton
              size="sm"
              icon={<Download className="w-3 h-3" />}
              onClick={handleExportJson}
            >
              Download
            </PrimaryButton>
          </div>
        </ModalShell>
      )}
    </div>
  );
};

export default SettingsView;
