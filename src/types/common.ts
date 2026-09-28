/**
 * Common Platform & UI Types
 * Scope: Shared across all routes, tabs, and filters.
 */

export type ActiveRoute =
  | 'dashboard'
  | 'projects'
  | 'deployments'
  | 'accounts'
  | 'templates'
  | 'settings'
  | 'project-blank'
  | 'project-scan'
  | 'project-workspace';

export type WorkspaceTab =
  | 'overview'
  | 'env'
  | 'cloudflare'
  | 'domains'
  | 'logs'
  | 'history';

export type EnvironmentTarget = 'Production' | 'Preview' | 'Development' | 'All';

export type ProviderType = 'cloudflare' | 'github';

export type SortOrder = 'updated' | 'name';

export type LogFilter = 'all' | 'build' | 'edge' | 'info' | 'container';
