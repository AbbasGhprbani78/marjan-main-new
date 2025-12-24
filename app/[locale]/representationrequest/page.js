import Representationrequest from "@/components/templates/Representationrequest";
import React from "react";
import translations from "@/components/module/translations";
import {
  fetchBirthYears,
  fetchCountries,
  fetchOwnership,
  fetchWarehouse,
  fetchWarehouseFacilities,
} from "@/services/representationrequest";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const dict = translations[locale] || translations["en"];
  const pageKey = "Representation request";

  return {
    title: `${dict.websiteName} | ${dict[pageKey] || "Representation request"}`,
  };
}

export default async function page({ params }) {
  const { locale } = await params;
  const countries = await fetchCountries(locale);
  const ownership = await fetchOwnership(locale);
  const warehouse = await fetchWarehouse(locale);
  const birthYears = await fetchBirthYears(locale);
  const warehouseFacilities = await fetchWarehouseFacilities(locale);
  return (
    <div className="wrapper">
      <h1 className="sr-only">Representation request</h1>
      <Representationrequest
        ownership={ownership}
        warehouse={warehouse}
        birthYears={birthYears}
        warehouseFacilities={warehouseFacilities}
        countries={countries}
      />
    </div>
  );
}
