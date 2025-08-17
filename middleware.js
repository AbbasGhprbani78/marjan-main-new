import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isMissingLocale =
    !pathname.startsWith("/fa") && !pathname.startsWith("/en");
  const isPublicFile = PUBLIC_FILE.test(pathname);

  if (isMissingLocale && !isPublicFile && pathname !== "/favicon.ico") {
    const lang = request.cookies.get("lang")?.value || "fa";

    const url = request.nextUrl.clone();
    url.pathname = `/${lang}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
