# YGIT Platform UI — Error Handling Architecture & Production Hardening

> **Document**: 04_ERROR_HANDLING.md  
> **Status**: Comprehensive Inventory & Implementation Blueprint

---

## 1. Current Error Handling Inventory (What Exists Today)

| Error Scope | Existing Mechanism in Prototype | Behavior & Fallback |
| :--- | :--- | :--- |
| **Brand Logo Asset Failure** | `onError` handler on `<img>` in `src/App.tsx:2197` | Instantly swaps source to inline SVG lightning polygon with zero visual shift. |
| **Collapsed Logo Asset Failure** | `onError` handler in `src/App.tsx:2235` | Swaps to 16px SVG data URI without breaking button dimensions. |
| **Template Thumbnail Failure** | `onError` handler on template images | Fallbacks to dynamic SVG canvas representation based on `thumbnailType`. |
| **Git URL Protocol Validation** | Regex check in Intake Pipeline | Alerts user if URL does not start with `https://github.com/` or `git@github.com:`. |
| **Monorepo Root Directory Blocker** | Root detection validation rule in Scan Stage 2 | Flags non-existent root path and alerts before initiating build. |
| **Cloudflare Pages Compatibility** | Framework registry validator in Scan Stage 9 | Validates whether output directory matches Pages static standard. |

---

## 2. Production Error Handling Gaps & Roadmap Additions

To elevate the UI to enterprise-grade production readiness, the following error handling patterns must be implemented during refactoring:

### A. React Component Error Boundary (`ErrorBoundary.tsx`)
- **Problem**: An uncaught rendering error in any sub-tab currently crashes the entire single-page application.
- **Solution**: Wrap the main canvas and tabs in a specialized `ErrorBoundary` that renders a compact, high-density recovery panel:
  - Error description & technical callstack (toggleable in `font-mono`).
  - Action buttons: "Reset View", "Copy Error Report", "Reload Dashboard".

### B. Standardized Empty States (`EmptyState.tsx`)
- **Problem**: When a filter returns 0 results (e.g., searching for a non-existent project or category), views must display helpful guidance rather than a blank canvas.
- **Target Empty States**:
  1. **Projects View**: "No projects match your filter" with a "Clear Filters" button.
  2. **Deployments View**: "No recent deployments found for this branch".
  3. **Variables Tab**: "No environment variables configured yet" with an "Add First Variable" CTA.
  4. **Domains Tab**: "No custom domains connected" with DNS configuration guide.

### C. Network & API Request Failure States (`NetworkErrorCard.tsx`)
- **Problem**: When `/api/v1/*` backend calls fail due to network drops, timeouts, or 500 errors, the UI needs inline retry affordances.
- **Requirements**:
  - Compact banner with warning red border (`border-[#f85149]/40`).
  - Monospace error code (`ERR_EDGE_TIMEOUT_504`, `ERR_UNAUTHORIZED_401`).
  - Automatic exponential backoff retry with manual "Retry Now" button.

### D. DNS Probe & Verification Failures (Domains Tab)
- **Problem**: When adding a custom domain (`app.example.com`), DNS propagation may take up to 48 hours or CNAME records may be misconfigured.
- **Requirements**:
  - Live probe status badges: `Checking`, `Propagated`, `Misconfigured`.
  - Inline diagnostic details showing:
    - Expected CNAME: `ygit-edge.pages.dev`
    - Detected Record: `None` / `Incorrect IP`
  - "Verify Again" manual trigger with 15-second debounce.

### E. Global Toast & Feedback Notification System (`ToastProvider.tsx`)
- **Problem**: Currently actions like "Copy Commit SHA", "Save Environment Variable", or "Trigger Deploy" use silent console logs.
- **Solution**: High-density toast notifications positioned at bottom-right (`fixed bottom-4 right-4 z-50`):
  - Success Toast (Green border `#3fb950/40`, Checkmark icon).
  - Error Toast (Red border `#f85149/40`, AlertCircle icon).
  - Info / Copy Toast (Cyan border `#58a6ff/40`, Copy icon, auto-dismiss 3s).
