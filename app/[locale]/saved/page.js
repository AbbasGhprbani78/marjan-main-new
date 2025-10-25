import React from "react";

import SavedList from "@/components/SavedList/SavedList";
import { fetchAllSaveProducts } from "@/services/allSaveProducts";

import translations from "@/components/module/translations";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const dict = translations[locale] || translations["en"];
  const pageKey = "Favorites";

  return {
    title: `${dict.websiteName} | ${dict[pageKey] || "Favorites"}`,
  };
}
export default async function page({ params }) {
  const { locale } = await params;
  const productsSaved = await fetchAllSaveProducts(locale);

  return (
    <div className="wrapper">
      <h1 className="sr-only">علاقه مندی ها</h1>
      <main className="px-20 md:px-40 lg:px-80 pt-[150px] lg:pt-[120px]">
        <SavedList products={productsSaved} />
      </main>
    </div>
  );
}
