"use client";
import { filter } from "@/app/dataFIlter";
import Image from "next/image";
import { MoreButton } from "../moreButton";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hook/useTranslation";
import Link from "next/link";
import axios from "axios";
import { useEffect } from "react";

export default function FilterHeader({ show }) {
  const { t, locale } = useTranslation();

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
        console.log(response.data);
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
                    {filter.size.map((item, i) => (
                      <ItemFilterBox key={i} text={item} type="size" />
                    ))}
                  </div>
                </div>
                <div className=" md:col-span-6 xl:col-span-3 text-start">
                  <span className="font-medium pb-[5px] border-b-2 inline-block w-85 text-center text-[var(--color-gray-900)]">
                    {t("color")}
                  </span>
                  <div className="grid grid-cols-2 gap-[10px] mt-[1rem]">
                    {filter.colors.map((item, i) => (
                      <ItemFilterBox key={i} item={item} type="color" />
                    ))}
                  </div>
                </div>
                <div className=" md:col-span-6 xl:col-span-3 text-start ">
                  <span className="font-medium pb-[5px] border-b-2 inline-block w-85 text-center text-[var(--color-gray-900)]">
                    {t("style")}
                  </span>
                  <div className="grid grid-cols-3 gap-[10px] mt-[1rem]">
                    {filter.style.map((item, i) => (
                      <ItemStyle key={i} item={item} />
                    ))}
                  </div>
                </div>
                <div className=" md:col-span-6 xl:col-span-3 text-start">
                  <span className="font-medium pb-[5px] border-b-2 inline-block w-85 text-center text-[var(--color-gray-900)]">
                    {t("Usage")}
                  </span>
                  <div className="grid grid-cols-2 gap-[10px] mt-[1rem]">
                    {filter.usecase.map((item, i) => (
                      <UseCase key={i} item={item} />
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
                    text={t("Products")}
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
    </>
  );
}

function ItemFilterBox({ text, type, item }) {
  const { t } = useTranslation();
  let width = 0;
  let height = 0;

  if (text) {
    const parts = text.split(/[*x]/i);
    if (parts.length === 2) {
      const [height, width] = parts.map((n) => parseInt(n.trim(), 10));
    }
  }

  const displayText = text ? text : item.text;

  const filterValue = text ? text : item.text;

  return (
    <Link
      href={`/products?filterKey=${type}&values=${encodeURIComponent(
        filterValue
      )}`}
      className="relative flex items-center justify-around h-[46px] px-2 bg-[#f7f5f4] text-[var(--color-gray-900)] cursor-pointer"
    >
      <span className="font-medium">{displayText}</span>
      <div>
        {type === "size" ? (
          <div
            className="bg-[#d9d9d9]"
            style={{
              width: `${(width / Math.max(width, height)) * 40}px`,
              height: `${(height / Math.max(width, height)) * 40}px`,
            }}
          />
        ) : (
          <div className="relative w-[40px] h-[30px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute h-[21px] w-[21px] rounded-full"
                style={{
                  backgroundColor: item.color,
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

function ItemStyle({ item }) {
  return (
    <Link
      href={`/products?filterKey=style&values=${encodeURIComponent(
        item.title
      )}`}
      className="relative flex flex-col gap-[2px] cursor-pointer"
    >
      <div className="relative aspect-square">
        <Image
          src={item.image}
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

function UseCase({ item }) {
  return (
    <Link
      href={`/products?filterKey=environment&values=${encodeURIComponent(
        item.title
      )}`}
      className="relative aspect-[3/2] cursor-pointer"
    >
      <Image
        src={item.image}
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
