import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  charCount?: boolean;
}

export function Textarea({
  label,
  error,
  charCount,
  id,
  maxLength,
  value,
  defaultValue,
  className,
  ...props
}: TextareaProps) {
  const textareaId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const currentLength =
    typeof value === 'string'
      ? value.length
      : typeof defaultValue === 'string'
        ? defaultValue.length
        : 0;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        className={cn(
          'min-h-[120px] w-full resize-y rounded-[12px] border bg-canvas px-4 py-2.5 text-sm text-ink',
          'placeholder:text-body-mid transition-colors',
          'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
          'disabled:cursor-not-allowed disabled:bg-canvas-soft disabled:opacity-60',
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-mute/50',
          className
        )}
        {...props}
      />
      <div className="mt-1.5 flex items-center justify-between gap-2">
        {error ? (
          <p id={`${textareaId}-error`} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : (
          <span />
        )}
        {charCount && maxLength && (
          <p className="text-xs text-body-mid">
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
