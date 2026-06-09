import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import {
  eventHasCertificates,
  fetchEventBySlug,
  fetchEventSlugs,
} from '@/lib/data/public';
import {
  cn,
  eventStatusColors,
  eventStatusLabels,
  eventTypeColors,
  eventTypeLabels,
  formatDateTime,
  getInitials,
} from '@/lib/utils';

export const revalidate = 60;

const BASE = 'https://school.sarwagyna.com';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const event = await fetchEventBySlug(params.slug);
  if (!event) return { title: 'Event Not Found' };

  const title = `${event.title} — ${event.is_free ? 'Free' : `₹${event.price}`} ${event.event_type === 'webinar' ? 'Webinar' : 'Event'} | Sarwagyna School`;
  const description =
    event.short_description ||
    `${event.is_free ? 'Free' : `₹${event.price}`} ${event.event_type} by Sarwagyna School for Indian college students and freshers.`;
  const url = `${BASE}/events/${event.slug}`;

  return {
    title: event.title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: event.thumbnail_url
        ? [{ url: event.thumbnail_url, width: 1200, height: 630, alt: `${event.title} — Sarwagyna School` }]
        : [{ url: '/og/events.png', width: 1200, height: 630, alt: `${event.title} — Sarwagyna School` }],
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: url },
  };
}

