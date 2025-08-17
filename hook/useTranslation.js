import fa from "@/i18n/fa.json";
import en from "@/i18n/en.json";
import { usePathname } from "next/navigation";

const dictionaries = { fa, en };

export function useTranslation() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "fa";

  const t = (key) => {
    return dictionaries[locale]?.[key] || key;
  };

  return { t, locale };
}
