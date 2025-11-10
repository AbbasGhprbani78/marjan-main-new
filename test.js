<div className="max-h-[300px] md:max-h-[90vh]  overflow-auto hide-scrollbar">
  <table className="w-full border-collapse border border-gray-300 text-sm">
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

          <td className="px-6 py-2 font-medium text-gray-700 border-r  w-1/2 border-b border-gray-300">
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
</div>;
