// CardProducts.jsx
"use client";
import React from "react";
import CardItem from "../module/CardItem";
import * as Icons from "iconsax-reactjs";
import { useTranslation } from "@/hook/useTranslation";

export default function CardProducts({ products, isLoading }) {
  const { t } = useTranslation();

  const SkeletonCard = () => (
    <div className="h-[168px] bg-gray-200 animate-pulse" />
  );

  if (isLoading || products.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {Array.from({ length: 9 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
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
