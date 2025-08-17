"use client";

import { useTranslation } from "@/hook/useTranslation";
import { toPersianDigits } from "@/utils/helper";
import * as Icons from "iconsax-reactjs";
import { useParams } from "next/navigation";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const { locale } = useParams();
  const { t } = useTranslation();
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-2 py-1 mx-0.5 rounded ${
            currentPage === 1
              ? "bg-[#919191] text-white"
              : "text-gray-600 hover:bg-gray-100"
          } sm:px-3 sm:py-1 sm:mx-1`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span key="start-ellipsis" className="px-1 text-gray-600 sm:px-2">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-0.5 rounded h-[28px] w-[28px] cursor-pointer flex justify-center items-center ${
            currentPage === i
              ? "bg-[#919191] text-white"
              : "text-gray-600 hover:bg-gray-100"
          } sm:h-[32px] sm:w-[32px] sm:mx-1`}
        >
          {locale === "fa" ? toPersianDigits(i) : i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="end-ellipsis" className="px-1 text-gray-600 sm:px-2">
            ...
          </span>
        );
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`mx-0.5 rounded h-[28px] w-[28px] cursor-pointer flex justify-center items-center ${
            currentPage === totalPages
              ? "bg-[#919191] text-white"
              : "text-gray-600 hover:bg-gray-100"
          } sm:h-[32px] sm:w-[32px] sm:mx-1`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <nav
      aria-label="ناوبری صفحه‌بندی"
      className="flex items-center justify-center gap-4 mt-6 sm:gap-6 sm:mt-10 mb-[40px]"
      style={{ direction: "ltr" }}
    >
      <button
        aria-label="صفحه قبلی"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-gray-600 hover:text-[#292d32] disabled:text-[#bababa] flex items-center gap-2 sm:gap-7 cursor-pointer ms-6 sm:ms-8 text-sm sm:text-base"
      >
        <Icons.ArrowLeft size="16" className="sm:block hidden" />
        {t("Previous")}
      </button>
      {renderPageNumbers()}
      <button
        aria-label="صفحه بعدی"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-gray-600 hover:text-[#292d32] disabled:text-[#bababa] flex items-center gap-2 sm:gap-7 cursor-pointer me-6 sm:me-8 text-sm sm:text-base"
      >
        {t("Next")}

        <Icons.ArrowRight size="16" className="sm:block hidden" />
      </button>
    </nav>
  );
}
