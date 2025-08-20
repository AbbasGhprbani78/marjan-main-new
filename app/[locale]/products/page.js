import React from "react";
import AllProducts from "@/app/components/templates/AllProducts";
import { fetchAllProducts } from "@/services/allProducts";

export const metadata = () => {
  return {
    title: "همه محصولات - نام فروشگاه شما",
    description:
      "خرید انواع محصولات با بهترین قیمت و کیفیت در فروشگاه ما. فیلتر و جستجوی آسان برای یافتن محصول موردنظر.",
    keywords: ["محصولات", "خرید آنلاین", "فروشگاه", "قیمت مناسب", "کیفیت بالا"],
    openGraph: {
      title: "همه محصولات - نام فروشگاه شما",
      description: "محصولات متنوع با قیمت مناسب در فروشگاه ما.",
      url: "https://your-site.com/products",
      siteName: "نام فروشگاه شما",
      images: [
        {
          url: "/images/1.png",
          width: 800,
          height: 600,
          alt: "همه محصولات",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "همه محصولات - نام فروشگاه شما",
      description: "محصولات متنوع با قیمت مناسب در فروشگاه ما.",
      images: ["/images/1.png"],
    },
    metadataBase: new URL("https://your-site.com"),
    alternates: {
      canonical: "/products",
    },
  };
};

export default async function page({ params }) {
  const { locale } = await params;
  const dataProducts = await fetchAllProducts(locale);

  console.log(dataProducts);

  const cleanedCategories = {
    environment: dataProducts.categories.environment || [],
    style: dataProducts.categories.style || [],
    color: dataProducts.categories.color || [],
    size: dataProducts.categories.size || [],
    industrie: dataProducts.categories.industrie || [],
    thicknesses: (dataProducts.categories.thicknesses || [])
      .map(String)
      .map((t) => `${t} mm`),
  };

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
