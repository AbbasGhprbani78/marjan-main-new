import React, { useEffect, useState } from "react";
import CheckBox from "../module/CheckBox";
import { useTranslation } from "@/hook/useTranslation";

export default function PrecentageWastage({ onChange, isClean }) {
  const [isChecked, setIsChecked] = useState(false);
  const { locale } = useTranslation();

  useEffect(() => {
    if (onChange) {
      onChange(isChecked);
    }
  }, [isChecked, onChange]);

  useEffect(() => {
    if (isClean) {
      setIsChecked(false);
    }
  }, [isClean]);

  return (
    <div className="flex flex-col">
      <p className="font-[600] text-[1rem] pb-30">درصد هدر دادن</p>

      <CheckBox
        label={"۵٪ اضافه برای پوشش خسارات تصادفی در حین حمل و نقل یا در منزل"}
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        name="wastage"
        dir={locale === "fa" ? "rtl" : "ltr"}
      />
    </div>
  );
}
