import Image from 'next/image';
import Link from 'next/link';
import { getInitials } from '@/lib/utils';
import type { EventWithSpeakers } from '@/types/database';

interface ComingSpeakersSectionProps {
  upcomingEvent: EventWithSpeakers | null;
}

export function ComingSpeakersSection({ upcomingEvent }: ComingSpeakersSectionProps) {
  if (!upcomingEvent) return null;

  const confirmedSpeakers =
    upcomingEvent.event_speakers
      ?.map((es) => es.speaker)
      .filter((s): s is NonNullable<typeof s> => Boolean(s) && s.is_active) ?? [];

  const placeholderCount = Math.max(0, 3 - confirmedSpeakers.length);
  const registerHref = upcomingEvent.registration_url || `/events/${upcomingEvent.slug}`;

  return (
    <section className="bg-ink px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header row */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[2px] text-primary">
              Coming Speakers — {upcomingEvent.title.toUpperCase()}
            </p>
            <h2 className="mt-4 max-w-[420px] text-[28px] font-medium leading-tight text-canvas-soft sm:text-[40px]">
              Each speaker arrives with more than a talk.
            </h2>
            <p className="mt-4 max-w-[480px] text-[16px] leading-relaxed text-body">
              Access. Referrals. Open roles. Introductions. The conversation after the session is
              often worth more than the session itself.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href={registerHref}
              className="inline-flex h-11 items-center gap-2 rounded-[12px] bg-primary px-5 text-sm font-medium text-on-primary hover:bg-primary/90"
            >
              Register free →
            </Link>
          </div>
        </div>

        {/* Speakers grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {confirmedSpeakers.map((speaker) => (
            <div
              key={speaker.id}
              className="rounded-[12px] border border-white/5 bg-ink-soft p-6"
            >
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-canvas/10 text-base font-medium text-canvas-soft">
                {speaker.avatar_url ? (
                  <Image
                    src={speaker.avatar_url}
                    alt={speaker.name}
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getInitials(speaker.name)
                )}
              </div>
              <p className="mt-4 text-[16px] font-semibold text-canvas-soft">{speaker.name}</p>
              {speaker.title && (
                <p className="mt-1 text-[14px] text-body">{speaker.title}</p>
              )}
              {speaker.company && (
                <p className="mt-0.5 text-[14px] text-body-mid">{speaker.company}</p>
              )}
              {speaker.is_hiring && (
                <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  Open to talent conversations
                </span>
              )}
            </div>
          ))}

          {/* Placeholder cards to fill to 3 */}
          {Array.from({ length: placeholderCount }).map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="rounded-[12px] border border-dashed border-white/5 bg-ink-soft/50 p-6"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-2xl text-canvas-soft/40">
                ?
              </div>
              <p className="mt-4 text-[14px] font-medium text-canvas-soft/50">
                Founder being confirmed
              </p>
              <p className="mt-1 text-[12px] text-body/50">
                An active founder. Practitioner. Decision-maker.
              </p>
              <span className="mt-4 inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-[11px] text-body-mid">
                Announcement coming soon
              </span>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-12 border-t border-white/5 pt-10 text-center">
          <p className="mx-auto max-w-[560px] text-[14px] leading-relaxed text-body">
            Every founder who joins Sarwagyna School as a speaker is here because they want to find
            the rare student who gets it. That student could be you. The only way to be in the room
            is to register.
          </p>
        </div>
      </div>
    </section>
  );
}
