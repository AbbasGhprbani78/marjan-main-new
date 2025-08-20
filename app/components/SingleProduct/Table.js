"use client";
import { useTranslation } from "@/hook/useTranslation";
import Image from "next/image";
import React from "react";

export default function Table({ title, thickness, colors, surface, size }) {
  const { t } = useTranslation();

  return (
    <>
      <p className="font-normal text-[30px] font-fa mb-17 text-center pt-[1rem]">
        {title}
      </p>
      <div className="overflow-x-auto w-fit mx-auto w-full max-w-[500px]">
        <table className="w-full max-w-[500px] text-sm  text-center text-black">
          <thead>
            <tr className="text-black border-b border-[#000]">
              <th className="px-0 py-6 text-center">
                <div className="px-4 font-normal">{t("size")}</div>
              </th>
              <th className="px-0 py-6 text-center">
                <div className="px-4 pb-1 font-normal rtl:border-r border-[#000] ltr:border-l">
                  {t("Surface")}
                </div>
              </th>
              <th className="px-0 py-6 text-center">
                <div className="px-4 pb-1 font-normal rtl:border-r border-[#000] ltr:border-l">
                  {t("color")}
                </div>
              </th>
              <th className="px-0 py-6 text-center">
                <div className="px-4 pb-1 font-normal rtl:border-r border-[#000] ltr:border-l">
                  {t("thicknesses")}
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-center">
              <td className="px-4 py-3 whitespace-nowrap text-center">
                {size?.map((item) => (
                  <div className="block mb-5" key={item}>
                    {item}
                  </div>
                ))}
              </td>

              <td className="px-4 py-3 whitespace-nowrap text-center h-max">
                {surface?.map((item) => (
                  <div className="block mb-5" key={item}>
                    {item}
                  </div>
                ))}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-center gap-[5px]">
                  {colors?.map((item, index) => (
                    <div
                      className={`h-30 w-30 rounded-full overflow-hidden ${
                        index !== 3 ? "-me-12" : ""
                      } relative z-[${
                        10 - index
                      }] transition-transform duration-300 ease-in-out hover:-translate-y-4`}
                      key={item}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${item?.image}`}
                        width={30}
                        height={30}
                        alt="product-circle"
                        className="object-cover overflow-hidden"
                      />
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-center [direction:ltr]">
                {thickness} mm
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
