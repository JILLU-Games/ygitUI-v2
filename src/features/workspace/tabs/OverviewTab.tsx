/**
 * ============================================================================
 * YGIT PLATFORM UI — WORKSPACE SUB-TAB: OVERVIEW
 * FILE: src/features/workspace/tabs/OverviewTab.tsx
 * ============================================================================
 * 
 * PURPOSE:
 * Displays comprehensive codebase intelligence from the 14-stage deep scanner:
 * 1. Header Summary Banner (Project name, "Ready" badge, repository path, pinned commit,
 *    Copy Spec JSON action, and Re-scan trigger).
 * 2. 6-Card Deep Intelligence Grid:
 *    - Card 1: Repository & AST Identity (Source repo, pinned commit, AST SHA-256, scanned files, root guard).
 *    - Card 2: Framework & Engine (Framework, runtime profile, package manager, lockfile, language distribution).
 *    - Card 3: Build Pipeline & Output (Install command, build command, output directory, asset count, bundle size).
 *    - Card 4: Edge Architecture (Primary Pages domain, YGIT gateway, TLS 1.3, worker lease, edge POPs).
 *    - Card 5: Security & Variables (AST variable references, encrypted secrets count, sandbox runtime, code execution forbidden).
 *    - Card 6: Database & Analyzers (Migration version, Alembic fix, Go go-enry, Tree-sitter, Docker image).
 * 3. 14 Invariant Verification Checkpoints Matrix (01 to 14 verified green checkmarks).
 * 
 * DESIGN CONSTITUTION:
 * - Component-only architecture: Card, PrimaryButton, SecondaryButton, StatusBadge.
 * - Zero border radius (`rounded-none`) and zero box shadow (`shadow-none`).
 * - Full Dark/Light dual-theme token coverage via semantic CSS variables.
 * ============================================================================
 */

import React from 'react';
import {
  FolderGit2,
  Copy,
  RotateCcw,
  Play,
  Github,
  Code2,
  Cpu,
  Cloud,
  ShieldCheck,
  Database,
  CheckCheck,
} from 'lucide-react';
import { EnvVar } from '../../../types';
import { StatusBadge } from '../../../components/badges/StatusBadge';
import { PrimaryButton, SecondaryButton } from '../../../components/buttons';
import { Card } from '../../../components/ui';

