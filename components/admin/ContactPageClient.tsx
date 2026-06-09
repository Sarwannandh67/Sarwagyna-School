'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DataTable } from '@/components/admin/DataTable';
import { ContactDrawer } from '@/components/admin/ContactDrawer';
import { StatCard } from '@/components/admin/StatCard';
import { cn, formatDateTime } from '@/lib/utils';
import type { ContactSubmission, ContactStatus, InquiryType } from '@/types/database';

interface ContactPageClientProps {
  submissions: ContactSubmission[];
  stats: { new: number; read: number; replied: number };
  currentStatus: string;
  currentType: string;
}

export function ContactPageClient({
  submissions,
  stats,
  currentStatus,
  currentType,
}: ContactPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<ContactSubmission | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') params.delete(key);
    else params.set(key, value);
    router.push(`/admin/contact?${params.toString()}`);
  };

  const statusFilters: { value: ContactStatus | 'all'; label: string; count?: number }[] = [
    { value: 'all', label: 'All' },
    { value: 'new', label: 'New', count: stats.new },
    { value: 'read', label: 'Read', count: stats.read },
    { value: 'replied', label: 'Replied', count: stats.replied },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <button type="button" onClick={() => updateFilter('status', 'new')}>
          <StatCard value={stats.new} label="New" />
        </button>
        <button type="button" onClick={() => updateFilter('status', 'read')}>
          <StatCard value={stats.read} label="Read" />
        </button>
        <button type="button" onClick={() => updateFilter('status', 'replied')}>
          <StatCard value={stats.replied} label="Replied" />
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => updateFilter('status', f.value)}
            className={cn(
              'rounded-pill px-4 py-1.5 text-sm font-medium',
              currentStatus === f.value ? 'bg-ink text-canvas' : 'border border-ink text-ink'
            )}
          >
            {f.label}
          </button>
        ))}
        <select
          value={currentType}
          onChange={(e) => updateFilter('type', e.target.value)}
          className="rounded-pill border border-ink bg-transparent px-4 py-1.5 text-sm"
        >
          <option value="all">All types</option>
          <option value="general">General</option>
          <option value="speaker">Speaker</option>
          <option value="partnership">Partnership</option>
          <option value="webinar">Webinar</option>
          <option value="certificate">Certificate</option>
        </select>
      </div>

      <DataTable
        data={submissions}
        searchPlaceholder="Search submissions..."
        searchFn={(row, q) =>
          row.name.toLowerCase().includes(q) ||
          row.email.toLowerCase().includes(q) ||
          row.message.toLowerCase().includes(q)
        }
        columns={[
          { key: 'created_at', header: 'Date', render: (row) => formatDateTime(row.created_at) },
          { key: 'name', header: 'Name', render: (row) => <span className="font-medium">{row.name}</span> },
          { key: 'email', header: 'Email' },
          { key: 'inquiry_type', header: 'Type', render: (row) => <span className="capitalize">{row.inquiry_type}</span> },
          { key: 'subject', header: 'Subject', render: (row) => row.subject ?? '—' },
          { key: 'status', header: 'Status', render: (row) => <span className="capitalize">{row.status}</span> },
        ]}
        actions={(row) => (
          <button
            type="button"
            onClick={() => {
              setSelected(row);
              setDrawerOpen(true);
            }}
            className="text-sm text-primary hover:underline"
          >
            View
          </button>
        )}
        emptyMessage="No contact submissions."
      />

      <ContactDrawer
        submission={selected}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelected(null);
        }}
      />
    </div>
  );
}
