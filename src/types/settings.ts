/**
 * ============================================================================
 * YGIT PLATFORM UI — USER SETTINGS TYPES
 * FILE: src/types/settings.ts
 * ============================================================================
 * Scope: Developer account profile, UI preferences, personal access tokens (PAT),
 * Git defaults, and user notification alerts.
 */

export type SettingsTab = 'preferences' | 'git' | 'tokens' | 'notifications';

export interface UserPersonalToken {
  id: string;
  name: string;
  tokenMasked: string;
  fullToken?: string;
  created: string;
  lastUsed: string;
  expiresIn: string;
  scope: 'Full Access' | 'Deploy Only' | 'Read Only';
}

export interface UserProfileSettings {
  displayName: string;
  username: string;
  email: string;
  bio: string;
  avatarInitial: string;
  plan: 'Pro Developer' | 'Hobby' | 'Team Member';
}

export interface UserPreferenceSettings {
  theme: 'dark' | 'dim' | 'system';
  fontFamily: 'JetBrains Mono' | 'Geist Mono' | 'Fira Code';
  defaultLandingView: 'overview' | 'deployments' | 'logs';
  telemetryOptOut: boolean;
}

export interface UserGitDefaults {
  defaultBranch: 'main' | 'master';
  autoDeployOnPush: boolean;
  packageManager: 'pnpm' | 'bun' | 'yarn' | 'npm';
  defaultOutputDir: string;
}

export interface UserNotificationSettings {
  emailOnFailure: boolean;
  emailOnSuccess: boolean;
  notifyEmail: string;
  discordWebhook: string;
}

export interface UserSettings {
  profile: UserProfileSettings;
  preferences: UserPreferenceSettings;
  gitDefaults: UserGitDefaults;
  tokens: UserPersonalToken[];
  notifications: UserNotificationSettings;
}

// Alias for backwards compatibility if needed
export type PlatformSettings = UserSettings;
export type ApiTokenItem = UserPersonalToken;
