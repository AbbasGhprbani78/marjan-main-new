import Representationrequest from "@/components/templates/Representationrequest";
import React from "react";
import translations from "@/components/module/translations";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const dict = translations[locale] || translations["en"];
  const pageKey = "Representation request";

  return {
    title: `${dict.websiteName} | ${dict[pageKey] || "Representation request"}`,
  };
}
export default async function page() {
  return (
    <div className="wrapper">
      <h1 className="sr-only">Representation request</h1>
      <Representationrequest />
    </div>
  );
}
