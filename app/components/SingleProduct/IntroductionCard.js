"use client";
import Image from "next/image";
import React, { useState } from "react";
import * as Icons from "iconsax-reactjs";
import Table from "./Table";
import { useRouter } from "next/navigation";
import { useLocalizedLink } from "@/utils/helper";
import { useTranslation } from "@/hook/useTranslation";

export default function IntroductionCard({ setOpenModal, singleProduct }) {
  const router = useRouter();
  const { localizedHref } = useLocalizedLink();
  const { t } = useTranslation();
  const [flipped, setFlipped] = useState(false);
  return (
    <>
      <div className="hidden md:grid grid-cols-12  md:w-[95vw] lg:w-[70vw] lg:min-h-[510] mx-auto ">
        <div className="col-span-12 md:col-span-6 xl:col-span-5 h-full text-[var(--color-gray-900)] bg-white p-[1.2rem] ">
          <div className="flex items-center justify-between mb-[1rem] md:mb-[2rem]">
            <span className="font-fa text-[1.3rem]">{singleProduct.title}</span>
            <Icons.CloseCircle
              size={25}
              className="cursor-pointer hidden md:block"
              onClick={() => setOpenModal(false)}
            />
          </div>

          <div className="flex items-center  w-full gap-[5px]">
            <button
              onClick={() => router.push(localizedHref("/representatives"))}
              className="flex-1 py-[7px] bg-[var(--color-gray-800)] text-white flex items-center gap-[5px] justify-center cursor-pointer"
            >
              {t("WhereToBuy")}
              <Icons.Location size={15} />
            </button>
            <button
              onClick={() => router.push("https://marjan.ariisco.com")}
              className="flex-1 py-[7px] bg-[var(--color-gray-800)] text-white flex items-center gap-[5px] justify-center cursor-pointer"
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
          <div className="flex flex-col gap-[20px] max-h-[200] overflow-y-auto  hide-scrollbar mt-[2rem] md:mt-[3rem]">
            {singleProduct?.products.map((item) => (
              <ItemOther
                key={item.id}
                setOpenModal={setOpenModal}
                item={item}
              />
            ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 xl:col-span-7 relative">
          <div className="relative h-[25dvh] md:h-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${singleProduct.image}`}
              alt=" Introduction image"
              className="object-fill"
              fill
            />
            <Icons.CloseCircle
              size={27}
              color="#fff"
              className="cursor-pointer absolute z-20 right-10 top-20 md:hidden"
              onClick={() => setOpenModal(false)}
            />
          </div>
          <div className=" absolute left-0 bottom-0 p-[1rem] w-full flex justify-end backdrop-blur-[5px] bg-white/50  z-50">
            <div className="flex md:flex-col  items-center md:items-start  gap-[15px] w-max  ">
              <span>{t("ShareOn")}</span>
              <div className="flex items-center gap-[15px]">
                <a
                  href="https://www.pinterest.com/marjantileco/"
                  target="_blank"
                >
                  <Image
                    src={"/images/pintrest.png"}
                    width={30}
                    height={30}
                    className="object-fill cursor-pointer  mix-blend-multiply"
                    alt=""
                  />
                </a>
                <a
                  href="https://instagram.com/marjantileco?utm_medium=copy_link"
                  target="_blank"
                >
                  <Image
                    src={"/images/instagram.png"}
                    width={40}
                    height={40}
                    className="object-fill cursor-pointer mix-blend-multiply"
                    alt=""
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/marjantilecompany"
                  target="_blank"
                >
                  <Image
                    src={"/images/linkdin.png"}
                    width={40}
                    height={40}
                    className="object-fill cursor-pointer mix-blend-multiply"
                    alt=""
                  />
                </a>
                <a href="https://www.aparat.com/marjantile" target="_blank">
                  <Image
                    src={"/images/aparat.png"}
                    width={35}
                    height={35}
                    className="object-fill cursor-pointer mix-blend-multiply"
                    alt=""
                  />
                </a>
                <a
                  href="https://www.youtube.com/@marjantile6108"
                  target="_blank"
                >
                  <Image
                    src={"/images/youtube.png"}
                    width={40}
                    height={40}
                    className="object-fill cursor-pointer mix-blend-multiply"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className=" md:hidden w-[95vw] md:w-[80vw] h-[600px] md:h-[500px] perspective cursor-pointer mx-auto"
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full duration-700 transform-style preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          <div className="absolute w-full h-full backface-hidden bg-white p-[20px] flex flex-col  shadow-lg rounded-xl">
            <div className="flex items-center justify-between mb-[1rem]">
              <span className="font-fa text-[1.3rem]">
                {singleProduct.title}
              </span>
              <Icons.CloseCircle
                size={25}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal(false);
                }}
              />
            </div>

            <div className="flex items-center gap-5 mb-[2rem]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/representatives");
                }}
                className="flex-1 py-2 bg-gray-800 text-white flex items-center justify-center gap-2 rounded-md"
              >
                {t("WhereToBuy")}
                <Icons.Location size={15} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("https://marjan.ariisco.com");
                }}
                className="flex-1 py-2 bg-gray-800 text-white flex items-center justify-center gap-2 rounded-md"
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

          <div className="absolute w-full h-full backface-hidden rotate-y-180 shadow-lg rounded-xl overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${singleProduct.image}`}
              alt=" Introduction image"
              className="object-fill"
              fill
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
            <div className="absolute left-0 bottom-0 p-4 w-full flex justify-center backdrop-blur-[5px] bg-white/50">
              <div className="flex md:flex-col items-center gap-4 w-max">
                <span>{t("ShareOn")}</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.pinterest.com/marjantileco/"
                    target="_blank"
                  >
                    <Image
                      src="/images/pintrest.png"
                      width={30}
                      height={30}
                      alt=""
                    />
                  </a>
                  <a href="https://instagram.com/marjantileco" target="_blank">
                    <Image
                      src="/images/instagram.png"
                      width={40}
                      height={40}
                      alt=""
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/marjantilecompany"
                    target="_blank"
                  >
                    <Image
                      src="/images/linkdin.png"
                      width={40}
                      height={40}
                      alt=""
                    />
                  </a>
                  <a href="https://www.aparat.com/marjantile" target="_blank">
                    <Image
                      src="/images/aparat.png"
                      width={35}
                      height={35}
                      alt=""
                    />
                  </a>
                  <a
                    href="https://www.youtube.com/@marjantile6108"
                    target="_blank"
                  >
                    <Image
                      src="/images/youtube.png"
                      width={40}
                      height={40}
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .perspective {
            perspective: 1000px;
          }
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
      </div>
    </>
  );
}

function ItemOther({ setOpenModal, item }) {
  const router = useRouter();
  const { localizedHref } = useLocalizedLink();
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-[15px]">
        <div className="relative w-[80px] h-[80px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${item.product_image}`}
            alt="Introduction image"
            fill
            className="object-cover aspect-square "
          />
        </div>

        <div className="flex flex-col gap-[6px]">
          <sapn>{item.title}</sapn>
          {item.sizes.map((size) => (
            <sapn key={size}>{size}</sapn>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          setOpenModal(false);
          router.push(localizedHref(`/products/${item.id}`));
        }}
        className="px-[30px] py-[7px] bg-[var(--color-gray-800)] text-white flex items-center gap-[5px] justify-center cursor-pointer"
      >
        {t("More")}
      </button>
    </div>
  );
}

// max-h-[350px] md:max-h-max overflow-y-auto
