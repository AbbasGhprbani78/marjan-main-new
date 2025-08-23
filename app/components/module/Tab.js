"use client";
import React, { useEffect, useRef, useState } from "react";
import * as Icons from "iconsax-reactjs";
import { useParams } from "next/navigation";
export default function Tab({ itemsFilter, selected, setSelected }) {
  const buttonsRef = useRef({});
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [activeIndex, setActiveIndex] = useState(
    itemsFilter.findIndex((item) => item.value === selected)
  );

  const { locale } = useParams();

  useEffect(() => {
    const newIndex = itemsFilter.findIndex((item) => item.value === selected);
    setActiveIndex(newIndex);

    const currentButton = buttonsRef.current[selected];
    if (currentButton) {
      setUnderlineStyle({
        left: currentButton.offsetLeft,
        width: currentButton.offsetWidth,
      });
    }
  }, [selected, itemsFilter]);

  const goPrev = () => {
    if (activeIndex > 0) {
      const newVal = itemsFilter[activeIndex - 1].value;
      setSelected(newVal);
    }
  };

  const goNext = () => {
    if (activeIndex < itemsFilter.length - 1) {
      const newVal = itemsFilter[activeIndex + 1].value;
      setSelected(newVal);
    }
  };

  console.log(itemsFilter);

  return (
    <div className="w-full">
      <div className="md:hidden flex items-center justify-between w-full px-4 mb-2">
        <button
          onClick={goPrev}
          disabled={activeIndex === 0}
          className="text-xl px-2 py-1 disabled:opacity-30"
        >
          <Icons.ArrowRight2
            className={`${locale === "fa" ? "" : "rotate-180"}`}
            size="20"
            color="#000"
            variant="blod"
          />
        </button>

        <button
          ref={(el) => (buttonsRef.current[selected] = el)}
          className="text-[17px] font-medium text-black py-2 border-b-2 border-amber-300"
        >
          {itemsFilter[activeIndex]?.label}
        </button>

        <button
          onClick={goNext}
          disabled={activeIndex === itemsFilter.length - 1}
          className="text-xl px-2 py-1 disabled:opacity-30"
        >
          <Icons.ArrowLeft2
            className={`${locale === "fa" ? "" : "rotate-180"}`}
            size="20"
            color="#000"
            variant="blod"
          />
        </button>
      </div>

      <div className="relative hidden md:flex gap-[4.5rem] border-b border-gray-300 text-sm font-medium items-center justify-center">
        {itemsFilter.map((cat) => (
          <button
            key={cat.value}
            ref={(el) => (buttonsRef.current[cat.value] = el)}
            onClick={() => setSelected(cat.value)}
            className={`cursor-pointer relative px-4 text-[17px] pt-2 pb-[.5rem] transition-all duration-300 ${
              selected === cat.value ? "text-black" : "text-gray-500"
            }`}
          >
            {cat.label}
          </button>
        ))}
        <span
          className="absolute bottom-0 h-[2px] bg-yellow-300 transition-all duration-300"
          style={{
            left: underlineStyle.left,
            width: underlineStyle.width,
          }}
        />
      </div>
    </div>
  );
}
