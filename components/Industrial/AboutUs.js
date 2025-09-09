"use client";
import Image from "next/image";
import React from "react";
import LinkButton from "../module/LinkButton";
import { useTranslation } from "@/hook/useTranslation";
import { MoreButton } from "../moreButton";
import { toPersianDigits } from "@/utils/helper";

export default function AboutUs({ data }) {
  const { t, locale } = useTranslation();
  return (
    <div className="flex flex-col min-h-[422px] h-auto w-full py-[50px] px-20 md:px-40 lg:px-[80px] relative">
      <div className="absolute inset-0 z-0">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${data?.image}`}
          alt="fill"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 text-white w-full md:w-1/2">
        <h3 className="font-medium title mb-[1.5rem] text-center md:text-start">
          {data.title}
        </h3>
        <p className="text-justify w-full md:w-[38dvw] leading-[30px]">
          {locale === "fa" ? toPersianDigits(data.text) : data.text}
        </p>
        <div className="w-[250px] mt-[1rem] mx-auto md:mx-0">
          <MoreButton
            text={t("More")}
            width={250}
            height={46}
            className="mx-auto my-[25px]"
            href={"/aboutus"}
          />
        </div>
      </div>
    </div>
  );
}
