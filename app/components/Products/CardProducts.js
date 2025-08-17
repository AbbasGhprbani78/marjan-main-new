"use client";
import React from "react";
import CardItem from "../module/CardItem";
import * as Icons from "iconsax-reactjs";
import { useTranslation } from "@/hook/useTranslation";

export default function CardProducts({ products }) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
      {products.length > 0 ? (
        products.map((product, i) => <CardItem key={i} product={product} />)
      ) : (
        <div
          role="alert"
          aria-live="polite"
          className="flex flex-col items-center justify-center col-span-full py-20 text-center text-gray-500"
        >
          <Icons.SearchNormal size={48} className="mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t("NoResultsTitle")}</h3>
          <p>{t("NoResultsMessage")}</p>
        </div>
      )}
    </div>
  );
}
