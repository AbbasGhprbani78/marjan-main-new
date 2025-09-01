"use client";
import React from "react";
import { ProjectsSlider } from "../slider";
import { useTranslation } from "@/hook/useTranslation";
import { MoreButton } from "../moreButton";

export default function Project({ data }) {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="font-[500] title text-center mb-[2rem] px-20 md:px-40 lg:px-80">
        {t("Projects")}
      </h2>
      <ProjectsSlider data={data} />
      <div className="mt-[1rem] flex justify-center">
        <MoreButton
          text={t("More")}
          width={263}
          height={46}
          className="mx-auto my-[35px] "
          href={"/projects"}
        />
      </div>
    </>
  );
}
