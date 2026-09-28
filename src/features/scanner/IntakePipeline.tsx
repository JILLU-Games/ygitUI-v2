/**
 * ============================================================================
 * YGIT PLATFORM UI — SCANNER COMPONENT: INTAKE PIPELINE (Project-Page-02.html)
 * FILE: src/features/scanner/IntakePipeline.tsx
 * ============================================================================
 * 
 * PURPOSE:
 * Implements the 4-channel repository intake workflow matching Project-Page-02.html:
 * 1. Project Metadata Header Strip (Folder avatar, Project title, "Setup Pending" badge).
 * 2. Empty Blank State Card (No repository attached, with "+ Add Repo" action trigger).
 * 3. Resource Picker Panel (4 Source Cards: Public Git Clone, Import Repo, Upload, Template).
 * 4. Dedicated Channel Form Mockups:
 *    - Channel 1: Public Git Clone (Direct HTTPS input, branch selector, read-only security badge).
 *    - Channel 2: Import GitHub Repository (Org switcher, repo search input, star ratings, 1-click Import).
 *    - Channel 3: Direct Asset Upload (Drag-and-drop bundle dropzone, dist directory input, Deploy bundle).
 *    - Channel 4: Import from Template (Quick clone starters for Vite, Next.js, Astro, Vue 3).
 * 5. Intake Pipeline Status & Big [Scan Repository ->] Action Button.
 * ============================================================================
 */

import React from 'react';
import {
  FolderGit2,
  GitBranch,
  Plus,
  Layers,
  Globe,
  Github,
  UploadCloud,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  Search,
  ArrowRight,
} from 'lucide-react';

export interface IntakePipelineProps {
  currentProject: { name: string; repo: string };
  isResourcePickerOpen: boolean;
  onSetIsResourcePickerOpen: (open: boolean) => void;
  resourceSelected: 'clone' | 'import' | 'upload' | 'template';
  onSetResourceSelected: (res: 'clone' | 'import' | 'upload' | 'template') => void;
  cloneInputUrl: string;
  onSetCloneInputUrl: (url: string) => void;
  cloneBranch: string;
  onSetCloneBranch: (branch: string) => void;
  selectedOrg: string;
  onSetSelectedOrg: (org: string) => void;
  repoSearchQuery: string;
  onSetRepoSearchQuery: (query: string) => void;
  uploadedFileName: string | null;
  onSetUploadedFileName: (name: string | null) => void;
  distFolder: string;
  onSetDistFolder: (folder: string) => void;
  onRunIntakePipeline: (source: string, details: string) => void;
  isIntakePipelineActive: boolean;
  onSetIsIntakePipelineActive: (active: boolean) => void;
  intakeCompleted: boolean;
  onSetIntakeCompleted: (completed: boolean) => void;
  intakeStatusText: string;
  intakeProgress: number;
  onStartDeepScan: () => void;
}

