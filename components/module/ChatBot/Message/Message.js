import React from "react";
import "./Message.css";
import ProductChatItem from "../ProductChatItem/ProductChatItem";
import { useTranslation } from "@/context/TranslationContext";

export default function Message({ message }) {
  const { locale } = useTranslation();

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

  const fixedText = fixSizesInText(message?.text, locale);

  return (
    <div
      className={`${
        message.isai ? "message_wrapper_ai" : "message_wrapper_user"
      } ${message.images?.length > 0 ? "image_wrap" : ""}`}
    >
      {message.text && (
        <p
          className={`
          ${message.isai ? "chat-contant-ai" : "chat-contant-user"} 
          ${message.isError ? "error-color" : ""}
        `}
        >
          {fixedText}
        </p>
      )}

      {message.suggestions?.length > 0 && (
        <div className="chat-contant-ai ltr w-100 mt-3">
          {message.suggestions.map((item) => (
            <ProductChatItem key={item.code || item.name} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
