import React from "react";

export default function PopFilter({ children, isFilterOpen }) {
  return (
    <div
      className={`absolute right-0  md:top-[73px] z-10 bg-white shadow-[0px_4px_4px_0px_#00000040] w-full md:w-1/2 p-[20px] rounded-[5px] transition-all duration-300 max-h-[500px] overflow-y-auto  ${
        isFilterOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }
      `}
    >
      {children}
    </div>
  );
}
