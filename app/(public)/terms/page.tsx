import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description:
    'The terms governing your use of Sarwagyna School — events, the WhatsApp community, certificates, payments, intellectual property, and liability.',
  keywords: [
    'Sarwagyna School terms',
    'terms and conditions',
    'Sarwagyna Private Limited',
    'event registration terms',
    'refund policy',
  ],
  alternates: { canonical: '/terms' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'article',
    siteName: 'Sarwagyna School',
    locale: 'en_IN',
    title: 'Terms and Conditions — Sarwagyna School',
    description: 'Read these before registering for any session or joining the community.',
    url: '/terms',
    modifiedTime: '2026-06-01T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms and Conditions — Sarwagyna School',
    description: 'Read these before registering for any session or joining the community.',
  },
};

const LAST_UPDATED = 'June 2026';
const EFFECTIVE = 'June 2026';

const toc = [
  { id: 'about', label: 'About Sarwagyna School' },
  { id: 'services', label: 'Our Services — Free and Paid' },
  { id: 'community', label: 'WhatsApp Community' },
  { id: 'events', label: 'Event Registration and Attendance' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'payments', label: 'Payments and Refunds' },
  { id: 'ip', label: 'Intellectual Property' },
  { id: 'conduct', label: 'User Conduct' },
  { id: 'liability', label: 'Disclaimer and Limitation of Liability' },
  { id: 'thirdparty', label: 'Third-Party Services' },
  { id: 'changes', label: 'Changes to These Terms' },
  { id: 'law', label: 'Governing Law' },
  { id: 'contact', label: 'Contact' },
];

function Divider() {
  return <div className="my-11 h-px bg-canvas-soft" />;
}

