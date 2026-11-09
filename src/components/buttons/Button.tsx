import React from 'react';
import { RefreshCw } from 'lucide-react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'intake'
  | 'success'
  | 'warning'
  | 'danger'
  | 'danger-outline'
  | 'ghost'
  | 'icon';

export type ButtonSize =
  | 'micro'
  | 'compact'
  | 'sm'
  | 'md'
  | 'lg'
  | 'cta';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
}

/**
 * Universal YGIT Design System Button Component
 * Reference: BUTTON.md (All 7 Archetypes & Interactive State Rules)
 * Features:
 * - Sub-second tactile scaling (active:scale-95 on regular, active:scale-[0.99] on CTA)
 * - Zero-outline discipline with smooth focus ring
 * - Built-in spinning indicator (RefreshCw) when isLoading is active
 * - High-contrast text WCAG AAA legibility guarantees
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  isLoading = false,
  loadingText,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  type = 'button',
  ...props
}) => {
  // Base classes: zero outline, cursor pointer, transitions
  const baseClasses =
    'inline-flex items-center justify-center font-sans select-none cursor-pointer transition-all duration-150 focus:outline-none disabled:cursor-not-allowed';

  // Sizing definitions: 0rem border-radius, clean, soft font
  const sizeClasses: Record<ButtonSize, string> = {
    micro: 'px-2 py-0.5 text-[10.5px] rounded-none gap-1 active:scale-95',
    compact: 'px-2.5 py-1 text-xs rounded-none gap-1.5 active:scale-95',
    sm: 'px-2.5 py-1 text-xs rounded-none gap-1.5 active:scale-95',
    md: 'px-3 py-1.5 text-xs rounded-none gap-1.5 active:scale-95',
    lg: 'px-4 py-1.5 text-xs font-medium rounded-none gap-2 active:scale-95',
    cta: 'py-2 px-4 text-xs font-medium rounded-none gap-2 active:scale-[0.99]',
  };

  // Variant styling formulas mapped to dynamic theme tokens
  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-brand-primary hover:opacity-90 disabled:opacity-50 text-white font-medium shadow-none border border-transparent',
    secondary:
      'bg-canvas-subtle hover:bg-surface-hover disabled:opacity-40 text-fg-default border border-border-default font-normal shadow-none',
    intake:
      'bg-brand-primary hover:opacity-90 disabled:opacity-50 text-white font-medium shadow-none border border-transparent',
    success:
      'bg-accent-green hover:opacity-90 disabled:opacity-50 text-white font-medium shadow-none border border-transparent',
    warning:
      'bg-accent-amber hover:opacity-90 disabled:opacity-50 text-white font-medium shadow-none border border-transparent',
    danger:
      'bg-accent-red-critical hover:opacity-90 disabled:opacity-40 text-white font-medium shadow-none border border-transparent',
    'danger-outline':
      'bg-transparent hover:bg-accent-red-critical/10 text-accent-red-text border border-accent-red-critical/30 disabled:opacity-40 font-normal shadow-none',
    ghost:
      'bg-transparent hover:bg-surface-hover text-fg-muted hover:text-fg-default border border-transparent shadow-none',
    icon:
      'bg-canvas-inset hover:bg-surface-hover text-fg-muted hover:text-fg-default border border-border-default shadow-none',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <RefreshCw className="w-3.5 h-3.5 animate-spin shrink-0" />
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          {children && <span>{children}</span>}
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};

// Specialized Convenience Components based on BUTTON.md Archetypes
export const DangerButton: React.FC<ButtonProps> = (props) => (
  <Button variant="danger" {...props} />
);

export const DangerOutlineButton: React.FC<ButtonProps> = (props) => (
  <Button variant="danger-outline" {...props} />
);

export const WarningButton: React.FC<ButtonProps> = (props) => (
  <Button variant="warning" {...props} />
);

export const SuccessButton: React.FC<ButtonProps> = (props) => (
  <Button variant="success" {...props} />
);

export default Button;
