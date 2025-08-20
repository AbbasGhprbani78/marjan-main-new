import React from "react";
import Image from "next/image";
import { data } from "@/app/dataPorjectDetail";
import ReadMoreText from "@/app/components/Projects/ReadMoreText";
import Gallery from "@/app/components/Projects/Gallery";
import Products from "@/app/components/Projects/Products";
import fa from "@/i18n/fa.json";
import en from "@/i18n/en.json";
import { fetchSingleProjects } from "@/services/singleproject";

export const metadata = {
  title: "پروژه‌ها | شرکت شما",
  description:
    "مجموعه‌ای از پروژه‌های شاخص طراحی و توسعه‌ی ما، شامل نمونه‌کارهای وب‌سایت، اپلیکیشن و راهکارهای نرم‌افزاری اختصاصی.",
  keywords:
    "پروژه‌ها, نمونه‌کارها, طراحی سایت, توسعه نرم‌افزار, اپلیکیشن, React, Next.js, شرکت طراحی",
  openGraph: {
    title: "پروژه‌های ما | شرکت شما",
    description:
      "نگاهی به پروژه‌های موفق انجام‌شده توسط تیم حرفه‌ای ما در زمینه طراحی و توسعه وب و نرم‌افزار.",
    url: "https://yourdomain.com/projects",
    siteName: "شرکت شما",
    type: "website",
    images: [
      {
        url: "/images/24.png",
        width: 1200,
        height: 630,
        alt: "نمونه پروژه‌های شرکت شما",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "پروژه‌ها | شرکت شما",
    description:
      "برخی از پروژه‌های حرفه‌ای که توسط تیم ما طراحی و پیاده‌سازی شده‌اند.",
    images: ["/images/24.png"],
  },
  alternates: {
    canonical: "https://yourdomain.com/projects",
  },
};

export default async function page({ params }) {
  const { locale } = await params;
  const t = locale === "fa" ? fa : en;
  const { id } = await params;
  const singleData = await fetchSingleProjects(locale, id);

  return (
    <main className="wrapper text-[var(--color-gray-900)] ">
      <h1 className="sr-only"> project name</h1>
      <section className="w-full relative aspect-[3/2] max-h-[550px] wrapper_image flex items-center justify-center mt-[130px] lg:mt-0">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${singleData?.default_image}`}
          fill
          alt="image project"
          className="object-cover"
          style={{ maxHeight: "550px", width: "100%" }}
        />
        <div
          className="absolute inset-0 bg-black/50 z-10"
          style={{ maxHeight: "550px", width: "100%" }}
        />
        {singleData?.name && (
          <p className="w-max font-fa text-white font-normal  text-[1.5rem] md:text-[2rem]  z-10">
            {singleData?.name}
          </p>
        )}
      </section>
      <section className="mt-[3rem] px-20 md:px-40 lg:px-80">
        <div className="flex flex-col gap-[1rem]">
          {singleData?.name && (
            <p className="font-medium text-[1.1rem]"> {singleData?.name}</p>
          )}
          {singleData?.location && (
            <p className="font-medium text-[1.1rem]">
              <span>{t.City}: </span>
              {singleData?.location}
            </p>
          )}

          {singleData?.env && (
            <p className="font-medium text-[1.1rem]">
              <span>{t.Usage} : </span>
              {singleData?.env}
            </p>
          )}

          {singleData?.products.length > 0 && (
            <p className="font-medium text-[1.1rem]">
              <span>{t.Products} : </span>
              {singleData?.products
                ?.map((product) => product?.title)
                .join(" / ")}
            </p>
          )}
        </div>
        {singleData?.descriptions && (
          <ReadMoreText text={singleData?.descriptions} />
        )}
      </section>
      {singleData?.images.length > 0 && (
        <section className="mt-[2rem] px-20 md:px-40 lg:px-80">
          <Gallery gallery={singleData?.images} />
        </section>
      )}

      {singleData?.products?.length > 0 && (
        <section className="mt-[2rem] px-20 md:px-40 lg:px-80 mb-[1.5rem]">
          <Products products={singleData?.products} />
        </section>
      )}
    </main>
  );
}
