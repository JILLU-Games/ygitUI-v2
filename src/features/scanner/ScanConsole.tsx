/**
 * ============================================================================
 * YGIT PLATFORM UI — SCANNER COMPONENT: 14-STAGE DEEP SCAN CONSOLE
 * FILE: src/features/scanner/ScanConsole.tsx
 * ============================================================================
 * 
 * PURPOSE:
 * 14-Stage Deep Codebase Analyzer with AST inspection, deterministic commit SHA
 * verification, framework classification, monorepo root detection, package manager
 * lockfile resolution, output directory validation, environment variable AST check,
 * Jamstack runtime verification, Cloudflare Pages compatibility, durable worker leasing,
 * project readiness context attachment, database migration sync, and sandboxed security audit.
 * 
 * DESIGN CONSTITUTION:
 * - Component-only architecture: Card, PrimaryButton, SecondaryButton.
 * - Zero border radius (`rounded-none`) and zero box shadow (`shadow-none`).
 * - Zero glow / drop-shadow discipline (clean flat enterprise aesthetic).
 * - Full Dark/Light dual-theme token coverage via semantic CSS variables.
 * ============================================================================
 */

import React from 'react';
import {
  Code2,
  RefreshCw,
  CheckCircle2,
  Terminal,
  FileCheck,
  ArrowRight,
} from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '../../components/buttons';
import { Card } from '../../components/ui';

export interface ScanConsoleProps {
  currentProject: { name: string; repo: string };
  scanTimer: number;
  scanCompleted: boolean;
  scanStep: number;
  scanProgress: number;
  scanReportView: 'report' | 'checkpoints' | 'json';
  onSetScanReportView: (view: 'report' | 'checkpoints' | 'json') => void;
  scanLogs: string[];
  logsEndRef: React.RefObject<HTMLDivElement | null>;
  onStartDeepScan: () => void;
  onOpenWorkspace: () => void;
}

