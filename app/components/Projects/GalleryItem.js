"use client";
import Image from "next/image";
import React from "react";

export default function GalleryItem({ media, onClick }) {
  const isVideo = /\.(mp4|webm|ogg|mkv)$/i.test(media);

  return isVideo ? (
    <video
      onClick={onClick}
      src={`${process.env.NEXT_PUBLIC_API_URL}${media}`}
      controls
      className="cursor-pointer aspect-square object-cover w-full transform transition-transform duration-[2000ms] ease-in-out group-hover:scale-[1.15] md:h-[290px]"
    />
  ) : (
    <Image
      onClick={onClick}
      alt="gallery item image"
      src={`${process.env.NEXT_PUBLIC_API_URL}${media}`}
      className="cursor-pointer aspect-square object-cover transform transition-transform duration-[2000ms] ease-in-out group-hover:scale-[1.15] md:h-[290px]"
      width={500}
      height={500}
    />
  );
}
