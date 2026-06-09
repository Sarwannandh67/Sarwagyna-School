export const revalidate = 3600;

import type { Metadata } from 'next';
import { SpeakerCard } from '@/components/public/SpeakerCard';

export const metadata: Metadata = {
  title: 'Speakers — Founders and Practitioners',
  description:
    'Every person who teaches at Sarwagyna School is actively building something. Not coaches. Not theorists. Founders and practitioners who decided to share what they know.',
  keywords: [
    'founder-led sessions for students',
    'Sarwagyna School speakers',
    'practitioners teaching students',
  ],
  openGraph: {
    title: 'Speakers — Founders Who Give Back | Sarwagyna School',
    description: 'Not coaches. Not theorists. Founders and practitioners who are actively doing the work.',
    url: 'https://school.sarwagyna.com/speakers',
    images: [{ url: '/og/speakers.png', width: 1200, height: 630, alt: 'Sarwagyna School Speakers' }],
  },
  alternates: { canonical: 'https://school.sarwagyna.com/speakers' },
};
import { Button } from '@/components/ui/Button';
import { fetchSiteSettings, fetchSpeakersWithEvents } from '@/lib/data/public';
import { isNavigableHref } from '@/lib/utils';
import { WHATSAPP_CHANNEL_URL } from '@/lib/constants';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export default async function SpeakersPage() {
  const [speakers, settings] = await Promise.all([
    fetchSpeakersWithEvents(),
    fetchSiteSettings(),
  ]);

  const whatsappUrl = isNavigableHref(settings.whatsapp_url)
    ? settings.whatsapp_url
    : undefined;

  return (
    <>
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Who teaches here</p>
          <h1 className="mt-4 text-4xl font-medium text-ink sm:text-5xl">
            Founders who give back.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-body">
            Every person on this page is actively building something. Not professional speakers.
            Practitioners who decided to share what they know with the next generation.
            Some of them are also looking for talent. Pay attention to that.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {speakers.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {speakers.map((speaker) => (
                <SpeakerCard key={speaker.id} speaker={speaker} />
              ))}
            </div>
          ) : (
            <div className="rounded-[12px] border-2 border-dashed border-mute/50 p-12 text-center">
              <h2 className="text-xl font-medium text-ink">Speakers being confirmed.</h2>
              <p className="mt-2 text-body">
                Each one arrives with knowledge — and sometimes, with an open role or an introduction
                that changes where you end up.
              </p>
              <WhatsAppButton href={whatsappUrl || WHATSAPP_CHANNEL_URL} size="md" className="mt-6">
                Join Community
              </WhatsAppButton>
            </div>
          )}
        </div>
      </section>

      <section className="bg-ink px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-medium text-canvas">You don&apos;t need a TED stage. You need a room that listens.</h2>
              <p className="mt-4 text-canvas-soft/80">
                We have 410+ ambitious students who show up, ask sharp questions, and remember who
                taught them well. If you are a founder, practitioner, or operator — your session
                could be the conversation that changes what someone does next.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-canvas-soft/70">
                <li>→ Reach students who actually show up and pay attention</li>
                <li>→ Find the rare talent worth betting on</li>
                <li>→ Give back while growing your network</li>
              </ul>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Button href="/contact?type=speaker" variant="primary" size="lg">
                Apply to Speak
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
