import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { getToken } from './helpers/serverHelpers';

const PUBLIC_PATHS = [
  '/api/auth/login',
  '/api/auth/verify',
  '/auth/login',
  '/auth/verify',
  '/api/docs',
  '/api/docs/*',
  "/openapi.yaml"
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if path is public
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  const token = await getToken(request)

  console.log('token in middleware >>>>>>>>>>>', token)
  if (!token) {
    return NextResponse.json(
      { error: 'Missing authentication token' },
      { status: 401 }
    );
  }
  try {
    // Verify JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // Add user info to request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.sub as string);
    requestHeaders.set('x-user-role', payload.role as string);

    // Return response with modified headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('JWT verification error:', error);
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    '/api/:path*',
    '/sw.js',
    '/((?!_next/static|_next/image|favicon.ico|demo|layout|theme).*)'
  ],
}; 