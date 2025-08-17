"use client";
import React, { useState } from "react";
import * as Icons from "iconsax-reactjs";

export default function Button2({ text, onClick, loading, bgblack, icon }) {
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = icon || Icons.ArrowLeft2;

  return (
    <button
      aria-label={text}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`flex cursor-pointer button h-[40px] w-full transition-colors duration-400 backdrop-blur-[4px] ${
        isHovered ? "bg-gray-800 text-gray-white" : ""
      } ${bgblack ? "bg-gray-800 text-gray-white" : ""}`}
    >
      <p className="ms-auto my-auto">{text}</p>
      <IconComponent
        size="20"
        className="ms-[10px] ltr:rotate-180 me-auto my-auto"
      />
    </button>
  );
}
