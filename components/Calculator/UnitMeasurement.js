"use client";
import React from "react";
import SelectDropDown from "./../module/SelectDropDown";
import { useTranslation } from "@/hook/useTranslation";
export default function UnitMeasurement({ value, onChange }) {
  const { t } = useTranslation();
  return (
    <div className="flex-col sm:flex-row flex sm:items-center justify-between">
      <p className="font-[500] text-[.9rem]">{t("Tacttafitdb")}</p>
      <div className="w-full mt-[2.5rem] sm:mt-0 sm:w-[230px]">
        <SelectDropDown
          label={t("Unitofmeasurement")}
          data={[
            { id: 1, name: "Meter & CM" },
            { id: 2, name: "Feet & Inches" },
          ]}
          name={"UnitMeasurement"}
          value={value}
          onChange={(selectedOption) => {
            onChange?.(selectedOption?.value);
          }}
        />
      </div>
    </div>
  );
}
