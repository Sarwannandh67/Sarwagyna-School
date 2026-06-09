'use server';

import { revalidatePath } from 'next/cache';
import { upsertSiteSettings } from '@/lib/site-settings';

export interface SiteSettingsForm {
  meta_title: string;
  meta_description: string;
  whatsapp_url: string;
  community_count: string;
  instagram_url: string;
  linkedin_url: string;
  youtube_url: string;
  contact_email: string;
}

export async function updateSiteSettings(settings: SiteSettingsForm) {
  const result = await upsertSiteSettings(settings);
  if (result.error) return { error: result.error };

  revalidatePath('/admin/settings');
  revalidatePath('/');
  return { success: true };
}
