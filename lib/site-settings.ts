import { supabaseAdmin } from '@/lib/supabase/server';

export async function upsertSiteSettings(
  settings: Record<string, string> | object
): Promise<{ error?: string }> {
  const entries = Object.entries(settings as Record<string, string>);
  for (const [key, value] of entries) {
    const { error } = await supabaseAdmin
      .from('site_settings')
      .upsert({ key, value }, { onConflict: 'key' });

    if (error) return { error: error.message };
  }

  return {};
}
