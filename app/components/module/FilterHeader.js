"use client";
import Image from "next/image";
import { MoreButton } from "../moreButton";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hook/useTranslation";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import AccardionFilter from "./AccardionFilter";
import { useViewportWidth } from "@/hook/useViewportWidth";

export default function FilterHeader({ show, setClose }) {
  const { t, locale } = useTranslation();
  const [filterItems, setFilterItems] = useState({});
  const width = useViewportWidth();

  const getFilterHeader = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/product-catalog/`,
        {
          headers: {
            "Accept-Language": locale,
          },
        }
      );

      if (response.status === 200) {
        setFilterItems(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilterHeader();
  }, []);

  return (
    <>
      <div className="block lg:hidden">
        <AccardionFilter title={t("size")}>
          <div className="grid grid-cols-1 gap-[10px] mt-[1rem]">
            {filterItems?.sizes?.map((item, i) => (
              <ItemFilterBox
                key={i}
                text={item}
                type="size"
                setClose={setClose}
              />
            ))}
          </div>
        </AccardionFilter>
        <AccardionFilter title={t("color")}>
          <div className="grid grid-cols-1 gap-[10px] mt-[1rem]">
            {filterItems?.colors?.map((item, i) => (
              <ItemFilterBox
                key={i}
                item={item}
                type="color"
                setClose={setClose}
              />
            ))}
          </div>
        </AccardionFilter>
        <AccardionFilter title={t("style")}>
          <div className="grid grid-cols-2 gap-[10px] mt-[1rem]">
            {filterItems?.styles?.map((item, i) => (
              <ItemStyle key={i} item={item} setClose={setClose} />
            ))}
          </div>
        </AccardionFilter>

        <AccardionFilter title={t("Usage")}>
          <div className="grid grid-cols-2 gap-[10px] mt-[1rem]">
            {filterItems?.environments?.map((item, i) => (
              <UseCase key={i} item={item} setClose={setClose} />
            ))}
            <Link
              href={"/industrial"}
              className="relative aspect-[3/2] cursor-pointer"
            >
              <Image
                src={"/images/49.jpg"}
                alt="use case image item filter"
                fill
                className="object-fill"
              />
              <div className="absolute inset-0 bg-black/50 flex items-end">
                <span className="text-white font-medium text-[.9rem] px-10 pb-10">
                  {t("Industrial")}
                </span>
              </div>
            </Link>
          </div>
        </AccardionFilter>
      </div>

      {width > 1023 && (
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-[70px] left-0 right-0 bg-white z-10 w-full px-80  pt-[3rem]"
            >
              <div className="h-[80dvh] overflow-y-auto pb-[3rem] hide-scrollbar">
                <div className="grid grid-cols-12 gap-[2rem] ">
                  <div className=" md:col-span-6 xl:col-span-3 text-start">
                    <span className="font-medium pb-[5px] border-b-2 inline-block w-85 text-center text-[var(--color-gray-900)]">
                      {t("size")}
                    </span>
                    <div className="grid grid-cols-2 gap-[10px] mt-[1rem]">
                      {filterItems?.sizes?.map((item, i) => (
                        <ItemFilterBox
                          key={i}
                          text={item}
                          type="size"
                          setClose={setClose}
                        />
                      ))}
                    </div>
                  </div>
                  <div className=" md:col-span-6 xl:col-span-3 text-start">
                    <span className="font-medium pb-[5px] border-b-2 inline-block w-85 text-center text-[var(--color-gray-900)]">
                      {t("color")}
                    </span>
                    <div className="grid grid-cols-2 gap-[10px] mt-[1rem]">
                      {filterItems?.colors?.map((item, i) => (
                        <ItemFilterBox
                          key={i}
                          item={item}
                          type="color"
                          setClose={setClose}
                        />
                      ))}
                    </div>
                  </div>
                  <div className=" md:col-span-6 xl:col-span-3 text-start ">
                    <span className="font-medium pb-[5px] border-b-2 inline-block w-85 text-center text-[var(--color-gray-900)]">
                      {t("style")}
                    </span>
                    <div className="grid grid-cols-3 gap-[10px] mt-[1rem]">
                      {filterItems?.styles?.map((item, i) => (
                        <ItemStyle key={i} item={item} setClose={setClose} />
                      ))}
                    </div>
                  </div>
                  <div className=" md:col-span-6 xl:col-span-3 text-start">
                    <span className="font-medium pb-[5px] border-b-2 inline-block w-85 text-center text-[var(--color-gray-900)]">
                      {t("Usage")}
                    </span>
                    <div className="grid grid-cols-2 gap-[10px] mt-[1rem]">
                      {filterItems?.environments?.map((item, i) => (
                        <UseCase key={i} item={item} setClose={setClose} />
                      ))}
                      <Link
                        href={"/industrial"}
                        className="relative aspect-[3/2] cursor-pointer"
                      >
                        <Image
                          src={"/images/49.jpg"}
                          alt="use case image item filter"
                          fill
                          className="object-fill"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-end">
                          <span className="text-white font-medium text-[.9rem] px-10 pb-10">
                            {t("Industrial")}
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-[1rem]">
                  <div className="flex items-center gap-[1.5rem]">
                    <MoreButton
                      text={t("AllProducts")}
                      width="124"
                      height="40"
                      invert=""
                      href="/products"
                    />
                    <MoreButton
                      text={t("Why Marjan")}
                      width="124"
                      height="40"
                      invert=""
                      href="#"
                    />
                    <MoreButton
                      text={t("Catalog")}
                      width="124"
                      height="40"
                      invert=""
                      href="/catalog"
                    />
                  </div>
                  <div className="flex gap-20 items-center">
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
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}

function ItemFilterBox({ text, type, item, setClose }) {
  const { t } = useTranslation();

  let width = 0;
  let height = 0;

  if (text) {
    const parts = text.split(/[*x]/i);
    if (parts.length === 2) {
      const [h, w] = parts.map((n) => parseInt(n.trim(), 10));
      height = h || 0;
      width = w || 0;
    }
  }

  const displayText = text || item.title;
  const filterValue = text || item.title;

  const filterKeyMap = {
    sizes: "size",
    colors: "color",
  };
  const filterKey = filterKeyMap[type] || type;

  return (
    <Link
      href={`/products?filterKey=${filterKey}&values=${encodeURIComponent(
        filterValue
      )}`}
      className="relative flex items-center justify-between px-20  lg:px-2 lg:justify-around h-[46px]  bg-[#f7f5f4] text-[var(--color-gray-900)] cursor-pointer"
    >
      <span className="font-medium">{displayText}</span>
      <div>
        {type === "size" ? (
          <div
            className="bg-[#d9d9d9]"
            style={{
              width:
                width && height
                  ? `${(width / Math.max(width, height)) * 40}px`
                  : "40px",
              height:
                width && height
                  ? `${(height / Math.max(width, height)) * 40}px`
                  : "40px",
            }}
          />
        ) : (
          <div className="relative w-[40px] h-[30px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute h-[21px] w-[21px] rounded-full"
                style={{
                  backgroundColor: item.code,
                  left: `${i === 0 ? 7 : i === 1 ? 0 : 10}px`,
                  bottom: `${i === 0 ? 6 : i === 1 ? 0 : -4}px`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

function ItemStyle({ item, setClose }) {
  return (
    <Link
      href={`/products?filterKey=style&values=${encodeURIComponent(
        item.title
      )}`}
      className="relative flex flex-col gap-[2px] cursor-pointer"
    >
      <div className="relative aspect-square">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
          alt="style image item filter"
          fill
          className="object-fill"
        />
      </div>
      <span className="font-medium text-[.85rem] text-[var(--color-gray-900)]">
        {item.title}
      </span>
    </Link>
  );
}

function UseCase({ item, setClose }) {
  return (
    <Link
      href={`/products?filterKey=environment&values=${encodeURIComponent(
        item.title
      )}`}
      className="relative aspect-[3/2] cursor-pointer"
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
        alt="use case image item filter"
        fill
        className="object-fill"
      />
      <div className="absolute inset-0 bg-black/50 flex items-end">
        <span className="text-white font-medium text-[.9rem] px-10 pb-10">
          {item.title}
        </span>
      </div>
    </Link>
  );
}
