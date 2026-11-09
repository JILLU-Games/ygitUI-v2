import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  error?: string;
  mono?: boolean;
  isMono?: boolean;
  inputSize?: 'sm' | 'md';
  fullWidth?: boolean;
}

/**
 * Universal YGIT Form Input Component (Single Source of Truth)
 * Characteristics:
 * - 0rem border radius (rounded-none)
 * - Zero box-shadow (shadow-none)
 * - Theme-tokenized (bg-canvas-inset, border-border-default, text-fg-default)
 * - Smooth Segoe UI font or JetBrains Mono precision
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  icon,
  iconPosition = 'left',
  prefixIcon,
  suffixIcon,
  error,
  mono = false,
  isMono = false,
  inputSize = 'sm',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}, ref) => {
  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-xs',
  }[inputSize];

  const effectiveMono = mono || isMono;
  const fontClass = effectiveMono ? 'font-mono' : 'font-sans';
  const widthClass = fullWidth ? 'w-full' : '';

  const leftIcon = prefixIcon || (iconPosition === 'left' ? icon : null);
  const rightIcon = suffixIcon || (iconPosition === 'right' ? icon : null);

  const paddingLeft = leftIcon ? 'pl-8' : '';
  const paddingRight = rightIcon ? 'pr-8' : '';

  return (
    <div className={`relative ${widthClass} inline-flex flex-col gap-0.5`}>
      <div className="relative w-full flex items-center">
        {leftIcon && (
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none flex items-center justify-center shrink-0">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          disabled={disabled}
          className={`w-full bg-canvas-inset border border-border-default text-fg-default placeholder:text-fg-placeholder ${fontClass} ${sizeClasses} ${paddingLeft} ${paddingRight} rounded-none shadow-none focus:border-brand-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            error ? 'border-accent-red-critical' : ''
          } ${className}`}
          {...props}
        />

        {rightIcon && (
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none flex items-center justify-center shrink-0">
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <span className="text-[10.5px] font-mono text-accent-red-critical leading-tight">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
