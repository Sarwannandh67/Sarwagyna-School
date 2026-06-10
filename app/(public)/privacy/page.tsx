import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'What personal data Sarwagyna School collects, how it is used, who it is shared with, how long it is kept, and your rights over it.',
  keywords: [
    'Sarwagyna School privacy policy',
    'data protection',
    'personal data',
    'data deletion request',
    'Sarwagyna Private Limited',
  ],
  alternates: { canonical: '/privacy' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'article',
    siteName: 'Sarwagyna School',
    locale: 'en_IN',
    title: 'Privacy Policy — Sarwagyna School',
    description:
      'We never sell your data. Read exactly what we collect, why, who we share it with, and how to request deletion.',
    url: '/privacy',
    modifiedTime: '2026-06-01T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — Sarwagyna School',
    description:
      'We never sell your data. Read exactly what we collect, why, who we share it with, and how to request deletion.',
  },
};

const EFFECTIVE = 'June 2026';

const toc = [
  { id: 'controller', label: 'Data Controller' },
  { id: 'collect', label: 'What Data We Collect' },
  { id: 'how', label: 'How We Collect It' },
  { id: 'use', label: 'How We Use Your Data' },
  { id: 'sharing', label: 'Who We Share It With' },
  { id: 'nosell', label: 'What We Never Do With Your Data' },
  { id: 'retention', label: 'How Long We Keep It' },
  { id: 'rights', label: 'Your Rights' },
  { id: 'cookies', label: 'Cookies and Analytics' },
  { id: 'thirdparty', label: 'Third-Party Platforms' },
  { id: 'children', label: 'Children' },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact and Data Requests' },
];

const commitments = [
  'We do not sell your personal data to anyone, ever.',
  'We do not use your data for advertising on external platforms.',
  'We collect only what we need to run sessions and improve our services.',
  'We share your data only with speakers, partners, and hosts for the specific event or service you registered for — and only as needed.',
  'You can request deletion of your data at any time by contacting us.',
];

const collectRows: [string, React.ReactNode][] = [
  ['Event registration', 'Name, email address, college or institution (optional), city (optional), phone (optional)'],
  ['Contact form', 'Name, email address, message content, inquiry type, phone (optional), college (optional)'],
  ['Feedback form', 'Name, email (optional), college (optional), city (optional), role or year of study (optional), star rating, feedback text'],
  ['Partner application', 'Company name, contact name, email, phone (optional), website, partnership type, message'],
  ['WhatsApp community', 'We do not collect or store WhatsApp data. Your phone number is managed by WhatsApp/Meta, not by us.'],
  ['Certificates', 'Name, email (optional), event attended, certificate type, issue date'],
  ['Website usage', 'Page views, session duration, device type (via analytics tools). This data is aggregated and not linked to individuals.'],
];

const retentionRows: [string, string][] = [
  ['Event registration data', '2 years from event date, or until deletion is requested'],
  ['Contact form submissions', '1 year from submission, or until resolved'],
  ['Feedback submissions', 'Indefinitely while the school operates (forms part of public record)'],
  ['Certificate records', 'Indefinitely (required for verification purposes)'],
  ['Partner applications', '2 years from submission'],
  ['Analytics data', 'Aggregated, no personal identifiers, retained indefinitely'],
];

const rights = [
  { title: 'Right to access', body: 'Request a copy of all personal data we hold about you.' },
  { title: 'Right to correction', body: 'Ask us to correct inaccurate or incomplete personal data.' },
  {
    title: 'Right to deletion',
    body: 'Request deletion of your personal data. Some data may be retained for legal or verification purposes.',
  },
  {
    title: 'Right to withdraw consent',
    body: 'Withdraw consent for specific uses of your data at any time, without affecting prior processing.',
  },
  {
    title: 'Right to object',
    body: 'Object to specific uses of your personal data where we process it under our legitimate interests.',
  },
  { title: 'Right to portability', body: 'Request your data in a portable, machine-readable format.' },
];

function Divider() {
  return <div className="my-11 h-px bg-canvas-soft" />;
}

