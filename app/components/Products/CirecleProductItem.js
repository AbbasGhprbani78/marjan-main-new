import Image from "next/image";
import React from "react";

export default function CirecleProductItem({ src, index }) {
  return (
    <div
      className={`rounded-full overflow-hidden ${
        index !== 3 ? "-me-12" : ""
      } relative z-[${
        10 - index
      }] transition-transform duration-300 ease-in-out hover:-translate-y-4`}
    >
      <Image
        src={src}
        width={40}
        height={40}
        alt="product-circle"
        className="object-cover"
      />
    </div>
  );
}
