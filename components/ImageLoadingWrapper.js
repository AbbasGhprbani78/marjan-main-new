"use client";
import Loading from "@/app/loading";
import { useState, useEffect } from "react";

export default function ImageLoadingWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const images = Array.from(document.images);
    if (images.length === 0) {
      setLoading(false);
      return;
    }

    const promises = images.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) resolve();
          else img.onload = () => resolve();
          img.onerror = () => resolve();
        })
    );

    Promise.all(promises).then(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  return <>{children}</>;
}
