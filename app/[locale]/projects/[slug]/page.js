import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReadMoreText from "@/components/Projects/ReadMoreText";
import Gallery from "@/components/Projects/Gallery";
import Products from "@/components/Projects/Products";
import { fetchSingleProjects } from "@/services/singleproject";
import { fetchTranslateWords } from "@/services/translate";
import { buildDictionary } from "@/utils/buildDictionary";
import translations from "@/components/module/translations";

export const revalidate = 300;
export const dynamicParams = true;
export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const dict = translations[locale] || translations["en"];
  const pageKey = "Project";

  return {
    title: `${dict.websiteName} | ${dict[pageKey] || "Project"}`,
  };
}
export default async function page({ params }) {
  const { locale } = await params;
  const { slug } = await params;
  const singleData = await fetchSingleProjects(locale, slug);

  // If API returns 404 (null), redirect to NotFound page
  if (!singleData) {
    notFound();
  }

  const dictArray = await fetchTranslateWords(locale);
  const dict = buildDictionary(dictArray);

  console.log(singleData.category);

  return (
    <main className="wrapper text-[var(--color-gray-900)] ">
      <h1 className="sr-only"> project name</h1>
      <div className="min-h-screen hidden lg:flex flex-col">
        <section className="relative w-full flex-grow flex items-center justify-center mt-[130px] lg:mt-0  ">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${singleData?.default_image}`}
            fill
            alt="image project"
            className="object-cover"
            style={{ width: "100%" }}
            unoptimized={true}
            priority={true}
            quality={100}
          />
        </section>
        <div className="flex flex-col gap-[1rem] px-20 md:px-40 lg:px-80 mt-[2.5rem] bg-white">
          {singleData?.name && (
            <p className="font-medium text-[1.1rem]">{singleData?.name}</p>
          )}

          {singleData?.location && (
            <p className="font-medium text-[1.1rem]">
              <span>{dict["City"]}: </span>
              {singleData?.location}
            </p>
          )}

          {singleData?.env && (
            <p className="font-medium text-[1.1rem]">
              <span>{dict["Usage"]}: </span>
              {singleData?.env}
            </p>
          )}

          {singleData?.products?.length > 0 && (
            <p className="font-medium text-[1.1rem]">
              <span>{dict["Products"]}: </span>
              {singleData?.products?.map((p) => p?.title).join(" / ")}
            </p>
          )}
        </div>
      </div>
      <div className="px-20 md:px-40 lg:px-80 hidden lg:block">
        {singleData?.descriptions && (
          <ReadMoreText text={singleData?.descriptions} />
        )}
      </div>
      <section className="w-full relative aspect-[3/2] max-h-[550px] wrapper_image flex items-center justify-center mt-[130px] lg:mt-0 lg:hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${singleData?.default_image}`}
          fill
          alt="image project"
          className="object-cover"
          style={{ maxHeight: "550px", width: "100%" }}
          unoptimized={true}
          quality={100}
        />
      </section>
      <section className="mt-[3rem] px-20 md:px-40 lg:px-80 lg:hidden">
        <div className="flex flex-col gap-[1rem]">
          {singleData?.name && (
            <p className="font-medium text-[1.1rem]"> {singleData?.name}</p>
          )}
          {singleData?.location && (
            <p className="font-medium text-[1.1rem]">
              <span>{dict["City"]}: </span>
              {singleData?.location}
            </p>
          )}

          {singleData?.env && (
            <p className="font-medium text-[1.1rem]">
              <span>{dict["Usage"]} : </span>
              {singleData?.env}
            </p>
          )}

          {singleData?.products.length > 0 && (
            <p className="font-medium text-[1.1rem]">
              <span>{dict["Products"]} : </span>
              {singleData?.products
                ?.map((product) => product?.title)
                .join(" / ")}
            </p>
          )}
        </div>
        {singleData?.descriptions && (
          <ReadMoreText text={singleData?.descriptions} />
        )}
      </section>
      {singleData?.images.length > 0 && (
        <section className="mt-[2rem] px-20 md:px-40 lg:px-80">
          <Gallery gallery={singleData?.images} />
        </section>
      )}

      {singleData?.products?.length > 0 && (
        <section className="mt-[2rem] px-20 md:px-40 lg:px-80 mb-[1.5rem]">
          <Products products={singleData?.products} />
        </section>
      )}
    </main>
  );
}

{
  /* {singleData?.name && (
          <p
            className={`w-max text-white font-normal text-[1.5rem] md:text-[2rem] z-10 ${
              ["fa", "ar"].includes(locale) ? "font-fa" : "font-en"
            }`}
          >
            {singleData?.name}
          </p>
        )} */
}

{
  /* {singleData?.name && (
            <p
              className={`w-max text-white font-normal text-[1.5rem] md:text-[2rem] z-10 ${
                ["fa", "ar"].includes(locale) ? "font-fa" : "font-en"
              }`}
            >
              {singleData?.name}
            </p>
          )} */
}
