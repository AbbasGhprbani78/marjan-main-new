import React from "react";
import { HomeSlider } from "@/components/slider";
import Blogs from "@/components/templates/Blogs";
import { fetchBlogs } from "@/services/blogs";
import translations from "@/components/module/translations";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const dict = translations[locale] || translations["en"];
  const pageKey = "Blogs";

  return {
    title: `${dict.websiteName} | ${dict[pageKey] || "Blogs"}`,
  };
}
export default async function page({ params }) {
  const { locale } = await params;
  const blogsData = await fetchBlogs(locale);

  return (
    <main className="wrapper ">
      <h1 className="sr-only">وبلاگ</h1>
      <section>
        <HomeSlider data={blogsData?.slides} route={"/blogs"} type={2} />
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
