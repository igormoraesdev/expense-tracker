import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const authMiddleware = withAuth({
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    authorized({ req, token }) {
      const { pathname } = req.nextUrl;

      if (pathname === "/" && token) {
        return false;
      } else if (pathname === "/" && !token) {
        return true;
      }
      if (pathname === "/auth") return true;

      return !!token;
    },
  },
});

const pathList = ["/_next/", "/images/", "/favicon.ico", "/api"];

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const { pathname } = req.nextUrl;

  const condition = pathList.some((path) => pathname.startsWith(path));

  if (condition) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/auth") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return authMiddleware(req as NextRequestWithAuth, event);
}
