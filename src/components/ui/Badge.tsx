import React from 'react';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'neutral';
export type BadgeSize = 'xs' | 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  mono?: boolean;
  dot?: boolean;
  className?: string;
}

/**
 * Universal YGIT Badge / Pill Component (Single Source of Truth)
 * Characteristics:
 * - 0rem border radius (rounded-none)
 * - Zero box-shadow (shadow-none)
 * - Clean semantic colors, smooth non-bold text
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  mono = true,
  dot = false,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    xs: 'px-1 py-0.2 text-[9px]',
    sm: 'px-1.5 py-0.5 text-[10px]',
    md: 'px-2 py-0.5 text-xs',
  }[size];

  const variantClasses = {
    default: 'bg-canvas-subtle text-fg-muted border border-border-default',
    neutral: 'bg-canvas-subtle text-fg-secondary border border-border-default',
    primary: 'bg-brand-primary/10 text-brand-primary border border-brand-primary/30',
    success: 'bg-accent-green/10 text-accent-green-text border border-accent-green/30',
    warning: 'bg-accent-amber/10 text-accent-amber border border-accent-amber/30',
    danger: 'bg-accent-red-critical/10 text-accent-red-text border border-accent-red-critical/30',
    purple: 'bg-accent-purple/10 text-accent-purple border border-accent-purple/30',
  }[variant];

  const dotClasses = {
    default: 'bg-fg-muted',
    neutral: 'bg-fg-secondary',
    primary: 'bg-brand-primary',
    success: 'bg-accent-green-text',
    warning: 'bg-accent-amber',
    danger: 'bg-accent-red-text',
    purple: 'bg-accent-purple',
  }[variant];

  const fontClass = mono ? 'font-mono' : 'font-sans';

  return (
    <span
      className={`inline-flex items-center gap-1 select-none font-normal rounded-none shadow-none ${fontClass} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-none shrink-0 ${dotClasses}`} />}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
