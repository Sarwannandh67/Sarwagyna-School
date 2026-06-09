'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DataTable } from '@/components/admin/DataTable';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { deleteSpeaker, toggleSpeakerActive, toggleSpeakerHiring } from '@/lib/actions/speakers';
import { getInitials } from '@/lib/utils';
import type { Speaker } from '@/types/database';

interface SpeakersListClientProps {
  speakers: Speaker[];
  eventCounts: Record<string, number>;
}

export function SpeakersListClient({ speakers, eventCounts }: SpeakersListClientProps) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button href="/admin/speakers/new" variant="primary" size="sm">
          + Add Speaker
        </Button>
      </div>

      <DataTable
        data={speakers}
        searchPlaceholder="Search speakers..."
        searchFn={(row, q) =>
          row.name.toLowerCase().includes(q) ||
          (row.company?.toLowerCase().includes(q) ?? false)
        }
        onRowClick={(row) => router.push(`/admin/speakers/${row.id}`)}
        columns={[
          {
            key: 'avatar',
            header: 'Avatar',
            render: (row) =>
              row.avatar_url ? (
                <img src={row.avatar_url} alt="" className="h-8 w-8 rounded-full object-cover" />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-canvas-soft text-xs font-medium">
                  {getInitials(row.name)}
                </div>
              ),
          },
          { key: 'name', header: 'Name', render: (row) => <span className="font-medium">{row.name}</span> },
          { key: 'company', header: 'Company', render: (row) => row.company ?? '—' },
          {
            key: 'tags',
            header: 'Tags',
            render: (row) => (
              <span className="text-xs text-body-mid">{row.tags?.slice(0, 2).join(', ') || '—'}</span>
            ),
          },
          {
            key: 'is_active',
            header: 'Active',
            render: (row) => (
              <Toggle
                label=""
                checked={row.is_active}
                onChange={(checked) => toggleSpeakerActive(row.id, checked).then(() => router.refresh())}
                className="!gap-0"
              />
            ),
          },
          {
            key: 'is_hiring',
            header: 'Hiring',
            render: (row) => (
              <Toggle
                label=""
                checked={row.is_hiring}
                onChange={(checked) => toggleSpeakerHiring(row.id, checked).then(() => router.refresh())}
                className="!gap-0"
              />
            ),
          },
          {
            key: 'events',
            header: 'Events',
            render: (row) => (
              <Link href={`/admin/speakers/${row.id}`} className="text-primary hover:underline">
                {eventCounts[row.id] ?? 0}
              </Link>
            ),
          },
        ]}
        actions={(row) => (
          <div className="flex items-center gap-3">
            <Link href={`/admin/speakers/${row.id}`} className="text-sm text-primary hover:underline">
              Edit
            </Link>
            <DeleteButton onDelete={() => deleteSpeaker(row.id)} />
          </div>
        )}
        emptyMessage="No speakers yet."
      />
    </div>
  );
}
