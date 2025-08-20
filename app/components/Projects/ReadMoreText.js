"use client";
import React, { useState } from "react";

export default function ReadMoreText({ text = "" }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="relative mt-[2.3rem]" aria-labelledby="about-heading">
      <div className="md:hidden relative">
        <div
          className={`text-justify leading-[30px] font-normal text-[1rem] transition-all duration-300 ${
            expanded ? "" : "line-clamp-[6]"
          }`}
          id="about-text"
        >
          <p>{text}</p>
        </div>

        {!expanded && (
          <div
            onClick={() => setExpanded(true)}
            className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-white to-transparent cursor-pointer z-10"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="hidden md:block text-justify font-normal text-[1rem] leading-[30px]">
        <p>{text}</p>
      </div>
    </section>
  );
}
