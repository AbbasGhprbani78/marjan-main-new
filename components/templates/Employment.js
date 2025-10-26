"use client";
import React, { useEffect, useState } from "react";
import Form1 from "../Employment/Form1";
import Form2 from "../Employment/Form2";
import Form3 from "../Employment/Form3";
import Form4 from "../Employment/Form4";
import { useTranslation } from "@/context/TranslationContext";
import { useRouter } from "next/navigation";

export default function Employment({
  states,
  studyData,
  dataLanguages,
  dataJobs,
  dataWaysofacquaintance,
}) {
  const router = useRouter();
  const [tab, setTab] = useState(1);
  const { locale } = useTranslation();
  const [idForm, setIdForm] = useState("");
  const [formData, setFormData] = useState({
    form1: {
      gender: null,
      first_name: null,
      last_name: null,
      father_name: null,
      certificate_number: null,
      national_code: null,
      short_biography: null,
      birth_date: null,
      birth_location: null,
      religion: null,
      marital_status: null,
      spouse_job: null,
      fother_job: null,
      mother_job: null,
      dependents: null,
      height: null,
      weight: null,
      duty_status: null,
      explanation_of_the_duty_system: null,
      service_start_date: null,
      service_end_date: null,
      type_of_service_deficit: null,
      service_deficit_amount: null,
      history_of_service_in__the_basij: null,
      state: null,
      landline: null,
      mobile: null,
      address: null,
    },
    form2: {
      personal_detail: idForm,
      educational_background: [
        {
          section: null,
          field_of_study: null,
          field_orientation: null,
          gpa: null,
          educational_institution: null,
          state: null,
          start_year: null,
          start_month: null,
          end_year: null,
          end_month: null,
          number_of_months_remaining: null,
        },
      ],

      specialization_description: null,
      other_languages: [
        {
          languages: null,
          conversation_level: null,
          translation_level: null,
          writing_level: null,
          comprehension_level: null,
          description: null,
        },
      ],
    },
    form3: [
      {
        personal_detail: idForm,
        job_title: null,
        company: null,
        duration_of_cooperation: null,
        insurance_history: null,
      },
    ],
    form4: {
      personal_detail: idForm,
      job_application: null,
      requested_rights: null,
      been_working_since: null,
      fav_job_one: null,
      fav_job_two: null,
      fav_job_three: null,
      previous_job_application_date: null,
      reagent_full_name: null,
      reagent_job: null,
      reagent_type_of_acquaintance: null,
      reagent_address: null,
      specific_disease: null,
      way_of_acquaintance: null,
      personal_image: null,
      confirmation: null,
    },
  });

  const [savedSteps, setSavedSteps] = useState({
    form1: { isSaved: false },
    form2: { isSaved: false },
    form3: { isSaved: false },
    form4: { isSaved: false },
  });

  const handleNext = () => setTab((prev) => (prev < 4 ? prev + 1 : prev));
  const handlePrev = () => setTab((prev) => (prev > 1 ? prev - 1 : prev));

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      form2: { ...prev.form2, personal_detail: idForm },
      form3: prev.form3.map((item) => ({ ...item, personal_detail: idForm })),
      form4: { ...prev.form4, personal_detail: idForm },
    }));
  }, [idForm]);

  useEffect(() => {
    if (locale !== "fa") {
      router.replace("/");
    }
  }, [locale]);

  return (
    <div
      className={`px-20 md:px-40 lg:px-80 mt-[130px] lg:mt-[110px] ${
        ["fa", "ar"].includes(locale) ? "font-fa" : "font-en"
      }`}
    >
      <div className="flex items-center border-b overflow-x-auto whitespace-nowrap hide-scrollbar">
        <p
          className={`p-8 text-[.85rem] ${tab === 1 && "border-l-1 font-bold"}`}
        >
          مشخصات فنی
        </p>
        <p
          className={`p-8 text-[.85rem] ${
            tab === 2 && "border-l border-r border-gray-500 font-bold"
          }`}
        >
          سوابق آموزشی
        </p>
        <p
          className={`p-8 text-[.85rem] ${
            tab === 3 && "border-l border-r border-gray-500 font-bold"
          }`}
        >
          سوابق شغلی
        </p>
        <p
          className={`p-8 text-[.85rem] ${
            tab === 4 && "border-l border-r border-gray-500 font-bold"
          }`}
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
            states={states}
            setIdForm={setIdForm}
            idForm={idForm}
            savedSteps={savedSteps}
            setSavedSteps={setSavedSteps}
          />
        )}
        {tab === 2 && (
          <Form2
            data={formData.form2}
            setData={(newData) => setFormData({ ...formData, form2: newData })}
            onSuccess={handleNext}
            onPrev={handlePrev}
            studyData={studyData}
            dataLanguages={dataLanguages}
            savedSteps={savedSteps}
            setSavedSteps={setSavedSteps}
          />
        )}
        {tab === 3 && (
          <Form3
            data={formData.form3}
            setData={(newData) => setFormData({ ...formData, form3: newData })}
            onSuccess={handleNext}
            onPrev={handlePrev}
            savedSteps={savedSteps}
            setSavedSteps={setSavedSteps}
          />
        )}
        {tab === 4 && (
          <Form4
            data={formData.form4}
            setData={(newData) => setFormData({ ...formData, form4: newData })}
            onSuccess={handleNext}
            onPrev={handlePrev}
            dataJobs={dataJobs}
            dataWaysofacquaintance={dataWaysofacquaintance}
            savedSteps={savedSteps}
            setSavedSteps={setSavedSteps}
          />
        )}
      </div>
    </div>
  );
}
