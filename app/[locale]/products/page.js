import React from "react";
import AllProducts from "@/components/templates/AllProducts";
import { fetchAllProducts } from "@/services/allProducts";

export const metadata = () => {
  return {
    title: "Products",
  };
};

export default async function page({ params }) {
  const { locale } = await params;
  const dataProducts = await fetchAllProducts(locale);

  const cleanedCategories = {
    environment: dataProducts.categories.environment || [],
    industrie: dataProducts.categories.industrie || [],
    style: dataProducts.categories.style || [],
    color: dataProducts.categories.color || [],
    Size: dataProducts.categories.size || [],
    Surface: [],
    Thickness: (dataProducts.categories.thicknesses || [])
      .map(String)
      .map((t) => `${t}mm`),
  };

  console.log(dataProducts);

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
