import { notFound } from 'next/navigation';
import { getPartner } from '@/lib/actions/partners';
import { PartnerForm } from '@/components/admin/PartnerForm';

export default async function EditPartnerPage({ params }: { params: { id: string } }) {
  const partner = await getPartner(params.id);
  if (!partner) notFound();
  return <PartnerForm partner={partner} />;
}
