import { getSpeakers, getSpeakerEventCounts } from '@/lib/actions/speakers';
import { SpeakersListClient } from '@/components/admin/SpeakersListClient';

export default async function AdminSpeakersPage() {
  const [speakers, eventCounts] = await Promise.all([getSpeakers(), getSpeakerEventCounts()]);
  return <SpeakersListClient speakers={speakers} eventCounts={eventCounts} />;
}
