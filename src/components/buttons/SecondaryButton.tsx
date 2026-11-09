import React from 'react';
import { Button, ButtonSize } from './Button';

export interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'micro' | 'compact';
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
}

/**
 * Standard YGIT Neutral Slate Secondary Action Button
 * Reference: BUTTON.md (Archetype 2)
 */
export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  size = 'md',
  ...props
}) => {
  return <Button variant="secondary" size={size as ButtonSize} {...props} />;
};

export default SecondaryButton;
