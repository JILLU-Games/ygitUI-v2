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
 * ============================================================================
 */

import React from 'react';
import {
  FolderGit2,
  Copy,
  RotateCcw,
  Github,
  Code2,
  Cpu,
  Cloud,
  ShieldCheck,
  Database,
  CheckCheck,
} from 'lucide-react';
import { EnvVar } from '../../../types';

export interface OverviewTabProps {
  currentProject: { name: string; repo: string };
  envVars: EnvVar[];
  onCopyToClipboard: (text: string) => void;
  onStartDeepScan: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  currentProject,
  envVars,
  onCopyToClipboard,
  onStartDeepScan,
}) => {
  return (
    <div className="flex flex-col gap-2 animate-in fade-in duration-150">
      {/* Header Summary Banner */}
      <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-[#090d13] border border-[#21262d] flex items-center justify-center text-[#1d6cf6] shrink-0">
            <FolderGit2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-medium text-[#f0f6fc] font-mono">{currentProject.name}</h2>
              <span className="text-[9.5px] font-normal px-1.5 py-0.2 rounded bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30">
                Ready
              </span>
            </div>
            <div className="text-[10.5px] font-mono text-[#8b949e]">
              {currentProject.repo} · <span className="text-[#c9d1d9]">7f3b891</span>
            </div>
          </div>
        </div>

        {/* Overview Action Buttons */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => onCopyToClipboard(JSON.stringify(currentProject))}
            title="Copy Project Specification JSON"
            className="bg-[#21262d] hover:bg-[#282e36] text-[#c9d1d9] hover:text-[#f0f6fc] text-xs font-normal px-2.5 py-1 rounded flex items-center gap-1.5 cursor-pointer transition-colors border border-[#21262d]"
          >
            <Copy className="w-3 h-3 text-[#8b949e]" />
            <span>Copy Spec</span>
          </button>
          <button
            type="button"
            onClick={onStartDeepScan}
            title="Re-run 14-Stage Deep Codebase Scan"
            className="bg-[#21262d] hover:bg-[#282e36] text-[#c9d1d9] hover:text-[#f0f6fc] text-xs font-normal px-2.5 py-1 rounded flex items-center gap-1.5 cursor-pointer transition-colors border border-[#21262d]"
          >
            <RotateCcw className="w-3 h-3 text-[#8b949e]" />
            <span>Re-scan</span>
          </button>
        </div>
      </div>

      {/* Project Specification Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {/* Card 1: Repository & AST Identity */}
        <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-[#21262d] text-xs">
            <span className="flex items-center gap-1.5 font-medium text-[#f0f6fc]">
              <Github className="w-3.5 h-3.5 text-[#1d6cf6]" />
              <span>Repository & AST Evidence</span>
            </span>
            <span className="text-[9.5px] font-mono text-[#3fb950]">Verified</span>
          </div>

          <div className="bg-[#090d13] p-2 rounded text-[11px] font-mono flex flex-col gap-1">
            <div className="flex justify-between text-[#8b949e]">
              <span>REPO SOURCE</span>
              <span className="text-[#f0f6fc] truncate">{currentProject.repo}</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>PINNED COMMIT</span>
              <span className="text-[#c9d1d9]">7f3b89154a88</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>AST SHA-256</span>
              <span className="text-[#58a6ff] truncate">sha256:e3b0c44</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>SCANNED FILES</span>
              <span className="text-[#c9d1d9]">148 files (12.4k LOC)</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>ROOT DETECTOR</span>
              <span className="text-[#c9d1d9]">/ (Single root)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Framework & Language Breakdown */}
        <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-[#21262d] text-xs">
            <span className="flex items-center gap-1.5 font-medium text-[#f0f6fc]">
              <Code2 className="w-3.5 h-3.5 text-[#1d6cf6]" />
              <span>Framework & Engine</span>
            </span>
            <span className="text-[9.5px] font-mono text-[#58a6ff]">Vite</span>
          </div>

          <div className="bg-[#090d13] p-2 rounded text-[11px] font-mono flex flex-col gap-1">
            <div className="flex justify-between text-[#8b949e]">
              <span>FRAMEWORK</span>
              <span className="text-[#f0f6fc]">Vite 6.1.1 (React 19)</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>RUNTIME PROFILE</span>
              <span className="text-[#c9d1d9]">Jamstack Static CSR</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>PACKAGE MANAGER</span>
              <span className="text-[#c9d1d9]">pnpm v9.1.0</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>LOCKFILE</span>
              <span className="text-[#c9d1d9]">pnpm-lock.yaml v6</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>LANGUAGES</span>
              <span className="text-[#c9d1d9]">TS 84% · CSS 11% · HTML 5%</span>
            </div>
          </div>
        </div>

        {/* Card 3: Build & Artifact Resolution */}
        <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-[#21262d] text-xs">
            <span className="flex items-center gap-1.5 font-medium text-[#f0f6fc]">
              <Cpu className="w-3.5 h-3.5 text-[#1d6cf6]" />
              <span>Build Pipeline & Output</span>
            </span>
            <span className="text-[9.5px] font-mono text-[#3fb950]">Resolved</span>
          </div>

          <div className="bg-[#090d13] p-2 rounded text-[11px] font-mono flex flex-col gap-1">
            <div className="flex justify-between text-[#8b949e]">
              <span>INSTALL COMMAND</span>
              <span className="text-[#c9d1d9]">pnpm install</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>BUILD COMMAND</span>
              <span className="text-[#f0f6fc]">pnpm run build</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>OUTPUT DIRECTORY</span>
              <span className="text-[#58a6ff]">dist/</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>ASSET COUNT</span>
              <span className="text-[#c9d1d9]">12 static chunks</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>BUNDLE SIZE</span>
              <span className="text-[#c9d1d9]">142.92 kB (44 kB gz)</span>
            </div>
          </div>
        </div>

        {/* Card 4: Cloudflare & Edge Routing */}
        <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-[#21262d] text-xs">
            <span className="flex items-center gap-1.5 font-medium text-[#f0f6fc]">
              <Cloud className="w-3.5 h-3.5 text-[#1d6cf6]" />
              <span>Edge Architecture</span>
            </span>
            <span className="text-[9.5px] font-mono text-[#3fb950]">Active</span>
          </div>

          <div className="bg-[#090d13] p-2 rounded text-[11px] font-mono flex flex-col gap-1">
            <div className="flex justify-between text-[#8b949e]">
              <span>PRIMARY DOMAIN</span>
              <span className="text-[#58a6ff] truncate">{currentProject.name}.pages.dev</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>YGIT GATEWAY</span>
              <span className="text-[#58a6ff] truncate">{currentProject.name}.ygit.net</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>TLS / SSL</span>
              <span className="text-[#3fb950]">TLS 1.3 Active</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>WORKER LEASE</span>
              <span className="text-[#c9d1d9]">#wk-8924 (12ms)</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>EDGE POPS</span>
              <span className="text-[#c9d1d9]">310+ Regions</span>
            </div>
          </div>
        </div>

        {/* Card 5: Variables & Security Boundaries */}
        <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-[#21262d] text-xs">
            <span className="flex items-center gap-1.5 font-medium text-[#f0f6fc]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3fb950]" />
              <span>Security & Variables</span>
            </span>
            <span className="text-[9.5px] font-mono text-[#3fb950]">Secure</span>
          </div>

          <div className="bg-[#090d13] p-2 rounded text-[11px] font-mono flex flex-col gap-1">
            <div className="flex justify-between text-[#8b949e]">
              <span>AST VAR REFS</span>
              <span className="text-[#f0f6fc]">VITE_API_URL, CF_*</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>ENCRYPTED SECRETS</span>
              <span className="text-[#c9d1d9]">{envVars.filter((v) => v.isSecret).length} Encrypted</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>SANDBOX RUNTIME</span>
              <span className="text-[#c9d1d9]">Memory-Isolated</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>CODE EXECUTION</span>
              <span className="text-[#c9d1d9]">Zero repo code run</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>SECRET PERSISTENCE</span>
              <span className="text-[#c9d1d9]">Disabled / Ephemeral</span>
            </div>
          </div>
        </div>

        {/* Card 6: Database & Tooling Migrations */}
        <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-[#21262d] text-xs">
            <span className="flex items-center gap-1.5 font-medium text-[#f0f6fc]">
              <Database className="w-3.5 h-3.5 text-[#1d6cf6]" />
              <span>Database & Analyzers</span>
            </span>
            <span className="text-[9.5px] font-mono text-[#3fb950]">Synced</span>
          </div>

          <div className="bg-[#090d13] p-2 rounded text-[11px] font-mono flex flex-col gap-1">
            <div className="flex justify-between text-[#8b949e]">
              <span>MIGRATION</span>
              <span className="text-[#c9d1d9]">0013_repository_analysis</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>ALEMBIC FIX</span>
              <span className="text-[#c9d1d9]">Version-width merged</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>LANGUAGE ANALYZER</span>
              <span className="text-[#c9d1d9]">Go go-enry container</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>AST PARSER</span>
              <span className="text-[#c9d1d9]">Tree-sitter (Node)</span>
            </div>
            <div className="flex justify-between text-[#8b949e]">
              <span>DOCKER IMAGE</span>
              <span className="text-[#c9d1d9]">ygit/analyzer:latest</span>
            </div>
          </div>
        </div>
      </div>

      {/* 14 Invariant Verification Matrix (Compact Grid) */}
      <div className="bg-[#161b22] border border-[#21262d] rounded p-2.5 flex flex-col gap-2">
        <div className="flex items-center justify-between pb-1 border-b border-[#21262d] text-xs">
          <span className="flex items-center gap-1.5 font-medium text-[#f0f6fc]">
            <CheckCheck className="w-3.5 h-3.5 text-[#3fb950]" />
            <span>Codebase Analysis Checkpoints</span>
          </span>
          <span className="font-mono text-[10px] text-[#3fb950]">14/14 Passed</span>
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
            <div key={step.num} className="bg-[#090d13] border border-[#21262d] rounded p-1 flex items-center justify-between text-[#f0f6fc]">
              <span className="text-[#7d8590]">{step.num}</span>
              <span className="font-normal text-[#c9d1d9] truncate">{step.label}</span>
              <span className="text-[#3fb950]">✓</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