export async function generateStaticParams() {
  try {
    const slugs = await fetchEventSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

interface EventDetailPageProps {
  params: { slug: string };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const event = await fetchEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  const hasCertificates = await eventHasCertificates(event.id);

  const speakers =
    event.event_speakers
      ?.map((es) => ({ ...es, speaker: es.speaker }))
      .filter((es) => es.speaker)
      .sort((a, b) => a.sort_order - b.sort_order) ?? [];

  const isPublished = event.status === 'published';
  const isCompleted = event.status === 'completed';

  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.short_description || event.description || undefined,
    url: `${BASE}/events/${event.slug}`,
    startDate: event.event_date,
    endDate: event.event_end_date || undefined,
    eventStatus:
      event.status === 'cancelled'
        ? 'https://schema.org/EventCancelled'
        : event.status === 'completed'
        ? 'https://schema.org/EventScheduled'
        : 'https://schema.org/EventScheduled',
    eventAttendanceMode:
      event.mode === 'offline'
        ? 'https://schema.org/OfflineEventAttendanceMode'
        : event.mode === 'hybrid'
        ? 'https://schema.org/MixedEventAttendanceMode'
        : 'https://schema.org/OnlineEventAttendanceMode',
    isAccessibleForFree: event.is_free,
    organizer: { '@type': 'Organization', name: 'Sarwagyna School', url: BASE },
    location: event.venue
      ? { '@type': 'Place', name: event.venue }
      : { '@type': 'VirtualLocation', url: event.platform || BASE },
    offers: {
      '@type': 'Offer',
      price: event.is_free ? '0' : String(event.price),
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    audience: { '@type': 'Audience', audienceType: 'College students and freshers in India' },
    performer: speakers.map((es) => ({
      '@type': 'Person',
      name: es.speaker!.name,
      jobTitle: es.speaker!.title || undefined,
      worksFor: es.speaker!.company
        ? { '@type': 'Organization', name: es.speaker!.company }
        : undefined,
      sameAs: es.speaker!.linkedin_url || undefined,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />
      <section className="bg-ink px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-2">
            <span
              className={cn(
                'inline-flex rounded-pill px-3 py-1 text-xs font-medium',
                eventTypeColors[event.event_type]
              )}
            >
              {eventTypeLabels[event.event_type]}
            </span>
            <span
              className={cn(
                'inline-flex rounded-pill px-3 py-1 text-xs font-medium',
                eventStatusColors[event.status]
              )}
            >
              {eventStatusLabels[event.status]}
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-medium leading-tight text-canvas sm:text-5xl">
            {event.title}
          </h1>

          {event.short_description && (
            <p className="mt-4 max-w-2xl text-lg text-canvas-soft/80">{event.short_description}</p>
          )}

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-canvas-soft/70">
            <span>{formatDateTime(event.event_date)}</span>
            {event.duration_minutes > 0 && <span>{event.duration_minutes} minutes</span>}
            <span className="capitalize">{event.mode}</span>
            {event.platform && <span>{event.platform}</span>}
            {event.venue && <span>{event.venue}</span>}
            <span>{event.is_free ? 'Free' : `₹${event.price}`}</span>
          </div>

          {(event.registration_count > 0 || (isCompleted && event.attendance_count > 0)) && (
            <div className="mt-6 flex flex-wrap gap-6">
              {event.registration_count > 0 && (
                <div>
                  <p className="text-2xl font-medium text-canvas">{event.registration_count.toLocaleString()}</p>
                  <p className="mt-0.5 text-xs text-canvas-soft/60">Registered</p>
                </div>
              )}
              {isCompleted && event.attendance_count > 0 && (
                <div>
                  <p className="text-2xl font-medium text-canvas">{event.attendance_count.toLocaleString()}</p>
                  <p className="mt-0.5 text-xs text-canvas-soft/60">Attended</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {isPublished && event.registration_url && (
              <Button href={event.registration_url} variant="primary" size="lg">
                Register Now
              </Button>
            )}
            {isCompleted && event.recording_url && (
              <Button href={event.recording_url} variant="dark" size="lg">
                Watch Recording
              </Button>
            )}
            <Button href="/events" variant="outline" size="lg" className="border-canvas-soft/40 text-canvas hover:bg-canvas-soft/10">
              All Events
            </Button>
          </div>
        </div>
      </section>

      {event.what_you_learn.length > 0 && (
        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-medium text-ink">What you will learn</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {event.what_you_learn.map((item, index) => (
                <div key={index} className="card p-5">
                  <span className="text-primary" aria-hidden="true">
                    ✓
                  </span>
                  <p className="mt-2 text-sm text-body">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-canvas-soft px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-medium text-ink">Speakers</h2>
          {speakers.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {speakers.map((es) => {
                const speaker = es.speaker!;
                return (
                  <div key={es.id} className="card flex items-start gap-4 p-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-canvas text-sm font-medium text-ink">
                      {speaker.avatar_url ? (
                        <Image
                          src={speaker.avatar_url}
                          alt={speaker.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        getInitials(speaker.name)
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink">{speaker.name}</h3>
                      <p className="text-sm text-body">
                        {[speaker.title, speaker.company].filter(Boolean).join(' · ')}
                      </p>
                      <p className="mt-1 text-xs text-body-mid">{es.role}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mt-6 text-body">Speakers will be announced soon.</p>
          )}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h2 className="text-xl font-medium text-ink">Event details</h2>
            {event.description ? (
              <p className="mt-4 whitespace-pre-wrap text-body">{event.description}</p>
            ) : (
              <p className="mt-4 text-body">More details coming soon.</p>
            )}
          </div>
          <div className="card p-6">
            <h2 className="text-xl font-medium text-ink">Who should attend</h2>
            {event.who_should_attend.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {event.who_should_attend.map((item, index) => (
                  <li key={index} className="flex gap-2 text-body">
                    <span className="text-primary">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-body">
                Students, early-career professionals, and anyone curious about startups and real-world
                skills.
              </p>
            )}
          </div>
        </div>
      </section>

      {(event.certificate_issued || hasCertificates) && (
        <section className="px-4 pb-8 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="card-outlined p-6 text-center">
              <p className="text-body">
                Participants received a certificate for this event. Verify at{' '}
                <Link href="/verify" className="font-medium text-primary hover:underline">
                  School.sarwagyna.com/verify
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}

      {isPublished && event.registration_url && (
        <section className="bg-primary px-4 py-12 sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-2xl font-medium text-on-primary">Ready to join?</h2>
              <p className="mt-1 text-on-primary/80">
                {event.is_free ? 'Register now — it\'s free.' : `Register for ₹${event.price}.`}
              </p>
            </div>
            <Button href={event.registration_url} variant="dark" size="lg">
              Register Now{event.is_free ? ' — Free' : ''}
            </Button>
          </div>
        </section>
      )}

      {isCompleted && event.recording_url && (
        <section className="bg-ink px-4 py-12 sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-canvas-soft/50">Session recap</p>
              <h2 className="mt-1 text-2xl font-medium text-canvas">Missed the live session?</h2>
              <p className="mt-2 text-canvas-soft/70">
                Watch the full recording and catch up on everything covered in this session.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button href={event.recording_url} variant="primary" size="lg">
                Watch Recording →
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
