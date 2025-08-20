"use client";
import React, { useEffect, useRef, useState } from "react";
import { MoreButton } from "../moreButton";
import Image from "next/image";
import * as Icons from "iconsax-reactjs";
import { useTranslation } from "@/hook/useTranslation";
import ReadMoreText from "../module/ReadMoreText";
export default function FeatureTabs({ data }) {
  const { t } = useTranslation();
  const [activeButton, setActiveButton] = useState(1);
  const [selectedData, setSelectedData] = useState(data?.[0] || {});
  const buttonsRef = useRef({});
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  useEffect(() => {
    const currentButton = buttonsRef.current[activeButton];
    if (currentButton) {
      setUnderlineStyle({
        left: currentButton.offsetLeft,
        width: currentButton.offsetWidth,
      });
    }
  }, [activeButton]);

  useEffect(() => {
    const mainData = data?.find((item) => item.id == activeButton);
    setSelectedData(mainData);
  }, [activeButton, data]);

  return (
    <div className="grid lg:grid-cols-2  lg:gap-[52px] h-full  lg:items-center xl:items-start">
      <div className="lg:hidden flex items-start md:justify-center justify-between   gap-0 md:gap-[1rem]  w-full px-[20px] mb-[1.5rem]">
        <button
          onClick={() => {
            const currentIndex = data.findIndex(
              (item) => item.id === activeButton
            );
            if (currentIndex > 0) {
              setActiveButton(data[currentIndex - 1].id);
            }
          }}
          disabled={data.findIndex((item) => item.id === activeButton) === 0}
          className="text-xl px-2 py-1 disabled:opacity-30"
        >
          <Icons.ArrowRight2
            className="ltr:rotate-180"
            size="20"
            color="#000"
            variant="blod"
          />
        </button>

        <button className="text-[17px] font-medium text-black py-2 border-b-2 border-[#000]">
          {data.find((item) => item.id === activeButton)?.title}
        </button>

        <button
          onClick={() => {
            const currentIndex = data.findIndex(
              (item) => item.id === activeButton
            );
            if (currentIndex < data.length - 1) {
              setActiveButton(data[currentIndex + 1].id);
            }
          }}
          disabled={
            data.findIndex((item) => item.id === activeButton) ===
            data.length - 1
          }
          className="text-xl px-2 py-1 disabled:opacity-30"
        >
          <Icons.ArrowLeft2
            className="ltr:rotate-180"
            size="20"
            color="#000"
            variant="blod"
          />
        </button>
      </div>
      {selectedData?.image && selectedData.image.trim() !== "" && (
        <div className="block lg:hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${selectedData.image}`}
            alt="Background Image"
            className="w-full h-auto object-cover aspect-[16/9]"
            width={1000}
            height={1000}
            priority
          />
        </div>
      )}

      <div className="w-full flex flex-col ps-[0px] lg:ps-[80px] order-2 md:order-none">
        <div className="hidden lg:flex flex-row justify-center gap-[50px]   relative border-b border-gray-300 lg:text-[.9rem] xl:text-[1rem]">
          <button
            ref={(el) => (buttonsRef.current[1] = el)}
            className="h-[45px] font-[500] cursor-pointer pb-[5px] transition-all duration-300 "
            onClick={() => setActiveButton(1)}
          >
            {t("Digital Assistant")}
          </button>
          <button
            ref={(el) => (buttonsRef.current[2] = el)}
            className="h-[45px] font-[500] cursor-pointer pb-[5px] transition-all duration-300 "
            onClick={() => setActiveButton(2)}
          >
            {t("Tile Area Estimator")}
          </button>
          <button
            ref={(el) => (buttonsRef.current[3] = el)}
            className="h-[45px] font-[500] cursor-pointer pb-[5px] transition-all duration-300 "
            onClick={() => setActiveButton(3)}
          >
            {t("Artificialintelligencechatbot")}
          </button>
          <span
            className="absolute bottom-0 h-[2px] bg-black transition-all duration-300"
            style={{
              left: underlineStyle.left,
              width: underlineStyle.width,
            }}
          />
        </div>

        <div className="mb-[2rem] mt-[18px] px-20 md:px-40 lg:px-0">
          <ReadMoreText text={selectedData.text} />
        </div>

        <MoreButton
          text={t("More")}
          width={263}
          height={46}
          className="mx-auto lg:mx-0 my-[15px] md:my-0"
          href={activeButton == 1 ? "https://marjan.ariisco.com" : "/"}
        />
      </div>

      {selectedData?.image && selectedData.image.trim() !== "" && (
        <div className="hidden lg:block relative aspect-[4/3] w-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${selectedData.image}`}
            alt="Background Image"
            className="max-h-[409px] object-cover w-full"
            fill
          />
        </div>
      )}
    </div>
  );
}
