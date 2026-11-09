import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  title?: string;
  size?: 'xs' | 'sm' | 'md';
  variant?: 'default' | 'ghost' | 'outline' | 'danger';
  isActive?: boolean;
}

/**
 * Standard YGIT Icon Button
 * Reference: BUTTON.md (Archetype 7: Icon-Only Controls & Micro Actions)
 * Features:
 * - High-contrast hover and active states
 * - Tactile active:scale-95 scaling
 * - Supports active toggle state (e.g., terminal log controls)
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  children,
  title,
  size = 'md',
  variant = 'default',
  isActive = false,
  className = '',
  disabled,
  type = 'button',
  ...props
}) => {
  const sizeClasses = {
    xs: 'p-0.5 text-[11px] rounded-none',
    sm: 'p-1 text-xs rounded-none',
    md: 'p-1.5 text-xs rounded-none',
  }[size];

  let variantClass = '';
  if (isActive) {
    variantClass = 'bg-accent-primary/15 text-accent-primary border border-accent-primary/30 shadow-none';
  } else if (variant === 'danger') {
    variantClass = 'text-fg-muted hover:text-red-500 hover:bg-red-500/10 rounded-none';
  } else if (variant === 'outline') {
    variantClass = 'bg-canvas-subtle border border-border-default text-fg-muted hover:text-fg-default hover:bg-surface-hover shadow-none';
  } else if (variant === 'ghost') {
    variantClass = 'bg-transparent text-fg-muted hover:text-fg-default hover:bg-surface-hover shadow-none';
  } else {
    // default
    variantClass = 'text-fg-muted hover:text-fg-default hover:bg-surface-hover rounded-none shadow-none';
  }

  return (
    <button
      type={type}
      title={title}
      disabled={disabled}
      className={`inline-flex items-center justify-center cursor-pointer transition-colors active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed select-none ${sizeClasses} ${variantClass} ${className}`}
      {...props}
    >
      {icon || children}
    </button>
  );
};

export default IconButton;
