import React, { useState } from "react";
import DropDown from "../module/Form/DropDown";
import Input from "../module/Form/Input";
import AddRemoveForm from "../module/Form/AddRemoveForm";
import Texterea from "../module/Form/Texterea";
import { validateForm2 } from "@/validation/form2Validate";
import axios from "axios";

export default function Form2({
  data,
  setData,
  onSuccess,
  onPrev,
  studyData,
  dataLanguages,
  savedSteps,
  setSavedSteps,
}) {
  const addSection = () => {
    if (data.educational_background.length < 5) {
      setData({
        ...data,
        educational_background: [
          ...data.educational_background,
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
      });
    }
  };

  const removeSection = (index) => {
    if (data.educational_background.length > 1) {
      const newArr = [...data.educational_background];
      newArr.splice(index, 1);
      setData({ ...data, educational_background: newArr });
    }
  };

  const handleChange = (index, field, value) => {
    const newArr = [...data.educational_background];
    newArr[index][field] = value;
    setData({ ...data, educational_background: newArr });
    setErrors((prev) => ({ ...prev, [`${field}_${index}`]: "" }));
  };

  const handleLangChange = (index, field, value) => {
    const newArr = [...data.other_languages];
    newArr[index][field] = value;
    setData({ ...data, other_languages: newArr });
    setErrors((prev) => ({ ...prev, [`${field}_${index}`]: "" }));
  };

  const addLang = () => {
    if (data.other_languages.length < 3) {
      setData({
        ...data,
        other_languages: [
          ...data.other_languages,
          {
            languages: null,
            conversation_level: null,
            translation_level: null,
            writing_level: null,
            comprehension_level: null,
            description: null,
          },
        ],
      });
    }
  };

  const removeLang = (index) => {
    if (data.other_languages.length > 1) {
      const newArr = [...data.other_languages];
      newArr.splice(index, 1);
      setData({ ...data, other_languages: newArr });
    }
  };

  const yearOptions = Array.from({ length: 1405 - 1330 + 1 }, (_, i) => {
    const year = 1330 + i;
    return { id: year, value: year };
  });

  const monthOptions = [
    { id: "فروردین", value: 1 },
    { id: "اردیبهشت", value: 2 },
    { id: "خرداد", value: 3 },
    { id: "تیر", value: 4 },
    { id: "مرداد", value: 5 },
    { id: "شهریور", value: 6 },
    { id: "مهر", value: 7 },
    { id: "آبان", value: 8 },
    { id: "آذر", value: 9 },
    { id: "دی", value: 10 },
    { id: "بهمن", value: 11 },
    { id: "اسفند", value: 12 },
  ];

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!validateForm2(data, setErrors)) return;

    if (data.specialization_description) {
      const lastIndex = data.educational_background.length - 1;
      if (lastIndex >= 0) {
        data.educational_background[lastIndex] = {
          ...data.educational_background[lastIndex],
          specialization_description: data.specialization_description,
        };
      }
    }
    setLoading(true);

    try {
      let response;

      if (!savedSteps.form2.isSaved) {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/app/educational-background/`,
          data
        );

        if (response.status === 201) {
          setSavedSteps((prev) => ({
            ...prev,
            form2: { isSaved: true },
          }));

          const eduIds = response.data.educational_background_ids || [];
          const updatedEducationalBackground = data.educational_background.map(
            (item, index) => ({
              ...item,
              id: eduIds[index] || null,
            })
          );

          const langIds = response.data.other_language_ids || [];
          const updatedOtherLanguages = data.other_languages.map(
            (item, index) => ({
              ...item,
              id: langIds[index] || null,
            })
          );

          setData({
            ...data,
            educational_background: updatedEducationalBackground,
            other_languages: updatedOtherLanguages,
          });

          setSavedSteps((prev) => ({
            ...prev,
            form2: {
              isSaved: true,
              id: response.data.personal_detail_id,
            },
          }));

          onSuccess();
        }
      } else {
        console.log(JSON.stringify(data));
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/app/educational-background/`,
          data
        );

        if (response.status === 200) {
          onSuccess();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <p className="text-[.8rem] font-bold">
        {
          "تکمیل کلیه مقاطع تحصیلی از دیپلم به بالا به صورت جدا گانه ضروری است (در صورت عدم اراعه اطلاعات کامل به پرسشنامه ترتیب اثر داده نخواهد شد)"
        }
      </p>
      {data.educational_background.map((edu, index) => (
        <div className="w-full" key={index}>
          <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
            <div className="col-span-12 md:col-span-4">
              <DropDown
                value={edu.section}
                onChange={(val) => handleChange(index, "section", val)}
                options={[
                  { id: "Undergraduate", value: "زیر دیپلم" },
                  { id: "Diploma", value: "دیپلم" },
                  { id: "Postgraduate diploma", value: "فوق دیپلم" },
                  { id: "Bachelors degree", value: "لیسانس" },
                  { id: "Masters degree", value: "فوق لیسانس" },
                  { id: "Doctorate", value: "دکترا" },
                ]}
                label="مقطع"
                error={errors[`section_${index}`]}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <DropDown
                value={edu.field_of_study}
                onChange={(val) => handleChange(index, "field_of_study", val)}
                options={studyData.map((study) => ({
                  id: study.id,
                  value: study.field,
                }))}
                label="رشته"
                error={errors[`field_of_study_${index}`]}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <Input
                value={edu.field_orientation}
                onChange={(val) =>
                  handleChange(index, "field_orientation", val)
                }
                type="text"
                maxLength={256}
                label="گرایش"
                onlyPersian={true}
                error={errors[`field_orientation_${index}`]}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
            <div className="col-span-12 md:col-span-4">
              <DropDown
                value={edu.gpa}
                onChange={(val) => handleChange(index, "gpa", val)}
                options={[
                  { id: 10, value: 10 },
                  { id: 11, value: 11 },
                  { id: 12, value: 12 },
                  { id: 13, value: 13 },
                  { id: 14, value: 14 },
                  { id: 15, value: 15 },
                  { id: 16, value: 16 },
                  { id: 17, value: 17 },
                  { id: 18, value: 18 },
                  { id: 19, value: 19 },
                  { id: 20, value: 20 },
                ]}
                label="معدل"
                error={errors[`gpa_${index}`]}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <Input
                value={edu.educational_institution}
                onChange={(val) =>
                  handleChange(index, "educational_institution", val)
                }
                type="text"
                maxLength={256}
                label="موسسه آموزشی"
                onlyPersian={true}
                error={errors[`educational_institution_${index}`]}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <Input
                value={edu.state}
                onChange={(val) => handleChange(index, "state", val)}
                type="text"
                maxLength={256}
                label="استان / شهر"
                onlyPersian={true}
                error={errors[`state_${index}`]}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
            <div className="col-span-6 md:col-span-3">
              <DropDown
                value={edu.start_year}
                onChange={(val) => handleChange(index, "start_year", val)}
                options={yearOptions}
                label="سال شروع"
                error={errors[`start_year_${index}`]}
              />
            </div>
            <div className="col-span-6 md:col-span-3">
              <DropDown
                value={edu.start_month}
                onChange={(val) => handleChange(index, "start_month", val)}
                options={monthOptions}
                label="ماه شروع"
                error={errors[`start_month_${index}`]}
              />
            </div>
            <div className="col-span-6 md:col-span-3">
              <DropDown
                value={edu.end_year}
                onChange={(val) => handleChange(index, "end_year", val)}
                options={yearOptions}
                label="سال پایان"
                error={errors[`end_year_${index}`]}
              />
            </div>
            <div className="col-span-6 md:col-span-3">
              <DropDown
                value={edu.end_month}
                onChange={(val) => handleChange(index, "end_month", val)}
                options={monthOptions}
                label="ماه پایان"
                error={errors[`end_month_${index}`]}
              />
            </div>
          </div>
          <p className="text-[.8rem] font-bold mt-[1rem]">
            در صورتی که درحال حاضر مشغول به تحصیل هستید تعداد ماه های باقی مانده
            از تحصیلتان را بنویسید.
          </p>

          <div className="grid grid-cols-12 gap-[1rem] w-full">
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <Input
                value={edu.number_of_months_remaining || ""}
                onChange={(val) =>
                  handleChange(index, "number_of_months_remaining", val)
                }
                type="text"
                maxLength={256}
                label=""
                onlyNumber={true}
              />
            </div>
          </div>
        </div>
      ))}

      <div className=" w-full mt-[1rem]">
        <AddRemoveForm addForm={addSection} removeForm={removeSection} />
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <Texterea
            value={data.specialization_description}
            onChange={(val) =>
              setData({ ...data, specialization_description: val })
            }
            maxLength={1000}
            label={
              "در صورتی که دوره تخصصی طی شده یا مهارت خاصی دارید ذکر نمایید"
            }
          />
        </div>
      </div>

      {data.other_languages.map((lang, index) => (
        <div
          className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]"
          key={index}
        >
          <div className="col-span-6 md:col-span-4 lg:col-span-2">
            <DropDown
              value={lang.languages}
              onChange={(val) => handleLangChange(index, "languages", val)}
              options={dataLanguages.map((item) => ({
                id: item.id,
                value: item?.languages,
              }))}
              label="زبان"
              error={errors[`languages_${index}`]}
            />
          </div>
          <div className="col-span-6 md:col-span-4 lg:col-span-2">
            <DropDown
              value={lang.conversation_level}
              onChange={(val) =>
                handleLangChange(index, "conversation_level", val)
              }
              options={[
                { id: "Weak", value: "ضعیف" },
                { id: "Medium", value: "متوسط" },
                { id: "Good", value: "خوب" },
                { id: "Excellent", value: "عالی" },
              ]}
              label="سطح مکالمه"
              error={errors[`conversation_level_${index}`]}
            />
          </div>
          <div className="col-span-6 md:col-span-4 lg:col-span-2">
            <DropDown
              value={lang.translation_level}
              onChange={(val) =>
                handleLangChange(index, "translation_level", val)
              }
              options={[
                { id: "Weak", value: "ضعیف" },
                { id: "Medium", value: "متوسط" },
                { id: "Good", value: "خوب" },
                { id: "Excellent", value: "عالی" },
              ]}
              label="سطح ترجمه"
              error={errors[`translation_level_${index}`]}
            />
          </div>
          <div className="col-span-6 md:col-span-4 lg:col-span-2">
            <DropDown
              value={lang.writing_level}
              onChange={(val) => handleLangChange(index, "writing_level", val)}
              options={[
                { id: "Weak", value: "ضعیف" },
                { id: "Medium", value: "متوسط" },
                { id: "Good", value: "خوب" },
                { id: "Excellent", value: "عالی" },
              ]}
              label="سطح نوشتن"
              error={errors[`writing_level_${index}`]}
            />
          </div>
          <div className="col-span-6 md:col-span-4 lg:col-span-2">
            <DropDown
              value={lang.comprehension_level}
              onChange={(val) =>
                handleLangChange(index, "comprehension_level", val)
              }
              options={[
                { id: "Weak", value: "ضعیف" },
                { id: "Medium", value: "متوسط" },
                { id: "Good", value: "خوب" },
                { id: "Excellent", value: "عالی" },
              ]}
              label="سطح درک مطلب"
              error={errors[`comprehension_level_${index}`]}
            />
          </div>
          <div className="col-span-6 md:col-span-4 lg:col-span-2">
            <Input
              value={lang.description}
              onChange={(val) => handleLangChange(index, "description", val)}
              type="text"
              maxLength={256}
              label="توضیحات"
              error={errors[`description_${index}`]}
            />
          </div>
        </div>
      ))}

      <div className=" w-full mt-[1rem]">
        <AddRemoveForm addForm={addLang} removeForm={removeLang} />
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-6">
          <button
            onClick={onPrev}
            type="button"
            className="w-full flex justify-center items-center h-[34px] bg-gray-500 text-white"
          >
            قبلی
          </button>
        </div>
        <div className="col-span-6">
          <button
            disabled={loading}
            type="submit"
            className={`w-full flex justify-center items-center h-[34px] text-white bg-gray-500 transition-opacity duration-200
    ${
      loading ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"
    }`}
          >
            {loading ? "در حال ارسال" : "بعدی"}
          </button>
        </div>
      </div>
    </form>
  );
}
