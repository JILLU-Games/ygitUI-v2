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
      className={`text-[8.5px] font-mono font-medium lowercase px-1.5 py-0.2 rounded-full bg-[#1d6cf6]/15 text-[#58a6ff] border border-[#1d6cf6]/30 leading-none select-none ${className}`}
    >
      beta
    </span>
  );
};

export default BetaPill;
