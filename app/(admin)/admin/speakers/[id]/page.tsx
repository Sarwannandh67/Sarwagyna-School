import { notFound } from 'next/navigation';
import { getSpeaker } from '@/lib/actions/speakers';
import { SpeakerForm } from '@/components/admin/SpeakerForm';

export default async function EditSpeakerPage({ params }: { params: { id: string } }) {
  const speaker = await getSpeaker(params.id);
  if (!speaker) notFound();
  return <SpeakerForm speaker={speaker} />;
}
