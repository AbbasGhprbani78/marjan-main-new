"use client";
import React from "react";
import Button2 from "../module/Button2";
import { useTranslation } from "@/context/TranslationContext";
import { useParams } from "next/navigation";
import { toPersianDigits } from "@/utils/helper";

export default function ContactusItem({ info, onLocationClick }) {
  const { t } = useTranslation();
  const { locale } = useParams();

  const handleLocationClick = () => {
    if (onLocationClick && info.x && info.y) {
      onLocationClick(info);
    }
  };

  const openMap = () => {
    if (typeof window !== "undefined" && info.x && info.y) {
      const lat = info.x;
      const lng = info.y;
      window.open(`https://www.google.com/maps/place/${lat},${lng}`, "_blank");
    }
  };

  return (
    <article
      className="text-[var(--color-gray-900)] mb-[2rem]   p-4 rounded-lg transition-colors"
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      <h2 className="font-medium text-[1.2rem] mb-[1.2rem]" itemProp="address">
        {info.name}
      </h2>

      <div
        className="flex flex-col flex-wrap gap-[10px] w-3/4 mb-[1.3rem]"
        itemScope
        itemType="https://schema.org/PostalAddress"
      >
        <p className="font-normal text-[.9rem]">
          <span className="font-medium text-[1rem]">{t("PhoneNumber")} : </span>
          <a href={`tel:${info.phone}`} itemProp="name">
            {locale === "fa" ? toPersianDigits(info.phone) : info.phone}
          </a>
        </p>

        <p className="font-normal text-[.9rem]">
          <span className="font-medium text-[1rem]">{t("Email")} : </span>
          {info.email}
        </p>

        <p
          className="font-normal text-[.9rem] cursor-pointer hover:text-blue-600 transition-colors"
          onClick={handleLocationClick}
        >
          <span className="font-medium text-[1rem]">{t("Address")} : </span>
          <span itemProp="streetAddress">{info.address}</span>
        </p>
      </div>
      <div className="w-full md:w-[202px]">
        <Button2
          text={t("Navigation")}
          width={202}
          height={42}
          bgblack={"#000"}
          onClick={openMap}
        />
      </div>
    </article>
  );
}
