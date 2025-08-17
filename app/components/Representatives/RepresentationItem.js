"use client";
import React from "react";
import Button2 from "../module/Button2";
import { useTranslation } from "@/hook/useTranslation";
import { toPersianDigits } from "@/utils/helper";
import { useParams } from "next/navigation";

export default function RepresentationItem() {
  const { t } = useTranslation();
  const { locale } = useParams();
  return (
    <article
      className="text-[var(--color-gray-900)] mb-[2rem]"
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      <h2 className="font-medium text-[1.2rem] mb-[1.2rem]" itemProp="address">
        تهران
      </h2>

      <div
        className="flex flex-col flex-wrap gap-[10px] w-3/4 mb-[1.3rem]"
        itemScope
        itemType="https://schema.org/PostalAddress"
      >
        <p className="font-normal text-[.9rem]">
          <span className="font-medium text-[1rem]">{t("AgencyName")} : </span>
          <span itemProp="name">شرکت ایران آلیش</span>
        </p>

        <p className="font-normal text-[.9rem]">
          <span className="font-medium text-[1rem]">{t("StoreName")} : </span>
          برندشاپ کاشی مرجان
        </p>

        <p className="font-normal text-[.9rem]">
          <span className="font-medium text-[1rem]">{t("Address")} : </span>
          <span itemProp="streetAddress">
            {locale === "fa"
              ? toPersianDigits("خیابان ولیعصر، بالاتر از میدان ونک، پلاک 123")
              : "خیابان ولیعصر، بالاتر از میدان ونک، پلاک 123"}
          </span>
        </p>

        <p className=" font-normal text-[.9rem] ">
          <span className="font-medium  text-[1rem]">{t("Phone")} : </span>
          {locale === "fa" ? toPersianDigits("09151231234") : "09151231234"}
        </p>
      </div>

      <div className="w-full md:w-[202px]">
        <Button2 text={t("Routing")} width={202} height={42} bgblack={"#000"} />
      </div>
    </article>
  );
}
