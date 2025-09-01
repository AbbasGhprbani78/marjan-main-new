import React, { useState } from "react";

export default function Input({
  label = "",
  type = "text",
  value = "",
  onChange,
  maxLength = 256,
  onlyPersian = false,
  onlyNumber = false,
  error = "",
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    let newValue = e.target.value;

    if (onlyPersian) {
      newValue = newValue.replace(/[^آ-ی\s]/g, "");
    }

    if (onlyNumber) {
      newValue = newValue.replace(/[^0-9]/g, "");
    }

    onChange?.(newValue);
  };

  return (
    <div className="flex flex-col gap-[.3rem]">
      <label className="text-[.7rem] font-bold">{label}</label>
      <input
        value={value}
        onChange={handleChange}
        type={type}
        maxLength={maxLength}
        autoComplete="off"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`h-[34px] px-5 text-[.8rem] border w-full rounded 
    ${
      error
        ? "border-red-500"
        : isFocused
        ? "border-blue-500"
        : "border-gray-500"
    }
  `}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
