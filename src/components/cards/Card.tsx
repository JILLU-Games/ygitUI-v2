import React from 'react';

export type CardVariant = 'default' | 'interactive' | 'selected' | 'telemetry' | 'subtle';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: CardVariant;
  className?: string;
}

/**
 * Universal YGIT Platform Card Container (Single Source of Truth)
 * Characteristics:
 * - 0rem border radius (rounded-none)
 * - Zero box-shadow (shadow-none)
 * - Theme-tokenized (bg-canvas-subtle, border-border-default, text-fg-default)
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variantStyles: Record<CardVariant, string> = {
    default: 'bg-canvas-subtle border border-border-default rounded-none shadow-none text-fg-default',
    interactive:
      'bg-canvas-subtle border border-border-default hover:border-brand-primary rounded-none shadow-none text-fg-default transition-colors duration-150 cursor-pointer',
    selected:
      'bg-canvas-selected border border-brand-primary rounded-none shadow-none text-fg-default',
    telemetry:
      'bg-canvas-inset border border-border-default rounded-none shadow-none font-mono text-[11px] text-fg-default',
    subtle:
      'bg-canvas-subtle/60 border border-border-default rounded-none shadow-none text-fg-default',
  };

  return (
    <div className={`${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Standard YGIT Card Header Strip
 */
export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
  ...props
}) => (
  <div
    className={`p-3 sm:p-3.5 pb-2.5 border-b border-border-default flex items-center justify-between gap-2 text-fg-default ${className}`}
    {...props}
  >
    {children}
  </div>
);

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Standard YGIT Card Body Container
 */
export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-3 sm:p-3.5 flex flex-col gap-2.5 text-fg-default ${className}`} {...props}>
    {children}
  </div>
);

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Standard YGIT Card Footer Strip
 */
export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
  ...props
}) => (
  <div
    className={`p-2.5 px-3 sm:px-3.5 border-t border-border-default bg-canvas-inset/50 flex items-center justify-between gap-2 text-xs text-fg-secondary ${className}`}
    {...props}
  >
    {children}
  </div>
);

export interface CardTelemetryEnclaveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Standard YGIT Nested Monospace Telemetry Enclave
 */
export const CardTelemetryEnclave: React.FC<CardTelemetryEnclaveProps> = ({
  children,
  className = '',
  ...props
}) => (
  <div
    className={`bg-canvas-inset border border-border-default rounded-none shadow-none p-2 sm:p-2.5 font-mono text-[11px] text-fg-default flex flex-col gap-1.5 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default Card;
