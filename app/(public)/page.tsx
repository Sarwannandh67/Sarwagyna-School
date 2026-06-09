export const revalidate = 60;

import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Sarwagyna School — Learn What Your College Forgot to Teach You',
  description:
    'Free and low-cost sessions on startup reality, investment, AI tools, and career readiness. Taught by founders and practitioners. Join 410+ students across India.',
  keywords: [
    'free webinars for college students India',
    'startup learning for students',
    'AI tools for students India',
    'career readiness for freshers',
    'Sarwagyna School',
    'free online sessions for freshers India',
  ],
  openGraph: {
    title: 'Sarwagyna School — Learn What Your College Forgot to Teach You',
    description:
      'Free and low-cost sessions on startups, investment, AI, and careers. Taught by founders. Join 410+ students.',
    url: 'https://school.sarwagyna.com',
    images: [{ url: '/og/home.png', width: 1200, height: 630, alt: 'Sarwagyna School — Know everything. Lose nothing.' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarwagyna School — Learn What Your College Forgot to Teach You',
    description: 'Free sessions on startups, AI, investment, and careers — taught by founders. 410+ students.',
    images: ['/og/home.png'],
  },
  alternates: { canonical: 'https://school.sarwagyna.com' },
};
import Link from 'next/link';
import { EventCard } from '@/components/public/EventCard';
import { Button } from '@/components/ui/Button';
import {
  fetchHomeStats,
  fetchPastEvents,
  fetchSiteSettings,
  fetchUpcomingEvent,
} from '@/lib/data/public';
import {
  eventTypeColors,
  eventTypeLabels,
  formatDate,
  formatDateTime,
  getInitials,
  isNavigableHref,
} from '@/lib/utils';
import { CommunityFunnel } from '@/components/public/CommunityFunnel';
import { CommunityFunnelCTA } from '@/components/public/CommunityFunnelCTA';
import { FeedbackCard } from '@/components/public/FeedbackCard';
import { fetchFeaturedFeedbacks } from '@/lib/data/feedbacks';
import { WHATSAPP_CHANNEL_URL } from '@/lib/constants';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const eventTypeCards = [
  {
    type: 'webinar' as const,
    title: 'Webinars',
    description: 'Live sessions with founders and industry experts on startup reality, careers, and more.',
    icon: '🎙️',
  },
  {
    type: 'workshop' as const,
    title: 'Workshops',
    description: 'Hands-on sessions where you build, practice, and learn skills that actually matter.',
    icon: '🛠️',
  },
  {
    type: 'hackathon' as const,
    title: 'Hackathons',
    description: 'Build products in teams, compete, and get feedback from real founders and mentors.',
    icon: '⚡',
  },
  {
    type: 'ideathon' as const,
    title: 'Ideathons',
    description: 'Pitch your ideas, get honest feedback, and learn how to validate before you build.',
    icon: '💡',
  },
];

export default async function HomePage() {
  const [settings, upcomingEvent, pastEvents, stats, featuredFeedbacks] = await Promise.all([
    fetchSiteSettings(),
    fetchUpcomingEvent(),
    fetchPastEvents(3),
    fetchHomeStats(),
    fetchFeaturedFeedbacks(3),
  ]);

  const communityCount = settings.community_count || '';
  const whatsappUrl = isNavigableHref(settings.whatsapp_url)
    ? settings.whatsapp_url
    : undefined;

  const upcomingSpeakers =
    upcomingEvent?.event_speakers
      ?.map((es) => es.speaker)
      .filter((s): s is NonNullable<typeof s> => Boolean(s)) ?? [];

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Sarwagyna School',
    url: 'https://school.sarwagyna.com',
    logo: 'https://school.sarwagyna.com/brand/main-logo.png',
    description:
      "India's school for real-world knowledge — startups, investment, AI tools, and career readiness. Taught by founders and practitioners.",
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ongole',
      addressRegion: 'Andhra Pradesh',
      addressCountry: 'IN',
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'Sarwagyna Private Limited',
      identifier: 'U62099AP2024PTC118765',
    },
    numberOfStudents: communityCount || '410',
    teaches: ['Startup Reality', 'Investment Fundamentals', 'AI Tools and Apps', 'Career Readiness'],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Sarwagyna School?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sarwagyna School is a free edtech platform for Indian college students teaching startup reality, investment fundamentals, AI tools, and career readiness through live sessions run by founders and practitioners.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Sarwagyna School free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All webinars and live sessions are completely free to attend. Advanced workshops will be available at low cost.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who teaches at Sarwagyna School?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every session is run by a founder, practitioner, or professional actively working in their field — not career coaches.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">India&apos;s School for the real world</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-tight text-ink sm:text-5xl lg:text-6xl">
            Learn what your college forgot to teach you
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-body">
            Startup reality. Investment fundamentals. AI tools. Career readiness. Taught by founders
            — free and at low cost.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton href={whatsappUrl || WHATSAPP_CHANNEL_URL} size="lg">
              Join {communityCount}+ Community
            </WhatsAppButton>
            <Button href="/events" variant="dark" size="lg">
              Explore Events
            </Button>
            <Button href="#join-community" variant="outline" size="lg">
              Why join?
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {['Founder-led', 'Student first', 'Free to start'].map((pill) => (
              <span
                key={pill}
                className="rounded-pill bg-canvas-soft px-4 py-1.5 text-sm font-medium text-body"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-canvas-soft px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <p className="text-3xl font-medium text-ink sm:text-4xl">{stats.completedEvents}</p>
            <p className="mt-1 text-sm text-body-mid">Completed events</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-medium text-ink sm:text-4xl">{communityCount}+</p>
            <p className="mt-1 text-sm text-body-mid">Community members</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-medium text-ink sm:text-4xl">{stats.speakers}</p>
            <p className="mt-1 text-sm text-body-mid">Active speakers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-medium text-ink sm:text-4xl">100%</p>
            <p className="mt-1 text-sm text-body-mid">Free to start</p>
          </div>
        </div>
      </section>

      <section className="border-y border-mute/20 bg-canvas-soft px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-body">
            <span className="font-medium text-ink">{communityCount}+ students</span> already School
            on WhatsApp — join before the next event drops.
          </p>
          <WhatsAppButton href={whatsappUrl || WHATSAPP_CHANNEL_URL} size="sm">
            Join community
          </WhatsAppButton>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Up next</p>
          <h2 className="mt-2 text-3xl font-medium text-ink">Upcoming event</h2>

          {upcomingEvent ? (
            <div className="card-dark mt-8 p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <span
                    className={`inline-flex rounded-pill px-3 py-1 text-xs font-medium ${eventTypeColors[upcomingEvent.event_type]}`}
                  >
                    {eventTypeLabels[upcomingEvent.event_type]}
                  </span>
                  <h3 className="mt-4 text-2xl font-medium text-canvas sm:text-3xl">
                    {upcomingEvent.title}
                  </h3>
                  {upcomingEvent.short_description && (
                    <p className="mt-3 max-w-2xl text-canvas-soft/80">
                      {upcomingEvent.short_description}
                    </p>
                  )}
                  <p className="mt-4 text-sm text-canvas-soft/70">
                    {formatDateTime(upcomingEvent.event_date)}
                  </p>
                  {upcomingSpeakers.length > 0 && (
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {upcomingSpeakers.slice(0, 4).map((speaker) => (
                          <div
                            key={speaker.id}
                            className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-ink bg-canvas-soft text-xs font-medium text-ink"
                          >
                            {speaker.avatar_url ? (
                              <Image
                                src={speaker.avatar_url}
                                alt={speaker.name}
                                width={36}
                                height={36}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              getInitials(speaker.name)
                            )}
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-canvas-soft/70">
                        {upcomingSpeakers.map((s) => s.name).join(', ')}
                      </span>
                    </div>
                  )}
                </div>
                <Button href={`/events/${upcomingEvent.slug}`} variant="primary" size="md">
                  View Details
                </Button>
              </div>
            </div>
          ) : (
            <div className="card-outlined mt-8 p-8 text-center">
              <h3 className="text-xl font-medium text-ink">Next session coming soon</h3>
              <p className="mt-2 text-body">
                We&apos;re planning our next event. Join the community to get notified first.
              </p>
              {whatsappUrl && (
                <Button href={whatsappUrl} variant="primary" size="md" className="mt-6">
                  Join Community
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="bg-canvas-soft px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">What we host</p>
          <h2 className="mt-2 text-3xl font-medium text-ink">Event types</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {eventTypeCards.map((card) => (
              <div key={card.type} className="card flex flex-col p-6">
                <span className="text-3xl" aria-hidden="true">
                  {card.icon}
                </span>
                <h3 className="mt-4 text-lg font-medium text-ink">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm text-body">{card.description}</p>
                <Link
                  href={`/events?type=${card.type}`}
                  className="mt-4 text-sm font-medium text-primary hover:underline"
                >
                  View Events →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Past sessions</p>
              <h2 className="mt-2 text-3xl font-medium text-ink">Events we&apos;ve hosted</h2>
              <p className="mt-2 text-body">
                Catch up on sessions you missed — recordings, speakers, and certificates.
              </p>
            </div>
            {pastEvents.length > 0 && (
              <Link
                href="/events"
                className="text-sm font-medium text-primary hover:underline"
              >
                View all events →
              </Link>
            )}
          </div>

          {pastEvents.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="card-outlined mt-8 p-8 text-center">
              <h3 className="text-lg font-medium text-ink">No past events yet</h3>
              <p className="mt-2 text-body">
                Our first sessions are on the way. Join the community to be there from day one.
              </p>
              {whatsappUrl && (
                <Button href={whatsappUrl} variant="primary" size="md" className="mt-6">
                  Join Community
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {featuredFeedbacks.length > 0 && (
        <section className="bg-canvas-soft px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">What students say</p>
                <h2 className="mt-2 text-3xl font-medium text-ink">
                  From the people who showed up.
                </h2>
              </div>
              <Link
                href="/feedbacks"
                className="text-sm font-medium text-primary hover:underline"
              >
                Read all feedbacks →
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredFeedbacks.map((feedback) => (
                <FeedbackCard key={feedback.id} feedback={feedback} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CommunityFunnel
        communityCount={communityCount}
        whatsappUrl={whatsappUrl}
        completedEvents={stats.completedEvents}
        speakersCount={stats.speakers}
      />

      <CommunityFunnelCTA communityCount={communityCount} whatsappUrl={whatsappUrl} />
    </>
  );
}
