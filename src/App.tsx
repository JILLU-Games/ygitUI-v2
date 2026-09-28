import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  Layers,
  FolderGit2,
  GitBranch,
  UploadCloud,
  CheckCircle2,
  Copy,
  Search,
  Plus,
  ArrowRight,
  Terminal,
  Activity,
  Github,
  Cloud,
  ShieldCheck,
  Globe,
  Sparkles,
  RefreshCw,
  X,
  FileArchive,
  ArrowLeft,
  Check,
  Code2,
  Eye,
  EyeOff,
  Key,
  History,
  Play,
  RotateCcw,
  CheckCheck,
  Database,
  Cpu,
  Lock,
  Download,
  Filter,
  FileText,
  FileCheck,
  ExternalLink,
  Sliders,
  Clock,
  ArrowDown,
  AlignLeft,
  Maximize2,
  Minimize2,
  AlertTriangle,
  Trash2,
  Edit3,
  Upload,
  Clipboard,
  Server,
  Radio,
  HardDrive,
  Flame,
  Share2,
  Webhook,
  Settings,
  Shuffle,
  Gauge,
  Network,
  Power,
  SlidersHorizontal,
  Boxes,
  Wrench,
  ShieldAlert,
  PanelLeftClose,
  PanelLeftOpen,
  PanelLeft,
  ShoppingCart,
  Store,
  Star,
  Layout,
  BookOpen,
  Smartphone,
  Monitor,
  Compass,
  CheckSquare,
  User,
  LogOut,
  ChevronDown,
  UserCheck
} from 'lucide-react';
import {
  Project,
  EnvVar,
  CustomDomainItem,
  FreeSubdomainItem,
  CfKvBinding,
  CfD1Binding,
  CfR2Binding,
  CfDeployHook,
  CfWorkerRoute,
  GlobalDeployment,
  ReadyTemplate,
  TemplateRoute,
  TemplateEnvVar,
  ActiveRoute,
  WorkspaceTab,
  ScanCheckpoint,
  ScanStepItem,
  PlatformSettings,
} from './types';

import {
  INITIAL_PROJECTS,
  INITIAL_DEPLOYMENTS,
  READY_TEMPLATES,
  STEP_CHECKPOINTS,
  INITIAL_SCAN_LOGS,
  INITIAL_ENV_VARS,
  INITIAL_FREE_SUBDOMAINS,
  INITIAL_CUSTOM_DOMAINS,
  INITIAL_KV_BINDINGS,
  INITIAL_D1_BINDINGS,
  INITIAL_R2_BINDINGS,
  INITIAL_DEPLOY_HOOKS,
  INITIAL_WORKER_ROUTES,
  INITIAL_PLATFORM_SETTINGS,
  getInitialDeployLogs,
} from './mocks';

import {
  BetaPill,
  YGitLogo,
  PrimaryButton,
  SecondaryButton,
  IconButton,
  StatusBadge,
  FrameworkBadge,
  TemplateThumbnailGraphic,
  TemplateModal,
  PrimarySidebar,
  SecondarySidebar,
} from './components';

import {
  DashboardView,
  ProjectsView,
  DeploymentsView,
  AccountsView,
  TemplatesView,
  SettingsView,
  IntakePipeline,
  ScanConsole,
  WorkspaceView,
} from './features';

import { DualSidebarLayout } from './layouts';


