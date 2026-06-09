import type { Metadata } from 'next';
import { ContactForm } from '@/components/public/ContactForm';
import Link from 'next/link';
import type { InquiryType } from '@/types/database';

export const metadata: Metadata = {
  title: 'Contact Sarwagyna School',
  description:
    'Get in touch with Sarwagyna School. For speaker applications, partnership enquiries, or general questions — we read every message.',
  openGraph: {
    title: 'Contact Sarwagyna School',
    description: 'We read every message. Reach us for speaker, partnership, or general enquiries.',
    url: 'https://school.sarwagyna.com/contact',
  },
  robots: { index: true, follow: false },
  alternates: { canonical: 'https://school.sarwagyna.com/contact' },
};
import { fetchSiteSettings } from '@/lib/data/public';

const validInquiryTypes: InquiryType[] = [
  'general',
  'speaker',
  'partnership',
  'webinar',
  'certificate',
];

const quickLinks = [
  {
    title: 'Speak at an event',
    description: 'Apply to teach a session. The room will remember you.',
    href: '/contact?type=speaker',
  },
  {
    title: 'Partner with us',
    description: 'Explore sponsorship, hiring, and collaboration opportunities.',
    href: '/partners',
  },
  {
    title: 'Verify a certificate',
    description: 'Check if a Sarwagyna School certificate is valid.',
    href: '/verify',
  },
  {
    title: 'Join the community',
    description: 'Where opportunities land before they go public.',
    href: '/community',
  },
];

interface ContactPageProps {
  searchParams: { type?: string };
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const settings = await fetchSiteSettings();
  const contactEmail = settings.contact_email;
  const defaultType = validInquiryTypes.includes(searchParams.type as InquiryType)
    ? (searchParams.type as InquiryType)
    : 'general';

  return (
    <>
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 text-4xl font-medium text-ink sm:text-5xl">We read every message.</h1>
          <p className="mt-4 max-w-2xl text-lg text-body">
            Founder wanting to speak. Company wanting to partner. Student with a question.
            We respond to all of it. Usually within 48 hours.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            {contactEmail && (
              <div className="card p-6">
                <h2 className="text-lg font-medium text-ink">Email us</h2>
                <a
                  href={`mailto:${contactEmail}`}
                  className="mt-2 block text-primary hover:underline"
                >
                  {contactEmail}
                </a>
              </div>
            )}

            <div className="mt-6 space-y-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="card block p-5 transition-colors hover:bg-canvas"
                >
                  <h3 className="font-medium text-ink">{link.title}</h3>
                  <p className="mt-1 text-sm text-body">{link.description}</p>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              {settings.linkedin_url && (
                <a
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-body-mid hover:text-ink"
                >
                  LinkedIn
                </a>
              )}
              {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-body-mid hover:text-ink"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>

          <div className="card p-6 sm:p-8">
            <h2 className="text-lg font-medium text-ink">Send a message</h2>
            <div className="mt-6">
              <ContactForm defaultInquiryType={defaultType} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
