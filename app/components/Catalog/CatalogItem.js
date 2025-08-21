"use client";
import Image from "next/image";
import React from "react";

export default function CatalogItem({ catalog }) {
  const openPdf = () => {
    if (typeof window !== "undefined") {
      window.open(catalog.pdfSrc, "_blank");
    }
  };

  const downloadHandler = () => {
    const link = document.createElement("a");
    link.href = `${process.env.NEXT_PUBLIC_API_URL}${catalog?.pdfSrc}`;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div
        className="relative aspect-[3/4] cursor-pointer overflow-hidden"
        onClick={openPdf}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${catalog.coverSrc}`}
          alt=""
          fill
          className="object-cover transform transition-transform duration-[2000ms] ease-in-out hover:scale-[1.15]"
        />
      </div>
      <p className="text-[#919191] pt-7">نام کاتالوگ</p>
      <div className="mt-[5px] flex items-center justify-between">
        <div
          className="cursor-pointer"
          onClick={downloadHandler}
          aria-label="دانلود PDF"
        >
          <Image
            src={"/images/44.svg"}
            height={20}
            width={20}
            alt="آیکون دانلود"
          />
        </div>
        <span className="text-[#919191]" dir="ltr">
          {catalog?.fileSize}
        </span>
      </div>
    </div>
  );
}
