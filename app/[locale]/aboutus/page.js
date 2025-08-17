import Image from "next/image";
import React from "react";
import AboutDetail from "@/app/components/About/AboutDetail";
import AwardSlider from "@/app/components/About/AwardSlider";
import AboutHistory from "@/app/components/About/AboutHistory";
import AboutEnvironment from "@/app/components/About/AboutEnvironment";
import { data } from "@/app/dataAboutus";
import BusinessPartners from "@/app/components/About/BusinessPartners";
import ReadMoreText from "@/app/components/module/ReadMoreText";

export const metadata = {
  title: "درباره ما | شرکت ما",
  description:
    "با بیش از 10 سال سابقه در صنعت، بیش از 100 پرسنل و صادرات به بیش از 10 کشور. با داستان ما، شرکای تجاری و دستاوردهای شرکت آشنا شوید.",
  keywords: [
    "درباره ما",
    "شرکت ما",
    "تاریخچه شرکت",
    "شرکای تجاری",
    "جوایز",
    "صادرات",
    "پرسنل",
    "محیط زیست",
  ],
  openGraph: {
    title: "درباره ما | شرکت ما",
    description:
      "با ما بیشتر آشنا شوید؛ تجربه، افتخارات، شرکای جهانی و مسئولیت‌های محیط‌زیستی ما",
    url: "https://yourdomain.com/aboutus",
    siteName: "شرکت ما",
    images: [
      {
        url: data?.imageHeader || "/default-og.jpg",
        width: 1200,
        height: 630,
        alt: "تصویر درباره ما",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  alternates: {
    canonical: "https://yourdomain.com/aboutus",
  },
};

// import fa from "@/app/i18n/fa";
// import en from "@/app/i18n/en";
// export async function generateStaticParams() {
//   return [{ locale: "fa" }, { locale: "en" }];
// }

// const dict = params.locale === "fa" ? fa : en;

export default async function page({ params }) {
  return (
    <main className="wrapper w-full">
      <h1 className="sr-only">درباه ما</h1>
      <section className="w-full relative wrapper_image">
        <Image
          src={data?.imageHeader}
          fill
          alt="about us-picture"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 z-10" />
      </section>
      <section className=" mt-[40px] px-20 md:px-40 lg:px-80 mb-[4rem] md:mb-[7rem] ">
        <h2 className="title text-[var(--color-gray-900)] font-[500] mb-[18px]">
          داستان ما
        </h2>
        <ReadMoreText
          text={data.aboutText}
          fontSize="text-[1rem]"
          fontweight="font-medium"
        />
      </section>
      <section className=" mb-[4rem] md:mb-0">
        <AboutDetail aboutDetail={data.aboutDetail} />
      </section>
      <section className=" mb-[4rem] md:mb-[5rem] md:px-40 lg:px-80">
        <AboutEnvironment environment={data.environment} />
      </section>
      <section className=" mb-[5rem] md:mb-[8rem]">
        <AboutHistory history={data.history} />
      </section>
      <section className=" mb-[5rem] md:mb-[7rem]">
        <BusinessPartners brands={data.brands} />
      </section>
      <section className=" pb-[20px]">
        <AwardSlider sliderItems={data.slider} />
      </section>
    </main>
  );
}
