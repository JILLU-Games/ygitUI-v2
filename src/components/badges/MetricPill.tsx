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
    neutral: 'bg-[#090d13] text-[#8b949e] border-[#21262d]',
    green: 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/30',
    blue: 'bg-[#1d6cf6]/10 text-[#58a6ff] border-[#1d6cf6]/30',
    purple: 'bg-[#8957e5]/15 text-[#a371f7] border-[#8957e5]/30',
    amber: 'bg-[#d29922]/10 text-[#d29922] border-[#d29922]/30',
    red: 'bg-[#da3633]/15 text-[#f85149] border-[#da3633]/30',
  };

  const sizeStyles = {
    xs: 'text-[9.5px] px-1.5 py-0.5',
    sm: 'text-[10.5px] px-2 py-0.5',
  }[size];

  return (
    <span
      title={title}
      className={`inline-flex items-center gap-1 font-mono font-normal rounded border ${variantStyles[variant]} ${sizeStyles} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default MetricPill;
