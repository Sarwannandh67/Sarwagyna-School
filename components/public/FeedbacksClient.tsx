'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { FeedbackCard } from '@/components/public/FeedbackCard';
import type { Feedback } from '@/types/database';

type RatingFilter = 'all' | '5' | '4' | '3-';
type SortOption = 'newest' | 'highest';

interface FeedbacksClientProps {
  feedbacks: Feedback[];
}

export function FeedbacksClient({ feedbacks }: FeedbacksClientProps) {
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>('all');
  const [eventFilter, setEventFilter] = useState('all');
  const [sort, setSort] = useState<SortOption>('newest');

  const events = useMemo(() => {
    const map = new Map<string, string>();
    for (const f of feedbacks) {
      if (f.event_id && f.event) {
        map.set(f.event_id, f.event.title);
      }
    }
    return Array.from(map.entries());
  }, [feedbacks]);

  const filtered = useMemo(() => {
    let result = feedbacks;

    if (ratingFilter === '5') result = result.filter((f) => f.rating === 5);
    else if (ratingFilter === '4') result = result.filter((f) => f.rating === 4);
    else if (ratingFilter === '3-') result = result.filter((f) => f.rating <= 3);

    if (eventFilter !== 'all') {
      result = result.filter((f) => f.event_id === eventFilter);
    }

    if (sort === 'highest') {
      result = [...result].sort((a, b) => b.rating - a.rating || new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result;
  }, [feedbacks, ratingFilter, eventFilter, sort]);

  const ratingPills: { value: RatingFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: '5', label: '5 Star' },
    { value: '4', label: '4 Star' },
    { value: '3-', label: '3 Star and below' },
  ];

  return (
    <div>
      <div className="sticky top-0 z-20 border-b border-mute/20 bg-canvas px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {ratingPills.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setRatingFilter(p.value)}
                className={cn(
                  'shrink-0 rounded-pill px-4 py-1.5 text-sm font-medium transition-colors',
                  ratingFilter === p.value
                    ? 'bg-ink text-canvas'
                    : 'border border-ink/20 text-body hover:border-ink hover:text-ink'
                )}
              >
                {p.label}
              </button>
            ))}
            {events.length > 0 && (
              <select
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
                className="shrink-0 rounded-pill border border-ink/20 bg-transparent px-4 py-1.5 text-sm text-body"
              >
                <option value="all">All Events</option>
                {events.map(([id, title]) => (
                  <option key={id} value={id}>
                    {title}
                  </option>
                ))}
              </select>
            )}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-pill border border-ink/20 bg-transparent px-4 py-1.5 text-sm text-body"
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest Rating</option>
          </select>
        </div>
      </div>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="sr-only">Student feedbacks</h2>
          {filtered.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((f) => (
                <FeedbackCard key={f.id} feedback={f} />
              ))}
            </div>
          ) : (
            <div className="rounded-[12px] border border-dashed border-mute p-12 text-center">
              <p className="text-body">
                {feedbacks.length === 0
                  ? 'No feedbacks yet. Be the first to share your experience.'
                  : 'No feedbacks match your filters.'}
              </p>
              {feedbacks.length === 0 && (
                <a
                  href="#feedback-form"
                  className="mt-4 inline-block rounded-[8px] bg-primary px-5 py-2.5 text-sm font-medium text-on-primary"
                >
                  Leave Feedback
                </a>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
