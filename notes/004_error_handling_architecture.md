# ERROR HANDLING & RESILIENCE ARCHITECTURE
**Document ID:** `YGIT-DOC-004`  
**Date:** November 8, 2026  
**Status:** `ACTIVE ARCHITECTURAL SPECIFICATION`  
**Scope:** Client-Side Error Boundaries, Form Validations, Network Resilience, Empty States

---

## 1. Overview & Current Error Handling State

In the current baseline version, error prevention and handling exists across multiple levels:
1. **TypeScript Strict Mode:** Catches missing props, invalid route types, and payload schema violations at compile time (`tsc --noEmit`).
2. **Interactive Toast Notifications:** Contextual feedback for async operations (e.g., `"GitHub account disconnected"`, `"✨ Cloudflare API credentials verified"`, `"Copied to clipboard"`).
3. **Form Validations:** Required HTML5 inputs (`required`, regex pattern checking for domain names, input lengths).
4. **Destructive Action Safeguards:** The "Delete Project" modal requires explicit typing of the project slug before enabling the delete action (`deleteConfirmText === currentProject.name`).
5. **Subdomain Availability Probe:** The free subdomain registrar validates availability against reserved words (`admin`, `api`, `auth`, `root`, `billing`, `cloud`, `system`, `ygit`) and checks duplicate registrations.

---

## 2. Identified Error Handling Gaps & Vulnerabilities

| Area | Current Behavior | Potential Failure Mode | Proposed Enhancement (Phase 5) |
| :--- | :--- | :--- | :--- |
| **Component Crashes** | Uncaught React error causes entire screen to go blank (white-screen of death) | If a sub-tab throws an unexpected null-pointer, the entire dashboard breaks | Introduce `AppErrorBoundary` with a friendly "Reload View" button and error report log. |
| **Empty Search Results** | If `projectSearch` returns 0 items, screen is completely blank | User may think app is frozen or broken | Add unified `EmptyState` component with clear CTA (`"No projects found matching query"` + Clear search button). |
| **Network & Backend Disconnect** | Simulated in accounts view, but lacks offline indicator | If user goes offline during a scan or deployment | Implement browser `navigator.onLine` connectivity toast / badge. |
| **Invalid .env File Upload** | Handles file reading but does not catch malformed syntax | User uploading corrupt or binary file causes parsing error | Add robust line-by-line .env AST validator with clear error modal line highlights. |
| **Invalid Domain DNS CNAME** | DNS modal shows records, but verification is simulated | User tries to verify without adding records | Add inline DNS query error state (`"NXDOMAIN: CNAME record not detected on edge"`). |

---

## 3. Implementation Blueprint for Enhancements

### 3.1 AppErrorBoundary Specification (`src/components/errors/AppErrorBoundary.tsx`)
```tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AppErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('YGIT Application Uncaught Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0d1117] text-[#f0f6fc] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#161b22] border border-[#f85149]/30 rounded-lg p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-[#f85149]/15 border border-[#f85149]/30 flex items-center justify-center mx-auto mb-4 text-[#f85149]">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-base font-semibold text-[#f0f6fc] mb-1">Application Workspace Error</h2>
            <p className="text-xs text-[#8b949e] mb-4">
              An unexpected render error occurred in this view. Your configuration and state remain secure.
            </p>
            <div className="bg-[#090d13] border border-[#21262d] rounded p-2.5 text-left font-mono text-[11px] text-[#f85149] mb-4 max-h-24 overflow-y-auto">
              {this.state.error?.message || 'Unknown runtime exception'}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white text-xs font-medium px-4 py-2 rounded flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reload Workspace</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
```

### 3.2 Form Validation Standards
1. **Input Lengths:** Project names must be 3–48 characters, lowercase alphanumeric with dashes.
2. **Environment Variable Keys:** Must match regex `/^[A-Z_][A-Z0-9_]*$/`. Invalid characters show an instant red validation ring before submit.
3. **Secret Masking Invariant:** Secret values must never be logged to console or persisted unmasked in DOM attributes.

---

## 4. Verification & Testing Procedure
1. Trigger artificial error using a throw statement in test harness.
2. Confirm error boundary isolates the crash to the specific view without crashing entire page.
3. Verify "Reload Workspace" returns user to a clean, working state.
