import React from "react";
import { HomeSlider } from "@/app/components/slider";
import { industrial } from "@/app/dataindustrial";
import Categories from "@/app/components/Industrial/Categories";
import Project from "@/app/components/Industrial/Project";
import Blogs from "@/app/components/Industrial/Blogs";
import QuestionUs from "@/app/components/Industrial/QuestionUs";
import Standards from "@/app/components/Industrial/Standards";
import Customers from "@/app/components/Industrial/Customers";
import AboutUs from "@/app/components/Industrial/AboutUs";
import { fetchIndustrial } from "@/services/industrial";

export default async function page() {
  const dataindustrial = await fetchIndustrial();

  console.log(dataindustrial);

  return (
    <main className="wrapper ">
      <h1 className="sr-only">صنعتی</h1>
      <section className="">
        <HomeSlider data={industrial.slidesHeader} route={"/products"} />
      </section>
      <section className="px-20 md:px-40 lg:px-80 mt-[2.5rem] ">
        <Categories data={industrial.categories} />
      </section>
      <section className=" mt-[.5rem] ">
        <Project data={industrial.slideProject} />
      </section>
      <section className=" mt-[1rem] ">
        <Blogs data={industrial.blogs} />
      </section>
      <section className="mt-[1.5rem]">
        <QuestionUs data={industrial.questionus} />
      </section>
      <section className=" px-20 md:px-40 lg:px-80  mt-[2rem] md:mt-[3.5rem]">
        <Standards data={industrial.Standards} />
      </section>
      <section className=" px-20 md:px-40 lg:px-80 mt-[5rem]">
        <Customers data={industrial.customers} />
      </section>
      <section className="mt-[3.5rem]">
        <AboutUs data={industrial.aboutus} />
      </section>
    </main>
  );
}
