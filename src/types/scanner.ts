/**
 * 14-Stage Deep Codebase Scanner Types
 * Scope: Diagnostic inspection checkpoints, sequential progression, invariant verification.
 */

export interface ScanCheckpoint {
  step: number;
  name: string;
  category: string;
  status: 'passed' | 'running' | 'pending' | 'failed';
  detail: string;
  evidence: string;
}

export interface ScanStepItem {
  step: number;
  progress: number;
  time: number;
  log: string;
}
