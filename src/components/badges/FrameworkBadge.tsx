import React from 'react';

export interface FrameworkBadgeProps {
  framework: string;
  className?: string;
}

/**
 * Standard YGIT Framework Monospace Badge
 * Reference: CARDS.md & SPACING.md
 */
export const FrameworkBadge: React.FC<FrameworkBadgeProps> = ({
  framework,
  className = '',
}) => {
  return (
    <span
      className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-[#090d13] text-[#7d8590] border border-[#21262d] select-none ${className}`}
    >
      {framework}
    </span>
  );
};

export default FrameworkBadge;
