"use client";
import React, { useEffect, useState } from "react";
import * as Icons from "iconsax-reactjs";
import CheckBox from "../module/CheckBox";
import CatalogItem from "../Catalog/CatalogItem";
import PopFilter from "../module/PopFilter";
import Button from "../module/Button";
import Pagination from "../module/Pagination";
import { useTranslation } from "@/hook/useTranslation";

export default function Catalog({ catalogs, categories }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 8;
  const [filters, setFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState(catalogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEmptyCheckBox, setEmptycheckBox] = useState(false);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const catalogToShow = filteredProducts.slice(startIndex, endIndex);
  const { t } = useTranslation();

  const clearFilter = () => {
    setEmptycheckBox(true);
    setFilters({});
  };

  const handleCheckboxChange = (key, event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    setFilters((prev) => {
      return {
        ...prev,
        [key]: checked ? value : "",
      };
    });

    setCurrentPage(1);
  };

  useEffect(() => {
    let temp = [...catalogs];

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        temp = temp.filter((catalog) => {
          const productField = catalog[key];
          if (Array.isArray(productField)) {
            return productField.includes(value);
          }
          return productField === value;
        });
      }
    });

    setFilteredProducts(temp);
    setCurrentPage(1);
  }, [filters, catalogs]);

  return (
    <div className="grid grid-cols-12 gap-[1.3rem]  pb-[2rem]">
      <div className=" hidden col-span-0 md:block md:col-span-4 lg:col-span-3  md:pt-[.27rem]">
        <div className="border-b border-[#b7b7b7] flex justify-between items-center  pb-7 mb-10">
          <h2 className="font-medium">{t("Filters")}</h2>
          <button
            type="button"
            className="flex justify-between items-center gap-3 font-normal cursor-pointer text-[#e3302d]"
            onClick={clearFilter}
            aria-label={t("ClearFilters")}
          >
            <Icons.CloseCircle size="20" />
            {t("ClearFilters")}
          </button>
        </div>
        <div className="flex flex-col items-start justify-start gap-[.8rem] mt-[1.3rem] max-h-[25rem] overflow-y-auto">
          {categories?.map((item, i) => (
            <CheckBox
              key={i}
              label={item}
              name="category"
              checked={filters.category?.includes(item) || false}
              value={item}
              onChange={(e) => handleCheckboxChange("category", e)}
            />
          ))}
        </div>
      </div>
      <div className="relative mb-[1rem]  col-span-12 md:hidden">
        <Button
          text={isFilterOpen ? t("Applyfilter") : t("Filters")}
          onClick={() => setIsFilterOpen((prev) => !prev)}
          isActive={isFilterOpen}
        />
        <PopFilter className isFilterOpen={isFilterOpen}>
          <div className="border-b border-[#b7b7b7] flex justify-between items-center  pb-7">
            <h2 className="font-medium">{t("Filters")}</h2>
            <button
              type="button"
              className="flex justify-between items-center gap-3 font-normal cursor-pointer text-[#e3302d]"
              onClick={clearFilter}
              aria-label={t("ClearFilters")}
            >
              <Icons.CloseCircle size="20" />
              {t("ClearFilters")}
            </button>
          </div>
          <div className="flex flex-col items-start justify-start gap-[.8rem] mt-[1.3rem]">
            {categories?.map((item, i) => (
              <CheckBox
                key={i}
                label={item}
                name="category"
                checked={filters.category?.includes(item) || false}
                value={item}
                onChange={(e) => handleCheckboxChange("category", e)}
              />
            ))}
          </div>
        </PopFilter>
      </div>
      <div className="col-span-12 md:col-span-8 lg:col-span-9">
        {filters.category && (
          <p className="font-medium text-[1.1rem] border-b border-[var(--color-gray-900)] pb-[.5rem] mb-[.9rem]">
            {filters.category}
          </p>
        )}

        <div className="grid grid-cols-12 gap-[1rem] lg:gap-[1.7rem] mb-[2rem]">
          {catalogToShow.map((item, i) => (
            <div className="col-span-6 lg:col-span-3" key={i}>
              <CatalogItem catalog={item} />
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
