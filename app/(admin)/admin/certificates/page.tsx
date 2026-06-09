import { getCertificates } from '@/lib/actions/certificates';
import { supabaseAdmin } from '@/lib/supabase/server';
import { CertificatesListClient } from '@/components/admin/CertificatesListClient';
import type { Certificate } from '@/types/database';

export default async function AdminCertificatesPage({
  searchParams,
}: {
  searchParams: { event?: string };
}) {
  const currentEventId = searchParams.event ?? 'all';

  const [{ data: allCerts }, { data: events }] = await Promise.all([
    supabaseAdmin.from('certificates').select('*, event:events(*)'),
    supabaseAdmin.from('events').select('id, title').order('title'),
  ]);

  const certs = (allCerts ?? []) as Certificate[];
  const filtered =
    currentEventId === 'all'
      ? certs
      : certs.filter((c) => c.event_id === currentEventId);

  const stats = {
    total: certs.length,
    valid: certs.filter((c) => c.is_valid).length,
    revoked: certs.filter((c) => !c.is_valid).length,
  };

  return (
    <CertificatesListClient
      certificates={filtered}
      events={events ?? []}
      stats={stats}
      currentEventId={currentEventId}
    />
  );
}
