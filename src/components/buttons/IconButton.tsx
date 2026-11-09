import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  title?: string;
  size?: 'xs' | 'sm' | 'md';
  variant?: 'default' | 'ghost' | 'outline' | 'danger';
  isActive?: boolean;
}

/**
 * Standard YGIT Icon Button
 * Reference: BUTTON.md (Archetype 7: Icon-Only Controls & Micro Actions)
 * Features:
 * - High-contrast hover and active states
 * - Tactile active:scale-95 scaling
 * - Supports active toggle state (e.g., terminal log controls)
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  children,
  title,
  size = 'md',
  variant = 'default',
  isActive = false,
  className = '',
  disabled,
  type = 'button',
  ...props
}) => {
  const sizeClasses = {
    xs: 'p-0.5 text-[11px] rounded',
    sm: 'p-1 text-xs rounded',
    md: 'p-1.5 text-xs rounded',
  }[size];

  let variantClass = '';
  if (isActive) {
    variantClass = 'bg-[#21262d] text-[#58a6ff] border border-[#30363d] shadow-xs';
  } else if (variant === 'danger') {
    variantClass = 'text-[#8b949e] hover:text-[#f85149] hover:bg-[#da3633]/15 rounded';
  } else if (variant === 'outline') {
    variantClass = 'bg-[#090d13] border border-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]';
  } else if (variant === 'ghost') {
    variantClass = 'bg-transparent text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]';
  } else {
    // default
    variantClass = 'text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]';
  }

  return (
    <button
      type={type}
      title={title}
      disabled={disabled}
      className={`inline-flex items-center justify-center cursor-pointer transition-colors active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed select-none ${sizeClasses} ${variantClass} ${className}`}
      {...props}
    >
      {icon || children}
    </button>
  );
};

export default IconButton;
