import type { EventFormData } from '@/lib/actions/events';

/** Columns present on the live events table (excludes optional/missing columns). */
const EVENT_WRITE_COLUMNS = [
  'title',
  'slug',
  'event_type',
  'description',
  'short_description',
  'session_number',
  'event_date',
  'event_end_date',
  'duration_minutes',
  'status',
  'mode',
  'platform',
  'venue',
  'registration_url',
  'recording_url',
  'thumbnail_url',
  'is_free',
  'price',
  'max_registrations',
  'registration_count',
  'attendance_count',
  'what_you_learn',
  'who_should_attend',
  'tags',
] as const;

export function toEventRow(
  formData: Omit<EventFormData, 'speakers'>,
  slug: string
): Record<string, unknown> {
  const source = { ...formData, slug };
  const row: Record<string, unknown> = {};

  for (const key of EVENT_WRITE_COLUMNS) {
    if (key in source) {
      row[key] = source[key as keyof typeof source];
    }
  }

  return row;
}
