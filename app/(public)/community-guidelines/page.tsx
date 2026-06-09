import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Community Guidelines — Sarwagyna School',
  description:
    'The rules of the Sarwagyna School WhatsApp community. Ten guidelines every member must follow.',
  openGraph: {
    title: 'Community Guidelines — Sarwagyna School',
    description: 'Ten rules. One community. Read before joining.',
    url: 'https://school.sarwagyna.com/community-guidelines',
  },
  robots: { index: true, follow: false },
  alternates: { canonical: 'https://school.sarwagyna.com/community-guidelines' },
};

const rules = [
  {
    number: '01',
    title: 'Respect everyone',
    description:
      'Treat every member with dignity. Disagree with ideas, not people. No personal attacks, bullying, or harassment.',
  },
  {
    number: '02',
    title: 'Stay on topic',
    description:
      'Keep discussions relevant to School, careers, startups, and opportunities. Use threads for specific topics when possible.',
  },
  {
    number: '03',
    title: 'No spam or unsolicited promotion',
    description:
      'Do not post ads, referral links, or promote your product/service without admin approval. One genuine share is fine; repeated promotion is not.',
  },
  {
    number: '04',
    title: 'Share only verified information',
    description:
      'Before sharing news, job posts, or opportunities, verify they are real. Misinformation hurts the community.',
  },
  {
    number: '05',
    title: "Protect everyone's privacy",
    description:
      'Do not share screenshots, phone numbers, or personal details from the group outside without consent.',
  },
  {
    number: '06',
    title: 'No hate speech or discrimination',
    description:
      'Zero tolerance for hate speech, casteism, sexism, racism, or discrimination of any kind. Instant permanent ban.',
  },
  {
    number: '07',
    title: 'Ask questions openly',
    description:
      'There are no stupid questions. The community exists so you can learn without judgment.',
  },
  {
    number: '08',
    title: 'Give more than you take',
    description:
      'Share resources, answer questions, and help others when you can. A strong community is built on reciprocity.',
  },
  {
    number: '09',
    title: 'English or Telugu only',
    description:
      'Use English or Telugu so everyone can participate. Avoid mixing too many languages in one message.',
  },
  {
    number: '10',
    title: 'Admins have the final word',
    description:
      'Admins may remove content or members to keep the community healthy. Their decisions are final.',
  },
];

const dos = [
  'Introduce yourself when you join',
  'Share useful resources and opportunities',
  'Help fellow members with genuine advice',
  'Report rule violations to admins',
  'Celebrate others\' wins',
];

const donts = [
  'Post unrelated memes or forwards',
  'DM members for sales without permission',
  'Share pirated content or exam leaks',
  'Argue endlessly in the group',
  'Create drama or call-outs publicly',
];

const LAST_UPDATED = 'June 2026';

export default function CommunityGuidelinesPage() {
  return (
    <>
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Community</p>
          <h1 className="mt-4 text-4xl font-medium text-ink sm:text-5xl">Community guidelines.</h1>
          <p className="mt-4 text-body-mid">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="card p-6 sm:p-8">
            <h2 className="text-xl font-medium text-ink">Why these rules exist</h2>
            <p className="mt-4 text-body">
              Sarwagyna School&apos;s WhatsApp community is a space for ambitious students to learn,
              connect, and grow. These guidelines keep it useful, respectful, and free of noise —
              so every member gets real value.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-medium text-ink">The rules</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {rules.map((rule) => (
              <div key={rule.number} className="card p-6">
                <span className="text-sm font-medium text-primary">{rule.number}</span>
                <h3 className="mt-2 text-lg font-medium text-ink">{rule.title}</h3>
                <p className="mt-2 text-sm text-body">{rule.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-canvas-soft px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-medium text-ink">Do / Don&apos;t</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="card p-6">
              <h3 className="text-lg font-medium text-green-800">Do</h3>
              <ul className="mt-4 space-y-2">
                {dos.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-body">
                    <span className="text-green-600">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-medium text-red-800">Don&apos;t</h3>
              <ul className="mt-4 space-y-2">
                {donts.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-body">
                    <span className="text-red-600">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="card-dark p-8">
            <h2 className="text-2xl font-medium text-canvas">Enforcement</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-canvas-soft">Warning</p>
                <p className="mt-2 text-sm text-canvas-soft/70">
                  First-time minor violations receive a private warning from admins.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-canvas-soft">Removed</p>
                <p className="mt-2 text-sm text-canvas-soft/70">
                  Repeated violations or serious misconduct results in removal from the group.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-canvas-soft">Permanent ban</p>
                <p className="mt-2 text-sm text-canvas-soft/70">
                  Hate speech, harassment, or severe violations = instant permanent ban. No appeals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="card-outlined p-6">
            <h2 className="text-lg font-medium text-ink">Reporting violations</h2>
            <p className="mt-2 text-body">
              If you see someone breaking these rules, message an admin directly or use the contact
              form. Do not call people out publicly in the group.
            </p>
          </div>
          <div className="card-outlined p-6">
            <h2 className="text-lg font-medium text-ink">Amendments</h2>
            <p className="mt-2 text-body">
              These guidelines may be updated as the community grows. Significant changes will be
              announced in the WhatsApp group.
            </p>
          </div>
          <div className="card-outlined p-6">
            <h2 className="text-lg font-medium text-ink">Questions?</h2>
            <p className="mt-2 text-body">
              Reach out via our{' '}
              <Link href="/contact" className="font-medium text-primary hover:underline">
                contact page
              </Link>{' '}
              if you have questions about these guidelines.
            </p>
            <Button href="/community" variant="outline" size="md" className="mt-4">
              Back to Community
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
