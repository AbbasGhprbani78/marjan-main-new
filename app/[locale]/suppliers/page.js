import Suppliers from "@/components/templates/Suppliers";
import React from "react";
import translations from "@/components/module/translations";
import { fetchCountries, fetchTypesOfService } from "@/services/suppliers";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const dict = translations[locale] || translations["en"];
  const pageKey = "Suppliers";

  return {
    title: `${dict.websiteName} | ${dict[pageKey] || "Suppliers"}`,
  };
}
export default async function page({ params }) {
  const { locale } = await params;
  const suppliersData = await fetchCountries(locale);
  const typesOfService = await fetchTypesOfService(locale);
  return (
    <div className="wrapper">
      <h1 className="sr-only">Suppliers</h1>
      <Suppliers
        suppliersData={suppliersData}
        typesOfService={typesOfService}
      />
    </div>
  );
}
