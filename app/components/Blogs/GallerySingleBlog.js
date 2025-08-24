"use client";
import React, { useState } from "react";
import * as Icons from "iconsax-reactjs";
import PopupGallery from "../module/PopupGallery";
import { useTranslation } from "@/hook/useTranslation";
import { Swiper, SwiperSlide } from "swiper/react";
import {} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";
import { useViewportWidth } from "@/hook/useViewportWidth";
import GalleryItem from "../Projects/GalleryItem";
import { Grid } from "swiper/modules";

export default function GallerySingleBlog({ media }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const viewportWidth = useViewportWidth();
  const slidesNumber =
    viewportWidth < 768 ? 2 : Math.floor(viewportWidth / 340);
  return (
    <>
      {viewportWidth >= 1024 ? (
        <Swiper
          spaceBetween={28}
          modules={[Grid]}
          grid={{ rows: 1, fill: "row" }}
          slidesPerView={slidesNumber}
          loop={false}
          dir="ltr"
        >
          {media?.slice(0, 4).map((item, i, arr) => (
            <SwiperSlide key={i} className="relative group overflow-hidden">
              <div className="relative">
                <GalleryItem media={item} />
                {i === arr.length - 1 && (
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
        <div dir="ltr" className="grid grid-cols-2 gap-10">
          {media?.slice(0, 4).map((item, i, arr) => (
            <div key={i} className="relative group overflow-hidden">
              <GalleryItem media={item} />
              {i === arr.length - 1 && (
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
        media={media}
        isdownload={false}
      />
    </>
  );
}
