'use client';

import { useTransition } from 'react';
import {
  approveFeedback,
  toggleFeaturedFeedback,
  deleteFeedback,
} from '@/lib/actions/feedbacks';
import { formatDateTime } from '@/lib/utils';
import type { Feedback } from '@/types/database';

interface FeedbackDrawerProps {
  feedback: Feedback | null;
  open: boolean;
  onClose: () => void;
  onMutate: () => void;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={14}
          height={14}
          viewBox="0 0 16 16"
          fill={i <= rating ? '#ff4f00' : 'none'}
          stroke={i <= rating ? '#ff4f00' : '#9e9e9e'}
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M8 1.5l1.854 3.756 4.146.602-3 2.924.708 4.128L8 10.75l-3.708 1.16.708-4.128-3-2.924 4.146-.602L8 1.5z" />
        </svg>
      ))}
    </span>
  );
}

export function FeedbackDrawer({ feedback, open, onClose, onMutate }: FeedbackDrawerProps) {
  const [isPending, startTransition] = useTransition();

  if (!open || !feedback) return null;

  const handleApprove = () => {
    startTransition(async () => {
      await approveFeedback(feedback.id);
      onMutate();
      onClose();
    });
  };

  const handleToggleFeatured = () => {
    startTransition(async () => {
      await toggleFeaturedFeedback(feedback.id, feedback.is_featured);
      onMutate();
    });
  };

  const handleDelete = () => {
    if (!confirm('Delete this feedback? This cannot be undone.')) return;
    startTransition(async () => {
      await deleteFeedback(feedback.id);
      onMutate();
      onClose();
    });
  };

  const fields: [string, string | null | undefined][] = [
    ['Name', feedback.name],
    ['Email', feedback.email],
    ['College', feedback.college],
    ['City', feedback.city],
    ['Role', feedback.role],
    ['Date', formatDateTime(feedback.created_at)],
    ['Event', feedback.event?.title ?? null],
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-canvas shadow-xl">
        <div className="flex items-center justify-between border-b border-canvas-soft px-6 py-4">
          <h2 className="text-lg font-medium text-ink">Feedback detail</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-body-mid hover:bg-canvas-soft hover:text-ink"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div className="flex items-center justify-between">
            <StarRow rating={feedback.rating} />
            <span
              className={`rounded-pill px-3 py-1 text-xs font-medium uppercase ${
                feedback.is_approved
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {feedback.is_approved ? 'Approved' : 'Pending'}
            </span>
          </div>

          <div>
            <p className="text-xs text-body-mid">Feedback</p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-ink">{feedback.feedback_text}</p>
          </div>

          {fields.map(([label, value]) =>
            value ? (
              <div key={label}>
                <p className="text-xs text-body-mid">{label}</p>
                <p className="mt-0.5 text-sm text-ink">{value}</p>
              </div>
            ) : null
          )}

          <div className="flex items-center justify-between rounded-[8px] border border-canvas-soft bg-canvas-soft/50 px-4 py-3">
            <span className="text-sm text-body">Featured</span>
            <button
              type="button"
              onClick={handleToggleFeatured}
              disabled={isPending}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                feedback.is_featured ? 'bg-primary' : 'bg-mute/40'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  feedback.is_featured ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="flex gap-3 border-t border-canvas-soft px-6 py-4">
          {!feedback.is_approved && (
            <button
              type="button"
              onClick={handleApprove}
              disabled={isPending}
              className="flex-1 rounded-[8px] bg-primary px-4 py-2.5 text-sm font-medium text-on-primary disabled:opacity-60"
            >
              Approve
            </button>
          )}
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="text-sm font-medium text-red-600 hover:underline disabled:opacity-60"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
