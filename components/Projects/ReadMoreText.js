"use client";
import { useTranslation } from "@/context/TranslationContext";
import React, { useState } from "react";

export default function ReadMoreText({ text = "" }) {
  const [expanded, setExpanded] = useState(false);
  const { locale } = useTranslation();
  return (
    <section className="relative mt-[2.3rem]" aria-labelledby="about-heading">
      <div className="md:hidden relative">
        <div
          className={` leading-[30px] font-normal text-[1rem] transition-all duration-300 ${
            expanded ? "" : "line-clamp-[6]"
          }`}
          id="about-text"
        >
          <p>{text}</p>
        </div>

        {!expanded && (
          <div
            onClick={() => setExpanded(true)}
            className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-white to-transparent cursor-pointer z-10"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="hidden md:block  font-normal text-[1rem] leading-[30px]">
        <span dir={["fa", "ar"].includes(locale) ? "rtl" : "ltr"}>
          {fixSizesInText(text, locale)}
        </span>
      </div>
    </section>
  );
}

function fixSizesInText(text, locale = "fa") {
  if (!text) return text;

  const sizeRegex = /([0-9۰-۹]+)\s*[x××\u00D7\u2715]\s*([0-9۰-۹]+)/gi;

  return text.replace(sizeRegex, (match, p1, p2) => {
    if (locale === "fa" || locale === "ar") {
      return toPersianDigits(p1) + "×" + toPersianDigits(p2);
    } else {
      return `${p2}\u200E×\u200E${p1}`;
    }
  });
}

function toPersianDigits(str) {
  const en = "0123456789";
  const fa = "۰۱۲۳۴۵۶۷۸۹";
  return str.replace(/[0-9]/g, (d) => fa[en.indexOf(d)]);
}
