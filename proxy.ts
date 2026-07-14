import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin/session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authed = verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value);

  if (pathname === "/admin/login") {
    return authed
      ? NextResponse.redirect(new URL("/admin/vehicles", request.url))
      : NextResponse.next();
  }

  if (!authed) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
