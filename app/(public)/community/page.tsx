export const revalidate = 3600;

import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { isNavigableHref } from '@/lib/utils';
import { fetchSiteSettings, fetchTestimonials } from '@/lib/data/public';

export const metadata: Metadata = {
  title: 'Community — 410+ Students',
  description:
    'Join 410+ Indian college students in the Sarwagyna School WhatsApp community. Get first access to sessions, real opportunities, and honest career advice.',
  keywords: [
    'student community India WhatsApp',
    'college students community India',
    'career community for freshers India',
    'startup community for students India',
  ],
  openGraph: {
    title: 'Join 410+ Students — Sarwagyna School Community',
    description: '410+ students. One WhatsApp. Real opportunities, first access to events, and honest advice.',
    url: 'https://school.sarwagyna.com/community',
    images: [{ url: '/og/community.png', width: 1200, height: 630, alt: 'Sarwagyna School Community' }],
  },
  alternates: { canonical: 'https://school.sarwagyna.com/community' },
};
import { WHATSAPP_CHANNEL_URL } from '@/lib/constants';
import { WhatsAppButton, WhatsAppCTA } from '@/components/ui/WhatsAppButton';

const benefits = [
  {
    title: 'First access',
    description: 'Be the first to know about new events, workshops, and opportunities.',
    icon: '🔔',
  },
  {
    title: 'Real network',
    description: 'Connect with ambitious students, founders, and mentors who actually show up.',
    icon: '🤝',
  },
  {
    title: 'Opportunities',
    description: 'Hear about internships, hackathons, and hiring before they go public.',
    icon: '🚀',
  },
  {
    title: 'Honest advice',
    description: 'Ask questions and get straight answers — no corporate fluff.',
    icon: '💬',
  },
];

export default async function CommunityPage() {
  const [settings, testimonials] = await Promise.all([
    fetchSiteSettings(),
    fetchTestimonials(),
  ]);

  const communityCount = settings.community_count || '';
  const whatsappUrl = isNavigableHref(settings.whatsapp_url)
    ? settings.whatsapp_url
    : undefined;

  return (
    <>
      <section className="bg-ink px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <p className="eyebrow text-canvas-soft/60">The community</p>
          <h1 className="mt-4 text-4xl font-medium text-canvas sm:text-5xl">
            {communityCount} students. One WhatsApp. Zero noise.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-canvas-soft/80">
            A focused community of learners who want more than what college offers.
          </p>
          <WhatsAppButton href={whatsappUrl || WHATSAPP_CHANNEL_URL} size="lg" className="mt-8">
            Join Now
          </WhatsAppButton>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-medium text-ink">What&apos;s inside</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="card p-6">
                <span className="text-3xl" aria-hidden="true">
                  {benefit.icon}
                </span>
                <h3 className="mt-4 text-lg font-medium text-ink">{benefit.title}</h3>
                <p className="mt-2 text-sm text-body">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="bg-canvas-soft px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-medium text-ink">What members say</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <blockquote key={testimonial.id} className="card flex flex-col p-6">
                  <p className="flex-1 text-body">&ldquo;{testimonial.quote}&rdquo;</p>
                  <footer className="mt-4 border-t border-mute/20 pt-4">
                    <p className="font-medium text-ink">{testimonial.name}</p>
                    <p className="text-sm text-body-mid">
                      {[testimonial.role, testimonial.college, testimonial.city]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      <WhatsAppCTA
        href={whatsappUrl || WHATSAPP_CHANNEL_URL}
        heading={`Ready to join ${communityCount}+ learners?`}
        subtext="No spam. No noise. Just a community that helps you grow."
      />
    </>
  );
}
