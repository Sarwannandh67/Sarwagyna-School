'use server';

import { revalidatePath } from 'next/cache';
import { upsertSiteSettings } from '@/lib/site-settings';

export interface AboutSettings {
  about_mission: string;
  about_vision: string;
  about_milestone_1: string;
  about_milestone_2: string;
  about_milestone_3: string;
}

export async function updateAboutSettings(settings: AboutSettings) {
  const result = await upsertSiteSettings(settings);
  if (result.error) return { error: result.error };

  revalidatePath('/admin/about');
  revalidatePath('/about');
  return { success: true };
}