export default function App() {
  // Navigation: 'dashboard' | 'projects' | 'deployments' | 'accounts' | 'templates' | 'settings' | 'project-blank' | 'project-scan' | 'project-workspace'
  const [activeRoute, setActiveRoute] = useState<ActiveRoute>('dashboard');
  
  // Primary Sidebar Collapse State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Global Platform Settings State (Zero hardcoded values)
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>(INITIAL_PLATFORM_SETTINGS);

  // Deployments State & Filters
  const [deploymentsList, setDeploymentsList] = useState<GlobalDeployment[]>(INITIAL_DEPLOYMENTS);
  const [deploymentSearch, setDeploymentSearch] = useState('');
  const [deploymentEnvFilter, setDeploymentEnvFilter] = useState<'All' | 'Production' | 'Preview' | 'Development'>('All');
  const [deploymentStatusFilter, setDeploymentStatusFilter] = useState<'All' | 'live' | 'passed' | 'building' | 'failed'>('All');
  const [isAccountsModalOpen, setIsAccountsModalOpen] = useState(false);

  // Templates State & Filters
  const [templateSearch, setTemplateSearch] = useState('');
  const [templateCategoryFilter, setTemplateCategoryFilter] = useState<'All' | 'E-Commerce' | 'SaaS' | 'AI & Tooling' | 'Portfolio' | 'Blog' | 'Agency'>('All');
  const [templateFrameworkFilter, setTemplateFrameworkFilter] = useState<'All' | 'Next.js' | 'React + Vite' | 'Astro'>('All');
  const [selectedTemplateForDetails, setSelectedTemplateForDetails] = useState<ReadyTemplate | null>(null);
  const [deployingTemplateId, setDeployingTemplateId] = useState<string | null>(null);

  // Accounts Integration State
  const [isGithubConnected, setIsGithubConnected] = useState(true);
  const [isCloudflareConnected, setIsCloudflareConnected] = useState(true);
  const [isFastlyConnected, setIsFastlyConnected] = useState(false);
  const [isGithubSyncing, setIsGithubSyncing] = useState(false);
  const [isCloudflareSyncing, setIsCloudflareSyncing] = useState(false);
  const [githubLastSync, setGithubLastSync] = useState('2m ago');
  const [cloudflareLastSync, setCloudflareLastSync] = useState('10m ago');

  const handleToggleGithub = () => {
    if (isGithubConnected) {
      setIsGithubConnected(false);
      showToast('GitHub account disconnected');
    } else {
      setIsGithubSyncing(true);
      setTimeout(() => {
        setIsGithubConnected(true);
        setIsGithubSyncing(false);
        setGithubLastSync('Just now');
        showToast('✨ GitHub account @vibtools connected');
      }, 800);
    }
  };

  const handleSyncGithub = () => {
    setIsGithubSyncing(true);
    setTimeout(() => {
      setIsGithubSyncing(false);
      setGithubLastSync('Just now');
      showToast('GitHub repositories & webhooks re-synced');
    }, 800);
  };

  const handleToggleCloudflare = () => {
    if (isCloudflareConnected) {
      setIsCloudflareConnected(false);
      showToast('Cloudflare account disconnected');
    } else {
      setIsCloudflareSyncing(true);
      setTimeout(() => {
        setIsCloudflareConnected(true);
        setIsCloudflareSyncing(false);
        setCloudflareLastSync('Just now');
        showToast('✨ Cloudflare API credentials verified');
      }, 800);
    }
  };

  const handleSyncCloudflare = () => {
    setIsCloudflareSyncing(true);
    setTimeout(() => {
      setIsCloudflareSyncing(false);
      setCloudflareLastSync('Just now');
      showToast('Cloudflare edge worker credentials verified');
    }, 800);
  };

  const handleUseTemplate = (tmpl: ReadyTemplate) => {
    setDeployingTemplateId(tmpl.id);
    showToast(`⚡ Initializing template: ${tmpl.name}...`);
    setTimeout(() => {
      setDeployingTemplateId(null);
      setCurrentProject({
        name: tmpl.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
        repo: tmpl.repo,
      });
      setIsResourcePickerOpen(true);
      setResourceSelected('template');
      setIntakeCompleted(true);
      setIsIntakePipelineActive(true);
      setIntakeProgress(100);
      setIntakeStatusText(`Template cloned: ${tmpl.name} (Ready for 14-Stage Deep Scan)`);
      setActiveRoute('project-blank');
      if (selectedTemplateForDetails) {
        setSelectedTemplateForDetails(null);
      }
    }, 650);
  };
  
  // Workspace Sub-Tab: 'overview' | 'env' | 'cloudflare' | 'domains' | 'logs' | 'history'
  const [workspaceTab, setWorkspaceTab] = useState<'overview' | 'env' | 'cloudflare' | 'domains' | 'logs' | 'history'>('overview');

  // Projects State
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [currentProject, setCurrentProject] = useState<{ name: string; repo: string }>({
    name: 'vib-tools-app',
    repo: 'vibtools/vib-agent',
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  // Blank Setup State
  const [resourceSelected, setResourceSelected] = useState<'clone' | 'import' | 'upload' | 'template'>('clone');
  const [isResourcePickerOpen, setIsResourcePickerOpen] = useState(false);
  const [cloneInputUrl, setCloneInputUrl] = useState('https://github.com/vibtools/vib-agent');
  const [cloneBranch, setCloneBranch] = useState('main');
  const [selectedOrg, setSelectedOrg] = useState('vibtools (Org)');
  const [distFolder, setDistFolder] = useState('dist');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [repoSearchQuery, setRepoSearchQuery] = useState('');

  // Progress Pipeline & Scan State
  const [isIntakePipelineActive, setIsIntakePipelineActive] = useState(false);
  const [intakeProgress, setIntakeProgress] = useState(0);
  const [intakeStatusText, setIntakeStatusText] = useState('');
  const [intakeCompleted, setIntakeCompleted] = useState(false);

  // Deep Scan Pipeline State (14 Steps)
  const [scanStep, setScanStep] = useState(1);
  const [scanProgress, setScanProgress] = useState(8);
  const [scanTimer, setScanTimer] = useState(0.0);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [scanLogs, setScanLogs] = useState<string[]>(INITIAL_SCAN_LOGS);

  // Workspace Environment Variables State
  const [envVars, setEnvVars] = useState<EnvVar[]>(INITIAL_ENV_VARS);
  const [newEnvKey, setNewEnvKey] = useState('');
  const [newEnvVal, setNewEnvVal] = useState('');
  const [newEnvTarget, setNewEnvTarget] = useState<'All' | 'Production' | 'Preview' | 'Development'>('All');
  const [newEnvIsSecret, setNewEnvIsSecret] = useState(false);
  const [showSecretMap, setShowSecretMap] = useState<Record<string, boolean>>({});
  const [envSearchQuery, setEnvSearchQuery] = useState('');
  const [envFilterEnvironment, setEnvFilterEnvironment] = useState<'All' | 'Production' | 'Preview' | 'Development'>('All');
  
  // Bulk Paste / Import / Edit Modals State
  const [isPasteEnvModalOpen, setIsPasteEnvModalOpen] = useState(false);
  const [pasteEnvText, setPasteEnvText] = useState('');
  const [pasteEnvTarget, setPasteEnvTarget] = useState<'All' | 'Production' | 'Preview' | 'Development'>('All');
  const [pasteEnvIsSecret, setPasteEnvIsSecret] = useState(false);
  const [isEditEnvModalOpen, setIsEditEnvModalOpen] = useState(false);
  const [editingEnvVar, setEditingEnvVar] = useState<EnvVar | null>(null);
  const [envNeedsRebuild, setEnvNeedsRebuild] = useState(false);
  const [showAllSecrets, setShowAllSecrets] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSecretVisibility = (id: string) => {
    setShowSecretMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleAllSecrets = () => {
    const nextState = !showAllSecrets;
    setShowAllSecrets(nextState);
    const newMap: Record<string, boolean> = {};
    envVars.forEach((v) => {
      newMap[v.id] = nextState;
    });
    setShowSecretMap(newMap);
  };

  // Workspace Free & Custom Domains Management State
  const [freeSubdomains, setFreeSubdomains] = useState<FreeSubdomainItem[]>(INITIAL_FREE_SUBDOMAINS);
  const [customDomainList, setCustomDomainList] = useState<CustomDomainItem[]>(INITIAL_CUSTOM_DOMAINS);

  // Free Subdomain Search State
  const [subdomainSearchInput, setSubdomainSearchInput] = useState('');
  const [subdomainSearchZone, setSubdomainSearchZone] = useState<'.ygit.net' | '.pages.dev' | '.ygit.app'>('.ygit.net');
  const [isSearchingSubdomain, setIsSearchingSubdomain] = useState(false);
  const [subdomainSearchResult, setSubdomainSearchResult] = useState<{
    query: string;
    zone: string;
    isAvailable: boolean;
    suggestions: string[];
  } | null>(null);

  // Add Custom Domain Form State
  const [newCustomDomainInput, setNewCustomDomainInput] = useState('');
  const [newCustomDomainBranch, setNewCustomDomainBranch] = useState('main');
  const [newCustomDomainRedirect, setNewCustomDomainRedirect] = useState<'https_only' | 'apex_to_www' | 'www_to_apex' | 'none'>('https_only');

  // Modals & DNS State
  const [isDnsModalOpen, setIsDnsModalOpen] = useState(false);
  const [selectedDnsDomain, setSelectedDnsDomain] = useState<CustomDomainItem | null>(null);
  const [isEditDomainModalOpen, setIsEditDomainModalOpen] = useState(false);
  const [editingDomain, setEditingDomain] = useState<CustomDomainItem | null>(null);
  const [verifyingDomainIdMap, setVerifyingDomainIdMap] = useState<Record<string, boolean>>({});
  const [dnsProbeActive, setDnsProbeActive] = useState(false);
  const [dnsProbeLogs, setDnsProbeLogs] = useState<string[]>([]);

  // Cloudflare Pages & Workers Advanced Configuration State
  const [cfActiveSection, setCfActiveSection] = useState<'build' | 'functions' | 'performance' | 'security' | 'bindings' | 'webhooks' | 'wrangler' | 'danger'>('build');
  const [cfProjectName, setCfProjectName] = useState(currentProject.name || 'vib-tools-app');
  const [cfProductionBranch, setCfProductionBranch] = useState('main');
  const [cfFrameworkPreset, setCfFrameworkPreset] = useState<string>('vite');
  const [cfBuildCommand, setCfBuildCommand] = useState('pnpm run build');
  const [cfOutputDir, setCfOutputDir] = useState('dist');
  const [cfRootDir, setCfRootDir] = useState('/');
  const [cfPackageManager, setCfPackageManager] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm');
  const [cfNodeVersion, setCfNodeVersion] = useState('20.18.0');
  const [cfCompatDate, setCfCompatDate] = useState('2024-09-23');
  const [cfCompatFlags, setCfCompatFlags] = useState<string[]>(['nodejs_compat', 'transformstream_enable_standard_constructor']);
  const [cfBranchDeployments, setCfBranchDeployments] = useState<'all' | 'preview_only' | 'none'>('all');
  const [cfAutomaticComments, setCfAutomaticComments] = useState(true);

  // Functions & Edge Compute
  const [cfFunctionsEnabled, setCfFunctionsEnabled] = useState(true);
  const [cfFunctionsDir, setCfFunctionsDir] = useState('/functions');
  const [cfSmartPlacement, setCfSmartPlacement] = useState(true);
  const [cfFailOpen, setCfFailOpen] = useState(false);
  const [cfWorkerRoutes, setCfWorkerRoutes] = useState<CfWorkerRoute[]>(INITIAL_WORKER_ROUTES);
  const [newRoutePattern, setNewRoutePattern] = useState('');
  const [newRouteHandler, setNewRouteHandler] = useState('');

  // Performance & Caching
  const [cfAutoMinifyHtml, setCfAutoMinifyHtml] = useState(true);
  const [cfAutoMinifyCss, setCfAutoMinifyCss] = useState(true);
  const [cfAutoMinifyJs, setCfAutoMinifyJs] = useState(true);
  const [cfBrotli, setCfBrotli] = useState(true);
  const [cfEarlyHints, setCfEarlyHints] = useState(true);
  const [cfHttp3Quic, setCfHttp3Quic] = useState(true);
  const [cf0Rtt, setCf0Rtt] = useState(true);
  const [cfEdgeCacheTtl, setCfEdgeCacheTtl] = useState('4h');
  const [cfBrowserCacheTtl, setCfBrowserCacheTtl] = useState('respect');
  const [cfImageOptimization, setCfImageOptimization] = useState(true);

  // Security, SSL & Access
  const [cfSslMode, setCfSslMode] = useState<'strict' | 'full' | 'flexible' | 'off'>('strict');
  const [cfAlwaysHttps, setCfAlwaysHttps] = useState(true);
  const [cfMinTls, setCfMinTls] = useState<'1.2' | '1.3'>('1.2');
  const [cfHstsEnabled, setCfHstsEnabled] = useState(true);
  const [cfHstsMaxAge, setCfHstsMaxAge] = useState('12 months');
  const [cfHstsIncludeSubdomains, setCfHstsIncludeSubdomains] = useState(true);
  const [cfWafEnabled, setCfWafEnabled] = useState(true);
  const [cfBotFightMode, setCfBotFightMode] = useState(true);
  const [cfAccessPreviewAuth, setCfAccessPreviewAuth] = useState(false);

  // Bindings (KV, D1, R2, AI)
  const [cfKvBindings, setCfKvBindings] = useState<CfKvBinding[]>(INITIAL_KV_BINDINGS);
  const [cfD1Bindings, setCfD1Bindings] = useState<CfD1Binding[]>(INITIAL_D1_BINDINGS);
  const [cfR2Bindings, setCfR2Bindings] = useState<CfR2Binding[]>(INITIAL_R2_BINDINGS);
  const [cfAiBindingEnabled, setCfAiBindingEnabled] = useState(true);

  // Deploy Hooks / Webhooks
  const [cfDeployHooks, setCfDeployHooks] = useState<CfDeployHook[]>(INITIAL_DEPLOY_HOOKS);
  const [newDeployHookName, setNewDeployHookName] = useState('');
  const [newDeployHookBranch, setNewDeployHookBranch] = useState('main');

  // Purge Cache Modal
  const [isPurgeModalOpen, setIsPurgeModalOpen] = useState(false);
  const [purgeType, setPurgeType] = useState<'everything' | 'custom'>('everything');
  const [purgeUrlsText, setPurgeUrlsText] = useState('');
  const [isPurgingCache, setIsPurgingCache] = useState(false);

  // Add Binding Modals
  const [isAddKvModalOpen, setIsAddKvModalOpen] = useState(false);
  const [newKvName, setNewKvName] = useState('');
  const [newKvNamespaceId, setNewKvNamespaceId] = useState('');
  const [newKvEnvironment, setNewKvEnvironment] = useState('Production');

  const [isAddD1ModalOpen, setIsAddD1ModalOpen] = useState(false);
  const [newD1Name, setNewD1Name] = useState('');
  const [newD1DatabaseId, setNewD1DatabaseId] = useState('');
  const [newD1Environment, setNewD1Environment] = useState('Production');

  const [isAddR2ModalOpen, setIsAddR2ModalOpen] = useState(false);
  const [newR2Name, setNewR2Name] = useState('');
  const [newR2BucketName, setNewR2BucketName] = useState('');
  const [newR2Environment, setNewR2Environment] = useState('Production');
  const [isAddDeployHookModalOpen, setIsAddDeployHookModalOpen] = useState(false);
  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // Logs Developer Console State (Coolify / Vercel / Cloudflare style)
  const [logFilter, setLogFilter] = useState<'all' | 'build' | 'edge' | 'info' | 'container'>('all');
  const [logSearch, setLogSearch] = useState('');
  const [logAutoScroll, setLogAutoScroll] = useState(true);
  const [showLogTimestamps, setShowLogTimestamps] = useState(true);
  const [logWrapLines, setLogWrapLines] = useState(false);
  const [logFullScreen, setLogFullScreen] = useState(false);
  const [activeDeploymentStatus, setActiveDeploymentStatus] = useState<'running' | 'finished' | 'idle'>('finished');
  const [scanReportView, setScanReportView] = useState<'report' | 'checkpoints' | 'json'>('report');

  const INITIAL_DEPLOY_LOGS = getInitialDeployLogs(currentProject.name || 'vib-tools-app');

  const [deployLogsList, setDeployLogsList] = useState(INITIAL_DEPLOY_LOGS);

  // Dashboard Telemetry & Deployment Simulation State
  const [repoInputUrl, setRepoInputUrl] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployTimer, setDeployTimer] = useState(18.4);
  const [activeDeployStep, setActiveDeployStep] = useState(4);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Accounts Connected Status
  const [githubConnected, setGithubConnected] = useState(true);
  const [cloudflareConnected, setCloudflareConnected] = useState(true);

  // Projects Filter & Sort
  const [projectSearch, setProjectSearch] = useState('');
  const [providerFilter, setProviderFilter] = useState<'all' | 'cloudflare' | 'github'>('all');
  const [sortOrder, setSortOrder] = useState<'updated' | 'name'>('updated');

  // Header Profile Dropdown State & Ref
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const logsEndRef = useRef<HTMLDivElement>(null);

  // Deployment timer tick effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDeploying) {
      interval = setInterval(() => {
        setDeployTimer((prev) => +(prev + 0.1).toFixed(1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isDeploying]);

  // Deep Scan Pipeline Execution Simulation (14 Sequential Invariants)
  useEffect(() => {
    let timerInt: NodeJS.Timeout;
    const timeouts: NodeJS.Timeout[] = [];

    if (activeRoute === 'project-scan' && !scanCompleted) {
      timerInt = setInterval(() => {
        setScanTimer((prev) => +(prev + 0.1).toFixed(1));
      }, 100);

      const stepCheckpoints = STEP_CHECKPOINTS;

      stepCheckpoints.forEach(({ step, progress, time, log }) => {
        const t = setTimeout(() => {
          setScanStep(step);
          setScanProgress(progress);
          setScanLogs((prev) => [...prev, log]);
        }, time);
        timeouts.push(t);
      });

      const completeTimeout = setTimeout(() => {
        setScanCompleted(true);
        setScanLogs((prev) => [
          ...prev,
          '[3.00s] ✨ 14/14 INVARIANTS PASSED · CODEBASE ANALYSIS COMPLETE & READY',
        ]);
      }, 3100);
      timeouts.push(completeTimeout);

      return () => {
        clearInterval(timerInt);
        timeouts.forEach(clearTimeout);
      };
    }
  }, [activeRoute, scanCompleted]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Profile Dropdown: Dismiss on click-outside or ESC key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileMenuOpen(false);
      }
    };
    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProfileMenuOpen]);

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    showToast('Logged out of session. Session expired.');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${text}`);
  };

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newProjectName.trim() || 'unnamed-project';

    const newProj: Project = {
      id: 'p-' + Date.now(),
      name,
      repo: `${name}/main`,
      branch: 'main',
      provider: 'cloudflare',
      domain: `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.pages.dev`,
      updated: 'Just now',
      timestamp: 0,
      status: 'pending',
    };

    setProjects([newProj, ...projects]);
    setCurrentProject({ name, repo: `${name}/main` });
    setIsModalOpen(false);
    setNewProjectName('');
    setIsResourcePickerOpen(false);
    setResourceSelected('clone');
    setIntakeCompleted(false);
    setIsIntakePipelineActive(false);
    setActiveRoute('project-blank');
  };

  const runIntakePipeline = (sourceType: string, repoLabel: string) => {
    setIsIntakePipelineActive(true);
    setIntakeProgress(10);
    setIntakeCompleted(false);
    setIntakeStatusText(`Cloning source...`);

    setTimeout(() => {
      setIntakeProgress(40);
      setIntakeStatusText(`Creating repo @vibtools/${currentProject.name}...`);
    }, 500);

    setTimeout(() => {
      setIntakeProgress(75);
      setIntakeStatusText(`Pushing main branch...`);
    }, 1100);

    setTimeout(() => {
      setIntakeProgress(100);
      setIntakeStatusText(`Pushed to GitHub`);
      setIntakeCompleted(true);
      setCurrentProject((prev) => ({
        ...prev,
        repo: `vibtools/${currentProject.name}`,
      }));
    }, 1700);
  };

  const startDeepScan = () => {
    setScanStep(1);
    setScanProgress(8);
    setScanTimer(0.0);
    setScanCompleted(false);
    setActiveRoute('project-scan');
  };

  const handleAddEnvVar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEnvKey.trim()) return;
    const cleanKey = newEnvKey.trim().toUpperCase().replace(/[^A-Z0-9_]/g, '_');
    const newVar: EnvVar = {
      id: 'e-' + Date.now(),
      key: cleanKey,
      value: newEnvVal.trim(),
      environment: newEnvTarget,
      isSecret: newEnvIsSecret,
      updatedAt: 'Just now',
    };
    setEnvVars([newVar, ...envVars]);
    setNewEnvKey('');
    setNewEnvVal('');
    setNewEnvIsSecret(false);
    setEnvNeedsRebuild(true);
    showToast(`⚠️ Added ${cleanKey}. Rebuild required for edge deployment.`);
  };

  const handleDeleteEnvVar = (id: string) => {
    const target = envVars.find((v) => v.id === id);
    setEnvVars(envVars.filter((v) => v.id !== id));
    setEnvNeedsRebuild(true);
    showToast(`⚠️ Removed ${target ? target.key : 'variable'}. Rebuild required to apply changes.`);
  };

  const handleImportEnvFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      const lines = content.split('\n');
      const parsedVars: EnvVar[] = [];

      lines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;

        const eqIdx = trimmed.indexOf('=');
        if (eqIdx === -1) return;

        let key = trimmed.slice(0, eqIdx).trim().toUpperCase().replace(/[^A-Z0-9_]/g, '_');
        let value = trimmed.slice(eqIdx + 1).trim();

        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }

        if (key) {
          const isSec = key.includes('SECRET') || key.includes('KEY') || key.includes('TOKEN') || key.includes('PASS') || key.includes('AUTH');
          parsedVars.push({
            id: 'e-' + Math.random().toString(36).substr(2, 9),
            key,
            value,
            environment: 'All',
            isSecret: isSec,
            updatedAt: 'Just now',
          });
        }
      });

      if (parsedVars.length > 0) {
        const newKeys = new Set(parsedVars.map((v) => v.key));
        const filteredOld = envVars.filter((v) => !newKeys.has(v.key));
        setEnvVars([...parsedVars, ...filteredOld]);
        setEnvNeedsRebuild(true);
        showToast(`⚠️ Imported ${parsedVars.length} variables. Rebuild required for edge deployment.`);
      } else {
        showToast('No valid KEY=VALUE pairs found in file.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleExportEnvFile = () => {
    if (envVars.length === 0) {
      showToast('No variables to export.');
      return;
    }
    const lines = [
      `# Exported from YGIT Platform for project: ${currentProject.name}`,
      `# Pinned Commit: 7f3b891 | Generated at: ${new Date().toISOString()}`,
      '',
      ...envVars.map((v) => `${v.key}="${v.value}"`),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentProject.name}.env`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Exported ${envVars.length} variables to ${currentProject.name}.env`);
  };

  const handlePasteEnvSubmit = () => {
    if (!pasteEnvText.trim()) return;

    const lines = pasteEnvText.split('\n');
    const parsedVars: EnvVar[] = [];

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) return;

      let key = trimmed.slice(0, eqIdx).trim().toUpperCase().replace(/[^A-Z0-9_]/g, '_');
      let value = trimmed.slice(eqIdx + 1).trim();

      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      if (key) {
        parsedVars.push({
          id: 'e-' + Math.random().toString(36).substr(2, 9),
          key,
          value,
          environment: pasteEnvTarget,
          isSecret: pasteEnvIsSecret,
          updatedAt: 'Just now',
        });
      }
    });

    if (parsedVars.length > 0) {
      const newKeys = new Set(parsedVars.map((v) => v.key));
      const filteredOld = envVars.filter((v) => !newKeys.has(v.key));
      setEnvVars([...parsedVars, ...filteredOld]);
      setIsPasteEnvModalOpen(false);
      setPasteEnvText('');
      setEnvNeedsRebuild(true);
      showToast(`⚠️ Added ${parsedVars.length} variables. Rebuild required for edge deployment.`);
    } else {
      showToast('No valid KEY=VALUE pairs found.');
    }
  };

  const handleSaveEditedEnvVar = () => {
    if (!editingEnvVar || !editingEnvVar.key.trim()) return;
    const cleanKey = editingEnvVar.key.trim().toUpperCase().replace(/[^A-Z0-9_]/g, '_');
    setEnvVars(
      envVars.map((v) =>
        v.id === editingEnvVar.id
          ? { ...editingEnvVar, key: cleanKey, updatedAt: 'Just now' }
          : v
      )
    );
    setIsEditEnvModalOpen(false);
    setEditingEnvVar(null);
    setEnvNeedsRebuild(true);
    showToast(`⚠️ Updated ${cleanKey}. Rebuild required to apply changes on edge.`);
  };

  // =========================================================================
  // DOMAIN MANAGEMENT HANDLERS (FREE SUBDOMAINS, CUSTOM DOMAINS, DNS RESOLVER)
  // =========================================================================

  const handleSearchFreeSubdomain = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!subdomainSearchInput.trim()) return;

    const raw = subdomainSearchInput.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    if (!raw) return;

    setIsSearchingSubdomain(true);
    setSubdomainSearchResult(null);

    setTimeout(() => {
      setIsSearchingSubdomain(false);
      const isTaken =
        freeSubdomains.some((fs) => fs.subdomain === raw && fs.zone === subdomainSearchZone) ||
        ['admin', 'api', 'auth', 'root', 'billing', 'cloud', 'system', 'ygit'].includes(raw);

      setSubdomainSearchResult({
        query: raw,
        zone: subdomainSearchZone,
        isAvailable: !isTaken,
        suggestions: isTaken
          ? [`${raw}-app`, `${raw}-edge`, `${raw}-live`, `${raw}-preview`]
          : [],
      });
    }, 450);
  };

  const handleClaimFreeSubdomain = (subdomainToClaim: string, zoneToClaim: string) => {
    const isAlreadyAssigned = freeSubdomains.some(
      (fs) => fs.subdomain === subdomainToClaim && fs.zone === zoneToClaim
    );

    if (isAlreadyAssigned) {
      showToast(`Domain ${subdomainToClaim}${zoneToClaim} is already active.`);
      return;
    }

    const newItem: FreeSubdomainItem = {
      id: 'fs-' + Date.now(),
      subdomain: subdomainToClaim,
      zone: zoneToClaim,
      isPrimary: freeSubdomains.length === 0,
      status: 'active',
      createdAt: 'Just now',
    };

    setFreeSubdomains([...freeSubdomains, newItem]);
    setSubdomainSearchResult(null);
    setSubdomainSearchInput('');
    showToast(`✨ Successfully claimed and routed ${subdomainToClaim}${zoneToClaim}!`);
  };

  const handleSetPrimarySubdomain = (id: string) => {
    setFreeSubdomains(
      freeSubdomains.map((fs) => ({
        ...fs,
        isPrimary: fs.id === id,
      }))
    );
    showToast('Updated primary gateway subdomain.');
  };

  const handleDeleteFreeSubdomain = (id: string) => {
    const item = freeSubdomains.find((fs) => fs.id === id);
    if (item?.isPrimary && freeSubdomains.length > 1) {
      showToast('Cannot delete the primary gateway route. Set another as primary first.');
      return;
    }
    setFreeSubdomains(freeSubdomains.filter((fs) => fs.id !== id));
    showToast(`Removed subdomain ${item?.subdomain}${item?.zone}`);
  };

  const handleAddCustomDomain = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = newCustomDomainInput.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    if (!raw) return;

    // Check duplicate
    if (customDomainList.some((d) => d.domain === raw)) {
      showToast(`Domain ${raw} is already configured in project.`);
      return;
    }

    // Determine Apex vs Subdomain
    const parts = raw.split('.');
    const isApex = parts.length === 2 || (parts.length === 3 && parts[1].length <= 3 && parts[2].length <= 3);

    const newDomainItem: CustomDomainItem = {
      id: 'cd-' + Date.now(),
      domain: raw,
      isApex,
      targetBranch: newCustomDomainBranch,
      dnsStatus: 'pending',
      sslStatus: 'provisioning',
      redirectMode: newCustomDomainRedirect,
      cnameTarget: `${currentProject.name}.pages.dev`,
      apexIp: '76.76.21.21',
      txtRecordName: isApex ? `_ygit-challenge.${raw}` : `_ygit-challenge.${raw}`,
      txtRecordValue: `ygit-verify-token-${Math.random().toString(36).substring(2, 10)}`,
      createdAt: 'Just now',
      lastChecked: 'Pending check',
    };

    setCustomDomainList([...customDomainList, newDomainItem]);
    setNewCustomDomainInput('');
    showToast(`Added custom domain ${raw}. Configure DNS records to complete setup.`);

    // Automatically open DNS records modal for convenience
    setSelectedDnsDomain(newDomainItem);
    setIsDnsModalOpen(true);
    setDnsProbeActive(false);
    setDnsProbeLogs([]);
  };

  const handleVerifyCustomDomain = (domainId: string) => {
    const targetDomain = customDomainList.find((d) => d.id === domainId);
    if (!targetDomain) return;

    setVerifyingDomainIdMap((prev) => ({ ...prev, [domainId]: true }));
    showToast(`Querying Anycast DNS resolvers for ${targetDomain.domain}...`);

    setTimeout(() => {
      setCustomDomainList((prev) =>
        prev.map((d) =>
          d.id === domainId
            ? {
                ...d,
                dnsStatus: 'verified',
                sslStatus: 'active',
                lastChecked: 'Just now (0.12s probe)',
              }
            : d
        )
      );
      setVerifyingDomainIdMap((prev) => ({ ...prev, [domainId]: false }));
      showToast(`✨ DNS verified & TLS certificate active for ${targetDomain.domain}!`);
    }, 1100);
  };

  const handleDeleteCustomDomain = (domainId: string) => {
    const target = customDomainList.find((d) => d.id === domainId);
    setCustomDomainList(customDomainList.filter((d) => d.id !== domainId));
    if (selectedDnsDomain?.id === domainId) {
      setIsDnsModalOpen(false);
      setSelectedDnsDomain(null);
    }
    showToast(`Removed ${target?.domain || 'custom domain'}`);
  };

  const handleOpenDnsModal = (domain: CustomDomainItem) => {
    setSelectedDnsDomain(domain);
    setIsDnsModalOpen(true);
    setDnsProbeActive(false);
    setDnsProbeLogs([]);
  };

  const handleRunDnsProbe = (domain: CustomDomainItem) => {
    setDnsProbeActive(true);
    setDnsProbeLogs([
      `[0.05s] Initiating global DNS probe for ${domain.domain}...`,
    ]);

    setTimeout(() => {
      setDnsProbeLogs((prev) => [
        ...prev,
        `[0.18s] Cloudflare 1.1.1.1: ${domain.isApex ? 'A record 76.76.21.21' : `CNAME ${domain.cnameTarget}`} (MATCH)`,
      ]);
    }, 350);

    setTimeout(() => {
      setDnsProbeLogs((prev) => [
        ...prev,
        `[0.34s] Google DNS 8.8.8.8: TXT ${domain.txtRecordValue} verified`,
        `[0.48s] Quad9 9.9.9.9: TLS Edge Certificate SNI handshake OK`,
      ]);
    }, 700);

    setTimeout(() => {
      setDnsProbeLogs((prev) => [
        ...prev,
        `[0.62s] ✓ Verification SUCCESS: Domain is correctly pointed to YGIT Edge!`,
      ]);
      setDnsProbeActive(false);

      // Update domain in list
      setCustomDomainList((prev) =>
        prev.map((d) =>
          d.id === domain.id
            ? {
                ...d,
                dnsStatus: 'verified',
                sslStatus: 'active',
                lastChecked: 'Just now',
              }
            : d
        )
      );

      // Update selected domain in modal
      setSelectedDnsDomain((prev) =>
        prev && prev.id === domain.id
          ? {
              ...prev,
              dnsStatus: 'verified',
              sslStatus: 'active',
              lastChecked: 'Just now',
            }
          : prev
      );

      showToast(`✨ Domain ${domain.domain} DNS verified!`);
    }, 1100);
  };

  const handleSaveEditedDomain = () => {
    if (!editingDomain) return;
    setCustomDomainList((prev) =>
      prev.map((d) => (d.id === editingDomain.id ? { ...editingDomain, lastChecked: 'Updated just now' } : d))
    );
    setIsEditDomainModalOpen(false);
    setEditingDomain(null);
    showToast(`Updated configuration for ${editingDomain.domain}`);
  };

  // Cloudflare Action Handlers
  const handleFrameworkPresetChange = (preset: string) => {
    setCfFrameworkPreset(preset);
    switch (preset) {
      case 'vite':
        setCfBuildCommand('pnpm run build');
        setCfOutputDir('dist');
        break;
      case 'nextjs':
        setCfBuildCommand('pnpm next build');
        setCfOutputDir('out');
        break;
      case 'remix':
        setCfBuildCommand('pnpm remix vite:build');
        setCfOutputDir('build/client');
        break;
      case 'astro':
        setCfBuildCommand('pnpm astro build');
        setCfOutputDir('dist');
        break;
      case 'sveltekit':
        setCfBuildCommand('pnpm vite build');
        setCfOutputDir('.svelte-kit/cloudflare');
        break;
      case 'react-spa':
        setCfBuildCommand('pnpm run build');
        setCfOutputDir('dist');
        break;
      case 'nuxt':
        setCfBuildCommand('pnpm nuxi generate');
        setCfOutputDir('dist');
        break;
      case 'static':
        setCfBuildCommand('echo "Static export ready"');
        setCfOutputDir('public');
        break;
      default:
        break;
    }
  };

  const handleSaveCfSettings = () => {
    showToast('✨ Cloudflare Pages & Edge Workers configuration saved!');
  };

  const handleExecutePurgeCache = () => {
    setIsPurgingCache(true);
    setTimeout(() => {
      setIsPurgingCache(false);
      setIsPurgeModalOpen(false);
      showToast('⚡ Global Edge Cache purged across 310+ Cloudflare PoPs!');
    }, 1200);
  };

  const handleAddKvBinding = () => {
    if (!newKvName.trim() || !newKvNamespaceId.trim()) return;
    const newBinding: CfKvBinding = {
      id: 'kv-' + Date.now(),
      name: newKvName.trim().toUpperCase(),
      namespaceId: newKvNamespaceId.trim(),
      environment: newKvEnvironment,
    };
    setCfKvBindings((prev) => [...prev, newBinding]);
    setNewKvName('');
    setNewKvNamespaceId('');
    setIsAddKvModalOpen(false);
    showToast(`Added KV namespace binding: ${newBinding.name}`);
  };

  const handleDeleteKvBinding = (id: string) => {
    setCfKvBindings((prev) => prev.filter((b) => b.id !== id));
    showToast('Removed KV namespace binding');
  };

  const handleAddD1Binding = () => {
    if (!newD1Name.trim() || !newD1DatabaseId.trim()) return;
    const newBinding: CfD1Binding = {
      id: 'd1-' + Date.now(),
      name: newD1Name.trim().toUpperCase(),
      databaseId: newD1DatabaseId.trim(),
      environment: newD1Environment,
    };
    setCfD1Bindings((prev) => [...prev, newBinding]);
    setNewD1Name('');
    setNewD1DatabaseId('');
    setIsAddD1ModalOpen(false);
    showToast(`Added D1 database binding: ${newBinding.name}`);
  };

  const handleDeleteD1Binding = (id: string) => {
    setCfD1Bindings((prev) => prev.filter((b) => b.id !== id));
    showToast('Removed D1 database binding');
  };

  const handleAddR2Binding = () => {
    if (!newR2Name.trim() || !newR2BucketName.trim()) return;
    const newBinding: CfR2Binding = {
      id: 'r2-' + Date.now(),
      name: newR2Name.trim().toUpperCase(),
      bucketName: newR2BucketName.trim(),
      environment: newR2Environment,
    };
    setCfR2Bindings((prev) => [...prev, newBinding]);
    setNewR2Name('');
    setNewR2BucketName('');
    setIsAddR2ModalOpen(false);
    showToast(`Added R2 storage bucket binding: ${newBinding.name}`);
  };

  const handleDeleteR2Binding = (id: string) => {
    setCfR2Bindings((prev) => prev.filter((b) => b.id !== id));
    showToast('Removed R2 storage binding');
  };

  const handleAddDeployHook = () => {
    if (!newDeployHookName.trim()) return;
    const randToken = Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12);
    const newHook: CfDeployHook = {
      id: 'dh-' + Date.now(),
      name: newDeployHookName.trim(),
      branch: newDeployHookBranch,
      url: `https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/${randToken}`,
      createdAt: 'Just now',
    };
    setCfDeployHooks((prev) => [...prev, newHook]);
    setNewDeployHookName('');
    setIsAddDeployHookModalOpen(false);
    showToast(`Created deploy webhook for ${newHook.name}`);
  };

  const handleDeleteDeployHook = (id: string) => {
    setCfDeployHooks((prev) => prev.filter((h) => h.id !== id));
    showToast('Deleted deploy hook');
  };

  const handleAddWorkerRoute = () => {
    if (!newRoutePattern.trim() || !newRouteHandler.trim()) return;
    const newRoute: CfWorkerRoute = {
      id: 'r-' + Date.now(),
      pattern: newRoutePattern.trim(),
      handler: newRouteHandler.trim(),
    };
    setCfWorkerRoutes((prev) => [...prev, newRoute]);
    setNewRoutePattern('');
    setNewRouteHandler('');
    showToast(`Added edge worker route: ${newRoute.pattern}`);
  };

  const handleDeleteWorkerRoute = (id: string) => {
    setCfWorkerRoutes((prev) => prev.filter((r) => r.id !== id));
    showToast('Removed route');
  };

  const generateWranglerToml = () => {
    return `# YGIT Cloudflare Pages & Workers Configuration
name = "${cfProjectName}"
compatibility_date = "${cfCompatDate}"
compatibility_flags = [${cfCompatFlags.map((f) => `"${f}"`).join(', ')}]
pages_build_output_dir = "${cfOutputDir}"

[vars]
CF_PAGES_COMMIT_SHA = "7f3b89154a88"
NODE_VERSION = "${cfNodeVersion}"
PRODUCTION_BRANCH = "${cfProductionBranch}"

# KV Namespaces
${cfKvBindings
  .map(
    (kv) => `[[kv_namespaces]]
binding = "${kv.name}"
id = "${kv.namespaceId}"
`
  )
  .join('\n')}
# D1 SQL Databases
${cfD1Bindings
  .map(
    (d1) => `[[d1_databases]]
binding = "${d1.name}"
database_name = "${d1.name.toLowerCase()}"
database_id = "${d1.databaseId}"
`
  )
  .join('\n')}
# R2 Storage Buckets
${cfR2Bindings
  .map(
    (r2) => `[[r2_buckets]]
binding = "${r2.name}"
bucket_name = "${r2.bucketName}"
`
  )
  .join('\n')}
${
  cfAiBindingEnabled
    ? `[ai]
binding = "AI"
`
    : ''
}`;
  };

  const triggerDeployment = (sourceName?: string) => {
    setActiveRoute('project-workspace');
    setWorkspaceTab('logs');
    setIsDeploying(true);
    setActiveDeploymentStatus('running');
    setDeployTimer(0.0);
    setDeployLogsList([]);
    showToast(`Started deployment for ${sourceName || currentProject.name}`);

    // Stream logs line by line in realistic batches
    const batches = [
      { time: 100, logs: INITIAL_DEPLOY_LOGS.slice(0, 4) },
      { time: 400, logs: INITIAL_DEPLOY_LOGS.slice(0, 7) },
      { time: 800, logs: INITIAL_DEPLOY_LOGS.slice(0, 13) },
      { time: 1300, logs: INITIAL_DEPLOY_LOGS.slice(0, 18) },
      { time: 1800, logs: INITIAL_DEPLOY_LOGS.slice(0, 25) },
      { time: 2400, logs: INITIAL_DEPLOY_LOGS.slice(0, 33) },
      { time: 2900, logs: INITIAL_DEPLOY_LOGS.slice(0, 39) },
      { time: 3400, logs: INITIAL_DEPLOY_LOGS },
    ];

    batches.forEach(({ time, logs }) => {
      setTimeout(() => {
        setDeployLogsList(logs);
      }, time);
    });

    setTimeout(() => {
      setIsDeploying(false);
      setActiveDeploymentStatus('finished');
      showToast(`✨ Deployed live at ${currentProject.name}.pages.dev`);
    }, 3500);
  };

  const filteredProjects = projects
    .filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.repo.toLowerCase().includes(projectSearch.toLowerCase());
      const matchProvider = providerFilter === 'all' || p.provider === providerFilter;
      return matchSearch && matchProvider;
    })
    .sort((a, b) => {
      if (sortOrder === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.timestamp - b.timestamp;
    });

  return (
    <>
      {/* 
        ========================================================================
        DUAL-SIDEBAR VIEWPORT ORCHESTRATOR SHELL (Phase 1.3 Architecture)
        Encapsulates PrimarySidebar (Global) + SecondarySidebar (Workspace)
        and fluid main content canvas with 3-tier brightness stepping.
        ========================================================================
      */}
      <DualSidebarLayout
        activeRoute={activeRoute}
        setActiveRoute={setActiveRoute}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        projectsCount={projects.length}
        deploymentsCount={deploymentsList.length}
        templatesCount={READY_TEMPLATES.length}
        isGithubConnected={isGithubConnected}
        isCloudflareConnected={isCloudflareConnected}
        isWorkerOnline={true}
        currentProject={currentProject}
        workspaceTab={workspaceTab}
        setWorkspaceTab={setWorkspaceTab}
        envVarsCount={envVars.length}
        onReScan={startDeepScan}
      >
        <header className="h-11 border-b border-[#21262d] flex items-center justify-between px-3.5 bg-[#161b22] sticky top-0 z-10">
          <div className="flex items-center gap-2">
            {activeRoute === 'deployments' ? (
              <div className="flex items-center gap-1.5 text-xs font-normal">
                <span className="text-[#8b949e]">Platform</span>
                <span className="text-[#7d8590]">/</span>
                <span className="text-[#f0f6fc] font-medium">Deployments</span>
                <span className="text-[9.5px] font-mono font-normal px-1.5 py-0.2 rounded bg-[#090d13] text-[#8b949e] border border-[#21262d]">
                  {deploymentsList.length} Total
                </span>
              </div>
            ) : activeRoute === 'accounts' ? (
              <div className="flex items-center gap-1.5 text-xs font-normal">
                <span className="text-[#8b949e]">Platform</span>
                <span className="text-[#7d8590]">/</span>
                <span className="text-[#f0f6fc] font-medium">Connected Accounts</span>
                <span className="text-[9.5px] font-mono font-normal px-1.5 py-0.2 rounded bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30">
                  {isGithubConnected && isCloudflareConnected ? '2 Linked' : isGithubConnected || isCloudflareConnected ? '1 Linked' : '0 Linked'}
                </span>
              </div>
            ) : activeRoute === 'settings' ? (
              <div className="flex items-center gap-1.5 text-xs font-normal">
                <span className="text-[#8b949e]">Platform</span>
                <span className="text-[#7d8590]">/</span>
                <span className="text-[#f0f6fc] font-medium">Settings</span>
                <span className="text-[9.5px] font-mono font-normal px-1.5 py-0.2 rounded bg-[#1d6cf6]/10 text-[#58a6ff] border border-[#1d6cf6]/30">
                  Account & Preferences
                </span>
              </div>
            ) : activeRoute === 'project-blank' ? (
              <div className="flex items-center gap-1.5 text-xs font-normal">
                <button onClick={() => setActiveRoute('projects')} className="text-[#8b949e] hover:text-[#f0f6fc]">
                  Projects
                </button>
                <span className="text-[#7d8590]">/</span>
                <span className="text-[#f0f6fc] font-medium font-mono">{currentProject.name}</span>
              </div>
            ) : activeRoute === 'project-scan' ? (
              <div className="flex items-center gap-1.5 text-xs font-normal">
                <span className="text-[#8b949e]">Scanning</span>
                <span className="text-[#7d8590]">/</span>
                <span className="text-[#58a6ff] font-medium font-mono">{currentProject.repo}</span>
              </div>
            ) : activeRoute === 'project-workspace' ? (
              <div className="flex items-center gap-1.5 text-xs font-normal">
                <button onClick={() => setActiveRoute('projects')} className="text-[#8b949e] hover:text-[#f0f6fc]">
                  Projects
                </button>
                <span className="text-[#7d8590]">/</span>
                <span className="text-[#f0f6fc] font-medium font-mono">{currentProject.name}</span>
                <span className="text-[9.5px] font-normal px-1.5 py-0.2 rounded bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30">
                  Ready
                </span>
              </div>
            ) : (
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#7d8590] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="bg-[#090d13] border border-[#21262d] rounded text-xs text-[#f0f6fc] pl-8 pr-3 py-1 w-52 focus:outline-none focus:border-[#1d6cf6]"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {activeRoute === 'project-workspace' ? (
              <button
                onClick={() => triggerDeployment(currentProject.name)}
                title="Deploy to Cloudflare Pages"
                className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white text-xs font-medium px-3 py-1 rounded flex items-center gap-1.5 cursor-pointer shadow-sm transition-all active:scale-[0.98]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Deploy</span>
              </button>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white text-xs font-medium px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Project</span>
              </button>
            )}

            {/* <!-- ================================================================ -->
                <!-- HEADER USER PROFILE & ACCOUNT CONTROL DROPDOWN -->
                <!-- Purpose: Replaces legacy vibtools/personal selector with modern -->
                <!-- user profile avatar button, account management, & session controls -->
                <!-- Events: Toggle onClick, Dismiss on outside click or ESC key -->
                <!-- Invariants: Rule 01 (Clean & Compact) & Rule 02 (In-Code Comments) -->
                <!-- ================================================================ --> */}
            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                title={`User profile: ${platformSettings.profile?.displayName || 'Prince Raj'} (@${platformSettings.profile?.username || 'vibtools'})`}
                aria-label="User profile and account navigation"
                aria-expanded={isProfileMenuOpen}
                className={`flex items-center gap-1.5 px-2 py-1 rounded border text-xs cursor-pointer transition-all ${
                  isProfileMenuOpen
                    ? 'bg-[#21262d] border-[#388bfd] text-[#f0f6fc]'
                    : 'bg-[#090d13] hover:bg-[#161b22] border-[#21262d] hover:border-[#30363d] text-[#c9d1d9] hover:text-[#f0f6fc]'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#1d6cf6]/20 border border-[#1d6cf6]/50 flex items-center justify-center text-[#58a6ff]">
                  <User className="w-3 h-3" />
                </div>
                <span className="font-mono text-[11px] text-[#f0f6fc] hidden sm:inline">
                  @{platformSettings.profile?.username || 'vibtools'}
                </span>
                <ChevronDown
                  className={`w-3 h-3 text-[#7d8590] transition-transform duration-150 ${
                    isProfileMenuOpen ? 'rotate-180 text-[#58a6ff]' : ''
                  }`}
                />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-1.5 w-60 bg-[#161b22] border border-[#30363d] rounded-md shadow-2xl py-1 z-50 text-xs animate-in fade-in zoom-in-95 duration-100"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {/* Account Summary Strip */}
                  <div className="px-3 py-2 border-b border-[#21262d] bg-[#0d1117]/60">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#1d6cf6]/30 to-[#6366f1]/30 border border-[#1d6cf6]/40 flex items-center justify-center text-[#58a6ff] text-xs font-semibold shrink-0">
                        {platformSettings.profile?.avatarInitial || 'P'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[#f0f6fc] font-medium truncate text-xs">
                            {platformSettings.profile?.displayName || 'Prince Raj'}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30 shrink-0">
                            {platformSettings.profile?.plan || 'Pro'}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-[#7d8590] truncate">
                          {platformSettings.profile?.email || 'princeraj1396@gmail.com'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section: Main Actions */}
                  <div className="py-1">
                    {/* Go to Accounts Control */}
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setActiveRoute('accounts');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-1.5 text-left text-[#f0f6fc] hover:bg-[#21262d] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-3.5 h-3.5 text-[#58a6ff] group-hover:text-[#79c0ff]" />
                        <span className="text-xs">Accounts Control</span>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#090d13] text-[#7d8590] border border-[#21262d]">
                        {isGithubConnected && isCloudflareConnected ? '2 Linked' : '1 Linked'}
                      </span>
                    </button>

                    {/* Platform Settings */}
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setActiveRoute('settings');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-1.5 text-left text-[#f0f6fc] hover:bg-[#21262d] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <Settings className="w-3.5 h-3.5 text-[#8b949e] group-hover:text-[#f0f6fc]" />
                        <span className="text-xs">Platform Settings</span>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#090d13] text-[#7d8590] border border-[#21262d]">
                        Pref & Git
                      </span>
                    </button>
                  </div>

                  {/* Section Divider */}
                  <div className="border-t border-[#21262d] my-1" />

                  {/* Logout Button */}
                  <div className="py-0.5">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-[#f85149] hover:bg-[#f85149]/10 transition-colors cursor-pointer group"
                    >
                      <LogOut className="w-3.5 h-3.5 text-[#f85149] group-hover:translate-x-0.5 transition-transform" />
                      <span className="text-xs font-medium">Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ======================================================================== */}
        {/* PHASE 1.4: STANDALONE MAIN VIEWS (DASHBOARD, PROJECTS, DEPLOYMENTS, ACCOUNTS, TEMPLATES) */}
        {/* ======================================================================== */}

        {/* 1. DASHBOARD VIEW */}
        {activeRoute === 'dashboard' && (
          <DashboardView
            projects={projects}
            deploymentsCount={deploymentsList.length}
            successRate={
              deploymentsList.length > 0
                ? Math.round(
                    (deploymentsList.filter((d) => d.status === 'live' || d.status === 'passed').length /
                      deploymentsList.length) *
                      100
                  )
                : 100
            }
            isDeploying={isDeploying}
            deployTimer={deployTimer}
            repoInputUrl={repoInputUrl}
            onRepoInputUrlChange={setRepoInputUrl}
            onTriggerDeployment={triggerDeployment}
            onCopyToClipboard={copyToClipboard}
            isGithubConnected={isGithubConnected}
            isCloudflareConnected={isCloudflareConnected}
          />
        )}

        {/* 2. PROJECTS VIEW */}
        {activeRoute === 'projects' && (
          <ProjectsView
            projectSearch={projectSearch}
            onProjectSearchChange={setProjectSearch}
            providerFilter={providerFilter}
            onProviderFilterChange={setProviderFilter}
            filteredProjects={filteredProjects}
            onCreateProject={() => setIsModalOpen(true)}
            onSelectProject={(proj) => {
              setCurrentProject({ name: proj.name, repo: proj.repo });
              setActiveRoute('project-workspace');
            }}
          />
        )}

        {/* 3. DEPLOYMENTS VIEW */}
        {activeRoute === 'deployments' && (
          <DeploymentsView
            deploymentsList={deploymentsList}
            deploymentSearch={deploymentSearch}
            onDeploymentSearchChange={setDeploymentSearch}
            deploymentEnvFilter={deploymentEnvFilter}
            onDeploymentEnvFilterChange={setDeploymentEnvFilter}
            deploymentStatusFilter={deploymentStatusFilter}
            onDeploymentStatusFilterChange={setDeploymentStatusFilter}
            onConnectAccounts={() => setIsAccountsModalOpen(true)}
            onCreateProject={() => setIsModalOpen(true)}
            onNavigateWorkspace={(proj, tab) => {
              setCurrentProject({ name: proj.name, repo: proj.repo });
              setActiveRoute('project-workspace');
              setWorkspaceTab(tab);
            }}
            onRedeploy={(proj) => {
              setCurrentProject({ name: proj.name, repo: proj.repo });
              triggerDeployment(proj.name);
            }}
          />
        )}

        {/* 4. ACCOUNTS & INTEGRATIONS VIEW */}
        {activeRoute === 'accounts' && (
          <AccountsView
            isGithubConnected={isGithubConnected}
            isCloudflareConnected={isCloudflareConnected}
            githubLastSync={githubLastSync}
            cloudflareLastSync={cloudflareLastSync}
            isGithubSyncing={isGithubSyncing}
            isCloudflareSyncing={isCloudflareSyncing}
            onSyncGithub={handleSyncGithub}
            onToggleGithub={handleToggleGithub}
            onSyncCloudflare={handleSyncCloudflare}
            onToggleCloudflare={handleToggleCloudflare}
          />
        )}

        {/* 5. READY TEMPLATES VIEW */}
        {activeRoute === 'templates' && (
          <TemplatesView
            templateSearch={templateSearch}
            onTemplateSearchChange={setTemplateSearch}
            templateCategoryFilter={templateCategoryFilter}
            onTemplateCategoryFilterChange={setTemplateCategoryFilter}
            templateFrameworkFilter={templateFrameworkFilter}
            onTemplateFrameworkFilterChange={setTemplateFrameworkFilter}
            onSelectTemplateForDetails={setSelectedTemplateForDetails}
            onUseTemplate={handleUseTemplate}
            deployingTemplateId={deployingTemplateId}
          />
        )}

        {/* 6. PLATFORM SETTINGS VIEW */}
        {activeRoute === 'settings' && (
          <SettingsView
            settings={platformSettings}
            onUpdateSettings={(newSettings) => {
              setPlatformSettings(newSettings);
              showToast('Platform settings updated successfully');
            }}
            onCopyToClipboard={(text, label) => {
              navigator.clipboard.writeText(text);
              showToast(`Copied ${label}`);
            }}
          />
        )}

        {/* ======================================================================== */}
        {/* PHASE 1.5: SCANNER ENGINE & DUAL-SIDEBAR WORKSPACE */}
        {/* ======================================================================== */}

        {/* 6. INTAKE PIPELINE (Project-Page-02.html) */}
        {activeRoute === 'project-blank' && (
          <IntakePipeline
            currentProject={currentProject}
            isResourcePickerOpen={isResourcePickerOpen}
            onSetIsResourcePickerOpen={setIsResourcePickerOpen}
            resourceSelected={resourceSelected}
            onSetResourceSelected={setResourceSelected}
            cloneInputUrl={cloneInputUrl}
            onSetCloneInputUrl={setCloneInputUrl}
            cloneBranch={cloneBranch}
            onSetCloneBranch={setCloneBranch}
            selectedOrg={selectedOrg}
            onSetSelectedOrg={setSelectedOrg}
            repoSearchQuery={repoSearchQuery}
            onSetRepoSearchQuery={setRepoSearchQuery}
            uploadedFileName={uploadedFileName}
            onSetUploadedFileName={setUploadedFileName}
            distFolder={distFolder}
            onSetDistFolder={setDistFolder}
            onRunIntakePipeline={runIntakePipeline}
            isIntakePipelineActive={isIntakePipelineActive}
            onSetIsIntakePipelineActive={setIsIntakePipelineActive}
            intakeCompleted={intakeCompleted}
            onSetIntakeCompleted={setIntakeCompleted}
            intakeStatusText={intakeStatusText}
            intakeProgress={intakeProgress}
            onStartDeepScan={startDeepScan}
          />
        )}

        {/* 7. 14-STAGE DEEP SCAN CONSOLE */}
        {activeRoute === 'project-scan' && (
          <ScanConsole
            currentProject={currentProject}
            scanTimer={scanTimer}
            scanCompleted={scanCompleted}
            scanStep={scanStep}
            scanProgress={scanProgress}
            scanReportView={scanReportView}
            onSetScanReportView={setScanReportView}
            scanLogs={scanLogs}
            logsEndRef={logsEndRef}
            onStartDeepScan={startDeepScan}
            onOpenWorkspace={() => {
              setActiveRoute('project-workspace');
              setWorkspaceTab('overview');
            }}
          />
        )}

        {/* 8. POST-SCAN DUAL-SIDEBAR WORKSPACE */}
        {activeRoute === 'project-workspace' && (
          <WorkspaceView
            workspaceTab={workspaceTab}
            overviewProps={{
              currentProject,
              envVars,
              onCopyToClipboard: copyToClipboard,
              onStartDeepScan: startDeepScan,
              onDeploy: () => triggerDeployment(currentProject.name),
            }}
            variablesProps={{
              envVars,
              envNeedsRebuild,
              fileInputRef,
              onImportEnvFile: handleImportEnvFile,
              onExportEnvFile: handleExportEnvFile,
              onOpenPasteEnvModal: () => setIsPasteEnvModalOpen(true),
              onTriggerDeployment: () => triggerDeployment(),
              newEnvKey,
              onSetNewEnvKey: setNewEnvKey,
              newEnvVal,
              onSetNewEnvVal: setNewEnvVal,
              newEnvTarget,
              onSetNewEnvTarget: setNewEnvTarget,
              newEnvIsSecret,
              onSetNewEnvIsSecret: setNewEnvIsSecret,
              onAddEnvVar: handleAddEnvVar,
              envSearchQuery,
              onSetEnvSearchQuery: setEnvSearchQuery,
              envFilterEnvironment,
              onSetEnvFilterEnvironment: setEnvFilterEnvironment,
              showAllSecrets,
              onToggleAllSecrets: handleToggleAllSecrets,
              showSecretMap,
              onToggleSecretVisibility: toggleSecretVisibility,
              onCopyToClipboard: copyToClipboard,
              onShowToast: showToast,
              onEditEnvVar: (v) => {
                setEditingEnvVar(v);
                setIsEditEnvModalOpen(true);
              },
              onDeleteEnvVar: handleDeleteEnvVar,
            }}
            cloudflareProps={{
              cfActiveSection,
              setCfActiveSection,
              cfProjectName,
              setCfProjectName,
              cfProductionBranch,
              setCfProductionBranch,
              cfFrameworkPreset,
              handleFrameworkPresetChange,
              cfBuildCommand,
              setCfBuildCommand,
              cfOutputDir,
              setCfOutputDir,
              cfRootDir,
              setCfRootDir,
              cfPackageManager,
              setCfPackageManager,
              cfNodeVersion,
              setCfNodeVersion,
              cfBranchDeployments,
              setCfBranchDeployments,
              cfAutomaticComments,
              setCfAutomaticComments,
              cfFailOpen,
              setCfFailOpen,
              cfFunctionsEnabled,
              setCfFunctionsEnabled,
              cfSmartPlacement,
              setCfSmartPlacement,
              cfCompatDate,
              setCfCompatDate,
              cfCompatFlags,
              setCfCompatFlags,
              cfWorkerRoutes,
              newRoutePattern,
              setNewRoutePattern,
              newRouteHandler,
              setNewRouteHandler,
              handleAddWorkerRoute,
              handleDeleteWorkerRoute,
              cfEarlyHints,
              setCfEarlyHints,
              cfAutoMinifyHtml,
              setCfAutoMinifyHtml,
              cfAutoMinifyCss,
              setCfAutoMinifyCss,
              cfAutoMinifyJs,
              setCfAutoMinifyJs,
              cfBrotli,
              setCfBrotli,
              cfHttp3Quic,
              setCfHttp3Quic,
              cfEdgeCacheTtl,
              setCfEdgeCacheTtl,
              cfBrowserCacheTtl,
              setCfBrowserCacheTtl,
              cfImageOptimization,
              setCfImageOptimization,
              cfSslMode,
              setCfSslMode,
              cfAlwaysHttps,
              setCfAlwaysHttps,
              cfHstsEnabled,
              setCfHstsEnabled,
              cfHstsMaxAge,
              setCfHstsMaxAge,
              cfWafEnabled,
              setCfWafEnabled,
              cfBotFightMode,
              setCfBotFightMode,
              cfAccessPreviewAuth,
              setCfAccessPreviewAuth,
              cfKvBindings,
              handleDeleteKvBinding,
              cfD1Bindings,
              handleDeleteD1Binding,
              cfR2Bindings,
              handleDeleteR2Binding,
              cfAiBindingEnabled,
              setCfAiBindingEnabled,
              cfDeployHooks,
              handleDeleteDeployHook,
              setIsAddKvModalOpen,
              setIsAddD1ModalOpen,
              setIsAddR2ModalOpen,
              setIsAddDeployHookModalOpen,
              setIsPurgeModalOpen,
              setIsDeleteProjectModalOpen,
              generateWranglerToml,
              handleSaveCfSettings,
              copyToClipboard,
              showToast,
            }}
            domainsProps={{
              freeSubdomains,
              customDomainList,
              subdomainSearchInput,
              onSetSubdomainSearchInput: setSubdomainSearchInput,
              subdomainSearchZone,
              onSetSubdomainSearchZone: setSubdomainSearchZone,
              isSearchingSubdomain,
              subdomainSearchResult,
              onSetSubdomainSearchResult: setSubdomainSearchResult,
              onSearchFreeSubdomain: handleSearchFreeSubdomain,
              onClaimFreeSubdomain: handleClaimFreeSubdomain,
              onSetPrimarySubdomain: handleSetPrimarySubdomain,
              onDeleteFreeSubdomain: handleDeleteFreeSubdomain,
              newCustomDomainInput,
              onSetNewCustomDomainInput: setNewCustomDomainInput,
              newCustomDomainBranch,
              onSetNewCustomDomainBranch: setNewCustomDomainBranch,
              newCustomDomainRedirect,
              onSetNewCustomDomainRedirect: setNewCustomDomainRedirect,
              onAddCustomDomain: handleAddCustomDomain,
              verifyingDomainIdMap,
              onOpenDnsModal: handleOpenDnsModal,
              onVerifyCustomDomain: handleVerifyCustomDomain,
              onEditCustomDomain: (dom) => {
                setEditingDomain(dom);
                setIsEditDomainModalOpen(true);
              },
              onDeleteCustomDomain: handleDeleteCustomDomain,
              onCopyToClipboard: copyToClipboard,
              onShowToast: showToast,
            }}
            logsProps={{
              activeDeploymentStatus,
              deployTimer,
              deployLogsList,
              logFullScreen,
              onSetLogFullScreen: setLogFullScreen,
              showLogTimestamps,
              onSetShowLogTimestamps: setShowLogTimestamps,
              logAutoScroll,
              onSetLogAutoScroll: setLogAutoScroll,
              logWrapLines,
              onSetLogWrapLines: setLogWrapLines,
              logSearch,
              onSetLogSearch: setLogSearch,
              logsEndRef,
              currentProject,
              onCopyToClipboard: copyToClipboard,
              onShowToast: showToast,
            }}
            historyProps={{
              currentProject,
              deploymentsList,
              onRedeploy: (proj) => {
                setCurrentProject({ name: proj.name, repo: proj.repo });
                triggerDeployment(proj.name);
              },
              onNavigateToLogs: () => setWorkspaceTab('logs'),
            }}
          />
        )}
      </DualSidebarLayout>

      {/* POPUP MODAL: CREATE PROJECT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#05080d]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-xs bg-[#161b22] border border-[#30363d] rounded shadow-xl overflow-hidden">
            <div className="px-3 py-2 border-b border-[#21262d] flex items-center justify-between text-xs font-semibold">
              <span>Create Project</span>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8b949e] hover:text-[#f0f6fc]">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <form onSubmit={handleCreateProjectSubmit}>
              <div className="p-3">
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Project Name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full bg-[#090d13] border border-[#30363d] rounded px-2.5 py-1 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#1d6cf6]"
                />
              </div>

              <div className="px-3 py-2 border-t border-[#21262d] bg-[#090d13] flex justify-end gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#21262d] text-[#f0f6fc] px-2.5 py-1 text-xs rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1d6cf6] text-white px-3 py-1 text-xs font-semibold rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP MODAL: PASTE .ENV RAW VARIABLES */}
      {isPasteEnvModalOpen && (
        <div className="fixed inset-0 bg-[#05080d]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-[#161b22] border border-[#21262d] rounded-lg shadow-2xl overflow-hidden">
            <div className="px-3.5 py-2.5 border-b border-[#21262d] flex items-center justify-between bg-[#090d13]">
              <div className="flex items-center gap-2">
                <Clipboard className="w-3.5 h-3.5 text-[#e3b341]" />
                <h3 className="text-xs font-medium text-[#f0f6fc]">Paste .env Variables</h3>
              </div>
              <button
                onClick={() => {
                  setIsPasteEnvModalOpen(false);
                  setPasteEnvText('');
                }}
                className="text-[#8b949e] hover:text-[#f0f6fc] p-1 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3.5 flex flex-col gap-2.5">
              <p className="text-[11px] text-[#8b949e]">
                Paste raw <code className="text-[#f0f6fc] bg-[#090d13] px-1 py-0.5 rounded font-mono">KEY=VALUE</code> or <code className="text-[#f0f6fc] bg-[#090d13] px-1 py-0.5 rounded font-mono">export KEY="VALUE"</code> declarations. Comments (<code className="text-[#7d8590]">#</code>) and empty lines are automatically ignored.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-[#090d13] p-2 rounded border border-[#21262d]">
                <div className="flex items-center gap-2">
                  <span className="text-[10.5px] text-[#7d8590] uppercase font-mono">Target Environment:</span>
                  <select
                    value={pasteEnvTarget}
                    onChange={(e) => setPasteEnvTarget(e.target.value as any)}
                    className="bg-[#161b22] border border-[#21262d] rounded px-2 py-1 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#1d6cf6]"
                  >
                    <option value="All">All Environments</option>
                    <option value="Production">Production</option>
                    <option value="Preview">Preview</option>
                    <option value="Development">Development</option>
                  </select>
                </div>

                <label className="flex items-center gap-1.5 text-xs text-[#8b949e] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={pasteEnvIsSecret}
                    onChange={(e) => setPasteEnvIsSecret(e.target.checked)}
                    className="rounded bg-[#161b22] border-[#21262d] text-[#1d6cf6] focus:ring-0 cursor-pointer"
                  />
                  <span className="flex items-center gap-1 text-[11px]">
                    <Lock className="w-3 h-3 text-[#8957e5]" />
                    Encrypt as Secrets
                  </span>
                </label>
              </div>

              <div className="relative">
                <textarea
                  rows={7}
                  value={pasteEnvText}
                  onChange={(e) => setPasteEnvText(e.target.value)}
                  placeholder={`# Example .env configuration\nVITE_API_URL="https://api.example.com/v1"\nDATABASE_URL="postgres://user:pass@host:5432/db"\nSUPABASE_ANON_KEY="eyJhbGciOi..."\nCF_PAGES_BRANCH="main"`}
                  className="w-full bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded p-2.5 text-xs text-[#f0f6fc] font-mono leading-relaxed resize-y placeholder:text-[#484f58]"
                />
                <div className="text-[10px] font-mono text-[#7d8590] mt-1 flex justify-between">
                  <span>
                    Detected:{' '}
                    <strong className="text-[#3fb950] font-medium">
                      {
                        pasteEnvText
                          .split('\n')
                          .filter((l) => l.trim() && !l.trim().startsWith('#') && l.includes('=')).length
                      }{' '}
                      valid pairs
                    </strong>
                  </span>
                  <span>UTF-8 Plaintext</span>
                </div>
              </div>
            </div>

            <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-between">
              <span className="text-[10px] text-[#7d8590]">Existing matching keys will be overwritten.</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsPasteEnvModalOpen(false);
                    setPasteEnvText('');
                  }}
                  className="bg-[#21262d] hover:bg-[#282e36] text-[#f0f6fc] px-3 py-1 text-xs rounded transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePasteEnvSubmit}
                  disabled={
                    pasteEnvText
                      .split('\n')
                      .filter((l) => l.trim() && !l.trim().startsWith('#') && l.includes('=')).length === 0
                  }
                  className="bg-[#1d6cf6] hover:bg-[#2f7af8] disabled:opacity-50 text-white px-3.5 py-1 text-xs font-medium rounded cursor-pointer transition-colors shadow-sm"
                >
                  Import Variables
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POPUP MODAL: EDIT VARIABLE */}
      {isEditEnvModalOpen && editingEnvVar && (
        <div className="fixed inset-0 bg-[#05080d]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-[#161b22] border border-[#21262d] rounded-lg shadow-2xl overflow-hidden">
            <div className="px-3.5 py-2.5 border-b border-[#21262d] flex items-center justify-between bg-[#090d13]">
              <div className="flex items-center gap-2">
                <Edit3 className="w-3.5 h-3.5 text-[#1d6cf6]" />
                <h3 className="text-xs font-medium text-[#f0f6fc]">Edit Variable: {editingEnvVar.key}</h3>
              </div>
              <button
                onClick={() => {
                  setIsEditEnvModalOpen(false);
                  setEditingEnvVar(null);
                }}
                className="text-[#8b949e] hover:text-[#f0f6fc] p-1 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3.5 flex flex-col gap-2.5 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#7d8590]">Variable Key</label>
                <input
                  type="text"
                  value={editingEnvVar.key}
                  onChange={(e) => setEditingEnvVar({ ...editingEnvVar, key: e.target.value })}
                  className="w-full bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded px-2.5 py-1 text-xs text-[#f0f6fc] font-mono uppercase"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#7d8590]">Variable Value</label>
                <input
                  type="text"
                  value={editingEnvVar.value}
                  onChange={(e) => setEditingEnvVar({ ...editingEnvVar, value: e.target.value })}
                  className="w-full bg-[#090d13] border border-[#21262d] focus:border-[#1d6cf6] focus:outline-none rounded px-2.5 py-1 text-xs text-[#f0f6fc] font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono uppercase text-[#7d8590]">Environment</label>
                  <select
                    value={editingEnvVar.environment}
                    onChange={(e) => setEditingEnvVar({ ...editingEnvVar, environment: e.target.value as any })}
                    className="bg-[#090d13] border border-[#21262d] rounded px-2 py-1 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#1d6cf6]"
                  >
                    <option value="All">All Environments</option>
                    <option value="Production">Production</option>
                    <option value="Preview">Preview</option>
                    <option value="Development">Development</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-1.5 text-xs text-[#8b949e] cursor-pointer select-none bg-[#090d13] p-1.5 rounded border border-[#21262d]">
                    <input
                      type="checkbox"
                      checked={editingEnvVar.isSecret}
                      onChange={(e) => setEditingEnvVar({ ...editingEnvVar, isSecret: e.target.checked })}
                      className="rounded bg-[#161b22] border-[#21262d] text-[#1d6cf6] focus:ring-0 cursor-pointer"
                    />
                    <span className="flex items-center gap-1 text-[11px]">
                      <Lock className="w-3 h-3 text-[#8957e5]" />
                      Secret Encrypted
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsEditEnvModalOpen(false);
                  setEditingEnvVar(null);
                }}
                className="bg-[#21262d] hover:bg-[#282e36] text-[#f0f6fc] px-3 py-1 text-xs rounded transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEditedEnvVar}
                className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white px-3.5 py-1 text-xs font-medium rounded cursor-pointer transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 
        ====================================================================
        POPUP MODAL: DNS CONFIGURATION & RESOLUTION PROBE
        PURPOSE: Displays required DNS CNAME / A / TXT records for custom domains
                 with 1-click copy affordances, registrar instructions, and
                 real-time DNS propagation probe simulator.
        ====================================================================
      */}
      {/* 
        ====================================================================
        POPUP MODAL: DNS CONFIGURATION & RESOLUTION PROBE
        ====================================================================
      */}
      {isDnsModalOpen && selectedDnsDomain && (
        <div className="fixed inset-0 bg-[#05080d]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl bg-[#161b22] border border-[#21262d] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-3.5 py-2.5 border-b border-[#21262d] flex items-center justify-between bg-[#090d13]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-[#1d6cf6]/15 text-[#58a6ff]">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-[#f0f6fc] flex items-center gap-2">
                    <span>DNS Records: {selectedDnsDomain.domain}</span>
                    <span className={`text-[9.5px] font-mono px-1.5 py-0.2 rounded font-normal ${
                      selectedDnsDomain.dnsStatus === 'verified'
                        ? 'bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30'
                        : 'bg-[#d29922]/15 text-[#e3b341] border border-[#d29922]/30'
                    }`}>
                      {selectedDnsDomain.dnsStatus === 'verified' ? '✓ Verified & Active' : '○ Pending Verification'}
                    </span>
                  </h3>
                  <p className="text-[10px] text-[#8b949e]">
                    Configure these records at your DNS provider (Cloudflare, Namecheap, GoDaddy, AWS Route53).
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsDnsModalOpen(false);
                  setSelectedDnsDomain(null);
                  setDnsProbeActive(false);
                  setDnsProbeLogs([]);
                }}
                className="text-[#8b949e] hover:text-[#f0f6fc] p-1 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-3 overflow-y-auto flex flex-col gap-2.5 text-xs">
              {/* Instructions Callout */}
              <div className="bg-[#090d13] border border-[#21262d] rounded p-2 flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-[#e3b341] shrink-0 mt-0.5" />
                <div className="text-[10.5px] text-[#c9d1d9] leading-relaxed">
                  Add the following DNS records for <span className="text-[#f0f6fc] font-mono">{selectedDnsDomain.domain}</span> in your DNS provider control panel.
                </div>
              </div>

              {/* DNS Records Table */}
              <div className="border border-[#21262d] rounded bg-[#090d13] overflow-hidden">
                <div className="px-2.5 py-1 bg-[#161b22] border-b border-[#21262d] text-[10px] font-mono uppercase text-[#7d8590] flex justify-between items-center">
                  <span>DNS Records</span>
                  <button
                    type="button"
                    onClick={() => {
                      const allText = selectedDnsDomain.isApex
                        ? `Type: A | Host: @ | Value: ${selectedDnsDomain.apexIp}\nType: TXT | Host: ${selectedDnsDomain.txtRecordName} | Value: ${selectedDnsDomain.txtRecordValue}`
                        : `Type: CNAME | Host: ${selectedDnsDomain.domain.split('.')[0]} | Value: ${selectedDnsDomain.cnameTarget}\nType: TXT | Host: ${selectedDnsDomain.txtRecordName} | Value: ${selectedDnsDomain.txtRecordValue}`;
                      copyToClipboard(allText);
                      showToast('Copied DNS records');
                    }}
                    className="text-[#58a6ff] hover:text-[#79c0ff] cursor-pointer hover:underline flex items-center gap-1 font-normal"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy all</span>
                  </button>
                </div>

                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-[#21262d] bg-[#090d13] text-[9.5px] text-[#7d8590]">
                      <th className="p-2">Type</th>
                      <th className="p-2">Host</th>
                      <th className="p-2">Target</th>
                      <th className="p-2">TTL</th>
                      <th className="p-2 text-right">Copy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#21262d]">
                    {/* Record 1: Primary Routing */}
                    <tr className="hover:bg-[#161b22]/50 transition-colors">
                      <td className="p-2 align-middle">
                        <span className="px-1.5 py-0.2 rounded bg-[#1d6cf6]/15 text-[#58a6ff] font-normal text-[10px]">
                          {selectedDnsDomain.isApex ? 'A' : 'CNAME'}
                        </span>
                      </td>
                      <td className="p-2 align-middle text-[#f0f6fc]">
                        {selectedDnsDomain.isApex ? '@' : selectedDnsDomain.domain.split('.')[0]}
                      </td>
                      <td className="p-2 align-middle text-[#3fb950] select-all">
                        {selectedDnsDomain.isApex ? selectedDnsDomain.apexIp : selectedDnsDomain.cnameTarget}
                      </td>
                      <td className="p-2 align-middle text-[#8b949e]">Auto</td>
                      <td className="p-2 align-middle text-right">
                        <button
                          type="button"
                          onClick={() => {
                            copyToClipboard(selectedDnsDomain.isApex ? selectedDnsDomain.apexIp : selectedDnsDomain.cnameTarget);
                            showToast(`Copied target`);
                          }}
                          className="p-1 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] rounded cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>

                    {/* Record 2: Ownership Verification TXT */}
                    <tr className="hover:bg-[#161b22]/50 transition-colors">
                      <td className="p-2 align-middle">
                        <span className="px-1.5 py-0.2 rounded bg-[#8957e5]/15 text-[#a371f7] font-normal text-[10px]">
                          TXT
                        </span>
                      </td>
                      <td className="p-2 align-middle text-[#f0f6fc] truncate max-w-[140px]" title={selectedDnsDomain.txtRecordName}>
                        {selectedDnsDomain.txtRecordName}
                      </td>
                      <td className="p-2 align-middle text-[#c9d1d9] truncate max-w-[200px] select-all" title={selectedDnsDomain.txtRecordValue}>
                        {selectedDnsDomain.txtRecordValue}
                      </td>
                      <td className="p-2 align-middle text-[#8b949e]">Auto</td>
                      <td className="p-2 align-middle text-right">
                        <button
                          type="button"
                          onClick={() => {
                            copyToClipboard(selectedDnsDomain.txtRecordValue);
                            showToast(`Copied TXT token`);
                          }}
                          className="p-1 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] rounded cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* DNS Propagation Probe Terminal Simulator */}
              <div className="bg-[#090d13] border border-[#21262d] rounded p-2 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#7d8590]">
                    <Terminal className="w-3 h-3 text-[#58a6ff]" />
                    <span>DNS Resolver Probe</span>
                  </div>
                  <button
                    type="button"
                    disabled={dnsProbeActive}
                    onClick={() => handleRunDnsProbe(selectedDnsDomain)}
                    className="bg-[#21262d] hover:bg-[#282e36] text-[#58a6ff] hover:text-[#79c0ff] border border-[#30363d] px-2 py-0.5 rounded text-[10px] font-normal cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <RefreshCw className={`w-3 h-3 ${dnsProbeActive ? 'animate-spin text-[#1d6cf6]' : ''}`} />
                    <span>{dnsProbeActive ? 'Probing...' : 'Run Probe'}</span>
                  </button>
                </div>

                {dnsProbeLogs.length > 0 ? (
                  <div className="bg-[#05080d] p-2 rounded border border-[#161b22] font-mono text-[10px] flex flex-col gap-0.5">
                    {dnsProbeLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className={`${
                          log.includes('SUCCESS') || log.includes('OK') || log.includes('MATCH')
                            ? 'text-[#3fb950]'
                            : log.includes('Initiating')
                            ? 'text-[#58a6ff]'
                            : 'text-[#8b949e]'
                        }`}
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-[9.5px] text-[#7d8590]">
                    Click "Run Probe" to test resolution across Cloudflare (1.1.1.1) and Google (8.8.8.8).
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-between">
              <span className="text-[9.5px] text-[#7d8590]">SSL certificate provisions automatically once DNS resolves.</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsDnsModalOpen(false);
                    setSelectedDnsDomain(null);
                  }}
                  className="bg-[#21262d] hover:bg-[#282e36] text-[#f0f6fc] px-2.5 py-1 text-xs rounded transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleVerifyCustomDomain(selectedDnsDomain.id);
                    setIsDnsModalOpen(false);
                  }}
                  className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white px-2.5 py-1 text-xs font-normal rounded cursor-pointer transition-colors shadow-sm flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Verify</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 
        ====================================================================
        POPUP MODAL: EDIT CUSTOM DOMAIN SETTINGS
        ====================================================================
      */}
      {isEditDomainModalOpen && editingDomain && (
        <div className="fixed inset-0 bg-[#05080d]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-[#161b22] border border-[#21262d] rounded-lg shadow-2xl overflow-hidden">
            <div className="px-3.5 py-2.5 border-b border-[#21262d] flex items-center justify-between bg-[#090d13]">
              <div className="flex items-center gap-2">
                <Edit3 className="w-3.5 h-3.5 text-[#1d6cf6]" />
                <h3 className="text-xs font-medium text-[#f0f6fc]">Edit Domain: {editingDomain.domain}</h3>
              </div>
              <button
                onClick={() => {
                  setIsEditDomainModalOpen(false);
                  setEditingDomain(null);
                }}
                className="text-[#8b949e] hover:text-[#f0f6fc] p-1 rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 flex flex-col gap-2.5 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#7d8590]">Domain Name</label>
                <input
                  type="text"
                  value={editingDomain.domain}
                  disabled
                  className="w-full bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1 font-mono text-xs text-[#8b949e] cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#7d8590]">Target Branch</label>
                <select
                  value={editingDomain.targetBranch}
                  onChange={(e) => setEditingDomain({ ...editingDomain, targetBranch: e.target.value })}
                  className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#1d6cf6]"
                >
                  <option value="main">Production (main)</option>
                  <option value="preview">Preview (staging)</option>
                  <option value="development">Development (dev)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#7d8590]">Redirect Mode</label>
                <select
                  value={editingDomain.redirectMode}
                  onChange={(e) => setEditingDomain({ ...editingDomain, redirectMode: e.target.value as any })}
                  className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1 text-xs text-[#f0f6fc] focus:outline-none focus:border-[#1d6cf6]"
                >
                  <option value="https_only">Force HTTPS Only</option>
                  <option value="apex_to_www">Redirect apex to www</option>
                  <option value="www_to_apex">Redirect www to apex</option>
                  <option value="none">No Redirect</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#7d8590]">SSL / TLS Certificate</label>
                <div className="bg-[#090d13] p-2 rounded border border-[#21262d] flex items-center justify-between">
                  <span className="text-[#3fb950] flex items-center gap-1 font-mono text-[10.5px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Automatic Edge TLS
                  </span>
                  <span className="text-[9.5px] text-[#8b949e]">Active</span>
                </div>
              </div>
            </div>

            <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsEditDomainModalOpen(false);
                  setEditingDomain(null);
                }}
                className="bg-[#21262d] hover:bg-[#282e36] text-[#f0f6fc] px-3 py-1 text-xs rounded transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEditedDomain}
                className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white px-3 py-1 text-xs font-medium rounded cursor-pointer transition-colors shadow-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 
        ====================================================================
        POPUP MODAL: PURGE CLOUDFLARE EDGE CACHE
        ====================================================================
      */}
      {isPurgeModalOpen && (
        <div className="fixed inset-0 bg-[#05080d]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-[#161b22] border border-[#21262d] rounded shadow-2xl overflow-hidden">
            <div className="px-3.5 py-2.5 border-b border-[#21262d] flex items-center justify-between bg-[#090d13]">
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#e3b341]" />
                <h3 className="text-xs font-medium text-[#f0f6fc]">Purge Cloudflare Edge Cache</h3>
              </div>
              <button
                onClick={() => setIsPurgeModalOpen(false)}
                className="text-[#8b949e] hover:text-[#f0f6fc] p-1 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3.5 flex flex-col gap-2.5 text-xs">
              <div className="text-[11px] text-[#8b949e]">
                Purging cache forces Cloudflare edge nodes to retrieve fresh assets from origin on the next request.
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPurgeType('everything')}
                  className={`p-2 rounded border text-left flex flex-col gap-0.5 cursor-pointer transition-all ${
                    purgeType === 'everything'
                      ? 'bg-[#1d6cf6]/10 border-[#1d6cf6]/40 text-[#f0f6fc]'
                      : 'bg-[#090d13] border-[#21262d] text-[#8b949e]'
                  }`}
                >
                  <span className="font-medium text-xs text-[#f0f6fc]">Purge Everything</span>
                  <span className="text-[10px] text-[#8b949e]">Invalidates all 310+ edge caches</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPurgeType('custom')}
                  className={`p-2 rounded border text-left flex flex-col gap-0.5 cursor-pointer transition-all ${
                    purgeType === 'custom'
                      ? 'bg-[#1d6cf6]/10 border-[#1d6cf6]/40 text-[#f0f6fc]'
                      : 'bg-[#090d13] border-[#21262d] text-[#8b949e]'
                  }`}
                >
                  <span className="font-medium text-xs text-[#f0f6fc]">Custom URLs</span>
                  <span className="text-[10px] text-[#8b949e]">Purge specific URLs or cache tags</span>
                </button>
              </div>

              {purgeType === 'custom' && (
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono uppercase text-[#7d8590]">URLs or Prefixes (one per line)</label>
                  <textarea
                    rows={3}
                    value={purgeUrlsText}
                    onChange={(e) => setPurgeUrlsText(e.target.value)}
                    placeholder="https://app.vibtools.dev/assets/*&#10;https://app.vibtools.dev/index.html"
                    className="bg-[#090d13] border border-[#21262d] rounded p-2 text-xs font-mono text-[#f0f6fc] focus:outline-none focus:border-[#1d6cf6]"
                  />
                </div>
              )}
            </div>

            <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsPurgeModalOpen(false)}
                className="bg-[#21262d] hover:bg-[#282e36] text-[#f0f6fc] px-3 py-1 text-xs rounded transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPurgingCache}
                onClick={handleExecutePurgeCache}
                className="bg-[#e3b341] hover:bg-[#f2cc60] text-[#090d13] px-3 py-1 text-xs font-medium rounded cursor-pointer transition-colors shadow-sm flex items-center gap-1.5"
              >
                {isPurgingCache ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Purging Edge...</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>Purge Cache</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 
        ====================================================================
        POPUP MODAL: ADD KV NAMESPACE BINDING
        ====================================================================
      */}
      {isAddKvModalOpen && (
        <div className="fixed inset-0 bg-[#05080d]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-[#161b22] border border-[#21262d] rounded shadow-2xl overflow-hidden">
            <div className="px-3.5 py-2.5 border-b border-[#21262d] flex items-center justify-between bg-[#090d13]">
              <div className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-[#1d6cf6]" />
                <h3 className="text-xs font-medium text-[#f0f6fc]">Add KV Namespace Binding</h3>
              </div>
              <button
                onClick={() => setIsAddKvModalOpen(false)}
                className="text-[#8b949e] hover:text-[#f0f6fc] p-1 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3.5 flex flex-col gap-2.5 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#7d8590]">Variable Name</label>
                <input
                  type="text"
                  placeholder="e.g. CACHE_KV, USER_SESSIONS"
                  value={newKvName}
                  onChange={(e) => setNewKvName(e.target.value.toUpperCase())}
                  className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] font-mono focus:border-[#1d6cf6] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#7d8590]">KV Namespace ID</label>
                <input
                  type="text"
                  placeholder="e.g. 9b7f3a8820c845b4a92c31e"
                  value={newKvNamespaceId}
                  onChange={(e) => setNewKvNamespaceId(e.target.value)}
                  className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] font-mono focus:border-[#1d6cf6] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#7d8590]">Environment Target</label>
                <select
                  value={newKvEnvironment}
                  onChange={(e) => setNewKvEnvironment(e.target.value)}
                  className="bg-[#090d13] border border-[#21262d] rounded px-2 py-1.5 text-xs text-[#f0f6fc] focus:border-[#1d6cf6] focus:outline-none"
                >
                  <option value="Production">Production only</option>
                  <option value="Preview">Preview only</option>
                  <option value="All">All environments</option>
                </select>
              </div>
            </div>

            <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddKvModalOpen(false)}
                className="bg-[#21262d] hover:bg-[#282e36] text-[#f0f6fc] px-3 py-1 text-xs rounded transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!newKvName.trim() || !newKvNamespaceId.trim()}
                onClick={handleAddKvBinding}
                className="bg-[#1d6cf6] hover:bg-[#2f7af8] disabled:opacity-50 text-white px-3 py-1 text-xs font-medium rounded cursor-pointer transition-colors shadow-sm"
              >
                Add Binding
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 
        ====================================================================
        POPUP MODAL: ADD D1 SQL DATABASE BINDING
        ====================================================================
      */}
      {isAddD1ModalOpen && (
        <div className="fixed inset-0 bg-[#05080d]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-[#161b22] border border-[#21262d] rounded shadow-2xl overflow-hidden">
            <div className="px-3.5 py-2.5 border-b border-[#21262d] flex items-center justify-between bg-[#090d13]">
              <div className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-[#3fb950]" />
                <h3 className="text-xs font-medium text-[#f0f6fc]">Add D1 SQL Database Binding</h3>
              </div>
              <button
                onClick={() => setIsAddD1ModalOpen(false)}
                className="text-[#8b949e] hover:text-[#f0f6fc] p-1 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3.5 flex flex-col gap-2.5 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#7d8590]">Variable Name</label>
                <input
                  type="text"
                  placeholder="e.g. DB, ANALYTICS_DB"
                  value={newD1Name}
                  onChange={(e) => setNewD1Name(e.target.value.toUpperCase())}
                  className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] font-mono focus:border-[#1d6cf6] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#7d8590]">D1 Database ID / UUID</label>
                <input
                  type="text"
                  placeholder="e.g. 04a991f3-e381-42e5-bc09-085709926031"
                  value={newD1DatabaseId}
                  onChange={(e) => setNewD1DatabaseId(e.target.value)}
                  className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] font-mono focus:border-[#1d6cf6] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#7d8590]">Environment Target</label>
                <select
                  value={newD1Environment}
                  onChange={(e) => setNewD1Environment(e.target.value)}
                  className="bg-[#090d13] border border-[#21262d] rounded px-2 py-1.5 text-xs text-[#f0f6fc] focus:border-[#1d6cf6] focus:outline-none"
                >
                  <option value="Production">Production only</option>
                  <option value="Preview">Preview only</option>
                  <option value="All">All environments</option>
                </select>
              </div>
            </div>

            <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddD1ModalOpen(false)}
                className="bg-[#21262d] hover:bg-[#282e36] text-[#f0f6fc] px-3 py-1 text-xs rounded transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!newD1Name.trim() || !newD1DatabaseId.trim()}
                onClick={handleAddD1Binding}
                className="bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 text-white px-3 py-1 text-xs font-medium rounded cursor-pointer transition-colors shadow-sm"
              >
                Add D1 Database
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 
        ====================================================================
        POPUP MODAL: ADD R2 STORAGE BUCKET BINDING
        ====================================================================
      */}
      {isAddR2ModalOpen && (
        <div className="fixed inset-0 bg-[#05080d]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-[#161b22] border border-[#21262d] rounded shadow-2xl overflow-hidden">
            <div className="px-3.5 py-2.5 border-b border-[#21262d] flex items-center justify-between bg-[#090d13]">
              <div className="flex items-center gap-1.5">
                <Boxes className="w-3.5 h-3.5 text-[#e3b341]" />
                <h3 className="text-xs font-medium text-[#f0f6fc]">Add R2 Storage Bucket Binding</h3>
              </div>
              <button
                onClick={() => setIsAddR2ModalOpen(false)}
                className="text-[#8b949e] hover:text-[#f0f6fc] p-1 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3.5 flex flex-col gap-2.5 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#7d8590]">Variable Name</label>
                <input
                  type="text"
                  placeholder="e.g. ASSETS_BUCKET, UPLOADS_R2"
                  value={newR2Name}
                  onChange={(e) => setNewR2Name(e.target.value.toUpperCase())}
                  className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] font-mono focus:border-[#1d6cf6] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#7d8590]">Target R2 Bucket Name</label>
                <input
                  type="text"
                  placeholder="e.g. ygit-vibtools-assets-prod"
                  value={newR2BucketName}
                  onChange={(e) => setNewR2BucketName(e.target.value)}
                  className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] font-mono focus:border-[#1d6cf6] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#7d8590]">Environment Target</label>
                <select
                  value={newR2Environment}
                  onChange={(e) => setNewR2Environment(e.target.value)}
                  className="bg-[#090d13] border border-[#21262d] rounded px-2 py-1.5 text-xs text-[#f0f6fc] focus:border-[#1d6cf6] focus:outline-none"
                >
                  <option value="Production">Production only</option>
                  <option value="Preview">Preview only</option>
                  <option value="All">All environments</option>
                </select>
              </div>
            </div>

            <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddR2ModalOpen(false)}
                className="bg-[#21262d] hover:bg-[#282e36] text-[#f0f6fc] px-3 py-1 text-xs rounded transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!newR2Name.trim() || !newR2BucketName.trim()}
                onClick={handleAddR2Binding}
                className="bg-[#e3b341] hover:bg-[#f2cc60] disabled:opacity-50 text-[#090d13] px-3 py-1 text-xs font-medium rounded cursor-pointer transition-colors shadow-sm"
              >
                Add R2 Bucket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 
        ====================================================================
        POPUP MODAL: CREATE DEPLOY HOOK (WEBHOOK)
        ====================================================================
      */}
      {isAddDeployHookModalOpen && (
        <div className="fixed inset-0 bg-[#05080d]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-[#161b22] border border-[#21262d] rounded shadow-2xl overflow-hidden">
            <div className="px-3.5 py-2.5 border-b border-[#21262d] flex items-center justify-between bg-[#090d13]">
              <div className="flex items-center gap-1.5">
                <Webhook className="w-3.5 h-3.5 text-[#1d6cf6]" />
                <h3 className="text-xs font-medium text-[#f0f6fc]">Create Deploy Webhook</h3>
              </div>
              <button
                onClick={() => setIsAddDeployHookModalOpen(false)}
                className="text-[#8b949e] hover:text-[#f0f6fc] p-1 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3.5 flex flex-col gap-2.5 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#7d8590]">Deploy Hook Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sanity CMS Publish, Daily Cron"
                  value={newDeployHookName}
                  onChange={(e) => setNewDeployHookName(e.target.value)}
                  className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] focus:border-[#1d6cf6] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#7d8590]">Target Branch</label>
                <input
                  type="text"
                  value={newDeployHookBranch}
                  onChange={(e) => setNewDeployHookBranch(e.target.value)}
                  className="bg-[#090d13] border border-[#21262d] rounded px-2.5 py-1.5 text-xs text-[#f0f6fc] font-mono focus:border-[#1d6cf6] focus:outline-none"
                />
              </div>
            </div>

            <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddDeployHookModalOpen(false)}
                className="bg-[#21262d] hover:bg-[#282e36] text-[#f0f6fc] px-3 py-1 text-xs rounded transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!newDeployHookName.trim()}
                onClick={handleAddDeployHook}
                className="bg-[#1d6cf6] hover:bg-[#2f7af8] disabled:opacity-50 text-white px-3 py-1 text-xs font-medium rounded cursor-pointer transition-colors shadow-sm"
              >
                Generate Hook
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 
        ====================================================================
        POPUP MODAL: DELETE PROJECT SAFEGUARD
        ====================================================================
      */}
      {isDeleteProjectModalOpen && (
        <div className="fixed inset-0 bg-[#05080d]/85 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-[#161b22] border border-[#da3633]/40 rounded shadow-2xl overflow-hidden">
            <div className="px-3.5 py-2.5 border-b border-[#da3633]/20 flex items-center justify-between bg-[#da3633]/10">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[#f85149]" />
                <h3 className="text-xs font-medium text-[#f85149]">Delete Project Confirmation</h3>
              </div>
              <button
                onClick={() => {
                  setIsDeleteProjectModalOpen(false);
                  setDeleteConfirmText('');
                }}
                className="text-[#8b949e] hover:text-[#f0f6fc] p-1 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3.5 flex flex-col gap-2.5 text-xs">
              <p className="text-[#c9d1d9] leading-relaxed">
                This action is irreversible. It will immediately take down your deployments, DNS records, and KV/D1 database bindings for <span className="text-[#f0f6fc] font-mono">{cfProjectName}</span>.
              </p>

              <div className="flex flex-col gap-1">
                <label className="text-[10.5px] text-[#8b949e]">
                  Please type <span className="text-[#f0f6fc] font-mono select-all font-medium">{cfProjectName}</span> to confirm:
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder={cfProjectName}
                  className="bg-[#090d13] border border-[#21262d] focus:border-[#da3633] focus:outline-none rounded px-2.5 py-1.5 font-mono text-xs text-[#f0f6fc]"
                />
              </div>
            </div>

            <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteProjectModalOpen(false);
                  setDeleteConfirmText('');
                }}
                className="bg-[#21262d] hover:bg-[#282e36] text-[#f0f6fc] px-3 py-1 text-xs rounded transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteConfirmText.trim() !== cfProjectName}
                onClick={() => {
                  setIsDeleteProjectModalOpen(false);
                  setDeleteConfirmText('');
                  setActiveRoute('projects');
                  showToast(`Project ${cfProjectName} was deleted.`);
                }}
                className="bg-[#da3633] hover:bg-[#f85149] disabled:opacity-40 text-white px-3 py-1 text-xs font-medium rounded cursor-pointer transition-colors shadow-sm"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 
        ====================================================================
        POPUP MODAL: CONNECTED ACCOUNTS & PROVIDERS
        ====================================================================
      */}
      {isAccountsModalOpen && (
        <div className="fixed inset-0 bg-[#05080d]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-[#161b22] border border-[#21262d] rounded-lg shadow-2xl overflow-hidden animate-in fade-in duration-150">
            <div className="px-3.5 py-2.5 border-b border-[#21262d] flex items-center justify-between bg-[#090d13]">
              <div className="flex items-center gap-2">
                <Github className="w-3.5 h-3.5 text-[#58a6ff]" />
                <h3 className="text-xs font-medium text-[#f0f6fc]">Connected Accounts & Providers</h3>
              </div>
              <button
                onClick={() => setIsAccountsModalOpen(false)}
                className="text-[#8b949e] hover:text-[#f0f6fc] p-1 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3.5 flex flex-col gap-2.5 text-xs">
              {/* GitHub Account Card */}
              <div className="bg-[#090d13] border border-[#21262d] rounded-md p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center text-white">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#f0f6fc] flex items-center gap-1.5">
                      <span>GitHub: @vibtools</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30">
                        Connected
                      </span>
                    </div>
                    <div className="text-[10.5px] text-[#7d8590]">12 Repositories linked · Webhooks active</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('GitHub OAuth tokens refreshed')}
                  className="bg-[#21262d] hover:bg-[#282e36] text-[#c9d1d9] hover:text-[#f0f6fc] px-2.5 py-1 rounded text-[11px] border border-[#30363d] cursor-pointer transition-colors"
                >
                  Re-sync
                </button>
              </div>

              {/* Cloudflare Account Card */}
              <div className="bg-[#090d13] border border-[#21262d] rounded-md p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#f38020]">
                    <Cloud className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#f0f6fc] flex items-center gap-1.5">
                      <span>Cloudflare Pages</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30">
                        Verified
                      </span>
                    </div>
                    <div className="text-[10.5px] text-[#7d8590]">API Token Active · 310+ Edge POPs</div>
                  </div>
                </div>
                <SecondaryButton
                  size="sm"
                  onClick={() => showToast('Cloudflare edge credentials verified')}
                >
                  Verify
                </SecondaryButton>
              </div>
            </div>

            <div className="px-3.5 py-2 border-t border-[#21262d] bg-[#090d13] flex items-center justify-end">
              <PrimaryButton
                size="sm"
                onClick={() => setIsAccountsModalOpen(false)}
              >
                Done
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {/* 
        ====================================================================
        POPUP MODAL: TEMPLATE DEEP SPECIFICATIONS & ARCHITECTURE
        ====================================================================
      */}
      <TemplateModal
        template={selectedTemplateForDetails}
        onClose={() => setSelectedTemplateForDetails(null)}
        onUseTemplate={handleUseTemplate}
        isDeploying={deployingTemplateId === selectedTemplateForDetails?.id}
        onToast={showToast}
      />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-3 right-3 bg-[#161b22] border border-[#1d6cf6] rounded px-3 py-1.5 flex items-center gap-2 z-50 text-xs text-[#f0f6fc]">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
