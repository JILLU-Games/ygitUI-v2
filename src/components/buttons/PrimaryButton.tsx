import React from 'react';
import { Button, ButtonSize } from './Button';

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'cta' | 'micro' | 'compact';
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
}

/**
 * Standard YGIT Electric Blue Primary Action Button
 * Reference: BUTTON.md (Archetype 1)
 */
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  size = 'md',
  ...props
}) => {
  return <Button variant="primary" size={size as ButtonSize} {...props} />;
};

export default PrimaryButton;
