import Link from 'next/link';
import { cn, isExternalHref, isHashHref, isInternalHref, isNavigableHref } from '@/lib/utils';

type ButtonVariant = 'primary' | 'dark' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-on-primary hover:bg-primary/90 focus-visible:ring-primary/40 disabled:bg-primary/50',
  dark: 'bg-ink text-canvas hover:bg-ink-soft focus-visible:ring-ink/30 disabled:bg-ink/50',
  outline:
    'border border-ink bg-transparent text-ink hover:bg-ink/5 focus-visible:ring-ink/20 disabled:opacity-50',
  ghost:
    'bg-transparent text-ink hover:bg-canvas-soft focus-visible:ring-ink/20 disabled:opacity-50',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  loading = false,
  children,
  className,
  disabled,
  type = 'button',
  onClick,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-[12px] font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
    'disabled:cursor-not-allowed',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const content = (
    <>
      {loading && <Spinner />}
      {children}
    </>
  );

  if (href && isNavigableHref(href) && !isDisabled) {
    if (isInternalHref(href)) {
      return (
        <Link href={href} className={classes} onClick={onClick}>
          {content}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(isExternalHref(href) && !isHashHref(href)
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={isDisabled} onClick={onClick}>
      {content}
    </button>
  );
}
