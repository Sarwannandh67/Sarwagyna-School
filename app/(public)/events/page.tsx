export const revalidate = 60;

import type { Metadata } from 'next';
import { EventCard } from '@/components/public/EventCard';

export const metadata: Metadata = {
  title: 'Sessions — Sarwagyna School',
  description:
    'Every session at Sarwagyna School is run by a founder or practitioner. Webinars, workshops, hackathons, and ideathons — free to start. Register and be in the room.',
  keywords: [
    'free sessions for students',
    'hackathons for students',
    'free workshops for students',
    'founder-taught sessions',
    'career sessions for students',
  ],
  openGraph: {
    title: 'Sessions — Sarwagyna School',
    description: 'Every session is a door. Free webinars, workshops, hackathons, and ideathons — run by founders and practitioners.',
    url: 'https://school.sarwagyna.com/events',
    images: [{ url: '/og/events.png', width: 1200, height: 630, alt: 'Sarwagyna School Sessions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sessions — Sarwagyna School',
    description: 'Every session is a door. Free webinars, workshops, hackathons — taught by founders.',
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
          <p className="eyebrow">All sessions</p>
          <h1 className="mt-4 text-4xl font-medium text-ink sm:text-5xl">
            Every session is a door.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-body">
            Webinars, workshops, hackathons, and ideathons — run by people who hire, invest, and build.
            The learning is the entry point. What you do with the room is up to you.
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
              <h2 className="mt-2 text-2xl font-medium text-ink sm:text-3xl">Coming up — be in the room</h2>
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
                <h2 className="mt-2 text-2xl font-medium text-ink sm:text-3xl">What we covered</h2>
                <p className="mt-2 text-body">
                  Sessions already run — recordings, speakers, and proof you were in the room.
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
