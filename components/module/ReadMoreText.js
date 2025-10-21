"use client";
import { useTranslation } from "@/context/TranslationContext";
import React, { useState } from "react";

export default function ReadMoreText({
  text,
  fontSize = "text-[1rem]",
  fontweight = "font-normal",
  textColor = "text-[var(--color-gray-900)]",
  isgradient = true,
}) {
  const [expanded, setExpanded] = useState(false);
  const { locale } = useTranslation();

  return (
    <div className={`relative  ${textColor}`}>
      <div className="md:hidden relative">
        <div
          dir=""
          className={`text-justify leading-[27px] transition-all duration-300 ${fontweight} ${fontSize} ${
            expanded ? "" : "line-clamp-[6]"
          }`}
        >
          {text}
        </div>

        {!expanded && (
          <div
            onClick={() => setExpanded(true)}
            className={`absolute bottom-0 left-0 w-full h-[150px] ${
              isgradient && "bg-gradient-to-t from-white"
            } to-transparent cursor-pointer z-10`}
          />
        )}
      </div>
      <p
        className={`hidden md:block text-justify leading-[27px] ${fontweight} ${fontSize}`}
      >
        {locale === "fa" ? (
          text
        ) : (
          <span dir="ltr">{fixSizesInText(text, locale)}</span>
        )}
      </p>
    </div>
  );
}

function fixSizesInText(text, locale = "fa") {
  if (!text) return text;

  const sizeRegex = /(\d+)\s*×\s*(\d+)/g;

  return text.replace(sizeRegex, (match, p1, p2) => {
    if (locale === "fa" || locale === "ar") {
      return toPersianDigits(`${p1}×${p2}`);
    } else {
      return `${p2}\u200E×\u200E${p1}`;
    }
  });
}

function toPersianDigits(str) {
  const en = "0123456789";
  const fa = "۰۱۲۳۴۵۶۷۸۹";
  return str.replace(/\d/g, (d) => fa[en.indexOf(d)]);
}
