import { decodeJwt } from 'jose';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('JWT_TOKEN')?.value;

  // List of paths that don't require authentication
  const publicPaths = ['/login', '/docs'];

  if (
    publicPaths.some((publicPath) =>
      request.nextUrl.pathname.startsWith(publicPath)
    )
  ) {
    return NextResponse.next();
  }

  if (!token) {
    // Redirect to login if there's no token
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const decodedToken = decodeJwt(token);

    // Check if the token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      throw new Error('Token expired');
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Invalid token:', error);
    // If token is invalid, clear it and redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('JWT_TOKEN');
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.png|institute.png|logo.svg).*)',
  ],
};
