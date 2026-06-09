import Link from 'next/link';
import { getInitials } from '@/lib/utils';
import type { Feedback } from '@/types/database';

interface StudentFeedbacksSectionProps {
  feedbacks: Feedback[];
}

function StarRow({ rating, dark }: { rating: number; dark: boolean }) {
  return (
    <span className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill={i <= rating ? '#ff4f00' : 'none'}
          stroke={i <= rating ? '#ff4f00' : dark ? 'rgba(255,255,255,0.2)' : '#c5c0b1'}
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M8 1.5l1.854 3.756 4.146.602-3 2.924.708 4.128L8 10.75l-3.708 1.16.708-4.128-3-2.924 4.146-.602L8 1.5z" />
        </svg>
      ))}
    </span>
  );
}

export function StudentFeedbacksSection({ feedbacks }: StudentFeedbacksSectionProps) {
  if (feedbacks.length === 0) return null;

  return (
    <section className="bg-canvas-soft px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[2px] text-primary">
              What students say
            </p>
            <h2 className="mt-3 text-[28px] font-medium text-ink sm:text-[40px]">
              From the people who showed up.
            </h2>
          </div>
          <Link href="/feedbacks" className="text-[14px] font-semibold text-primary hover:underline">
            Read all feedbacks →
          </Link>
        </div>

        {/* Cards grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {feedbacks.map((feedback, index) => {
            const dark = index === 0;
            const initials = getInitials(feedback.name);

            return (
              <article
                key={feedback.id}
                className={`rounded-[12px] p-6 ${
                  dark ? 'bg-ink' : 'border border-ink/10 bg-canvas'
                }`}
              >
                <StarRow rating={feedback.rating} dark={dark} />

                <p
                  className={`mt-4 text-[15px] italic leading-relaxed ${
                    dark ? 'text-canvas-soft' : 'text-body'
                  }`}
                >
                  &ldquo;{feedback.feedback_text}&rdquo;
                </p>

                <div
                  className={`mt-5 flex items-center gap-3 ${
                    feedback.event ? 'border-t pt-4' : ''
                  } ${feedback.event ? (dark ? 'border-white/10' : 'border-ink/10') : ''}`}
                >
                  <div
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                      dark ? 'bg-white/10 text-canvas' : 'bg-canvas-soft text-ink'
                    }`}
                  >
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`truncate text-[15px] font-semibold ${
                        dark ? 'text-canvas-soft' : 'text-ink'
                      }`}
                    >
                      {feedback.name}
                    </p>
                    {(feedback.college || feedback.role) && (
                      <p
                        className={`truncate text-[12px] ${
                          dark ? 'text-body' : 'text-body-mid'
                        }`}
                      >
                        {[feedback.college, feedback.role].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                </div>

                {feedback.event && (
                  <p
                    className={`mt-3 text-[12px] ${
                      dark ? 'text-body' : 'text-body-mid'
                    }`}
                  >
                    Attended: {feedback.event.title}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
