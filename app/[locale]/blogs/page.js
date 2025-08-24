import React from "react";
import { HomeSlider } from "@/app/components/slider";
import Blogs from "@/app/components/templates/Blogs";
import { fetchBlogs } from "@/services/blogs";

export const metadata = {
  title: "بلاگ - مقالات آموزشی، معرفی تکنولوژی و نکات فنی",
  description:
    "جدیدترین مقالات در حوزه برنامه‌نویسی، طراحی وب، تکنولوژی‌های نوین و نکات آموزشی برای توسعه‌دهندگان.",
  keywords: ["بلاگ", "صنعتی", "کاشی سرامیک", "تخصص", "محصولات"],
  alternates: {
    canonical: "https://yourdomain.com/blogs",
  },
  openGraph: {
    title: "بلاگ - جدیدترین مطالب آموزشی و تکنولوژی",
    description:
      "مطالب آموزشی، بررسی ابزارهای جدید و نکات فنی برای توسعه‌دهندگان وب.",
    url: "https://yourdomain.com/blogs",
    siteName: "YourSiteName",
    type: "website",
    locale: "fa_IR",
    images: [
      {
        url: "/images/38.png",
        width: 1200,
        height: 630,
        alt: "کاور بلاگ سایت",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "بلاگ آموزشی برنامه‌نویسی و تکنولوژی",
    description: "مطالب مفید در حوزه توسعه وب و تکنولوژی‌های روز.",
    images: ["/images/38.png"],
  },
};
export default async function page({ params }) {
  const { locale } = await params;
  const blogsData = await fetchBlogs(locale);

  console.log(blogsData);

  return (
    <main className="wrapper ">
      <h1 className="sr-only">وبلاگ</h1>
      <section>
        <HomeSlider data={blogsData?.slides} route={"/blogs"} />
      </section>
      <section className="mt-[2.5rem] px-20 md:px-40 lg:px-80 text-[var(--color-gray-900)]">
        <Blogs
          blogs={blogsData.blogs}
          categories={blogsData.categories}
          filters={blogsData.filters}
        />
      </section>
    </main>
  );
}
