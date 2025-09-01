"use client";
import React, { useState, useRef } from "react";
import * as Icons from "iconsax-reactjs";

const Accordion = ({ accardionItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="w-full border-b  border-[#eaeaea] text-[var(--color-gray-900)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-[.8rem] flex items-center justify-between  hover:bg-gray-50 transition-all"
        aria-expanded={isOpen}
      >
        <span className="text-[.9rem]  font-medium text-start w-3/4 leading-[25px]  md:w-full">
          {accardionItem.questions}
        </span>
        <Icons.ArrowDown2
          size="15"
          className={`transition-transform duration-300  ${
            isOpen ? "rotate-180" : ""
          }`}
          variant="Outline"
          color="#000"
        />
      </button>

      <div
        ref={contentRef}
        style={{
          height: isOpen ? contentRef.current?.scrollHeight : 0,
        }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <p className="px-4 pb-[2.5rem] font-normal text-[15.5px] text-justify">
          {accardionItem.answer}
        </p>
      </div>
    </div>
  );
};

export default Accordion;
