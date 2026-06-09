'use client';

import { useState, useTransition, useRef } from 'react';
import { submitFeedback } from '@/lib/actions/feedbacks';
import type { Event } from '@/types/database';

const ratingLabels: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Great',
  5: 'Excellent',
};

function StarSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  return (
    <div>
      <div className="flex gap-2" role="group" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(0)}
            aria-label={`${i} star${i > 1 ? 's' : ''}`}
            className="p-0.5 transition-transform hover:scale-110"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 16 16"
              fill={i <= active ? '#ff4f00' : 'none'}
              stroke={i <= active ? '#ff4f00' : '#9e9e9e'}
              strokeWidth="1.2"
              aria-hidden="true"
            >
              <path d="M8 1.5l1.854 3.756 4.146.602-3 2.924.708 4.128L8 10.75l-3.708 1.16.708-4.128-3-2.924 4.146-.602L8 1.5z" />
            </svg>
          </button>
        ))}
      </div>
      {active > 0 && (
        <p className="mt-1 text-sm text-canvas-soft/60">{ratingLabels[active]}</p>
      )}
    </div>
  );
}

interface FeedbackFormProps {
  events: Pick<Event, 'id' | 'title' | 'event_type'>[];
}

export function FeedbackForm({ events }: FeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set('rating', String(rating));

    startTransition(async () => {
      try {
        const result = await submitFeedback(fd);
        if (result.error) {
          showToast('error', result.error);
        } else {
          showToast(
            'success',
            'Thank you! Your feedback has been submitted and will appear after review by our team.'
          );
          formRef.current?.reset();
          setRating(0);
          setCharCount(0);
        }
      } catch {
        showToast('error', 'Something went wrong. Please try again.');
      }
    });
  };

  const inputClass =
    'w-full rounded-[8px] border border-canvas-soft/20 bg-ink-soft px-4 py-2.5 text-sm text-canvas placeholder-canvas-soft/40 focus:border-primary focus:outline-none';

  return (
    <div id="feedback-form" className="scroll-mt-24">
      {toast && (
        <div
          className={`mb-6 rounded-[8px] px-4 py-3 text-sm font-medium ${
            toast.type === 'success'
              ? 'bg-green-500/20 text-green-300'
              : 'bg-red-500/20 text-red-300'
          }`}
        >
          {toast.message}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-canvas-soft/80">
                Name <span className="text-primary">*</span>
              </label>
              <input name="name" required placeholder="Your name" className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-canvas-soft/80">
                College
              </label>
              <input name="college" placeholder="Your college" className={inputClass} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-canvas-soft/80">City</label>
              <input name="city" placeholder="Your city" className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-canvas-soft/80">
                Role / Year
              </label>
              <input
                name="role"
                placeholder="e.g. B.Tech 3rd Year"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-canvas-soft/80">Email</label>
            <input
              name="email"
              type="email"
              placeholder="For follow-up only, not shown publicly"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-canvas-soft/80">
              Which session did you attend?
            </label>
            <select name="event_id" className={inputClass}>
              <option value="none">General — not for a specific session</option>
              {events.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-canvas-soft/80">
              Your Rating <span className="text-primary">*</span>
            </label>
            <StarSelector value={rating} onChange={setRating} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-canvas-soft/80">
              Your Feedback <span className="text-primary">*</span>
            </label>
            <textarea
              name="feedback_text"
              required
              rows={5}
              placeholder={`What did you learn? What did you like?\nWhat should we improve? Be honest.`}
              onChange={(e) => setCharCount(e.target.value.length)}
              className={`${inputClass} resize-none`}
            />
            <p
              className={`mt-1 text-right text-xs ${
                charCount >= 30 ? 'text-canvas-soft/50' : 'text-red-400'
              }`}
            >
              {charCount} chars{charCount < 30 ? ` (${30 - charCount} more needed)` : ''}
            </p>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-primary px-6 py-3 text-sm font-medium text-on-primary transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isPending && (
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {isPending ? 'Submitting…' : 'Submit Feedback'}
          </button>

          <p className="text-center text-[14px] text-canvas-soft/50">
            Your feedback goes to our team first. Approved reviews appear on this page.
          </p>
        </div>
      </form>
    </div>
  );
}
