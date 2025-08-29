"use client";
import React, { useState } from "react";
import Form1 from "../Employment/Form1";
import Form2 from "../Employment/Form2";
import Form3 from "../Employment/Form3";
import Form4 from "../Employment/Form4";
import { useTranslation } from "@/hook/useTranslation";

export default function Employment() {
  const [tab, setTab] = useState(1);
  const { t, locale } = useTranslation();

  const [formData, setFormData] = useState({
    form1: {},
    form2: {},
    form3: {},
    form4: {},
  });

  const handleNext = () => setTab((prev) => (prev < 4 ? prev + 1 : prev));
  const handlePrev = () => setTab((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div
      className={`px-20 md:px-40 lg:px-80 mt-[130px] lg:mt-[110px] ${
        locale === "fa" ? "font-fa" : "font-en"
      }`}
    >
      <div className="flex items-center border-b overflow-x-auto whitespace-nowrap hide-scrollbar">
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
            tab === 2 && "border-l border-r border-gray-500 font-bold"
          }`}
          onClick={() => setTab(2)}
        >
          سوابق آموزشی
        </p>
        <p
          className={`cursor-pointer p-8 text-[.85rem] ${
            tab === 3 && "border-l border-r border-gray-500 font-bold"
          }`}
          onClick={() => setTab(3)}
        >
          سوابق شغلی
        </p>
        <p
          className={`cursor-pointer p-8 text-[.85rem] ${
            tab === 4 && "border-l border-r border-gray-500 font-bold"
          }`}
          onClick={() => setTab(4)}
        >
          جزییات درخواست
        </p>
      </div>

      <div className="mt-[1rem]">
        {tab === 1 && (
          <Form1
            data={formData.form1}
            setData={(newData) => setFormData({ ...formData, form1: newData })}
            onSuccess={handleNext}
            onPrev={handlePrev}
          />
        )}
        {tab === 2 && (
          <Form2
            data={formData.form2}
            setData={(newData) => setFormData({ ...formData, form2: newData })}
            onSuccess={handleNext}
            onPrev={handlePrev}
          />
        )}
        {tab === 3 && (
          <Form3
            data={formData.form3}
            setData={(newData) => setFormData({ ...formData, form3: newData })}
            onSuccess={handleNext}
            onPrev={handlePrev}
          />
        )}
        {tab === 4 && (
          <Form4
            data={formData.form4}
            setData={(newData) => setFormData({ ...formData, form4: newData })}
            onSuccess={handleNext}
            onPrev={handlePrev}
          />
        )}
      </div>
    </div>
  );
}

// gender: "",
//   first_name: "",
//   last_name: "",
//   father_name: "",
//   certificate_number: "",
//   national_code: "",
//   short_biography: "",
//   birth_date: "",
//   birth_location: "",
//   religion: "",
//   marital_status: "",
//   spouse_job: "",
//   fother_job: "",
//   mother_job: "",
//   dependents: "",
//   height: "",
//   weight: "",
//   duty_status: "",
//   explanation_of_the_duty_system: "",
//   service_start_date: "",
//   service_end_date: "",
//   type_of_service_deficit: "",
//   service_deficit_amount: "",
//   history_of_service_in__the_basij: "",
//   state: "",
//   landline: "",
//   mobile: "",
//   address: "",
