import React from 'react';

export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  minWidth?: string;
}

/**
 * Universal YGIT Data Table Component Suite (Single Source of Truth)
 * Characteristics:
 * - 0rem border radius (rounded-none)
 * - Zero box-shadow (shadow-none)
 * - Theme-tokenized border and row styling
 * - Clean high-density layout
 */
export const Table: React.FC<TableProps> = ({
  children,
  className = '',
  minWidth = '100%',
  ...props
}) => (
  <div
    className={`w-full border border-border-default bg-canvas-inset overflow-x-auto text-xs rounded-none shadow-none ${className}`}
    {...props}
  >
    <table className="w-full text-left" style={{ minWidth }}>
      {children}
    </table>
  </div>
);

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <thead
    className={`border-b border-border-default bg-canvas-subtle text-[9.5px] font-mono uppercase text-fg-muted tracking-wider select-none ${className}`}
    {...props}
  >
    {children}
  </thead>
);

export const TableHeadCell: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <th className={`p-2.5 px-3 font-medium ${className}`} {...props}>
    {children}
  </th>
);

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <tbody className={`divide-y divide-border-default ${className}`} {...props}>
    {children}
  </tbody>
);

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  isHeader?: boolean;
}

export const TableRow: React.FC<TableRowProps> = ({
  children,
  className = '',
  isHeader = false,
  ...props
}) => (
  <tr
    className={`${
      isHeader
        ? 'border-b border-border-default bg-canvas-subtle'
        : 'hover:bg-surface-hover transition-colors group'
    } ${className}`}
    {...props}
  >
    {children}
  </tr>
);

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <td className={`p-2.5 px-3 align-middle text-fg-default ${className}`} {...props}>
    {children}
  </td>
);

export default Table;
