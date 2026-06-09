import { getEvents, getEventSpeakerCounts } from '@/lib/actions/events';
import { EventsListClient } from '@/components/admin/EventsListClient';

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const currentType = searchParams.type ?? 'all';
  const [events, speakerCounts] = await Promise.all([
    getEvents({ type: currentType }),
    getEventSpeakerCounts(),
  ]);

  return <EventsListClient events={events} speakerCounts={speakerCounts} currentType={currentType} />;
}
