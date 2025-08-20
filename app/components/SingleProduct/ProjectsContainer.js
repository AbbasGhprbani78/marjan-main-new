"use client";
import Image from "next/image";
import React, { useRef } from "react";
import Link from "next/link";
import * as Icons from "iconsax-reactjs";
import { MoreButton } from "../moreButton";
import { useLocalizedLink } from "@/utils/helper";
import { useTranslation } from "@/hook/useTranslation";
import { GallerySlider } from "../slider";

export default function ProjectsContainer({ data }) {
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const { localizedHref } = useLocalizedLink();
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="  relative">
      <p className="px-20 md:px-40 lg:px-80  text-[1.3rem]  md:text-[1.5rem] pt-30 font-[500]  pb-30">
        {t("Projects")}
      </p>

      <GallerySlider
        data={data.map((item) => ({
          id: item.id,
          image: item.default_image,
          link: `/projects/${item.id}`,
        }))}
      />
      <div className="pt-[2rem] pb-[1rem] flex justify-center">
        <MoreButton
          text={t("More")}
          height="40"
          width="200"
          invert=""
          href="/projects"
        />
      </div>
    </div>
  );
}
