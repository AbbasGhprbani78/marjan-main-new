import { useParams } from "next/navigation";
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
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

export function validateNationalCode(code) {
  if (!/^\d{10}$/.test(code)) return false;
  if (/^(\d)\1+$/.test(code)) return false;

  const check = parseInt(code[9], 10);
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(code[i], 10) * (10 - i);
  }

  const remainder = sum % 11;
  return (
    (remainder < 2 && check === remainder) ||
    (remainder >= 2 && check === 11 - remainder)
  );
}

export function validateBirthCertificateNumber(num) {
  return /^\d{1,10}$/.test(num);
}

export function validateIranianMobile(mobile) {
  return /^09\d{9}$/.test(mobile);
}

export function validateIranianPhone(phone) {
  return /^0\d{10}$/.test(phone);
}
