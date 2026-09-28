/**
 * Project & Workspace Configuration Types
 * Scope: Project models, environment variables, domains, Cloudflare Pages/Worker bindings.
 */

export interface Project {
  id: string;
  name: string;
  repo: string;
  branch: string;
  provider: 'cloudflare' | 'github';
  domain: string;
  updated: string;
  timestamp: number;
  status: 'live' | 'building' | 'pending';
}

export interface EnvVar {
  id: string;
  key: string;
  value: string;
  environment: 'Production' | 'Preview' | 'Development' | 'All';
  isSecret: boolean;
  updatedAt?: string;
}

export interface CustomDomainItem {
  id: string;
  domain: string;
  isApex: boolean;
  targetBranch: string;
  dnsStatus: 'verified' | 'pending' | 'misconfigured';
  sslStatus: 'active' | 'provisioning' | 'expired';
  redirectMode: 'none' | 'https_only' | 'www_to_apex' | 'apex_to_www';
  cnameTarget: string;
  apexIp: string;
  txtRecordName: string;
  txtRecordValue: string;
  createdAt: string;
  lastChecked?: string;
}

export interface FreeSubdomainItem {
  id: string;
  subdomain: string;
  zone: string;
  isPrimary: boolean;
  status: 'active' | 'provisioning';
  createdAt: string;
}

export interface CfKvBinding {
  id: string;
  name: string;
  namespaceId: string;
  environment: string;
}

export interface CfD1Binding {
  id: string;
  name: string;
  databaseId: string;
  environment: string;
}

export interface CfR2Binding {
  id: string;
  name: string;
  bucketName: string;
  environment: string;
}

export interface CfDeployHook {
  id: string;
  name: string;
  branch: string;
  url: string;
  createdAt: string;
}

export interface CfWorkerRoute {
  id: string;
  pattern: string;
  handler: string;
}
