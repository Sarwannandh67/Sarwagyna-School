import { cache } from 'react';
import { supabaseAdmin } from '@/lib/supabase/server';
import type {
  Certificate,
  Event,
  EventType,
  EventWithSpeakers,
  Partner,
  Speaker,
  SpeakerWithEvents,
  Testimonial,
} from '@/types/database';

export type SiteSettingsMap = Record<string, string>;

export const fetchSiteSettings = cache(async (): Promise<SiteSettingsMap> => {
  const { data } = await supabaseAdmin.from('site_settings').select('key, value');
  const settings: SiteSettingsMap = {};
  data?.forEach((row) => {
    settings[row.key] = row.value ?? '';
  });
  return settings;
});

const eventWithSpeakersSelect = '*, event_speakers(*, speaker:speakers(*))';

export async function fetchUpcomingEvent(): Promise<EventWithSpeakers | null> {
  const { data, error } = await supabaseAdmin
    .from('events')
    .select(eventWithSpeakersSelect)
    .eq('status', 'published')
    .order('event_date', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) console.error('[fetchUpcomingEvent]', error.message);
  return data as EventWithSpeakers | null;
}

export async function fetchUpcomingEvents(type?: EventType): Promise<EventWithSpeakers[]> {
  let query = supabaseAdmin
    .from('events')
    .select(eventWithSpeakersSelect)
    .eq('status', 'published')
    .order('event_date', { ascending: true });

  if (type) {
    query = query.eq('event_type', type);
  }

  const { data, error } = await query;
  if (error) console.error('[fetchUpcomingEvents]', error.message);
  return (data ?? []) as EventWithSpeakers[];
}

export async function fetchPastEvents(
  limit?: number,
  type?: EventType
): Promise<EventWithSpeakers[]> {
  let query = supabaseAdmin
    .from('events')
    .select(eventWithSpeakersSelect)
    .eq('status', 'completed')
    .order('event_date', { ascending: false });

  if (type) {
    query = query.eq('event_type', type);
  }

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) console.error('[fetchPastEvents]', error.message);
  return (data ?? []) as EventWithSpeakers[];
}

export async function fetchPublicEvents(type?: EventType): Promise<EventWithSpeakers[]> {
  const [upcoming, past] = await Promise.all([
    fetchUpcomingEvents(type),
    fetchPastEvents(undefined, type),
  ]);

  return [...upcoming, ...past];
}

export async function eventHasCertificates(eventId: string): Promise<boolean> {
  const { count } = await supabaseAdmin
    .from('certificates')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', eventId)
    .eq('is_valid', true);

  return (count ?? 0) > 0;
}

export async function fetchEventBySlug(slug: string): Promise<EventWithSpeakers | null> {
  const { data, error } = await supabaseAdmin
    .from('events')
    .select(eventWithSpeakersSelect)
    .eq('slug', slug)
    .in('status', ['published', 'completed'])
    .maybeSingle();

  if (error) console.error('[fetchEventBySlug]', error.message);
  return data as EventWithSpeakers | null;
}

export async function fetchEventSlugs(): Promise<string[]> {
  const { data } = await supabaseAdmin
    .from('events')
    .select('slug')
    .in('status', ['published', 'completed']);

  return (data ?? []).map((row) => row.slug);
}

export async function fetchSpeakersWithEvents(): Promise<SpeakerWithEvents[]> {
  const { data, error } = await supabaseAdmin
    .from('speakers')
    .select('*, event_speakers(*, event:events(*))')
    .eq('is_active', true)
    .order('created_at', { ascending: true });

  if (error) console.error('[fetchSpeakersWithEvents]', error.message);
  return (data ?? []) as SpeakerWithEvents[];
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const { data } = await supabaseAdmin
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  return data ?? [];
}

export async function fetchPartners(): Promise<Partner[]> {
  const { data } = await supabaseAdmin
    .from('partners')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  return data ?? [];
}

export async function fetchCertificateById(
  certificateId: string
): Promise<(Certificate & { event: Event | null }) | null> {
  const { data } = await supabaseAdmin
    .from('certificates')
    .select(
      `
      *,
      event:events (*)
    `
    )
    .eq('certificate_id', certificateId)
    .eq('is_valid', true)
    .maybeSingle();

  return data as (Certificate & { event: Event | null }) | null;
}

export async function fetchHomeStats(): Promise<{
  completedEvents: number;
  speakers: number;
}> {
  const [eventsResult, speakersResult] = await Promise.all([
    supabaseAdmin
      .from('events')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed'),
    supabaseAdmin
      .from('speakers')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true),
  ]);

  return {
    completedEvents: eventsResult.count ?? 0,
    speakers: speakersResult.count ?? 0,
  };
}

export async function fetchAboutStats(): Promise<{
  completedEvents: number;
  speakers: number;
}> {
  return fetchHomeStats();
}
