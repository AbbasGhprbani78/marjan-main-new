"use client";
import Image from "next/image";
import React, { useState } from "react";
import CirecleProductItem from "../Products/CirecleProductItem";
import { truncateText, useLocalizedLink } from "@/utils/helper";
import Link from "next/link";
import * as Icons from "iconsax-reactjs";

export default function CardItem({ product }) {
  const [isSaved, setIsSaved] = useState(product?.isSave);
  const { localizedHref } = useLocalizedLink();
  const handleSaveToggle = (e) => {
    e.preventDefault();
    setIsSaved((prev) => !prev);
  };

  return (
    <Link href={localizedHref(`/products/${product.id}`)}>
      <div className="  mb-[30px] box-border cursor-pointer">
        <div className="aspect-[4/2]  h-full  relative overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${product?.image}`}
            fill
            alt="product-picture"
            className="object-cover transform transition-transform duration-[2000ms] ease-in-out hover:scale-[1.15]"
          />
        </div>
        <div className="relative flex justify-between items-center mt-[20px] ">
          <h5 className="text-[#292d39] font-bold text-[1.0625rem]">
            {product?.title}
          </h5>
          <button onClick={handleSaveToggle} className="cursor-pointer">
            <div className="relative">
              <img
                src={isSaved ? "/images/save2.png" : "/images/save1.png"}
                width={20}
              />
            </div>
          </button>
        </div>
        {/* <p className="mt-[15px] text-[15px] text-[#919191] text-justify">
          {truncateText(product?.description, 40)}
        </p> */}
        {/* <div className="flex justify-end items-center mt-[15px]">
          {[
            "/images/2.png",
            "/images/2.png",
            "/images/2.png",
            "/images/2.png",
          ].map((src, i) => (
            <CirecleProductItem key={i} src={src} index={i} />
          ))}
        </div> */}
      </div>
    </Link>
  );
}
