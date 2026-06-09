import type { EventType, EventStatus } from '@/types/database';

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateCertificateId(sequential: number): string {
  const year = new Date().getFullYear();
  const padded = String(sequential).padStart(4, '0');
  return `SARW-${year}-${padded}`;
}

export function formatDate(date: string | null, options?: Intl.DateTimeFormatOptions): string {
  if (!date) return 'TBD';
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options,
  });
}

export function formatDateTime(date: string | null): string {
  if (!date) return 'TBD';
  return new Date(date).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function isInternalHref(href: string): boolean {
  return (
    href.startsWith('/') &&
    !href.startsWith('//') &&
    !href.includes('[') &&
    !href.includes(']')
  );
}

export function isExternalHref(href: string): boolean {
  return /^(https?:\/\/|mailto:|tel:)/i.test(href.trim());
}

export function isHashHref(href: string): boolean {
  return href.startsWith('#');
}

export function isNavigableHref(href: string | null | undefined): href is string {
  if (!href || !href.trim()) return false;
  const trimmed = href.trim();
  if (trimmed.includes('[') || trimmed.includes(']')) return false;
  return isInternalHref(trimmed) || isExternalHref(trimmed) || isHashHref(trimmed);
}

export const eventTypeLabels: Record<EventType, string> = {
  webinar: 'Webinar',
  workshop: 'Workshop',
  hackathon: 'Hackathon',
  ideathon: 'Ideathon',
  other: 'Other',
};

export const eventStatusLabels: Record<EventStatus, string> = {
  draft: 'Draft',
  published: 'Published',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const eventTypeColors: Record<EventType, string> = {
  webinar: 'bg-primary text-on-primary',
  workshop: 'bg-[#3b82f6] text-white',
  hackathon: 'bg-[#8b5cf6] text-white',
  ideathon: 'bg-[#14b8a6] text-white',
  other: 'bg-body-mid text-white',
};

export const eventStatusColors: Record<EventStatus, string> = {
  draft: 'bg-body-mid/20 text-body',
  published: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-700',
  cancelled: 'bg-red-100 text-red-800',
};

export async function getSiteSettings(): Promise<Record<string, string>> {
  const { supabaseAdmin } = await import('@/lib/supabase/server');
  const { data } = await supabaseAdmin.from('site_settings').select('key, value');
  const settings: Record<string, string> = {};
  data?.forEach((row) => {
    settings[row.key] = row.value ?? '';
  });
  return settings;
}

export async function uploadFile(
  file: File,
  path: string
): Promise<{ url: string | null; error: string | null }> {
  const { supabaseAdmin } = await import('@/lib/supabase/server');
  const ext = file.name.split('.').pop();
  const fileName = `${path}/${Date.now()}.${ext}`;

  const { error } = await supabaseAdmin.storage.from('School-assets').upload(fileName, file, {
    upsert: true,
  });

  if (error) return { url: null, error: error.message };

  const { data } = supabaseAdmin.storage.from('School-assets').getPublicUrl(fileName);
  return { url: data.publicUrl, error: null };
}
