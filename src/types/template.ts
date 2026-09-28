/**
 * Theme & Starter Templates Types
 * Scope: Wix/Shopify marketplace style starter templates, detailed routes, environment schema, and Lighthouse specs.
 */

export interface TemplateRoute {
  path: string;
  name: string;
  type: 'Edge SSR' | 'Static SSG' | 'Dynamic API' | 'Client SPA';
  description: string;
}

export interface TemplateEnvVar {
  key: string;
  example: string;
  desc: string;
  required: boolean;
}

export interface ReadyTemplate {
  id: string;
  name: string;
  category: 'E-Commerce' | 'SaaS' | 'AI & Tooling' | 'Portfolio' | 'Blog' | 'Agency';
  framework: 'Next.js' | 'React + Vite' | 'Astro' | 'Nuxt' | 'Remix';
  frameworkBadge: string;
  author: string;
  shortBio: string;
  description: string;
  stars: string;
  deploys: string;
  buildTime: string;
  themeColor: string;
  previewBg: string;
  thumbnailType: 'ecommerce' | 'saas' | 'ai' | 'portfolio' | 'blog' | 'agency' | 'restaurant' | 'docs';
  thumbnailUrl: string;
  themeStyle: string;
  features: string[];
  stack: string[];
  database: string;
  repo: string;
  demoUrl: string;
  includedPages: string[];
  routesDetailed: TemplateRoute[];
  envVars: TemplateEnvVar[];
  buildCommand: string;
  outputDir: string;
  lighthouse: { perf: number; acc: number; best: number; seo: number };
  highlights: { title: string; desc: string }[];
}
