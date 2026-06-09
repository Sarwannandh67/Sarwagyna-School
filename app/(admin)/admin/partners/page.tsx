import { getPartners, getPartnerApplications } from '@/lib/actions/partners';
import { PartnersListClient } from '@/components/admin/PartnersListClient';

export default async function AdminPartnersPage() {
  const [partners, applications] = await Promise.all([
    getPartners(),
    getPartnerApplications(),
  ]);

  return <PartnersListClient partners={partners} applications={applications} />;
}
