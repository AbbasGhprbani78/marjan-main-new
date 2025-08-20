import Image from "next/image";
import React from "react";
import FaqItem from "@/app/components/Faq/FaqItem";
import { data } from "@/app/dataFaq";

export const metadata = {
  title: "سوالات متداول | برند شما",
  description:
    "پاسخ به پرتکرارترین سوالات کاربران درباره محصولات، خدمات، پرداخت، ارسال و سایر موارد. همه چیز را درباره برند ما بدانید.",
  keywords: [
    "سوالات متداول",
    "پرسش های پرتکرار",
    "FAQ",
    "سوال درباره خدمات",
    "مشکلات خرید",
    "پشتیبانی فنی",
  ],
  openGraph: {
    title: "سوالات متداول | برند شما",
    description:
      "اگر سوالی درباره خدمات یا محصولات ما دارید، احتمالاً پاسخ آن در این بخش وجود دارد. پاسخ کامل به رایج‌ترین سوالات کاربران.",
    url: "https://yourdomain.com/faq",
    type: "website",
    locale: "fa_IR",
    siteName: "برند شما",
    images: [
      {
        url: "/images/41.jpg",
        width: 1200,
        height: 630,
        alt: "سوالات متداول کاربران برند شما",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "سوالات متداول | برند شما",
    description:
      "مرور کامل سوالات پرتکرار کاربران درباره محصولات و خدمات برند شما.",
    images: ["/images/41.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function page() {
  return (
    <main className="wrapper ">
      <h className="sr-only">FAQ</h>
      <section
        className={`relative w-full flex justify-center items-center mt-[130px] lg:mt-0 wrapper_image aspect-[3/2] max-h-[550px] overflow-hidden`}
      >
        <Image
          src="/images/41.jpg"
          alt=""
          fill
          className="object-cover z-0"
          style={{ maxHeight: "550px", width: "100%" }}
        />

        <div
          className="absolute inset-0 bg-[rgba(80,80,80,0.5)] z-10"
          style={{ maxHeight: "550px", width: "100%" }}
        ></div>

        <div className="flex flex-col justify-center items-center text-white gap-[1rem] z-10 ">
          <h2 className="font-medium text-[1.5rem] md:text-[2rem]">
            پرسش های متداول
          </h2>
          <p className="w-3/4 md:w-full text-[.9rem] md:text-[1rem] font-normal text-center">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است.
          </p>
        </div>
      </section>
      <section className=" px-20 md:px-40 lg:px-80 mt-[2.5rem] mb-[2rem]">
        {data.map((item, i) => (
          <FaqItem key={i} item={item} />
        ))}
      </section>
    </main>
  );
}
