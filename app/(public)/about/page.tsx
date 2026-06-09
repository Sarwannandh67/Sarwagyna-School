export const revalidate = 3600;

import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { isNavigableHref } from '@/lib/utils';
import { fetchAboutStats, fetchSiteSettings } from '@/lib/data/public';

export const metadata: Metadata = {
  title: 'About — Built by a Student, for Students',
  description:
    'Sarwagyna School is an initiative of Sarwagyna Private Limited. Built to teach ambitious students what universities consistently leave out.',
  keywords: [
    'about Sarwagyna School',
    'Sarwagyna Private Limited',
    'student-founded edtech',
    'Sarwagyna School founders',
  ],
  openGraph: {
    title: 'About Sarwagyna School — Built by a Student, for Students',
    description: 'Founded by a student. Backed by Sarwagyna Private Limited. Built to teach what universities leave out.',
    url: 'https://school.sarwagyna.com/about',
    images: [{ url: '/og/about.png', width: 1200, height: 630, alt: 'About Sarwagyna School' }],
  },
  alternates: { canonical: 'https://school.sarwagyna.com/about' },
};
import { WHATSAPP_CHANNEL_URL } from '@/lib/constants';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const DEFAULT_MISSION =
  'To bridge the gap between college education and real-world skills — teaching students what founders, investors, and industry leaders actually know.';

const DEFAULT_VISION =
  'A generation of students who enter the workforce prepared, confident, and connected — not lost and underprepared.';

const milestones = [
  {
    year: '2026',
    title: 'Community and free webinars',
    description: 'Build a 500+ student community and host regular free sessions with founders.',
  },
  {
    year: '2027',
    title: 'Low-cost paid courses',
    description: 'Launch structured programs on startups, investing, and career skills at accessible prices.',
  },
  {
    year: 'Future',
    title: 'A full Sarwagyna institution',
    description:
      'A full educational institution built on the belief that the most valuable knowledge should not be gated behind geography, money, or the right connections.',
  },
];

export default async function AboutPage() {
  const [settings, stats] = await Promise.all([fetchSiteSettings(), fetchAboutStats()]);

  const communityCount = settings.community_count || '';
  const whatsappUrl = isNavigableHref(settings.whatsapp_url)
    ? settings.whatsapp_url
    : undefined;
  const mission = settings.about_mission || DEFAULT_MISSION;
  const vision = settings.about_vision || DEFAULT_VISION;

  return (
    <>
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">About us</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-medium text-ink sm:text-5xl">
            Built by a student. For the students who want more.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-body">
            Not more certificates. More access. More truth. More of what actually matters
            once the degree stops being relevant.
          </p>
        </div>
      </section>

      <section className="bg-canvas-soft px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-medium text-ink">Our mission</h2>
          <p className="mt-4 max-w-3xl text-lg text-body">{mission}</p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <p className="text-3xl font-medium text-ink">{stats.completedEvents}</p>
              <p className="mt-1 text-sm text-body-mid">Events completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-medium text-ink">{stats.speakers}</p>
              <p className="mt-1 text-sm text-body-mid">Speakers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-medium text-ink">{communityCount}+</p>
              <p className="mt-1 text-sm text-body-mid">Community</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-medium text-ink">2025</p>
              <p className="mt-1 text-sm text-body-mid">Year founded</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-medium text-ink">Parent company</h2>
          <div className="card mt-6 p-6 sm:p-8">
            <h3 className="text-xl font-medium text-ink">Sarwagyna Private Limited</h3>
            <p className="mt-4 text-body">
              Sarwagyna School is an initiative of Sarwagyna Private Limited — a technology company
              committed to building intelligent systems that work in the real world.
            </p>
            <p className="mt-3 text-body">
              Sarwagyna (Sanskrit: सर्वज्ञ — All-Knowing) is the parent brand. The school is its
              first public commitment to the people who will use those systems next.
            </p>
            <p className="mt-4 text-xs text-body-mid">
              CIN: U62099AP2024PTC118765
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-medium text-canvas">Long-term vision</h2>
          <p className="mt-4 max-w-2xl text-canvas-soft/80">{vision}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {milestones.map((milestone) => (
              <div
                key={milestone.year}
                className="rounded-[12px] border border-canvas-soft/10 p-6"
              >
                <p className="text-sm font-medium text-primary">{milestone.year}</p>
                <h3 className="mt-2 text-lg font-medium text-canvas">{milestone.title}</h3>
                <p className="mt-2 text-sm text-canvas-soft/70">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-4">
          <WhatsAppButton href={whatsappUrl || WHATSAPP_CHANNEL_URL} size="lg">
            Join Community
          </WhatsAppButton>
          <Button href="/events" variant="dark" size="lg">
            See Events
          </Button>
        </div>
      </section>
    </>
  );
}
