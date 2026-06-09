import { getSiteSettings } from '@/lib/utils';
import { SettingsForm } from '@/components/admin/SettingsForm';

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <SettingsForm
      initial={{
        meta_title: settings.meta_title ?? 'Sarwagyna School',
        meta_description: settings.meta_description ?? '',
        whatsapp_url: settings.whatsapp_url ?? '',
        community_count: settings.community_count ?? '410',
        instagram_url: settings.instagram_url ?? '',
        linkedin_url: settings.linkedin_url ?? '',
        youtube_url: settings.youtube_url ?? '',
        contact_email: settings.contact_email ?? '',
      }}
    />
  );
}
