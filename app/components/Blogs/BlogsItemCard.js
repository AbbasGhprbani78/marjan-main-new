"use client";
import { truncateText, useLocalizedLink } from "@/utils/helper";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function BlogsItemCard({ item }) {
  const { localizedHref } = useLocalizedLink();
  return (
    <article>
      <Link href={localizedHref(`/blogs/${item?.id}`)}>
        <div className="relative aspect-[4/2] md:aspect-[4/4]  h-full overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
            alt="blog image item"
            fill
            className="object-cover transform transition-transform duration-[2000ms] ease-in-out hover:scale-[1.15]"
          />
        </div>
        <div className="border-t border-[#e8e8e8] flex items-start lg:items-center justify-between mt-[10px] pt-[10px]">
          <p className=" text-[1rem]">{truncateText(item.text, 23)}</p>
        </div>
      </Link>
    </article>
  );
}
