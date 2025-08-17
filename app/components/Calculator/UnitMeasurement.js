import React from "react";
import SelectDropDown from "./../module/SelectDropDown";
export default function UnitMeasurement({ value, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-[.9rem]">
        برای محاسبه دقیق متراژ کاشی، جزئیات زیر را پر کنید.
      </p>
      <div className="w-[230px]">
        <SelectDropDown
          label={"واحد اندازه‌گیری"}
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
