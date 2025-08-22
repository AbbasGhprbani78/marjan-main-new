"use client";
import React from "react";
import Image from "next/image";
export default function CircleItem({ url }) {
  return (
    <div className="relative rounded-full overflow-hidden w-[100px] h-[100px]  md:w-[100px] md:h-[100px]">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}${url}`}
        alt="standard image item"
        fill
        className="object-cover"
      />
    </div>
  );
}
