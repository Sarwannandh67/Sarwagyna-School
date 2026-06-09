import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import {
  cn,
  eventStatusColors,
  eventStatusLabels,
  eventTypeColors,
  eventTypeLabels,
  formatDate,
  getInitials,
} from '@/lib/utils';
import type { EventWithSpeakers } from '@/types/database';

const gradientByType: Record<string, string> = {
  webinar: 'from-primary/80 to-primary',
  workshop: 'from-[#3b82f6] to-[#2563eb]',
  hackathon: 'from-[#8b5cf6] to-[#7c3aed]',
  ideathon: 'from-[#14b8a6] to-[#0d9488]',
  other: 'from-body-mid to-body',
};

export interface EventCardProps {
  event: EventWithSpeakers;
}

export function EventCard({ event }: EventCardProps) {
  const speakers =
    event.event_speakers
      ?.map((es) => es.speaker)
      .filter((s): s is NonNullable<typeof s> => Boolean(s)) ?? [];

  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {event.thumbnail_url ? (
          <Image
            src={event.thumbnail_url}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div
            className={cn(
              'flex h-full w-full items-end bg-gradient-to-br p-4',
              gradientByType[event.event_type] ?? gradientByType.other
            )}
          >
            <span className="text-lg font-medium text-white">{eventTypeLabels[event.event_type]}</span>
          </div>
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span
            className={cn(
              'inline-flex rounded-pill px-2.5 py-0.5 text-xs font-medium',
              eventTypeColors[event.event_type]
            )}
          >
            {eventTypeLabels[event.event_type]}
          </span>
          <span
            className={cn(
              'inline-flex rounded-pill px-2.5 py-0.5 text-xs font-medium',
              eventStatusColors[event.status]
            )}
          >
            {eventStatusLabels[event.status]}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-semibold text-ink">{event.title}</h3>
        {event.short_description && (
          <p className="mt-2 line-clamp-2 text-sm text-body">{event.short_description}</p>
        )}
        <p className="mt-3 text-sm text-body-mid">
          {formatDate(event.event_date)}
          {event.duration_minutes ? ` · ${event.duration_minutes} min` : ''}
        </p>

        {speakers.length > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <div className="flex -space-x-2">
              {speakers.slice(0, 3).map((speaker) => (
                <div
                  key={speaker.id}
                  className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-canvas-soft bg-canvas text-xs font-medium text-ink"
                  title={speaker.name}
                >
                  {speaker.avatar_url ? (
                    <Image
                      src={speaker.avatar_url}
                      alt={speaker.name}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    getInitials(speaker.name)
                  )}
                </div>
              ))}
            </div>
            {speakers.length > 3 && (
              <span className="text-xs text-body-mid">+{speakers.length - 3} more</span>
            )}
          </div>
        )}

        <div className="mt-auto pt-5">
          <Button href={`/events/${event.slug}`} variant="dark" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
