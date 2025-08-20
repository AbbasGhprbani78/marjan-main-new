import Image from "next/image";
import React from "react";
import Form from "@/app/components/NewsLetter/Form";
import fa from "@/i18n/fa.json";
import en from "@/i18n/en.json";

export const metadata = {
  title: "عضویت در خبرنامه | وب‌سایت ما",
  description:
    "با عضویت در خبرنامه ما از جدیدترین اخبار، مقالات و تخفیف‌ها مطلع شوید.",
  keywords: [
    "خبرنامه",
    "عضویت در خبرنامه",
    "ایمیل مارکتینگ",
    "تخفیف ویژه",
    "مقالات جدید",
    "به‌روز رسانی‌ها",
  ],
  authors: [{ name: "وب‌سایت ما", url: "https://example.com" }],
  openGraph: {
    title: "عضویت در خبرنامه | وب‌سایت ما",
    description:
      "با عضویت در خبرنامه ما از جدیدترین اخبار، مقالات و تخفیف‌ها مطلع شوید.",
    url: "https://example.com/newsletter",
    siteName: "وب‌سایت ما",
    images: [
      {
        url: "/images/12.png",
        width: 800,
        height: 600,
        alt: "خبرنامه",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "عضویت در خبرنامه",
    description:
      "جدیدترین اخبار، مقالات و تخفیف‌ها را از طریق ایمیل دریافت کنید.",
    images: ["/images/12.png"],
  },
  alternates: {
    canonical: "https://example.com/newsletter",
  },
};

export default async function page({ params }) {
  const { locale } = await params;
  const t = locale === "fa" ? fa : en;
  return (
    <main className="wrapper ">
      <h1 className="sr-only">newsLetter</h1>
      <section
        className={`relative flex justify-center items-center w-full wrapper_image  aspect-[3/2] max-h-[550px] mt-[130px] lg:mt-0`}
      >
        <Image
          src="/images/12.png"
          alt="image header news letter"
          fill
          className="object-fill md:object-cover z-0 aspect-[4/3]"
          style={{ maxHeight: "550px", width: "100%" }}
        />

        <div
          className="absolute inset-0 bg-[rgba(80,80,80,0.5)] z-10"
          style={{ maxHeight: "550px", width: "100%" }}
        ></div>

        <div className="flex flex-col justify-center items-center text-white gap-[1rem] z-10 ">
          <h2 className="font-medium text-[1.7rem] md:text-[2rem]">
            {t.Subscribenewsletter}
          </h2>
          <p className="w-3/4 md:w-full text-[.9rem] md:text-[1rem] font-normal text-center">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است.
          </p>
        </div>
      </section>

      <section className="px-20 md:px-40 lg:px-80 py-20  mb-20 lg:mb-0  lg:py-40 w-full  md:w-8/12">
        <Form />
      </section>
    </main>
  );
}
