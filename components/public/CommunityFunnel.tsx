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

    </div>
  );
}
