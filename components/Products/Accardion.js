"use client";
import * as Icons from "iconsax-reactjs";
import { useEffect, useState } from "react";
import CheckBox from "../module/CheckBox";

export default function Accordion({
  itemsCheckBox = [],
  title,
  onFilterChange,
  filterKey,
  defaultOpen = false,
  open,
  filters,
  queryFilterKey,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  useEffect(() => {
    if (queryFilterKey === filterKey) {
      setIsOpen(true);
    }
  }, [queryFilterKey, filterKey]);

  const toggleAccordion = () => setIsOpen((prev) => !prev);

  const selectedItems = filters[filterKey] || [];

  const handleChange = (e) => {
    const value = e.target.name;
    const newSelectedItems = selectedItems.includes(value)
      ? selectedItems.filter((item) => item !== value)
      : [...selectedItems, value];

    onFilterChange(filterKey, newSelectedItems);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <button
        aria-expanded={isOpen}
        onClick={toggleAccordion}
        className="w-full flex justify-between items-center p-2 text-[#292d32] mb-[.8rem] cursor-pointer"
      >
        <span className="font-medium">{title}</span>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <Icons.ArrowDown2 size="20" color="#292d32" />
        </span>
      </button>
      <div
        className={`overflow-y-auto transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[350px]" : "max-h-0"
        }`}
      >
        <div className="space-y-5 p-2">
          {itemsCheckBox.map((item, idx) => {
            let display = item;
            if (
              filterKey === "size" &&
              typeof item === "string" &&
              item.includes("x")
            ) {
              display = item.split("x").reverse().join("x");
              if (["fa", "ar"].includes(locale)) {
                display = toPersianDigits(display);
              }
            }

            return (
              <CheckBox
                key={idx}
                label={display}
                name={item}
                checked={selectedItems.includes(item)}
                onChange={handleChange}
                dir={filterKey === "Size" && "rtl"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
