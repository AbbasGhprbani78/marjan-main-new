"use client";
import DOMPurify from "dompurify";
import "./blogcontent.css";
import Image from "next/image";
import { truncateText } from "@/utils/helper";
import Link from "next/link";
import { useTranslation } from "@/context/TranslationContext";
export default function Blog({
  content,
  locale,
  related_blogs,
  related_products,
}) {
  const { t } = useTranslation();

  return (
    <div
      className="mt-[2rem] px-20 md:px-60 lg:px-120 text-[var(--color-gray-900)] font-normal pb-[2rem] 
  grid grid-cols-12 gap-[20px]"
    >
      <section
        className={`${
          related_blogs.length > 0 ? "col-span-12 xl:col-span-9" : "col-span-12"
        } blogContent
      prose max-w-none [&_ul]:list-disc [&_ul]:pr-10 [&_ol]:list-decimal [&_ol]:pr-10 [&_li]:mb-3`}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content || ""),
        }}
      ></section>

      {related_blogs.length > 0 && (
        <section className="col-span-12  xl:col-span-3 sticky top-120 self-start">
          <h4 className="font-semibold ">{t("Marjan related articles")}</h4>
          <div className="mt-[1rem]">
            {related_blogs.map((blog) => (
              <Link
                className="flex items-start gap-5 mb-8"
                key={blog?.id}
                href={`/blogs/${blog?.slug}`}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${blog?.image}`}
                  alt={blog?.title}
                  width={70}
                  height={50}
                  className="flex-shrink-0 rounded"
                />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-[.8rem]">
                    {blog?.title}
                  </span>
                  <p className="text-[.7rem] text-gray-600">
                    {truncateText(blog?.text, 50)}
                  </p>
                </div>
              </Link>
            ))}
            {related_products.map((blog) => (
              <Link
                className="flex items-start gap-5 mb-8"
                key={blog?.id}
                href={`/blogs/${blog?.slug}`}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${blog?.image}`}
                  alt={blog?.title}
                  width={70}
                  height={50}
                  className="flex-shrink-0 rounded"
                />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-[.8rem]">
                    {blog?.title}
                  </span>
                  <p className="text-[.7rem] text-gray-600">
                    {truncateText(blog?.text, 50)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
