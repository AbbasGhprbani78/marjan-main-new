import React, { useState } from "react";

export default function DropDown({
  label = "",
  value = "",
  options = [],
  onChange,
  error = "",
  hideError = "",
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange?.(newValue);
  };

  return (
    <div className="flex flex-col gap-[.3rem]">
      <label className="text-[.7rem] font-bold">{label}</label>
      <select
        value={value}
        onChange={handleChange}
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
      >
        <option value="" disabled>
          انتخاب کنید...
        </option>
        {options.map((opt, index) => (
          <option key={opt.id ?? index} value={opt.id}>
            {opt.value}
          </option>
        ))}
      </select>
      {!hideError && error && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
}
