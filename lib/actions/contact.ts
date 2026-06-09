'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase/server';
import type { ContactStatus, ContactSubmission, InquiryType } from '@/types/database';

export async function getContactSubmissions(filters?: {
  status?: ContactStatus | 'all';
  type?: InquiryType | 'all';
}): Promise<ContactSubmission[]> {
  let query = supabaseAdmin
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }
  if (filters?.type && filters.type !== 'all') {
    query = query.eq('inquiry_type', filters.type);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as ContactSubmission[];
}

export async function updateContactStatus(id: string, status: ContactStatus) {
  const { error } = await supabaseAdmin
    .from('contact_submissions')
    .update({ status })
    .eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin/contact');
  revalidatePath('/admin');
  return { success: true };
}
