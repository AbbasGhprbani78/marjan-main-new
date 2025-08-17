import React from "react";
import * as Icons from "iconsax-reactjs";
export default function ImageDescription() {
  return (
    <figcaption className="border-t-2 border-[#8b8d91] lg:border-none text-[var(--color-gray-900)] flex   items-center gap-7  py-[30px] lg:py-0  ">
      <div
        className="border-2 border-[#8b8d91] flex justify-center items-center w-35 h-35 "
        aria-hidden="true"
      >
        <Icons.Danger size="15" color="#8b8d91" />
      </div>
      <p className="text-sm w-full lg:w-3/4 text-start justify-start  lg:justify-center">
        به دلیل تفاوت در تنظیمات نمایشگر‌ها، رنگ محصولات ممکن است با تصویر نمایش
        داده شده اندکی متفاوت باشد.
      </p>
    </figcaption>
  );
}
