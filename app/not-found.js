"use client";

import { useRouter } from "next/navigation";
import styles from "./notFound.module.css";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* آیکون 404 */}
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

        <h1 className={styles.title}>صفحه یافت نشد</h1>
        <p className={styles.text}>
          ممکنه آدرس اشتباه باشه یا صفحه حذف شده باشه
        </p>

        <button onClick={() => router.push("/")} className={styles.button}>
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );
}
