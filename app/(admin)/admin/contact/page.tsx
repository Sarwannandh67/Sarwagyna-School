import { getContactSubmissions } from '@/lib/actions/contact';
import { supabaseAdmin } from '@/lib/supabase/server';
import { ContactPageClient } from '@/components/admin/ContactPageClient';
import type { ContactStatus, InquiryType } from '@/types/database';

export default async function AdminContactPage({
  searchParams,
}: {
  searchParams: { status?: string; type?: string };
}) {
  const currentStatus = searchParams.status ?? 'all';
  const currentType = searchParams.type ?? 'all';

  const [{ data: allSubs }, submissions] = await Promise.all([
    supabaseAdmin.from('contact_submissions').select('status'),
    getContactSubmissions({
      status: currentStatus as ContactStatus | 'all',
      type: currentType as InquiryType | 'all',
    }),
  ]);

  const stats = {
    new: allSubs?.filter((s) => s.status === 'new').length ?? 0,
    read: allSubs?.filter((s) => s.status === 'read').length ?? 0,
    replied: allSubs?.filter((s) => s.status === 'replied').length ?? 0,
  };

  return (
    <ContactPageClient
      submissions={submissions}
      stats={stats}
      currentStatus={currentStatus}
      currentType={currentType}
    />
  );
}
