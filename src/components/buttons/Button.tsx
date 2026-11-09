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

  // Sizing definitions mapped to BUTTON.md Section 2
  const sizeClasses: Record<ButtonSize, string> = {
    micro: 'px-2 py-0.5 text-[10.5px] rounded gap-1 active:scale-95',
    compact: 'px-2.5 py-1 text-xs rounded gap-1.5 active:scale-95',
    sm: 'px-2.5 py-1 text-xs rounded gap-1.5 active:scale-95',
    md: 'px-3 py-1.5 text-xs rounded-md gap-1.5 active:scale-95',
    lg: 'px-4 py-2 text-xs font-bold rounded-md gap-2 active:scale-95',
    cta: 'py-2.5 px-4 text-xs font-bold rounded-md gap-2 active:scale-[0.99]',
  };

  // Variant styling formulas mapped to BUTTON.md Section 3
  const variantClasses: Record<ButtonVariant, string> = {
    // Archetype 1: Primary Action (YGIT Electric Blue)
    primary:
      'bg-[#1d6cf6] hover:bg-[#2f7af8] disabled:opacity-50 text-white font-medium shadow-sm border border-transparent',

    // Archetype 2: Secondary Neutral (Dark Slate)
    secondary:
      'bg-[#21262d] hover:bg-[#282e36] disabled:opacity-40 text-[#c9d1d9] hover:text-[#f0f6fc] border border-[#30363d] font-normal shadow-xs',

    // Archetype 3: Intake Pipeline Action (Mantis Blue)
    intake:
      'bg-[#1971c2] hover:bg-[#1668b0] disabled:opacity-50 text-white font-medium shadow-sm border border-transparent',

    // Archetype 4: Success & Verified Action (Production Green)
    success:
      'bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 text-white font-medium shadow-sm border border-transparent',

    // Archetype 5: Warning & Telemetry (Amber & Gold)
    warning:
      'bg-[#e3b341] hover:bg-[#f2cc60] disabled:opacity-50 text-[#090d13] font-medium shadow-sm border border-transparent',

    // Archetype 6: Destructive & Danger (Crimson Solid)
    danger:
      'bg-[#da3633] hover:bg-[#f85149] disabled:opacity-40 text-white font-medium shadow-sm border border-transparent',

    // Archetype 6-Outline: Destructive Micro Action (Crimson Ghost/Outline)
    'danger-outline':
      'bg-transparent hover:bg-[#da3633]/15 text-[#f85149] border border-[#da3633]/30 disabled:opacity-40 font-normal',

    // Archetype 8: Ghost Navigation / Action
    ghost:
      'bg-transparent hover:bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] border border-transparent',

    // Archetype 7: Inset Icon Enclave Action
    icon:
      'bg-[#090d13] hover:bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] border border-[#21262d]',
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
