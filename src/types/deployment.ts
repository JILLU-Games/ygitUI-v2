/**
 * Global Deployments & Build Log Types
 * Scope: Platform-wide deployment telemetry, chronological history, edge build logs.
 */

export interface GlobalDeployment {
  id: string;
  projectName: string;
  repo: string;
  branch: string;
  commitSha: string;
  commitMsg: string;
  author: string;
  status: 'live' | 'passed' | 'building' | 'failed';
  environment: 'Production' | 'Preview' | 'Development';
  trigger: 'Git Push' | 'Manual' | 'Webhook' | 'CLI';
  duration: string;
  timestamp: string;
  domain: string;
}

export interface DeployLogEntry {
  id: string;
  time: string;
  text: string;
  category: 'container' | 'info' | 'build' | 'edge';
  highlight: 'default' | 'muted' | 'blue' | 'yellow' | 'green';
}