export const IntakePipeline: React.FC<IntakePipelineProps> = ({
  currentProject,
  isResourcePickerOpen,
  onSetIsResourcePickerOpen,
  resourceSelected,
  onSetResourceSelected,
  cloneInputUrl,
  onSetCloneInputUrl,
  cloneBranch,
  onSetCloneBranch,
  selectedOrg,
  onSetSelectedOrg,
  repoSearchQuery,
  onSetRepoSearchQuery,
  uploadedFileName,
  onSetUploadedFileName,
  distFolder,
  onSetDistFolder,
  onRunIntakePipeline,
  isIntakePipelineActive,
  onSetIsIntakePipelineActive,
  intakeCompleted,
  onSetIntakeCompleted,
  intakeStatusText,
  intakeProgress,
  onStartDeepScan,
}) => {
  return (
    <div className="p-4 flex flex-col gap-3 max-w-[1400px] w-full mx-auto flex-1 animate-in fade-in duration-150">
      {/* PROJECT METADATA STRIP */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-md p-2.5 px-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-[#090d13] border border-[#30363d] flex items-center justify-center text-[#1d6cf6]">
            <FolderGit2 className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[13.5px] font-semibold text-[#f0f6fc]">{currentProject.name}</div>
            <div className="text-[11.5px] text-[#8b949e]">Production application setup</div>
          </div>
        </div>
        <span className="text-[9.5px] font-semibold uppercase px-1.5 py-0.5 rounded bg-[#21262d] text-[#8b949e] border border-[#30363d]">
          Setup Pending
        </span>
      </div>

      {/* ================= 1. EMPTY BLANK STATE ================= */}
      {!isResourcePickerOpen && (
        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-[#30363d] bg-[#161b22] rounded-md py-10 px-5 text-center min-h-[400px]">
          <div className="w-11 h-11 rounded-full bg-[#090d13] border border-[#30363d] flex items-center justify-center text-[#8b949e] mb-3">
            <GitBranch className="w-5 h-5 text-[#8b949e]" />
          </div>
          <div className="text-[14px] font-semibold text-[#f0f6fc] mb-1">No repository attached</div>
          <div className="text-[12px] text-[#8b949e] mb-4.5 max-w-sm">
            Connect a repository or source code to begin automated deployments.
          </div>
          <button
            type="button"
            onClick={() => {
              onSetIsResourcePickerOpen(true);
              onSetResourceSelected('clone');
            }}
            className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white text-xs font-medium px-3.5 py-1.5 rounded flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Repo</span>
          </button>
        </div>
      )}

      {/* ================= 2. CHOOSE A RESOURCE SECTION ================= */}
      {isResourcePickerOpen && (
        <div className="flex flex-col gap-3">
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#21262d]">
              <div className="text-[13px] font-semibold text-[#f0f6fc] flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#1d6cf6]" />
                <span>Choose a resource</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onSetIsResourcePickerOpen(false);
                  onSetIsIntakePipelineActive(false);
                  onSetIntakeCompleted(false);
                }}
                className="bg-[#21262d] hover:bg-[#282e36] text-[#8b949e] hover:text-[#f0f6fc] px-2 py-0.5 rounded text-[11px] cursor-pointer border border-[#30363d] transition-colors"
              >
                Back
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {/* Resource 1: Public Git Clone */}
              <div
                onClick={() => onSetResourceSelected('clone')}
                className={`border rounded-md p-3 flex flex-col gap-1.5 cursor-pointer transition-all select-none ${
                  resourceSelected === 'clone'
                    ? 'border-[#1d6cf6] bg-[#0e1828] shadow-[0_0_0_1px_#1d6cf6]'
                    : 'border-[#30363d] bg-[#090d13] hover:border-[#1d6cf6] hover:bg-[#0f1622]'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded flex items-center justify-center ${
                    resourceSelected === 'clone'
                      ? 'bg-[#1d6cf6]/15 border border-[#1d6cf6] text-[#1d6cf6]'
                      : 'bg-[#161b22] border border-[#21262d] text-[#1d6cf6]'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <div className="text-[12.5px] font-semibold text-[#f0f6fc]">Public Git Clone</div>
                <div className="text-[11px] text-[#8b949e] leading-[1.35]">Clone any public repository via direct HTTPS URL.</div>
                <div className="mt-auto pt-1.5 flex items-center justify-between font-mono text-[9.5px] text-[#7d8590] border-t border-[#21262d]/50">
                  <span>● HTTPS Git</span>
                  <span className="text-[#1d6cf6]">Configure →</span>
                </div>
              </div>

              {/* Resource 2: Import Repo */}
              <div
                onClick={() => onSetResourceSelected('import')}
                className={`border rounded-md p-3 flex flex-col gap-1.5 cursor-pointer transition-all select-none ${
                  resourceSelected === 'import'
                    ? 'border-[#1d6cf6] bg-[#0e1828] shadow-[0_0_0_1px_#1d6cf6]'
                    : 'border-[#30363d] bg-[#090d13] hover:border-[#1d6cf6] hover:bg-[#0f1622]'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded flex items-center justify-center ${
                    resourceSelected === 'import'
                      ? 'bg-[#1d6cf6]/15 border border-[#1d6cf6] text-[#1d6cf6]'
                      : 'bg-[#161b22] border border-[#21262d] text-[#1d6cf6]'
                  }`}
                >
                  <Github className="w-3.5 h-3.5" />
                </div>
                <div className="text-[12.5px] font-semibold text-[#f0f6fc]">Import Repo</div>
                <div className="text-[11px] text-[#8b949e] leading-[1.35]">Connect and select from your linked GitHub repositories.</div>
                <div className="mt-auto pt-1.5 flex items-center justify-between font-mono text-[9.5px] text-[#7d8590] border-t border-[#21262d]/50">
                  <span>● GitHub OAuth</span>
                  <span className="text-[#1d6cf6]">Select →</span>
                </div>
              </div>

              {/* Resource 3: Upload */}
              <div
                onClick={() => onSetResourceSelected('upload')}
                className={`border rounded-md p-3 flex flex-col gap-1.5 cursor-pointer transition-all select-none ${
                  resourceSelected === 'upload'
                    ? 'border-[#1d6cf6] bg-[#0e1828] shadow-[0_0_0_1px_#1d6cf6]'
                    : 'border-[#30363d] bg-[#090d13] hover:border-[#1d6cf6] hover:bg-[#0f1622]'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded flex items-center justify-center ${
                    resourceSelected === 'upload'
                      ? 'bg-[#1d6cf6]/15 border border-[#1d6cf6] text-[#1d6cf6]'
                      : 'bg-[#161b22] border border-[#21262d] text-[#1d6cf6]'
                  }`}
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                </div>
                <div className="text-[12.5px] font-semibold text-[#f0f6fc]">Upload</div>
                <div className="text-[11px] text-[#8b949e] leading-[1.35]">Deploy static files directly via local zip bundle or folder.</div>
                <div className="mt-auto pt-1.5 flex items-center justify-between font-mono text-[9.5px] text-[#7d8590] border-t border-[#21262d]/50">
                  <span>● Zip / Folder</span>
                  <span className="text-[#1d6cf6]">Drop →</span>
                </div>
              </div>

              {/* Resource 4: Import from Template */}
              <div
                onClick={() => onSetResourceSelected('template')}
                className={`border rounded-md p-3 flex flex-col gap-1.5 cursor-pointer transition-all select-none ${
                  resourceSelected === 'template'
                    ? 'border-[#1d6cf6] bg-[#0e1828] shadow-[0_0_0_1px_#1d6cf6]'
                    : 'border-[#30363d] bg-[#090d13] hover:border-[#1d6cf6] hover:bg-[#0f1622]'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded flex items-center justify-center ${
                    resourceSelected === 'template'
                      ? 'bg-[#1d6cf6]/15 border border-[#1d6cf6] text-[#1d6cf6]'
                      : 'bg-[#161b22] border border-[#21262d] text-[#1d6cf6]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="text-[12.5px] font-semibold text-[#f0f6fc]">Import from Template</div>
                <div className="text-[11px] text-[#8b949e] leading-[1.35]">Start fast with pre-configured Vite, Next.js, or Astro starters.</div>
                <div className="mt-auto pt-1.5 flex items-center justify-between font-mono text-[9.5px] text-[#7d8590] border-t border-[#21262d]/50">
                  <span>● Starter Presets</span>
                  <span className="text-[#1d6cf6]">Browse →</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= 3. DEDICATED RESOURCE MOCKUPS ================= */}

          {/* MOCKUP 1: PUBLIC GIT CLONE */}
          {resourceSelected === 'clone' && (
            <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 flex flex-col gap-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#21262d]">
                <div className="text-[12.5px] font-semibold text-[#f0f6fc] flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#1d6cf6]" />
                  <span>Public Git Clone</span>
                </div>
                <span className="text-[9.5px] font-semibold uppercase px-1.5 py-0.5 rounded bg-[#21262d] text-[#8b949e] border border-[#30363d]">
                  Direct HTTPS
                </span>
              </div>

              <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                <input
                  type="text"
                  className="flex-2 min-w-[200px] bg-[#090d13] border border-[#30363d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] font-mono focus:border-[#1d6cf6] outline-none"
                  placeholder="https://github.com/organization/repository.git"
                  value={cloneInputUrl}
                  onChange={(e) => onSetCloneInputUrl(e.target.value)}
                />
                <input
                  type="text"
                  className="w-32 bg-[#090d13] border border-[#30363d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] font-mono focus:border-[#1d6cf6] outline-none"
                  placeholder="Branch (e.g. main)"
                  value={cloneBranch}
                  onChange={(e) => onSetCloneBranch(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => onRunIntakePipeline('Public Git Clone', cloneInputUrl || 'vibtools/vib-agent')}
                  className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white text-xs font-medium px-3.5 py-1.5 rounded cursor-pointer whitespace-nowrap transition-colors"
                >
                  Clone & Analyze
                </button>
              </div>

              <div className="flex items-center justify-between bg-[#090d13] border border-[#21262d] rounded p-2 px-2.5 text-[11px]">
                <div className="flex items-center gap-1.5 text-[#8b949e]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3fb950]" />
                  <span>Ownership-safe read only clone</span>
                </div>
                <div className="font-mono text-[10.5px] text-[#3fb950]">● Cloudflare Edge Worker Ready</div>
              </div>
            </div>
          )}

          {/* MOCKUP 2: IMPORT REPO (GITHUB REPOSITORIES LIST) */}
          {resourceSelected === 'import' && (
            <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 flex flex-col gap-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#21262d]">
                <div className="text-[12.5px] font-semibold text-[#f0f6fc] flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-[#1d6cf6]" />
                  <span>Import GitHub Repository</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <select
                    value={selectedOrg}
                    onChange={(e) => onSetSelectedOrg(e.target.value)}
                    className="bg-[#090d13] border border-[#30363d] text-[#f0f6fc] text-[11px] px-2 py-0.5 rounded outline-none cursor-pointer"
                  >
                    <option>vibtools (Org)</option>
                    <option>nurnobi (Personal)</option>
                  </select>
                  <span className="text-[9.5px] font-semibold uppercase px-1.5 py-0.5 rounded bg-[#21262d] text-[#3fb950] border border-[#30363d]">
                    Connected
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="flex-1 bg-[#090d13] border border-[#30363d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] outline-none focus:border-[#1d6cf6]"
                  placeholder="Search repository..."
                  value={repoSearchQuery}
                  onChange={(e) => onSetRepoSearchQuery(e.target.value)}
                />
              </div>

              <div className="border border-[#30363d] rounded bg-[#090d13] max-h-[220px] overflow-y-auto flex flex-col divide-y divide-[#21262d]">
                {[
                  { name: 'vib-tools-web', type: 'Public', stars: '12' },
                  { name: 'domain-lookup-worker', type: 'Public', stars: '4' },
                  { name: 'licora-core-service', type: 'Private', stars: '1' },
                ]
                  .filter((r) => r.name.toLowerCase().includes(repoSearchQuery.toLowerCase()))
                  .map((repo) => (
                    <div key={repo.name} className="flex items-center justify-between p-2 px-2.5 hover:bg-[#ffffff05] transition-colors">
                      <div className="flex items-center gap-2">
                        <GitBranch className="w-3.5 h-3.5 text-[#7d8590]" />
                        <span className="font-semibold text-xs text-[#f0f6fc]">{repo.name}</span>
                        <span
                          className={`text-[9.5px] font-semibold uppercase px-1.5 py-0.2 rounded border ${
                            repo.type === 'Public' ? 'bg-[#21262d] text-[#8b949e] border-[#30363d]' : 'bg-[#21262d] text-[#7d8590] border-[#30363d]'
                          }`}
                        >
                          {repo.type}
                        </span>
                        <span className="font-mono text-[10px] text-[#7d8590]">★ {repo.stars}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRunIntakePipeline('GitHub Direct Import', repo.name)}
                        className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white text-[11px] font-medium px-2.5 py-0.5 rounded cursor-pointer transition-colors"
                      >
                        Import
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* MOCKUP 3: UPLOAD (ZIP / FOLDER) */}
          {resourceSelected === 'upload' && (
            <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 flex flex-col gap-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#21262d]">
                <div className="text-[12.5px] font-semibold text-[#f0f6fc] flex items-center gap-1.5">
                  <UploadCloud className="w-3.5 h-3.5 text-[#1d6cf6]" />
                  <span>Direct Asset Upload</span>
                </div>
                <span className="text-[9.5px] font-semibold uppercase px-1.5 py-0.5 rounded bg-[#21262d] text-[#8b949e] border border-[#30363d]">
                  Static Output
                </span>
              </div>

              <label className="border border-dashed border-[#30363d] hover:border-[#1d6cf6] rounded-md bg-[#090d13] hover:bg-[#0f1622] p-7 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      onSetUploadedFileName(e.target.files[0].name);
                    }
                  }}
                />
                <div className="w-9 h-9 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#1d6cf6] mb-1">
                  <UploadCloud className="w-4.5 h-4.5" />
                </div>
                <div className="font-semibold text-[12.5px] text-[#f0f6fc]">
                  {uploadedFileName || 'Drag and drop your project bundle here'}
                </div>
                <div className="text-[11px] text-[#8b949e]">
                  Supports .zip, .tar.gz archives or HTML folder dist (Max 100MB)
                </div>
                <button
                  type="button"
                  className="mt-1.5 bg-[#21262d] hover:bg-[#282e36] text-[#f0f6fc] text-[11px] px-2.5 py-1 rounded border border-[#30363d]"
                >
                  Browse Local Files
                </button>
              </label>

              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  className="flex-1 bg-[#090d13] border border-[#30363d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] font-mono outline-none focus:border-[#1d6cf6]"
                  placeholder="Root directory (e.g. dist, build, public)"
                  value={distFolder}
                  onChange={(e) => onSetDistFolder(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => onRunIntakePipeline('Upload Bundle', uploadedFileName || 'bundle.zip')}
                  className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white text-xs font-medium px-3.5 py-1.5 rounded cursor-pointer transition-colors"
                >
                  Deploy Bundle
                </button>
              </div>
            </div>
          )}

          {/* MOCKUP 4: IMPORT FROM TEMPLATE */}
          {resourceSelected === 'template' && (
            <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 flex flex-col gap-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#21262d]">
                <div className="text-[12.5px] font-semibold text-[#f0f6fc] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#1d6cf6]" />
                  <span>Deploy Starter Template</span>
                </div>
                <span className="text-[9.5px] font-semibold uppercase px-1.5 py-0.5 rounded bg-[#21262d] text-[#8b949e] border border-[#30363d]">
                  Instant Clones
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {[
                  { name: 'Vite + React', logo: '⚛', desc: 'Fast SPA build' },
                  { name: 'Next.js Export', logo: '▲', desc: 'Static Jamstack' },
                  { name: 'Astro Edge', logo: '🚀', desc: 'Content site' },
                  { name: 'Vue 3 Single', logo: '💚', desc: 'Pinia & Router' },
                ].map((tmpl) => (
                  <div
                    key={tmpl.name}
                    className="bg-[#090d13] border border-[#30363d] hover:border-[#1d6cf6] rounded p-2.5 flex flex-col justify-between gap-2 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#161b22] border border-[#21262d] flex items-center justify-center text-[11px] font-bold text-[#1d6cf6]">
                        {tmpl.logo}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#f0f6fc]">{tmpl.name}</div>
                        <div className="text-[10px] text-[#7d8590]">{tmpl.desc}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRunIntakePipeline('Template', tmpl.name)}
                      className="w-full bg-[#1d6cf6] hover:bg-[#2f7af8] text-white text-[10.5px] font-medium py-1 rounded cursor-pointer transition-colors text-center"
                    >
                      Clone Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 4. INTAKE PROGRESS & BIG SCAN REPOSITORY TRIGGER ================= */}
          {isIntakePipelineActive && (
            <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 flex flex-col gap-2.5 shadow-md">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {intakeCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-[#3fb950]" />
                  ) : (
                    <RefreshCw className="w-4 h-4 text-[#1d6cf6] animate-spin" />
                  )}
                  <span className="font-semibold text-[#f0f6fc]">{intakeStatusText}</span>
                </div>
                <span className="font-mono text-xs font-bold text-[#1d6cf6]">{intakeProgress}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded bg-[#090d13] overflow-hidden border border-[#21262d]">
                <div
                  className="h-full bg-[#1d6cf6] transition-all duration-300 ease-out"
                  style={{ width: `${intakeProgress}%` }}
                ></div>
              </div>

              {/* Big Scan Button upon Completion */}
              {intakeCompleted && (
                <button
                  type="button"
                  onClick={onStartDeepScan}
                  className="w-full py-2.5 bg-[#1d6cf6] hover:bg-[#2f7af8] text-white font-bold text-xs rounded-md flex items-center justify-center gap-2 cursor-pointer mt-1 shadow-md transition-all active:scale-[0.99]"
                >
                  <Search className="w-4 h-4" />
                  <span>Scan Repository</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
