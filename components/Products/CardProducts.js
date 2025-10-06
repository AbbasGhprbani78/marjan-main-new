// CardProducts.jsx
"use client";
import React from "react";
import CardItem from "../module/CardItem";
import * as Icons from "iconsax-reactjs";
import { useTranslation } from "@/context/TranslationContext";

export default function CardProducts({ products, isLoading }) {
  const { t } = useTranslation();

  const SkeletonCard = () => (
    <div className="h-[168px] bg-gray-200 animate-pulse" />
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {Array.from({ length: 9 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="flex flex-col items-center justify-center col-span-full py-20 text-center text-gray-500"
      >
        <Icons.SearchNormal size={48} className="mb-4" />
        <h3 className="text-lg font-semibold mb-2">{t("NoResultsTitle")}</h3>
        <p>{t("NoResultsMessage")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
      {products.map((product) => (
        <CardItem key={product.id} product={product} />
      ))}
    </div>
  );
}
