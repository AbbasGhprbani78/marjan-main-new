"use client";
import React, { useState } from "react";
import Form1 from "../Employment/Form1";
import Form2 from "../Employment/Form2";
import Form4 from "../Employment/Form4";
import Form3 from "../Employment/Form3";
import { useTranslation } from "@/hook/useTranslation";

export default function Employment() {
  const [tab, setTab] = useState(1);
  const { t, locale } = useTranslation();
  return (
    <>
      <h1 className="sr-only">Employment</h1>
      <div
        className={`px-20 md:px-40 lg:px-80 mt-[110px] ${
          locale === "fa" ? "font-fa" : "font-en"
        }`}
      >
        <div className="flex items-center border-b">
          <p
            className={`cursor-pointer p-8 text-[.85rem] ${
              tab === 1 && "border-l-1 font-bold"
            }`}
            onClick={() => setTab(1)}
          >
            مشخصات فنی
          </p>
          <p
            className={`cursor-pointer p-8 text-[.85rem] ${
              tab === 2 ? "border-l border-r border-gray-500 font-bold" : ""
            }`}
            onClick={() => setTab(2)}
          >
            سوابق آموزشی
          </p>

          <p
            className={`cursor-pointer p-8 text-[.85rem] ${
              tab === 3 ? "border-l border-r border-gray-500 font-bold" : ""
            }`}
            onClick={() => setTab(3)}
          >
            سوابق شغلی
          </p>
          <p
            className={`cursor-pointer p-8 text-[.85rem] ${
              tab === 4 ? "border-l border-r border-gray-500 font-bold" : ""
            }`}
            onClick={() => setTab(4)}
          >
            جزییات درخواست
          </p>
        </div>
        <div>
          <h2 className="mt-[1rem] text-[1.1rem] font-bold bg-indigo-400 p-5">
            لطفا اعداد را به انگلیسی تایپ کنید.
          </h2>
          <h2 className="mt-[1rem] text-[1.1rem] font-bold bg-amber-200 p-5">
            مراحل ثبت اطلاعات را تا دریافت کد پیگیری ادامه دهید.
          </h2>
        </div>
        <div className="mt-[1rem]">
          {tab === 1 && <Form1 />}
          {tab === 2 && <Form2 />}
          {tab === 3 && <Form3 />}
          {tab === 4 && <Form4 />}
        </div>
      </div>
    </>
  );
}
