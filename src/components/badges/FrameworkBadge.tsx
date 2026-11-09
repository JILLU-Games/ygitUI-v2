import React from 'react';

export interface FrameworkBadgeProps {
  framework: string;
  variant?: 'neutral' | 'blue';
  className?: string;
}

/**
 * Standard YGIT Framework Monospace Badge
 * Reference: CARDS.md & SPACING.md
 */
export const FrameworkBadge: React.FC<FrameworkBadgeProps> = ({
  framework,
  variant = 'neutral',
  className = '',
}) => {
  const variantClass =
    variant === 'blue'
      ? 'bg-canvas-inset text-accent-primary border-border-subtle'
      : 'bg-canvas-inset text-fg-muted border-border-subtle';

  return (
    <span
      className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded-none border select-none ${variantClass} ${className}`}
    >
      {framework}
    </span>
  );
};

export default FrameworkBadge;
