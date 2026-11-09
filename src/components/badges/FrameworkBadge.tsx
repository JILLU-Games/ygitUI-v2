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
      ? 'bg-[#090d13] text-[#58a6ff] border-[#21262d]'
      : 'bg-[#090d13] text-[#7d8590] border-[#21262d]';

  return (
    <span
      className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded border select-none ${variantClass} ${className}`}
    >
      {framework}
    </span>
  );
};

export default FrameworkBadge;
