// components/ImageLoadingWrapper.tsx
"use client";
import { useState, useEffect } from "react";
import Loading from "../loading";

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
