"use client";
import React from "react";
export default function Table({ columns = [], data = [] }) {
  return (
    <>
      <div className="hidden md:block w-full max-h-[250px] overflow-y-auto hide-scrollbar border border-gray-200 rounded-lg">
        <table className="min-w-[1200px] border-collapse border border-gray-300 text-sm w-full">
          <thead className="bg-[#b3b3bd] sticky top-0 z-10">
            <tr>
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
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <td
                    key={col}
                    className="px-6 py-4 whitespace-nowrap text-center text-gray-700 border border-gray-300"
                  >
                    {row[col] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" md:hidden max-h-[300px] overflow-auto">
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full border-collapse border border-gray-300 text-sm md:table">
            <thead className="hidden md:table-header-group">
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
            <tbody className="bg-white md:table-row-group">
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="block md:table-row mb-4 md:mb-0 border border-gray-300 md:border-none"
                >
                  {columns.map((col) => (
                    <td
                      key={col}
                      className="block md:table-cell px-6 py-2 text-gray-700 border md:border-none relative"
                      data-label={col}
                    >
                      <span className="md:hidden font-medium">{col}: </span>
                      {row[col] || "-"}
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
