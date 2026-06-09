'use client';

import { useState } from 'react';
import { getInitials } from '@/lib/utils';
import type { Feedback } from '@/types/database';

function StarRow({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
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

function formatMonth(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
}

interface FeedbackCardProps {
  feedback: Feedback;
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isFeatured = feedback.is_featured;
  const text = feedback.feedback_text;
  const isLong = text.length > 300;
  const displayText = isLong && !expanded ? text.slice(0, 300).trimEnd() + '…' : text;

  const cardBase = isFeatured
    ? 'relative rounded-[12px] bg-ink p-6 text-canvas-soft'
    : 'relative rounded-[12px] bg-canvas-soft p-6';

  return (
    <article className={cardBase}>
      {isFeatured && (
        <span className="absolute right-4 top-4 rounded-pill bg-primary px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-on-primary">
          Featured
        </span>
      )}

      <div className="flex items-center justify-between gap-2">
        <StarRow rating={feedback.rating} />
        <time
          dateTime={feedback.created_at}
          className={`text-[13px] ${isFeatured ? 'text-canvas-soft/60' : 'text-body-mid'}`}
        >
          {formatMonth(feedback.created_at)}
        </time>
      </div>

      <p
        className={`mt-4 text-[17px] leading-relaxed ${isFeatured ? 'text-canvas-soft' : 'text-body'}`}
      >
        {displayText}
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className={`ml-1 text-sm font-medium underline underline-offset-2 ${isFeatured ? 'text-canvas' : 'text-primary'}`}
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>

      <div className="mt-5 flex items-end justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
              isFeatured ? 'bg-canvas-soft/20 text-canvas' : 'bg-canvas text-ink'
            }`}
          >
            {getInitials(feedback.name)}
          </div>
          <div className="min-w-0">
            <p
              className={`truncate text-[15px] font-semibold ${isFeatured ? 'text-canvas' : 'text-ink'}`}
            >
              {feedback.name}
            </p>
            {(feedback.college || feedback.city) && (
              <p
                className={`truncate text-[13px] ${isFeatured ? 'text-canvas-soft/70' : 'text-body-mid'}`}
              >
                {[feedback.college, feedback.city].filter(Boolean).join(', ')}
              </p>
            )}
            {feedback.role && (
              <p
                className={`truncate text-[13px] ${isFeatured ? 'text-canvas-soft/60' : 'text-body-mid'}`}
              >
                {feedback.role}
              </p>
            )}
          </div>
        </div>

        {feedback.event && (
          <span
            className={`shrink-0 rounded-pill border px-3 py-1 text-[12px] font-medium ${
              isFeatured
                ? 'border-canvas-soft/30 text-canvas-soft/70'
                : 'border-ink/20 text-body-mid'
            }`}
          >
            {feedback.event.title}
          </span>
        )}
      </div>
    </article>
  );
}
