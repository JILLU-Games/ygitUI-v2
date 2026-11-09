import React from 'react';

export interface BetaPillProps {
  className?: string;
}

/**
 * Official YGIT Micro Monospace Beta Badge
 * Standard: 8.5px font-mono, rgba(29,108,246,0.15) background, 1px border.
 */
export const BetaPill: React.FC<BetaPillProps> = ({ className = '' }) => {
  return (
    <span
      className={`text-[8.5px] font-mono font-normal lowercase px-1.5 py-0.5 rounded-none shadow-none bg-brand-primary/10 text-brand-primary border border-brand-primary/30 leading-none select-none ${className}`}
    >
      beta
    </span>
  );
};

export default BetaPill;
