import React from 'react';
import { RefreshCw } from 'lucide-react';

export interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

/**
 * Standard YGIT Dark Charcoal Secondary Action Button
 * Reference: BUTTON.md (Archetype 2)
 */
export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  icon,
  iconPosition = 'left',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  loadingText,
  disabled,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs rounded gap-1',
    md: 'px-3 py-1.5 text-xs rounded-md gap-1.5',
    lg: 'px-4 py-2 text-sm rounded-md gap-2',
  }[size];

  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-sans font-normal text-[#c9d1d9] hover:text-[#f0f6fc] bg-[#21262d] hover:bg-[#282e36] active:scale-95 border border-[#30363d] cursor-pointer transition-colors duration-150 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed shadow-xs ${sizeClasses} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <span>{children}</span>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </button>
  );
};

export default SecondaryButton;
