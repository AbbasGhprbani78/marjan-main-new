"use client";
import React from "react";
export default function Table({ columns = [], data = [] }) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 ">
      <table className="min-w-[1200px] border-collapse border border-gray-300 text-sm">
        <thead>
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
  );
}
