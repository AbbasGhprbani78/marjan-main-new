import React from "react";
import * as Icons from "iconsax-reactjs";
import { useTranslation } from "@/hook/useTranslation";

export default function Button({ text, onClick, disable, isActive }) {
  const { locale } = useTranslation();
  return (
    <button
      onClick={onClick}
      disabled={disable}
      aria-pressed={isActive}
      className={`w-full flex justify-center items-center gap-6 py-9  transition-all duration-300
        ${
          isActive
            ? "border border-black bg-white text-black"
            : "bg-[var(--color-gray-900)] text-white"
        }
      `}
    >
      {text}
      {isActive ? (
        <Icons.ArrowDown2 size="15" />
      ) : (
        <Icons.ArrowLeft2
          size="15"
          className={`${locale === "fa" ? "" : "rotate-180"}`}
        />
      )}
    </button>
  );
}
