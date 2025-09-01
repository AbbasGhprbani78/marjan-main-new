"use client";
import React, { useState } from "react";
import ProductItem from "./ProductItem";
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
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1025: { slidesPerView: 4 },
          }}
          loop={true}
          dir="ltr"
        >
          {products?.map((item, i, arr) => (
            <SwiperSlide key={i} className="relative">
              <div className="relative">
                <ProductItem item={item} />
              </div>

              {item?.title && (
                <p className="font-medium text-[1rem] mt-[0.5rem] inline-block font-en">
                  {item.title}
                </p>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="grid grid-cols-2 gap-10">
          {products?.map((item, i, arr) => (
            <div key={i} className="relative group overflow-hidden">
              <div className="relative">
                <ProductItem item={item} />
              </div>

              {item?.title && (
                <p className="font-medium text-[1rem] mt-[0.5rem] inline-block font-en">
                  {item.title}
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
