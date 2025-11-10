"use client";
import { useTranslation } from "@/context/TranslationContext";
import { toPersianDigits } from "@/utils/helper";
import React from "react";
export default function Table({ columns = [], data = [], isEn = false }) {
  const { locale } = useTranslation();

  return (
    <>
      <div className="hidden md:block w-full max-w-[90vw] md:max-h-[90vh] overflow-x-auto hide-scrollbar border border-gray-300">
        <div className="max-h-[300px] md:max-h-[90vh] overflow-auto hide-scrollbar">
          <table className="w-full border-collapse border-gray-300 text-sm">
            <tbody className="bg-white" dir="ltr">
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gray-300">
                  <td className="px-6 py-2 text-gray-700 w-1/2 border-b border-gray-300">
                    {columns.map((col, colIndex) => (
                      <div
                        key={col}
                        className={`py-1 ${
                          colIndex < columns.length - 1
                            ? "border-b border-gray-300"
                            : ""
                        }`}
                      >
                        {isEn
                          ? row[col] || "-"
                          : ["fa", "ar"].includes(locale)
                          ? toPersianDigits(row[col] || "-")
                          : row[col] || "-"}
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-2 font-medium text-gray-700 border-r w-1/2 border-b border-gray-300">
                    {columns.map((col, colIndex) => (
                      <div
                        key={col}
                        className={`py-1 ${
                          colIndex < columns.length - 1
                            ? "border-b border-gray-300"
                            : ""
                        }`}
                      >
                        {col}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden max-h-[300px] overflow-auto hide-scrollbar">
        <div className="w-full overflow-x-auto rounded-lg border border-gray-300">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="hidden">
              <tr className="bg-[#b3b3bd]">
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-center font-medium text-gray-800 uppercase tracking-wider border border-gray-300"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="block mb-4 md:mb-0 border border-gray-300"
                >
                  {columns.map((col) => (
                    <td
                      key={col}
                      className="block px-6 py-2 text-gray-700 border border-gray-300 relative"
                      data-label={col}
                      dir="ltr"
                    >
                      <span className="font-medium">{col} :</span>{" "}
                      {isEn
                        ? row[col] || "-"
                        : ["fa", "ar"].includes(locale)
                        ? toPersianDigits(row[col] || "-")
                        : row[col] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
