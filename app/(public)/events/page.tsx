export const revalidate = 60;

import type { Metadata } from 'next';
import { EventCard } from '@/components/public/EventCard';

export const metadata: Metadata = {
  title: 'Events — Free Webinars, Workshops & Hackathons for Students',
  description:
    'Browse all Sarwagyna School events — free webinars, workshops, hackathons, and ideathons for Indian college students and freshers. Filter by type and register free.',
  keywords: [
    'free webinars for students India 2026',
    'hackathons for college students India',
    'free workshops for freshers India',
    'ideathons India students',
    'career webinars India',
  ],
  openGraph: {
    title: 'Events — Free Webinars, Workshops & Hackathons for Students',
    description: 'All Sarwagyna School events in one place. Free webinars, workshops, hackathons, and ideathons. Register now.',
    url: 'https://school.sarwagyna.com/events',
    images: [{ url: '/og/events.png', width: 1200, height: 630, alt: 'Sarwagyna School Events' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events — Sarwagyna School',
    description: 'Free webinars, workshops, hackathons for students. Register now.',
    images: ['/og/events.png'],
  },
  alternates: { canonical: 'https://school.sarwagyna.com/events' },
};
import { EventFilterTabs } from '@/components/public/EventFilterTabs';
import { Button } from '@/components/ui/Button';
import {
  fetchPastEvents,
  fetchSiteSettings,
  fetchUpcomingEvents,
} from '@/lib/data/public';
import { eventTypeLabels, isNavigableHref } from '@/lib/utils';
import { WHATSAPP_CHANNEL_URL } from '@/lib/constants';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import type { EventType } from '@/types/database';

interface EventsPageProps {
  searchParams: { type?: string };
}

const validTypes: EventType[] = ['webinar', 'workshop', 'hackathon', 'ideathon', 'other'];

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const typeParam = searchParams.type;
  const filterType = validTypes.includes(typeParam as EventType)
    ? (typeParam as EventType)
    : undefined;

  const [upcomingEvents, pastEvents, settings] = await Promise.all([
    fetchUpcomingEvents(filterType),
    fetchPastEvents(undefined, filterType),
    fetchSiteSettings(),
  ]);

  const whatsappUrl = isNavigableHref(settings.whatsapp_url)
    ? settings.whatsapp_url
    : undefined;
  const typeLabel = filterType ? eventTypeLabels[filterType].toLowerCase() : 'events';
  const hasAnyEvents = upcomingEvents.length > 0 || pastEvents.length > 0;

  return (
    <>
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">All events</p>
          <h1 className="mt-4 text-4xl font-medium text-ink sm:text-5xl">
            Sessions, workshops, and more.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-body">
            Every event we host — live sessions, hands-on workshops, hackathons, and ideathons.
          </p>
        </div>
      </section>

      <section className="border-t border-mute/20 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <EventFilterTabs currentType={filterType ?? ''} />
        </div>
      </section>

      {!hasAnyEvents ? (
        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="card-outlined p-12 text-center">
              <h2 className="text-xl font-medium text-ink">No {typeLabel} yet.</h2>
              <p className="mt-2 text-body">
                Join the community to be notified when we announce new events.
              </p>
              <WhatsAppButton href={whatsappUrl || WHATSAPP_CHANNEL_URL} size="md" className="mt-6">
                Join Community
              </WhatsAppButton>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="px-4 py-8 sm:px-6">
            <div className="mx-auto max-w-6xl">
              <p className="eyebrow">Coming up</p>
              <h2 className="mt-2 text-2xl font-medium text-ink sm:text-3xl">Upcoming events</h2>
              {upcomingEvents.length > 0 ? (
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="card-outlined mt-8 p-8 text-center">
                  <p className="text-body">
                    No upcoming {typeLabel} right now. Check past sessions below or join the
                    community for updates.
                  </p>
                  <WhatsAppButton href={whatsappUrl || WHATSAPP_CHANNEL_URL} size="md" className="mt-4">
                    Join Community
                  </WhatsAppButton>
                </div>
              )}
            </div>
          </section>

          {pastEvents.length > 0 && (
            <section className="bg-canvas-soft px-4 py-16 sm:px-6">
              <div className="mx-auto max-w-6xl">
                <p className="eyebrow">Archive</p>
                <h2 className="mt-2 text-2xl font-medium text-ink sm:text-3xl">Past events</h2>
                <p className="mt-2 text-body">
                  Sessions we&apos;ve already hosted — watch recordings and explore what you missed.
                </p>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {pastEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
