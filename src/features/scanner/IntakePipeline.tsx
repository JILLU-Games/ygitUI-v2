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
 * 
 * DESIGN CONSTITUTION:
 * - Component-only architecture: Card, Input, Select, PrimaryButton, SecondaryButton.
 * - Zero border radius (`rounded-none`) and zero box shadow (`shadow-none`).
 * - Full Dark/Light dual-theme token coverage via semantic CSS variables.
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
import { PrimaryButton, SecondaryButton } from '../../components/buttons';
import { Card, Input, Select } from '../../components/ui';

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
    <div className="p-4 flex flex-col gap-3 max-w-[1400px] w-full mx-auto flex-1 animate-in fade-in duration-100 font-sans">
      {/* PROJECT METADATA STRIP */}
      <Card variant="default" className="p-2.5 px-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-none bg-canvas-inset border border-border-subtle flex items-center justify-center text-accent-primary shadow-none">
            <FolderGit2 className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[13.5px] font-semibold text-fg-default">{currentProject.name}</div>
            <div className="text-[11.5px] text-fg-muted">Production application setup</div>
          </div>
        </div>
        <span className="text-[9.5px] font-semibold uppercase px-1.5 py-0.5 rounded-none bg-canvas-inset text-fg-muted border border-border-subtle shadow-none">
          Setup Pending
        </span>
      </Card>

      {/* ================= 1. EMPTY BLANK STATE ================= */}
      {!isResourcePickerOpen && (
        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-border-default bg-canvas-subtle rounded-none py-10 px-5 text-center min-h-[400px] shadow-none">
          <div className="w-11 h-11 rounded-none bg-canvas-inset border border-border-default flex items-center justify-center text-fg-muted mb-3 shadow-none">
            <GitBranch className="w-5 h-5 text-fg-muted" />
          </div>
          <div className="text-[14px] font-semibold text-fg-default mb-1">No repository attached</div>
          <div className="text-[12px] text-fg-muted mb-4.5 max-w-sm">
            Connect a repository or source code to begin automated deployments.
          </div>
          <PrimaryButton
            size="md"
            icon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => {
              onSetIsResourcePickerOpen(true);
              onSetResourceSelected('clone');
            }}
          >
            Add Repo
          </PrimaryButton>
        </div>
      )}

      {/* ================= 2. CHOOSE A RESOURCE SECTION ================= */}
      {isResourcePickerOpen && (
        <div className="flex flex-col gap-3">
          <Card variant="default" className="p-3.5 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
              <div className="text-[13px] font-semibold text-fg-default flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-accent-primary" />
                <span>Choose a resource</span>
              </div>
              <SecondaryButton
                size="sm"
                onClick={() => {
                  onSetIsResourcePickerOpen(false);
                  onSetIsIntakePipelineActive(false);
                  onSetIntakeCompleted(false);
                }}
              >
                Back
              </SecondaryButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {/* Resource 1: Public Git Clone */}
              <div
                onClick={() => onSetResourceSelected('clone')}
                className={`border rounded-none p-3 flex flex-col gap-1.5 cursor-pointer transition-all select-none shadow-none ${
                  resourceSelected === 'clone'
                    ? 'border-accent-primary bg-accent-primary/10'
                    : 'border-border-default bg-canvas-inset hover:border-accent-primary hover:bg-canvas-subtle'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-none flex items-center justify-center shadow-none ${
                    resourceSelected === 'clone'
                      ? 'bg-accent-primary/20 border border-accent-primary text-accent-primary'
                      : 'bg-canvas-subtle border border-border-subtle text-accent-primary'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <div className="text-[12.5px] font-semibold text-fg-default">Public Git Clone</div>
                <div className="text-[11px] text-fg-muted leading-[1.35]">Clone any public repository via direct HTTPS URL.</div>
                <div className="mt-auto pt-1.5 flex items-center justify-between font-mono text-[9.5px] text-fg-subtle border-t border-border-subtle">
                  <span>● HTTPS Git</span>
                  <span className="text-accent-primary">Configure →</span>
                </div>
              </div>

              {/* Resource 2: Import Repo */}
              <div
                onClick={() => onSetResourceSelected('import')}
                className={`border rounded-none p-3 flex flex-col gap-1.5 cursor-pointer transition-all select-none shadow-none ${
                  resourceSelected === 'import'
                    ? 'border-accent-primary bg-accent-primary/10'
                    : 'border-border-default bg-canvas-inset hover:border-accent-primary hover:bg-canvas-subtle'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-none flex items-center justify-center shadow-none ${
                    resourceSelected === 'import'
                      ? 'bg-accent-primary/20 border border-accent-primary text-accent-primary'
                      : 'bg-canvas-subtle border border-border-subtle text-accent-primary'
                  }`}
                >
                  <Github className="w-3.5 h-3.5" />
                </div>
                <div className="text-[12.5px] font-semibold text-fg-default">Import Repo</div>
                <div className="text-[11px] text-fg-muted leading-[1.35]">Connect and select from your linked GitHub repositories.</div>
                <div className="mt-auto pt-1.5 flex items-center justify-between font-mono text-[9.5px] text-fg-subtle border-t border-border-subtle">
                  <span>● GitHub OAuth</span>
                  <span className="text-accent-primary">Select →</span>
                </div>
              </div>

              {/* Resource 3: Upload */}
              <div
                onClick={() => onSetResourceSelected('upload')}
                className={`border rounded-none p-3 flex flex-col gap-1.5 cursor-pointer transition-all select-none shadow-none ${
                  resourceSelected === 'upload'
                    ? 'border-accent-primary bg-accent-primary/10'
                    : 'border-border-default bg-canvas-inset hover:border-accent-primary hover:bg-canvas-subtle'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-none flex items-center justify-center shadow-none ${
                    resourceSelected === 'upload'
                      ? 'bg-accent-primary/20 border border-accent-primary text-accent-primary'
                      : 'bg-canvas-subtle border border-border-subtle text-accent-primary'
                  }`}
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                </div>
                <div className="text-[12.5px] font-semibold text-fg-default">Upload</div>
                <div className="text-[11px] text-fg-muted leading-[1.35]">Deploy static files directly via local zip bundle or folder.</div>
                <div className="mt-auto pt-1.5 flex items-center justify-between font-mono text-[9.5px] text-fg-subtle border-t border-border-subtle">
                  <span>● Zip / Folder</span>
                  <span className="text-accent-primary">Drop →</span>
                </div>
              </div>

              {/* Resource 4: Import from Template */}
              <div
                onClick={() => onSetResourceSelected('template')}
                className={`border rounded-none p-3 flex flex-col gap-1.5 cursor-pointer transition-all select-none shadow-none ${
                  resourceSelected === 'template'
                    ? 'border-accent-primary bg-accent-primary/10'
                    : 'border-border-default bg-canvas-inset hover:border-accent-primary hover:bg-canvas-subtle'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-none flex items-center justify-center shadow-none ${
                    resourceSelected === 'template'
                      ? 'bg-accent-primary/20 border border-accent-primary text-accent-primary'
                      : 'bg-canvas-subtle border border-border-subtle text-accent-primary'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="text-[12.5px] font-semibold text-fg-default">Import from Template</div>
                <div className="text-[11px] text-fg-muted leading-[1.35]">Start fast with pre-configured Vite, Next.js, or Astro starters.</div>
                <div className="mt-auto pt-1.5 flex items-center justify-between font-mono text-[9.5px] text-fg-subtle border-t border-border-subtle">
                  <span>● Starter Presets</span>
                  <span className="text-accent-primary">Browse →</span>
                </div>
              </div>
            </div>
          </Card>

          {/* ================= 3. DEDICATED RESOURCE MOCKUPS ================= */}

          {/* MOCKUP 1: PUBLIC GIT CLONE */}
          {resourceSelected === 'clone' && (
            <Card variant="default" className="p-3.5 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                <div className="text-[12.5px] font-semibold text-fg-default flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-accent-primary" />
                  <span>Public Git Clone</span>
                </div>
                <span className="text-[9.5px] font-semibold uppercase px-1.5 py-0.5 rounded-none bg-canvas-inset text-fg-muted border border-border-subtle">
                  Direct HTTPS
                </span>
              </div>

              <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                <div className="flex-1 min-w-[200px]">
                  <Input
                    type="text"
                    placeholder="https://github.com/organization/repository.git"
                    value={cloneInputUrl}
                    onChange={(e) => onSetCloneInputUrl(e.target.value)}
                    isMono
                  />
                </div>
                <div className="w-36">
                  <Input
                    type="text"
                    placeholder="Branch (e.g. main)"
                    value={cloneBranch}
                    onChange={(e) => onSetCloneBranch(e.target.value)}
                    isMono
                  />
                </div>
                <PrimaryButton
                  size="md"
                  onClick={() => onRunIntakePipeline('Public Git Clone', cloneInputUrl || 'vibtools/vib-agent')}
                >
                  Clone & Analyze
                </PrimaryButton>
              </div>

              <div className="flex items-center justify-between bg-canvas-inset border border-border-subtle rounded-none p-2 px-2.5 text-[11px] shadow-none">
                <div className="flex items-center gap-1.5 text-fg-muted">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Ownership-safe read only clone</span>
                </div>
                <div className="font-mono text-[10.5px] text-emerald-500">● Cloudflare Edge Worker Ready</div>
              </div>
            </Card>
          )}

          {/* MOCKUP 2: IMPORT REPO (GITHUB REPOSITORIES LIST) */}
          {resourceSelected === 'import' && (
            <Card variant="default" className="p-3.5 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                <div className="text-[12.5px] font-semibold text-fg-default flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-accent-primary" />
                  <span>Import GitHub Repository</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Select
                    value={selectedOrg}
                    onChange={(e) => onSetSelectedOrg(e.target.value)}
                  >
                    <option>vibtools (Org)</option>
                    <option>nurnobi (Personal)</option>
                  </Select>
                  <span className="text-[9.5px] font-semibold uppercase px-1.5 py-0.5 rounded-none bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                    Connected
                  </span>
                </div>
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Search repository..."
                  value={repoSearchQuery}
                  onChange={(e) => onSetRepoSearchQuery(e.target.value)}
                  prefixIcon={<Search className="w-3.5 h-3.5" />}
                />
              </div>

              <div className="border border-border-default rounded-none bg-canvas-inset max-h-[220px] overflow-y-auto flex flex-col divide-y divide-border-subtle shadow-none">
                {[
                  { name: 'vib-tools-web', type: 'Public', stars: '12' },
                  { name: 'domain-lookup-worker', type: 'Public', stars: '4' },
                  { name: 'licora-core-service', type: 'Private', stars: '1' },
                ]
                  .filter((r) => r.name.toLowerCase().includes(repoSearchQuery.toLowerCase()))
                  .map((repo) => (
                    <div key={repo.name} className="flex items-center justify-between p-2 px-2.5 hover:bg-canvas-subtle transition-colors">
                      <div className="flex items-center gap-2">
                        <GitBranch className="w-3.5 h-3.5 text-fg-subtle" />
                        <span className="font-semibold text-xs text-fg-default font-mono">{repo.name}</span>
                        <span
                          className={`text-[9.5px] font-semibold uppercase px-1.5 py-0.5 rounded-none border ${
                            repo.type === 'Public' ? 'bg-canvas-subtle text-fg-muted border-border-subtle' : 'bg-canvas-subtle text-fg-subtle border-border-subtle'
                          }`}
                        >
                          {repo.type}
                        </span>
                        <span className="font-mono text-[10px] text-fg-subtle">★ {repo.stars}</span>
                      </div>
                      <PrimaryButton
                        size="sm"
                        onClick={() => onRunIntakePipeline('GitHub Direct Import', repo.name)}
                      >
                        Import
                      </PrimaryButton>
                    </div>
                  ))}
              </div>
            </Card>
          )}

          {/* MOCKUP 3: UPLOAD (ZIP / FOLDER) */}
          {resourceSelected === 'upload' && (
            <Card variant="default" className="p-3.5 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                <div className="text-[12.5px] font-semibold text-fg-default flex items-center gap-1.5">
                  <UploadCloud className="w-3.5 h-3.5 text-accent-primary" />
                  <span>Direct Asset Upload</span>
                </div>
                <span className="text-[9.5px] font-semibold uppercase px-1.5 py-0.5 rounded-none bg-canvas-inset text-fg-muted border border-border-subtle">
                  Static Output
                </span>
              </div>

              <label className="border border-dashed border-border-default hover:border-accent-primary rounded-none bg-canvas-inset hover:bg-canvas-subtle p-7 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all shadow-none">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      onSetUploadedFileName(e.target.files[0].name);
                    }
                  }}
                />
                <div className="w-9 h-9 rounded-none bg-canvas-subtle border border-border-subtle flex items-center justify-center text-accent-primary mb-1 shadow-none">
                  <UploadCloud className="w-4.5 h-4.5" />
                </div>
                <div className="font-semibold text-[12.5px] text-fg-default">
                  {uploadedFileName || 'Drag and drop your project bundle here'}
                </div>
                <div className="text-[11px] text-fg-muted">
                  Supports .zip, .tar.gz archives or HTML folder dist (Max 100MB)
                </div>
                <SecondaryButton
                  size="compact"
                  type="button"
                  className="mt-1.5"
                >
                  Browse Local Files
                </SecondaryButton>
              </label>

              <div className="flex items-center justify-between gap-2">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Root directory (e.g. dist, build, public)"
                    value={distFolder}
                    onChange={(e) => onSetDistFolder(e.target.value)}
                    isMono
                  />
                </div>
                <PrimaryButton
                  size="md"
                  onClick={() => onRunIntakePipeline('Upload Bundle', uploadedFileName || 'bundle.zip')}
                >
                  Deploy Bundle
                </PrimaryButton>
              </div>
            </Card>
          )}

          {/* MOCKUP 4: IMPORT FROM TEMPLATE */}
          {resourceSelected === 'template' && (
            <Card variant="default" className="p-3.5 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                <div className="text-[12.5px] font-semibold text-fg-default flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-accent-primary" />
                  <span>Deploy Starter Template</span>
                </div>
                <span className="text-[9.5px] font-semibold uppercase px-1.5 py-0.5 rounded-none bg-canvas-inset text-fg-muted border border-border-subtle">
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
                    className="bg-canvas-inset border border-border-default hover:border-accent-primary rounded-none p-2.5 flex flex-col justify-between gap-2 transition-colors shadow-none"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-none bg-canvas-subtle border border-border-subtle flex items-center justify-center text-[11px] font-bold text-accent-primary shadow-none">
                        {tmpl.logo}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-fg-default">{tmpl.name}</div>
                        <div className="text-[10px] text-fg-subtle">{tmpl.desc}</div>
                      </div>
                    </div>
                    <PrimaryButton
                      fullWidth
                      size="sm"
                      onClick={() => onRunIntakePipeline('Template', tmpl.name)}
                    >
                      Clone Template
                    </PrimaryButton>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* ================= 4. INTAKE PROGRESS & BIG SCAN REPOSITORY TRIGGER ================= */}
          {isIntakePipelineActive && (
            <Card variant="default" className="p-3.5 flex flex-col gap-2.5 shadow-none">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {intakeCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <RefreshCw className="w-4 h-4 text-accent-primary animate-spin" />
                  )}
                  <span className="font-semibold text-fg-default">{intakeStatusText}</span>
                </div>
                <span className="font-mono text-xs font-bold text-accent-primary">{intakeProgress}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-none bg-canvas-inset overflow-hidden border border-border-subtle shadow-none">
                <div
                  className="h-full bg-accent-primary transition-all duration-300 ease-out"
                  style={{ width: `${intakeProgress}%` }}
                ></div>
              </div>

              {/* Big Scan Button upon Completion */}
              {intakeCompleted && (
                <PrimaryButton
                  fullWidth
                  size="cta"
                  icon={<Search className="w-4 h-4" />}
                  onClick={onStartDeepScan}
                  className="mt-1 shadow-none"
                >
                  <span>Scan Repository</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </PrimaryButton>
              )}
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
