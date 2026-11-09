import React from 'react';

export type DeploymentStatusType = 'live' | 'passed' | 'building' | 'failed' | 'pending' | 'verified';

export interface StatusBadgeProps {
  status: DeploymentStatusType;
  label?: string;
  showDot?: boolean;
  className?: string;
}

/**
 * Standard YGIT Status Pill Badge
 * Reference: CARDS.md & BUTTON.md
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  showDot = true,
  className = '',
}) => {
  const configs: Record<
    DeploymentStatusType,
    { label: string; bg: string; text: string; border: string; dot: string; pulse?: boolean }
  > = {
    live: {
      label: 'Live',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-500/30',
      dot: 'bg-emerald-500',
      pulse: true,
    },
    passed: {
      label: 'Passed',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-500/25',
      dot: 'bg-emerald-500',
    },
    verified: {
      label: 'Verified',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-500/30',
      dot: 'bg-emerald-500',
    },
    building: {
      label: 'Building',
      bg: 'bg-accent-primary/10',
      text: 'text-accent-primary',
      border: 'border-accent-primary/30',
      dot: 'bg-accent-primary',
      pulse: true,
    },
    pending: {
      label: 'Pending',
      bg: 'bg-amber-500/10',
      text: 'text-amber-700 dark:text-amber-400',
      border: 'border-amber-500/30',
      dot: 'bg-[#d29922]',
    },
    failed: {
      label: 'Failed',
      bg: 'bg-red-500/10',
      text: 'text-red-600 dark:text-red-400',
      border: 'border-red-500/30',
      dot: 'bg-red-500',
    },
  };

  const config = configs[status] || configs.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none shadow-none text-[10.5px] font-mono border ${config.bg} ${config.text} ${config.border} select-none ${className}`}
    >
      {showDot && (
        <span
          className={`w-1.5 h-1.5 rounded-none ${config.dot} ${
            config.pulse ? 'animate-pulse' : ''
          }`}
        />
      )}
      <span>{label || config.label}</span>
    </span>
  );
};

export default StatusBadge;
