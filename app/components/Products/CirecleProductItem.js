import Image from "next/image";
import React from "react";

export default function CirecleProductItem({ item, index }) {
  return (
    <div
      className={`w-[30px] h-[30px] rounded-full overflow-hidden relative ${"-me-12"} z-[${
        10 - index
      }] transition-transform duration-300 ease-in-out hover:-translate-y-4`}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}${item?.image}`}
        fill
        alt="product-circle"
        className="object-cover overflow-hidden"
      />
    </div>
  );
}
