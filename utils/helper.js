import { useParams } from "next/navigation";
export function truncateText(text, maxLength) {
  if (text?.length <= maxLength) return text;
  return text?.slice(0, maxLength)?.trim() + "  ...";
}

export function toPersianDigits(number) {
  return number?.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

export function useLocalizedLink() {
  const { locale } = useParams();

  function localizedHref(href) {
    if (!href) return `/${locale}`;

    const isExternal = href.startsWith("https://");
    if (isExternal) return href;

    const normalizedHref = href.startsWith("/") ? href : `/${href}`;
    return `/${locale}${normalizedHref}`;
  }

  return { localizedHref };
}

// http://localhost:3000/ru/blogs?tab=2&category=cтатьи
// http://localhost:3000/ru/blogs?tab=2&category=статьи
