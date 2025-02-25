import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from '@/types/supabase';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Allow access to auth page
  if (req.nextUrl.pathname.startsWith('/auth')) {
    return res;
  }

  // Protect these routes - must be logged in
  if ((req.nextUrl.pathname === '/profile' || req.nextUrl.pathname === '/admin') && !session) {
    console.log('No session, redirecting from protected route');
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/profile', '/admin', '/auth/:path*']
};
