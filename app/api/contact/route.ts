import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, inquiry_type, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('contact_submissions').insert({
      name: String(name).trim(),
      email: String(email).trim(),
      inquiry_type: inquiry_type ?? 'general',
      subject: subject ? String(subject).trim() : null,
      message: String(message).trim(),
      status: 'new',
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
