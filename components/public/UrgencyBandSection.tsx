import { Button } from '@/components/ui/Button';
import type { EventWithSpeakers } from '@/types/database';

interface UrgencyBandSectionProps {
  upcomingEvent: EventWithSpeakers | null;
  daysUntil: number;
}

export function UrgencyBandSection({ upcomingEvent, daysUntil }: UrgencyBandSectionProps) {
  if (!upcomingEvent || daysUntil <= 0) return null;

  const statusLabel =
    daysUntil === 1
      ? 'NEXT SESSION — 1 DAY LEFT'
      : daysUntil <= 7
      ? 'NEXT SESSION — THIS WEEK'
      : `NEXT SESSION — ${daysUntil} DAYS AWAY`;

  const registerHref =
    upcomingEvent.registration_url || `/events/${upcomingEvent.slug}`;

  return (
    <section className="bg-primary px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-medium text-on-primary">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-on-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-on-primary" />
              </span>
              {statusLabel}
            </span>

            <h2 className="mt-4 text-[28px] font-medium leading-tight text-on-primary sm:text-[36px]">
              {upcomingEvent.title}
            </h2>

            <p className="mt-3 text-[16px] text-on-primary/75">
              The founders on stage are actively hiring.
              <br />
              The seat is free. Time is not.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-shrink-0 flex-col items-start gap-2 sm:items-center">
            <Button href={registerHref} variant="dark" size="lg">
              Register free — take the seat
            </Button>
            <p className="text-[12px] text-on-primary/50">Free. No forms. No payment.</p>
          </div>
        </div>

        {/* Bottom strip — only when ≤ 30 days */}
        {daysUntil <= 30 && (
          <div className="mt-8 border-t border-white/10 pt-6 text-center">
            <p className="text-[14px] text-on-primary/60">
              After this session ends, the next opportunity to be in the room with these founders
              is months away.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
