import { cn } from '@/lib/utils';

export interface SarwachakraLogoProps {
  size?: number;
  color?: 'ink' | 'white' | string;
  className?: string;
}

const colorMap = {
  ink: '#201515',
  white: '#fffefb',
};

export function SarwachakraLogo({ size = 32, color = 'ink', className }: SarwachakraLogoProps) {
  const fill = color in colorMap ? colorMap[color as keyof typeof colorMap] : color;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" stroke={fill} strokeWidth="2" />
      <circle cx="24" cy="24" r="4" fill={fill} />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x1 = 24 + Math.cos(angle) * 6;
        const y1 = 24 + Math.sin(angle) * 6;
        const x2 = 24 + Math.cos(angle) * 20;
        const y2 = 24 + Math.sin(angle) * 20;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = ((i * 45 + 22.5) * Math.PI) / 180;
        const x1 = 24 + Math.cos(angle) * 10;
        const y1 = 24 + Math.sin(angle) * 10;
        const x2 = 24 + Math.cos(angle) * 18;
        const y2 = 24 + Math.sin(angle) * 18;
        return (
          <line
            key={`inner-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={fill}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
          />
        );
      })}
    </svg>
  );
}
