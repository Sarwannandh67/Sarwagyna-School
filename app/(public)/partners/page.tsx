export const revalidate = 3600;

import type { Metadata } from 'next';
import { PartnerApplyForm } from '@/components/public/PartnerApplyForm';

export const metadata: Metadata = {
  title: 'Partner with Sarwagyna School — Reach 410+ Students',
  description:
    'Partner with Sarwagyna School to reach 410+ driven Indian college students. Speaking partnerships, hiring pipelines, sponsorships, and knowledge partnerships available.',
  keywords: [
    'partner with student community India',
    'edtech partnership India',
    'sponsor student events India',
    'hire interns from student community India',
  ],
  openGraph: {
    title: 'Partner with Sarwagyna School — Reach 410+ Students',
    description: 'Grow your brand with 410+ ambitious Indian students. Speaking, hiring, sponsoring, and knowledge partnerships.',
    url: 'https://school.sarwagyna.com/partners',
    images: [{ url: '/og/partners.png', width: 1200, height: 630, alt: 'Partner with Sarwagyna School' }],
  },
  alternates: { canonical: 'https://school.sarwagyna.com/partners' },
};
import { PartnerCard } from '@/components/public/PartnerCard';
import { Button } from '@/components/ui/Button';
import { fetchPartners, fetchSiteSettings } from '@/lib/data/public';

const valueProps = [
  {
    title: 'Audience access',
    description: 'Reach 400+ ambitious students actively School about startups, careers, and tech.',
    icon: '👥',
  },
  {
    title: 'Speak and teach',
    description: 'Host workshops, webinars, or mentorship sessions with an engaged audience.',
    icon: '🎤',
  },
  {
    title: 'Hiring pipeline',
    description: 'Connect with talented students for internships and early-career roles.',
    icon: '📋',
  },
  {
    title: 'Brand credibility',
    description: 'Associate with a growing edtech brand focused on real-world education.',
    icon: '⭐',
  },
];

const partnershipTypes = [
  {
    title: 'Speaking',
    description: 'Host sessions, workshops, or fireside chats with our community.',
  },
  {
    title: 'Hiring pipeline',
    description: 'Post opportunities and connect with pre-vetted student talent.',
  },
  {
    title: 'Sponsoring',
    description: 'Support events and programs in exchange for brand visibility.',
  },
  {
    title: 'Knowledge',
    description: 'Share resources, tools, or expertise with our learners.',
  },
];

export default async function PartnersPage() {
  const [partners, settings] = await Promise.all([fetchPartners(), fetchSiteSettings()]);

  const communityCount = settings.community_count || '';

  return (
    <>
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Partnerships</p>
          <h1 className="mt-4 text-4xl font-medium text-ink sm:text-5xl">
            Grow with {communityCount}+ ambitious students.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-body">
            Partner with Sarwagyna School to reach motivated learners, share knowledge, and build
            your hiring pipeline.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#apply" variant="primary" size="lg">
              Apply to Partner
            </Button>
            <Button href="/contact?type=partnership" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-canvas-soft px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-medium text-ink">Why partner with us</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((prop) => (
              <div key={prop.title} className="card p-6">
                <span className="text-3xl" aria-hidden="true">
                  {prop.icon}
                </span>
                <h3 className="mt-4 text-lg font-medium text-ink">{prop.title}</h3>
                <p className="mt-2 text-sm text-body">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-medium text-ink">Partnership types</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partnershipTypes.map((type) => (
              <div key={type.title} className="card-outlined p-6">
                <h3 className="text-lg font-medium text-ink">{type.title}</h3>
                <p className="mt-2 text-sm text-body">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {partners.length > 0 && (
        <section className="bg-canvas-soft px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-medium text-ink">Our partners</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {partners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="apply" className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-xl">
          <h2 className="text-2xl font-medium text-ink">Apply to partner</h2>
          <p className="mt-2 text-body">
            Tell us about your company and how you&apos;d like to collaborate. We&apos;ll get back
            to you within a few business days.
          </p>
          <div className="card mt-8 p-6 sm:p-8">
            <PartnerApplyForm />
          </div>
        </div>
      </section>
    </>
  );
}
