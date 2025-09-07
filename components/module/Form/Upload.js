import React from "react";
import { warningMessage } from "../Toast";

export default function Upload({ label = "", onChange, error = "" }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        warningMessage("حجم فایل نباید بیشتر از ۵ مگابایت باشد!");
        e.target.value = "";
        return;
      }

      onChange(file);
    }
  };

  return (
    <div className="flex flex-col gap-[.3rem] w-full">
      {label && <label className="text-sm font-bold">{label}</label>}

      <label
        htmlFor="file-upload"
        className="flex items-center justify-center w-full h-[200px] px-4 py-6 text-gray-600 bg-gray-100 border-2 border-dashed border-gray-400  cursor-pointer hover:bg-gray-200 transition"
      >
        <span className="text-center text-sm font-medium">
          تصویر پرسنلی خود را آپلود کنید
          <br />
          <span className="text-xs text-gray-500">
            (حداقل حجم ۵ مگابایت و فرمت JPG)
          </span>
        </span>
      </label>

      <input
        id="file-upload"
        type="file"
        accept="image/jpeg"
        className="hidden"
        onChange={handleFileChange}
      />

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
