import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: ReactNode;
}

export const Card = ({ title, children, className = '', ...rest }: CardProps) => (
  <div
    className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
    {...rest}
  >
    {title ? <h3 className="mb-4 text-sm font-semibold text-slate-500">{title}</h3> : null}
    {children}
  </div>
);
