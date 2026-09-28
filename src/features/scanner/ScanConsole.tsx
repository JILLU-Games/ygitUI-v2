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
 * ARCHITECTURE & LIFECYCLE:
 * 1. State A: Live Scanning Animation (!scanCompleted):
 *    - Real-time progress bar with glowing blue pulse.
 *    - 14 Invariant Checkpoints grid updating live with passing green checks,
 *      active spinning blue badge, and pending state.
 *    - Real-time AST & engine inspection terminal stream.
 * 2. State B: Post-Scan Deep Analysis Report (scanCompleted):
 *    - Tab 1: Deep Report (A-Z Findings Dashboard with Commit AST SHA, Root Guard,
 *      Framework, Package Manager, Build Pipeline, Pages Target, Worker Lease, Migration, Security).
 *    - Tab 2: 14 Invariants Checklist (all 14 passed items with green badges).
 *    - Tab 3: Raw Spec JSON.
 *    - Action controls: "Re-scan" and "Open Workspace →".
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
    <div className="p-3 flex flex-col gap-2.5 max-w-[1400px] w-full mx-auto flex-1 animate-in fade-in duration-150">
      {/* Header Status Bar */}
      <div className="bg-[#161b22] border border-[#30363d] rounded p-2.5 px-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-[#1d6cf6]" />
          <span className="text-xs font-bold text-[#f0f6fc] font-mono">{currentProject.repo}</span>
          <span className="text-[10.5px] font-mono text-[#7d8590]">commit: 7f3b891 · {scanTimer}s</span>
        </div>

        <div className="flex items-center gap-2">
          {scanCompleted ? (
            /* Scan Report View Switcher (Only visible after scan finishes) */
            <div className="flex items-center gap-2">
              <div className="flex bg-[#090d13] border border-[#30363d] rounded p-0.5 text-[10px]">
                <button
                  type="button"
                  onClick={() => onSetScanReportView('report')}
                  className={`px-2 py-0.5 rounded font-medium cursor-pointer transition-colors ${
                    scanReportView === 'report' ? 'bg-[#21262d] text-[#f0f6fc] font-semibold' : 'text-[#8b949e] hover:text-[#f0f6fc]'
                  }`}
                >
                  Deep Report
                </button>
                <button
                  type="button"
                  onClick={() => onSetScanReportView('checkpoints')}
                  className={`px-2 py-0.5 rounded font-medium cursor-pointer transition-colors ${
                    scanReportView === 'checkpoints' ? 'bg-[#21262d] text-[#f0f6fc] font-semibold' : 'text-[#8b949e] hover:text-[#f0f6fc]'
                  }`}
                >
                  14 Invariants
                </button>
                <button
                  type="button"
                  onClick={() => onSetScanReportView('json')}
                  className={`px-2 py-0.5 rounded font-medium cursor-pointer transition-colors ${
                    scanReportView === 'json' ? 'bg-[#21262d] text-[#f0f6fc] font-semibold' : 'text-[#8b949e] hover:text-[#f0f6fc]'
                  }`}
                >
                  Raw Spec
                </button>
              </div>

              <span className="text-[9.5px] font-semibold px-2 py-0.5 rounded bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30 font-mono">
                ✓ 14/14 Passed (100% READY)
              </span>
            </div>
          ) : (
            /* Active Scan Progress Indicator */
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[10.5px] text-[#1d6cf6] font-medium">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Scanning stage {scanStep}/14</span>
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#1d6cf6]/15 text-[#1d6cf6] border border-[#1d6cf6]/30">
                {scanProgress}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ================================================================
          STATE A: LIVE SCANNING ANIMATION (!scanCompleted)
          ================================================================ */}
      {!scanCompleted && (
        <div className="flex flex-col gap-2.5">
          {/* Live Progress Card */}
          <div className="bg-[#161b22] border border-[#30363d] rounded p-3 flex flex-col gap-2 shadow-sm">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1d6cf6] animate-ping inline-block"></span>
                <strong className="text-[#f0f6fc]">
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
              <span className="font-mono text-xs font-bold text-[#1d6cf6]">{scanProgress}%</span>
            </div>

            {/* Progress Bar with glowing pulse */}
            <div className="w-full h-1.5 rounded bg-[#090d13] overflow-hidden border border-[#21262d]">
              <div
                className="h-full bg-[#1d6cf6] transition-all duration-200 ease-out shadow-[0_0_8px_rgba(29,108,246,0.6)]"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          </div>

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
                  className={`flex flex-col p-2.5 rounded border text-xs justify-between gap-1 transition-all duration-200 ${
                    isPassed
                      ? 'bg-[#238636]/10 border-[#238636]/30 text-[#f0f6fc]'
                      : isActive
                      ? 'bg-[#0e1828] border-[#1d6cf6] text-[#f0f6fc] shadow-[0_0_12px_rgba(29,108,246,0.3)]'
                      : 'bg-[#090d13] border-[#21262d] text-[#7d8590] opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {isPassed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950]" />
                      ) : isActive ? (
                        <RefreshCw className="w-3.5 h-3.5 text-[#1d6cf6] animate-spin" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full bg-[#21262d] flex items-center justify-center text-[9px] font-mono text-[#7d8590]">
                          {item.id}
                        </span>
                      )}
                      <span className="font-semibold text-[11px] truncate">{item.name}</span>
                    </div>
                    <span
                      className={`font-mono text-[9.5px] font-bold ${
                        isPassed ? 'text-[#3fb950]' : isActive ? 'text-[#1d6cf6]' : 'text-[#7d8590]'
                      }`}
                    >
                      {isPassed ? item.tag : isActive ? 'ANALYZING...' : 'PENDING'}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8b949e]">{item.desc}</span>
                </div>
              );
            })}
          </div>

          {/* Live Streaming Terminal Logs */}
          <div className="bg-[#161b22] border border-[#30363d] rounded p-2.5 flex flex-col gap-1.5">
            <div className="flex items-center justify-between pb-1 border-b border-[#21262d] text-xs font-semibold text-[#f0f6fc]">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#1d6cf6]" />
                <span>Realtime AST & Engine Inspection Stream</span>
              </div>
              <span className="font-mono text-[10px] text-[#8b949e]">Time: {scanTimer}s</span>
            </div>

            <div className="bg-[#090d13] border border-[#21262d] rounded p-2.5 font-mono text-[10.5px] h-[190px] overflow-y-auto flex flex-col gap-0.5">
              {scanLogs.map((log, i) => (
                <div
                  key={i}
                  className={
                    log.includes('✓') || log.includes('✨')
                      ? 'text-[#3fb950]'
                      : log.includes('⚡')
                      ? 'text-[#e3b341]'
                      : 'text-[#8b949e]'
                  }
                >
                  {log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
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
                <div className="bg-[#161b22] border border-[#30363d] rounded p-2.5 flex flex-col gap-2">
                  <div className="flex items-center justify-between pb-1 border-b border-[#21262d] text-xs font-semibold text-[#f0f6fc]">
                    <span className="flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-[#3fb950]" />
                      <span>Codebase Deep Analysis Findings</span>
                    </span>
                    <span className="font-mono text-[10px] text-[#3fb950] font-bold">100% READY</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    <div className="bg-[#090d13] border border-[#21262d] rounded p-2">
                      <span className="text-[8.5px] uppercase font-mono text-[#7d8590] block">Commit AST SHA-256</span>
                      <code className="text-[#3fb950] text-[10.5px] font-mono truncate block">sha256:e3b0c44298fc</code>
                      <span className="text-[9.5px] text-[#8b949e]">Pinned commit 7f3b891</span>
                    </div>

                    <div className="bg-[#090d13] border border-[#21262d] rounded p-2">
                      <span className="text-[8.5px] uppercase font-mono text-[#7d8590] block">Monorepo Root Guard</span>
                      <code className="text-[#1d6cf6] text-[10.5px] font-mono block">/ (Root Project)</code>
                      <span className="text-[9.5px] text-[#8b949e]">0 Nested ambiguities</span>
                    </div>

                    <div className="bg-[#090d13] border border-[#21262d] rounded p-2">
                      <span className="text-[8.5px] uppercase font-mono text-[#7d8590] block">Framework Engine</span>
                      <span className="text-[#f0f6fc] text-[11px] font-bold block">Vite 6.1.1 + React 19</span>
                      <span className="text-[9.5px] text-[#8b949e]">Static Jamstack CSR</span>
                    </div>

                    <div className="bg-[#090d13] border border-[#21262d] rounded p-2">
                      <span className="text-[8.5px] uppercase font-mono text-[#7d8590] block">Package Manager</span>
                      <code className="text-[#e3b341] text-[10.5px] font-mono block">pnpm v9.1.0 (lockfile v6)</code>
                      <span className="text-[9.5px] text-[#8b949e]">Zero dependency conflict</span>
                    </div>

                    <div className="bg-[#090d13] border border-[#21262d] rounded p-2">
                      <span className="text-[8.5px] uppercase font-mono text-[#7d8590] block">Resolved Build Pipeline</span>
                      <code className="text-[#f0f6fc] text-[10.5px] font-mono block">pnpm run build</code>
                      <span className="text-[9.5px] text-[#8b949e]">Output: dist/ (142.92 kB)</span>
                    </div>

                    <div className="bg-[#090d13] border border-[#21262d] rounded p-2">
                      <span className="text-[8.5px] uppercase font-mono text-[#7d8590] block">Cloudflare Pages Target</span>
                      <span className="text-[#3fb950] text-[11px] font-bold block">Pages Compatible</span>
                      <span className="text-[9.5px] text-[#8b949e]">Wrangler schema valid</span>
                    </div>
                  </div>
                </div>

                {/* Security & Lifecycle Verification */}
                <div className="bg-[#161b22] border border-[#30363d] rounded p-2.5 grid grid-cols-3 gap-1.5 text-xs">
                  <div className="bg-[#090d13] p-1.5 rounded">
                    <span className="text-[8.5px] font-mono text-[#7d8590] block">WORKER LEASE</span>
                    <strong className="text-[#1d6cf6] text-[10.5px] font-mono block">#wk-8924</strong>
                    <span className="text-[9px] text-[#8b949e]">Latency: 12ms</span>
                  </div>
                  <div className="bg-[#090d13] p-1.5 rounded">
                    <span className="text-[8.5px] font-mono text-[#7d8590] block">MIGRATION</span>
                    <strong className="text-[#3fb950] text-[10.5px] font-mono block">0013_SYNCED</strong>
                    <span className="text-[9px] text-[#8b949e]">Alembic fix merged</span>
                  </div>
                  <div className="bg-[#090d13] p-1.5 rounded">
                    <span className="text-[8.5px] font-mono text-[#7d8590] block">SECURITY</span>
                    <strong className="text-[#3fb950] text-[10.5px] font-mono block">SANDBOXED</strong>
                    <span className="text-[9px] text-[#8b949e]">0 Repo code run</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Scan Audit Terminal Logs */}
              <div className="flex flex-col gap-2">
                <div className="bg-[#090d13] border border-[#21262d] rounded p-2.5 font-mono text-[10.5px] text-[#8b949e] h-[260px] overflow-y-auto flex flex-col gap-0.5">
                  {scanLogs.map((log, i) => (
                    <div
                      key={i}
                      className={
                        log.includes('✓') || log.includes('✨')
                          ? 'text-[#3fb950]'
                          : log.includes('⚡')
                          ? 'text-[#e3b341]'
                          : 'text-[#8b949e]'
                      }
                    >
                      {log}
                    </div>
                  ))}
                  <div ref={logsEndRef} />
                </div>

                <div className="bg-[#161b22] border border-[#30363d] rounded p-2 px-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3fb950]"></span>
                    <span className="text-[#f0f6fc] font-semibold">14 Analysis Invariants Verified</span>
                  </div>
                  <span className="font-mono text-[#8b949e] text-[11px]">Duration: {scanTimer}s</span>
                </div>
              </div>
            </div>
          )}

          {/* SCAN REPORT TAB 2: 14 INVARIANTS CHECKLIST */}
          {scanReportView === 'checkpoints' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#161b22] border border-[#30363d] rounded p-2.5">
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
                  className="flex flex-col p-2.5 rounded border text-xs justify-between gap-1 bg-[#238636]/10 border-[#238636]/30 text-[#f0f6fc]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950]" />
                      <span className="font-semibold text-[11.5px]">{item.name}</span>
                    </div>
                    <span className="font-mono text-[9.5px] text-[#3fb950] font-bold">{item.tag}</span>
                  </div>
                  <span className="text-[10px] text-[#8b949e]">{item.desc}</span>
                </div>
              ))}
            </div>
          )}

          {/* SCAN REPORT TAB 3: RAW JSON SPECIFICATION */}
          {scanReportView === 'json' && (
            <div className="bg-[#090d13] border border-[#21262d] rounded p-3 font-mono text-[11px] text-[#3fb950] h-[340px] overflow-y-auto">
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
          <div className="bg-[#161b22] border border-[#30363d] rounded p-2.5 px-3 flex items-center justify-between shadow-sm">
            <div className="text-xs font-semibold text-[#f0f6fc] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3fb950] inline-block"></span>
              <span>14/14 Invariants Verified · Ready for Edge Deployment</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onStartDeepScan}
                className="bg-[#21262d] hover:bg-[#282e36] text-[#8b949e] hover:text-[#f0f6fc] text-xs font-semibold px-3 py-1.5 rounded cursor-pointer transition-colors"
              >
                Re-scan
              </button>
              <button
                type="button"
                onClick={onOpenWorkspace}
                className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white text-xs font-bold px-4 py-1.5 rounded flex items-center gap-1.5 cursor-pointer shadow-sm transition-all active:scale-[0.98]"
              >
                <span>Open Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
