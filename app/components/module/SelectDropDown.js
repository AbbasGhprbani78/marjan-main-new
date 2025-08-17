"use client";
import { useState, useEffect } from "react";
import Select from "react-select";

export default function MySelect({
  label,
  data = [],
  onChange,
  value,
  name,
  isClearable,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [direction, setDirection] = useState("rtl");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dir = document?.documentElement?.dir || "rtl";
      setDirection(dir);
    }
  }, []);

  const options = data.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const selectedOption =
    options.find((option) => option.value === value) || null;

  const isFloating = isFocused || !!selectedOption;

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      borderBottom: "1px solid #000",
      borderRadius: 0,
      boxShadow: "none",
      direction: direction,
      "&:hover": {
        borderBottom: "2px solid #555",
      },
    }),
    menu: (provided) => ({
      ...provided,
      direction: direction,
      textAlign: direction === "rtl" ? "right" : "left",
    }),
    option: (provided, state) => ({
      ...provided,
      textAlign: direction === "rtl" ? "right" : "left",
      fontSize: ".9rem",
      paddingTop: "7px",
      paddingBottom: "7px",
      backgroundColor: state.isSelected
        ? "#eee"
        : state.isFocused
        ? "#f5f5f5"
        : "white",
      color: "#000",
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  const customComponents = {
    IndicatorSeparator: () => null,
  };

  return (
    <div className="relative z-0">
      <label
        className={`
          absolute text-[16px] text-[var(--color-gray-900)] pointer-events-none transition-all duration-200 ease-out transform z-10
          ${direction === "rtl" ? "right-0 origin-right" : "left-0 origin-left"}
          ${
            isFloating
              ? "scale-75 -translate-y-[15px]"
              : "scale-100 translate-y-[4px]"
          }
        `}
      >
        {label}
      </label>
      <Select
        options={options}
        styles={customStyles}
        components={customComponents}
        onChange={onChange}
        value={selectedOption}
        isClearable={isClearable}
        placeholder=""
        name={name || undefined}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        menuPortalTarget={typeof window !== "undefined" ? document.body : null}
        isSearchable={false}
      />
    </div>
  );
}
