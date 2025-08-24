"use client";
import Image from "next/image";
import React from "react";

export default function GalleryItem({ image }) {
  return (
    <Image
      alt={"gallery item image"}
      // src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
      src={`${image}`}
      className="aspect-square object-cover transform transition-transform duration-[2000ms] ease-in-out group-hover:scale-[1.15] md:h-[290px]"
      width={500}
      height={500}
    />
  );
}
