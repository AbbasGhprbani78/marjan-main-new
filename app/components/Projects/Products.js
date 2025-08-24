"use client";
import React, { useState } from "react";
import ProductItem from "./ProductItem";
import * as Icons from "iconsax-reactjs";
import PopupGallery from "../module/PopupGallery";
import { useTranslation } from "@/hook/useTranslation";
import { useViewportWidth } from "@/hook/useViewportWidth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper/modules";

import {} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";

export default function Products({ products }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const viewportWidth = useViewportWidth();
  const slidesNumber =
    viewportWidth < 768 ? 2 : Math.floor(viewportWidth / 340);
  return (
    <>
      <h2 className="font-[500] title mb-[1.3rem]">{t("Products")}</h2>
      {viewportWidth >= 1024 ? (
        <Swiper
          spaceBetween={28}
          modules={[Grid]}
          grid={{ rows: 1, fill: "row" }}
          slidesPerView={slidesNumber}
          loop={false}
          dir="ltr"
        >
          {products?.slice(0, 4).map((item, i, arr) => (
            <SwiperSlide key={i} className="relative">
              <div className="relative">
                <ProductItem item={item} />

                {i === arr.length - 1 && (
                  <div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 cursor-pointer"
                    onClick={() => setOpen(true)}
                  >
                    <Icons.More className="text-gray-white w-20 h-20 md:w-35 md:h-35" />
                  </div>
                )}
              </div>

              {item?.text && (
                <p className="font-medium text-[1rem] mt-[0.5rem] inline-block">
                  {item.text}
                </p>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="grid grid-cols-2 gap-10">
          {products?.slice(0, 4).map((item, i, arr) => (
            <div key={i} className="relative group overflow-hidden">
              <div className="relative">
                <ProductItem item={item} />

                {i === arr.length - 1 && (
                  <div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 cursor-pointer"
                    onClick={() => setOpen(true)}
                  >
                    <Icons.More className="text-gray-white w-20 h-20 md:w-35 md:h-35" />
                  </div>
                )}
              </div>

              {item?.text && (
                <p className="font-medium text-[1rem] mt-[0.5rem] inline-block">
                  {item.text}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <PopupGallery
        open={open}
        setOpen={setOpen}
        media={products.map((product) => product.image)}
        isdownload={false}
      />
    </>
  );
}
