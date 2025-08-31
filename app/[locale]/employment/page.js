import Employment from "@/app/components/templates/Employment";
import {
  fetchJobs,
  fetchLanguages,
  fetchStates,
  fetchStudy,
  fetchWaysofacquaintance,
} from "@/services/employmentGet";
import React from "react";

export default async function page({ params }) {
  const { locale } = await params;
  const statesData = await fetchStates(locale);
  const studyData = await fetchStudy(locale);
  const dataLanguages = await fetchLanguages(locale);
  const dataJobs = await fetchJobs(locale);
  const dataWaysofacquaintance = await fetchWaysofacquaintance(locale);

  return (
    <>
      <Employment
        states={statesData}
        studyData={studyData}
        dataLanguages={dataLanguages}
        dataJobs={dataJobs}
        dataWaysofacquaintance={dataWaysofacquaintance}
      />
    </>
  );
}
