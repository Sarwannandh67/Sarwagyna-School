import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET!);

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const token = req.cookies.get('admin_session')?.value;

    let authenticated = false;
    if (token) {
      try {
        await jwtVerify(token, secret);
        authenticated = true;
      } catch {
        authenticated = false;
      }
    }

    if (authenticated) {
      return NextResponse.next();
    }

    // Not authenticated — respond based on the kind of request so we never
    // hand an HTML redirect to a fetch that expects RSC/action payloads.
    const isServerAction = req.headers.get('next-action') !== null;
    const isPrefetch =
      req.headers.get('next-router-prefetch') !== null ||
      req.headers.get('purpose') === 'prefetch';

    if (isServerAction) {
      // Server action fetch: return a JSON error it can surface, not a redirect.
      return NextResponse.json({ error: 'Session expired. Please log in again.' }, { status: 401 });
    }

    if (isPrefetch) {
      // Router prefetch: a redirect here can't be consumed by the RSC client
      // ("Fetch failed loading"). Return an empty 401 — prefetch failure is
      // non-fatal, and the real navigation below will redirect to /login.
      return new NextResponse(null, { status: 401 });
    }

    // Normal navigation (full page or client-side RSC nav): redirect to login.
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*'] };
