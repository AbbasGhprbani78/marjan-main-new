"use client";
import React from "react";
import Button2 from "../module/Button2";
import { useTranslation } from "@/hook/useTranslation";
import { useParams } from "next/navigation";
import { toPersianDigits } from "@/utils/helper";

export default function ContactusItem({ info }) {
  const { t } = useTranslation();
  const { locale } = useParams();
  return (
    <article
      className="text-[var(--color-gray-900)] mb-[2rem]"
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
          <span itemProp="name">
            {locale ? toPersianDigits(info.phone) : info.phone}
          </span>
        </p>

        <p className="font-normal text-[.9rem]">
          <span className="font-medium text-[1rem]">{t("Email")} : </span>
          {info.email}
        </p>

        <p className="font-normal text-[.9rem]">
          <span className="font-medium text-[1rem]">{t("Address")} : </span>
          <span itemProp="streetAddress">{info.address}</span>
        </p>
      </div>
      <div className="w-full md:w-[202px]">
        <Button2
          text={t("Routing")}
          width={202}
          height={42}
          bgblack={"#000"}
          onClick={() => window.open(info.link, "_blank")}
        />
      </div>
    </article>
  );
}
