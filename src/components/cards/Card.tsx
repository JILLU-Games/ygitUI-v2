import React from 'react';

export type CardVariant = 'default' | 'interactive' | 'selected' | 'telemetry' | 'subtle';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: CardVariant;
  className?: string;
}

/**
 * Standard YGIT Platform Card Container
 * Reference: CARDS.md (All 14 Forensic Archetypes)
 * Features:
 * - High-density multi-layered surface contrast (bg-[#161b22] subtle outer, border-[#21262d])
 * - Normalized corner radius: rounded-lg (8px) across all card containers
 * - Interactive hover elevation with electric blue highlight (hover:border-[#1d6cf6]/60)
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variantStyles: Record<CardVariant, string> = {
    default: 'bg-[#161b22] border border-[#21262d] rounded-lg shadow-sm',
    interactive:
      'bg-[#161b22] border border-[#21262d] hover:border-[#1d6cf6]/60 rounded-lg transition-all duration-150 hover:shadow-lg hover:shadow-black/30 cursor-pointer',
    selected:
      'bg-[#0e1828] border border-[#1d6cf6] rounded-lg shadow-[0_0_0_1px_#1d6cf6]',
    telemetry:
      'bg-[#090d13] border border-[#21262d] rounded-md font-mono text-[11px]',
    subtle:
      'bg-[#090d13]/60 border border-[#21262d] rounded-lg',
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
 * Distinct structural compartment with bottom border divider
 */
export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
  ...props
}) => (
  <div
    className={`p-3 sm:p-3.5 pb-2.5 border-b border-[#21262d] flex items-center justify-between gap-2 ${className}`}
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
  <div className={`p-3 sm:p-3.5 flex flex-col gap-2.5 ${className}`} {...props}>
    {children}
  </div>
);

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Standard YGIT Card Footer Strip
 * Subtle darker background with top border divider
 */
export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
  ...props
}) => (
  <div
    className={`p-2.5 px-3 sm:px-3.5 border-t border-[#21262d] bg-[#090d13]/50 flex items-center justify-between gap-2 text-xs ${className}`}
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
 * Reference: CARDS.md (Rule 2: Monospace Inset Enclave)
 * Specifications (repo paths, commits, edge domains, digests) are always
 * nested inside this bg-[#090d13] border border-[#21262d] container.
 */
export const CardTelemetryEnclave: React.FC<CardTelemetryEnclaveProps> = ({
  children,
  className = '',
  ...props
}) => (
  <div
    className={`bg-[#090d13] border border-[#21262d] rounded-md p-2 sm:p-2.5 font-mono text-[11px] flex flex-col gap-1.5 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default Card;
