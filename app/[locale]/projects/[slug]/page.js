import React from "react";
import Image from "next/image";
import ReadMoreText from "@/components/Projects/ReadMoreText";
import Gallery from "@/components/Projects/Gallery";
import Products from "@/components/Projects/Products";
import { fetchSingleProjects } from "@/services/singleproject";
import { fetchTranslateWords } from "@/services/translate";
import { buildDictionary } from "@/utils/buildDictionary";

export const metadata = {
  title: "Project",
};

export default async function page({ params }) {
  const { locale } = await params;
  const { slug } = await params;
  const singleData = await fetchSingleProjects(locale, slug);
  const dictArray = await fetchTranslateWords(locale);
  const dict = buildDictionary(dictArray);
  console.log(singleData?.descriptions);

  return (
    <main className="wrapper text-[var(--color-gray-900)] ">
      <h1 className="sr-only"> project name</h1>
      <section className="w-full relative aspect-[3/2] max-h-[550px] wrapper_image flex items-center justify-center mt-[130px] lg:mt-0">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${singleData?.default_image}`}
          fill
          alt="image project"
          className="object-cover"
          style={{ maxHeight: "550px", width: "100%" }}
        />
        <div
          className="absolute inset-0 bg-black/50 z-10"
          style={{ maxHeight: "550px", width: "100%" }}
        />
        {singleData?.name && (
          <p
            className={`w-max text-white font-normal text-[1.5rem] md:text-[2rem] z-10 ${
              ["fa", "ar"].includes(locale) ? "font-fa" : "font-en"
            }`}
          >
            {singleData?.name}
          </p>
        )}
      </section>
      <section className="mt-[3rem] px-20 md:px-40 lg:px-80">
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
