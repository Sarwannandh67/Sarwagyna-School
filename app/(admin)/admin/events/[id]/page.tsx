import { notFound } from 'next/navigation';
import { getEvent } from '@/lib/actions/events';
import { supabaseAdmin } from '@/lib/supabase/server';
import { EventForm } from '@/components/admin/EventForm';
import type { Speaker } from '@/types/database';

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const [event, { data: speakers }] = await Promise.all([
    getEvent(params.id),
    supabaseAdmin.from('speakers').select('*').eq('is_active', true).order('name'),
  ]);

  if (!event) notFound();

  return <EventForm event={event} allSpeakers={(speakers ?? []) as Speaker[]} />;
}
