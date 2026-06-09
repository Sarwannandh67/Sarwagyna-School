import { supabaseAdmin } from '@/lib/supabase/server';
import { getNextCertificateId } from '@/lib/actions/certificates';
import { CertificateIssueForm } from '@/components/admin/CertificateIssueForm';
import type { Event } from '@/types/database';

export default async function NewCertificatePage() {
  const [{ data: events }, nextId] = await Promise.all([
    supabaseAdmin.from('events').select('*').order('title'),
    getNextCertificateId(),
  ]);

  return (
    <CertificateIssueForm
      events={(events ?? []) as Event[]}
      defaultCertificateId={nextId}
    />
  );
}
