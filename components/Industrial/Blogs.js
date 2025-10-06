"use client";
import React from "react";
import { BlogSlider } from "../slider";

import { useTranslation } from "@/context/TranslationContext";
import { MoreButton } from "../moreButton";

export default function Blogs({ data }) {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="font-[500] title text-center mb-[2rem] px-20 md:px-40 lg:px-80">
        {t("Blog")}
      </h2>
      <BlogSlider data={data} shadow={"true"} lineColor={"true"} />
      <div className="mt-[2rem] flex justify-center">
        <MoreButton
          text={t("More")}
          width={263}
          height={46}
          className="mx-auto my-[35px] "
          href={"/blogs"}
        />
      </div>
    </>
  );
}
