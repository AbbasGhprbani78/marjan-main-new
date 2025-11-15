import React from "react";
import { HomeSlider } from "@/components/slider";
import Categories from "@/components/Industrial/Categories";
import Project from "@/components/Industrial/Project";
import Blogs from "@/components/Industrial/Blogs";
import QuestionUs from "@/components/Industrial/QuestionUs";
import Standards from "@/components/Industrial/Standards";
import Customers from "@/components/Industrial/Customers";
import AboutUs from "@/components/Industrial/AboutUs";
import { fetchIndustrial } from "@/services/industrial";
import translations from "@/components/module/translations";

export const revalidate = 300;
export const dynamicParams = true;
export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const dict = translations[locale] || translations["en"];
  const pageKey = "Industrial";

  return {
    title: `${dict.websiteName} | ${dict[pageKey] || "Industrial"}`,
  };
}

export default async function page({ params }) {
  const { locale } = await params;
  const dataindustrial = await fetchIndustrial(locale);

  return (
    <main className="wrapper ">
      <h1 className="sr-only">صنعتی</h1>
      <section className="">
        <HomeSlider
          data={dataindustrial?.slidesHeader}
          route={"/products"}
          type={1}
        />
      </section>
      <section className="px-20 md:px-40 lg:px-80 mt-[2.5rem] ">
        <Categories data={dataindustrial?.categories} />
      </section>
      <section className=" mt-[.5rem] ">
        <Project data={dataindustrial?.slideProject} />
      </section>
      <section className=" mt-[1rem] ">
        <Blogs data={dataindustrial?.blogs} />
      </section>
      <section className="mt-[1.5rem]">
        <QuestionUs data={dataindustrial?.questionus} />
      </section>
      <section className=" px-20 md:px-40 lg:px-80  mt-[2rem] md:mt-[3.5rem]">
        <Standards data={dataindustrial.Standards} />
      </section>
      <section className=" px-20 md:px-40 lg:px-80 mt-[5rem]">
        <Customers data={dataindustrial.customers} />
      </section>
      <section className="mt-[3.5rem]">
        <AboutUs data={dataindustrial?.aboutus} />
      </section>
    </main>
  );
}
