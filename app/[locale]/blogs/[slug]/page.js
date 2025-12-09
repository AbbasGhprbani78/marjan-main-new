import BlogVideo from "@/components/Blogs/BlogVideo";
import GallerySingleBlog from "@/components/Blogs/GallerySingleBlog";
import ReadMoreText from "@/components/module/ReadMoreText";
import { fetchSingleBlog } from "@/services/singleBlog";
import Image from "next/image";
import React from "react";
import { notFound } from "next/navigation";
import translations from "@/components/module/translations";
import Blog from "@/components/templates/Blog";

const getSingleBlog = async (locale, slug) => {
  return await fetchSingleBlog(locale, slug);
};

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const dict = translations[locale] || translations["en"];

  const singleBlog = await getSingleBlog(locale, params.slug);

  return {
    title: `${singleBlog?.title} | ${dict?.websiteName}`,
    description: singleBlog?.excerpt,
    openGraph: {
      title: singleBlog.title,
      description: singleBlog.title,
      images: [`${process.env.NEXT_PUBLIC_API_URL}${singleBlog?.image}`],
    },
  };
}

export default async function Page({ params }) {
  const { locale = "en", slug } = await params;

  const singleBlog = await getSingleBlog(locale, slug);

  if (!singleBlog) {
    notFound();
  }

  return (
    <main className="wrapper">
      <article>
        <section className="w-full relative wrapper_image flex items-center justify-center mt-[130px] lg:mt-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${singleBlog?.image}`}
            fill
            alt="image project"
            className="object-cover"
            unoptimized={true}
            quality={100}
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <h1
            className={`w-max text-white font-normal text-[1.2rem] md:text-[2rem] z-[11] text-center ${
              ["fa", "ar"].includes(locale) ? "font-fa" : "font-en"
            }`}
          >
            {singleBlog?.title}
          </h1>
        </section>

        {singleBlog?.category?.title?.toLowerCase() === "articles" ? (
          <Blog
            content={singleBlog?.rich_text}
            locale={locale}
            related_blogs={singleBlog?.related_blogs}
            related_products={singleBlog?.related_products}
          />
        ) : (
          <section className="mt-[2rem] px-20 md:px-40 lg:px-80 text-[var(--color-gray-900)] font-normal pb-[2rem]">
            {singleBlog.text && (
              <div className="leading-[30px]">
                <ReadMoreText text={singleBlog?.text} />
              </div>
            )}

            {singleBlog?.media_files?.length > 0 && (
              <div className="mt-[1rem] lg:mt-[2rem] w-full">
                <GallerySingleBlog
                  media={singleBlog?.media_files?.map((media) => media.url)}
                />
              </div>
            )}

            {singleBlog?.text_two && (
              <div className="leading-[30px] mt-[1rem] lg:mt-[2rem]">
                <ReadMoreText text={singleBlog?.text_two} />
              </div>
            )}

            {(singleBlog.aparat_video || singleBlog.media) && (
              <BlogVideo singleBlog={singleBlog} />
            )}
          </section>
        )}
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: singleBlog?.title,
            image: `${process.env.NEXT_PUBLIC_API_URL}${singleBlog?.image}`,
            datePublished: singleBlog?.created_at,
            dateModified: singleBlog?.updated_at,
            publisher: {
              "@type": "Organization",
            },
          }),
        }}
      />
    </main>
  );
}

{
  /* <section className="mt-[2rem] px-20 md:px-40 lg:px-80 text-[var(--color-gray-900)] font-normal  pb-[2rem]">
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
</section>; */
}
