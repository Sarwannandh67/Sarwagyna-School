'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function submitFeedback(formData: FormData): Promise<{ error?: string }> {
  try {
    const name = (formData.get('name') as string | null)?.trim();
    const email = (formData.get('email') as string | null)?.trim() || null;
    const college = (formData.get('college') as string | null)?.trim() || null;
    const city = (formData.get('city') as string | null)?.trim() || null;
    const role = (formData.get('role') as string | null)?.trim() || null;
    const ratingRaw = formData.get('rating') as string | null;
    const feedbackText = (formData.get('feedback_text') as string | null)?.trim();
    const eventIdRaw = (formData.get('event_id') as string | null)?.trim();

    if (!name) return { error: 'Name is required.' };
    const rating = Number(ratingRaw);
    if (!rating || rating < 1 || rating > 5) return { error: 'Please select a rating.' };
    if (!feedbackText || feedbackText.length < 30)
      return { error: 'Feedback must be at least 30 characters.' };

    const event_id = eventIdRaw && eventIdRaw !== 'none' ? eventIdRaw : null;

    const { error } = await supabaseAdmin.from('feedbacks').insert({
      name,
      email,
      college,
      city,
      role,
      rating,
      feedback_text: feedbackText,
      event_id,
      is_approved: false,
      is_featured: false,
    });

    if (error) {
      console.error('[submitFeedback]', error.message);
      return {
        error:
          process.env.NODE_ENV === 'development'
            ? `DB error: ${error.message}`
            : 'Something went wrong. Please try again.',
      };
    }

    return {};
  } catch (err) {
    console.error('[submitFeedback] unexpected:', err);
    return { error: 'Something went wrong. Please try again.' };
  }
}

export async function approveFeedback(id: string): Promise<void> {
  try {
    await supabaseAdmin.from('feedbacks').update({ is_approved: true }).eq('id', id);
    revalidatePath('/feedbacks');
    revalidatePath('/admin/feedbacks');
    revalidatePath('/');
  } catch (err) {
    console.error('[approveFeedback]', err);
  }
}

export async function toggleFeaturedFeedback(id: string, current: boolean): Promise<void> {
  try {
    await supabaseAdmin.from('feedbacks').update({ is_featured: !current }).eq('id', id);
    revalidatePath('/feedbacks');
    revalidatePath('/admin/feedbacks');
    revalidatePath('/');
  } catch (err) {
    console.error('[toggleFeaturedFeedback]', err);
  }
}

export async function deleteFeedback(id: string): Promise<void> {
  try {
    await supabaseAdmin.from('feedbacks').delete().eq('id', id);
    revalidatePath('/feedbacks');
    revalidatePath('/admin/feedbacks');
    revalidatePath('/');
  } catch (err) {
    console.error('[deleteFeedback]', err);
  }
}

export async function bulkApproveFeedbacks(ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  try {
    await supabaseAdmin.from('feedbacks').update({ is_approved: true }).in('id', ids);
    revalidatePath('/feedbacks');
    revalidatePath('/admin/feedbacks');
    revalidatePath('/');
  } catch (err) {
    console.error('[bulkApproveFeedbacks]', err);
  }
}
