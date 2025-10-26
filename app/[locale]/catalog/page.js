import React from "react";
import Catalog from "@/components/templates/Catalog";
import { fetchCatalogs } from "@/services/catalogs";
import translations from "@/components/module/translations";

export const revalidate = 300;
export const dynamicParams = true;
export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const dict = translations[locale] || translations["en"];
  const pageKey = "Catalog";

  return {
    title: `${dict.websiteName} | ${dict[pageKey] || "Catalog"}`,
  };
}
export default async function page({ params }) {
  const { locale } = await params;
  const dataCatalogs = await fetchCatalogs(locale);

  return (
    <main className="wrapper ">
      <section className="px-20 md:px-40 lg:px-80 pt-[150px] lg:pt-[200px]">
        <Catalog
          catalogs={dataCatalogs?.catalogs}
          categories={dataCatalogs?.categories}
        />
      </section>
    </main>
  );
}
