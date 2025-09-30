"use client";
import React, { useState } from "react";
import GalleryItem from "./GalleryItem";
import * as Icons from "iconsax-reactjs";
import PopupGallery from "../module/PopupGallery";
import { useTranslation } from "@/context/TranslationContext";
import { Swiper, SwiperSlide } from "swiper/react";
import {} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";
import { useViewportWidth } from "@/hook/useViewportWidth";
import { Grid } from "swiper/modules";

export default function Gallery({ gallery }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const viewportWidth = useViewportWidth();
  const slidesNumber =
    viewportWidth < 768 ? 2 : Math.floor(viewportWidth / 340);
  return (
    <>
      <h2 className="font-[500] title mb-[1.3rem]">{t("Gallery")}</h2>
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
          loop={false}
          dir="ltr"
        >
          {gallery?.slice(0, 4).map((item, i) => (
            <SwiperSlide key={i} className="relative group overflow-hidden">
              <div className="relative">
                <GalleryItem media={item} onClick={() => setOpen(true)} />
                {gallery.length > 4 && i === 3 && (
                  <div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 cursor-pointer"
                    onClick={() => setOpen(true)}
                  >
                    <Icons.More className="text-gray-white w-20 h-20 md:w-35 md:h-35" />
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="grid grid-cols-2 gap-10">
          {gallery?.slice(0, 4).map((item, i) => (
            <div key={i} className="relative group overflow-hidden">
              <GalleryItem media={item} onClick={() => setOpen(true)} />
              {gallery.length > 4 && i === 3 && (
                <div
                  className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  <Icons.More className="text-gray-white w-20 h-20 md:w-35 md:h-35" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <PopupGallery
        open={open}
        setOpen={setOpen}
        media={gallery}
        isdownload={false}
      />
    </>
  );
}
