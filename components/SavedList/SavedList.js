"use client";
import React, { useEffect, useState } from "react";
import CardItem from "../module/CardItem";
import * as Icons from "iconsax-reactjs";
import Pagination from "../module/Pagination";
import { useTranslation } from "@/hook/useTranslation";
export default function SavedList({ products }) {
  const { t } = useTranslation();
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [savedProducts, setSavedProducts] = useState(products);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsCards = savedProducts.map((item) => ({
    ...item.product,
    image: item.product.main_image,
    is_save: true,
  }));
  const productsToShow = productsCards.slice(startIndex, endIndex);

  const handleUnSave = (productId) => {
    setSavedProducts((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-[20px]">
        {productsToShow.length > 0 ? (
          productsToShow.map((product) => (
            <CardItem
              key={product.id}
              product={product}
              setProductIdUnSave={handleUnSave}
            />
          ))
        ) : (
          <div
            role="alert"
            aria-live="polite"
            className="flex flex-col items-center justify-center col-span-full py-20 text-center text-gray-500 h-full"
          >
            <Icons.SearchNormal size={48} className="mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {t("NoResultsTitle")}
            </h3>
            <p>{t("NoFavoritesMessage")}</p>
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(products.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
