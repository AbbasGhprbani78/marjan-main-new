"use client";
import React, { useState } from "react";

export default function ReadMoreText({
  text,
  fontSize = "text-[1rem]",
  fontweight = "font-normal",
  textColor = "text-[var(--color-gray-900)]",
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`relative  ${textColor}`}>
      <div className="md:hidden relative">
        <div
          className={`text-justify leading-[27px] transition-all duration-300 ${fontweight} ${fontSize} ${
            expanded ? "" : "line-clamp-[6]"
          }`}
        >
          {text}
        </div>

        {!expanded && (
          <div
            onClick={() => setExpanded(true)}
            className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-white to-transparent cursor-pointer z-10"
          />
        )}
      </div>
      <p
        className={`hidden md:block text-justify leading-[27px] ${fontweight} ${fontSize}`}
      >
        {text}
      </p>
    </div>
  );
}
