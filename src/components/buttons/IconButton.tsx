import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md';
}

/**
 * Standard YGIT Icon Button
 * Reference: BUTTON.md
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  title,
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClasses = size === 'sm' ? 'p-1' : 'p-1.5';

  return (
    <button
      type="button"
      title={title}
      className={`${sizeClasses} text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] rounded cursor-pointer transition-colors flex items-center justify-center ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;
