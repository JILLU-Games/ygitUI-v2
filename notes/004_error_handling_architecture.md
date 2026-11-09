# YGIT PLATFORM UI — ERROR HANDLING ARCHITECTURE
**Document ID:** `YGIT-DOC-004-ERROR-HANDLING`  
**Date:** November 8, 2026  
**Status:** `AUDITED & ARCHITECTED`  

---

## 1. Current Error Handling Mechanisms (Baseline Audit)

The current YGIT codebase contains several operational error handling layers across runtime rendering, network simulation, and user validation:

### 1.1 Global React Error Boundary (`AppErrorBoundary.tsx`)
- **Location**: `src/components/errors/AppErrorBoundary.tsx`
- **Mounting Point**: `src/main.tsx` mounts `<AppErrorBoundary>` wrapping the root `<App />`.
- **Implementation**: Class component implementing `componentDidCatch(error, errorInfo)`.
- **UI Fallback**:
  - Intercepts uncaught React lifecycle and render errors.
  - Displays a clean error screen with an alert icon (`AlertTriangle className="text-[#f85149]"`).
  - Displays error details in a dark monospace enclave (`bg-[#090d13] border border-[#21262d] font-mono text-[11px]`).
  - Provides a "Reload Application" recovery button (`window.location.reload()`) and "Reset App State" option.

### 1.2 Form Validation & Destructive Action Safeguards
- **Delete Project Confirmation (`DeleteProjectModal.tsx`)**:
  - Enforces exact string matching before enabling the destructive deletion button (`disabled={confirmText.trim() !== projectName}`).
- **Environment Variables Import (`VariablesTab.tsx` / `PasteEnvModal.tsx`)**:
  - Validates pasted `.env` strings, rejecting malformed lines without `=` delimiters and ignoring comments (`#`).
- **Custom Domain Validation (`DomainsTab.tsx`)**:
  - Validates non-empty input, strips whitespace, and rejects invalid characters.
- **Subdomain Search Availability (`DomainsTab.tsx`)**:
  - Simulates DNS zone lookups and flags collisions with alternative suggestions if a name is taken.

### 1.3 Asynchronous Simulation Failure States & Fallbacks
- **Brand Logo Image Fallback (`YGitLogo.tsx`)**:
  - Implements `onError` handler on the official PNG asset; falls back to inline SVG vector if offline or CDN unreachable.
- **DNS Resolution Probe (`DnsConfigModal.tsx`)**:
  - Simulates multi-POP DNS propagation probe across global Cloudflare edge nodes with failure indicators.
- **Toast Feedback Engine**:
  - Real-time user notification toasts displayed on action successes, validation warnings, and copy events.

---

## 2. Potential Failure Modes & Architectural Gaps

| ID | Location / Component | Potential Failure Mode | Severity | Impact |
| :--- | :--- | :--- | :--- | :--- |
| **ERR-GAP-01** | Workspace Tabs | A crash inside one tab (e.g. malformed DNS input in `DomainsTab` or JSON parse failure in `SettingsView`) crashes the **entire application** because only one root-level error boundary exists. | HIGH | Complete viewport blackout |
| **ERR-GAP-02** | File Upload Handling | In `IntakePipeline.tsx` and `VariablesTab.tsx`, reading files via `FileReader` lacks robust `try/catch` wrapping for corrupt or oversized binary uploads (>100MB). | MEDIUM | Silent freeze or crash |
| **ERR-GAP-03** | JSON Serialization | In `SettingsView.tsx`, `JSON.stringify(formState)` or future `JSON.parse` imports could throw uncaught SyntaxErrors on malformed custom JSON. | MEDIUM | Modal lockup |
| **ERR-GAP-04** | Clipboard API Security | Calling `navigator.clipboard.writeText()` without checking permissions or fallback can throw in strict iframe or insecure HTTP environments. | LOW | Failed copy action |
| **ERR-GAP-05** | URL Protocol Injection | `DashboardView.tsx` and `IntakePipeline.tsx` allow entering repository URLs without enforcing valid `https://github.com/` patterns. | LOW | Broken deployment link |

---

## 3. Planned Error Handling Enhancements (Recommended for Implementation)

### 3.1 Tab-Level Granular Error Boundaries (`TabErrorBoundary`)
Wrap individual workspace tabs inside a scoped error boundary so that an error in one tab keeps the sidebar, navigation, and other tabs fully operational:
```tsx
<TabErrorBoundary tabName="Domains">
  <DomainsTab {...domainsProps} />
</TabErrorBoundary>
```

### 3.2 Safe Clipboard Helper with ExecCommand Fallback
Standardize clipboard operations with a safe utility:
```typescript
export async function safeCopyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for non-secure contexts
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Failed to copy text to clipboard', err);
    return false;
  }
}
```

### 3.3 Safe JSON Parser with Fallback
Wrap all JSON parsing in `SettingsView.tsx` and telemetry logs:
```typescript
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.warn('[YGIT] JSON Parse Error:', error);
    return fallback;
  }
}
```

### 3.4 File Size & MIME Type Validation Safeguards
Enforce maximum 100MB file limit and MIME type validation in `IntakePipeline.tsx`:
```typescript
const MAX_UPLOAD_BYTES = 100 * 1024 * 1024; // 100MB
if (file.size > MAX_UPLOAD_BYTES) {
  showToast('File exceeds 100MB maximum bundle size.');
  return;
}
```
