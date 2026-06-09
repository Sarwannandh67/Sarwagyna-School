'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase/server';
import { generateCertificateId } from '@/lib/utils';
import type { Certificate, CertificateType } from '@/types/database';

export interface CertificateFormData {
  certificate_id: string;
  event_id?: string | null;
  recipient_name: string;
  recipient_email?: string;
  certificate_type: CertificateType;
  issued_date: string;
  pdf_url?: string;
  is_valid: boolean;
}

export async function getCertificates(filters?: {
  eventId?: string;
  search?: string;
}): Promise<Certificate[]> {
  let query = supabaseAdmin
    .from('certificates')
    .select('*, event:events(*)')
    .order('created_at', { ascending: false });

  if (filters?.eventId && filters.eventId !== 'all') {
    query = query.eq('event_id', filters.eventId);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  let certs = (data ?? []) as Certificate[];

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    certs = certs.filter(
      (c) =>
        c.certificate_id.toLowerCase().includes(q) ||
        c.recipient_name.toLowerCase().includes(q) ||
        c.recipient_email?.toLowerCase().includes(q)
    );
  }

  return certs;
}

export async function getCertificate(id: string): Promise<Certificate | null> {
  const { data, error } = await supabaseAdmin
    .from('certificates')
    .select('*, event:events(*)')
    .eq('id', id)
    .single();

  if (error) return null;
  return data as Certificate;
}

export async function getNextCertificateId(): Promise<string> {
  const { count } = await supabaseAdmin
    .from('certificates')
    .select('*', { count: 'exact', head: true });

  return generateCertificateId((count ?? 0) + 1);
}

export async function issueCertificate(
  formData: CertificateFormData
): Promise<{ error: string } | { success: true; certificate: Certificate }> {
  const { data, error } = await supabaseAdmin
    .from('certificates')
    .insert(formData)
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath('/admin/certificates');
  revalidatePath('/verify');
  return { success: true, certificate: data };
}

export async function bulkIssueCertificates(
  rows: { recipient_name: string; recipient_email?: string }[],
  event_id: string | null,
  certificate_type: CertificateType,
  issued_date: string
) {
  const { count } = await supabaseAdmin
    .from('certificates')
    .select('*', { count: 'exact', head: true });

  let seq = (count ?? 0) + 1;
  const inserts = rows.map((row) => ({
    certificate_id: generateCertificateId(seq++),
    event_id,
    recipient_name: row.recipient_name,
    recipient_email: row.recipient_email ?? null,
    certificate_type,
    issued_date,
    is_valid: true,
  }));

  const { error } = await supabaseAdmin.from('certificates').insert(inserts);
  if (error) return { error: error.message };

  revalidatePath('/admin/certificates');
  return { success: true, count: inserts.length };
}

export async function updateCertificate(
  id: string,
  formData: CertificateFormData
): Promise<{ error: string } | { success: true }> {
  const { error } = await supabaseAdmin.from('certificates').update(formData).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/certificates');
  revalidatePath(`/admin/certificates/${id}`);
  return { success: true };
}

export async function revokeCertificate(id: string, is_valid: boolean) {
  const { error } = await supabaseAdmin.from('certificates').update({ is_valid }).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/certificates');
  return { success: true };
}
