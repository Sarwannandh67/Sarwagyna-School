'use server';

import { redirect } from 'next/navigation';
import { createSession, deleteSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function loginAction(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const email = (formData.get('email') as string)?.trim();
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const { data } = await supabaseAdmin
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (!data) {
    return { error: 'Invalid email or password' };
  }

  await createSession({ id: data.id, email: data.email, name: data.name });
  redirect('/admin');
}

export async function logoutAction() {
  await deleteSession();
  redirect('/login');
}
