import React from "react";
import { HomeSlider } from "@/components/slider";
import Projects from "@/components/templates/Projects";
import { fetchAllProjects } from "@/services/allProjects";

export const metadata = {
  title: "Projects",
};

export default async function page({ params }) {
  const { locale } = await params;
  const dataProjects = await fetchAllProjects(locale);

  console.log(dataProjects);

  return (
    <div className="wrapper">
      <h1 className="sr-only">پروژه ها</h1>
      <section>
        <HomeSlider
          data={dataProjects?.projects?.slides}
          route={"/projects"}
          type={2}
        />
      </section>
      <Projects
        data={dataProjects?.projects}
        categories={dataProjects?.categories}
      />
    </div>
  );
}
