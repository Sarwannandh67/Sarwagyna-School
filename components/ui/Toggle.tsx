'use client';

import { cn } from '@/lib/utils';

export interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  disabled?: boolean;
  className?: string;
}

export function Toggle({ label, checked, onChange, id, disabled, className }: ToggleProps) {
  const toggleId = id ?? `toggle-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={cn('inline-flex items-center gap-3', className)}>
      <button
        id={toggleId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-pill transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-60',
          checked ? 'bg-primary' : 'bg-mute/60'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-canvas shadow-sm transition-transform',
            checked && 'translate-x-5'
          )}
        />
      </button>
      <label htmlFor={toggleId} className="text-sm font-medium text-ink">
        {label}
      </label>
    </div>
  );
}
