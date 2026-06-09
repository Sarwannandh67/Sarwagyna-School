import { BRAND, SITE_NAME } from '@/lib/branding';
import { cn } from '@/lib/utils';

export type BrandLogoVariant = 'symbol' | 'full' | 'full-light';

const sources: Record<BrandLogoVariant, string> = {
  symbol: BRAND.symbol,
  full: BRAND.logoMain,
  'full-light': BRAND.logoTransparent,
};

export interface BrandLogoProps {
  variant?: BrandLogoVariant;
  /** Height in pixels — width scales automatically */
  height?: number;
  className?: string;
  priority?: boolean;
}

export function BrandLogo({
  variant = 'symbol',
  height = 32,
  className,
  priority: _priority = false,
}: BrandLogoProps) {
  const src = sources[variant];
  const isSymbol = variant === 'symbol';

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={SITE_NAME}
      className={cn('h-auto w-auto object-contain', className)}
      style={{ height, width: 'auto', maxWidth: isSymbol ? height : undefined }}
    />
  );
}
