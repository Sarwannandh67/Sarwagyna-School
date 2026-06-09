import type { Metadata } from 'next';
import { VerifyForm } from '@/components/public/VerifyForm';

export const metadata: Metadata = {
  title: 'Verify Certificate — Sarwagyna School',
  description:
    'Verify the authenticity of a Sarwagyna School certificate. Enter your certificate ID to confirm it is valid and was issued by Sarwagyna School.',
  openGraph: {
    title: 'Verify Certificate — Sarwagyna School',
    description: 'Confirm the authenticity of a Sarwagyna School certificate.',
    url: 'https://school.sarwagyna.com/verify',
  },
  alternates: { canonical: 'https://school.sarwagyna.com/verify' },
};

export default function VerifyLandingPage() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-lg text-center">
        <p className="eyebrow">Certificate Verification</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">Verify your certificate</h1>
        <p className="mt-4 text-body">
          Enter the certificate ID printed on your Sarwagyna School certificate to confirm its
          authenticity.
        </p>
        <VerifyForm />
      </div>
    </section>
  );
}
