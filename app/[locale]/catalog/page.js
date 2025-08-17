import React from "react";
import Catalog from "@/app/components/templates/Catalog";
import { catalogs, categories } from "@/app/dataCatalog";

export const metadata = {
  title: "کاتالوگ محصولات | برند شما",
  description:
    "مشاهده جدیدترین کاتالوگ‌های محصولات برند شما. انتخابی متنوع بر اساس سبک، رنگ، سایز و کاربردهای مختلف.",
  keywords: [
    "کاتالوگ محصولات",
    "کاتالوگ برند",
    "محصولات جدید",
    "کاتالوگ PDF",
    "دانلود کاتالوگ",
    "کاتالوگ صنعتی",
  ],
  openGraph: {
    title: "کاتالوگ محصولات | برند شما",
    description:
      "با مشاهده کاتالوگ محصولات برند ما، انتخابی مناسب برای نیازهای شما انجام دهید. دسته‌بندی‌های مختلف با طراحی حرفه‌ای.",
    url: "https://yourdomain.com/catalog",
    type: "website",
    locale: "fa_IR",
    siteName: "برند شما",
    images: [
      {
        url: "/images/43.png",
        width: 1200,
        height: 630,
        alt: "تصویر کاتالوگ محصولات برند شما",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "کاتالوگ محصولات | برند شما",
    description: "مرور کامل کاتالوگ‌های متنوع ما برای انتخاب بهترین محصول.",
    images: ["/images/43.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function page() {
  return (
    <main className="wrapper ">
      <section className="px-20 md:px-40 lg:px-80 pt-[150px] lg:pt-[200px]">
        <Catalog catalogs={catalogs} categories={categories} />
      </section>
    </main>
  );
}
