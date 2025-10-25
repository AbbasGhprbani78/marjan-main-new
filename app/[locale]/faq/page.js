import Image from "next/image";
import React from "react";
import FaqItem from "@/components/Faq/FaqItem";
import { fetchFaq } from "@/services/faq";
import { fetchTranslateWords } from "@/services/translate";
import { buildDictionary } from "@/utils/buildDictionary";
import translations from "@/components/module/translations";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const dict = translations[locale] || translations["en"];
  const pageKey = "Faq";

  return {
    title: `${dict.websiteName} | ${dict[pageKey] || "Faq"}`,
  };
}

export default async function page({ params }) {
  const { locale } = params;

  const dataFaq = await fetchFaq(locale);
  const dictArray = await fetchTranslateWords(locale);
  const dict = buildDictionary(dictArray);

  return (
    <main className="wrapper ">
      <h1 className="sr-only">FAQ</h1>
      <section
        className={`relative w-full flex justify-center items-center mt-[130px] lg:mt-0 wrapper_image aspect-[3/2] max-h-[550px] overflow-hidden`}
      >
        <Image
          src="/images/41.jpg"
          alt=""
          fill
          className="object-cover z-0"
          style={{ maxHeight: "550px", width: "100%" }}
        />

        <div
          className="absolute inset-0 bg-[rgba(80,80,80,0.5)] z-10"
          style={{ maxHeight: "550px", width: "100%" }}
        ></div>

        <div className="flex flex-col justify-center items-center text-white gap-[1rem] z-10 ">
          <h2 className="font-medium text-[1.5rem] md:text-[2rem]">
            {dict["FAQ"]}
          </h2>
          {/* <p className="w-3/4 md:w-full text-[.9rem] md:text-[1rem] font-normal text-center">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است.
          </p> */}
        </div>
      </section>
      <section className=" px-20 md:px-40 lg:px-80 mt-[2.5rem] mb-[2rem]">
        {dataFaq.map((item, i) => (
          <FaqItem key={i} item={item} />
        ))}
      </section>
    </main>
  );
}
