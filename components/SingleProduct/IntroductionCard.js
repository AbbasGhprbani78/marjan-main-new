"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import * as Icons from "iconsax-reactjs";
import Table from "./Table";
import { useRouter } from "next/navigation";
import { useLocalizedLink } from "@/utils/helper";
import { useTranslation } from "@/context/TranslationContext";

export default function IntroductionCard({ setOpenModal, singleProduct }) {
  const router = useRouter();
  const { localizedHref } = useLocalizedLink();
  const { t, locale } = useTranslation();
  const [flipped, setFlipped] = useState(true);
  const [currentImage, setCurrentImage] = useState(singleProduct.image || "");

  useEffect(() => {
    // prefer explicit image, otherwise fallback to first gallery item
    setCurrentImage(
      singleProduct.image ||
        singleProduct?.gallery?.[0]?.url ||
        singleProduct?.gallery?.[0]?.image ||
        singleProduct?.gallery?.[0] ||
        "" ||
        ""
    );
  }, [singleProduct.image, singleProduct.gallery]);

  const handleShare = async () => {
    const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${singleProduct.image}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: singleProduct.title,
          text: t("CheckOutThisProduct") || "این محصول رو ببین!",
          url: imageUrl,
        });
      } else {
        await navigator.clipboard.writeText(imageUrl);
        alert("📋 لینک تصویر کپی شد! می‌تونی در اینستاگرام به اشتراک بذاری 😊");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const gallery =
    singleProduct?.gallery?.map((g) => g.url || g.image || g) || [];

  const buildSrc = (path) => {
    if (!path) return "";
    const p = String(path);
    if (p.startsWith("http") || p.startsWith("data:") || p.startsWith("blob:"))
      return p;
    const base = process.env.NEXT_PUBLIC_API_URL || "";
    if (!base) return p;
    if (base.endsWith("/") && p.startsWith("/")) return base + p.slice(1);
    if (!base.endsWith("/") && !p.startsWith("/")) return base + "/" + p;
    return base + p;
  };

  const handleNext = () => {
    const currentIndex = gallery.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % gallery.length;
    setCurrentImage(gallery[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = gallery.indexOf(currentImage);
    const prevIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    setCurrentImage(gallery[prevIndex]);
  };

  return (
    <>
      <div className="absolute hidden lg:flex items-center justify-between px-4 z-50 lg:left-[5%] lg:right-[5%] top-[45%]">
        <button
          onClick={handlePrev}
          className="p-2 bg-black/30 rounded-full backdrop-blur-sm"
        >
          <Icons.ArrowRight color="#fff" className="w-30 h-30" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-black/30 rounded-full backdrop-blur-sm"
        >
          <Icons.ArrowLeft color="#fff" className="w-30 h-30" />
        </button>
      </div>

      <div className="absolute flex lg:hidden items-center justify-between px-4 z-50 left-[5px] right-[5px] top-[45%]">
        <button
          onClick={handlePrev}
          className="p-2 bg-black/30 rounded-full backdrop-blur-sm"
        >
          <Icons.ArrowRight color="#fff" className="w-30 h-30" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-black/30 rounded-full backdrop-blur-sm"
        >
          <Icons.ArrowLeft color="#fff" className="w-30 h-30" />
        </button>
      </div>

      <div className=" hidden lg:block w-[80vw]  relative mx-auto">
        <div className="grid grid-cols-12  md:min-h-[82dvh] mx-auto w-full">
          <div className="col-span-12 md:col-span-5  xl:col-span-4 h-full text-[var(--color-gray-900)] bg-white p-[1.2rem] ">
            <div className="flex items-center justify-between mb-[1rem] md:mb-[2rem]">
              <span className="text-[1.3rem] font-inherit">
                {singleProduct.title}
              </span>
              <Icons.CloseCircle
                size={25}
                className="cursor-pointer hidden md:block"
                onClick={() => setOpenModal(false)}
              />
            </div>

            <div className="flex items-center  w-full gap-[5px]">
              <button
                onClick={() => router.push(localizedHref("/representatives"))}
                className="flex-1 py-[7px] bg-[var(--color-gray-800)] text-white flex items-center gap-[5px] justify-center cursor-pointer text-[.9rem]"
              >
                {t("WhereToBuy")}
                <Icons.Location size={15} />
              </button>
              <button
                onClick={() => router.push("https://marjan.ariisco.com/en")}
                className="flex-1 py-[7px] bg-[var(--color-gray-800)] text-white flex items-center gap-[5px] justify-center cursor-pointer text-[.9rem]"
              >
                {t("SmartLayout")}
                <Icons.Box2 size={15} />
              </button>
            </div>

            <div className="w-full mt-[1rem]">
              <Table
                title={""}
                thickness={singleProduct.thickness}
                colors={singleProduct.color}
                surface={singleProduct.surface}
                size={singleProduct.size}
              />
            </div>

            <div className="flex flex-col gap-[20px] max-h-[300] overflow-y-auto hide-scrollbar mt-[2rem] md:mt-[3rem]">
              {singleProduct?.products.map((item) => (
                <ItemOther
                  key={item.id}
                  setOpenModal={setOpenModal}
                  item={item}
                />
              ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-7  xl:col-span-8 relative">
            <div className="relative h-[25dvh] md:h-full">
              <Image
                src={buildSrc(currentImage)}
                alt="Introduction image"
                className="object-cover"
                fill
                quality={100}
                unoptimized={true}
              />
              <Icons.CloseCircle
                size={27}
                color="#fff"
                className="cursor-pointer absolute z-20 right-10 top-20 md:hidden"
                onClick={() => setOpenModal(false)}
              />
            </div>

            <div
              className={`absolute ${
                ["ar", "fa"].includes(locale) ? "right-0" : "left-0"
              } bottom-0 p-[1rem] w-max flex justify-end z-50`}
            >
              <button
                onClick={handleShare}
                className="flex items-center gap-2 bg-black/50 text-white px-6 py-3 rounded-lg backdrop-blur-sm"
              >
                <span>{t("ShareOn")}</span>
                <Image
                  src="/images/share.png"
                  width={30}
                  height={30}
                  className="cursor-pointer mix-blend-normal invert"
                  alt="share"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex gap-3 items-center mt-3 px-4 py-4 overflow-x-auto whitespace-nowrap hide-scrollbar">
          {singleProduct?.gallery?.map((g) => {
            const imgPath = g.url || g.image || g;
            const thumbSrc = buildSrc(imgPath);
            const isActive =
              thumbSrc === buildSrc(currentImage) || imgPath === currentImage;
            return (
              <button
                key={g.id || thumbSrc}
                onClick={() => setCurrentImage(imgPath)}
                className={`relative flex-shrink-0  overflow-hidden w-[70px] h-[70px] `}
              >
                <Image
                  src={thumbSrc}
                  alt={g.title || "thumb"}
                  width={70}
                  height={70}
                  quality={80}
                  unoptimized={true}
                  className="object-cover w-full h-full"
                />
                {!isActive && <div className="absolute inset-0 bg-black/40 " />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:hidden w-[95vw] md:w-[80vw] h-[80dvh]  cursor-pointer mx-auto">
        <div
          className={`relative w-full h-full duration-700 transform-style preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          <div className="absolute w-full h-full backface-hidden bg-white px-[20px] pb-[20px] flex flex-col  shadow-lg rounded-xl">
            <div className="flex justify-between py-[1rem]">
              <Icons.CloseCircle
                size={25}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal(false);
                }}
              />
              <Icons.Eye
                size={25}
                color="#000"
                className="cursor-pointer "
                onClick={() => setFlipped(!flipped)}
              />
            </div>
            <div className="flex items-center justify-between mb-[1rem]">
              <span className={`text-[1.3rem] font-en `}>
                {singleProduct.title}
              </span>
            </div>

            <div className="flex items-center gap-5 mb-[2rem]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/representatives");
                }}
                className="flex-1 py-7 bg-gray-800 text-white flex items-center justify-center gap-2 rounded-md text-[.8rem]"
              >
                {t("WhereToBuy")}
                <Icons.Location size={15} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("https://marjan.ariisco.com/en");
                }}
                className="flex-1 py-7 bg-gray-800 text-white flex items-center justify-center gap-2 rounded-md text-[.8rem]"
              >
                {t("SmartLayout")}
                <Icons.Box2 size={15} />
              </button>
            </div>

            <Table
              title={""}
              thickness={singleProduct.thickness}
              colors={singleProduct.color}
              surface={singleProduct.surface}
              size={singleProduct.size}
            />

            <div className="flex flex-col gap-4 max-h-[320px] overflow-y-auto hide-scrollbar mt-[3rem]">
              {singleProduct?.products.map((item) => (
                <ItemOther
                  key={item.id}
                  setOpenModal={setOpenModal}
                  item={item}
                />
              ))}
            </div>
          </div>

          <div className="absolute w-full h-full backface-hidden rotate-y-180  rounded-xl overflow-hidden">
            <Image
              src={buildSrc(currentImage || singleProduct.image)}
              alt=" Introduction image"
              className="object-contain"
              quality={100}
              fill
              unoptimized={true}
            />
            <Icons.CloseCircle
              size={27}
              color="#fff"
              className="cursor-pointer absolute right-5 top-5"
              onClick={(e) => {
                e.stopPropagation();
                setOpenModal(false);
              }}
            />
            <div className="absolute left-0 bottom-0 p-8 w-full flex justify-between backdrop-blur-[5px] bg-white/50">
              <button onClick={handleShare} className="flex items-center gap-4">
                <Image
                  src="/images/share.png"
                  width={25}
                  height={25}
                  className="cursor-pointer mix-blend-multiply"
                  alt="share"
                />
                <span>{t("Share On")}</span>
              </button>
              <button
                onClick={() => setFlipped(!flipped)}
                className="cursor-pointer mix-blend-multiply"
              >
                {t("More Detailes")}
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .transform-style {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}</style>

        <div className="flex lg:hidden gap-3 items-center mt-3 px-4 py-4 overflow-x-auto whitespace-nowrap hide-scrollbar">
          {singleProduct?.gallery?.map((g) => {
            const imgPath = g.url || g.image || g;
            const thumbSrc = buildSrc(imgPath);
            const isActive =
              thumbSrc === buildSrc(currentImage) || imgPath === currentImage;
            return (
              <button
                key={g.id || thumbSrc}
                onClick={() => setCurrentImage(imgPath)}
                className={`relative flex-shrink-0 overflow-hidden w-[60px] h-[60px] ${
                  isActive ? "ring-2 ring-gray-800" : ""
                }`}
              >
                <Image
                  src={thumbSrc}
                  alt={g.title || "thumb"}
                  width={60}
                  height={60}
                  quality={80}
                  unoptimized={true}
                  className="object-cover w-full h-full"
                />
                {!isActive && <div className="absolute inset-0 bg-black/40 " />}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

function ItemOther({ setOpenModal, item }) {
  const router = useRouter();
  const { localizedHref } = useLocalizedLink();
  const { t, locale } = useTranslation();
  return (
    <div
      className={`flex items-center justify-between ${
        ["fa", "ar"].includes(locale) ? "font-fa" : "font-en"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center  gap-[15px]">
        <div className="relative w-[80px] h-[80px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${item.product_image}`}
            alt="Introduction image"
            fill
            className="object-cover aspect-square "
          />
        </div>

        <div className="flex flex-col gap-[6px] ">
          <sapn>{item.title}</sapn>
        </div>
      </div>
      <button
        onClick={() => {
          setOpenModal(false);
          router.push(localizedHref(`/products/${item?.slug}`));
        }}
        className="px-[30px] py-[7px] bg-[var(--color-gray-800)] text-white flex items-center gap-[5px] justify-center cursor-pointer"
      >
        {t("More")}
      </button>
    </div>
  );
}
