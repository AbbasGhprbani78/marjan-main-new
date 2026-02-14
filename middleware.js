import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const FA_ONLY_ROUTES = ["/suppliers", "/employment"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const hasLocale =
    pathname.startsWith("/fa") ||
    pathname.startsWith("/en") ||
    pathname.startsWith("/ar") ||
    pathname.startsWith("/ru");

  const isPublicFile = PUBLIC_FILE.test(pathname);

  if (isPublicFile || pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  if (!hasLocale) {
    const lang = request.cookies.get("lang")?.value || "fa";

    const host =
      request.headers.get("x-forwarded-host") || request.headers.get("host");
    const protocol = request.headers.get("x-forwarded-proto") || "https";

    const redirectUrl = `${protocol}://${host}/${lang}${pathname}${request.nextUrl.search}`;

    return NextResponse.redirect(redirectUrl);
  }

  if (hasLocale) {
    const segments = pathname.split("/").filter(Boolean);
    const currentLocale = segments[0];
    const cleanPath =
      segments.length > 1
        ? "/" + segments.slice(1).join("/")
        : segments.length === 1
        ? "/"
        : pathname;

    if (FA_ONLY_ROUTES.includes(cleanPath) && currentLocale !== "fa") {
      const host =
        request.headers.get("x-forwarded-host") || request.headers.get("host");
      const protocol = request.headers.get("x-forwarded-proto") || "https";

      const redirectUrl = `${protocol}://${host}/${currentLocale}`;

      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
