export const revalidate = 120;

import type { Metadata } from 'next';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/server';
import { fetchApprovedFeedbacks, computeFeedbackStats } from '@/lib/data/feedbacks';
import { FeedbacksClient } from '@/components/public/FeedbacksClient';
import { FeedbackForm } from '@/components/public/FeedbackForm';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Student Feedbacks — Sarwagyna School',
  description:
    'Real feedback from students who attended Sarwagyna School sessions. Unfiltered reviews on webinars, workshops, and community experience.',
  keywords: [
    'Sarwagyna School reviews',
    'student feedback Sarwagyna',
    'edtech reviews India',
    'webinar reviews for students India',
  ],
  openGraph: {
    title: 'Student Feedbacks — Sarwagyna School',
    description:
      'Real, unfiltered feedback from students who attended Sarwagyna School sessions.',
    url: 'https://school.sarwagyna.com/feedbacks',
    images: [{ url: '/og/feedbacks.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Feedbacks — Sarwagyna School',
    description: 'What students say about Sarwagyna School sessions.',
    images: ['/og/feedbacks.png'],
  },
  alternates: { canonical: 'https://school.sarwagyna.com/feedbacks' },
};

function StarDisplay({ rating, size = 24 }: { rating: number; size?: number }) {
  const full = Math.floor(rating);
  return (
    <span className="flex gap-1" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill={i <= full ? '#ff4f00' : 'none'}
          stroke={i <= full ? '#ff4f00' : '#9e9e9e'}
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M8 1.5l1.854 3.756 4.146.602-3 2.924.708 4.128L8 10.75l-3.708 1.16.708-4.128-3-2.924 4.146-.602L8 1.5z" />
        </svg>
      ))}
    </span>
  );
}

export default async function FeedbacksPage() {
  const [feedbacks, eventsResult] = await Promise.all([
    fetchApprovedFeedbacks(),
    supabaseAdmin
      .from('events')
      .select('id, title, event_type')
      .in('status', ['published', 'completed'])
      .order('event_date', { ascending: false }),
  ]);

  const events = eventsResult.data ?? [];
  const { avgRating, total, breakdown } = computeFeedbackStats(feedbacks);

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Student Feedbacks — Sarwagyna School',
    url: 'https://school.sarwagyna.com/feedbacks',
    description: 'Student reviews and feedback for Sarwagyna School sessions.',
    ...(total > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(avgRating),
        reviewCount: String(total),
        bestRating: '5',
        worstRating: '1',
      },
      review: feedbacks.slice(0, 10).map((f) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: f.name },
        reviewBody: f.feedback_text,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: String(f.rating),
          bestRating: '5',
        },
        datePublished: f.created_at,
      })),
    }),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What do students say about Sarwagyna School sessions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Students highlight the honest, practical content from active founders and the warm community as the standout aspects. Sessions are consistently rated highly for practical takeaways.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I leave feedback for a Sarwagyna School session?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Visit school.sarwagyna.com/feedbacks, fill in the feedback form, and submit your review. All reviews are verified by the team before appearing publicly.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Student Feedbacks</p>
          <h1 className="mt-4 text-4xl font-medium leading-tight text-ink sm:text-5xl lg:text-[56px]">
            What students are actually saying.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-body">
            Real feedback. Not curated. Not filtered for comfort.
            The good and the &ldquo;here&apos;s what needs to improve.&rdquo;
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-pill bg-canvas-soft px-5 py-2 text-sm font-medium text-body">
              {total} Review{total !== 1 ? 's' : ''}
            </span>
            {total > 0 && (
              <span className="rounded-pill bg-canvas-soft px-5 py-2 text-sm font-medium text-body">
                ★ {avgRating} Average Rating
              </span>
            )}
            <span className="rounded-pill bg-canvas-soft px-5 py-2 text-sm font-medium text-body">
              100% Real Students
            </span>
          </div>
        </div>
      </section>

      {/* Rating Summary Strip */}
      {total > 0 && (
        <section className="border-y border-mute/20 bg-canvas-soft px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center gap-10 md:flex-row md:gap-16">
              <div className="flex flex-col items-center text-center">
                <p className="text-[64px] font-medium leading-none text-ink">{avgRating}</p>
                <div className="mt-3">
                  <StarDisplay rating={avgRating} size={28} />
                </div>
                <p className="mt-2 text-sm text-body-mid">out of 5 · based on {total} reviews</p>
              </div>

              <div className="w-full max-w-sm space-y-2">
                {([5, 4, 3, 2, 1] as const).map((star) => {
                  const count = breakdown[star] ?? 0;
                  const pct = total > 0 ? (count / total) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="w-8 shrink-0 text-right text-sm text-body-mid">
                        {star} ★
                      </span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-canvas">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-6 shrink-0 text-sm text-body-mid">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter Bar + Grid */}
      <FeedbacksClient feedbacks={feedbacks} />

      {/* Submit Feedback Form */}
      <section className="bg-ink px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow text-canvas-soft/60">Leave Your Feedback</p>
          <h2 className="mt-3 text-3xl font-medium text-canvas-soft sm:text-[48px] sm:leading-tight">
            Attended a session? Tell us what happened.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-canvas-soft/60">
            Honest feedback makes the next session better.
            Your review appears after a quick check by our team.
          </p>

          <div className="mt-10 rounded-[12px] bg-ink-soft p-6 sm:p-8">
            <FeedbackForm events={events} />
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-primary px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-medium text-on-primary sm:text-[48px]">
            Be in the next room.
          </h2>
          <p className="mt-4 text-lg text-on-primary/85">
            Register free. The learning is the bonus. The room is the opportunity.
          </p>
          <div className="mt-8">
            <Button href="/events" variant="dark" size="lg">
              See Upcoming Events
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
