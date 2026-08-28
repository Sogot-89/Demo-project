interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  description?: string;
  'data-testid'?: string;
}

export const Toggle = ({
  checked,
  onChange,
  label,
  description,
  'data-testid': testId,
}: ToggleProps) => (
  <label className="flex cursor-pointer items-start justify-between gap-4">
    <span className="flex flex-col">
      <span className="text-sm font-medium text-slate-800">{label}</span>
      {description ? <span className="text-xs text-slate-400">{description}</span> : null}
    </span>
    <span className="relative inline-flex shrink-0 pt-0.5">
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={onChange}
        data-testid={testId}
        className="peer sr-only"
      />
      <span className="h-6 w-11 rounded-full bg-slate-300 transition-colors peer-checked:bg-indigo-600" />
      <span className="absolute left-0.5 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
    </span>
  </label>
);
