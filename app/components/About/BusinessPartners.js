"use client";
import Image from "next/image";
import React from "react";

export default function BusinessPartners({ brands }) {
  return (
    <>
      <h3 className="text-[var(--color-gray-900)]  mb-[2rem] px-20 md:px-40 lg:px-80  title font-[500]">
        شرکای تجاری
      </h3>
      <div className="flex justify-center items-center mt-[3rem] ">
        <div className="h-auto  w-3/4 flex  gap-[4rem] md:gap-0 md:h-[95px] flex-row  justify-evenly md:justify-between items-center md:w-6/12 mx-auto">
          <a
            href={brands[1].link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group w-2/3 md:w-1/3  flex flex-col items-center overflow-hidden md:h-full"
          >
            <div className="h-[80px]  relative w-full md:h-full">
              <Image
                src={brands[0].image}
                alt="business partners image"
                fill
                className="object-contain hover:opacity-50 transition-opacity duration-300"
              />
            </div>
          </a>
          <a
            href={brands[0].link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group w-2/3 md:w-1/3  flex flex-col items-center overflow-hidden md:h-full"
          >
            <div className="h-[80px]  relative w-full md:h-full">
              <Image
                src={brands[1].image}
                alt="business partners image"
                fill
                className="object-contain hover:opacity-50 transition-opacity duration-300"
              />
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
