import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function authMiddleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect to dashboard if already authenticated and trying to access public auth routes
  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify') ||
      url.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect to sign-in if not authenticated and trying to access protected routes
  if (!token && url.pathname.startsWith('/dashboard')) {
    console.log('No token found, redirecting to sign-in');
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}
