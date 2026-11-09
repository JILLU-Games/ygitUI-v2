# YGIT PLATFORM UI — ERROR HANDLING ARCHITECTURE
**Document ID:** `YGIT-DOC-004-ERROR-HANDLING`  
**Date:** November 8, 2026  
**Status:** `AUDITED & ARCHITECTED`  

---

## 1. Current Error Handling Mechanisms (Baseline Audit)

The current application contains several existing error handling layers across runtime rendering, network simulation, and user feedback:

### 1.1 Global React Error Boundary (`AppErrorBoundary.tsx`)
- **Location**: `src/components/errors/AppErrorBoundary.tsx`
- **Wrapping Point**: `src/main.tsx` wraps the entire `<App />` within `<AppErrorBoundary>`.
- **Implementation**: Class component implementing `componentDidCatch(error, errorInfo)`.
- **UI Fallback**:
  - Catches unhandled React lifecycle rendering crashes.
  - Displays a clean error screen with an alert triangle icon (`AlertTriangle className="text-[#f85149]"`).
  - Shows error message in a dark monospace block (`bg-[#090d13] border border-[#21262d] font-mono text-[11px]`).
  - Provides a "Reload Application" recovery button (`window.location.reload()`) and "Reset App State" option.

### 1.2 Form Validation Safeguards
- **Delete Project Confirmation**:
  - `DeleteProjectModal.tsx`: Requires the user to type the exact project name before the destructive action button enables (`disabled={confirmText !== projectName}`).
- **Environment Variables Import**:
  - `VariablesTab.tsx` / `App.tsx`: Validates pasted `.env` text, ensuring lines contain `=` and are not comments before enabling the import button.
- **Custom Domain Validation**:
  - `DomainsTab.tsx`: Validates non-empty domain name, rejects spaces, and normalizes casing to lowercase.

### 1.3 Asynchronous Simulation Failure States & Fallbacks
- **DNS Resolution Probe**:
  - `DnsConfigModal.tsx`: Simulates DNS resolution probe across global Cloudflare edge POPs; logs failures if CNAME target does not resolve to `*.ygit.net` or `*.pages.dev`.
- **Subdomain Search Availability**:
  - `DomainsTab.tsx`: Checks subdomain availability; triggers conflict error warning if the subdomain is already registered or reserved.
- **Toast Alert System**:
  - Real-time user feedback notifications triggered on errors, copy events, and action commits.

---

## 2. Forensic Gaps & Vulnerabilities in Current Error Handling

The forensic audit revealed the following potential failure modes:

| ID | Location | Potential Failure Mode | Risk Level |
| :--- | :--- | :--- | :--- |
| **ERR-GAP-01** | Global View Level | A crash inside a single sub-tab (e.g. malformed DNS record in `DomainsTab` or invalid JSON in `SettingsView`) crashes the **entire application viewport**, because there is only one root-level error boundary. | HIGH |
| **ERR-GAP-02** | File Upload Handling | `VariablesTab.tsx` file input reads files using `FileReader.readAsText()`. If a user uploads an invalid binary file, an exception could throw without user-friendly feedback. | MEDIUM |
| **ERR-GAP-03** | LocalStorage / State Persistence | If mock state persistence is added in the future without `try / catch`, corrupted storage data could prevent the app from booting. | MEDIUM |
| **ERR-GAP-04** | Input Boundary Validation | URL input fields in `DashboardView` and `IntakePipeline` lack proactive regex validation for valid Git/HTTPS URLs before triggering the intake pipeline. | LOW |

---

## 3. Planned Error Handling Enhancements (Recommended)

### 3.1 Tab-Level Granular Error Boundaries
Introduce a lightweight `TabErrorBoundary` or reuse `AppErrorBoundary` around the individual workspace tabs:
```tsx
<TabErrorBoundary tabName="Domains">
  <DomainsTab {...domainsProps} />
</TabErrorBoundary>
```
*Benefit*: If an error occurs in the DNS probe table, the user can still access `Overview`, `Variables`, `Logs`, and `History` without a full page crash.

### 3.2 Safe File Reader Utility with MIME Validation
In `VariablesTab.tsx`, wrap `.env` file imports in a robust validation helper:
```typescript
const handleSafeFileImport = (file: File) => {
  if (file.size > 500 * 1024) { // 500KB safeguard
    showToast('File too large (limit 500KB)');
    return;
  }
  const reader = new FileReader();
  reader.onerror = () => showToast('Failed to read .env file');
  reader.onload = (e) => { ... };
  reader.readAsText(file);
};
```

### 3.3 Strict Git URL Validator
Enhance the intake URL input with a lightweight validation hint:
- Validates formats: `https://github.com/org/repo` or `git@github.com:...`
- Displays an inline warning if protocol or repository name is malformed.
