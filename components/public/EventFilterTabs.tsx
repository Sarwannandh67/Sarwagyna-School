'use client';

import Link from 'next/link';
import { cn, eventTypeLabels } from '@/lib/utils';
import type { EventType } from '@/types/database';

const filterOptions: { value: string; label: string }[] = [
  { value: '', label: 'All' },
  ...(['webinar', 'workshop', 'hackathon', 'ideathon', 'other'] as EventType[]).map((type) => ({
    value: type,
    label: eventTypeLabels[type] + (type === 'other' ? '' : 's'),
  })),
];

export interface EventFilterTabsProps {
  currentType?: string;
}

export function EventFilterTabs({ currentType = '' }: EventFilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filterOptions.map((option) => {
        const isActive = (currentType || '') === option.value;
        const href = option.value ? `/events?type=${option.value}` : '/events';

        return (
          <Link
            key={option.value || 'all'}
            href={href}
            className={cn(
              'rounded-pill px-4 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-ink text-canvas'
                : 'border border-ink/20 bg-canvas text-ink hover:bg-canvas-soft'
            )}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
