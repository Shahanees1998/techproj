import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getToken } from "./helpers/serverHelpers";

const ignoreRoutes = [
  '/api/auth/login',
  '/api/auth/verify-link',
  '/api/auth/verify-token',
  '/auth/login',
  '/auth/verify',
  '/api/docs',
  '/api/docs/*',
  "/openapi.yaml"
];

const i18nMiddleware = async (request: NextRequest): Promise<NextResponse> => {
  const pathname = request.nextUrl.pathname;

  if (ignoreRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (pathname === '/') {
    return dashboardMiddleware(request);
  } else if (pathname.startsWith(`/auth`)) {
    return authMiddleware(request);
  } else if (pathname.startsWith(`/api`)) {
    return apiMiddleware(request);
  } else if (pathname === "/") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } else {
    return NextResponse.next();
  }
};

const apiMiddleware = async (request: NextRequest): Promise<NextResponse> => {
  const isValidateToken = await isValidToken(request);
  if (!isValidateToken.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
        data: null,
      },
      { status: 401 },
    );
  }

  return NextResponse.next();
};

const dashboardMiddleware = async (request: NextRequest): Promise<NextResponse> => {
  const isValidateToken = await isValidToken(request);

  if (!isValidateToken.success) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
};

const authMiddleware = async (request: NextRequest): Promise<NextResponse> => {
  const isValidateToken = await isValidToken(request);

  if (isValidateToken.success) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

type TokenVerificationResponse = {
  success: boolean;
  role: Role | null;
};

const isValidToken = async (
  request: NextRequest,
): Promise<TokenVerificationResponse> => {
  try {
    const token = await getToken(request)


    if (!token) {
      return {
        success: false,
        role: null,
      };
    }

    // Verify JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.sub as string);
    requestHeaders.set('x-user-role', payload.role as string);

    // Return response with modified headers
    return {
      success: true,
      role:null,
    };
  } catch (error) {
    console.error('JWT verification error:', error);
    return {
      success: false,
      role: null,
    };
  }
};

export async function middleware(req: NextRequest) {
  return i18nMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|images|favicon.ico).*)", // Include all paths except static assets
    "/api/:path*", // Explicitly include /api routes
  ],
};
