"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./error.module.css";

const translations = {
  fa: {
    title: "صفحه یافت نشد",
    text: "ممکنه آدرس اشتباه باشه یا صفحه حذف شده باشه",
    button: "بازگشت به صفحه اصلی",
  },
  en: {
    title: "Page not found",
    text: "The URL might be incorrect or the page has been removed",
    button: "Go back to home",
  },
  ar: {
    title: "الصفحة غير موجودة",
    text: "قد يكون العنوان خاطئًا أو تم حذف الصفحة",
    button: "العودة إلى الصفحة الرئيسية",
  },
  ru: {
    title: "Страница не найдена",
    text: "Возможно, адрес неверный или страница была удалена",
    button: "Вернуться на главную",
  },
};

export default function NotFound() {
  const router = useRouter();
  const [locale, setLocale] = useState("fa");
  const [dict, setDict] = useState(translations["fa"]);

  // استخراج زبان از URL
  useEffect(() => {
    const path = window.location.pathname;
    const lang = path.split("/")[1];
    if (["fa", "ar", "ru", "en"].includes(lang)) {
      setLocale(lang);
      setDict(translations[lang]);
    } else {
      setLocale("fa");
      setDict(translations["fa"]);
    }
  }, []);

  return (
    <div
      className={styles.wrapper}
      dir={["fa", "ar"].includes(locale) ? "rtl" : "ltr"}
    >
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={48}
            height={48}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17v-6l-2 2m8-2h-4l4 4V9l-4 4h4z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z"
            />
          </svg>
        </div>

        <h1 className={styles.title}>{dict.title}</h1>
        <p className={styles.text}>{dict.text}</p>

        <button onClick={() => router.push("/")} className={styles.button}>
          {dict.button}
        </button>
      </div>
    </div>
  );
}
