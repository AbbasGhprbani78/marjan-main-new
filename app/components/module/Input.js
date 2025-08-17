import React from "react";

export default function Input({
  label,
  value,
  onChange,
  name,
  type = "text",
  disabled = false,
}) {
  const isFloating = value?.length > 0;

  return (
    <div className="relative border-b border-[#000] w-full">
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="peer w-full placeholder-transparent focus:outline-none bg-transparent text-[.9rem]"
        placeholder={label}
        maxLength={100}
        autoComplete="off"
        disabled={disabled}
      />
      <label
        htmlFor={name}
        className={`
  absolute text-[16px] text-[var(--color-gray-900)] pointer-events-none
  transition-all duration-200 ease-out transform

  rtl:right-0 rtl:left-auto rtl:origin-right
  ltr:left-0 ltr:right-auto ltr:origin-left

  ${
    isFloating
      ? "scale-75 -translate-y-[25px]"
      : "scale-100 -translate-y-[10px]"
  }
  peer-focus:scale-75 peer-focus:-translate-y-[25px]
`}
      >
        {label}
      </label>
    </div>
  );
}
