import { notFound } from 'next/navigation';
import { getCertificate } from '@/lib/actions/certificates';
import { supabaseAdmin } from '@/lib/supabase/server';
import { CertificateIssueForm } from '@/components/admin/CertificateIssueForm';
import type { Event } from '@/types/database';

export default async function EditCertificatePage({ params }: { params: { id: string } }) {
  const [certificate, { data: events }] = await Promise.all([
    getCertificate(params.id),
    supabaseAdmin.from('events').select('*').order('title'),
  ]);

  if (!certificate) notFound();

  return (
    <CertificateIssueForm
      certificate={certificate}
      events={(events ?? []) as Event[]}
    />
  );
}
