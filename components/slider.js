"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import * as Icons from "iconsax-reactjs";
import { MoreButton } from "./moreButton";
import {} from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import {
  toPersianDigits,
  truncateText,
  useLocalizedLink,
} from "@/utils/helper";
import { useParams } from "next/navigation";
import { useTranslation } from "@/context/TranslationContext";
import { useViewportWidth } from "@/hook/useViewportWidth";

function LeftArrow({
  swiper,
  className = "left-[10px] lg:left-[3.5rem]",
  bgcolor,
  offsetY = "50%",
}) {
  const viewportWidth = useViewportWidth();
  return (
    <button
      className={`w-[40px] h-[40px] md:w-[50px] md:h-[50px] cursor-pointer absolute z-9 rounded-full backdrop-blur-[4px] ${className}`}
      onClick={() => swiper.current.swiper.slidePrev()}
      style={{
        backgroundColor: bgcolor || "rgba(31, 41, 55, 0.5)",
        top: viewportWidth < 680 ? offsetY : "50%",
        transform: "translateY(-50%)",
      }}
    >
      <Icons.ArrowLeft className="m-auto text-gray-white w-20 h-20 md:w-35 md:h-35" />
    </button>
  );
}

function RightArrow({
  swiper,
  className = "right-[10px] lg:right-[3.5rem]",
  bgcolor,
  offsetY = "50%",
}) {
  const viewportWidth = useViewportWidth();
  return (
    <button
      className={`w-[40px] h-[40px] md:w-[50px] md:h-[50px] absolute cursor-pointer z-9 rounded-full backdrop-blur-[4px] ${className}`}
      onClick={() => swiper.current.swiper.slideNext()}
      style={{
        backgroundColor: bgcolor || "rgba(31, 41, 55, 0.5)",
        top: viewportWidth < 680 ? offsetY : "50%",
        transform: "translateY(-50%)",
      }}
    >
      <Icons.ArrowRight className="m-auto text-gray-white w-20 h-20 md:w-35 md:h-35" />
    </button>
  );
}

