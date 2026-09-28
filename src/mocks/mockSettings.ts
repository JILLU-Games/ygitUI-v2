/**
 * ============================================================================
 * YGIT PLATFORM UI — INITIAL USER SETTINGS MOCK
 * FILE: src/mocks/mockSettings.ts
 * ============================================================================
 */

import { UserSettings } from '../types/settings';

export const INITIAL_USER_SETTINGS: UserSettings = {
  profile: {
    displayName: 'Prince Raj',
    username: 'vibtools',
    email: 'princeraj1396@gmail.com',
    bio: 'Fullstack & Cloudflare Edge Engineer',
    avatarInitial: 'P',
    plan: 'Pro Developer',
  },
  preferences: {
    theme: 'dark',
    fontFamily: 'JetBrains Mono',
    defaultLandingView: 'overview',
    telemetryOptOut: false,
  },
  gitDefaults: {
    defaultBranch: 'main',
    autoDeployOnPush: true,
    packageManager: 'pnpm',
    defaultOutputDir: 'dist',
  },
  tokens: [
    {
      id: 'pat_01',
      name: 'YGIT CLI Terminal Token',
      tokenMasked: 'ygt_pat_7e91••••••••••••••••••••••••3d82',
      created: '2026-09-15',
      lastUsed: '25m ago',
      expiresIn: '90 days',
      scope: 'Full Access',
    },
    {
      id: 'pat_02',
      name: 'GitHub Actions Push Hook',
      tokenMasked: 'ygt_pat_4a12••••••••••••••••••••••••89c1',
      created: '2026-08-20',
      lastUsed: 'Yesterday',
      expiresIn: 'Never',
      scope: 'Deploy Only',
    },
  ],
  notifications: {
    emailOnFailure: true,
    emailOnSuccess: false,
    notifyEmail: 'princeraj1396@gmail.com',
    discordWebhook: 'https://discord.com/api/webhooks/1298412/deploy-alerts',
  },
};

// Alias for backwards compatibility
export const INITIAL_PLATFORM_SETTINGS = INITIAL_USER_SETTINGS;
