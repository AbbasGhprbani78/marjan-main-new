import React from "react";

import SavedList from "@/components/SavedList/SavedList";
import { fetchAllSaveProducts } from "@/services/allSaveProducts";
export const metadata = {
  title: "Saves",
};
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