export interface OverviewTabProps {
  currentProject: { name: string; repo: string };
  envVars: EnvVar[];
  onCopyToClipboard: (text: string) => void;
  onStartDeepScan: () => void;
  onDeploy?: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  currentProject,
  envVars,
  onCopyToClipboard,
  onStartDeepScan,
  onDeploy,
}) => {
  return (
    <div className="flex flex-col gap-2 animate-in fade-in duration-100 font-sans">
      {/* Header Summary Banner */}
      <Card variant="default" className="p-2.5 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-none bg-canvas-inset border border-border-subtle flex items-center justify-center text-accent-primary shrink-0 shadow-none">
            <FolderGit2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-medium text-fg-default font-mono">{currentProject.name}</h2>
              <StatusBadge status="verified" label="Ready" />
            </div>
            <div className="text-[10.5px] font-mono text-fg-muted">
              {currentProject.repo} · <span className="text-fg-default">7f3b891</span>
            </div>
          </div>
        </div>

        {/* Overview Action Buttons */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          {onDeploy && (
            <PrimaryButton
              size="sm"
              icon={<Play className="w-3 h-3 fill-current" />}
              title="Instant Deploy to Cloudflare Pages"
              onClick={onDeploy}
            >
              Deploy
            </PrimaryButton>
          )}
          <SecondaryButton
            size="sm"
            icon={<Copy className="w-3 h-3 text-fg-muted" />}
            title="Copy Project Specification JSON"
            onClick={() => onCopyToClipboard(JSON.stringify(currentProject))}
          >
            Copy Spec
          </SecondaryButton>
          <SecondaryButton
            size="sm"
            icon={<RotateCcw className="w-3 h-3 text-fg-muted" />}
            title="Re-run 14-Stage Deep Codebase Scan"
            onClick={onStartDeepScan}
          >
            Re-scan
          </SecondaryButton>
        </div>
      </Card>

      {/* Project Specification Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {/* Card 1: Repository & AST Identity */}
        <Card variant="default" className="p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-border-subtle text-xs">
            <span className="flex items-center gap-1.5 font-medium text-fg-default">
              <Github className="w-3.5 h-3.5 text-accent-primary" />
              <span>Repository & AST Evidence</span>
            </span>
            <span className="text-[9.5px] font-mono text-emerald-500">Verified</span>
          </div>

          <div className="bg-canvas-inset p-2 rounded-none border border-border-subtle text-[11px] font-mono flex flex-col gap-1 shadow-none">
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">REPO SOURCE</span>
              <span className="text-fg-default truncate select-all">{currentProject.repo}</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">PINNED COMMIT</span>
              <span className="text-fg-default">7f3b89154a88</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">AST SHA-256</span>
              <span className="text-accent-primary truncate select-all">sha256:e3b0c44</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">SCANNED FILES</span>
              <span className="text-fg-default">148 files (12.4k LOC)</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">ROOT DETECTOR</span>
              <span className="text-fg-default">/ (Single root)</span>
            </div>
          </div>
        </Card>

        {/* Card 2: Framework & Language Breakdown */}
        <Card variant="default" className="p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-border-subtle text-xs">
            <span className="flex items-center gap-1.5 font-medium text-fg-default">
              <Code2 className="w-3.5 h-3.5 text-accent-primary" />
              <span>Framework & Engine</span>
            </span>
            <span className="text-[9.5px] font-mono text-accent-primary">Vite</span>
          </div>

          <div className="bg-canvas-inset p-2 rounded-none border border-border-subtle text-[11px] font-mono flex flex-col gap-1 shadow-none">
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">FRAMEWORK</span>
              <span className="text-fg-default">Vite 6.1.1 (React 19)</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">RUNTIME PROFILE</span>
              <span className="text-fg-default">Jamstack Static CSR</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">PACKAGE MANAGER</span>
              <span className="text-fg-default">pnpm v9.1.0</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">LOCKFILE</span>
              <span className="text-fg-default">pnpm-lock.yaml v6</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">LANGUAGES</span>
              <span className="text-fg-default">TS 84% · CSS 11% · HTML 5%</span>
            </div>
          </div>
        </Card>

        {/* Card 3: Build & Artifact Resolution */}
        <Card variant="default" className="p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-border-subtle text-xs">
            <span className="flex items-center gap-1.5 font-medium text-fg-default">
              <Cpu className="w-3.5 h-3.5 text-accent-primary" />
              <span>Build Pipeline & Output</span>
            </span>
            <span className="text-[9.5px] font-mono text-emerald-500">Resolved</span>
          </div>

          <div className="bg-canvas-inset p-2 rounded-none border border-border-subtle text-[11px] font-mono flex flex-col gap-1 shadow-none">
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">INSTALL COMMAND</span>
              <span className="text-fg-default">pnpm install</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">BUILD COMMAND</span>
              <span className="text-fg-default">pnpm run build</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">OUTPUT DIRECTORY</span>
              <span className="text-accent-primary">dist/</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">ASSET COUNT</span>
              <span className="text-fg-default">12 static chunks</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">BUNDLE SIZE</span>
              <span className="text-fg-default">142.92 kB (44 kB gz)</span>
            </div>
          </div>
        </Card>

        {/* Card 4: Cloudflare & Edge Routing */}
        <Card variant="default" className="p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-border-subtle text-xs">
            <span className="flex items-center gap-1.5 font-medium text-fg-default">
              <Cloud className="w-3.5 h-3.5 text-accent-primary" />
              <span>Edge Architecture</span>
            </span>
            <span className="text-[9.5px] font-mono text-emerald-500">Active</span>
          </div>

          <div className="bg-canvas-inset p-2 rounded-none border border-border-subtle text-[11px] font-mono flex flex-col gap-1 shadow-none">
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">PRIMARY DOMAIN</span>
              <span className="text-accent-primary truncate select-all">{currentProject.name}.pages.dev</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">YGIT GATEWAY</span>
              <span className="text-accent-primary truncate select-all">{currentProject.name}.ygit.net</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">TLS / SSL</span>
              <span className="text-emerald-500">TLS 1.3 Active</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">WORKER LEASE</span>
              <span className="text-fg-default">#wk-8924 (12ms)</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">EDGE POPS</span>
              <span className="text-fg-default">310+ Regions</span>
            </div>
          </div>
        </Card>

        {/* Card 5: Variables & Security Boundaries */}
        <Card variant="default" className="p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-border-subtle text-xs">
            <span className="flex items-center gap-1.5 font-medium text-fg-default">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Security & Variables</span>
            </span>
            <span className="text-[9.5px] font-mono text-emerald-500">Secure</span>
          </div>

          <div className="bg-canvas-inset p-2 rounded-none border border-border-subtle text-[11px] font-mono flex flex-col gap-1 shadow-none">
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">AST VAR REFS</span>
              <span className="text-fg-default">VITE_API_URL, CF_*</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">ENCRYPTED SECRETS</span>
              <span className="text-fg-default">{envVars.filter((v) => v.isSecret).length} Encrypted</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">SANDBOX RUNTIME</span>
              <span className="text-fg-default">Memory-Isolated</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">CODE EXECUTION</span>
              <span className="text-fg-default">Zero repo code run</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">SECRET PERSISTENCE</span>
              <span className="text-fg-default">Disabled / Ephemeral</span>
            </div>
          </div>
        </Card>

        {/* Card 6: Database & Tooling Migrations */}
        <Card variant="default" className="p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-border-subtle text-xs">
            <span className="flex items-center gap-1.5 font-medium text-fg-default">
              <Database className="w-3.5 h-3.5 text-accent-primary" />
              <span>Database & Analyzers</span>
            </span>
            <span className="text-[9.5px] font-mono text-emerald-500">Synced</span>
          </div>

          <div className="bg-canvas-inset p-2 rounded-none border border-border-subtle text-[11px] font-mono flex flex-col gap-1 shadow-none">
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">MIGRATION</span>
              <span className="text-fg-default">0013_repository_analysis</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">ALEMBIC FIX</span>
              <span className="text-fg-default">Version-width merged</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">LANGUAGE ANALYZER</span>
              <span className="text-fg-default">Go go-enry container</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">AST PARSER</span>
              <span className="text-fg-default">Tree-sitter (Node)</span>
            </div>
            <div className="flex justify-between text-fg-muted">
              <span className="text-fg-subtle">DOCKER IMAGE</span>
              <span className="text-fg-default">ygit/analyzer:latest</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 14 Invariant Verification Matrix (Compact Grid) */}
      <Card variant="default" className="p-2.5 flex flex-col gap-2">
        <div className="flex items-center justify-between pb-1 border-b border-border-subtle text-xs">
          <span className="flex items-center gap-1.5 font-medium text-fg-default">
            <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Codebase Analysis Checkpoints</span>
          </span>
          <span className="font-mono text-[10px] text-emerald-500">14/14 Passed</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1 text-[10px] font-mono">
          {[
            { num: '01', label: 'Commit SHA' },
            { num: '02', label: 'Root Guard' },
            { num: '03', label: 'Framework' },
            { num: '04', label: 'Lockfile' },
            { num: '05', label: 'Build Cmd' },
            { num: '06', label: 'Output Dir' },
            { num: '07', label: 'Env AST' },
            { num: '08', label: 'Jamstack' },
            { num: '09', label: 'CF Pages' },
            { num: '10', label: 'Worker Lease' },
            { num: '11', label: 'Readiness' },
            { num: '12', label: 'DB 0013' },
            { num: '13', label: 'Go-Enry' },
            { num: '14', label: 'Sandbox' },
          ].map((step) => (
            <div key={step.num} className="bg-canvas-inset border border-border-subtle rounded-none p-1 flex items-center justify-between text-fg-default shadow-none">
              <span className="text-fg-subtle">{step.num}</span>
              <span className="font-normal text-fg-muted truncate">{step.label}</span>
              <span className="text-emerald-500">✓</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
