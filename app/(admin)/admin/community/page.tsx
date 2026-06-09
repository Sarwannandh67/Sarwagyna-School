import { getTestimonials } from '@/lib/actions/community';
import { getSiteSettings } from '@/lib/utils';
import { CommunityPageClient } from '@/components/admin/CommunityPageClient';

export default async function AdminCommunityPage() {
  const [settings, testimonials] = await Promise.all([getSiteSettings(), getTestimonials()]);

  return (
    <CommunityPageClient
      settings={{
        community_count: settings.community_count ?? '410',
        whatsapp_url: settings.whatsapp_url ?? '',
        instagram_url: settings.instagram_url ?? '',
        linkedin_url: settings.linkedin_url ?? '',
        youtube_url: settings.youtube_url ?? '',
      }}
      testimonials={testimonials}
    />
  );
}
