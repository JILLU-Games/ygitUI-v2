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
 * ARCHITECTURE:
 * 1. Compact Header: Read-only user session indicator (avatar, name, handle, plan),
 *    realtime dirty tracking, and Save / Export actions.
 * 2. 4 Sub-Tabs:
 *    - 'preferences': Theme, monospace font, default workspace view, telemetry opt-out.
 *    - 'git': Default production branch, preferred package manager, output dir, auto-deploy.
 *    - 'tokens': Personal Access Tokens (PAT) with generator modal & instant revocation.
 *    - 'notifications': Build failure & success email alerts, Discord/Slack webhook.
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
  RefreshCw,
  Code2,
} from 'lucide-react';
import { UserSettings, SettingsTab, UserPersonalToken } from '../../types';

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
  // Active Settings Sub-Tab (Default to preferences, profile controls removed)
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

  // Helper functions for nested state updating (Profile controls removed per user request)
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
      <div className="bg-[#161b22] border border-[#21262d] rounded-md px-3 py-2 flex flex-wrap items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#1d6cf6] text-white flex items-center justify-center text-xs font-bold shrink-0">
            {formState.profile.avatarInitial || 'U'}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#f0f6fc]">
              {formState.profile.displayName}
            </span>
            <span className="text-[11px] font-mono text-[#8b949e]">
              @{formState.profile.username}
            </span>
            <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-[#1d6cf6]/10 border border-[#1d6cf6]/30 text-[#58a6ff]">
              {formState.profile.plan}
            </span>
            {isDirty ? (
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#d29922]/10 border border-[#d29922]/30 text-[#d29922] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d29922] animate-pulse"></span>
                Unsaved
              </span>
            ) : (
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#238636]/10 border border-[#238636]/30 text-[#3fb950] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]"></span>
                Synced
              </span>
            )}
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-1.5">
          {saveToast && (
            <span className="text-[10px] text-[#3fb950] font-mono flex items-center gap-1 mr-1 animate-in fade-in duration-150">
              <Check className="w-3 h-3" />
              {saveToast}
            </span>
          )}

          <button
            type="button"
            onClick={() => setShowJsonInspector(true)}
            className="h-6 px-2 rounded bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Code2 className="w-3 h-3 text-[#58a6ff]" />
            <span>JSON</span>
          </button>

          <button
            type="button"
            onClick={handleExportJson}
            className="h-6 px-2 rounded bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Download className="w-3 h-3 text-[#8b949e]" />
            <span>Export</span>
          </button>

          {isDirty && (
            <button
              type="button"
              onClick={handleReset}
              className="h-6 px-2 rounded bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#8b949e] hover:text-[#f0f6fc] text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Discard</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !isDirty}
            className={`h-6 px-2.5 rounded text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer ${
              isDirty
                ? 'bg-[#1d6cf6] hover:bg-[#2f7af8] text-white active:scale-95'
                : 'bg-[#21262d] text-[#7d8590] border border-[#30363d] cursor-not-allowed opacity-70'
            }`}
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3 h-3" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 
        ========================================================================
        2. USER SETTINGS SUB-TAB NAVIGATION (4 WORKSPACE TABS)
        ========================================================================
      */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-md p-0.5 flex items-center gap-0.5 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('preferences')}
          className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'preferences'
              ? 'bg-[#21262d] text-[#f0f6fc]'
              : 'text-[#8b949e] hover:bg-[#21262d]/50 hover:text-[#f0f6fc]'
          }`}
        >
          <Sliders className={`w-3 h-3 ${activeTab === 'preferences' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
          <span>Preferences</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('git')}
          className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'git'
              ? 'bg-[#21262d] text-[#f0f6fc]'
              : 'text-[#8b949e] hover:bg-[#21262d]/50 hover:text-[#f0f6fc]'
          }`}
        >
          <FolderGit2 className={`w-3 h-3 ${activeTab === 'git' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
          <span>Git Defaults</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tokens')}
          className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'tokens'
              ? 'bg-[#21262d] text-[#f0f6fc]'
              : 'text-[#8b949e] hover:bg-[#21262d]/50 hover:text-[#f0f6fc]'
          }`}
        >
          <Key className={`w-3 h-3 ${activeTab === 'tokens' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
          <span>Access Tokens</span>
          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#090d13] text-[#8b949e] border border-[#21262d]">
            {formState.tokens.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('notifications')}
          className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'notifications'
              ? 'bg-[#21262d] text-[#f0f6fc]'
              : 'text-[#8b949e] hover:bg-[#21262d]/50 hover:text-[#f0f6fc]'
          }`}
        >
          <Bell className={`w-3 h-3 ${activeTab === 'notifications' ? 'text-[#1d6cf6]' : 'text-[#7d8590]'}`} />
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
          <div className="bg-[#161b22] border border-[#21262d] rounded-md p-3 flex flex-col gap-2.5 shadow-xs">
            <div className="flex items-center gap-2 border-b border-[#21262d] pb-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#58a6ff]" />
              <h3 className="text-xs font-semibold text-[#f0f6fc]">Appearance & Editor</h3>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-[#c9d1d9]">
                Theme Appearance
              </label>
              <select
                value={formState.preferences.theme}
                onChange={(e) => updatePreferences('theme', e.target.value as any)}
                className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#1d6cf6] rounded px-2.5 py-1 text-xs text-[#f0f6fc] focus:outline-none transition-colors"
              >
                <option value="dark">Dark Charcoal (Default - #0d1117)</option>
                <option value="dim">Dim Slate</option>
                <option value="system">System Default</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-[#c9d1d9]">
                Monospace Font Family
              </label>
              <select
                value={formState.preferences.fontFamily}
                onChange={(e) => updatePreferences('fontFamily', e.target.value as any)}
                className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#1d6cf6] rounded px-2.5 py-1 text-xs font-mono text-[#f0f6fc] focus:outline-none transition-colors"
              >
                <option value="JetBrains Mono">JetBrains Mono</option>
                <option value="Geist Mono">Geist Mono</option>
                <option value="Fira Code">Fira Code</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-[#c9d1d9]">
                Default Project Workspace Tab
              </label>
              <select
                value={formState.preferences.defaultLandingView}
                onChange={(e) => updatePreferences('defaultLandingView', e.target.value as any)}
                className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#1d6cf6] rounded px-2.5 py-1 text-xs text-[#f0f6fc] focus:outline-none transition-colors"
              >
                <option value="overview">Overview</option>
                <option value="deployments">Deployments</option>
                <option value="logs">Logs Terminal</option>
              </select>
            </div>
          </div>

          {/* Card: Privacy & Telemetry */}
          <div className="bg-[#161b22] border border-[#21262d] rounded-md p-3 flex flex-col justify-between gap-2.5 shadow-xs">
            <div>
              <div className="flex items-center gap-2 border-b border-[#21262d] pb-1.5">
                <Activity className="w-3.5 h-3.5 text-[#58a6ff]" />
                <h3 className="text-xs font-semibold text-[#f0f6fc]">Privacy Preferences</h3>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-[11px] font-medium text-[#c9d1d9]">
                  Opt-Out of Anonymous Analytics
                </span>
                <button
                  type="button"
                  onClick={() => updatePreferences('telemetryOptOut', !formState.preferences.telemetryOptOut)}
                  className={`w-8 h-4 rounded-full p-0.5 transition-colors cursor-pointer relative ${
                    formState.preferences.telemetryOptOut ? 'bg-[#1d6cf6]' : 'bg-[#30363d]'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full bg-white transition-transform ${
                      formState.preferences.telemetryOptOut ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-[#21262d] text-[10.5px] text-[#8b949e]">
              YGIT respects developer privacy. No source code or environment variables are ever stored outside your local workspace enclave.
            </div>
          </div>
        </div>
      )}

      {/* ----------------- TAB 2: GIT DEFAULTS ----------------- */}
      {activeTab === 'git' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <div className="bg-[#161b22] border border-[#21262d] rounded-md p-3 flex flex-col gap-2.5 shadow-xs">
            <div className="flex items-center gap-2 border-b border-[#21262d] pb-1.5">
              <FolderGit2 className="w-3.5 h-3.5 text-[#58a6ff]" />
              <h3 className="text-xs font-semibold text-[#f0f6fc]">Git Defaults</h3>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-[#c9d1d9]">
                Default Production Branch
              </label>
              <select
                value={formState.gitDefaults.defaultBranch}
                onChange={(e) => updateGitDefaults('defaultBranch', e.target.value as any)}
                className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#1d6cf6] rounded px-2.5 py-1 text-xs font-mono text-[#f0f6fc] focus:outline-none transition-colors"
              >
                <option value="main">main</option>
                <option value="master">master</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-[#c9d1d9]">
                Preferred Package Manager
              </label>
              <div className="grid grid-cols-4 gap-1">
                {(['pnpm', 'bun', 'yarn', 'npm'] as const).map((pm) => (
                  <button
                    key={pm}
                    type="button"
                    onClick={() => updateGitDefaults('packageManager', pm)}
                    className={`py-1 px-1.5 rounded text-[11px] font-mono font-medium border transition-colors cursor-pointer text-center ${
                      formState.gitDefaults.packageManager === pm
                        ? 'bg-[#1d6cf6]/10 border-[#1d6cf6] text-[#58a6ff]'
                        : 'bg-[#090d13] border-[#30363d] text-[#8b949e] hover:border-[#8b949e]'
                    }`}
                  >
                    {pm}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-[#c9d1d9]">
                Default Output Directory
              </label>
              <input
                type="text"
                value={formState.gitDefaults.defaultOutputDir}
                onChange={(e) => updateGitDefaults('defaultOutputDir', e.target.value)}
                placeholder="dist"
                className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#1d6cf6] rounded px-2.5 py-1 text-xs font-mono text-[#f0f6fc] focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-1.5 border-t border-[#21262d] flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#c9d1d9]">
                Auto-Deploy on Push
              </span>
              <button
                type="button"
                onClick={() => updateGitDefaults('autoDeployOnPush', !formState.gitDefaults.autoDeployOnPush)}
                className={`w-8 h-4 rounded-full p-0.5 transition-colors cursor-pointer relative ${
                  formState.gitDefaults.autoDeployOnPush ? 'bg-[#1d6cf6]' : 'bg-[#30363d]'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-white transition-transform ${
                    formState.gitDefaults.autoDeployOnPush ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- TAB 3: ACCESS TOKENS ----------------- */}
      {activeTab === 'tokens' && (
        <div className="flex flex-col gap-2.5">
          <div className="bg-[#161b22] border border-[#21262d] rounded-md p-3 flex flex-col gap-2 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#21262d] pb-1.5">
              <div className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-[#58a6ff]" />
                <h3 className="text-xs font-semibold text-[#f0f6fc]">
                  Personal Access Tokens (PAT)
                </h3>
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#090d13] text-[#8b949e] border border-[#21262d]">
                  {formState.tokens.length}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowAddTokenModal(true)}
                className="h-5 px-2 rounded bg-[#1d6cf6] hover:bg-[#2f7af8] text-white text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>New Token</span>
              </button>
            </div>

            {/* Generated Token Banner */}
            {generatedTokenPreview && (
              <div className="bg-[#238636]/10 border border-[#238636]/30 rounded p-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-[#3fb950]" />
                  <code className="text-[11px] font-mono text-[#f0f6fc] select-all bg-[#090d13] px-1.5 py-0.5 rounded border border-[#21262d]">
                    {generatedTokenPreview}
                  </code>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (onCopyToClipboard) {
                        onCopyToClipboard(generatedTokenPreview, 'Token');
                      } else {
                        navigator.clipboard.writeText(generatedTokenPreview);
                      }
                    }}
                    className="h-5 px-2 rounded bg-[#238636] hover:bg-[#2ea043] text-white text-[10px] font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-2.5 h-2.5" />
                    <span>Copy</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGeneratedTokenPreview(null)}
                    className="h-5 px-1.5 rounded bg-[#21262d] text-[#8b949e] text-[10px]"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* Tokens Table */}
            <div className="border border-[#21262d] rounded overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#090d13] text-[#8b949e] font-mono text-[9.5px] uppercase border-b border-[#21262d]">
                  <tr>
                    <th className="py-1.5 px-2.5">Token Name</th>
                    <th className="py-1.5 px-2.5">Key Prefix</th>
                    <th className="py-1.5 px-2.5">Scope</th>
                    <th className="py-1.5 px-2.5">Expires</th>
                    <th className="py-1.5 px-2.5">Last Used</th>
                    <th className="py-1.5 px-2.5 text-right">Revoke</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#21262d]">
                  {formState.tokens.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-3 text-center text-[#8b949e] text-[11px]">
                        No active access tokens. Create one to authenticate YGIT CLI.
                      </td>
                    </tr>
                  ) : (
                    formState.tokens.map((token) => (
                      <tr key={token.id} className="hover:bg-[#21262d]/30 transition-colors">
                        <td className="py-1.5 px-2.5 font-medium text-[#f0f6fc] text-[11px]">
                          {token.name}
                        </td>
                        <td className="py-1.5 px-2.5 font-mono text-[#8b949e] text-[10.5px]">
                          {token.tokenMasked}
                        </td>
                        <td className="py-1.5 px-2.5">
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded border text-[#58a6ff] bg-[#1d6cf6]/10 border-[#1d6cf6]/30">
                            {token.scope}
                          </span>
                        </td>
                        <td className="py-1.5 px-2.5 text-[#7d8590] text-[10.5px]">
                          {token.expiresIn}
                        </td>
                        <td className="py-1.5 px-2.5 text-[#7d8590] text-[10.5px]">
                          {token.lastUsed}
                        </td>
                        <td className="py-1.5 px-2.5 text-right">
                          <button
                            type="button"
                            onClick={() => handleRevokeToken(token.id)}
                            className="text-[#f85149] hover:text-white hover:bg-[#f85149] p-0.5 rounded transition-colors cursor-pointer"
                            title="Revoke"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- TAB 4: ALERTS & NOTIFICATIONS ----------------- */}
      {activeTab === 'notifications' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <div className="bg-[#161b22] border border-[#21262d] rounded-md p-3 flex flex-col gap-2.5 shadow-xs">
            <div className="flex items-center gap-2 border-b border-[#21262d] pb-1.5">
              <Bell className="w-3.5 h-3.5 text-[#58a6ff]" />
              <h3 className="text-xs font-semibold text-[#f0f6fc]">Notification Alerts</h3>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-[#c9d1d9]">
                Alert Email
              </label>
              <input
                type="email"
                value={formState.notifications.notifyEmail}
                onChange={(e) => updateNotifications('notifyEmail', e.target.value)}
                placeholder="princeraj1396@gmail.com"
                className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#1d6cf6] rounded px-2.5 py-1 text-xs text-[#f0f6fc] focus:outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-[#c9d1d9]">
                Discord / Slack Incoming Webhook
              </label>
              <input
                type="url"
                value={formState.notifications.discordWebhook}
                onChange={(e) => updateNotifications('discordWebhook', e.target.value)}
                placeholder="https://discord.com/api/webhooks/..."
                className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#1d6cf6] rounded px-2.5 py-1 text-xs font-mono text-[#f0f6fc] focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-1.5 border-t border-[#21262d] flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#c9d1d9]">Email on Build Failures</span>
              <button
                type="button"
                onClick={() => updateNotifications('emailOnFailure', !formState.notifications.emailOnFailure)}
                className={`w-8 h-4 rounded-full p-0.5 transition-colors cursor-pointer relative ${
                  formState.notifications.emailOnFailure ? 'bg-[#f85149]' : 'bg-[#30363d]'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-white transition-transform ${
                    formState.notifications.emailOnFailure ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#c9d1d9]">Email on Success</span>
              <button
                type="button"
                onClick={() => updateNotifications('emailOnSuccess', !formState.notifications.emailOnSuccess)}
                className={`w-8 h-4 rounded-full p-0.5 transition-colors cursor-pointer relative ${
                  formState.notifications.emailOnSuccess ? 'bg-[#3fb950]' : 'bg-[#30363d]'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-white transition-transform ${
                    formState.notifications.emailOnSuccess ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 
        ========================================================================
        4. MODAL: GENERATE NEW PERSONAL ACCESS TOKEN
        ========================================================================
      */}
      {showAddTokenModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 z-50 animate-in fade-in duration-100">
          <div className="bg-[#161b22] border border-[#30363d] rounded-md max-w-sm w-full p-3.5 flex flex-col gap-2.5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#21262d] pb-1.5">
              <div className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-[#58a6ff]" />
                <h3 className="text-xs font-semibold text-[#f0f6fc]">New Access Token</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddTokenModal(false)}
                className="text-[#8b949e] hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={(e) => { handleCreateToken(e); setShowAddTokenModal(false); }} className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-[#c9d1d9]">
                  Token Name
                </label>
                <input
                  type="text"
                  required
                  value={newTokenName}
                  onChange={(e) => setNewTokenName(e.target.value)}
                  placeholder="e.g. Laptop CLI"
                  className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#1d6cf6] rounded px-2.5 py-1 text-xs text-[#f0f6fc] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-[#c9d1d9]">
                  Scope
                </label>
                <select
                  value={newTokenScope}
                  onChange={(e) => setNewTokenScope(e.target.value as any)}
                  className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#1d6cf6] rounded px-2.5 py-1 text-xs text-[#f0f6fc] focus:outline-none"
                >
                  <option value="Deploy Only">Deploy Only</option>
                  <option value="Full Access">Full Access</option>
                  <option value="Read Only">Read Only</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-[#c9d1d9]">
                  Expiration
                </label>
                <select
                  value={newTokenExpires}
                  onChange={(e) => setNewTokenExpires(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#1d6cf6] rounded px-2.5 py-1 text-xs text-[#f0f6fc] focus:outline-none"
                >
                  <option value="30 days">30 days</option>
                  <option value="90 days">90 days</option>
                  <option value="1 year">1 year</option>
                  <option value="Never">Never</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-[#21262d]">
                <button
                  type="button"
                  onClick={() => setShowAddTokenModal(false)}
                  className="h-6 px-2.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-[11px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-6 px-2.5 rounded bg-[#1d6cf6] hover:bg-[#2f7af8] text-white text-[11px] font-medium cursor-pointer"
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 
        ========================================================================
        5. MODAL: JSON SPECIFICATION INSPECTOR
        ========================================================================
      */}
      {showJsonInspector && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 z-50 animate-in fade-in duration-100">
          <div className="bg-[#161b22] border border-[#30363d] rounded-md max-w-xl w-full p-3.5 flex flex-col gap-2.5 shadow-xl max-h-[85vh]">
            <div className="flex items-center justify-between border-b border-[#21262d] pb-1.5">
              <div className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-[#58a6ff]" />
                <h3 className="text-xs font-semibold text-[#f0f6fc]">User Settings JSON</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowJsonInspector(false)}
                className="text-[#8b949e] hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <pre className="bg-[#090d13] border border-[#21262d] rounded p-2.5 text-[10.5px] font-mono text-[#58a6ff] overflow-auto max-h-[50vh] select-all leading-snug">
              {JSON.stringify(formState, null, 2)}
            </pre>

            <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-[#21262d]">
              <button
                type="button"
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
                className="h-6 px-2.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-[11px] font-medium flex items-center gap-1 cursor-pointer"
              >
                {copiedJson ? (
                  <>
                    <Check className="w-3 h-3 text-[#3fb950]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleExportJson}
                className="h-6 px-2.5 rounded bg-[#1d6cf6] hover:bg-[#2f7af8] text-white text-[11px] font-medium flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsView;
