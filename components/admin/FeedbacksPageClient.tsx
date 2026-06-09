'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/admin/DataTable';
import { StatCard } from '@/components/admin/StatCard';
import { FeedbackDrawer } from '@/components/admin/FeedbackDrawer';
import {
  approveFeedback,
  toggleFeaturedFeedback,
  deleteFeedback,
  bulkApproveFeedbacks,
} from '@/lib/actions/feedbacks';
import { cn, formatDate } from '@/lib/utils';
import type { Feedback } from '@/types/database';

interface FeedbacksPageClientProps {
  feedbacks: Feedback[];
  stats: { total: number; pending: number; approved: number };
}

type StatusFilter = 'all' | 'pending' | 'approved';

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={13}
          height={13}
          viewBox="0 0 16 16"
          fill={i <= rating ? '#ff4f00' : 'none'}
          stroke={i <= rating ? '#ff4f00' : '#c4c4c4'}
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M8 1.5l1.854 3.756 4.146.602-3 2.924.708 4.128L8 10.75l-3.708 1.16.708-4.128-3-2.924 4.146-.602L8 1.5z" />
        </svg>
      ))}
    </span>
  );
}

export function FeedbacksPageClient({ feedbacks, stats }: FeedbacksPageClientProps) {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selected, setSelected] = useState<Feedback | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  const filtered = feedbacks.filter((f) => {
    if (statusFilter === 'pending') return !f.is_approved;
    if (statusFilter === 'approved') return f.is_approved;
    return true;
  });

  const allFilteredIds = filtered.map((f) => f.id);
  const allChecked =
    allFilteredIds.length > 0 && allFilteredIds.every((id) => checkedIds.has(id));

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (allChecked) {
      setCheckedIds(new Set());
    } else {
      setCheckedIds(new Set(allFilteredIds));
    }
  };

  const checkedCount = [...checkedIds].filter((id) => allFilteredIds.includes(id)).length;

  const handleBulkApprove = () => {
    const ids = [...checkedIds].filter((id) => allFilteredIds.includes(id));
    startTransition(async () => {
      await bulkApproveFeedbacks(ids);
      setCheckedIds(new Set());
      router.refresh();
    });
  };

  const handleToggleFeatured = (f: Feedback) => {
    startTransition(async () => {
      await toggleFeaturedFeedback(f.id, f.is_featured);
      router.refresh();
    });
  };

  const handleInlineApprove = (f: Feedback) => {
    startTransition(async () => {
      await approveFeedback(f.id);
      router.refresh();
    });
  };

  const handleDelete = (f: Feedback) => {
    if (!confirm('Delete this feedback? This cannot be undone.')) return;
    startTransition(async () => {
      await deleteFeedback(f.id);
      router.refresh();
    });
  };

  const statusTabs: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <button type="button" onClick={() => setStatusFilter('all')}>
          <StatCard value={stats.total} label="Total" />
        </button>
        <button type="button" onClick={() => setStatusFilter('pending')}>
          <StatCard value={stats.pending} label="Pending" />
        </button>
        <button type="button" onClick={() => setStatusFilter('approved')}>
          <StatCard value={stats.approved} label="Approved" />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {statusTabs.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setStatusFilter(t.value)}
              className={cn(
                'rounded-pill px-4 py-1.5 text-sm font-medium',
                statusFilter === t.value ? 'bg-ink text-canvas' : 'border border-ink text-ink'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {checkedCount > 0 && (
          <button
            type="button"
            onClick={handleBulkApprove}
            disabled={isPending}
            className="rounded-[8px] bg-green-600 px-4 py-1.5 text-sm font-medium text-white disabled:opacity-60"
          >
            Approve Selected ({checkedCount})
          </button>
        )}
      </div>

      <DataTable
        data={filtered}
        searchPlaceholder="Search by name or feedback…"
        searchFn={(row, q) =>
          row.name.toLowerCase().includes(q) ||
          row.feedback_text.toLowerCase().includes(q)
        }
        columns={[
          {
            key: 'check',
            header: (
              <input
                type="checkbox"
                checked={allChecked}
                onChange={toggleAll}
                className="rounded border-ink/30"
                aria-label="Select all"
              />
            ),
            render: (row) => (
              <input
                type="checkbox"
                checked={checkedIds.has(row.id)}
                onChange={() => toggleCheck(row.id)}
                className="rounded border-ink/30"
                aria-label={`Select ${row.name}`}
              />
            ),
          },
          {
            key: 'name',
            header: 'Name',
            render: (row) => (
              <div>
                <span className="font-medium">{row.name}</span>
                {row.college && (
                  <p className="text-xs text-body-mid">{row.college}</p>
                )}
              </div>
            ),
          },
          {
            key: 'rating',
            header: 'Rating',
            render: (row) => <StarRow rating={row.rating} />,
          },
          {
            key: 'event',
            header: 'Event',
            render: (row) => row.event?.title ?? <span className="text-body-mid">—</span>,
          },
          {
            key: 'created_at',
            header: 'Date',
            render: (row) => formatDate(row.created_at),
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) =>
              row.is_approved ? (
                <span className="rounded-pill bg-green-100 px-2.5 py-0.5 text-xs font-medium uppercase text-green-800">
                  Approved
                </span>
              ) : (
                <span className="rounded-pill bg-yellow-100 px-2.5 py-0.5 text-xs font-medium uppercase text-yellow-800">
                  Pending
                </span>
              ),
          },
          {
            key: 'is_featured',
            header: 'Featured',
            render: (row) => (
              <button
                type="button"
                onClick={() => handleToggleFeatured(row)}
                disabled={isPending}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  row.is_featured ? 'bg-primary' : 'bg-mute/40'
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                    row.is_featured ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </button>
            ),
          },
        ]}
        actions={(row) => (
          <div className="flex items-center gap-3">
            {!row.is_approved && (
              <button
                type="button"
                onClick={() => handleInlineApprove(row)}
                disabled={isPending}
                className="text-sm font-medium text-green-700 hover:underline disabled:opacity-50"
              >
                Approve
              </button>
            )}
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
            <button
              type="button"
              onClick={() => handleDelete(row)}
              disabled={isPending}
              className="text-sm text-red-600 hover:underline disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        )}
        emptyMessage="No feedbacks found."
      />

      <FeedbackDrawer
        feedback={selected}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelected(null);
        }}
        onMutate={() => router.refresh()}
      />
    </div>
  );
}
