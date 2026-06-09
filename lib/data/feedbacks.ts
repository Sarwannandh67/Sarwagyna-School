import { supabaseAdmin } from '@/lib/supabase/server';
import type { Feedback } from '@/types/database';

const feedbackWithEventSelect = '*, event:events(title, slug, event_type)';

export async function fetchApprovedFeedbacks(): Promise<Feedback[]> {
  const { data, error } = await supabaseAdmin
    .from('feedbacks')
    .select(feedbackWithEventSelect)
    .eq('is_approved', true)
    .order('created_at', { ascending: false });

  if (error) console.error('[fetchApprovedFeedbacks]', error.message);
  return (data ?? []) as Feedback[];
}

export async function fetchFeaturedFeedbacks(limit = 3): Promise<Feedback[]> {
  const { data, error } = await supabaseAdmin
    .from('feedbacks')
    .select(feedbackWithEventSelect)
    .eq('is_approved', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) console.error('[fetchFeaturedFeedbacks]', error.message);
  return (data ?? []) as Feedback[];
}

export async function fetchAllFeedbacksAdmin(): Promise<Feedback[]> {
  const { data, error } = await supabaseAdmin
    .from('feedbacks')
    .select(feedbackWithEventSelect)
    .order('created_at', { ascending: false });

  if (error) console.error('[fetchAllFeedbacksAdmin]', error.message);
  return (data ?? []) as Feedback[];
}

export function computeFeedbackStats(feedbacks: Feedback[]): {
  avgRating: number;
  total: number;
  breakdown: Record<1 | 2 | 3 | 4 | 5, number>;
} {
  const total = feedbacks.length;
  const breakdown: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  if (total === 0) return { avgRating: 0, total, breakdown };

  let sum = 0;
  for (const f of feedbacks) {
    sum += f.rating;
    const r = f.rating as 1 | 2 | 3 | 4 | 5;
    if (r >= 1 && r <= 5) breakdown[r] = (breakdown[r] ?? 0) + 1;
  }

  return { avgRating: Math.round((sum / total) * 10) / 10, total, breakdown };
}
