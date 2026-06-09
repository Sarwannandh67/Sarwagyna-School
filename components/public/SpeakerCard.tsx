import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { getInitials } from '@/lib/utils';
import type { SpeakerWithEvents } from '@/types/database';

export interface SpeakerCardProps {
  speaker: SpeakerWithEvents;
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  const events =
    speaker.event_speakers
      ?.map((es) => es.event)
      .filter((e): e is NonNullable<typeof e> => Boolean(e)) ?? [];

  return (
    <article className="card flex h-full flex-col p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-canvas text-lg font-medium text-ink">
          {speaker.avatar_url ? (
            <Image
              src={speaker.avatar_url}
              alt={speaker.name}
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          ) : (
            getInitials(speaker.name)
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-semibold text-ink">{speaker.name}</h3>
          {(speaker.title || speaker.company) && (
            <p className="mt-1 text-sm text-body">
              {[speaker.title, speaker.company].filter(Boolean).join(' · ')}
            </p>
          )}
          {speaker.is_hiring && (
            <Badge variant="primary" className="mt-2 bg-primary text-on-primary">
              Actively hiring
            </Badge>
          )}
        </div>
      </div>

      {speaker.short_bio && (
        <p className="mt-4 line-clamp-2 text-sm text-body">{speaker.short_bio}</p>
      )}

      {speaker.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {speaker.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}

      {events.length > 0 && (
        <p className="mt-4 text-xs text-body-mid">
          Spoke at:{' '}
          {events
            .slice(0, 2)
            .map((e) => e.title)
            .join(', ')}
          {events.length > 2 ? ` +${events.length - 2} more` : ''}
        </p>
      )}

      {speaker.linkedin_url && (
        <div className="mt-auto pt-4">
          <Link
            href={speaker.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-primary"
            aria-label={`${speaker.name} on LinkedIn`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </Link>
        </div>
      )}
    </article>
  );
}
