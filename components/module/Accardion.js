"use client";
import React, { useState, useRef } from "react";
import * as Icons from "iconsax-reactjs";
import { useTranslation } from "@/context/TranslationContext";
import { toPersianDigits } from "@/utils/helper";
import Link from "next/link";

const Accordion = ({ accardionItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const { locale } = useTranslation();

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
        <div className="pb-[2rem] w-full">
          <p className="px-4  font-normal text-[15.5px] text-start lg:text-justify">
            {["fa", "ar"].includes(locale)
              ? toPersianDigits(accardionItem.answer)
              : accardionItem.answer}
          </p>
          {accardionItem?.linkUrl && (
            <Link
              href={accardionItem?.linkUrl}
              className="inline-block mt-[1rem] text-[.9rem] underline text-blue-500 font-bold"
            >
              {accardionItem?.linkTitle}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
