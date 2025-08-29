import React, { useState } from "react";

export default function Texterea({ value, onChange, maxLength, label, error }) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="flex flex-col gap-[.3rem]">
      <label className="text-[.7rem] font-bold">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`p-5 w-full h-[100px] text-[.8rem] resize-none outline-none border ${
          isFocused ? "border-blue-500" : "border-gray-500"
        }`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
