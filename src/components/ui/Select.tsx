import React, { forwardRef } from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  selectSize?: 'sm' | 'md';
  fullWidth?: boolean;
}

/**
 * Universal YGIT Form Select Component (Single Source of Truth)
 * Characteristics:
 * - 0rem border radius (rounded-none)
 * - Zero box-shadow (shadow-none)
 * - Theme-tokenized (bg-canvas-inset, border-border-default, text-fg-default)
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  error,
  selectSize = 'sm',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}, ref) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-xs',
  }[selectSize];

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={`relative ${widthClass} inline-flex flex-col gap-0.5`}>
      <select
        ref={ref}
        disabled={disabled}
        className={`w-full bg-canvas-inset border border-border-default text-fg-default ${sizeClasses} rounded-none shadow-none focus:border-brand-primary focus:outline-none cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          error ? 'border-accent-red-critical' : ''
        } ${className}`}
        {...props}
      >
        {children}
      </select>

      {error && (
        <span className="text-[10.5px] font-mono text-accent-red-critical leading-tight">
          {error}
        </span>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
