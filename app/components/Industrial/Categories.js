"use client";
import React, { useState } from "react";
import Tab from "../module/Tab";
import Image from "next/image";
import { useTranslation } from "@/hook/useTranslation";
import { MoreButton } from "../moreButton";

export default function Categories({ data }) {
  const [selected, setSelected] = useState(data[0]?.value ?? "");
  const selectedCategory = data.find((cat) => cat.value === selected);
  const { t } = useTranslation();

  return (
    <>
      <h2 className="font-[500] title text-center mb-[2rem]">
        {t("Categories")}
      </h2>
      <Tab
        itemsFilter={data.map(({ value, lable }) => ({
          value,
          label: lable,
        }))}
        selected={selected}
        setSelected={setSelected}
      />

      {selectedCategory && (
        <div className="mt-[30px]">
          <div className="relative w-full aspect-[3/1] min-h-[200px] overflow-hidden">
            <Image
              src={selectedCategory.image}
              alt={selectedCategory.value}
              fill
              className="object-cover transform transition-transform duration-[2000ms] ease-in-out hover:scale-[1.15]"
            />
          </div>
        </div>
      )}

      <div className="mt-[1rem] flex justify-center">
        <MoreButton
          text={t("Products")}
          width={263}
          height={46}
          className="mx-auto my-[35px] "
          href={"/products"}
        />
      </div>
    </>
  );
}
