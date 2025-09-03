"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import SearchInput from "../module/SearchInput";
import Button from "../module/Button";
import CardProducts from "../Products/CardProducts";
import * as Icons from "iconsax-reactjs";
import Pagination from "../module/Pagination";
import ImageDescription from "../Products/ImageDescription";
import PopFilter from "../module/PopFilter";
import CategoryFilters from "../Products/CategoryFilters";
import { useTranslation } from "@/hook/useTranslation";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function AllProducts({ categories, products }) {
  const itemsPerPage = 9;
  const searchParams = useSearchParams();
  const queryPage = Number(searchParams.get("page")) || 1;
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(queryPage);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { t, locale } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const queryFilterKey = searchParams.get("filterKey");
  const queryValues = searchParams.get("values")?.split(",") || [];

  const filterKeyMap = {
    color: "colors",
    size: "sizes",
    industrie: "industry",
    environment: "environment",
    style: "style",
    surface: "surface",
    thicknesses: "thickness",
  };

  const normStr = (v) => String(v).trim().toLowerCase();
  const normThickness = (v) => {
    const s = String(v).replace(",", ".");
    const n = Number(s.replace(/[^\d.]/g, ""));
    return Number.isFinite(n) ? n : NaN;
  };

  const handleFilterChange = useCallback(
    (key, selectedValues, pushUrl = true) => {
      setFilters((prev) => {
        const newFilters = { ...prev, [key]: selectedValues };

        if (pushUrl) {
          const query = new URLSearchParams();
          Object.entries(newFilters).forEach(([k, vals]) => {
            if (vals && vals.length > 0) {
              query.set("filterKey", k);
              query.set("values", vals.join(","));
            }
          });

          const newUrl = `${pathname}?${query.toString()}`;
          const currentUrl = `${pathname}?${searchParams.toString()}`;
          if (newUrl !== currentUrl) {
            router.push(newUrl);
          }
        }

        return newFilters;
      });

      setCurrentPage(1);
    },
    [pathname, router, searchParams]
  );

  const clearFilter = useCallback(() => {
    setFilters({});
    router.push(pathname);
  }, [pathname, router]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (searchTerm.trim().length >= 3) {
        const lowerSearch = searchTerm.toLowerCase();
        const inTitle = String(product.title || "")
          .toLowerCase()
          .includes(lowerSearch);
        const inCode = (product.tile_variants || []).some((variant) =>
          String(variant.code || "")
            .toLowerCase()
            .includes(lowerSearch)
        );
        if (!inTitle && !inCode) return false;
      }

      for (const [key, values] of Object.entries(filters)) {
        if (!values?.length) continue;
        const productKey = filterKeyMap[key];
        if (!productKey) continue;

        const field = product?.[productKey];
        if (field == null) return false;

        const selectedStrs = new Set(values.map(normStr));

        if (key === "thicknesses") {
          const selectedNums = new Set(
            values.map(normThickness).filter((n) => Number.isFinite(n))
          );
          const productNum = normThickness(field);
          if (!Number.isFinite(productNum) || !selectedNums.has(productNum)) {
            return false;
          }
        } else if (Array.isArray(field)) {
          if (!field.some((val) => selectedStrs.has(normStr(val))))
            return false;
        } else {
          if (!selectedStrs.has(normStr(field))) return false;
        }
      }

      return true;
    });
  }, [products, filters, searchTerm]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToShow = filteredProducts.slice(startIndex, endIndex);

  useEffect(() => {
    if (queryFilterKey && queryValues.length > 0) {
      const decodedValues = queryValues.map((v) => decodeURIComponent(v));
      setFilters({ [queryFilterKey]: decodedValues });
    } else {
      setFilters({});
    }
  }, [queryFilterKey, queryValues.join(",")]);

  useEffect(() => {
    const pageFromQuery = Number(searchParams.get("page")) || 1;
    if (pageFromQuery !== currentPage) {
      setCurrentPage(pageFromQuery);
    }
  }, [searchParams, currentPage]);

  const handlePageChange = (newPage) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set("page", newPage.toString());
    router.push(`${pathname}?${query.toString()}`);
  };

  const isEmptyCheckBox = Object.keys(filters).length === 0;
  const isLtr = false;

  const [lastPageBeforeSearch, setLastPageBeforeSearch] = useState(1);

  useEffect(() => {
    if (searchTerm.trim().length >= 3) {
      if (!searchParams.get("searching")) {
        setLastPageBeforeSearch(currentPage);
      }
      setCurrentPage(1);
      const query = new URLSearchParams(searchParams.toString());
      query.set("page", "1");
      query.set("searching", "true");
      router.push(`${pathname}?${query.toString()}`);
    } else if (searchTerm.trim().length === 0 && lastPageBeforeSearch !== 1) {
      setCurrentPage(lastPageBeforeSearch);
      const query = new URLSearchParams(searchParams.toString());
      query.set("page", lastPageBeforeSearch.toString());
      query.delete("searching");
      router.push(`${pathname}?${query.toString()}`);
    }
  }, [searchTerm]);

  return (
    <main className="px-20 md:px-40 lg:px-80">
      <section
        className={`w-full h-full pt-[150px] lg:pt-[120px] ${
          locale === "fa" ? "font-fa" : "font-en"
        }`}
      >
        <div className="grid grid-cols-1 gap-y-[30px] md:grid-cols-3 md:gap-x-[3rem] md:gap-y-0 items-center relative ">
          <div className="w-full md:col-span-1 lg:hidden">
            <Button
              text={isFilterOpen ? t("Applyfilter") : t("Filters")}
              onClick={() => setIsFilterOpen((prev) => !prev)}
              isActive={isFilterOpen}
            />
          </div>
          <section
            className={`w-full md:col-span-1 ${
              isLtr ? "md:col-start-1" : "md:col-start-3"
            }`}
          >
            <SearchInput
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </section>
          <aside>
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
              <CategoryFilters
                categories={categories}
                handleFilterChange={handleFilterChange}
                isEmptyCheckBox={isEmptyCheckBox}
                ismobile={true}
                queryFilterKey={queryFilterKey}
                queryValues={queryValues}
                filters={filters}
              />
            </PopFilter>
          </aside>
        </div>
      </section>

      <section className=" mt-[30px] grid lg:grid-cols-12 gap-[1.2rem]">
        <aside className="hidden lg:flex flex-col justify-between col-span-3">
          <div>
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
            <CategoryFilters
              categories={categories}
              handleFilterChange={handleFilterChange}
              isEmptyCheckBox={isEmptyCheckBox}
              queryFilterKey={queryFilterKey}
              queryValues={queryValues}
              filters={filters}
            />
          </div>
        </aside>

        <section className="lg:col-span-9">
          <CardProducts products={productsToShow} />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </section>
      </section>
      <figure className="mb-[1.6rem] hidden lg:block">
        <ImageDescription />
      </figure>
      <section className="lg:hidden grid lg:grid-cols-12 gap-[1.2rem]">
        <figure className="col-span-12 lg:col-span-3">
          <ImageDescription />
        </figure>
        <div className="hidden col-span-0 lg:block lg:col-span-9"></div>
      </section>
    </main>
  );
}