function DataTable({
  cols,
  rows,
}: {
  cols: [string, string];
  rows: [string, React.ReactNode][];
}) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-canvas-soft">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-ink text-left text-xs font-semibold uppercase tracking-wide text-on-primary">
            <th className="px-4 py-3">{cols[0]}</th>
            <th className="px-4 py-3">{cols[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 1 ? 'bg-canvas-soft/60' : undefined}>
              <td className="border-t border-canvas-soft px-4 py-3 align-top font-medium text-ink-soft">
                {row[0]}
              </td>
              <td className="border-t border-canvas-soft px-4 py-3 align-top leading-relaxed text-body">
                {row[1]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <section className="px-4 pt-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="border-b border-canvas-soft pb-11">
            <p className="eyebrow">Legal</p>
            <h1 className="mt-4 text-4xl font-medium tracking-tight text-ink sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 max-w-xl text-body">
              This policy explains what personal data Sarwagyna School collects, how it is used, who
              it is shared with, and what your rights are.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-canvas-soft px-3 py-1 text-xs font-medium text-body">
                Effective: {EFFECTIVE}
              </span>
              <span className="rounded-full bg-canvas-soft px-3 py-1 text-xs font-medium text-body">
                Applies to: school.sarwagyna.com
              </span>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                We do not sell your data
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          {/* Core commitment upfront */}
          <div className="rounded-xl bg-ink p-6 sm:p-7">
            <h2 className="text-base font-semibold text-on-primary">
              Our privacy commitments — before you read anything else.
            </h2>
            <ul className="mt-4 space-y-2.5">
              {commitments.map((c) => (
                <li key={c} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-0.5 font-bold text-primary">
                    ✓
                  </span>
                  <span className="text-sm leading-relaxed text-canvas-soft">{c}</span>
                </li>
              ))}
            </ul>
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
            <div id="controller" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">01</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">Data Controller</h2>
              <p className="mt-4 text-body">
                The data controller for all personal data collected through school.sarwagyna.com and
                its associated services is:
              </p>
              <div className="mt-4 rounded-lg bg-canvas-soft p-5">
                <p className="text-sm leading-relaxed text-ink">
                  <strong>Sarwagyna Private Limited</strong>
                  <br />
                  CIN: U62013AP2026PTC124652
                  <br />
                  Operating as: Sarwagyna School
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
              <p className="mt-4 text-body">
                This Privacy Policy applies to all personal data collected through our website, event
                registrations, contact forms, feedback submissions, partner applications, and any
                other interaction with Sarwagyna School&apos;s digital platforms.
              </p>
            </div>

            <Divider />

            <div id="collect" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">02</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">What Data We Collect</h2>
              <p className="mt-4 text-body">
                The following table details what personal data we collect and where:
              </p>
              <DataTable cols={['Where collected', 'Data collected']} rows={collectRows} />
              <p className="mt-4 text-body">
                We do not collect sensitive personal data such as financial information, government
                identification numbers, biometric data, or health information.
              </p>
            </div>

            <Divider />

            <div id="how" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">03</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">How We Collect It</h2>
              <p className="mt-4 text-body">
                We collect personal data only when you actively provide it to us through:
              </p>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-body">
                <li>Registering for an event on school.sarwagyna.com</li>
                <li>Submitting a contact, feedback, or partner application form</li>
                <li>Requesting a certificate or verifying one</li>
                <li>Directly emailing or messaging us</li>
              </ul>
              <p className="mt-4 text-body">
                We do not collect personal data passively beyond basic analytics (page views and
                session data) which does not identify individuals.
              </p>
              <p className="mt-4 text-body">
                We do not purchase data from third parties. We do not use tracking pixels from social
                media platforms on our website.
              </p>
            </div>

            <Divider />

            <div id="use" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">04</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">How We Use Your Data</h2>
              <p className="mt-4 text-body">
                We use the data you provide only for the following purposes:
              </p>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-body">
                <li>To confirm your event registration and send event details</li>
                <li>To issue participation certificates and enable certificate verification</li>
                <li>To respond to your contact form enquiries</li>
                <li>
                  To display approved feedback on the public feedbacks page (name and college only —
                  email is never displayed publicly)
                </li>
                <li>To manage partner applications and facilitate partnerships</li>
                <li>
                  To improve our sessions, community, and website based on aggregated usage patterns
                </li>
                <li>To communicate important updates about events you have registered for</li>
              </ul>
              <p className="mt-4 text-body">
                We do not use your data for automated profiling, behavioural advertising, or any
                purpose not listed above without obtaining your explicit consent first.
              </p>
            </div>

            <Divider />

            <div id="sharing" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">05</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">Who We Share It With</h2>
              <p className="mt-4 text-body">
                We share personal data in limited, specific circumstances only. We are transparent
                about every case:
              </p>

              <div className="mt-4 rounded-lg bg-canvas-soft p-5">
                <p className="text-sm leading-relaxed text-ink">
                  <strong>Speakers:</strong> When you register for an event, your registration
                  details (name and any details you provided) may be shared with the speaker or panel
                  of speakers for that specific event. This helps speakers prepare for attendee
                  questions and facilitates post-session follow-up where you have indicated interest.
                  Speakers are required to treat this data with confidentiality and not use it for
                  unrelated purposes.
                </p>
              </div>

              <div className="mt-4 rounded-lg bg-canvas-soft p-5">
                <p className="text-sm leading-relaxed text-ink">
                  <strong>Partners:</strong> If you apply for a partnership with Sarwagyna School,
                  your application details are shared internally with the Sarwagyna School team. If
                  your application leads to an active partnership, relevant contact information may be
                  shared with the Sarwagyna team managing that partnership. Partner data is not shared
                  with unrelated third parties.
                </p>
              </div>

              <div className="mt-4 rounded-lg bg-canvas-soft p-5">
                <p className="text-sm leading-relaxed text-ink">
                  <strong>Event hosts:</strong> For events co-hosted with an external organisation or
                  individual, attendee registration data may be shared with the co-host for the sole
                  purpose of managing that specific event. The co-host and event relationship will be
                  disclosed on the event page before registration.
                </p>
              </div>

              <div className="mt-4 rounded-lg bg-canvas-soft p-5">
                <p className="text-sm leading-relaxed text-ink">
                  <strong>Service providers:</strong> We use third-party infrastructure services
                  including Supabase (database hosting), Vercel (website hosting), and email delivery
                  services. These providers process your data on our behalf under data processing
                  agreements and are not permitted to use your data for their own purposes.
                </p>
              </div>

              <div className="mt-4 rounded-lg border border-primary/25 bg-primary/5 p-5">
                <p className="text-sm leading-relaxed text-ink-soft">
                  <strong className="text-ink">Legal obligations:</strong> We may disclose personal
                  data if required to do so by law, court order, or government authority. We will
                  notify you of such a requirement to the extent permitted by law.
                </p>
              </div>
            </div>

            <Divider />

            <div id="nosell" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">06</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">
                What We Never Do With Your Data
              </h2>

              <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-5">
                <p className="text-sm leading-relaxed text-green-800">
                  We do not sell, rent, trade, or commercially transfer your personal data to any
                  third party. This applies to all data collected across all Sarwagyna School
                  platforms — website forms, event registrations, feedback, and partner applications.
                </p>
              </div>

              <p className="mt-4 text-body">Additionally, we never:</p>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-body">
                <li>Share your data with advertisers or advertising networks</li>
                <li>Use your data to build advertising profiles on external platforms</li>
                <li>Share your data with unrelated companies for their own marketing</li>
                <li>Share email addresses or contact details publicly without consent</li>
                <li>
                  Use personal data for purposes beyond what is stated in this policy without explicit
                  consent
                </li>
              </ul>
            </div>

            <Divider />

            <div id="retention" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">07</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">How Long We Keep It</h2>
              <p className="mt-4 text-body">
                We retain personal data for as long as necessary to fulfil the purpose for which it
                was collected, or as required by applicable law.
              </p>
              <DataTable cols={['Data type', 'Retention period']} rows={retentionRows} />
              <p className="mt-4 text-body">
                You may request deletion of your personal data at any time. Certificate records are
                retained even after a deletion request to maintain the integrity of the verification
                system — the recipient name on a certificate cannot be retroactively removed.
              </p>
            </div>

            <Divider />

            <div id="rights" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">08</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">Your Rights</h2>
              <p className="mt-4 text-body">
                You have the following rights over your personal data held by Sarwagyna School. To
                exercise any of these rights, contact us at{' '}
                <Link href="/contact" className="font-medium text-primary hover:underline">
                  school.sarwagyna.com/contact
                </Link>
                .
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {rights.map((r) => (
                  <div key={r.title} className="rounded-lg bg-canvas-soft p-4">
                    <h3 className="text-sm font-semibold text-ink">{r.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-body">{r.body}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-body">
                We will respond to data rights requests within 30 days. Requests are free of charge
                unless they are repetitive or manifestly unfounded.
              </p>
            </div>

            <Divider />

            <div id="cookies" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">09</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">Cookies and Analytics</h2>
              <p className="mt-4 text-body">
                school.sarwagyna.com uses minimal cookies required for the website to function. We do
                not use third-party advertising cookies or social media tracking pixels.
              </p>
              <p className="mt-4 text-body">
                We may use a privacy-focused analytics tool to understand how visitors use our
                website. This data is aggregated and anonymised — it does not identify individual
                visitors and is not linked to personal data you submit through forms.
              </p>
              <p className="mt-4 text-body">
                By using our website, you consent to the use of essential functional cookies. You can
                disable cookies in your browser settings, though some website functionality may be
                affected.
              </p>
            </div>

            <Divider />

            <div id="thirdparty" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">10</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">Third-Party Platforms</h2>
              <p className="mt-4 text-body">
                Sarwagyna School uses the following third-party platforms which may process your data
                as part of service delivery:
              </p>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-body">
                <li>
                  <strong className="text-ink-soft">WhatsApp (Meta):</strong> Community channel.
                  Governed by Meta&apos;s privacy policy. We do not access or store your WhatsApp data.
                </li>
                <li>
                  <strong className="text-ink-soft">Zoom:</strong> Used for live sessions. Zoom&apos;s
                  privacy policy applies to session data. We do not share your registration data with
                  Zoom beyond what is necessary for session access.
                </li>
                <li>
                  <strong className="text-ink-soft">Supabase:</strong> Database hosting for website
                  data. Processes data on our behalf.
                </li>
                <li>
                  <strong className="text-ink-soft">Vercel:</strong> Website hosting. Processes
                  server-side request data.
                </li>
                <li>
                  <strong className="text-ink-soft">Unstop:</strong> Third-party event listing
                  platform used to promote some events. If you register via Unstop, their privacy
                  policy applies to data collected through their platform.
                </li>
              </ul>
              <p className="mt-4 text-body">
                Our website may contain links to third-party websites. Sarwagyna School is not
                responsible for the privacy practices of those sites.
              </p>
            </div>

            <Divider />

            <div id="children" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">11</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">Children</h2>
              <p className="mt-4 text-body">
                Sarwagyna School&apos;s services are intended for students aged 16 and above. We do
                not knowingly collect personal data from children under 16. If you believe a child
                under 16 has provided us with personal data, please contact us and we will delete it
                promptly.
              </p>
            </div>

            <Divider />

            <div id="changes" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">12</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">Changes to This Policy</h2>
              <p className="mt-4 text-body">
                We may update this Privacy Policy from time to time. When we make material changes, we
                will update the effective date at the top of this page and notify the community via
                the WhatsApp channel.
              </p>
              <p className="mt-4 text-body">
                Continued use of Sarwagyna School services after an updated policy takes effect
                constitutes acceptance of the revised policy.
              </p>
            </div>

            <Divider />

            <div id="contact" className="scroll-mt-24">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">13</span>
              <h2 className="mt-2 text-2xl font-medium text-ink">Contact and Data Requests</h2>
              <p className="mt-4 text-body">
                For any privacy-related questions, data access requests, deletion requests, or
                concerns about how we handle your personal data:
              </p>
              <div className="mt-4 rounded-lg bg-canvas-soft p-5">
                <p className="text-sm leading-relaxed text-ink">
                  <strong>Sarwagyna Private Limited</strong>
                  <br />
                  CIN: U62013AP2026PTC124652
                  <br />
                  Contact form:{' '}
                  <Link href="/contact" className="font-medium text-primary hover:underline">
                    school.sarwagyna.com/contact
                  </Link>
                  <br />
                  Select inquiry type: <em>General Inquiry</em> and reference &quot;Privacy
                  Request&quot; in your message.
                </p>
              </div>
              <p className="mt-4 text-body">
                We will acknowledge your request within 72 hours and respond in full within 30 days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
