import React from 'react';

export type DeploymentStatusType = 'live' | 'passed' | 'building' | 'failed' | 'pending' | 'verified';

export interface StatusBadgeProps {
  status: DeploymentStatusType;
  showDot?: boolean;
  className?: string;
}

/**
 * Standard YGIT Status Pill Badge
 * Reference: CARDS.md & BUTTON.md
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showDot = true,
  className = '',
}) => {
  const configs: Record<
    DeploymentStatusType,
    { label: string; bg: string; text: string; border: string; dot: string; pulse?: boolean }
  > = {
    live: {
      label: 'Live',
      bg: 'bg-[#238636]/15',
      text: 'text-[#3fb950]',
      border: 'border-[#238636]/35',
      dot: 'bg-[#3fb950]',
      pulse: true,
    },
    passed: {
      label: 'Passed',
      bg: 'bg-[#238636]/10',
      text: 'text-[#3fb950]',
      border: 'border-[#238636]/25',
      dot: 'bg-[#3fb950]',
    },
    verified: {
      label: 'Verified',
      bg: 'bg-[#238636]/15',
      text: 'text-[#3fb950]',
      border: 'border-[#238636]/35',
      dot: 'bg-[#3fb950]',
    },
    building: {
      label: 'Building',
      bg: 'bg-[#1d6cf6]/15',
      text: 'text-[#58a6ff]',
      border: 'border-[#1d6cf6]/30',
      dot: 'bg-[#58a6ff]',
      pulse: true,
    },
    pending: {
      label: 'Pending',
      bg: 'bg-[#d29922]/15',
      text: 'text-[#d29922]',
      border: 'border-[#d29922]/30',
      dot: 'bg-[#d29922]',
    },
    failed: {
      label: 'Failed',
      bg: 'bg-[#f85149]/15',
      text: 'text-[#f85149]',
      border: 'border-[#f85149]/30',
      dot: 'bg-[#f85149]',
    },
  };

  const config = configs[status] || configs.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-mono border ${config.bg} ${config.text} ${config.border} select-none ${className}`}
    >
      {showDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${config.dot} ${
            config.pulse ? 'animate-pulse' : ''
          }`}
        />
      )}
      <span>{config.label}</span>
    </span>
  );
};

export default StatusBadge;
