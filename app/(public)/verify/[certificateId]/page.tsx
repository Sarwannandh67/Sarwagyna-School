import type { Metadata } from 'next';
import Link from 'next/link';
import { CertificateBadge } from '@/components/public/CertificateBadge';
import { Button } from '@/components/ui/Button';
import { fetchCertificateById } from '@/lib/data/public';
import { eventTypeLabels, formatDate } from '@/lib/utils';

const BASE = 'https://school.sarwagyna.com';

interface VerifyPageProps {
  params: { certificateId: string };
}

export async function generateMetadata({ params }: VerifyPageProps): Promise<Metadata> {
  const cert = await fetchCertificateById(params.certificateId);
  if (!cert) {
    return {
      title: 'Certificate Not Found — Sarwagyna School',
      robots: { index: false },
    };
  }
  const title = `Certificate Verified — ${cert.recipient_name} | Sarwagyna School`;
  const description = `Verify the Sarwagyna School ${cert.certificate_type} certificate issued to ${cert.recipient_name}${cert.event ? ` for ${cert.event.title}` : ''}. Certificate ID: ${cert.certificate_id}`;
  const url = `${BASE}/verify/${cert.certificate_id}`;
  return {
    title,
    description,
    robots: { index: true, follow: false },
    openGraph: {
      title: `Certificate Verified — ${cert.recipient_name}`,
      description,
      url,
    },
    alternates: { canonical: url },
  };
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const certificate = await fetchCertificateById(params.certificateId);

  if (!certificate) {
    return (
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[12px] border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-lg font-medium text-red-900">
              Certificate not found or has been revoked.
            </p>
            <p className="mt-2 text-sm text-red-700">
              The certificate ID &ldquo;{params.certificateId}&rdquo; could not be verified. Please
              check the ID and try again.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Button href="/" variant="dark" size="md">
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const certJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    name: `Sarwagyna School ${certificate.certificate_type} Certificate`,
    credentialCategory: certificate.certificate_type,
    identifier: certificate.certificate_id,
    dateCreated: certificate.issued_date,
    recognizedBy: { '@type': 'EducationalOrganization', name: 'Sarwagyna School', url: BASE },
    about: certificate.event
      ? { '@type': 'EducationalEvent', name: certificate.event.title }
      : undefined,
  };

  return (
    <section className="px-4 py-16 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(certJsonLd) }} />
      <div className="mx-auto max-w-2xl">
        <div className="rounded-[12px] border border-green-200 bg-green-50 p-6 text-center">
          <p className="text-lg font-medium text-green-900">Certificate verified successfully</p>
        </div>

        <div className="card mt-8 p-6 sm:p-8">
          <p className="eyebrow">Certificate ID</p>
          <p className="mt-2 font-mono text-2xl font-medium text-ink">
            {certificate.certificate_id}
          </p>

          <div className="mt-8 space-y-4 border-t border-mute/20 pt-8">
            <div>
              <p className="text-sm text-body-mid">Recipient</p>
              <p className="text-lg font-medium text-ink">{certificate.recipient_name}</p>
            </div>

            {certificate.event && (
              <>
                <div>
                  <p className="text-sm text-body-mid">Event</p>
                  <p className="text-lg font-medium text-ink">{certificate.event.title}</p>
                </div>
                <div>
                  <p className="text-sm text-body-mid">Event type</p>
                  <p className="text-body">{eventTypeLabels[certificate.event.event_type]}</p>
                </div>
              </>
            )}

            <div>
              <p className="text-sm text-body-mid">Issued date</p>
              <p className="text-body">{formatDate(certificate.issued_date)}</p>
            </div>

            <div>
              <p className="text-sm text-body-mid">Certificate type</p>
              <CertificateBadge type={certificate.certificate_type} className="mt-1" />
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-body-mid">
            Issued by Sarwagyna School, a Sarwagyna Private Limited Initiative
          </p>

          {certificate.pdf_url && (
            <div className="mt-6 text-center">
              <Button href={certificate.pdf_url} variant="primary" size="md">
                Download PDF
              </Button>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-body">
          Need help?{' '}
          <Link href="/contact?type=certificate" className="font-medium text-primary hover:underline">
            Contact us
          </Link>
        </p>
      </div>
    </section>
  );
}
