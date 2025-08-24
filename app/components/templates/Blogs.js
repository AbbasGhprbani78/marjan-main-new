"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BlogsItemCard from "../Blogs/BlogsItemCard";
import Pagination from "../module/Pagination";
import CheckBox from "../module/CheckBox";
import Button2 from "../module/Button2";
import * as Icons from "iconsax-reactjs";
import Button from "../module/Button";
import PopFilter from "../module/PopFilter";
import Image from "next/image";

import Link from "next/link";
import { truncateText, useLocalizedLink } from "@/utils/helper";
import { useTranslation } from "@/hook/useTranslation";
import { useRouter, useSearchParams } from "next/navigation";

export default function Blogs({ blogs, categories, filters }) {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState(Number(searchParams.get("tab")) || 1);
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || categories[0]?.value
  );
  const [filterList, setFilterList] = useState([]);

  const [activeFilters, setActiveFilters] = useState(
    searchParams.getAll("filter") || []
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const buttonsRef = useRef({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { t } = useTranslation();
  const { localizedHref } = useLocalizedLink();
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const urlTab = Number(searchParams.get("tab"));
    if (urlTab && urlTab !== tab) setTab(urlTab);

    const urlCategory = searchParams.get("category");
    if (urlCategory && urlCategory !== selectedCategory) {
      setSelectedCategory(urlCategory);
    }

    const urlFilters = searchParams.getAll("filter");
    if (JSON.stringify(urlFilters) !== JSON.stringify(activeFilters)) {
      setActiveFilters(urlFilters);
    }
  }, [searchParams]);

  const updateQuery = (newTab, category, filtersArr) => {
    const params = new URLSearchParams(window.location.search);

    params.set("tab", newTab);
    if (category) params.set("category", category);
    params.delete("filter");
    if (filtersArr?.length)
      filtersArr.forEach((f) => params.append("filter", f));

    const newUrl = `${window.location.pathname}?${params.toString()}`;

    window.history.replaceState({}, "", newUrl);
  };

  const handleTabChange = (newTab, category = selectedCategory) => {
    setTab(newTab);
    setSelectedCategory(category);
    updateQuery(newTab, category, activeFilters);
  };

  const productsToShow = useMemo(() => {
    const selectedData = blogs[selectedCategory] || [];

    const filtered = activeFilters.length
      ? selectedData.filter((item) =>
          activeFilters.every((f) => item.filters?.includes(f))
        )
      : selectedData;

    return filtered.slice(startIndex, endIndex);
  }, [blogs, selectedCategory, activeFilters, startIndex, endIndex]);

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.offsetWidth + 16;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const normalizeValue = (value) => {
    if (/^[A-Za-z]/.test(value)) {
      return value
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }
    return value;
  };

  const chnageHndler = (e) => {
    const value = normalizeValue(e.target.value);
    setSelectedCategory(value);
    setCurrentPage(1);
    updateQuery(tab, value, activeFilters);
  };

  const tabTitle = () => {
    if (tab === 1) return t("Blogs");
    if (tab === 2) {
      switch (selectedCategory) {
        case "articles":
          return t("Articles");
        case "videos":
          return t("Videos");
        case "news":
          return t("News");
        default:
          return null;
      }
    }
    return null;
  };

  const clearFilter = () => {
    setActiveFilters([]);
  };

  const toggleFilter = (value) => {
    setActiveFilters((prev) => {
      const newFilters = prev.includes(value) ? [] : [value];

      const params = new URLSearchParams(window.location.search);

      params.delete("filter");

      newFilters.forEach((f) => params.append("filter", f));

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);

      return newFilters;
    });
  };

  useEffect(() => {
    const currentButton = buttonsRef.current[selectedCategory];
    if (currentButton) {
      const { offsetLeft, offsetWidth } = currentButton;
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
    setFilterList(filters[selectedCategory]);
    setActiveFilters([]);
  }, [selectedCategory, filters]);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        setShowArrows(scrollWidth > clientWidth);
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);

    return () => window.removeEventListener("resize", checkScroll);
  }, [productsToShow]);

  useEffect(() => {
    const urlFilters = searchParams.getAll("filter");
    setActiveFilters(urlFilters);
  }, [searchParams]);

  return (
    <>
      <h2 className="hidden md:block font-[500] title  mb-[1.5rem] md:mb-[2.5rem] text-center">
        {tabTitle()}
      </h2>
      <div className="block w-3/4 mx-auto mb-[2rem]  md:hidden">
        <div
          role="tablist"
          aria-label="دسته بندی های بلاگ"
          className=" flex justify-between items-center border-b border-gray-300 relative text-sm font-medium"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              ref={(el) => (buttonsRef.current[cat.value] = el)}
              role="tab"
              aria-selected={selectedCategory === cat.value}
              aria-controls={`panel-${cat.value}`}
              id={`tab-${cat.value}`}
              onClick={() => {
                if (tab === 1) {
                  setSelectedCategory(cat.value);
                  setCurrentPage(1);
                } else {
                  handleTabChange(2, cat.value);
                }
              }}
              className={`text-[1rem] relative px-4 pt-2 pb-[.5rem] transition-all duration-300 ${
                selectedCategory === cat.value
                  ? "text-[var(--color-gray-900)]"
                  : "text-gray-500"
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span
            className="absolute bottom-0 h-[2px] bg-[var(--color-gray-900)] transition-all duration-300"
            style={{
              left: underlineStyle.left,
              width: underlineStyle.width,
            }}
          />
        </div>
      </div>
      {tab === 2 && (
        <div className="w-full md:col-span-1 md:hidden">
          <Button
            text={isFilterOpen ? t("Applyfilter") : t("Filters")}
            onClick={() => setIsFilterOpen((prev) => !prev)}
            isActive={isFilterOpen}
          />
        </div>
      )}

      <aside className="mb-[2rem]">
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
          <div className="flex flex-col items-start justify-start gap-[.8rem] mt-[1.3rem] max-h-[20rem] overflow-y-auto">
            {filterList?.map((item, i) => (
              <CheckBox
                key={i}
                label={item.label}
                name="filter"
                checked={activeFilters.includes(item.value)}
                value={item.value}
                onChange={() => toggleFilter(item.value)}
              />
            ))}
          </div>
        </PopFilter>
      </aside>
      {tab === 1 ? (
        <>
          <div className="hidden md:block pt-[1rem]">
            {Object.entries(blogs).map((key, value) => (
              <ArticlesRow
                blogsItems={key[1].slice(0, 4)}
                handleTabChange={handleTabChange}
                setSelectedCategory={setSelectedCategory}
                category={key[0]}
                name={key[0]}
                key={key}
              />
            ))}
          </div>
          <div className="relative md:hidden">
            {showArrows && (
              <>
                <button
                  onClick={() => scroll("right")}
                  className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] absolute top-[50%] right-[-10px] md:right-[-20px] translate-y-[-80%] z-10 rounded-full backdrop-blur-[4px] cursor-pointer"
                  style={{ backgroundColor: "rgba(31, 41, 55, 0.5)" }}
                >
                  <Icons.ArrowRight className="m-auto text-white w-20 h-20 md:w-35 md:h-35 " />
                </button>
                <button
                  onClick={() => scroll("left")}
                  className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] absolute top-[50%] left-[-10px] md:left-[-20px] translate-y-[-80%] z-10 rounded-full backdrop-blur-[4px] cursor-pointer"
                  style={{ backgroundColor: "rgba(31, 41, 55, 0.5)" }}
                >
                  <Icons.ArrowLeft className="m-auto text-white w-20 h-20 md:w-35 md:h-35 " />
                </button>
              </>
            )}

            <div
              ref={scrollRef}
              className="flex items-center flex-nowrap  gap-[1rem] overflow-x-auto max-w-[500px] md:hidden scroll-smooth border-b border-[#c4c4c4] pb-10 hide-scrollbar "
            >
              {productsToShow.slice(0, 4).map((item, i) => (
                <Link
                  href={localizedHref(`/blogs/${item?.id}`)}
                  key={i}
                  className="flex flex-col gap-10 min-w-full shrink-0 "
                >
                  <div className="relative aspect-square w-full">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                      alt="blog item image"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p>{truncateText(item.text, 20)}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex justify-center w-full pt-[2rem] md:hidden">
            <div className="w-[137px]">
              <Button2
                text={t("More")}
                onClick={() => handleTabChange(2, selectedCategory)}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-12 gap-[1rem]">
            <div className="hidden md:block md:col-span-4 lg:col-span-3">
              <span className="w-full font-medium text-[1rem] border-b border-[#e8e8e8] inline-block pb-[1rem]">
                {t("Categories")}
              </span>
              <div className="flex flex-col mt-[1rem] gap-[.8rem]">
                {categories.map((category) => (
                  <CheckBox
                    label={category.value}
                    checked={selectedCategory === category.value}
                    onChange={chnageHndler}
                    value={category.value}
                    key={category.value}
                  />
                ))}
              </div>
              <div className="border-b border-[#b7b7b7] flex justify-between items-center  pb-[1rem] mt-[2rem]">
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
              <div className="flex flex-col items-start justify-start gap-[.8rem] mt-[1.3rem] max-h-[20rem] overflow-y-auto">
                {filterList?.map((item, i) => (
                  <CheckBox
                    key={i}
                    label={item.label}
                    name="filter"
                    checked={activeFilters.includes(item.value)}
                    value={item.value}
                    onChange={() => toggleFilter(item.value)}
                  />
                ))}
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 lg:col-span-9">
              {activeFilters.length > 0 && (
                <p className="font-medium text-[1.1rem] border-b border-[var(--color-gray-900)] pb-[.5rem] mb-[.9rem]">
                  {
                    filterList.find((item) => item.value === activeFilters[0])
                      ?.label
                  }
                </p>
              )}

              {productsToShow.length > 0 ? (
                <div className="grid grid-cols-12 gap-x-[1.5rem] gap-y-[2.2rem] md:gap-y-[4rem]">
                  {productsToShow.map((item, i) => (
                    <div
                      className="col-span-12 md:col-span-6 lg:col-span-4"
                      key={i}
                    >
                      <BlogsItemCard item={item} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <div
                    role="alert"
                    aria-live="polite"
                    className="flex flex-col items-center justify-center col-span-full py-20 text-center text-gray-500"
                  >
                    <Icons.SearchNormal size={48} className="mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {t("NoResultsTitle")}
                    </h3>
                    <p>{t("NoBlogResultsMessage")}</p>
                  </div>
                </div>
              )}

              <div className="mt-[4rem]">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(
                    blogs[selectedCategory]?.length / itemsPerPage
                  )}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function ArticlesRow({ blogsItems, handleTabChange, category, name }) {
  const { t } = useTranslation();
  return (
    <div className=" pb-[4rem]">
      <div className="flex items-center justify-between mb-[.5rem]">
        <div className="bg-[var(--color-gray-900)] flex items-center justify-center min-w-[148px] h-[40px] text-center text-white font-bold">
          {name}
        </div>
        <div className="w-[100px]">
          <Button2
            text={t("More")}
            onClick={() => {
              handleTabChange(2, category);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-[28px] gap-y-[2.2rem] md:gap-y-[4rem]">
        {blogsItems?.length > 0 &&
          blogsItems?.map((item, i) => (
            <div className="col-span-12 md:col-span-6 lg:col-span-3" key={i}>
              <BlogsItemCard item={item} />
            </div>
          ))}
      </div>
    </div>
  );
}

{
  /* {activeFilters.length > 0 && (
                <p className="font-medium text-[1.1rem] border-b border-[var(--color-gray-900)] pb-[.5rem] mb-[.9rem]">
                  {
                    filterList.find((item) => item.value === activeFilters[0])
                      ?.label
                  }
                </p>
              )} */
}
