import BlogVideo from "@/components/Blogs/BlogVideo";
import GallerySingleBlog from "@/components/Blogs/GallerySingleBlog";
import ReadMoreText from "@/components/module/ReadMoreText";
import { fetchSingleBlog } from "@/services/singleBlog";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Blogs",
};

export default async function page({ params }) {
  const { locale } = await params;
  const { slug } = await params;
  const singleBlog = await fetchSingleBlog(locale, slug);

  return (
    <main className="wrapper ">
      <h1 className="sr-only">وبلاگ</h1>
      <article>
        <section className="w-full relative wrapper_image flex items-center justify-center mt-[130px] lg:mt-0 ">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${singleBlog?.image}`}
            fill
            alt="image project "
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <p
            className={`w-max text-white font-normal text-[1.2rem] md:text-[2rem] z-[11] ${
              ["fa", "ar"].includes(locale) ? "font-fa" : "font-en"
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

          {(singleBlog.aparat_video || singleBlog.media) && (
            <BlogVideo singleBlog={singleBlog} />
          )}
        </section>
      </article>
    </main>
  );
}
