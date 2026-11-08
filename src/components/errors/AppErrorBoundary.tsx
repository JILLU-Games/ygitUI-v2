import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export interface AppErrorBoundaryProps {
  children: ReactNode;
}

export interface AppErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Global Application Error Boundary
 * Reference: CARDS.md & AGENTS.md (Rule 01 Clean & Compact, Rule 02 JSX Architecture)
 * Invariants: Catches render exceptions, displays dark-themed diagnostic box,
 * and provides instant 1-click workspace reload recovery.
 */
export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  public state: AppErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('YGIT Application Uncaught Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0d1117] text-[#f0f6fc] flex items-center justify-center p-4 selection:bg-[#1d6cf6] selection:text-white">
          <div className="max-w-md w-full bg-[#161b22] border border-[#f85149]/30 rounded-lg p-5 text-center shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-[#f85149]/15 border border-[#f85149]/30 flex items-center justify-center mx-auto mb-3 text-[#f85149]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-semibold text-[#f0f6fc] mb-1">Application Workspace Error</h2>
            <p className="text-xs text-[#8b949e] mb-3 leading-relaxed">
              An unexpected render error occurred in this view. Your project configuration and credentials remain safe.
            </p>
            <div className="bg-[#090d13] border border-[#21262d] rounded p-2.5 text-left font-mono text-[10.5px] text-[#f85149] mb-4 max-h-24 overflow-y-auto">
              {this.state.error?.message || 'Unknown runtime exception'}
            </div>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="bg-[#1d6cf6] hover:bg-[#2f7af8] text-white text-xs font-medium px-4 py-1.5 rounded flex items-center justify-center gap-1.5 mx-auto cursor-pointer transition-colors shadow-sm"
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

export default AppErrorBoundary;
