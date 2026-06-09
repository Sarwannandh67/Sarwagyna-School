'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase/server';
import type { Speaker, SpeakerWithEvents } from '@/types/database';

export interface SpeakerFormData {
  name: string;
  title?: string;
  company?: string;
  bio?: string;
  short_bio?: string;
  avatar_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  tags: string[];
  is_active: boolean;
  is_hiring: boolean;
}

export async function getSpeakers(search?: string): Promise<Speaker[]> {
  const { data, error } = await supabaseAdmin
    .from('speakers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  let speakers = (data ?? []) as Speaker[];

  if (search) {
    const q = search.toLowerCase();
    speakers = speakers.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.company?.toLowerCase().includes(q) ||
        s.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }

  return speakers;
}

export async function getSpeaker(id: string): Promise<SpeakerWithEvents | null> {
  const { data, error } = await supabaseAdmin
    .from('speakers')
    .select('*, event_speakers(*, event:events(*))')
    .eq('id', id)
    .single();

  if (error) return null;
  return data as SpeakerWithEvents;
}

export async function createSpeaker(
  formData: SpeakerFormData
): Promise<{ error: string } | { success: true; id: string }> {
  const { data, error } = await supabaseAdmin
    .from('speakers')
    .insert({ ...formData, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath('/admin/speakers');
  revalidatePath('/speakers');
  return { success: true, id: data.id };
}

export async function updateSpeaker(
  id: string,
  formData: SpeakerFormData
): Promise<{ error: string } | { success: true }> {
  const { error } = await supabaseAdmin
    .from('speakers')
    .update({ ...formData, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin/speakers');
  revalidatePath(`/admin/speakers/${id}`);
  revalidatePath('/speakers');
  return { success: true };
}

export async function deleteSpeaker(id: string) {
  const { error } = await supabaseAdmin.from('speakers').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/speakers');
  revalidatePath('/speakers');
  return { success: true };
}

export async function toggleSpeakerActive(id: string, is_active: boolean) {
  const { error } = await supabaseAdmin
    .from('speakers')
    .update({ is_active, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin/speakers');
  revalidatePath('/speakers');
  return { success: true };
}

export async function toggleSpeakerHiring(id: string, is_hiring: boolean) {
  const { error } = await supabaseAdmin
    .from('speakers')
    .update({ is_hiring, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin/speakers');
  return { success: true };
}

export async function getSpeakerEventCounts(): Promise<Record<string, number>> {
  const { data } = await supabaseAdmin.from('event_speakers').select('speaker_id');
  const counts: Record<string, number> = {};
  data?.forEach((row: { speaker_id: string }) => {
    counts[row.speaker_id] = (counts[row.speaker_id] ?? 0) + 1;
  });
  return counts;
}
