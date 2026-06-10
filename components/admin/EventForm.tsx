'use client';

import { useState, useTransition } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { createEvent, updateEvent } from '@/lib/actions/events';
import { generateSlug, getInitials } from '@/lib/utils';
import type {
  EventWithSpeakers,
  EventType,
  EventStatus,
  EventMode,
  Speaker,
  SpeakerRole,
} from '@/types/database';

interface EventFormProps {
  event?: EventWithSpeakers;
  allSpeakers: Speaker[];
}

const eventTypes: { value: EventType; label: string }[] = [
  { value: 'webinar', label: 'Webinar' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'ideathon', label: 'Ideathon' },
  { value: 'other', label: 'Other' },
];

const statusOptions: { value: EventStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const modeOptions: { value: EventMode; label: string }[] = [
  { value: 'online', label: 'Online' },
  { value: 'offline', label: 'Offline' },
  { value: 'hybrid', label: 'Hybrid' },
];

const roleOptions: { value: SpeakerRole; label: string }[] = [
  { value: 'Speaker', label: 'Speaker' },
  { value: 'Mentor', label: 'Mentor' },
  { value: 'Judge', label: 'Judge' },
  { value: 'Host', label: 'Host' },
];

function toDatetimeLocal(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

export function EventForm({ event, allSpeakers }: EventFormProps) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState(event?.title ?? '');
  const [slug, setSlug] = useState(event?.slug ?? '');
  const [slugEdited, setSlugEdited] = useState(!!event);
  const [eventType, setEventType] = useState<EventType>(event?.event_type ?? 'webinar');
  const [shortDescription, setShortDescription] = useState(event?.short_description ?? '');
  const [description, setDescription] = useState(event?.description ?? '');
  const [sessionNumber, setSessionNumber] = useState(event?.session_number?.toString() ?? '');
  const [eventDate, setEventDate] = useState(toDatetimeLocal(event?.event_date ?? null));
  const [eventEndDate, setEventEndDate] = useState(toDatetimeLocal(event?.event_end_date ?? null));
  const [durationMinutes, setDurationMinutes] = useState(event?.duration_minutes ?? 75);
  const [status, setStatus] = useState<EventStatus>(event?.status ?? 'draft');
  const [mode, setMode] = useState<EventMode>(event?.mode ?? 'online');
  const [platform, setPlatform] = useState(event?.platform ?? '');
  const [venue, setVenue] = useState(event?.venue ?? '');
  const [registrationUrl, setRegistrationUrl] = useState(event?.registration_url ?? '');
  const [recordingUrl, setRecordingUrl] = useState(event?.recording_url ?? '');
  const [thumbnailUrl, setThumbnailUrl] = useState(event?.thumbnail_url ?? '');
  const [isFree, setIsFree] = useState(event?.is_free ?? true);
  const [price, setPrice] = useState(event?.price ?? 0);
  const [maxRegistrations, setMaxRegistrations] = useState(event?.max_registrations?.toString() ?? '');
  const [registrationCount, setRegistrationCount] = useState(event?.registration_count ?? 0);
  const [attendanceCount, setAttendanceCount] = useState(event?.attendance_count ?? 0);
  const [certificateIssued, setCertificateIssued] = useState(event?.certificate_issued ?? false);
  const [whatYouLearn, setWhatYouLearn] = useState<string[]>(event?.what_you_learn ?? []);
  const [whoShouldAttend, setWhoShouldAttend] = useState<string[]>(event?.who_should_attend ?? []);
  const [tags, setTags] = useState<string[]>(event?.tags ?? []);
  const [tagInput, setTagInput] = useState('');
  const [speakerSearch, setSpeakerSearch] = useState('');

  const initialSpeakers =
    event?.event_speakers?.map((es, i) => ({
      speaker_id: es.speaker_id,
      role: es.role as SpeakerRole,
      sort_order: es.sort_order ?? i,
    })) ?? [];

  const [assignedSpeakers, setAssignedSpeakers] = useState(initialSpeakers);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugEdited) setSlug(generateSlug(value));
  };


  const toggleSpeaker = (speakerId: string) => {
    const exists = assignedSpeakers.find((s) => s.speaker_id === speakerId);
    if (exists) {
      setAssignedSpeakers(assignedSpeakers.filter((s) => s.speaker_id !== speakerId));
    } else {
      setAssignedSpeakers([
        ...assignedSpeakers,
        { speaker_id: speakerId, role: 'Speaker' as SpeakerRole, sort_order: assignedSpeakers.length },
      ]);
    }
  };

  const updateSpeakerRole = (speakerId: string, role: SpeakerRole) => {
    setAssignedSpeakers(
      assignedSpeakers.map((s) => (s.speaker_id === speakerId ? { ...s, role } : s))
    );
  };

  const addListItem = (list: string[], setList: (v: string[]) => void) => {
    setList([...list, '']);
  };

  const updateListItem = (list: string[], setList: (v: string[]) => void, index: number, value: string) => {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  };

  const removeListItem = (list: string[], setList: (v: string[]) => void, index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  const buildFormData = (overrideStatus?: EventStatus) => ({
    title,
    slug,
    event_type: eventType,
    description: description || undefined,
    short_description: shortDescription || undefined,
    session_number: sessionNumber ? Number(sessionNumber) : null,
    event_date: eventDate ? new Date(eventDate).toISOString() : null,
    event_end_date: eventEndDate ? new Date(eventEndDate).toISOString() : null,
    duration_minutes: durationMinutes,
    status: overrideStatus ?? status,
    mode,
    platform: platform || undefined,
    venue: venue || undefined,
    registration_url: registrationUrl || undefined,
    recording_url: recordingUrl || undefined,
    thumbnail_url: thumbnailUrl || undefined,
    is_free: isFree,
    price: isFree ? 0 : price,
    max_registrations: maxRegistrations ? Number(maxRegistrations) : null,
    registration_count: registrationCount,
    attendance_count: attendanceCount,
    certificate_issued: certificateIssued,
    what_you_learn: whatYouLearn.filter(Boolean),
    who_should_attend: whoShouldAttend.filter(Boolean),
    tags,
    speakers: assignedSpeakers,
  });

  const handleSave = (overrideStatus?: EventStatus) => {
    const formData = buildFormData(overrideStatus);

    startTransition(async () => {
      try {
        const result = event
          ? await updateEvent(event.id, formData)
          : await createEvent(formData);

        if ('error' in result) {
          showToast(result.error, 'error');
        } else if (!event && 'id' in result) {
          window.location.href = `/admin/events/${result.id}`;
        } else {
          showToast('Event saved successfully.', 'success');
        }
      } catch {
        showToast('Save failed. Please refresh and try again.', 'error');
      }
    });
  };

  const filteredSpeakers = allSpeakers.filter((s) => {
    if (!speakerSearch) return true;
    const q = speakerSearch.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.company?.toLowerCase().includes(q)
    );
  });

  const showPlatform = mode === 'online' || mode === 'hybrid';
  const showVenue = mode === 'offline' || mode === 'hybrid';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-body-mid">
          {event ? `Editing: ${event.title}` : 'Create new event'}
        </p>
        <div className="flex gap-2">
          {event ? (
            <Button variant="primary" loading={isPending} onClick={() => handleSave()}>
              Save changes
            </Button>
          ) : (
            <>
              <Button variant="dark" loading={isPending} onClick={() => handleSave('draft')}>
                Save draft
              </Button>
              <Button variant="primary" loading={isPending} onClick={() => handleSave('published')}>
                Publish
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <Input label="Event title" value={title} onChange={(e) => handleTitleChange(e.target.value)} required />
          <Input
            label="Slug"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugEdited(true);
            }}
            required
          />
          <Select label="Event type" options={eventTypes} value={eventType} onChange={(e) => setEventType(e.target.value as EventType)} />
          <Input label="Session number" type="number" value={sessionNumber} onChange={(e) => setSessionNumber(e.target.value)} />
          <Textarea label="Short description" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} maxLength={160} charCount className="min-h-[80px]" />
          <Textarea label="Full description" value={description} onChange={(e) => setDescription(e.target.value)} />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Thumbnail URL</label>
            <Input value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} placeholder="https://..." />
            {thumbnailUrl && (
              <img src={thumbnailUrl} alt="" className="mt-2 h-32 w-full rounded-[12px] object-cover" />
            )}
          </div>

          <Input label="Event date" type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
          <Input label="Event end date" type="datetime-local" value={eventEndDate} onChange={(e) => setEventEndDate(e.target.value)} />
          <Input label="Duration (minutes)" type="number" value={durationMinutes} onChange={(e) => setDurationMinutes(Number(e.target.value))} />
          <Select label="Mode" options={modeOptions} value={mode} onChange={(e) => setMode(e.target.value as EventMode)} />
          {showPlatform && <Input label="Platform" value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="Zoom, Google Meet..." />}
          {showVenue && <Input label="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} />}
          <Input label="Registration URL" type="url" value={registrationUrl} onChange={(e) => setRegistrationUrl(e.target.value)} />
          <Input label="Recording URL" type="url" value={recordingUrl} onChange={(e) => setRecordingUrl(e.target.value)} />
          <Toggle label="Free event" checked={isFree} onChange={setIsFree} />
          {!isFree && <Input label="Price (₹)" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />}
          <Input label="Max registrations" type="number" value={maxRegistrations} onChange={(e) => setMaxRegistrations(e.target.value)} />
        </div>

        <div className="space-y-4">
          <Select label="Status" options={statusOptions} value={status} onChange={(e) => setStatus(e.target.value as EventStatus)} />
          <Input label="Registration count" type="number" value={registrationCount} onChange={(e) => setRegistrationCount(Number(e.target.value))} />
          <Input label="Attendance count" type="number" value={attendanceCount} onChange={(e) => setAttendanceCount(Number(e.target.value))} />
          <Toggle label="Certificate issued" checked={certificateIssued} onChange={setCertificateIssued} />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Tags</label>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 rounded-pill bg-canvas-soft px-2.5 py-1 text-xs font-medium text-body">
                  {tag}
                  <button type="button" onClick={() => setTags(tags.filter((t) => t !== tag))}>×</button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const t = tagInput.trim();
                  if (t && !tags.includes(t)) setTags([...tags, t]);
                  setTagInput('');
                }
              }}
              placeholder="Type tag and press Enter"
              className="w-full rounded-[12px] border border-mute/50 bg-canvas px-4 py-2.5 text-sm"
            />
          </div>

          <div className="rounded-[12px] border border-canvas-soft bg-canvas p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium text-ink">
                Assign speakers
                {assignedSpeakers.length > 0 && (
                  <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    {assignedSpeakers.length} selected
                  </span>
                )}
              </h3>
              <a href="/admin/speakers/new" target="_blank" className="text-xs text-primary hover:underline">
                + New speaker
              </a>
            </div>
            {allSpeakers.length === 0 ? (
              <div className="rounded-[10px] border border-dashed border-mute/50 p-4 text-center">
                <p className="text-sm text-body-mid">No speakers added yet.</p>
                <a href="/admin/speakers/new" className="mt-2 inline-block text-sm text-primary hover:underline">
                  Create your first speaker →
                </a>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Search speakers..."
                  value={speakerSearch}
                  onChange={(e) => setSpeakerSearch(e.target.value)}
                  className="mb-3 w-full rounded-[12px] border border-mute/50 bg-canvas-soft px-3 py-2 text-sm"
                />
                <div className="max-h-64 space-y-2 overflow-y-auto">
                  {filteredSpeakers.map((speaker) => {
                    const assigned = assignedSpeakers.find((s) => s.speaker_id === speaker.id);
                    return (
                      <div
                        key={speaker.id}
                        className={`flex items-center gap-3 rounded-md p-2 transition-colors ${
                          assigned ? 'bg-primary/8 ring-1 ring-primary/20' : 'bg-canvas-soft'
                        }`}
                      >
                        {speaker.avatar_url ? (
                          <img src={speaker.avatar_url} alt="" className="h-8 w-8 flex-shrink-0 rounded-full object-cover" />
                        ) : (
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-mute/30 text-xs font-medium">
                            {getInitials(speaker.name)}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-ink">{speaker.name}</p>
                          <p className="truncate text-xs text-body-mid">{speaker.company}</p>
                        </div>
                        {assigned && (
                          <select
                            value={assigned.role}
                            onChange={(e) => updateSpeakerRole(speaker.id, e.target.value as SpeakerRole)}
                            className="rounded border border-mute/50 bg-canvas px-2 py-1 text-xs"
                          >
                            {roleOptions.map((r) => (
                              <option key={r.value} value={r.value}>{r.label}</option>
                            ))}
                          </select>
                        )}
                        <Toggle
                          label=""
                          checked={!!assigned}
                          onChange={() => toggleSpeaker(speaker.id)}
                          className="!gap-0"
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-ink">What you will learn</label>
              <button type="button" onClick={() => addListItem(whatYouLearn, setWhatYouLearn)} className="text-xs text-primary hover:underline">
                + Add item
              </button>
            </div>
            {whatYouLearn.map((item, i) => (
              <div key={i} className="mb-2 flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateListItem(whatYouLearn, setWhatYouLearn, i, e.target.value)}
                  className="flex-1 rounded-[12px] border border-mute/50 bg-canvas px-3 py-2 text-sm"
                />
                <button type="button" onClick={() => removeListItem(whatYouLearn, setWhatYouLearn, i)} className="text-body-mid hover:text-red-600">×</button>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-ink">Who should attend</label>
              <button type="button" onClick={() => addListItem(whoShouldAttend, setWhoShouldAttend)} className="text-xs text-primary hover:underline">
                + Add item
              </button>
            </div>
            {whoShouldAttend.map((item, i) => (
              <div key={i} className="mb-2 flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateListItem(whoShouldAttend, setWhoShouldAttend, i, e.target.value)}
                  className="flex-1 rounded-[12px] border border-mute/50 bg-canvas px-3 py-2 text-sm"
                />
                <button type="button" onClick={() => removeListItem(whoShouldAttend, setWhoShouldAttend, i)} className="text-body-mid hover:text-red-600">×</button>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
