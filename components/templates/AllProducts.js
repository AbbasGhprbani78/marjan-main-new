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
import { useTranslation } from "@/context/TranslationContext";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function AllProducts({ categories, products }) {
  const itemsPerPage = 9;
  const searchParams = useSearchParams();
  const queryPage = Number(searchParams.get("page")) || 1;
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(queryPage);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
              query.set(k, vals.join(","));
            }
          });

          query.set("page", "1");

          const newUrl = `${pathname}?${query.toString()}`;
          const currentUrl = `${pathname}?${searchParams.toString()}`;
          if (newUrl !== currentUrl) {
            router.replace(newUrl, { shallow: true });
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
    router.replace(pathname, { shallow: true });
  }, [pathname, router]);

  const filteredProducts = useMemo(() => {
    if (!filters || (Object.keys(filters).length === 0 && !searchTerm))
      return products;
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

      return Object.entries(filters).every(([key, values]) => {
        if (!values?.length) return true;

        const productKey = filterKeyMap[key];
        if (!productKey) return true;

        const field = product?.[productKey];
        if (field == null) return false;

        const selectedStrs = values.map(normStr);

        if (key === "thicknesses") {
          const productNum = normThickness(field);
          return (
            Number.isFinite(productNum) &&
            selectedStrs.some((val) => normThickness(val) === productNum)
          );
        }

        if (Array.isArray(field)) {
          const normalizedField = field.map(normStr);
          return selectedStrs.some((val) => normalizedField.includes(val));
        }

        return selectedStrs.some((val) => normStr(field) === val);
      });
    });
  }, [products, filters, searchTerm]);

  const productsToShow = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    const newFilters = {};

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newFilters[key] = value.split(",").map(decodeURIComponent);
      }
    });

    setFilters(newFilters);
  }, [searchParams]);

  useEffect(() => {
    const pageFromQuery = Number(searchParams.get("page")) || 1;
    setCurrentPage(pageFromQuery);
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setIsLoading(true);
    const query = new URLSearchParams(searchParams.toString());
    query.set("page", newPage.toString());
    router.replace(`${pathname}?${query.toString()}`, { shallow: true });
  };

  const isEmptyCheckBox = Object.keys(filters).length === 0;
  const isLtr = false;

  const [lastPageBeforeSearch, setLastPageBeforeSearch] = useState(1);

  useEffect(() => {
    const query = new URLSearchParams(searchParams.toString());

    if (searchTerm.trim().length >= 3) {
      if (!searchParams.get("searching")) {
        setLastPageBeforeSearch(currentPage);
      }
      query.set("page", "1");
      query.set("searching", "true");
      router.replace(`${pathname}?${query.toString()}`, { shallow: true });
    } else if (
      searchTerm.trim().length === 0 &&
      searchParams.get("searching")
    ) {
      query.set("page", lastPageBeforeSearch.toString());
      query.delete("searching");
      router.replace(`${pathname}?${query.toString()}`, { shallow: true });
    }
  }, [searchTerm]);

  useEffect(() => {
    setIsLoading(false);
  }, [searchParams.toString()]);

  return (
    <main className="px-20 md:px-40 lg:px-80">
      <section
        className={`w-full h-full pt-[150px] lg:pt-[120px] ${
          ["fa", "ar"].includes(locale) ? "font-fa" : "font-en"
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
          <CardProducts products={productsToShow} isLoading={isLoading} />

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

// useEffect(() => {
//   setIsLoading(false);
// setIsLoading(true);
// }, [queryPage, filters, searchTerm]);
