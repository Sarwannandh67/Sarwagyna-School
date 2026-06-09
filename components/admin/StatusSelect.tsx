'use client';

import { useTransition } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

interface StatusSelectProps<T extends string> {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => Promise<{ error?: string; success?: boolean }>;
  className?: string;
}

export function StatusSelect<T extends string>({
  value,
  options,
  onChange,
  className,
}: StatusSelectProps<T>) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={value}
      disabled={isPending}
      onChange={(e) => {
        const newValue = e.target.value as T;
        startTransition(async () => {
          const result = await onChange(newValue);
          if (result.error) showToast(result.error, 'error');
        });
      }}
      className={cn(
        'rounded-md border border-mute/50 bg-canvas px-2 py-1 text-xs font-medium text-ink',
        'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20',
        isPending && 'opacity-50',
        className
      )}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
