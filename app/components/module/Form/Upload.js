import React from "react";

export default function Upload({ label = "", onChange, error = "" }) {
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
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            if (file.size < 5 * 1024 * 1024) {
              alert("حجم فایل باید حداقل 5 مگابایت باشد!");
              e.target.value = "";
              return;
            }
            onChange(file);
          }
        }}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
