"use client";
import DOMPurify from "dompurify";
import "./blogcontent.css";
export default function Blog({ content, locale }) {
  return (
    <section
      className={`mt-[2rem] px-20 md:px-60 lg:px-120 text-[var(--color-gray-900)] font-normal  pb-[2rem] blogContent
        ${["fa", "ar"].includes(locale) ? "font-fa" : "font-en"}`}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content || ""),
      }}
    ></section>
  );
}
