import React from "react";
import { HomeSlider } from "@/components/slider";
import Projects from "@/components/templates/Projects";
import { fetchAllProjects } from "@/services/allProjects";

import translations from "@/components/module/translations";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const dict = translations[locale] || translations["en"];
  const pageKey = "Projects";

  return {
    title: `${dict.websiteName} | ${dict[pageKey] || "Projects"}`,
  };
}

export default async function page({ params }) {
  const { locale } = await params;
  const dataProjects = await fetchAllProjects(locale);

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
