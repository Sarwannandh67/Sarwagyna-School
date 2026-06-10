import type { MetadataRoute } from 'next';
import { supabaseAdmin } from '@/lib/supabase/server';

const BASE = 'https://school.sarwagyna.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: events } = await supabaseAdmin
    .from('events')
    .select('slug, updated_at')
    .in('status', ['published', 'completed']);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: 'daily' },
    { url: `${BASE}/events`, priority: 0.9, changeFrequency: 'daily' },
    { url: `${BASE}/speakers`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/community`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/about`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/partners`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/contact`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE}/feedbacks`, priority: 0.75, changeFrequency: 'daily' },
    { url: `${BASE}/verify`, priority: 0.5, changeFrequency: 'monthly' },
    { url: `${BASE}/community-guidelines`, priority: 0.4, changeFrequency: 'monthly' },
    { url: `${BASE}/terms`, priority: 0.4, changeFrequency: 'monthly' },
    { url: `${BASE}/privacy`, priority: 0.4, changeFrequency: 'monthly' },
  ];

  const eventPages: MetadataRoute.Sitemap = (events ?? []).map((e) => ({
    url: `${BASE}/events/${e.slug}`,
    lastModified: new Date(e.updated_at),
    priority: 0.85,
    changeFrequency: 'weekly',
  }));

  return [...staticPages, ...eventPages];
}
