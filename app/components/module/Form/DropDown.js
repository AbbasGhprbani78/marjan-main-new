import React from "react";

export default function DropDown({
  label = "",
  options = [],
  onChange,
  value = "",
  error = "",
}) {
  return (
    <div className="flex flex-col gap-[.3rem]">
      <label className="text-[.7rem] font-bold">{label}</label>
      <div className="border w-full py-3 px-5 focus-within:border-blue-500">
        <select
          value={value}
          onChange={onChange}
          className="border-none outline-0 w-full"
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
