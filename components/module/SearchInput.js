"use client";
import React from "react";
import * as Icons from "iconsax-reactjs";
import { useTranslation } from "@/hook/useTranslation";

export default function SearchInput({ searchTerm, onSearchChange }) {
  const { t } = useTranslation();
  return (
    <div className="w-full border-b border-[#b7b7b7] flex items-center justify-between pb-10 p-5 ">
      <input
        id="product-search"
        maxLength={50}
        type="text"
        placeholder={t("ProductSearch")}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full text-[#242021] placeholder-[#242021] outline-none bg-transparent"
        aria-label={t("ProductSearch")}
      />
      <Icons.SearchNormal1 size="24" aria-hidden="true" />
    </div>
  );
}
