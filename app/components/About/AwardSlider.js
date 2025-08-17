"use client";
import React from "react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import * as Icons from "iconsax-reactjs";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function AwardSlider({ sliderItems }) {
  let swiper = useRef(null);
  return (
    <>
      <h3 className="text-[var(--color-gray-900)]  mb-[2rem] px-20 md:px-40 lg:px-80  title font-[500]">
        جوایز و افتخارات
      </h3>

      <div className="flex justify-center items-center mt-[3rem]">
        <div className="w-full md:w-1/2 lg:w-1/3 h-[371px]  relative">
          <LeftArrow swiper={swiper} />
          <RightArrow swiper={swiper} />

          <Swiper
            spaceBetween={30}
            modules={[Autoplay]}
            slidesPerView={"auto"}
            ref={swiper}
            loop={true}
            speed={800}
            className="h-full"
          >
            {sliderItems?.map((item, i) => (
              <SwiperSlide
                key={i}
                className="w-full h-full flex-col justify-center items-center "
              >
                <div className="relative w-full h-3/4">
                  <Image
                    src={item.image}
                    alt="Background Image"
                    className="object-contain"
                    fill
                  />
                </div>
                <p className="text-base h-1/4 text-center w-1/2 mx-auto mt-[5px] text-[var(--color-gray-900)] font-bold ">
                  {item.text}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

function LeftArrow({ swiper }) {
  return (
    <button
      aria-label="اسلاید قبلی"
      className={` w-[40px] h-[40px] cursor-pointer absolute top-[calc(50%-25px)] left-20 md:left-[0] z-9 rounded-full bg-[var(--color-gray-900)] backdrop-blur-[4px]`}
      onClick={() => swiper.current.swiper.slidePrev()}
    >
      <Icons.ArrowLeft size="30" className=" m-auto text-gray-white" />
    </button>
  );
}

function RightArrow({ swiper }) {
  return (
    <button
      aria-label="اسلاید بعدی"
      className={` w-[40px] h-[40px] absolute cursor-pointer top-[calc(50%-25px)] right-20 md:right-[0] z-9 rounded-full bg-[var(--color-gray-900)] backdrop-blur-[4px]`}
      onClick={() => swiper.current.swiper.slideNext()}
    >
      <Icons.ArrowRight size="30" className="m-auto text-gray-white" />
    </button>
  );
}
