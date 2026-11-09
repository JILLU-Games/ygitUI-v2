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
  MetricPill,
  TemplateThumbnailGraphic,
  TemplateModal,
  ModalShell,
  CreateProjectModal,
  PasteEnvModal,
  EditEnvModal,
  AccountsModal,
  DnsConfigModal,
  EditCustomDomainModal,
  AddKvModal,
  AddD1Modal,
  AddR2Modal,
  AddDeployHookModal,
  PurgeCacheModal,
  DeleteProjectModal,
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
                <MetricPill variant="neutral">{deploymentsList.length} Total</MetricPill>
              </div>
            ) : activeRoute === 'accounts' ? (
              <div className="flex items-center gap-1.5 text-xs font-normal">
                <span className="text-[#8b949e]">Platform</span>
                <span className="text-[#7d8590]">/</span>
                <span className="text-[#f0f6fc] font-medium">Connected Accounts</span>
                <MetricPill variant="green">
                  {isGithubConnected && isCloudflareConnected ? '2 Linked' : isGithubConnected || isCloudflareConnected ? '1 Linked' : '0 Linked'}
                </MetricPill>
              </div>
            ) : activeRoute === 'settings' ? (
              <div className="flex items-center gap-1.5 text-xs font-normal">
                <span className="text-[#8b949e]">Platform</span>
                <span className="text-[#7d8590]">/</span>
                <span className="text-[#f0f6fc] font-medium">Settings</span>
                <MetricPill variant="blue">Account & Preferences</MetricPill>
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
                <StatusBadge status="verified" label="Ready" />
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
              <PrimaryButton
                size="sm"
                icon={<Play className="w-3.5 h-3.5 fill-current" />}
                onClick={() => triggerDeployment(currentProject.name)}
                title="Deploy to Cloudflare Pages"
              >
                <span className="hidden sm:inline">Deploy</span>
              </PrimaryButton>
            ) : (
              <PrimaryButton
                size="sm"
                icon={<Plus className="w-3.5 h-3.5" />}
                onClick={() => setIsModalOpen(true)}
              >
                <span>New Project</span>
              </PrimaryButton>
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
                          <MetricPill variant="green" size="xs">
                            {platformSettings.profile?.plan || 'Pro'}
                          </MetricPill>
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
                      <MetricPill variant="neutral">
                        {isGithubConnected && isCloudflareConnected ? '2 Linked' : '1 Linked'}
                      </MetricPill>
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
                      <MetricPill variant="neutral">Pref & Git</MetricPill>
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
      <CreateProjectModal
        isOpen={isModalOpen}
        projectName={newProjectName}
        onProjectNameChange={setNewProjectName}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProjectSubmit}
      />

      {/* POPUP MODAL: PASTE .ENV RAW VARIABLES */}
      <PasteEnvModal
        isOpen={isPasteEnvModalOpen}
        onClose={() => {
          setIsPasteEnvModalOpen(false);
          setPasteEnvText('');
        }}
        pasteEnvText={pasteEnvText}
        onPasteEnvTextChange={setPasteEnvText}
        pasteEnvTarget={pasteEnvTarget}
        onPasteEnvTargetChange={setPasteEnvTarget}
        pasteEnvIsSecret={pasteEnvIsSecret}
        onPasteEnvIsSecretChange={setPasteEnvIsSecret}
        onSubmit={handlePasteEnvSubmit}
      />

      {/* POPUP MODAL: EDIT VARIABLE */}
      <EditEnvModal
        isOpen={isEditEnvModalOpen}
        editingEnvVar={editingEnvVar}
        onEditingEnvVarChange={setEditingEnvVar}
        onClose={() => {
          setIsEditEnvModalOpen(false);
          setEditingEnvVar(null);
        }}
        onSave={handleSaveEditedEnvVar}
      />

      {/* POPUP MODAL: DNS CONFIGURATION & RESOLUTION PROBE */}
      <DnsConfigModal
        isOpen={isDnsModalOpen}
        domainItem={selectedDnsDomain}
        onClose={() => {
          setIsDnsModalOpen(false);
          setSelectedDnsDomain(null);
          setDnsProbeActive(false);
          setDnsProbeLogs([]);
        }}
        onVerify={handleVerifyCustomDomain}
        dnsProbeActive={dnsProbeActive}
        dnsProbeLogs={dnsProbeLogs}
        onRunProbe={handleRunDnsProbe}
        onCopyToClipboard={copyToClipboard}
      />

      {/* POPUP MODAL: EDIT CUSTOM DOMAIN SETTINGS */}
      <EditCustomDomainModal
        isOpen={isEditDomainModalOpen}
        domainItem={editingDomain}
        onDomainItemChange={setEditingDomain}
        onClose={() => {
          setIsEditDomainModalOpen(false);
          setEditingDomain(null);
        }}
        onSave={handleSaveEditedDomain}
      />

      {/* POPUP MODAL: PURGE CLOUDFLARE EDGE CACHE */}
      <PurgeCacheModal
        isOpen={isPurgeModalOpen}
        onClose={() => setIsPurgeModalOpen(false)}
        purgeType={purgeType}
        onPurgeTypeChange={setPurgeType}
        purgeUrlsText={purgeUrlsText}
        onPurgeUrlsTextChange={setPurgeUrlsText}
        isPurging={isPurgingCache}
        onExecutePurge={handleExecutePurgeCache}
      />

      {/* POPUP MODAL: ADD KV NAMESPACE BINDING */}
      <AddKvModal
        isOpen={isAddKvModalOpen}
        onClose={() => setIsAddKvModalOpen(false)}
        name={newKvName}
        onNameChange={setNewKvName}
        namespaceId={newKvNamespaceId}
        onNamespaceIdChange={setNewKvNamespaceId}
        environment={newKvEnvironment}
        onEnvironmentChange={setNewKvEnvironment}
        onAdd={handleAddKvBinding}
      />

      {/* POPUP MODAL: ADD D1 SQL DATABASE BINDING */}
      <AddD1Modal
        isOpen={isAddD1ModalOpen}
        onClose={() => setIsAddD1ModalOpen(false)}
        name={newD1Name}
        onNameChange={setNewD1Name}
        databaseId={newD1DatabaseId}
        onDatabaseIdChange={setNewD1DatabaseId}
        environment={newD1Environment}
        onEnvironmentChange={setNewD1Environment}
        onAdd={handleAddD1Binding}
      />

      {/* POPUP MODAL: ADD R2 STORAGE BUCKET BINDING */}
      <AddR2Modal
        isOpen={isAddR2ModalOpen}
        onClose={() => setIsAddR2ModalOpen(false)}
        name={newR2Name}
        onNameChange={setNewR2Name}
        bucketName={newR2BucketName}
        onBucketNameChange={setNewR2BucketName}
        environment={newR2Environment}
        onEnvironmentChange={setNewR2Environment}
        onAdd={handleAddR2Binding}
      />

      {/* POPUP MODAL: CREATE DEPLOY HOOK (WEBHOOK) */}
      <AddDeployHookModal
        isOpen={isAddDeployHookModalOpen}
        onClose={() => setIsAddDeployHookModalOpen(false)}
        name={newDeployHookName}
        onNameChange={setNewDeployHookName}
        branch={newDeployHookBranch}
        onBranchChange={setNewDeployHookBranch}
        onAdd={handleAddDeployHook}
      />

      {/* POPUP MODAL: DELETE PROJECT SAFEGUARD */}
      <DeleteProjectModal
        isOpen={isDeleteProjectModalOpen}
        projectName={cfProjectName}
        confirmText={deleteConfirmText}
        onConfirmTextChange={setDeleteConfirmText}
        onClose={() => {
          setIsDeleteProjectModalOpen(false);
          setDeleteConfirmText('');
        }}
        onDelete={() => {
          setIsDeleteProjectModalOpen(false);
          setDeleteConfirmText('');
          setActiveRoute('projects');
          showToast(`Project ${cfProjectName} was deleted.`);
        }}
      />

      {/* POPUP MODAL: CONNECTED ACCOUNTS & PROVIDERS */}
      <AccountsModal
        isOpen={isAccountsModalOpen}
        onClose={() => setIsAccountsModalOpen(false)}
        onRefreshGithub={() => showToast('GitHub OAuth tokens refreshed')}
        onVerifyCloudflare={() => showToast('Cloudflare edge credentials verified')}
      />

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
