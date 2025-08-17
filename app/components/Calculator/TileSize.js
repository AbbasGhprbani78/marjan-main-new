import React, { useState } from "react";
import Options from "../module/Options";
import SelectDropDown from "@/app/components/module/SelectDropDown";

const dimensions = [
  { id: "7 * 29", name: "7 * 29" },
  { id: "11.5 * 24", name: "11.5 * 24" },
  { id: "15 * 15", name: "15 * 15" },
  { id: "20 * 20", name: "20 * 20" },
  { id: "25 * 25", name: "25 * 25" },
  { id: "30 * 30", name: "30 * 30" },
  { id: "33 * 33", name: "33 * 33" },
  { id: "40 * 40", name: "40 * 40" },
  { id: "60 * 60", name: "60 * 60" },
  { id: "20 * 120", name: "20 * 120" },
  { id: "60 * 120", name: "60 * 120" },
  { id: "100 * 100", name: "100 * 100" },
];

export default function TileSize({ value, onChange }) {
  const [isSameSize, setIsSameSize] = useState(false);
  return (
    <div>
      <p className=" font-[600] text-[1rem] pb-30">سایز کاشی</p>
      <div className="grid grid-cols-12 items-center">
        <div className="flex flex-col gap-[1rem] col-span-4">
          <p className="font-bold text-[.9rem]">
            آیا می‌خواهید اندازه کاشی برای هر سطح یکسان باشد؟
          </p>
          <Options
            isTrue={isSameSize}
            setIsTrue={setIsSameSize}
            text1={"خیر"}
            text2={"بله"}
          />
        </div>
        <div className="flex items-end gap-[1rem] col-span-8 justify-end">
          <span className="font-bold">اندازه کاشی : </span>
          <div className="w-[300px]">
            <SelectDropDown
              data={dimensions}
              label={"cm"}
              value={value}
              onChange={(selectedOption) => {
                onChange?.(selectedOption?.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
