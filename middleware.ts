import { NextRequest, NextResponse } from "next/server";
import { online } from "./lib/utils";

export async function middleware(request: NextRequest) {
  // Get the IP address of the user
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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
