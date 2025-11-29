// you can either put middleware vie nextauth or you just make normal middleware for the next js default way 

export { default } from "next-auth/middleware"

import { NextRequest } from 'next/server';
import { authMiddleware } from './middlewares/authMiddleware';

export async function middleware(request: NextRequest) {
  return authMiddleware(request);
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/sign-in',
    '/sign-up',
    '/',
    '/verify/:path*'
  ],
};
