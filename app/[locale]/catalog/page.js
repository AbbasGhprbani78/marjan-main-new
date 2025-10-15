import React from "react";
import Catalog from "@/components/templates/Catalog";
import { fetchCatalogs } from "@/services/catalogs";

export const metadata = {
  title: "Catalog",
};

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