export function HomeSlider({
  nameproduct = false,
  data,
  bgcolor,
  dotColor,
  route,
  delay = 3500,
  type = 1,
}) {
  const { t } = useTranslation();
  let swiper = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { locale } = useParams();

  return (
    <div
      className="relative mt-[130px] lg:mt-0"
      style={{
        "--dot-color-active": dotColor ?? "var(--color-gray-100)",
      }}
    >
      <LeftArrow swiper={swiper} bgcolor={bgcolor} offsetY="50%" />
      <RightArrow swiper={swiper} bgcolor={bgcolor} offsetY="50%" />

      <Swiper
        className="my-swiper "
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
          bulletActiveClass:
            "swiper-pagination-bullet-active custom-bullet-active",
        }}
        dir={locale}
        key={locale}
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        ref={swiper}
        loop={true}
        autoplay={{
          delay,
          disableOnInteraction: false,
        }}
        speed={800}
      >
        {data.map((item) => (
          <SwiperSlide key={item.key} style={{ position: "relative" }}>
            <div className="flex flex-col items-center absolute w-full h-[100%]  z-10 bg-black/40">
              <div
                className="relative m-auto mb-[23px]  md:pt-0"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <p
                  className={`text-center text-[1.2rem] px-10 md:px-[2rem] md:text-[30px] font-[400] text-gray-white ${
                    nameproduct
                      ? "font-en"
                      : ["fa", "ar"].includes(locale)
                      ? "font-fa"
                      : "font-en"
                  }`}
                >
                  {truncateText(item.title, 80)}
                </p>
                <div
                  className={`absolute bottom-8 left-20 w-5 h-3 bg-gradient-to-r from-gray-white/0 via-gray-white/100 to-gray-white/0 rounded-full transition-all duration-600 opacity-0 invisible ${
                    isHovered &&
                    "left-[50%] scale-x-[100] origin-center opacity-100 visible"
                  }`}
                />
              </div>

              <MoreButton
                text={t("MoreDetails")}
                width={157}
                height={38}
                invert={true}
                className={"m-auto mt-0"}
                href={`${route}/${
                  type === 2
                    ? item?.slug
                    : item?.products?.[0]?.slug || item?.title
                }`}
              />
            </div>
            <Image
              src={`${
                item.image.startsWith("/images")
                  ? item.image
                  : `${process.env.NEXT_PUBLIC_API_URL}${item.image}`
              }`}
              alt="Background Image"
              className="aspect-[4/3] object-cover w-full    md:min-h-[400px] lg:h-[100dvh]"
              width={1980}
              height={1080}
              priority
              unoptimized={true}
              quality={100}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export function BlogSlider({ data, shadow, lineColor, bgcolor }) {
  const { locale } = useParams();
  const swiper = useRef(null);

  const [activeButton, setActiveButton] = useState(1);
  const { localizedHref } = useLocalizedLink();
  const viewportWidth = useViewportWidth();
  const slidesNumber =
    viewportWidth < 768 ? 2 : Math.floor(viewportWidth / 340);

  const buttonsRef = useRef({});
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const currentButton = buttonsRef.current[activeButton];
    if (currentButton) {
      setUnderlineStyle({
        left: currentButton.offsetLeft,
        width: currentButton.offsetWidth,
      });
    }
  }, [activeButton]);

  const currentSectionItems = data.sections[activeButton - 1]?.data || [];
  const showArrows = currentSectionItems.length > slidesNumber;

  return (
    <div className="relative px-20 md:px-40 lg:px-80">
      <div className="relative flex flex-row justify-center gap-[50px] mb-[1rem] mt-[20px] md:mt-[50px] border-b border-gray-300">
        {data.sections.map((item) => (
          <button
            key={item.id}
            ref={(el) => (buttonsRef.current[item.id] = el)}
            className={`w-[136px] h-[45px] text-[17px] font-[500] cursor-pointer pb-[5px] transition-all duration-300
              ${shadow && activeButton === item.id && "text-black"}`}
            onClick={() => setActiveButton(item.id)}
          >
            {["fa", "ar"].includes(locale)
              ? toPersianDigits(item.title)
              : item.title}
          </button>
        ))}

        <span
          className={`absolute bottom-0 h-[2px] transition-all duration-300 ${
            lineColor ? "bg-yellow-300" : "bg-black"
          }`}
          style={underlineStyle}
        />
      </div>

      <div className="relative w-full">
        {currentSectionItems.length === 0 ? (
          <div className="flex justify-center items-center h-[200px] text-gray-500">
            {["fa", "ar"].includes(locale)
              ? "موردی وجود ندارد"
              : "No items available"}
          </div>
        ) : (
          <>
            {showArrows && (
              <>
                <LeftArrow
                  swiper={swiper}
                  bgcolor={bgcolor}
                  className="left-[-18px] lg:left-[-18px]"
                  offsetY="45%"
                />
                <RightArrow
                  swiper={swiper}
                  bgcolor={bgcolor}
                  className="right-[-18px] lg:right-[-18px]"
                  offsetY="45%"
                />
              </>
            )}

            <Swiper
              spaceBetween={viewportWidth < 1024 ? 10 : 28}
              modules={[Autoplay]}
              breakpoints={{
                0: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1025: { slidesPerView: 4 },
              }}
              ref={swiper}
              loop={true}
              speed={800}
              dir={locale}
              key={locale}
              className="mt-[30px]"
            >
              {currentSectionItems.map((item) => (
                <SwiperSlide key={item.key}>
                  <Link href={localizedHref(`/blogs/${item.slug}`)}>
                    <div className="relative w-full aspect-square overflow-hidden">
                      <Image
                        src={`${
                          item.image.startsWith("/images")
                            ? item.image
                            : `${process.env.NEXT_PUBLIC_API_URL}${item.image}`
                        }`}
                        alt="Background Image"
                        className="object-cover transform transition-transform duration-[2000ms] ease-in-out hover:scale-[1.15]"
                        fill
                        priority
                        unoptimized={true}
                        quality={100}
                      />
                    </div>

                    <div className="flex flex-col mt-[10px]">
                      <p
                        className={`text-[.85rem] font-[500] ${
                          ["fa", "ar"].includes(locale) ? "font-fa" : "font-en"
                        }`}
                        dir={["fa", "ar"].includes(locale) ? "rtl" : "ltr"}
                      >
                        {item.title}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </div>
  );
}

export function CategorySlider({ data }) {
  const { locale } = useParams();
  const swiper = useRef(null);
  const [activeButton, setActiveButton] = useState(data?.[0]?.id || 1);
  const viewportWidth = useViewportWidth();
  const buttonsRef = useRef({});
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const { localizedHref } = useLocalizedLink();

  const slidesPerView = viewportWidth < 768 ? 2 : viewportWidth < 1025 ? 3 : 4;

  useEffect(() => {
    const currentButton = buttonsRef.current[activeButton];
    if (currentButton) {
      setUnderlineStyle({
        left: currentButton.offsetLeft,
        width: currentButton.offsetWidth,
      });
    }
  }, [activeButton, viewportWidth]);

  const currentData = data.find((item) => item.id === activeButton)?.data || [];
  const parentTitle =
    data.find((item) => item.id === activeButton)?.title || "";

  const filterKeyMap = {
    "Use case": "environment",
    کاربری: "environment",
    "حالة الاستخدام": "environment",
    Применение: "environment",

    Color: "color",
    رنگ: "color",
    اللون: "color",
    Цвет: "color",

    Styles: "style",
    سبک: "style",
    النمط: "style",
    Стиль: "style",

    Size: "Size",
    سایز: "Size",
    الحجم: "Size",
    Размер: "Size",

    Industrial: "industrie",
    صنعتی: "industrie",
    صناعي: "industrie",
    Промышленный: "industrie",
  };

  const filterKey = filterKeyMap[parentTitle] || parentTitle.toLowerCase();

  const showArrows = currentData.length > slidesPerView;

  return (
    <div className="px-20 md:px-40 lg:px-80">
      <div className="hidden md:flex flex-row justify-evenly mt-[50px] relative border-b border-gray-300">
        {data.map((item) => (
          <button
            key={item.id}
            ref={(el) => (buttonsRef.current[item.id] = el)}
            className=" h-[45px] md:text-[18px] lg:text-[22px] font-[500] cursor-pointer pb-[5px] transition-all duration-300"
            onClick={() => setActiveButton(item.id)}
          >
            {["fa", "ar"].includes(locale)
              ? toPersianDigits(item.title)
              : item.title}
          </button>
        ))}
        <span
          className="absolute bottom-0 h-[2px] bg-black transition-all duration-300"
          style={underlineStyle}
        />
      </div>

      <div className="md:hidden flex items-center justify-between w-full px-4 mb-2">
        <button
          onClick={() => {
            const currentIndex = data.findIndex(
              (item) => item.id === activeButton
            );
            if (currentIndex > 0) setActiveButton(data[currentIndex - 1].id);
          }}
          disabled={data.findIndex((item) => item.id === activeButton) === 0}
          className="text-xl px-2 py-1 disabled:opacity-30"
        >
          <Icons.ArrowRight2
            className={`${["fa", "ar"].includes(locale) ? "" : "rotate-180"}`}
            size="20"
            color="#000"
            variant="blod"
          />
        </button>

        <button className="text-[17px] font-medium text-black py-2 border-b-2 border-[#000]">
          {parentTitle}
        </button>

        <button
          onClick={() => {
            const currentIndex = data.findIndex(
              (item) => item.id === activeButton
            );
            if (currentIndex < data.length - 1)
              setActiveButton(data[currentIndex + 1].id);
          }}
          disabled={
            data.findIndex((item) => item.id === activeButton) ===
            data.length - 1
          }
          className="text-xl px-2 py-1 disabled:opacity-30"
        >
          <Icons.ArrowLeft2
            className={`${["fa", "ar"].includes(locale) ? "" : "rotate-180"}`}
            size="20"
            color="#000"
            variant="blod"
          />
        </button>
      </div>
      <div className="relative mt-[30px]">
        {showArrows && (
          <>
            <LeftArrow
              swiper={swiper}
              className="left-[-18px] lg:left-[-18px]"
            />
            <RightArrow
              swiper={swiper}
              className="right-[-18px] lg:right-[-18px]"
            />
          </>
        )}

        <Swiper
          spaceBetween={viewportWidth < 1024 ? 10 : 28}
          modules={[Autoplay]}
          ref={swiper}
          loop={currentData.length > 1}
          speed={800}
          dir={locale}
          key={locale + activeButton}
          slidesPerView={slidesPerView}
        >
          {currentData.map((item) => (
            <SwiperSlide
              key={`${parentTitle}-${item.title}`}
              className="relative group overflow-hidden"
            >
              <Link
                href={localizedHref(
                  `/products?${filterKey}=${encodeURIComponent(
                    item.title
                  )}&page=1`
                )}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${item?.image}`}
                  alt={item.title}
                  className="aspect-square object-cover transform transition-transform duration-[2000ms] ease-in-out group-hover:scale-[1.15]"
                  width={500}
                  height={500}
                  priority
                  unoptimized={true}
                  quality={100}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <p
                    dir="rtl"
                    className={`text-white text-[1.2rem] text-center px-4 ${
                      ["fa", "ar"].includes(locale) ? "font-fa" : "font-en"
                    }`}
                  >
                    {["fa", "ar"].includes(locale)
                      ? toPersianDigits(item.title)
                      : item.title}
                  </p>
                </div>
              </Link>
              <p
                className={`text-black text-[.9rem] font-medium text-center md:hidden pt-6 ${
                  ["fa", "ar"].includes(locale) ? "font-fa" : "font-en"
                }`}
              >
                {["fa", "ar"].includes(locale)
                  ? toPersianDigits(item.title)
                  : item.title}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export function ProjectsSlider({ data, bgcolor }) {
  const { locale } = useParams();
  const swiper = useRef(null);
  const [windowWidth, setWindowWidth] = useState(null);
  const { localizedHref } = useLocalizedLink();

  const getSlideWidth = (index) => {
    if (windowWidth < 768) return windowWidth / 2;
    if (windowWidth < 1024)
      return index % 2 !== 0 ? windowWidth * 0.5 : windowWidth * 0.4;
    if (windowWidth < 1400)
      return index % 2 !== 0 ? windowWidth * 0.43 : windowWidth * 0.33;
    return index % 2 !== 0 ? windowWidth * 0.4 : windowWidth * 0.2;
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!windowWidth) return null;

  const totalSlidesWidth = data.reduce(
    (sum, _, index) => sum + getSlideWidth(index),
    0
  );
  const showArrows = totalSlidesWidth > windowWidth;

  return (
    <div className="relative mt-[30px] md:mt-[50px] px-20 md:px-40 lg:px-80">
      {showArrows && (
        <LeftArrow swiper={swiper} bgcolor={bgcolor} offsetY="55%" />
      )}
      {showArrows && (
        <RightArrow swiper={swiper} bgcolor={bgcolor} offsetY="55%" />
      )}

      <Swiper
        spaceBetween={windowWidth < 1024 ? 10 : 30}
        slidesPerView={"auto"}
        ref={swiper}
        loop={true}
        speed={800}
        dir={locale}
        key={locale}
        watchSlidesProgress={true}
        centeredSlides={false}
      >
        {data.map((item, index) => (
          <SwiperSlide
            key={item.key}
            style={{ width: `${getSlideWidth(index)}px` }}
          >
            <Link href={localizedHref(`projects/${item?.slug}`)}>
              <p className="text-[.9rem] md:text-[18px] font-[400] mb-[5px] text-start md:hidden">
                {item?.title}
              </p>
              {index % 2 === 0 && (
                <div className="hidden md:flex">
                  <p className="text-[18px] font-[400] mb-[5px] me-auto">
                    {item?.title}
                  </p>
                </div>
              )}
              <div className="relative w-full aspect-square md:aspect-auto md:h-[370px] overflow-hidden">
                {item?.image && (
                  <Image
                    src={
                      item?.image.startsWith("/images")
                        ? item?.image
                        : `${process.env.NEXT_PUBLIC_API_URL}${item?.image}`
                    }
                    alt={item?.title || "Image"}
                    className="object-cover transform transition-transform duration-[2000ms] ease-in-out hover:scale-[1.15]"
                    fill
                    unoptimized={true}
                    quality={100}
                  />
                )}
              </div>
              {index % 2 !== 0 && (
                <div className="hidden md:flex">
                  <p className="text-[18px] font-[400] mt-[5px] me-auto">
                    {["fa", "ar"].includes(locale)
                      ? toPersianDigits(item?.title)
                      : item?.title}
                  </p>
                </div>
              )}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export function GallerySlider({ data, onClick, ispopup = false }) {
  const { locale } = useParams();
  const swiper = useRef(null);
  const viewportWidth = useViewportWidth();

  const slidesNumber =
    viewportWidth < 768 ? 2 : Math.floor(viewportWidth / 340);

  const showArrows = data.length > slidesNumber;

  return (
    <div className="px-20 md:px-40 lg:px-80">
      <div className="relative">
        {showArrows && (
          <>
            <LeftArrow
              swiper={swiper}
              className="left-[-18px] lg:left-[-18px]"
            />
            <RightArrow
              swiper={swiper}
              className="right-[-18px] lg:right-[-18px]"
            />
          </>
        )}

        <Swiper
          spaceBetween={viewportWidth < 1024 ? 10 : 28}
          modules={[Autoplay]}
          slidesPerView={slidesNumber}
          ref={swiper}
          loop={data.length > 1}
          speed={800}
          dir={locale}
          key={locale}
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1025: { slidesPerView: 4 },
          }}
        >
          {data?.map((item) => {
            const image = (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${item?.image}`}
                alt="Background Image"
                className="aspect-square object-cover transform transition-transform duration-[2000ms] ease-in-out group-hover:scale-[1.15] "
                width={500}
                height={500}
                priority
                unoptimized={true}
                quality={100}
              />
            );

            return (
              <SwiperSlide
                key={item.key}
                className="relative group overflow-hidden"
              >
                <div className="cursor-pointer relative overflow-hidden">
                  {item?.link ? (
                    <Link href={item.link} locale={locale}>
                      {image}
                    </Link>
                  ) : (
                    <div onClick={() => onClick(item)}>{image}</div>
                  )}

                  {ispopup && (
                    <div
                      onClick={() => onClick(item)}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Icons.SearchNormal1 size="30" color="#fff" />
                    </div>
                  )}
                </div>
                {item.name && (
                  <span className="text-black inline-block pt-[.5rem]">
                    {item.name}
                  </span>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
