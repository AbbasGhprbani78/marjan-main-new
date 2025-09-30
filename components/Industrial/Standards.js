"use client";
import React from "react";
import CircleItem from "../module/CircleItem";

export default function Standards({ data }) {
  return (
    <div>
      <h3 className="font-medium title mb-[1.5rem] text-center md:text-start">
        {data.title}
      </h3>
      <div className="">
        <div className="gap-[2rem] md:gap-0 flex  flex-wrap items-center justify-between w-5/6 mx-auto">
          {data.standards.map((item, i) => (
            <CircleItem key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
