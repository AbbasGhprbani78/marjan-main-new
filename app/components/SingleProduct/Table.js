"use client";
import { useTranslation } from "@/hook/useTranslation";
import Image from "next/image";
import React from "react";

export default function Table({ title, thickness, colors, surface, size }) {
  const { t } = useTranslation();

  return (
    <>
      {title && (
        <p className="font-normal text-[30px] font-fa mb-17 text-center pt-[1rem]">
          {title}
        </p>
      )}

      <div className="overflow-x-auto  mx-auto min-w-[250px] max-w-[500px]">
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
              <td className="px-4 py-3 whitespace-nowrap text-center align-top">
                {size?.map((item) => (
                  <div className="block mb-5" key={item}>
                    {item}
                  </div>
                ))}
              </td>

              <td className="px-4 py-3 whitespace-nowrap text-center h-max align-top">
                {surface?.map((item) => (
                  <div className="block mb-5" key={item}>
                    {item}
                  </div>
                ))}
              </td>

              <td className="px-4 py-3  w-max-[130px] md:w-max-[210px] flex justify-center">
                <div className="flex flex-wrap max-w-[130px] md:max-w-[210px] ">
                  {colors?.map((item, index) => (
                    <div
                      key={item.id ?? index}
                      className="h-[25px] w-[25px] m-[2px] rounded-full overflow-hidden relative transition-transform duration-300 ease-in-out hover:-translate-y-2"
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${item?.image}`}
                        fill
                        alt="product-circle"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </td>

              <td className="px-4 py-3 whitespace-nowrap text-center [direction:ltr] align-top">
                {thickness} mm
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
