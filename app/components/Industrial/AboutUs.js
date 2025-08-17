"use client";
import Image from "next/image";
import React from "react";
import LinkButton from "../module/LinkButton";
import { useTranslation } from "@/hook/useTranslation";
import { MoreButton } from "../moreButton";

export default function AboutUs({ data }) {
  const { t } = useTranslation();
  return (
    <div className="relative px-20 md:px-40 lg:px-80 pt-[3rem]  min-h-[380px] pb-[2rem]">
      <div className="absolute bg-[#00000080] md:bg-[#292D32CC] inset-0 z-10 w-full md:w-1/2"></div>
      <div className="absolute inset-0 z-0">
        <Image src={data?.image} alt="fill" fill className="object-cover" />
      </div>

      <div className="relative z-10 text-white w-full md:w-1/2">
        <h3 className="font-medium title mb-[1.5rem] text-center md:text-start">
          {data.title}
        </h3>
        <p className="text-justify w-full md:w-7/8 leading-[30px]">
          {data.text}
        </p>
        <div className="w-[250px] mt-[1rem] mx-auto md:mx-0">
          <MoreButton
            text={t("More")}
            width={250}
            height={46}
            className="mx-auto my-[25px] "
            href={"/aboutus"}
          />
        </div>
      </div>
    </div>
  );
}
