import { NextResponse } from "next/server";


const i18nMiddleware = async (): Promise<NextResponse> => {
  return NextResponse.next();
};


export async function middleware() {
  return i18nMiddleware();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|images|favicon.ico).*)", // Include all paths except static assets
    "/api/:path*", // Explicitly include /api routes
  ],
};
