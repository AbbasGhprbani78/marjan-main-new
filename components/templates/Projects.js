"use client";
import React, { useEffect, useState } from "react";
import ProjectCardItem from "../Projects/ProjectCardItem";
import Pagination from "../module/Pagination";
import * as Icons from "iconsax-reactjs";
import CheckBox from "../module/CheckBox";
import Button from "../module/Button";
import PopFilter from "../module/PopFilter";
import { useTranslation } from "@/context/TranslationContext";
import { useSearchParams } from "next/navigation";
export default function Projects({ data, categories }) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const itemsPerPage = 9;

  const queryPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(queryPage);

  const [filteredProducts, setFilteredProducts] = useState(data.projects);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToShow = filteredProducts?.slice(startIndex, endIndex);

  const [filters, setFilters] = useState({ category: [] });
  const [isEmptyCheckBox, setEmptycheckBox] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const pageFromQuery = Number(searchParams.get("page")) || 1;
    if (pageFromQuery !== currentPage) {
      setCurrentPage(pageFromQuery);
    }
  }, [searchParams]);

  const clearFilter = () => {
    setEmptycheckBox(true);
    setFilters({});
    const params = new URLSearchParams(window.location.search);
    params.delete("category");
    params.delete("page");
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

  const handleCheckboxChange = (key, event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    setFilters((prev) => {
      let newArray = prev[key] || [];

      if (checked) {
        newArray = [...newArray, value];
      } else {
        newArray = newArray.filter((item) => item !== value);
      }

      const params = new URLSearchParams(window.location.search);
      params.delete(key);
      params.delete("page");

      newArray.forEach((item) => params.append(key, item));

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);

      return { ...prev, [key]: newArray };
    });

    setCurrentPage(1);
  };

  useEffect(() => {
    let temp = [...data.projects];

    Object.entries(filters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        temp = temp.filter((project) => {
          const projectField = project[key];
          if (Array.isArray(projectField)) {
            return values.some((val) => projectField.includes(val));
          }
          return values.includes(projectField);
        });
      }
    });

    setFilteredProducts(temp);

    const pageFromQuery = Number(searchParams.get("page")) || 1;
    setCurrentPage(pageFromQuery);
  }, [filters, data.projects, searchParams]);

  useEffect(() => {
    const urlFilters = searchParams.getAll("category");
    setFilters((prev) => ({
      ...prev,
      category: urlFilters,
    }));
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;

    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);

    setCurrentPage(newPage);
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => Array.isArray(value) && value.length > 0
  );

  return (
    <main>
      <section
        className="mt-[3rem] grid grid-cols-12 gap-[1.3rem] px-20 md:px-40 lg:px-80"
        aria-label="لیست پروژه‌ها"
      >
        <div className="hidden lg:flex flex-col col-span-3">
          <div className="border-b border-[#b7b7b7] flex justify-between items-center  pb-7 mb-10">
            <h2 className="font-medium">{t("Filters")}</h2>
            {hasActiveFilters && (
              <button
                type="button"
                className="flex justify-between items-center gap-3 font-normal cursor-pointer text-[#e3302d]"
                onClick={clearFilter}
                aria-label="حذف فیلترها"
              >
                <Icons.CloseCircle size="20" />
                {t("ClearFilters")}
              </button>
            )}
          </div>
          <div className="flex flex-col items-start justify-start gap-[.8rem] mt-[1.3rem] max-h-[20rem] overflow-y-auto">
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

        <div className="relative mb-[1rem] col-span-12 lg:hidden">
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
                  aria-label="حذف فیلترها"
                >
                  <Icons.CloseCircle size="20" />
                  {t("ClearFilters")}
                </button>
              )}
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

        <div className="col-span-12 lg:col-span-9">
          {filters.category && (
            <p className="font-medium text-[1.1rem] border-b border-[var(--color-gray-900)] pb-[.5rem] mb-[.9rem]">
              {filters.category.join(" , ")}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.2rem]">
            {productsToShow.length > 0 ? (
              <>
                {productsToShow?.map((project, index) => (
                  <article
                    key={index}
                    itemScope
                    itemType="https://schema.org/CreativeWork"
                  >
                    <ProjectCardItem project={project} />
                  </article>
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
                  <p>{t("NoResultsMessage")}</p>
                </div>
              </>
            )}
          </div>

          {productsToShow.length > 0 && (
            <nav
              className="mt-[4rem] mb-[3rem]"
              role="navigation"
              aria-label="صفحه‌بندی پروژه‌ها"
            >
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
                onPageChange={handlePageChange}
              />
            </nav>
          )}
        </div>
      </section>
    </main>
  );
}
