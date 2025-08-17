import React, { useEffect, useState } from "react";
import CheckBox from "../module/CheckBox";

export default function PrecentageWastage({ onChange }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (onChange) {
      onChange(isChecked);
    }
  }, [isChecked, onChange]);

  return (
    <div>
      <p className="font-[600] text-[1rem] pb-30">درصد هدر دادن</p>
      <CheckBox
        label={"۵٪ اضافه برای پوشش خسارات تصادفی در حین حمل و نقل یا در منزل"}
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        name="wastage"
      />
    </div>
  );
}
