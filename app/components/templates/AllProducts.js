"use client";
import React, { useEffect, useState } from "react";
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
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEmptyCheckBox, setEmptycheckBox] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToShow = filteredProducts.slice(startIndex, endIndex);
  const { t, locale } = useTranslation();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const queryFilterKey = searchParams.get("filterKey");
  const queryValues = searchParams.get("values")?.split(",") || [];

  const handleFilterChange = (key, selectedValues, pushUrl = true) => {
    if (isEmptyCheckBox) {
      setEmptycheckBox(false);
    }

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
  };

  const clearFilter = () => {
    setEmptycheckBox(true);
    setFilters({});
    router.push(pathname);
  };

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

  useEffect(() => {
    let temp = [...products];

    if (searchTerm.trim().length >= 3) {
      temp = temp.filter((product) =>
        String(product.title || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    Object.entries(filters).forEach(([key, values]) => {
      if (!values || values.length === 0) return;

      const productKey = filterKeyMap[key];

      if (!productKey) return;

      const selectedStrs = new Set(values.map(normStr));
      const selectedNums = new Set(
        values.map(normThickness).filter((n) => Number.isFinite(n))
      );

      temp = temp.filter((product) => {
        const field = product?.[productKey];
        if (field == null) return false;

        if (key === "thicknesses") {
          const productNum = normThickness(field);
          if (!Number.isFinite(productNum)) return false;
          return selectedNums.has(productNum);
        }

        if (Array.isArray(field)) {
          return field.some((val) => selectedStrs.has(normStr(val)));
        }

        return selectedStrs.has(normStr(field));
      });
    });

    setFilteredProducts(temp);
    setCurrentPage(1);
  }, [filters, searchTerm, products]);

  useEffect(() => {
    if (isInitialLoad && queryFilterKey && queryValues.length > 0) {
      setFilters({ [queryFilterKey]: queryValues });
      setCurrentPage(1);
      setIsInitialLoad(false);
    }
  }, [queryFilterKey, queryValues.join(","), isInitialLoad]);

  const isLtr = false;

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
            />
          </div>
        </aside>

        <section className="lg:col-span-9">
          <CardProducts products={productsToShow} />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
            onPageChange={setCurrentPage}
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

//http://localhost:3000/fa/products?filterKey=industrie&values=%D9%82%D8%B7%D8%B9%D8%A7%D8%AA+%D8%B5%D9%86%D8%B9%D8%AA%DB%8C
//http://localhost:3000/fa/products?filterKey=industrie&values=%D9%82%D8%B7%D8%B9%D8%A7%D8%AA%20%D8%B5%D9%86%D8%B9%D8%AA%DB%8C
