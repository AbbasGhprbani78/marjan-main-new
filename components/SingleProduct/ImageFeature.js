import Image from "next/image";
import React from "react";

export default function ImageFeature({ item }) {
  return (
    <div className="group relative w-fit text-center flex flex-col justify-center items-center min-w-[80px] md:min-w-auto">
      <div className="cursor-pointer relative w-30 h-30 md:w-40 md:h-40 ">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${item?.image}`}
          fill
          alt="feature image"
        />
      </div>
      <div
        className="absolute top-[120%] left-1/2 -translate-x-1/2 mt-2 hidden lg:block
                opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100
                transition-all duration-300 bg-gray-800 text-white text-sm
                py-4 px-[10px] z-10 whitespace-nowrap shadow-lg"
      >
        {item.title}

        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-10 bg-gray-800 rotate-45"></div>
      </div>

      <span className="block text-[#8b8d91] font-bold text-[.85rem] text-center mt-[4px] lg:hidden">
        {item.title}
      </span>
    </div>
  );
}
