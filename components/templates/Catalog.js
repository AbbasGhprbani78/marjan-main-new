"use client";
import React, { useEffect, useState } from "react";
import * as Icons from "iconsax-reactjs";
import CheckBox from "../module/CheckBox";
import CatalogItem from "../Catalog/CatalogItem";
import PopFilter from "../module/PopFilter";
import Button from "../module/Button";
import Pagination from "../module/Pagination";
import { useTranslation } from "@/context/TranslationContext";
import { useRouter, useSearchParams } from "next/navigation";
export default function Catalog({ catalogs, categories }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 8;
  const [filters, setFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState(catalogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEmptyCheckBox, setEmptycheckBox] = useState(false);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const catalogToShow = filteredProducts?.slice(startIndex, endIndex);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const clearFilter = () => {
    setEmptycheckBox(true);
    setFilters({});
    router.push("?", { shallow: true });
  };

  const handleCheckboxChange = (key, event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    setFilters((prev) => {
      const prevValues = Array?.isArray(prev[key]) ? prev[key] : [];

      let newValues;
      if (checked) {
        newValues = [...prevValues, value];
      } else {
        newValues = prevValues?.filter((v) => v !== value);
      }

      const newFilters = { ...prev, [key]: newValues };
      if (newValues.length === 0) {
        delete newFilters[key];
      }

      return newFilters;
    });

    setCurrentPage(1);
  };

  useEffect(() => {
    if (Object.keys(filters).length === 0) {
      router.push("?", { shallow: true });
      return;
    }

    const query = new URLSearchParams({ page: "1" });
    Object.entries(filters).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        v.forEach((val) => query.append(k, val));
      } else {
        query.set(k, v);
      }
    });
    router.push(`?${query.toString()}`, { shallow: true });
  }, [filters]);

  useEffect(() => {
    if (!Array.isArray(catalogs)) return;

    let temp = [...catalogs];

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        temp = temp.filter((catalog) => {
          const productField = catalog[key];
          if (Array.isArray(productField)) {
            return value.some((val) => productField.includes(val));
          }
          return value.includes(productField);
        });
      }
    });

    setFilteredProducts(temp);
  }, [filters, catalogs]);

  useEffect(() => {
    const params = {};
    searchParams.forEach((value, key) => {
      if (key !== "page") {
        if (params[key]) {
          params[key] = Array.isArray(params[key])
            ? [...params[key], value]
            : [params[key], value];
        } else {
          params[key] = value;
        }
      }
    });

    let page = parseInt(searchParams.get("page") || "1", 10);

    if (params.category && !Array.isArray(params.category)) {
      params.category = [params.category];
    }

    setFilters(params);
    setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => query.append(key, val));
      } else {
        query.set(key, value);
      }
    });
    query.set("page", currentPage);
    router.push(`?${query.toString()}`, undefined, { shallow: true });
  }, [filters, currentPage]);

  const hasActiveFilters = Object.values(filters).some(
    (value) => Array.isArray(value) && value.length > 0
  );

  return (
    <div className="grid grid-cols-12 gap-[1.3rem]  pb-[2rem]">
      <div className=" hidden col-span-0 md:block md:col-span-4 lg:col-span-3  md:pt-[.27rem]">
        <div className="border-b border-[#b7b7b7] flex justify-between items-center  pb-7 mb-10">
          <h2 className="font-medium">{t("Filters")}</h2>
          {hasActiveFilters && (
            <button
              type="button"
              className="flex justify-between items-center gap-3 font-normal cursor-pointer text-[#e3302d]"
              onClick={clearFilter}
              aria-label={t("ClearFilters")}
            >
              <Icons.CloseCircle size="20" />
              {t("ClearFilters")}
            </button>
          )}
        </div>
        <div className="flex flex-col items-start justify-start gap-[.8rem] mt-[1.3rem] max-h-[25rem] overflow-y-auto">
          {categories?.length > 0 &&
            categories?.map((item, i) => (
              <CheckBox
                key={i}
                label={item}
                name="category"
                checked={
                  Array.isArray(filters?.category)
                    ? filters?.category?.includes(item)
                    : false
                }
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
            {hasActiveFilters && (
              <button
                type="button"
                className="flex justify-between items-center gap-3 font-normal cursor-pointer text-[#e3302d]"
                onClick={clearFilter}
                aria-label={t("ClearFilters")}
              >
                <Icons.CloseCircle size="20" />
                {t("ClearFilters")}
              </button>
            )}
          </div>
          <div className="flex flex-col items-start justify-start gap-[.8rem] mt-[1.3rem]">
            {categories?.length > 0 &&
              categories?.map((item, i) => (
                <CheckBox
                  key={i}
                  label={item}
                  name="category"
                  checked={
                    Array.isArray(filters?.category)
                      ? filters?.category?.includes(item)
                      : false
                  }
                  value={item}
                  onChange={(e) => handleCheckboxChange("category", e)}
                />
              ))}
          </div>
        </PopFilter>
      </div>
      <div className="col-span-12 md:col-span-8 lg:col-span-9">
        {filters?.category && filters?.category?.length > 0 && (
          <p className="font-medium text-[1.1rem] border-b border-[var(--color-gray-900)] pb-[.5rem] mb-[.9rem]">
            {filters?.category?.join(" , ")}
          </p>
        )}

        <div className="grid grid-cols-12 gap-[1rem] lg:gap-[1.7rem] mb-[2rem]">
          {catalogToShow?.length > 0 ? (
            <>
              {catalogToShow?.map((item, i) => (
                <div className="col-span-6 lg:col-span-3" key={i}>
                  <CatalogItem catalog={item} />
                </div>
              ))}
            </>
          ) : (
            <>
              <div
                role="alert"
                aria-live="polite"
                className="flex flex-col items-center justify-center col-span-full py-20 text-center text-gray-500"
              >
                <Icons.SearchNormal size={48} className="mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {t("NoResultsTitle")}
                </h3>
              </div>
            </>
          )}
        </div>
        {catalogToShow?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProducts?.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
