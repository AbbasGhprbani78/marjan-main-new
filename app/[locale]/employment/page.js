import Employment from "@/components/templates/Employment";
import {
  fetchJobs,
  fetchLanguages,
  fetchStates,
  fetchStudy,
  fetchWaysofacquaintance,
} from "@/services/employmentGet";
import React from "react";

import translations from "@/components/module/translations";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const dict = translations[locale] || translations["en"];
  const pageKey = "Employment";

  return {
    title: `${dict.websiteName} | ${dict[pageKey] || "Employment"}`,
  };
}
export default async function page({ params }) {
  const { locale } = await params;
  const statesData = await fetchStates(locale);
  const studyData = await fetchStudy(locale);
  const dataLanguages = await fetchLanguages(locale);
  const dataJobs = await fetchJobs(locale);
  const dataWaysofacquaintance = await fetchWaysofacquaintance(locale);

  return (
    <div className="wrapper">
      <Employment
        states={statesData}
        studyData={studyData}
        dataLanguages={dataLanguages}
        dataJobs={dataJobs}
        dataWaysofacquaintance={dataWaysofacquaintance}
      />
    </div>
  );
}
