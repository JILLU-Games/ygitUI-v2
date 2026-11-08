import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  icon?: React.ReactNode;
  subtitle?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  children: React.ReactNode;
  className?: string;
}

/**
 * Standard YGIT Platform Modal Dialog Shell
 * Reference: CARDS.md & AGENTS.md (Rule 01 Clean & Compact, Rule 02 JSX Documentation)
 * Features:
 * - Backdrop blur with dark slate overlay
 * - ESC key dismiss listener
 * - Click outside dismiss listener
 * - High-density header with title, subtitle, and close button
 */
export const ModalShell: React.FC<ModalShellProps> = ({
  isOpen,
  onClose,
  title,
  icon,
  subtitle,
  maxWidth = 'md',
  children,
  className = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const widthClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
  }[maxWidth];

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-[#05080d]/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 animate-in fade-in duration-100"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className={`w-full ${widthClasses} bg-[#161b22] border border-[#30363d] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ${className}`}
      >
        {/* Header Bar */}
        <div className="px-3.5 py-2.5 border-b border-[#21262d] flex items-center justify-between bg-[#090d13] shrink-0">
          <div className="flex items-center gap-2 overflow-hidden">
            {icon && (
              <div className="w-5 h-5 rounded bg-[#1d6cf6]/10 border border-[#1d6cf6]/20 text-[#58a6ff] flex items-center justify-center shrink-0">
                {icon}
              </div>
            )}
            <div className="flex flex-col truncate">
              <h3 className="text-xs font-semibold text-[#f0f6fc] truncate">{title}</h3>
              {subtitle && <span className="text-[10px] text-[#7d8590] truncate">{subtitle}</span>}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            title="Close dialog (Esc)"
            className="text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] p-1 rounded cursor-pointer transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalShell;
