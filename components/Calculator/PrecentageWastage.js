import React, { useEffect, useState } from "react";
import CheckBox from "../module/CheckBox";
import { useTranslation } from "@/hook/useTranslation";

export default function PrecentageWastage({ onChange, isClean }) {
  const [wastage5, setWastage5] = useState(false);
  const [wastage15, setWastage15] = useState(false);
  const { locale, t } = useTranslation();

  useEffect(() => {
    let value = 0;
    if (wastage5) value = 0.05;
    if (wastage15) value = 0.15;
    if (onChange) onChange(value);
  }, [wastage5, wastage15, onChange]);

  useEffect(() => {
    if (isClean) {
      setWastage5(false);
      setWastage15(false);
    }
  }, [isClean]);

  return (
    <div className="flex flex-col gap-5">
      <p className="font-[600] text-[1rem] pb-2">{t("Percentageofwastage")}</p>
      <p className="my-[.5rem]">{t("precentageText")}</p>

      <CheckBox
        label={t("extraTail5")}
        checked={wastage5}
        onChange={(e) => {
          setWastage5(e.target.checked);
          if (e.target.checked) setWastage15(false);
        }}
        name="wastage5"
        dir={locale === "fa" ? "rtl" : "ltr"}
      />

      <CheckBox
        label={t("extraTail15")}
        checked={wastage15}
        onChange={(e) => {
          setWastage15(e.target.checked);
          if (e.target.checked) setWastage5(false);
        }}
        name="wastage15"
        dir={locale === "fa" ? "rtl" : "ltr"}
      />
    </div>
  );
}
