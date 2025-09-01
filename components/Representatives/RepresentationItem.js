"use client";
import React from "react";
import Button2 from "../module/Button2";
import { useTranslation } from "@/hook/useTranslation";
import { toPersianDigits } from "@/utils/helper";

export default function RepresentationItem({ city }) {
  const { t, locale } = useTranslation();
  if (!city) return null;

  return (
    <article className="text-[var(--color-gray-900)] mb-[2rem]">
      <h2 className="font-medium text-[1.2rem] mb-[1.2rem]">
        {city.store_name}
      </h2>

      <p>
        <span className="font-medium">{t("AgencyName")}:</span>{" "}
        {city.agency_name}
      </p>
      <p>
        <span className="font-medium">{t("Address")}:</span>{" "}
        {locale === "fa" ? toPersianDigits(city.address) : city.address}
      </p>
      <p>
        <span className="font-medium">{t("Phone")}:</span>{" "}
        {locale === "fa" ? toPersianDigits(city.phone) : city.phone}
      </p>
      <p>
        <span className="font-medium">{t("Postal Code")}:</span>{" "}
        {locale === "fa" ? toPersianDigits(city.postal_code) : city.postal_code}
      </p>

      {city.link && (
        <div className="mt-[1rem] w-full md:w-[202px]">
          <Button2
            text={t("Navigation")}
            bgblack
            onClick={() => window.open(city.link, "_blank")}
          />
        </div>
      )}
    </article>
  );
}
