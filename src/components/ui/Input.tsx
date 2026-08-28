import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...rest }, ref) => {
    const inputId = id ?? rest.name ?? label.toLowerCase();
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          className={`rounded-md border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-500 ${
            error ? 'border-red-400' : 'border-slate-300'
          } ${className}`}
          {...rest}
        />
        {error ? (
          <p role="alert" className="text-xs text-red-600" data-testid={`${inputId}-error`}>
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
