'use server';

import { revalidatePath } from 'next/cache';
import { toEventRow } from '@/lib/events-db';
import { supabaseAdmin } from '@/lib/supabase/server';
import { generateSlug } from '@/lib/utils';
import type { Event, EventSpeaker, EventWithSpeakers, SpeakerRole } from '@/types/database';

export interface EventFormData {
  title: string;
  slug?: string;
  event_type: string;
  description?: string;
  short_description?: string;
  session_number?: number | null;
  event_date?: string | null;
  event_end_date?: string | null;
  duration_minutes: number;
  status: string;
  mode: string;
  platform?: string;
  venue?: string;
  registration_url?: string;
  recording_url?: string;
  thumbnail_url?: string;
  is_free: boolean;
  price: number;
  max_registrations?: number | null;
  registration_count: number;
  attendance_count: number;
  certificate_issued: boolean;
  what_you_learn: string[];
  who_should_attend: string[];
  tags: string[];
  speakers: { speaker_id: string; role: SpeakerRole; sort_order: number }[];
}

export async function getEvents(filters?: { type?: string; search?: string }): Promise<Event[]> {
  let query = supabaseAdmin.from('events').select('*').order('created_at', { ascending: false });

  if (filters?.type && filters.type !== 'all') {
    query = query.eq('event_type', filters.type);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  let events = (data ?? []) as Event[];

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    events = events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.slug.toLowerCase().includes(q) ||
        e.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }

  return events;
}

export async function getEvent(id: string): Promise<EventWithSpeakers | null> {
  const { data, error } = await supabaseAdmin
    .from('events')
    .select('*, event_speakers(*, speaker:speakers(*))')
    .eq('id', id)
    .single();

  if (error) return null;
  return data as EventWithSpeakers;
}

export async function createEvent(
  formData: EventFormData
): Promise<{ error: string } | { success: true; id: string }> {
  try {
    const slug = formData.slug || generateSlug(formData.title);
    const { speakers, ...eventData } = formData;

    const { data: event, error } = await supabaseAdmin
      .from('events')
      .insert(toEventRow(eventData, slug))
      .select()
      .single();

    if (error) return { error: error.message };

    if (speakers.length > 0) {
      const speakerRows = speakers.map((s) => ({
        event_id: event.id,
        speaker_id: s.speaker_id,
        role: s.role,
        sort_order: s.sort_order,
      }));
      const { error: speakerError } = await supabaseAdmin.from('event_speakers').insert(speakerRows);
      if (speakerError) return { error: speakerError.message };
    }

    revalidatePath('/admin/events');
    revalidatePath('/');
    revalidatePath('/events');
    revalidatePath(`/events/${slug}`);
    return { success: true, id: event.id };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Unexpected error saving event.' };
  }
}

export async function updateEvent(
  id: string,
  formData: EventFormData
): Promise<{ error: string } | { success: true }> {
  try {
    const { speakers, ...eventData } = formData;
    const slug = eventData.slug || generateSlug(eventData.title);

    const { error } = await supabaseAdmin
      .from('events')
      .update(toEventRow(eventData, slug))
      .eq('id', id);

    if (error) return { error: error.message };

    const { error: deleteError } = await supabaseAdmin
      .from('event_speakers')
      .delete()
      .eq('event_id', id);

    if (deleteError) return { error: deleteError.message };

    if (speakers.length > 0) {
      const speakerRows = speakers.map((s) => ({
        event_id: id,
        speaker_id: s.speaker_id,
        role: s.role,
        sort_order: s.sort_order,
      }));
      const { error: speakerError } = await supabaseAdmin.from('event_speakers').insert(speakerRows);
      if (speakerError) return { error: speakerError.message };
    }

    revalidatePath('/admin/events');
    revalidatePath(`/admin/events/${id}`);
    revalidatePath('/');
    revalidatePath('/events');
    revalidatePath(`/events/${slug}`);
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Unexpected error saving event.' };
  }
}

export async function deleteEvent(id: string) {
  const { error } = await supabaseAdmin.from('events').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/events');
  revalidatePath('/');
  revalidatePath('/events');
  return { success: true };
}

export async function getEventSpeakerCounts(): Promise<Record<string, number>> {
  const { data } = await supabaseAdmin.from('event_speakers').select('event_id');
  const counts: Record<string, number> = {};
  data?.forEach((row: Pick<EventSpeaker, 'event_id'>) => {
    counts[row.event_id] = (counts[row.event_id] ?? 0) + 1;
  });
  return counts;
}
