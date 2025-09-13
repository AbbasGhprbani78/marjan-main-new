"use client";
import React, { useState } from "react";
import Image from "next/image";
import PopupGallery from "./PopupGallery";
export default function CircleItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className="relative rounded-full overflow-hidden w-[100px] h-[100px]  md:w-[100px] md:h-[100px] cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${item?.image}`}
          alt="standard image item"
          fill
          className="object-contain select-none"
        />
      </div>
      <PopupGallery
        media={[item?.file]}
        open={open}
        setOpen={setOpen}
        isdownload={false}
      />
    </>
  );
}
