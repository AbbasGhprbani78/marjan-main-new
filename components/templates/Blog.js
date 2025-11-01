"use client";
import DOMPurify from "dompurify";
export default function Blog({ content }) {
  return (
    <section
      className="mt-[2rem] px-20 md:px-40 lg:px-80 text-[var(--color-gray-900)] font-normal  pb-[2rem]"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content || ""),
      }}
    ></section>
  );
}
