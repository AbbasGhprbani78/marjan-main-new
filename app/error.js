"use client";

import { useEffect } from "react";
import styles from "./error.module.css";
export default function GlobalError({ error, reset }) {
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

        <h1 className={styles.title}>مشکلی در سرور پیش آمد</h1>
        <p className={styles.text}>بزودی برمی‌گردیم</p>

        <button onClick={() => reset()} className={styles.button}>
          تلاش مجدد
        </button>
      </div>
    </div>
  );
}
