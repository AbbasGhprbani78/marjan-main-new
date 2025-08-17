"use client";
import React, { useEffect, useState } from "react";
import ProjectCardItem from "../Projects/ProjectCardItem";
import Pagination from "../module/Pagination";
import * as Icons from "iconsax-reactjs";
import CheckBox from "../module/CheckBox";
import Button from "../module/Button";
import PopFilter from "../module/PopFilter";
import { useTranslation } from "@/hook/useTranslation";

export default function Projects({ data, categories }) {
  const { t } = useTranslation();
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [filteredProducts, setFilteredProducts] = useState(data.projects);
  const productsToShow = filteredProducts?.slice(startIndex, endIndex);
  const [filters, setFilters] = useState({});
  const [isEmptyCheckBox, setEmptycheckBox] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const clearFilter = () => {
    setEmptycheckBox(true);
    setFilters({});
  };

  const handleCheckboxChange = (key, event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    setFilters((prev) => {
      if (checked) {
        return { ...prev, [key]: value };
      } else {
        return { ...prev, [key]: "" };
      }
    });

    setCurrentPage(1);
  };

  useEffect(() => {
    let temp = [...data.projects];

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        temp = temp.filter((catalog) => {
          const productField = catalog[key];
          if (Array.isArray(productField)) {
            return productField.includes(value);
          }
          return value === productField;
        });
      }
    });

    setFilteredProducts(temp);
    setCurrentPage(1);
  }, [filters, data.projects]);

  return (
    <main className="">
      <section
        className="mt-[3rem] grid grid-cols-12 gap-[1.3rem] px-20 md:px-40 lg:px-80"
        aria-label="لیست پروژه‌ها"
      >
        <div className="hidden lg:flex flex-col col-span-3">
          <div className="border-b border-[#b7b7b7] flex justify-between items-center  pb-7 mb-10">
            <h2 className="font-medium">{t("Filters")}</h2>
            <button
              type="button"
              className="flex justify-between items-center gap-3 font-normal cursor-pointer text-[#e3302d]"
              onClick={clearFilter}
              aria-label="حذف فیلترها"
            >
              <Icons.CloseCircle size="20" />
              {t("ClearFilters")}
            </button>
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

        <div className="relative mb-[1rem]  col-span-12 lg:hidden">
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
                aria-label="حذف فیلترها"
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
        <div className="col-span-12 lg:col-span-9">
          {filters.category && (
            <p className="font-medium text-[1.1rem] border-b border-[var(--color-gray-900)] pb-[.5rem] mb-[.9rem]">
              {filters.category}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.2rem]">
            {productsToShow?.map((project, index) => (
              <article
                key={index}
                className=""
                itemScope
                itemType="https://schema.org/CreativeWork"
              >
                <ProjectCardItem project={project} />
              </article>
            ))}
          </div>

          <nav
            className="mt-[4rem] mb-[3rem]"
            role="navigation"
            aria-label="صفحه‌بندی پروژه‌ها"
          >
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(data.projects.length / itemsPerPage)}
              onPageChange={setCurrentPage}
            />
          </nav>
        </div>
      </section>
    </main>
  );
}
