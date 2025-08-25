import GallerySingleBlog from "@/app/components/Blogs/GallerySingleBlog";
import ReadMoreText from "@/app/components/module/ReadMoreText";
import { fetchSingleBlog } from "@/services/singleBlog";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "مقاله",
  description: "مقاله",
  keywords: [
    "آموزش React",
    "پروژه واقعی",
    "ReactJS",
    "جاوااسکریپت",
    "برنامه‌نویسی فرانت‌اند",
    "Next.js",
  ],
  alternates: {
    canonical: "https://yourdomain.com/blogs/my-post",
  },
  openGraph: {
    title: "مقاله",
    description: "مقاله",
    url: "https://yourdomain.com/blogs/my-post",
    siteName: "YourSiteName",
    type: "article",
    locale: "fa_IR",
    publishedTime: "2025-06-27",
    images: [
      {
        url: "/images/38.png",
        width: 1200,
        height: 630,
        alt: "مقاله",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "آموزش React در پروژه واقعی",
    description:
      "مقاله‌ای برای یادگیری React در دنیای واقعی با مثال‌های کاربردی.",
    images: ["/images/38.png"],
  },
};

export default async function page({ params }) {
  const { locale } = await params;
  const { id } = await params;
  const singleBlog = await fetchSingleBlog(locale, id);

  return (
    <main className="wrapper ">
      <h1 className="sr-only">وبلاگ</h1>
      <article>
        <section className="w-full relative wrapper_image flex items-center justify-center mt-[130px] lg:mt-0 ">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${singleBlog?.image}`}
            fill
            alt="image project"
            className=""
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <p
            className={`w-max text-white font-normal text-[1.2rem] md:text-[2rem] z-5 ${
              locale === "fa" ? "font-fa" : "font-en"
            }`}
          >
            {singleBlog?.title}
          </p>
        </section>
        <section className="mt-[2rem] px-20 md:px-40 lg:px-80 text-[var(--color-gray-900)] font-normal text-justify pb-[2rem]">
          {singleBlog.text && (
            <div className="leading-[30px] ">
              <ReadMoreText text={singleBlog?.text} />
            </div>
          )}

          {singleBlog?.media_files.length > 0 && (
            <div className="mt-[1rem] lg:mt-[2rem] w-full">
              <GallerySingleBlog
                media={singleBlog?.media_files?.map((media) => media.url)}
              />
            </div>
          )}

          {singleBlog?.text_two && (
            <div className="leading-[30px]  mt-[1rem]  lg:mt-[2rem] ">
              <ReadMoreText text={singleBlog?.text_two} />
            </div>
          )}

          {singleBlog?.media && (
            <div className="relative w-full aspect-[3/2] md:aspect-auto md:w-2/3 md:mx-auto lg:h-[331px] mt-[1rem] lg:mt-[2rem]">
              {/\.(mp4|webm|ogg|mkv)$/i.test(singleBlog.media) ? (
                <video
                  src={`${process.env.NEXT_PUBLIC_API_URL}${singleBlog.media}`}
                  controls
                  className="object-cover w-full h-full "
                />
              ) : (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${singleBlog.media}`}
                  fill
                  alt="blog media"
                  className="object-cover "
                />
              )}
            </div>
          )}
        </section>
      </article>
    </main>
  );
}
