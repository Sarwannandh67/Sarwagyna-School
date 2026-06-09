'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase/server';
import type { ApplicationStatus, Partner, PartnerApplication } from '@/types/database';

export interface PartnerFormData {
  name: string;
  logo_url?: string;
  website_url?: string;
  description?: string;
  partnership_type?: string;
  is_active: boolean;
  sort_order: number;
}

export async function getPartners(): Promise<Partner[]> {
  const { data, error } = await supabaseAdmin
    .from('partners')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as Partner[];
}

export async function getPartner(id: string): Promise<Partner | null> {
  const { data, error } = await supabaseAdmin.from('partners').select('*').eq('id', id).single();
  if (error) return null;
  return data as Partner;
}

export async function getPartnerApplications(): Promise<PartnerApplication[]> {
  const { data, error } = await supabaseAdmin
    .from('partner_applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as PartnerApplication[];
}

export async function createPartner(
  formData: PartnerFormData
): Promise<{ error: string } | { success: true; id: string }> {
  const { data, error } = await supabaseAdmin.from('partners').insert(formData).select().single();
  if (error) return { error: error.message };

  revalidatePath('/admin/partners');
  revalidatePath('/partners');
  return { success: true, id: data.id };
}

export async function updatePartner(
  id: string,
  formData: PartnerFormData
): Promise<{ error: string } | { success: true }> {
  const { error } = await supabaseAdmin.from('partners').update(formData).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/partners');
  revalidatePath(`/admin/partners/${id}`);
  revalidatePath('/partners');
  return { success: true };
}

export async function deletePartner(id: string) {
  const { error } = await supabaseAdmin.from('partners').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/partners');
  revalidatePath('/partners');
  return { success: true };
}

export async function togglePartnerActive(id: string, is_active: boolean) {
  const { error } = await supabaseAdmin.from('partners').update({ is_active }).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/partners');
  revalidatePath('/partners');
  return { success: true };
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
  const { error } = await supabaseAdmin
    .from('partner_applications')
    .update({ status })
    .eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin/partners');
  return { success: true };
}
