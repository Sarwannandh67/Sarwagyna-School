import { supabaseAdmin } from '@/lib/supabase/server';
import { EventForm } from '@/components/admin/EventForm';
import type { Speaker } from '@/types/database';

export default async function NewEventPage() {
  const { data } = await supabaseAdmin
    .from('speakers')
    .select('*')
    .eq('is_active', true)
    .order('name');

  return <EventForm allSpeakers={(data ?? []) as Speaker[]} />;
}
