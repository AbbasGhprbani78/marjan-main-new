"use client";

import { useEffect, useState } from "react";
import styles from "./error.module.css";

const translations = {
  fa: {
    errorTitle: "خطای سرور رخ داده است",
    errorText: "به زودی برمی‌گردیم",
    retry: "تلاش مجدد",
  },
  en: {
    errorTitle: "A server error occurred",
    errorText: "We'll be back shortly",
    retry: "Retry",
  },
  ar: {
    errorTitle: "حدث خطأ في الخادم",
    errorText: "سنعود قريبًا",
    retry: "إعادة المحاولة",
  },
  ru: {
    errorTitle: "Произошла ошибка сервера",
    errorText: "Мы скоро вернемся",
    retry: "Повторить",
  },
};

export default function GlobalError({ error, reset }) {
  const [locale, setLocale] = useState("fa");
  const [dict, setDict] = useState(translations["fa"]);

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

  useEffect(() => {
    console.error("API Error:", error);
  }, [error]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            width={48}
            height={48}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m0 3.75h.007M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>
        </div>

        <h1 className={styles.title}>{dict.errorTitle}</h1>
        <p className={styles.text}>{dict.errorText}</p>

        <button onClick={() => reset()} className={styles.button}>
          {dict.retry}
        </button>
      </div>
    </div>
  );
}
