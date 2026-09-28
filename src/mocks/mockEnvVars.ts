import {
  EnvVar,
  FreeSubdomainItem,
  CustomDomainItem,
  CfKvBinding,
  CfD1Binding,
  CfR2Binding,
  CfDeployHook,
  CfWorkerRoute,
} from '../types/project';

export const INITIAL_ENV_VARS: EnvVar[] = [
  {
    id: 'e1',
    key: 'VITE_API_URL',
    value: 'https://api.vib.tools/v1',
    environment: 'All',
    isSecret: false,
    updatedAt: '2 days ago',
  },
  {
    id: 'e2',
    key: 'CF_PAGES_COMMIT_SHA',
    value: '7f3b89154a88',
    environment: 'Production',
    isSecret: false,
    updatedAt: '1 day ago',
  },
  {
    id: 'e3',
    key: 'SUPABASE_ANON_KEY',
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ2aWJ0b29scyJ9',
    environment: 'All',
    isSecret: true,
    updatedAt: '3 hours ago',
  },
  {
    id: 'e4',
    key: 'DATABASE_URL',
    value: 'postgres://ygit_user:s3cr3t_pass@postgres-pool.edge:5432/main_db',
    environment: 'Production',
    isSecret: true,
    updatedAt: 'Just now',
  },
];

export const INITIAL_FREE_SUBDOMAINS: FreeSubdomainItem[] = [
  {
    id: 'fs-1',
    subdomain: 'vib-tools-app',
    zone: '.pages.dev',
    isPrimary: true,
    status: 'active',
    createdAt: '2 days ago',
  },
  {
    id: 'fs-2',
    subdomain: 'vib-tools-app',
    zone: '.ygit.net',
    isPrimary: false,
    status: 'active',
    createdAt: '2 days ago',
  },
];

export const INITIAL_CUSTOM_DOMAINS: CustomDomainItem[] = [
  {
    id: 'cd-1',
    domain: 'app.vibtools.dev',
    isApex: false,
    targetBranch: 'main',
    dnsStatus: 'verified',
    sslStatus: 'active',
    redirectMode: 'https_only',
    cnameTarget: 'vib-tools-app.pages.dev',
    apexIp: '76.76.21.21',
    txtRecordName: '_ygit-challenge.app.vibtools.dev',
    txtRecordValue: 'ygit-verify-token-7f3b89154a88',
    createdAt: '1 day ago',
    lastChecked: 'Just now',
  },
  {
    id: 'cd-2',
    domain: 'vibtools.dev',
    isApex: true,
    targetBranch: 'main',
    dnsStatus: 'pending',
    sslStatus: 'provisioning',
    redirectMode: 'apex_to_www',
    cnameTarget: 'cname.ygit.net',
    apexIp: '76.76.21.21',
    txtRecordName: '_ygit-challenge.vibtools.dev',
    txtRecordValue: 'ygit-verify-token-7f3b89154a88',
    createdAt: '2 hours ago',
    lastChecked: '5 mins ago',
  },
];

export const INITIAL_KV_BINDINGS: CfKvBinding[] = [
  { id: 'kv-1', name: 'CACHE_KV', namespaceId: '9b7f3a8820c845b4a92c31e', environment: 'Production' },
  { id: 'kv-2', name: 'SESSION_STORE', namespaceId: '3c8e41f02a9b47e29c6144d', environment: 'All' },
];

export const INITIAL_D1_BINDINGS: CfD1Binding[] = [
  { id: 'd1-1', name: 'DB', databaseId: '04a991f3-e381-42e5-bc09-085709926031', environment: 'Production' },
];

export const INITIAL_R2_BINDINGS: CfR2Binding[] = [
  { id: 'r2-1', name: 'ASSETS_BUCKET', bucketName: 'ygit-vibtools-assets-prod', environment: 'Production' },
];

export const INITIAL_DEPLOY_HOOKS: CfDeployHook[] = [
  {
    id: 'dh-1',
    name: 'CMS Rebuild (Sanity / Contentful)',
    branch: 'main',
    url: 'https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/9b4fe3a8820c845b4a92c31e7f3b89',
    createdAt: '3 days ago',
  },
];

export const INITIAL_WORKER_ROUTES: CfWorkerRoute[] = [
  { id: 'r1', pattern: '/api/*', handler: 'functions/api' },
  { id: 'r2', pattern: '/auth/*', handler: 'functions/auth' },
];
