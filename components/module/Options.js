import React from "react";

export default function Options({ setIsTrue, isTrue, text1, text2 }) {
  return (
    <div className=" flex items-center gap-[.5rem] w-full  bg-[#f1f1f1] rounded-[50px]  p-5">
      <button
        className={`${
          isTrue
            ? "bg-transparent text-[#000]"
            : "bg-white text-[#0781fe] font-bold"
        } rounded-[50px] h-[32px] flex-1`}
        onClick={() => setIsTrue(false)}
      >
        {text1}
      </button>
      <button
        className={`${
          isTrue
            ? "bg-white text-[#0781fe] font-bold"
            : "bg-transparent text-[#000]"
        } rounded-[50px] h-[32px] flex-1`}
        onClick={() => setIsTrue(true)}
      >
        {text2}
      </button>
    </div>
  );
}
