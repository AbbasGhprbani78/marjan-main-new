"use client";
import Loading from "@/app/loading";
import { useState, useEffect } from "react";

export default function ImageLoadingWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const MIN_LOADING_TIME = 1300;

    const images = Array.from(document.images);
    if (images.length === 0) {
      const timer = setTimeout(() => setLoading(false), MIN_LOADING_TIME);
      return () => clearTimeout(timer);
    }

    const imagePromises = images.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) resolve();
          else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }
        })
    );

    const timerPromise = new Promise((resolve) =>
      setTimeout(resolve, MIN_LOADING_TIME)
    );

    Promise.all([Promise.all(imagePromises), timerPromise]).then(() =>
      setLoading(false)
    );
  }, []);

  if (loading) return <Loading />;
  return <>{children}</>;
}
