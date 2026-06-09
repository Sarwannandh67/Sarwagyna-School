import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company_name, contact_name, email, phone, partnership_type, message } = body;

    if (!company_name || !contact_name || !email) {
      return NextResponse.json(
        { error: 'Company name, contact name, and email are required' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin.from('partner_applications').insert({
      company_name: String(company_name).trim(),
      contact_name: String(contact_name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : null,
      partnership_type: partnership_type ?? null,
      message: message ? String(message).trim() : null,
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
