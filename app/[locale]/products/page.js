import React from "react";
import AllProducts from "@/components/templates/AllProducts";
import { fetchAllProducts } from "@/services/allProducts";
import translations from "@/components/module/translations";

export const revalidate = 300;
export const dynamicParams = true;
export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const dict = translations[locale] || translations["en"];
  const pageKey = "Products";

  return {
    title: `${dict.websiteName} | ${dict[pageKey] || "Products"}`,
  };
}

export default async function page({ params }) {
  const { locale } = await params;
  const dataProducts = await fetchAllProducts(locale);

  const cleanedCategories = {
    environment: dataProducts.categories.environment || [],
    industrie: dataProducts.categories.industrie || [],
    style: dataProducts.categories.style || [],
    color: dataProducts.categories.color || [],
    Size: dataProducts.categories.size || [],
    Surface: dataProducts.categories.surface || [],
    Thickness: (dataProducts.categories.thicknesses || [])
      .map(String)
      .map((t) => `${t}mm`),
  };

  console.log(dataProducts?.products);
  return (
    <div className="wrapper">
      <h1 className="sr-only">همه محصولات</h1>
      <AllProducts
        categories={cleanedCategories}
        products={dataProducts?.products}
      />
    </div>
  );
}
