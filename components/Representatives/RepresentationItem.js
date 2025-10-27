"use client";
import React from "react";
import Button2 from "../module/Button2";
import { useTranslation } from "@/context/TranslationContext";
import { toPersianDigits } from "@/utils/helper";

export default function RepresentationItem({ city, onAddressClick }) {
  const { t, locale } = useTranslation();
  if (!city) return null;

  const openMap = () => {
    if (typeof window !== "undefined" && city.x && city.y) {
      const lat = city.x;
      const lng = city.y;
      window.open(`https://www.google.com/maps/place/${lat},${lng}`, "_blank");
    }
  };

  return (
    <article className="text-[var(--color-gray-900)] mb-[2rem]">
      <h2 className="font-semi text-[1.2rem] mb-[1.2rem]">{city.store_name}</h2>

      <p>
        <span className="font-semibold text-[.9rem]">{t("AgencyName")} : </span>
        <span className="text-[.9rem]">{city.agency_name}</span>
      </p>
      {city.address && (
        <p
          onClick={() => onAddressClick && onAddressClick(city)}
          className="cursor-pointer hover:text-blue-600 transition-colors"
        >
          <span className="font-semibold text-[.9rem] ">{t("Address")} : </span>
          <span className="text-[.9rem]">
            {["fa", "ar"].includes(locale)
              ? toPersianDigits(city.address)
              : city.address}
          </span>
        </p>
      )}

      {city?.phone && (
        <p>
          <span className="font-semibold text-[.9rem]">{t("Phone")} : </span>
          <span className="text-[.9rem]">
            {["fa", "ar"].includes(locale)
              ? toPersianDigits(city.phone)
              : city.phone}
          </span>
        </p>
      )}

      {city?.postal_code && (
        <p>
          <span className="font-semibold text-[.9rem]">
            {t("Postal Code")} :{" "}
          </span>
          <span className="text-[.9rem]">
            {["fa", "ar"].includes(locale)
              ? toPersianDigits(city.postal_code)
              : city.postal_code}
          </span>
        </p>
      )}

      {city.address && (
        <div className="mt-[1rem] w-full md:w-[202px]">
          <Button2 text={t("Navigation")} bgblack onClick={openMap} />
        </div>
      )}
    </article>
  );
}
