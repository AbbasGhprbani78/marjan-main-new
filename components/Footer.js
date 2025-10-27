"use client";
import React, { useEffect, useState } from "react";
import * as Icons from "iconsax-reactjs";
import { useParams } from "next/navigation";
import { toPersianDigits } from "@/utils/helper";
import Image from "next/image";
import { useTranslation } from "@/context/TranslationContext";
import { fetchFooter } from "@/services/footer";

export default function Footer() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const loadFooterData = async () => {
      try {
        const data = await fetchFooter(locale);
        setFooterData(data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    loadFooterData();
  }, []);

  return (
    <footer>
      <div className="hidden md:block w-full min-h-[210px] bg-gray-400 md:px-40 lg:px-80 pb-[21px] pt-[33px]">
        <TextRow
          icon="Location"
          text={
            <>
              <span className="font-semibold">{t("AddressTitleF")}</span> :{" "}
              {footerData?.address}
            </>
          }
        />

        <div className="flex items-center justify-between mt-[1.3rem]">
          <TextRow
            icon="DirectboxNotif"
            text={
              <>
                <span className="font-semibold">{t("Postal Code")}</span> :{" "}
                {["fa", "ar"].includes(locale)
                  ? toPersianDigits(footerData?.postal_code)
                  : footerData?.postal_code}
              </>
            }
          />
        </div>
        <div className="flex items-center justify-between mt-[1.3rem]">
          <TextRow
            icon="Call"
            text={
              <>
                <span className="font-semibold">{t("Phone")}</span> :{" "}
                {["fa", "ar"].includes(locale)
                  ? toPersianDigits(footerData?.phone)
                  : footerData?.phone}
              </>
            }
          />

          <div className="flex gap-[20px] items-center">
            <a href="https://www.pinterest.com/marjantileco/" target="_blank">
              <Image
                src={"/images/pintrest.png"}
                width={30}
                height={30}
                className="object-fill cursor-pointer  mix-blend-multiply"
                alt=""
              />
            </a>
            <a
              href="https://instagram.com/marjantileco?utm_medium=copy_link"
              target="_blank"
            >
              <Image
                src={"/images/instagram.png"}
                width={40}
                height={40}
                className="object-fill cursor-pointer mix-blend-multiply"
                alt=""
              />
            </a>

            <a
              href="https://www.linkedin.com/company/marjantilecompany"
              target="_blank"
            >
              <Image
                src={"/images/linkdin.png"}
                width={40}
                height={40}
                className="object-fill cursor-pointer mix-blend-multiply"
                alt=""
              />
            </a>

            <a href="https://www.aparat.com/marjantile" target="_blank">
              <Image
                src={"/images/aparat.png"}
                width={35}
                height={35}
                className="object-fill cursor-pointer mix-blend-multiply"
                alt=""
              />
            </a>
            <a href="https://www.youtube.com/@marjantile6108" target="_blank">
              <Image
                src={"/images/youtube.png"}
                width={40}
                height={40}
                className="object-fill cursor-pointer mix-blend-multiply"
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="flex items-center justify-between mt-[1.3rem]">
          <TextRow
            icon={"Printer"}
            text={
              <>
                <span className="font-semibold">{t("Fax")}</span> :{" "}
                {["fa", "ar"].includes(locale)
                  ? toPersianDigits(footerData?.fax)
                  : footerData?.fax}
              </>
            }
          />
        </div>
        <div className="flex items-center justify-between mt-[1.3rem]">
          <TextRow
            icon="SmsTracking"
            text={
              <>
                <span className="font-semibold">{t("Email")}</span>:
                info@marjantileco.com
              </>
            }
          />

          <p className="text-[14px] font-[600]">
            © 2025
            <span className="underline underline-offset-4">MarjanTile</span>.
            {t("All rights reserved.")}
          </p>
        </div>
      </div>
      <div className="px-20 md:hidden pt-[33px]">
        <div className="flex flex-col gap-[1rem]">
          <TextRow
            icon="Location"
            text={
              <>
                <span className="font-semibold">{t("AddressTitleF")}</span> :{" "}
                {footerData?.address}
              </>
            }
          />
          <TextRow
            icon="DirectboxNotif"
            text={
              <>
                <span className="font-semibold">{t("Postal Code")}</span> :{" "}
                {["fa", "ar"].includes(locale)
                  ? toPersianDigits(footerData?.postal_code)
                  : footerData?.postal_code}
              </>
            }
          />
          <TextRow
            icon="Call"
            text={
              <>
                <span className="font-semibold">{t("Phone")}</span> :{" "}
                {["fa", "ar"].includes(locale)
                  ? toPersianDigits(footerData?.phone)
                  : footerData?.phone}
              </>
            }
          />
          <TextRow
            icon={"Printer"}
            text={
              <>
                <span className="font-semibold">{t("Fax")}</span> :{" "}
                {["fa", "ar"].includes(locale)
                  ? toPersianDigits(footerData?.fax)
                  : footerData?.fax}
              </>
            }
          />
          <TextRow
            icon="SmsTracking"
            text={
              <>
                <span className="font-semibold">{t("Email")}</span> :{" "}
                {footerData?.email}
              </>
            }
          />
        </div>

        <div className="flex flex-col gap-[2rem] mt-[3rem] items-center pb-[1.5rem]">
          <div className="flex gap-[20px] items-center">
            <a href="https://www.pinterest.com/marjantileco/" target="_blank">
              <Image
                src={"/images/pintrest.png"}
                width={30}
                height={30}
                className="object-fill cursor-pointer  mix-blend-multiply"
                alt=""
              />
            </a>
            <a
              href="https://instagram.com/marjantileco?utm_medium=copy_link"
              target="_blank"
            >
              <Image
                src={"/images/instagram.png"}
                width={40}
                height={40}
                className="object-fill cursor-pointer mix-blend-multiply"
                alt=""
              />
            </a>
            <a
              href="https://www.linkedin.com/company/marjantilecompany"
              target="_blank"
            >
              <Image
                src={"/images/linkdin.png"}
                width={40}
                height={40}
                className="object-fill cursor-pointer mix-blend-multiply"
                alt=""
              />
            </a>
            <a href="https://www.aparat.com/marjantile" target="_blank">
              <Image
                src={"/images/aparat.png"}
                width={35}
                height={35}
                className="object-fill cursor-pointer mix-blend-multiply"
                alt=""
              />
            </a>
            <a href="https://www.youtube.com/@marjantile6108" target="_blank">
              <Image
                src={"/images/youtube.png"}
                width={40}
                height={40}
                className="object-fill cursor-pointer mix-blend-multiply"
                alt=""
              />
            </a>
          </div>
          <p className="text-[14px] font-[600]">
            © 2025,{" "}
            <span className="underline underline-offset-4">MarjanTile</span>.
            {t("All rights reserved.")}
          </p>
        </div>
      </div>
    </footer>
  );
}
function TextRow({ text, icon }) {
  const Icon = Icons[icon];
  return (
    <div className="flex items-start gap-7">
      <div className="min-w-[24px] min-h-[24px] flex-shrink-0">
        <Icon size={24} className="text-inherit" variant="Bold" />
      </div>
      <p className="text-[14px] leading-[1.8]">{text}</p>
    </div>
  );
}
