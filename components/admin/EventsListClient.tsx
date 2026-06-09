'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { DataTable } from '@/components/admin/DataTable';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { deleteEvent } from '@/lib/actions/events';
import {
  cn,
  eventTypeColors,
  eventStatusColors,
  eventTypeLabels,
  eventStatusLabels,
  formatDate,
} from '@/lib/utils';
import type { Event, EventType } from '@/types/database';

const filterTabs: { value: EventType | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'webinar', label: 'Webinars' },
  { value: 'workshop', label: 'Workshops' },
  { value: 'hackathon', label: 'Hackathons' },
  { value: 'ideathon', label: 'Ideathons' },
  { value: 'other', label: 'Other' },
];

interface EventsListClientProps {
  events: Event[];
  speakerCounts: Record<string, number>;
  currentType: string;
}

export function EventsListClient({ events, speakerCounts, currentType }: EventsListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setType = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === 'all') params.delete('type');
    else params.set('type', type);
    router.push(`/admin/events?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setType(tab.value)}
              className={cn(
                'rounded-pill px-4 py-1.5 text-sm font-medium transition-colors',
                currentType === tab.value
                  ? 'bg-ink text-canvas'
                  : 'border border-ink bg-transparent text-ink hover:bg-ink/5'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <Button href="/admin/events/new" variant="primary" size="sm">
          + New Event
        </Button>
      </div>

      <DataTable
        data={events}
        searchPlaceholder="Search events..."
        searchFn={(row, q) =>
          row.title.toLowerCase().includes(q) ||
          row.slug.toLowerCase().includes(q)
        }
        onRowClick={(row) => router.push(`/admin/events/${row.id}`)}
        columns={[
          {
            key: 'event_type',
            header: 'Type',
            render: (row) => (
              <Badge className={eventTypeColors[row.event_type]}>
                {eventTypeLabels[row.event_type]}
              </Badge>
            ),
          },
          { key: 'title', header: 'Title', render: (row) => <span className="font-medium">{row.title}</span> },
          {
            key: 'event_date',
            header: 'Date',
            render: (row) => formatDate(row.event_date),
          },
          { key: 'mode', header: 'Mode', render: (row) => <span className="capitalize">{row.mode}</span> },
          {
            key: 'status',
            header: 'Status',
            render: (row) => (
              <Badge className={eventStatusColors[row.status]}>
                {eventStatusLabels[row.status]}
              </Badge>
            ),
          },
          { key: 'registration_count', header: 'Registrations' },
          {
            key: 'speakers',
            header: 'Speakers',
            render: (row) => speakerCounts[row.id] ?? 0,
          },
        ]}
        actions={(row) => (
          <div className="flex items-center gap-3">
            <Link href={`/admin/events/${row.id}`} className="text-sm text-primary hover:underline">
              Edit
            </Link>
            <DeleteButton onDelete={() => deleteEvent(row.id)} />
          </div>
        )}
        emptyMessage="No events found."
      />
    </div>
  );
}
