// import { NextResponse } from "next/server";

// const PUBLIC_FILE = /\.(.*)$/;

// export function middleware(request) {
//   const { pathname } = request.nextUrl;

//   const hasLocale =
//     pathname.startsWith("/fa") ||
//     pathname.startsWith("/en") ||
//     pathname.startsWith("/ar") ||
//     pathname.startsWith("/ru");

//   const isPublicFile = PUBLIC_FILE.test(pathname);

//   if (isPublicFile || pathname === "/favicon.ico") {
//     return NextResponse.next();
//   }

//   if (!hasLocale) {
//     const lang = request.cookies.get("lang")?.value || "fa";

//     const host =
//       request.headers.get("x-forwarded-host") || request.headers.get("host");
//     const protocol = request.headers.get("x-forwarded-proto") || "https";

//     const redirectUrl = `${protocol}://${host}/${lang}${pathname}${request.nextUrl.search}`;

//     return NextResponse.redirect(redirectUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
// };

import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const FA_ONLY_ROUTES = ["/suppliers", "/employment"];

export function middleware(request) {
  const { pathname, search } = request.nextUrl;

  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);

  let currentLocale = "fa";

  if (segments.length > 0 && ["fa", "en", "ar", "ru"].includes(segments[0])) {
    currentLocale = segments[0];
  }

  const cleanPath =
    segments.length > 0 && ["fa", "en", "ar", "ru"].includes(segments[0])
      ? "/" + segments.slice(1).join("/")
      : pathname;

  if (FA_ONLY_ROUTES.includes(cleanPath) && currentLocale !== "fa") {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = `/${currentLocale}`;
    homeUrl.search = "";
    return NextResponse.redirect(homeUrl);
  }

  const hasLocale =
    pathname.startsWith("/fa/") ||
    pathname.startsWith("/en/") ||
    pathname.startsWith("/ar/") ||
    pathname.startsWith("/ru/") ||
    pathname === "/fa" ||
    pathname === "/en" ||
    pathname === "/ar" ||
    pathname === "/ru";

  if (!hasLocale) {
    const preferredLang = request.cookies.get("lang")?.value || "fa";

    const validLang = ["fa", "en", "ar", "ru"].includes(preferredLang)
      ? preferredLang
      : "fa";

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${validLang}${pathname === "/" ? "" : pathname}`;
    redirectUrl.search = search;

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
