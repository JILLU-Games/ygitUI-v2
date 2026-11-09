import React from 'react';

export type MetricPillVariant =
  | 'neutral'
  | 'green'
  | 'blue'
  | 'purple'
  | 'amber'
  | 'red';

export interface MetricPillProps {
  children: React.ReactNode;
  variant?: MetricPillVariant;
  icon?: React.ReactNode;
  size?: 'xs' | 'sm';
  className?: string;
  title?: string;
}

/**
 * Standard YGIT Metric & Metadata Pill
 * Reference: CARDS.md & SPACING.md
 * Invariants: font-mono or font-normal precision, high-density padding (px-1.5 py-0.5)
 */
export const MetricPill: React.FC<MetricPillProps> = ({
  children,
  variant = 'neutral',
  icon,
  size = 'xs',
  className = '',
  title,
}) => {
  const variantStyles: Record<MetricPillVariant, string> = {
    neutral: 'bg-canvas-inset text-fg-muted border-border-subtle',
    green: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
    blue: 'bg-accent-primary/10 text-accent-primary border-accent-primary/25',
    purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25',
    amber: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25',
    red: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/25',
  };

  const sizeStyles = {
    xs: 'text-[9.5px] px-1.5 py-0.5',
    sm: 'text-[10.5px] px-2 py-0.5',
  }[size];

  return (
    <span
      title={title}
      className={`inline-flex items-center gap-1 font-mono font-normal rounded-none shadow-none border ${variantStyles[variant]} ${sizeStyles} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default MetricPill;
