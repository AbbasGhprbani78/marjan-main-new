"use client";
import Image from "next/image";
import React from "react";
import ReadMoreText from "../module/ReadMoreText";

export default function AboutEnvironment({ environment }) {
  return (
    <div className="grid grid-cols-12 gap-[2.4rem] items-center">
      <div className="aspect-[4/3] col-span-12 md:col-span-5 lg:col-span-4 relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${environment?.image}`}
          fill
          alt="environment-image"
        />
      </div>
      <div className="col-span-12 md:col-span-7 lg:col-span-8 px-20 ">
        <h3 className="text-[var(--color-gray-900)] mb-[1.5rem]   lg:mt-[1.5rem] title font-[500]">
          {environment?.title}
        </h3>
        <ReadMoreText
          text={environment?.text}
          fontSize="text-[1rem]"
          fontweight=""
        />
      </div>
    </div>
  );
}
