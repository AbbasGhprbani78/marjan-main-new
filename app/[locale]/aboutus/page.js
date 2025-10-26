import Image from "next/image";
import React from "react";
import AboutDetail from "@/components/About/AboutDetail";
import AwardSlider from "@/components/About/AwardSlider";
import AboutHistory from "@/components/About/AboutHistory";
import BusinessPartners from "@/components/About/BusinessPartners";
import ReadMoreText from "@/components/module/ReadMoreText";
import { fetchAboutUs } from "@/services/aboutus";
import translations from "@/components/module/translations";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const dict = translations[locale] || translations["en"];
  const pageKey = "About Us";

  return {
    title: `${dict.websiteName} | ${dict[pageKey] || "About Us"}`,
  };
}
export default async function page({ params }) {
  const { locale } = params;
  const dataAboutus = await fetchAboutUs(locale);

  return (
    <main className="wrapper w-full">
      <h1 className="sr-only">درباه ما</h1>
      <section className="w-full relative mt-[130px] lg:mt-0 aspect-[3/2] max-h-[550px]">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${dataAboutus?.imageHeader}`}
          fill
          alt="about us-picture"
          className="object-cover"
          style={{ maxHeight: "550px", width: "100%" }}
        />
        <div className="absolute inset-0 bg-black/30 z-10" />
      </section>
      <section className=" mt-[40px] px-20 md:px-40 lg:px-80 mb-[4rem] md:mb-[7rem] ">
        <h2 className="title text-[var(--color-gray-900)] font-[500] mb-[18px]">
          {dataAboutus?.aboutDetail[0]?.title}
        </h2>
        <ReadMoreText
          text={dataAboutus?.aboutDetail[0]?.text}
          fontSize="text-[1rem]"
          fontweight="font-medium"
        />
      </section>
      <section className="mb-[4rem] md:mb-[5rem]">
        <AboutDetail
          aboutDetail={[
            {
              title: dataAboutus?.aboutDetail[0]?.title_one,
              text: dataAboutus?.aboutDetail[0]?.text_one,
              image: dataAboutus?.aboutDetail[0]?.image_one,
            },
            {
              title: dataAboutus?.aboutDetail[0]?.title_two,
              text: dataAboutus?.aboutDetail[0]?.text_two,
              image: dataAboutus?.aboutDetail[0]?.image_two,
            },
            {
              title: dataAboutus?.aboutDetail[0]?.title_three,
              text: dataAboutus?.aboutDetail[0]?.text_three,
              image: dataAboutus?.aboutDetail[0]?.image_three,
            },
            {
              title: dataAboutus?.aboutDetail[0]?.title_four,
              text: dataAboutus?.aboutDetail[0]?.text_four,
              image: dataAboutus?.aboutDetail[0]?.image_four,
            },
          ]}
        />
      </section>
      <section className=" mb-[5rem] md:mb-[8rem] px-20 md:px-40 lg:px-80">
        <AboutHistory history={dataAboutus?.history} />
      </section>
      <section className=" mb-[5rem] md:mb-[7rem]">
        <BusinessPartners brands={dataAboutus?.brands} />
      </section>
      <section className=" pb-[20px]">
        <AwardSlider sliderItems={dataAboutus.slider} />
      </section>
    </main>
  );
}
