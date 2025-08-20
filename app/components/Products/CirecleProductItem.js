import Image from "next/image";
import React from "react";

export default function CirecleProductItem({ item, index }) {
  return (
    <div
      className={`h-30 w-30 rounded-full overflow-hidden ${
        index !== 3 ? "-me-12" : ""
      } relative z-[${
        10 - index
      }] transition-transform duration-300 ease-in-out hover:-translate-y-4`}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}${item?.image}`}
        width={30}
        height={30}
        alt="product-circle"
        className="object-cover overflow-hidden"
      />
    </div>
  );
}
