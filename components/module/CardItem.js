"use client";
import Image from "next/image";
import React, { useState } from "react";
import CirecleProductItem from "../Products/CirecleProductItem";
import { useLocalizedLink } from "@/utils/helper";
import Link from "next/link";
import { useTranslation } from "@/context/TranslationContext";

export default function CardItem({ product, setProductIdUnSave = null }) {
  const [isSaved, setIsSaved] = useState(product?.is_save);
  const { localizedHref } = useLocalizedLink();
  const { t, locale } = useTranslation();

  const handleSaveToggle = async (productId) => {
    try {
      if (isSaved) {
        if (setProductIdUnSave) setProductIdUnSave(productId);
        setIsSaved(!isSaved);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/product/api/favorites/remove/${productId}/`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to remove favorite");
      } else {
        setIsSaved(!isSaved);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/product/api/favorites/add/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ product_id: productId }),
          }
        );
        if (!response.ok) throw new Error("Failed to add favorite");
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(product?.new_collection);

  return (
    <div className="mb-[30px] box-border cursor-pointer">
      <Link
        href={localizedHref(`/products/${product?.title}`)}
        className="block"
      >
        <div className="aspect-[4/2]  h-full  relative overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${product?.image}`}
            fill
            alt="product-picture"
            className="object-cover transform transition-transform duration-[2000ms] ease-in-out hover:scale-[1.15]"
            priority
          />
          {product?.new_collection && (
            <div
              className={`absolute top-4 right-4 bg-black text-white text-xs font-bold px-4 pt-4 pb-2 rounded flex items-center justify-center ${
                ["ar", "fa"].includes(locale) ? "font-fa" : "font-en"
              }`}
            >
              {t("New")}
            </div>
          )}
        </div>
      </Link>

      <div className="relative flex justify-between items-center mt-[10px] ">
        <button
          onClick={() => handleSaveToggle(product.id)}
          className="cursor-pointer"
        >
          <div className="relative ">
            <Image
              src={isSaved ? "/images/save2.png" : "/images/save1.png"}
              width={20}
              height={20}
              alt=""
            />
          </div>
        </button>
        <h5 className="text-[#292d39] font-bold text-[1.0625rem] font-en">
          {product?.title}
        </h5>
      </div>
      {product?.tile_variants?.length > 0 && (
        <div dir="ltr" className="flex  items-center mt-[15px]">
          {product?.tile_variants?.map((item, i) => (
            <CirecleProductItem key={i} item={item} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
