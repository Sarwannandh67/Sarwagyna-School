'use server';

import { revalidatePath } from 'next/cache';
import { upsertSiteSettings } from '@/lib/site-settings';
import { supabaseAdmin } from '@/lib/supabase/server';
import type { Testimonial } from '@/types/database';

export interface CommunitySettings {
  community_count: string;
  whatsapp_url: string;
  instagram_url: string;
  linkedin_url: string;
  youtube_url: string;
}

export interface TestimonialFormData {
  name: string;
  college?: string;
  city?: string;
  role?: string;
  quote: string;
  is_active: boolean;
  sort_order: number;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabaseAdmin
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as Testimonial[];
}

export async function updateCommunitySettings(settings: CommunitySettings) {
  const result = await upsertSiteSettings(settings);
  if (result.error) return { error: result.error };

  revalidatePath('/admin/community');
  revalidatePath('/community');
  revalidatePath('/');
  return { success: true };
}

export async function createTestimonial(formData: TestimonialFormData) {
  const { error } = await supabaseAdmin.from('testimonials').insert(formData);
  if (error) return { error: error.message };

  revalidatePath('/admin/community');
  revalidatePath('/community');
  return { success: true };
}

export async function updateTestimonial(id: string, formData: TestimonialFormData) {
  const { error } = await supabaseAdmin.from('testimonials').update(formData).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/community');
  revalidatePath('/community');
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  const { error } = await supabaseAdmin.from('testimonials').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/community');
  revalidatePath('/community');
  return { success: true };
}