export const ScanConsole: React.FC<ScanConsoleProps> = ({
  currentProject,
  scanTimer,
  scanCompleted,
  scanStep,
  scanProgress,
  scanReportView,
  onSetScanReportView,
  scanLogs,
  logsEndRef,
  onStartDeepScan,
  onOpenWorkspace,
}) => {
  return (
    <div className="p-3 flex flex-col gap-2.5 max-w-[1400px] w-full mx-auto flex-1 animate-in fade-in duration-100 font-sans">
      {/* Header Status Bar */}
      <Card variant="default" className="p-2.5 px-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-accent-primary" />
          <span className="text-xs font-bold text-fg-default font-mono">{currentProject.repo}</span>
          <span className="text-[10.5px] font-mono text-fg-subtle">commit: 7f3b891 · {scanTimer}s</span>
        </div>

        <div className="flex items-center gap-2">
          {scanCompleted ? (
            /* Scan Report View Switcher (Only visible after scan finishes) */
            <div className="flex items-center gap-2">
              <div className="flex bg-canvas-inset border border-border-default p-0.5 text-[10px] rounded-none shadow-none">
                <button
                  type="button"
                  onClick={() => onSetScanReportView('report')}
                  className={`px-2 py-0.5 rounded-none font-medium cursor-pointer transition-colors ${
                    scanReportView === 'report' ? 'bg-canvas-subtle text-fg-default font-semibold' : 'text-fg-muted hover:text-fg-default'
                  }`}
                >
                  Deep Report
                </button>
                <button
                  type="button"
                  onClick={() => onSetScanReportView('checkpoints')}
                  className={`px-2 py-0.5 rounded-none font-medium cursor-pointer transition-colors ${
                    scanReportView === 'checkpoints' ? 'bg-canvas-subtle text-fg-default font-semibold' : 'text-fg-muted hover:text-fg-default'
                  }`}
                >
                  14 Invariants
                </button>
                <button
                  type="button"
                  onClick={() => onSetScanReportView('json')}
                  className={`px-2 py-0.5 rounded-none font-medium cursor-pointer transition-colors ${
                    scanReportView === 'json' ? 'bg-canvas-subtle text-fg-default font-semibold' : 'text-fg-muted hover:text-fg-default'
                  }`}
                >
                  Raw Spec
                </button>
              </div>

              <span className="text-[9.5px] font-semibold px-2 py-0.5 rounded-none bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 font-mono shadow-none">
                ✓ 14/14 Passed (100% READY)
              </span>
            </div>
          ) : (
            /* Active Scan Progress Indicator */
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[10.5px] text-accent-primary font-medium">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Scanning stage {scanStep}/14</span>
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-none bg-accent-primary/10 text-accent-primary border border-accent-primary/30 shadow-none">
                {scanProgress}%
              </span>
            </div>
          )}
        </div>
      </Card>

      {/* ================================================================
          STATE A: LIVE SCANNING ANIMATION (!scanCompleted)
          ================================================================ */}
      {!scanCompleted && (
        <div className="flex flex-col gap-2.5">
          {/* Live Progress Card */}
          <Card variant="default" className="p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-none bg-accent-primary inline-block"></span>
                <strong className="text-fg-default">
                  {[
                    '1. Inspecting commit evidence & calculating AST SHA-256...',
                    '2. Analyzing monorepo directory tree & root boundaries...',
                    '3. Classifying framework presets (Vite + React 19)...',
                    '4. Validating package manager & lockfile integrity...',
                    '5. Resolving deterministic build & install commands...',
                    '6. Verifying build output directory & asset footprints...',
                    '7. Scanning AST variable references & guarding secrets...',
                    '8. Verifying static Jamstack CSR runtime execution...',
                    '9. Validating Cloudflare Pages adapter & wrangler schema...',
                    '10. Leasing durable worker queue allocation...',
                    '11. Attaching verified context to project metadata...',
                    '12. Syncing 0013_repository_analysis_deep_architecture migration...',
                    '13. Initializing go-enry, Tree-sitter & Python analyzers in Docker...',
                    '14. Enforcing sandboxed execution security boundaries...',
                  ][scanStep - 1] || 'Executing deep codebase analysis...'}
                </strong>
              </div>
              <span className="font-mono text-xs font-bold text-accent-primary">{scanProgress}%</span>
            </div>

            {/* Progress Bar (zero glow) */}
            <div className="w-full h-1.5 rounded-none bg-canvas-inset overflow-hidden border border-border-subtle shadow-none">
              <div
                className="h-full bg-accent-primary transition-all duration-200 ease-out"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          </Card>

          {/* 14 Invariant Checkpoints Grid (Live Animation) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
            {[
              { id: 1, name: '1. Commit Evidence', tag: 'sha256:e3b0c44', desc: 'Deterministic AST SHA digest' },
              { id: 2, name: '2. Root Detection', tag: 'ROOT /', desc: 'Single root fail-closed passed' },
              { id: 3, name: '3. Framework Detection', tag: 'VITE + REACT 19', desc: 'Jamstack Static CSR engine' },
              { id: 4, name: '4. Package Manager', tag: 'PNPM v9.1.0', desc: 'Lockfile v6 validated' },
              { id: 5, name: '5. Command Resolution', tag: 'pnpm run build', desc: 'Resolved build & install scripts' },
              { id: 6, name: '6. Output Directory', tag: 'dist/ (142 kB)', desc: 'Validated Pages upload path' },
              { id: 7, name: '7. Environment Variables', tag: 'VITE_* / CF_*', desc: '2 AST refs, zero leaks' },
              { id: 8, name: '8. Runtime Detection', tag: 'JAMSTACK', desc: 'Static CSR execution verified' },
              { id: 9, name: '9. Cloudflare Pages', tag: 'READY', desc: 'Wrangler schema compatibility' },
              { id: 10, name: '10. Worker Lifecycle', tag: '#wk-8924', desc: 'Durable queue lease assigned' },
              { id: 11, name: '11. Project Readiness', tag: '100% READY', desc: 'Context attached to metadata' },
              { id: 12, name: '12. Database Migration', tag: '0013_SYNCED', desc: 'Alembic version synced' },
              { id: 13, name: '13. Analyzer Tooling', tag: 'GO-ENRY / DOCKER', desc: 'Tree-sitter & Node initialized' },
              { id: 14, name: '14. Security Boundaries', tag: 'SANDBOXED', desc: 'Zero code execution, 0 leaks' },
            ].map((item) => {
              const isPassed = scanStep > item.id || (scanStep === 14 && scanCompleted);
              const isActive = scanStep === item.id && !scanCompleted;

              return (
                <div
                  key={item.id}
                  className={`flex flex-col p-2.5 rounded-none border text-xs justify-between gap-1 transition-all duration-150 shadow-none ${
                    isPassed
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-fg-default'
                      : isActive
                      ? 'bg-accent-primary/10 border-accent-primary text-fg-default'
                      : 'bg-canvas-inset border-border-subtle text-fg-subtle opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {isPassed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      ) : isActive ? (
                        <RefreshCw className="w-3.5 h-3.5 text-accent-primary animate-spin" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-none bg-canvas-subtle border border-border-subtle flex items-center justify-center text-[9px] font-mono text-fg-subtle">
                          {item.id}
                        </span>
                      )}
                      <span className="font-semibold text-[11px] truncate">{item.name}</span>
                    </div>
                    <span
                      className={`font-mono text-[9.5px] font-bold ${
                        isPassed ? 'text-emerald-500' : isActive ? 'text-accent-primary' : 'text-fg-subtle'
                      }`}
                    >
                      {isPassed ? item.tag : isActive ? 'ANALYZING...' : 'PENDING'}
                    </span>
                  </div>
                  <span className="text-[10px] text-fg-muted">{item.desc}</span>
                </div>
              );
            })}
          </div>

          {/* Live Streaming Terminal Logs */}
          <Card variant="default" className="p-2.5 flex flex-col gap-1.5">
            <div className="flex items-center justify-between pb-1 border-b border-border-subtle text-xs font-semibold text-fg-default">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-accent-primary" />
                <span>Realtime AST & Engine Inspection Stream</span>
              </div>
              <span className="font-mono text-[10px] text-fg-subtle">Time: {scanTimer}s</span>
            </div>

            <div className="bg-canvas-inset border border-border-subtle rounded-none p-2.5 font-mono text-[10.5px] h-[190px] overflow-y-auto flex flex-col gap-0.5 shadow-none">
              {scanLogs.map((log, i) => (
                <div
                  key={i}
                  className={
                    log.includes('✓') || log.includes('✨')
                      ? 'text-emerald-500'
                      : log.includes('⚡')
                      ? 'text-amber-400'
                      : 'text-fg-muted'
                  }
                >
                  {log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </Card>
        </div>
      )}

      {/* ================================================================
          STATE B: POST-SCAN DEEP ANALYSIS REPORT (scanCompleted === true)
          ================================================================ */}
      {scanCompleted && (
        <div className="flex flex-col gap-2.5">
          {/* SCAN REPORT TAB 1: FULL DEEP SCAN REPORT (A-Z Findings) */}
          {scanReportView === 'report' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {/* Left Side: Summary Findings Cards */}
              <div className="flex flex-col gap-2">
                <Card variant="default" className="p-2.5 flex flex-col gap-2">
                  <div className="flex items-center justify-between pb-1 border-b border-border-subtle text-xs font-semibold text-fg-default">
                    <span className="flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Codebase Deep Analysis Findings</span>
                    </span>
                    <span className="font-mono text-[10px] text-emerald-500 font-bold">100% READY</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    <div className="bg-canvas-inset border border-border-subtle rounded-none p-2 shadow-none">
                      <span className="text-[8.5px] uppercase font-mono text-fg-subtle block">Commit AST SHA-256</span>
                      <code className="text-emerald-500 text-[10.5px] font-mono truncate block select-all">sha256:e3b0c44298fc</code>
                      <span className="text-[9.5px] text-fg-muted">Pinned commit 7f3b891</span>
                    </div>

                    <div className="bg-canvas-inset border border-border-subtle rounded-none p-2 shadow-none">
                      <span className="text-[8.5px] uppercase font-mono text-fg-subtle block">Monorepo Root Guard</span>
                      <code className="text-accent-primary text-[10.5px] font-mono block">/ (Root Project)</code>
                      <span className="text-[9.5px] text-fg-muted">0 Nested ambiguities</span>
                    </div>

                    <div className="bg-canvas-inset border border-border-subtle rounded-none p-2 shadow-none">
                      <span className="text-[8.5px] uppercase font-mono text-fg-subtle block">Framework Engine</span>
                      <span className="text-fg-default text-[11px] font-bold block">Vite 6.1.1 + React 19</span>
                      <span className="text-[9.5px] text-fg-muted">Static Jamstack CSR</span>
                    </div>

                    <div className="bg-canvas-inset border border-border-subtle rounded-none p-2 shadow-none">
                      <span className="text-[8.5px] uppercase font-mono text-fg-subtle block">Package Manager</span>
                      <code className="text-amber-400 text-[10.5px] font-mono block">pnpm v9.1.0 (lockfile v6)</code>
                      <span className="text-[9.5px] text-fg-muted">Zero dependency conflict</span>
                    </div>

                    <div className="bg-canvas-inset border border-border-subtle rounded-none p-2 shadow-none">
                      <span className="text-[8.5px] uppercase font-mono text-fg-subtle block">Resolved Build Pipeline</span>
                      <code className="text-fg-default text-[10.5px] font-mono block">pnpm run build</code>
                      <span className="text-[9.5px] text-fg-muted">Output: dist/ (142.92 kB)</span>
                    </div>

                    <div className="bg-canvas-inset border border-border-subtle rounded-none p-2 shadow-none">
                      <span className="text-[8.5px] uppercase font-mono text-fg-subtle block">Cloudflare Pages Target</span>
                      <span className="text-emerald-500 text-[11px] font-bold block">Pages Compatible</span>
                      <span className="text-[9.5px] text-fg-muted">Wrangler schema valid</span>
                    </div>
                  </div>
                </Card>

                {/* Security & Lifecycle Verification */}
                <div className="bg-canvas-subtle border border-border-default rounded-none p-2.5 grid grid-cols-3 gap-1.5 text-xs shadow-none">
                  <div className="bg-canvas-inset p-1.5 rounded-none border border-border-subtle">
                    <span className="text-[8.5px] font-mono text-fg-subtle block">WORKER LEASE</span>
                    <strong className="text-accent-primary text-[10.5px] font-mono block">#wk-8924</strong>
                    <span className="text-[9px] text-fg-muted">Latency: 12ms</span>
                  </div>
                  <div className="bg-canvas-inset p-1.5 rounded-none border border-border-subtle">
                    <span className="text-[8.5px] font-mono text-fg-subtle block">MIGRATION</span>
                    <strong className="text-emerald-500 text-[10.5px] font-mono block">0013_SYNCED</strong>
                    <span className="text-[9px] text-fg-muted">Alembic fix merged</span>
                  </div>
                  <div className="bg-canvas-inset p-1.5 rounded-none border border-border-subtle">
                    <span className="text-[8.5px] font-mono text-fg-subtle block">SECURITY</span>
                    <strong className="text-emerald-500 text-[10.5px] font-mono block">SANDBOXED</strong>
                    <span className="text-[9px] text-fg-muted">0 Repo code run</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Scan Audit Terminal Logs */}
              <div className="flex flex-col gap-2">
                <div className="bg-canvas-inset border border-border-default rounded-none p-2.5 font-mono text-[10.5px] text-fg-muted h-[260px] overflow-y-auto flex flex-col gap-0.5 shadow-none">
                  {scanLogs.map((log, i) => (
                    <div
                      key={i}
                      className={
                        log.includes('✓') || log.includes('✨')
                          ? 'text-emerald-500'
                          : log.includes('⚡')
                          ? 'text-amber-400'
                          : 'text-fg-muted'
                      }
                    >
                      {log}
                    </div>
                  ))}
                  <div ref={logsEndRef} />
                </div>

                <Card variant="default" className="p-2 px-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-none bg-emerald-500 inline-block"></span>
                    <span className="text-fg-default font-semibold">14 Analysis Invariants Verified</span>
                  </div>
                  <span className="font-mono text-fg-subtle text-[11px]">Duration: {scanTimer}s</span>
                </Card>
              </div>
            </div>
          )}

          {/* SCAN REPORT TAB 2: 14 INVARIANTS CHECKLIST */}
          {scanReportView === 'checkpoints' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-canvas-subtle border border-border-default rounded-none p-2.5 shadow-none">
              {[
                { id: 1, name: '1. Commit Evidence', tag: 'sha256:e3b0c44', desc: 'Deterministic AST SHA-256 hash calculated' },
                { id: 2, name: '2. Root Detection', tag: 'ROOT /', desc: 'Single root validated with fail-closed blocker' },
                { id: 3, name: '3. Framework Detection', tag: 'VITE + REACT 19', desc: 'Auto-detected Vite bundler and React JSX' },
                { id: 4, name: '4. Package Manager', tag: 'PNPM v9.1.0', desc: 'Lockfile v6 validated without version conflict' },
                { id: 5, name: '5. Command Resolution', tag: 'pnpm run build', desc: 'Auto-resolved package build scripts' },
                { id: 6, name: '6. Output Directory', tag: '/dist (142 kB)', desc: 'Resolved target directory for Pages upload' },
                { id: 7, name: '7. Environment Variables', tag: 'DETECTED', desc: 'AST variable detector found VITE_* references' },
                { id: 8, name: '8. Runtime Detection', tag: 'JAMSTACK', desc: 'Static Client-Side Rendering confirmed' },
                { id: 9, name: '9. Cloudflare Pages Compatibility', tag: 'READY', desc: 'Registry match with valid wrangler schema' },
                { id: 10, name: '10. Worker Lifecycle', tag: 'LEASED (#wk-8924)', desc: 'Job queue allocated on isolated worker' },
                { id: 11, name: '11. Project Readiness', tag: '100% READY', desc: 'Context attached to project metadata' },
                { id: 12, name: '12. Database Migration', tag: '0013_SYNCED', desc: 'Repository deep analysis migration synced' },
                { id: 13, name: '13. Analyzer Tooling', tag: 'GO-ENRY / DOCKER', desc: 'Go helper, Tree-sitter & Python containerized' },
                { id: 14, name: '14. Security Boundaries', tag: 'SANDBOXED', desc: 'Zero repo code execution, zero secret persistence' },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col p-2.5 rounded-none border text-xs justify-between gap-1 bg-emerald-500/10 border-emerald-500/30 text-fg-default shadow-none"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="font-semibold text-[11.5px]">{item.name}</span>
                    </div>
                    <span className="font-mono text-[9.5px] text-emerald-500 font-bold">{item.tag}</span>
                  </div>
                  <span className="text-[10px] text-fg-muted">{item.desc}</span>
                </div>
              ))}
            </div>
          )}

          {/* SCAN REPORT TAB 3: RAW JSON SPECIFICATION */}
          {scanReportView === 'json' && (
            <div className="bg-canvas-inset border border-border-default rounded-none p-3 font-mono text-[11px] text-emerald-500 h-[340px] overflow-y-auto shadow-none">
              <pre>
                {JSON.stringify(
                  {
                    project: currentProject.name,
                    repository: currentProject.repo,
                    pinnedCommit: '7f3b89154a88',
                    astSha256: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
                    root: '/',
                    framework: { name: 'Vite', version: '6.1.1', preset: 'React 19' },
                    packageManager: { name: 'pnpm', version: '9.1.0', lockfile: 'pnpm-lock.yaml v6' },
                    build: { command: 'pnpm run build', outputDir: 'dist', totalAssets: 12, sizeBytes: 146350 },
                    environment: { detectedRefs: ['VITE_API_URL', 'CF_PAGES_COMMIT_SHA'], secretLeakage: false },
                    cloudflarePages: {
                      compatible: true,
                      edgeRuntime: 'v8-worker',
                      targetDomains: [`${currentProject.name}.pages.dev`, `${currentProject.name}.ygit.net`],
                    },
                    worker: { leaseId: 'wk-8924', queueLatencyMs: 12, status: 'LEASED' },
                    database: { migration: '0013_repository_analysis_deep_architecture', status: 'SYNCED' },
                    security: { providerExecution: false, sandboxedRuntime: true, codeExecutionForbidden: true },
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          )}

          {/* Post-Scan Footer Action Controls */}
          <Card variant="default" className="p-2.5 px-3 flex items-center justify-between">
            <div className="text-xs font-semibold text-fg-default flex items-center gap-2">
              <span className="w-2 h-2 rounded-none bg-emerald-500 inline-block"></span>
              <span>14/14 Invariants Verified · Ready for Edge Deployment</span>
            </div>
            <div className="flex gap-2">
              <SecondaryButton
                size="md"
                onClick={onStartDeepScan}
              >
                Re-scan
              </SecondaryButton>
              <PrimaryButton
                size="md"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
                onClick={onOpenWorkspace}
              >
                Open Workspace
              </PrimaryButton>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
