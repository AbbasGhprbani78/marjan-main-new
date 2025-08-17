"use client";
import { useLocalizedLink } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductItem({ item }) {
  const { localizedHref } = useLocalizedLink();
  return (
    <article>
      <Link href={localizedHref("/products/1")}>
        <div className=" overflow-hidden ">
          <Image
            src={item?.image}
            alt={"تصویر محصول"}
            className="aspect-square object-cover transform transition-transform duration-[2000ms] ease-in-out group-hover:scale-[1.15] md:h-[290px]"
            width={500}
            height={500}
          />
        </div>
        {item?.text && (
          <p className="font-medium text-[1rem]  mt-[0.5rem] inline-block">
            {item.text}
          </p>
        )}
      </Link>
    </article>
  );
}
