import { ScanStepItem } from '../types/scanner';

export const STEP_CHECKPOINTS: ScanStepItem[] = [
  { step: 1, progress: 8, time: 200, log: '[0.20s] ✓ [COMMIT-EVIDENCE] AST digest calculated: sha256:e3b0c44298fc (pinned commit 7f3b891)' },
  { step: 2, progress: 15, time: 400, log: '[0.40s] ✓ [ROOT-DETECTOR] Monorepo scan: verified root / (0 ambiguities, fail-closed passed)' },
  { step: 3, progress: 22, time: 600, log: '[0.60s] ✓ [FRAMEWORK] AST match: Vite 6.1.1 + React 19.0.1 (Jamstack Static CSR)' },
  { step: 4, progress: 30, time: 800, log: '[0.80s] ✓ [PACKAGE-MGR] Validated pnpm-lock.yaml v6 (pnpm v9.1.0, 0 version conflict)' },
  { step: 5, progress: 38, time: 1000, log: '[1.00s] ✓ [BUILD-COMMAND] Resolved install & build: pnpm run build (npm ci clean)' },
  { step: 6, progress: 45, time: 1200, log: '[1.20s] ✓ [OUTPUT-DIR] Target directory: dist/ (142.92 kB asset bundle verified)' },
  { step: 7, progress: 52, time: 1400, log: '[1.40s] ⚡ [ENV-VARS] AST variable reference detector: VITE_API_URL, CF_PAGES_COMMIT_SHA (0 leaks)' },
  { step: 8, progress: 60, time: 1600, log: '[1.60s] ✓ [RUNTIME] Jamstack static execution verified (No dynamic SSR blocker)' },
  { step: 9, progress: 68, time: 1800, log: '[1.80s] ✓ [PAGES-REGISTRY] Cloudflare Pages adapter compatibility verified (wrangler valid)' },
  { step: 10, progress: 75, time: 2000, log: '[2.00s] ✓ [WORKER-LEASE] Durable worker lease #wk-8924 allocated to queue (latency: 12ms)' },
  { step: 11, progress: 82, time: 2200, log: '[2.20s] ✓ [PROJECT-ATTACH] Context attached to project metadata (100% READY)' },
  { step: 12, progress: 90, time: 2400, log: '[2.40s] ✓ [DB-MIGRATION] Migration 0013_repository_analysis_deep_architecture synced (Alembic fix verified)' },
  { step: 13, progress: 95, time: 2600, log: '[2.60s] ✓ [ANALYZER-TOOLING] Go go-enry, Tree-sitter & Python analyzer initialized in Docker image' },
  { step: 14, progress: 100, time: 2800, log: '[2.80s] ✓ [SECURITY-SANDBOX] Sandboxed: Zero code execution, isolated worker sandbox, zero secret persistence' },
];

export const INITIAL_SCAN_LOGS: string[] = [
  '[0.10s] ✓ Commit 7f3b891 pinned',
  '[0.22s] ✓ 148 files indexed',
  '[0.35s] ⚡ Root: /',
];
