import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith("/auth") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  const authMiddleware = withAuth({
    pages: {
      signIn: "/auth",
    },
  });

  return authMiddleware(req as NextRequestWithAuth, event);
}
