import React from "react";
import { products } from "@/app/dataAllProducts";

import SavedList from "@/app/components/SavedList/SavedList";

export default async function page() {
  return (
    <div className="wrapper">
      <h1 className="sr-only">علاقه مندی ها</h1>
      <main className="px-20 md:px-40 lg:px-80 pt-[150px] lg:pt-[120px]">
        <SavedList products={products} />
      </main>
    </div>
  );
}
