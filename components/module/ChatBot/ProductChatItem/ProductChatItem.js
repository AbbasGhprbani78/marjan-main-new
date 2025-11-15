"use client";
import React from "react";
import "./productChatItem.css";
import { useTranslation } from "@/context/TranslationContext";
import { useRouter } from "next/navigation";
import { useToggle } from "@/context/context";
export default function ProductChatItem({ item }) {
  const { setIsShowChatbot } = useToggle();
  const { locale } = useTranslation();
  const router = useRouter();
  // new URL(item.link, window.location.origin).pathname
  const goToProductHandler = () => {
    setIsShowChatbot(false);
    const relativePath = item?.link ? item?.link : "/products";

    router.push(relativePath);
  };

  function fixSizesInText(text, locale = "fa") {
    if (!text) return text;

    const sizeRegex = /([0-9۰-۹]+)\s*[x×X\u00D7\u2715]\s*([0-9۰-۹]+)/gi;

    return text.replace(sizeRegex, (match, p1, p2) => {
      if (locale === "fa" || locale === "ar") {
        return toPersianDigits(p2) + "×" + toPersianDigits(p1);
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

  const fixedSize = fixSizesInText(item?.size, locale);
  const fixedName = fixSizesInText(item?.name, locale);

  return (
    <div className={`productchat`} onClick={goToProductHandler}>
      <div className="d-flex align-items-center ">
        <div className="img-chat-wrapp mb-5">
          <img
            src={
              item.image
                ? `https://api.nobinco.com/marjan-chat/${item.image}`
                : "/images/images.png"
            }
            alt={item.name || "Product"}
            className="product-image"
          />
        </div>
        <span className="product-chat-name">{fixedName}</span>
      </div>
      <span className="product-chat-price">{fixedSize}</span>
    </div>
  );
}
