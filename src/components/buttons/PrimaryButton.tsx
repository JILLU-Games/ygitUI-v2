import React from 'react';
import { RefreshCw } from 'lucide-react';

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'cta';
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

/**
 * Standard YGIT Electric Blue Primary Action Button
 * Reference: BUTTON.md (Archetype 1)
 */
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
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
    sm: 'px-2.5 py-1 text-xs rounded gap-1',
    md: 'px-3 py-1.5 text-xs rounded-md gap-1.5',
    lg: 'px-4 py-2 text-xs font-bold rounded-md gap-2',
    cta: 'py-2.5 px-4 text-xs font-bold rounded-md gap-2 active:scale-[0.99]',
  }[size];

  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-sans font-medium text-white bg-[#1d6cf6] hover:bg-[#2f7af8] active:scale-95 shadow-sm cursor-pointer transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${
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

export default PrimaryButton;
