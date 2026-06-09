import Link from 'next/link';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { WHATSAPP_CHANNEL_URL } from '@/lib/constants';
import { isNavigableHref } from '@/lib/utils';

const gaps = [
  {
    title: 'Startup reality',
    description:
      'How founders actually build, fundraise, and fail — not the textbook version.',
    icon: '🚀',
  },
  {
    title: 'Career readiness',
    description:
      'Resumes, interviews, networking, and skills employers actually look for.',
    icon: '💼',
  },
  {
    title: 'Money & AI tools',
    description:
      'Investment basics, personal finance, and practical AI tools for students.',
    icon: '🤖',
  },
];

const benefits = [
  {
    title: 'First access to events',
    description: 'Webinars and workshops announced here before anywhere else.',
  },
  {
    title: 'Founder network',
    description: 'Speakers, mentors, and students who are serious about growing.',
  },
  {
    title: 'Real opportunities',
    description: 'Internships, hackathons, and hiring leads shared in the group.',
  },
  {
    title: 'Honest answers',
    description: 'Ask anything. Get straight talk — no corporate fluff.',
  },
];

const steps = [
  {
    step: '01',
    title: 'Join the channel',
    description: 'One tap on WhatsApp. No forms, no payment, no approval wait.',
  },
  {
    step: '02',
    title: 'Get event alerts',
    description: 'New sessions, recordings, and resources drop here first.',
  },
  {
    step: '03',
    title: 'Show up and learn',
    description: 'Register for events, ask questions, and build your network.',
  },
];

const trustPoints = [
  '100% free to join',
  'No spam or promotions',
  'Student-first community',
  'Any language  welcome',
];

export interface CommunityFunnelProps {
  communityCount: string;
  whatsappUrl?: string;
  completedEvents?: number;
  speakersCount?: number;
}

export function CommunityFunnel({
  communityCount,
  whatsappUrl,
  completedEvents = 0,
  speakersCount = 0,
}: CommunityFunnelProps) {
  const joinUrl = isNavigableHref(whatsappUrl) ? whatsappUrl! : WHATSAPP_CHANNEL_URL;

  return (
    <div id="join-community" className="scroll-mt-20">
      {/* Hook */}
      <section className="bg-ink px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-canvas-soft/60">Join the community</p>
              <h2 className="mt-3 text-3xl font-medium leading-tight text-canvas sm:text-4xl lg:text-5xl">
                College teaches theory. We teach what happens after.
              </h2>
              <p className="mt-5 text-lg text-canvas-soft/80">
                {communityCount}+ students on one WhatsApp channel — first access to events,
                founders who answer back, and skills your syllabus skipped.
              </p>
              <WhatsAppButton href={joinUrl} size="lg" className="mt-8">
                Join free on WhatsApp
              </WhatsAppButton>
              <p className="mt-3 text-sm text-canvas-soft/50">
                Takes 10 seconds. Leave anytime.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[12px] bg-canvas-soft/10 p-5 text-center">
                <p className="text-3xl font-medium text-canvas">{communityCount}+</p>
                <p className="mt-1 text-sm text-canvas-soft/70">Members</p>
              </div>
              <div className="rounded-[12px] bg-canvas-soft/10 p-5 text-center">
                <p className="text-3xl font-medium text-canvas">{completedEvents}</p>
                <p className="mt-1 text-sm text-canvas-soft/70">Events hosted</p>
              </div>
              <div className="rounded-[12px] bg-canvas-soft/10 p-5 text-center">
                <p className="text-3xl font-medium text-canvas">{speakersCount}</p>
                <p className="mt-1 text-sm text-canvas-soft/70">Founder speakers</p>
              </div>
              <div className="rounded-[12px] bg-[#25D366]/20 p-5 text-center">
                <p className="text-3xl font-medium text-[#25D366]">Free</p>
                <p className="mt-1 text-sm text-canvas-soft/70">Always</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gap — why you need this */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">The gap</p>
          <h2 className="mt-2 text-3xl font-medium text-ink">
            What your college forgot to teach you
          </h2>
          <p className="mt-3 max-w-2xl text-body">
            Sarwagyna School fills the space between graduation and the real world. The community
            is where it all starts.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {gaps.map((item) => (
              <div key={item.title} className="card-outlined p-6">
                <span className="text-3xl" aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className="mt-4 text-lg font-medium text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-body">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-canvas-soft px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">What you get</p>
          <h2 className="mt-2 text-3xl font-medium text-ink">
            Inside the {communityCount}+ member community
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex gap-4 rounded-[12px] border border-mute/30 bg-canvas p-5"
              >
                <span
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-on-primary"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <div>
                  <h3 className="font-medium text-ink">{benefit.title}</h3>
                  <p className="mt-1 text-sm text-body">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps funnel */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-2 text-3xl font-medium text-ink">Three steps. You&apos;re in.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((item, index) => (
              <div key={item.step} className="relative">
                {index < steps.length - 1 && (
                  <div
                    className="absolute left-1/2 top-8 hidden h-px w-full bg-mute/40 md:block"
                    aria-hidden="true"
                  />
                )}
                <div className="relative card p-6 text-center">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-medium text-canvas">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-lg font-medium text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-body">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + final CTA */}
      <section className="bg-[#075E54] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg">
              <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </span>
          </div>

          <h2 className="text-3xl font-medium text-white sm:text-4xl">
            {communityCount}+ students are already inside
          </h2>
          <p className="mt-4 text-lg text-white/75">
            Join the WhatsApp channel. Get event alerts, founder access, and a network that
            actually helps — before your next semester ends.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {trustPoints.map((point) => (
              <span
                key={point}
                className="rounded-pill border border-white/20 px-4 py-1.5 text-sm text-white/90"
              >
                {point}
              </span>
            ))}
          </div>

          <WhatsAppButton href={joinUrl} size="lg" className="mt-10">
            Join the community — it&apos;s free
          </WhatsAppButton>

          <p className="mt-4 text-sm text-white/50">
            <Link href="/community-guidelines" className="underline hover:text-white/70">
              Read community guidelines
            </Link>
            {' · '}
            <Link href="/community" className="underline hover:text-white/70">
              Learn more about the community
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
