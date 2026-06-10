import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET!);

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const token = req.cookies.get('admin_session')?.value;
    const isServerAction = req.headers.get('next-action') !== null;

    if (!token) {
      if (isServerAction) {
        return NextResponse.json({ error: 'Session expired. Please log in again.' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', req.url));
    }
    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      if (isServerAction) {
        return NextResponse.json({ error: 'Session expired. Please log in again.' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*'] };
