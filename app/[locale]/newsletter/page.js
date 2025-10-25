import Image from "next/image";
import React from "react";
import Form from "@/components/NewsLetter/Form";
import { fetchTypeofActivity } from "@/services/newsLetter";
import { fetchTranslateWords } from "@/services/translate";
import { buildDictionary } from "@/utils/buildDictionary";
import translations from "@/components/module/translations";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const dict = translations[locale] || translations["en"];
  const pageKey = "Newsletter";

  return {
    title: `${dict.websiteName} | ${dict[pageKey] || "Newsletter"}`,
  };
}

export default async function page({ params }) {
  const { locale } = await params;
  const dataTypeOfActivity = await fetchTypeofActivity(locale);
  const dictArray = await fetchTranslateWords(locale);
  const dict = buildDictionary(dictArray);

  return (
    <main className="wrapper ">
      <h1 className="sr-only">newsLetter</h1>
      <section
        className={`relative flex justify-center items-center w-full wrapper_image  aspect-[3/2] max-h-[550px] mt-[130px] lg:mt-0`}
      >
        <Image
          src="/images/12.png"
          alt="image header news letter"
          fill
          className="object-fill md:object-cover z-0 aspect-[4/3]"
          style={{ maxHeight: "550px", width: "100%" }}
        />

        <div
          className="absolute inset-0 bg-[rgba(80,80,80,0.5)] z-10"
          style={{ maxHeight: "550px", width: "100%" }}
        ></div>

        <div className="flex flex-col justify-center items-center text-white gap-[1rem] z-10 ">
          <h2 className="font-medium text-[1.7rem] md:text-[2rem]">
            {dict["Subscribenewsletter"]}
          </h2>
        </div>
      </section>

      <section className="px-20 md:px-40 lg:px-80 py-20  mb-20 lg:mb-0  lg:py-40 w-full  md:w-8/12">
        <Form dataTypeOfActivity={dataTypeOfActivity} />
      </section>
    </main>
  );
}
