"use client";
import { useTranslation } from "@/context/TranslationContext";
import { toPersianDigits } from "@/utils/helper";
import Image from "next/image";
import React from "react";

export default function Table({ title, thickness, colors, surface, size }) {
  const { t, locale } = useTranslation();

  const hasSize = size && size.length > 0;
  const hasSurface = surface && surface.length > 0;
  const hasColors = colors && colors.length > 0;
  const hasThickness =
    !!thickness?.additional_thicknesses.length || !!thickness?.main_thickness;

  return (
    <>
      {title && (
        <p
          className={`font-normal text-[30px] mb-17 text-center pt-[1rem] font-en`}
        >
          {title}
        </p>
      )}

      <div className="overflow-x-auto mx-auto min-w-[250px] max-w-[500px]">
        <table className="w-full max-w-[500px] text-sm text-center text-black">
          <thead>
            <tr className="text-black border-b border-[#000]">
              {hasSize && (
                <th className="px-0 py-6 text-center">
                  <div className="px-4 font-normal">{t("size")}</div>
                </th>
              )}
              {hasSurface && (
                <th className="px-0 py-6 text-center">
                  <div
                    className={`px-4 pb-1 font-normal ${
                      hasSize && "rtl:border-r"
                    } border-[#000] ltr:border-l`}
                  >
                    {t("Surface")}
                  </div>
                </th>
              )}
              {hasColors && (
                <th className="px-0 py-6 text-center">
                  <div
                    className={`px-4 pb-1 font-normal ${
                      hasSurface && "rtl:border-r"
                    } border-[#000] ltr:border-l`}
                  >
                    {t("color")}
                  </div>
                </th>
              )}
              {hasThickness && (
                <th className="px-0 py-6 text-center">
                  <div
                    className={`px-4 pb-1 font-normal ${
                      hasColors && "rtl:border-r"
                    } border-[#000] ltr:border-l`}
                  >
                    {t("Thickness")}
                  </div>
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            <tr className="text-center">
              {hasSize && (
                <td className="px-4 py-3 whitespace-nowrap text-center align-top">
                  {size.map((item) => {
                    const reversed = item.includes("x")
                      ? item.split("x").reverse().join("x")
                      : item;
                    const display = ["fa", "ar"].includes(locale)
                      ? toPersianDigits(reversed)
                      : reversed;

                    return (
                      <div className="block mb-5" key={item}>
                        {display}
                      </div>
                    );
                  })}
                </td>
              )}

              {hasSurface && (
                <td className="px-4 py-3 whitespace-nowrap text-center h-max align-top">
                  {surface.map((item) => (
                    <div className="block mb-5" key={item}>
                      {item}
                    </div>
                  ))}
                </td>
              )}

              {hasColors && (
                <td className="px-4 py-3 w-max-[130px] md:w-max-[210px] flex justify-center">
                  <div className="flex flex-wrap max-w-[130px] md:max-w-[210px]">
                    {[
                      ...new Map(
                        colors.map((item) => [item.title, item])
                      ).values(),
                    ].map((item, index) => (
                      <div
                        key={item.id ?? index}
                        className="h-[25px] w-[25px] m-[2px] rounded-full overflow-hidden relative transition-transform duration-300 ease-in-out hover:-translate-y-2 shadow-[0_2px_2px_rgba(0,0,0,0.4)]"
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
              )}

              {hasThickness && (
                <td className="px-4 py-3 whitespace-nowrap text-center [direction:ltr] align-top">
                  {thickness?.main_thickness && (
                    <div className="mb-5">
                      {["fa", "ar"].includes(locale)
                        ? toPersianDigits(thickness?.main_thickness)
                        : thickness?.main_thickness}{" "}
                      mm
                    </div>
                  )}
                  {thickness?.additional_thicknesses.map((item, i) => (
                    <div key={i} className="mb-5">
                      {["fa", "ar"].includes(locale)
                        ? toPersianDigits(item)
                        : item}{" "}
                      mm
                    </div>
                  ))}
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