export default function TermsPage() {
  return (
    <>
      <section className="px-4 pt-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="border-b border-canvas-soft pb-11">
            <p className="eyebrow">Legal</p>
            <h1 className="mt-4 text-4xl font-medium tracking-tight text-ink sm:text-5xl">
              Terms and Conditions
            </h1>
            <p className="mt-4 max-w-xl text-body">
              Read these before registering for any session, joining the community, or using any
              service offered by Sarwagyna School.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-canvas-soft px-3 py-1 text-xs font-medium text-body">
                Effective: {EFFECTIVE}
              </span>
              <span className="rounded-full bg-canvas-soft px-3 py-1 text-xs font-medium text-body">
                Applies to: school.sarwagyna.com
              </span>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Last updated: {LAST_UPDATED}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          {/* Binding-agreement notice */}
          <div className="rounded-xl border border-primary/25 bg-primary/5 p-5">
            <p className="text-sm leading-relaxed text-ink-soft">
              <strong className="text-ink">Important:</strong> These terms constitute a legally
              binding agreement between you and Sarwagyna Private Limited. By accessing this website,
              joining our community, or registering for any event, you agree to these terms in full.
              If you do not agree, do not use our services.
            </p>
          </div>

          {/* Table of contents */}
          <div className="mt-10 rounded-xl bg-canvas-soft p-6 sm:p-7">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-body-mid">
              Contents
            </h2>
            <ol className="mt-4 list-decimal space-y-1.5 pl-5">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm text-primary hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Sections */}
          <div className="mt-12">
            <div id="about" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">01</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">About Sarwagyna School</h2>
              <p className="mt-4 text-body">
                Sarwagyna School is an educational initiative operated by{' '}
                <strong className="text-ink-soft">Sarwagyna Private Limited</strong> (CIN:
                U62013AP2026PTC124652), a company incorporated under the Companies Act, 2013. The
                school operates primarily through the website at{' '}
                <strong className="text-ink-soft">school.sarwagyna.com</strong> and associated
                platforms including WhatsApp.
              </p>
              <p className="mt-4 text-body">
                Sarwagyna School hosts live sessions, webinars, workshops, hackathons, and ideathons
                for students and young professionals. The school&apos;s mission is to provide
                practical knowledge on startup reality, investment fundamentals, AI tools, and career
                readiness — through sessions run by active founders and practitioners.
              </p>
            </div>

            <Divider />

            <div id="services" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">02</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">Our Services — Free and Paid</h2>
              <p className="mt-4 text-body">
                Sarwagyna School offers a mix of free and paid services. The following distinction
                applies to all current and future offerings:
              </p>
              <div className="mt-4 rounded-lg bg-canvas-soft p-5">
                <p className="text-sm text-ink">
                  <strong>Free services:</strong> The Sarwagyna School WhatsApp community channel is
                  permanently free to join and will remain free. Access to the community channel does
                  not require payment at any point.
                </p>
              </div>
              <div className="mt-4 rounded-lg bg-canvas-soft p-5">
                <p className="text-sm text-ink">
                  <strong>Not all sessions are free:</strong> While many live sessions including
                  webinars are offered at no cost, Sarwagyna School may offer workshops, cohort
                  programmes, courses, and specialised events at a fee. Paid sessions will be clearly
                  marked before registration. Free sessions will also be clearly labelled.
                </p>
              </div>
              <p className="mt-4 text-body">
                Sarwagyna School reserves the right to introduce, modify, or discontinue any service
                — paid or free — at any time with reasonable notice communicated through the website
                or community channel.
              </p>
              <p className="mt-4 text-body">
                Participation in any session, paid or free, does not guarantee employment, internship
                placement, mentorship, or any specific outcome. Sessions are educational in nature.
              </p>
            </div>

            <Divider />

            <div id="community" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">03</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">WhatsApp Community</h2>
              <p className="mt-4 text-body">
                The Sarwagyna School WhatsApp channel is a free broadcast and community channel. By
                joining, you agree to the{' '}
                <Link href="/community-guidelines" className="font-medium text-primary hover:underline">
                  Community Guidelines
                </Link>{' '}
                published on this website.
              </p>
              <p className="mt-4 text-body">
                Sarwagyna School uses the WhatsApp channel to share event announcements, session
                recordings, opportunities, and community updates. We do not use the channel for
                advertising unrelated products or services.
              </p>
              <p className="mt-4 text-body">
                WhatsApp is a third-party service operated by Meta Platforms, Inc. Your use of
                WhatsApp is subject to Meta&apos;s own terms of service and privacy policy. Sarwagyna
                School does not control WhatsApp&apos;s platform or data practices.
              </p>
              <p className="mt-4 text-body">
                Sarwagyna School does not access, store, or process your WhatsApp account data. Your
                phone number may be visible to other channel admins as required by WhatsApp&apos;s
                platform. We do not share WhatsApp numbers with third parties.
              </p>
            </div>

            <Divider />

            <div id="events" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">04</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">
                Event Registration and Attendance
              </h2>
              <p className="mt-4 text-body">
                Registering for a Sarwagyna School event requires you to provide basic personal
                details including your name and email address. By registering, you consent to us
                using this information to manage your participation in the event.
              </p>
              <p className="mt-4 text-body">
                Registration does not guarantee a seat. For high-demand events, Sarwagyna School may
                cap registrations at its sole discretion.
              </p>
              <p className="mt-4 text-body">
                Event details including date, time, format, and speakers are subject to change.
                Sarwagyna School will communicate material changes to registered attendees via email
                or the community channel where possible.
              </p>
              <p className="mt-4 text-body">
                Sarwagyna School may cancel or reschedule any event at any time. In the event of
                cancellation of a paid session, a refund will be issued in accordance with the
                Payments and Refunds policy below.
              </p>
              <p className="mt-4 text-body">
                Attendees must not record, screenshot, or redistribute session content without
                explicit written permission from Sarwagyna School and the relevant speaker.
              </p>
            </div>

            <Divider />

            <div id="certificates" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">05</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">Certificates</h2>
              <p className="mt-4 text-body">
                Sarwagyna School may issue participation or completion certificates for selected
                events at its sole discretion. The issuance of a certificate is not guaranteed for
                every session.
              </p>
              <p className="mt-4 text-body">
                Certificates issued by Sarwagyna School are acknowledgements of participation and do
                not constitute formal academic qualifications, professional certifications, or
                credentials recognised by any regulatory authority.
              </p>
              <p className="mt-4 text-body">
                Certificates can be verified at{' '}
                <strong className="text-ink-soft">school.sarwagyna.com/verify/[certificate-id]</strong>.
                Sarwagyna School reserves the right to revoke a certificate if it was issued in error
                or if the recipient is found to have violated these terms.
              </p>
            </div>

            <Divider />

            <div id="payments" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">06</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">Payments and Refunds</h2>
              <p className="mt-4 text-body">
                All paid sessions will display the applicable fee clearly before registration is
                completed. By completing payment, you confirm your acceptance of the session price
                and these terms.
              </p>
              <p className="mt-4 text-body">
                Payments are processed through third-party payment gateways. Sarwagyna School does not
                store payment card details. Payment processing is governed by the terms of the
                relevant payment gateway.
              </p>
              <p className="mt-4 text-body">
                <strong className="text-ink-soft">Refund policy:</strong> Refund requests for paid
                sessions must be submitted at least 48 hours before the session start time. Refunds
                are issued at Sarwagyna School&apos;s discretion. No refunds will be issued for
                no-shows or cancellations made within 48 hours of the session start.
              </p>
              <p className="mt-4 text-body">
                If a paid session is cancelled by Sarwagyna School, a full refund will be processed
                within 7 business days to the original payment method.
              </p>
            </div>

            <Divider />

            <div id="ip" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">07</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">Intellectual Property</h2>
              <p className="mt-4 text-body">
                All content published on school.sarwagyna.com — including text, design, graphics,
                logos, session recordings, course materials, and the Sarwachakra mark — is the
                intellectual property of Sarwagyna Private Limited or the respective content owner,
                and is protected under applicable copyright law.
              </p>
              <p className="mt-4 text-body">
                Speaker-contributed content — including slides, materials, and spoken content during
                sessions — remains the intellectual property of the respective speaker unless a
                separate written agreement states otherwise.
              </p>
              <p className="mt-4 text-body">
                You may not reproduce, copy, distribute, or commercially exploit any content from
                Sarwagyna School without prior written consent. Personal use and sharing of session
                links for non-commercial purposes is permitted.
              </p>
            </div>

            <Divider />

            <div id="conduct" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">08</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">User Conduct</h2>
              <p className="mt-4 text-body">
                By using Sarwagyna School&apos;s website or attending any session, you agree not to:
              </p>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-body">
                <li>Provide false information during registration or feedback submission</li>
                <li>Impersonate any person or organisation</li>
                <li>Disrupt any live session or community channel</li>
                <li>Use Sarwagyna School platforms for spam, solicitation, or unsolicited promotion</li>
                <li>Reproduce or redistribute session content without permission</li>
                <li>
                  Engage in any conduct that violates the{' '}
                  <Link
                    href="/community-guidelines"
                    className="font-medium text-primary hover:underline"
                  >
                    Community Guidelines
                  </Link>
                </li>
                <li>Use session access for commercial gain without written permission</li>
              </ul>
              <p className="mt-4 text-body">
                Sarwagyna School reserves the right to remove any user from the community, revoke
                event access, or pursue legal remedies for conduct that violates these terms.
              </p>
            </div>

            <Divider />

            <div id="liability" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">09</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">
                Disclaimer and Limitation of Liability
              </h2>
              <p className="mt-4 text-body">
                Sarwagyna School provides all sessions, content, and community access on an{' '}
                <strong className="text-ink-soft">&quot;as is&quot;</strong> basis. We do not warrant
                that sessions will be uninterrupted, error-free, or meet any specific expectations.
              </p>
              <p className="mt-4 text-body">
                Content shared in sessions reflects the personal views and experiences of the
                respective speakers. Sarwagyna School does not independently verify or endorse any
                information, opinion, or advice shared by speakers.
              </p>
              <p className="mt-4 text-body">
                Any decisions you make based on content from Sarwagyna School sessions — including
                career decisions, investment decisions, or business decisions — are made entirely at
                your own risk.
              </p>
              <p className="mt-4 text-body">
                To the fullest extent permitted by law, Sarwagyna Private Limited will not be liable
                for any direct, indirect, incidental, or consequential loss arising from your use of
                our services or reliance on session content.
              </p>
            </div>

            <Divider />

            <div id="thirdparty" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">10</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">Third-Party Services</h2>
              <p className="mt-4 text-body">
                Sarwagyna School uses third-party platforms to deliver its services, including but
                not limited to Zoom, WhatsApp, Supabase, and Vercel. Your use of these platforms is
                subject to their own terms and privacy policies.
              </p>
              <p className="mt-4 text-body">
                Links to external websites or platforms from school.sarwagyna.com do not constitute
                an endorsement. Sarwagyna School is not responsible for the content or practices of
                third-party sites.
              </p>
            </div>

            <Divider />

            <div id="changes" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">11</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">Changes to These Terms</h2>
              <p className="mt-4 text-body">
                Sarwagyna School reserves the right to update these Terms and Conditions at any time.
                Material changes will be announced via the website or community channel with at least
                7 days notice before taking effect.
              </p>
              <p className="mt-4 text-body">
                Continued use of our services after updated terms take effect constitutes your
                acceptance of the revised terms. The date of last update is shown at the top of this
                page.
              </p>
            </div>

            <Divider />

            <div id="law" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">12</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">Governing Law</h2>
              <p className="mt-4 text-body">
                These Terms and Conditions are governed by the laws of India. Any dispute arising
                under or in connection with these terms shall be subject to the exclusive
                jurisdiction of the courts having jurisdiction over Sarwagyna Private Limited&apos;s
                registered office.
              </p>
            </div>

            <Divider />

            <div id="contact" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">13</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">Contact</h2>
              <p className="mt-4 text-body">
                For any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="mt-4 rounded-lg bg-canvas-soft p-5">
                <p className="text-sm leading-relaxed text-ink">
                  <strong>Sarwagyna Private Limited</strong>
                  <br />
                  Operating as Sarwagyna School
                  <br />
                  CIN: U62013AP2026PTC124652
                  <br />
                  Website:{' '}
                  <a
                    href="https://school.sarwagyna.com"
                    className="font-medium text-primary hover:underline"
                  >
                    school.sarwagyna.com
                  </a>
                  <br />
                  Contact:{' '}
                  <Link href="/contact" className="font-medium text-primary hover:underline">
                    school.sarwagyna.com/contact
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
