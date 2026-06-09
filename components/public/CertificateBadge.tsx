import { cn } from '@/lib/utils';
import type { CertificateType } from '@/types/database';

const typeLabels: Record<CertificateType, string> = {
  participation: 'Participation',
  completion: 'Completion',
  achievement: 'Achievement',
  speaker: 'Speaker',
  volunteer: 'Volunteer',
};

export interface CertificateBadgeProps {
  type: CertificateType;
  className?: string;
}

export function CertificateBadge({ type, className }: CertificateBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-pill bg-green-100 px-3 py-1 text-sm font-medium text-green-800',
        className
      )}
    >
      {typeLabels[type]} Certificate
    </span>
  );
}
