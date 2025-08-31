// Form1.jsx
import React, { useState } from "react";
import DatePicker from "../module/Form/DatePicker";
import Input from "../module/Form/Input";
import DropDown from "../module/Form/DropDown";
import Texterea from "../module/Form/Texterea";
import axios from "axios";
import { validateForm1 } from "@/validation/form1Validate";

export default function Form1({
  data,
  setData,
  onSuccess,
  onPrev,
  states,
  setIdForm,
  savedSteps,
  setSavedSteps,
  idForm,
}) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!validateForm1(data, setErrors)) return;

    setLoading(true);
    try {
      let response;

      if (!savedSteps.form1.isSaved) {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/app/work-with-us/`,
          data
        );

        if (response.status === 201) {
          console.log(response.data);
          setIdForm(response.data.id);
          setSavedSteps((prev) => ({
            ...prev,
            form1: { isSaved: true, id: response.data.id },
          }));

          onSuccess();
        }
      } else {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/app/work-with-us/${idForm}`,
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

  const handleFieldChange = (field, value) => {
    setData({ ...data, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="mb-[1rem]">
        <h2 className="mt-[1rem] text-[.9rem] lg:text-[1.1rem] font-bold bg-indigo-400 p-5">
          لطفا اعداد را به انگلیسی تایپ کنید.
        </h2>
        <h2 className="mt-[1rem] text-[.9rem] lg:text-[1.1rem] font-bold bg-amber-200 p-5">
          مراحل ثبت اطلاعات را تا دریافت کد پیگیری ادامه دهید.
        </h2>
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full">
        <div className="col-span-12 md:col-span-4">
          <DropDown
            value={data.gender}
            onChange={(val) => handleFieldChange("gender", val)}
            options={[
              { id: "male", value: "مرد" },
              { id: "female", value: "زن" },
            ]}
            label="جنسیت"
            error={errors.gender}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Input
            value={data.first_name}
            onChange={(val) => handleFieldChange("first_name", val)}
            type="text"
            maxLength={256}
            label="نام"
            onlyPersian={"true"}
            error={errors.first_name}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Input
            value={data.last_name}
            onChange={(val) => handleFieldChange("last_name", val)}
            type="text"
            maxLength={256}
            label="نام خانوادگی"
            onlyPersian={"true"}
            error={errors.last_name}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12 md:col-span-4">
          <Input
            value={data.father_name}
            onChange={(val) => handleFieldChange("father_name", val)}
            type="text"
            maxLength={256}
            label="نام پدر"
            onlyPersian={"true"}
            error={errors.father_name}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Input
            value={data.certificate_number}
            onChange={(val) => handleFieldChange("certificate_number", val)}
            type="text"
            maxLength={256}
            label="شماره شناسنامه"
            onlyNumber={"true"}
            error={errors.certificate_number}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Input
            value={data.national_code}
            onChange={(val) => handleFieldChange("national_code", val)}
            type="text"
            maxLength={256}
            label="کد ملی"
            onlyNumber={"true"}
            error={errors.national_code}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <Texterea
            value={data.short_biography}
            onChange={(val) => handleFieldChange("short_biography", val)}
            maxLength={1000}
            label="بیوگرافی کوتاه"
            error={errors.short_biography}
          />
        </div>
      </div>

      <span className="font-bold mt-[1rem] block">تاریخ تولد</span>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[.5rem]">
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <DatePicker
            startYear={1330}
            endYear={1390}
            value={data.birth_date}
            onChange={(val) => handleFieldChange("birth_date", val)}
            error={errors.birth_date}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-6 md:col-span-3">
          <Input
            value={data.birth_location}
            onChange={(val) => handleFieldChange("birth_location", val)}
            type="text"
            maxLength={256}
            label="محل تولد"
            onlyPersian={"true"}
            error={errors.birth_location}
          />
        </div>
        <div className="col-span-6 md:col-span-3">
          <Input
            value={data.religion}
            onChange={(val) => handleFieldChange("religion", val)}
            type="text"
            maxLength={256}
            label="دین و مذهب"
            onlyPersian={"true"}
            error={errors.religion}
          />
        </div>
        <div className="col-span-6 md:col-span-3">
          <DropDown
            value={data.marital_status}
            onChange={(val) => handleFieldChange("marital_status", val)}
            options={[
              { id: "single", value: "مجرد" },
              { id: "married", value: "متاهل" },
            ]}
            label="وضعیت تاهل"
            error={errors.marital_status}
          />
        </div>
        {data.marital_status === "married" && (
          <div className="col-span-6 md:col-span-3">
            <Input
              value={data.spouse_job}
              onChange={(val) => handleFieldChange("spouse_job", val)}
              type="text"
              maxLength={256}
              label="شغل همسر"
              onlyPersian={"true"}
              error={errors.spouse_job}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-6 md:col-span-3">
          <Input
            value={data.fother_job}
            onChange={(val) => handleFieldChange("fother_job", val)}
            type="text"
            maxLength={256}
            label="شغل پدر"
            onlyPersian={"true"}
            error={errors.fother_job}
          />
        </div>
        <div className="col-span-6 md:col-span-3">
          <Input
            value={data.mother_job}
            onChange={(val) => handleFieldChange("mother_job", val)}
            type="text"
            maxLength={256}
            label="شغل مادر"
            onlyPersian={"true"}
            error={errors.mother_job}
          />
        </div>
        <div className="col-span-6 md:col-span-3">
          <Input
            value={data.dependents}
            onChange={(val) => handleFieldChange("dependents", val)}
            type="text"
            maxLength={256}
            label="افراد تحت تکفل"
            onlyNumber={"true"}
            error={errors.dependents}
          />
        </div>
        <div className="col-span-6 md:col-span-3">
          <Input
            value={data.height}
            onChange={(val) => handleFieldChange("height", val)}
            type="text"
            maxLength={256}
            label="قد (سانتی متر)"
            onlyNumber={"true"}
            error={errors.height}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <Input
            value={data.weight}
            onChange={(val) => handleFieldChange("weight", val)}
            type="text"
            maxLength={256}
            label="وزن (کیلوگرم)"
            onlyNumber={"true"}
            error={errors.weight}
          />
        </div>
        {data.gender === "male" && (
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <DropDown
              value={data.duty_status}
              onChange={(val) => handleFieldChange("duty_status", val)}
              options={[
                { id: "End of service", value: "پایان خدمت" },
                { id: "Included", value: "مشمول" },
                { id: "Medical exemption", value: "معافیت پزشکی" },
                { id: "Bail waiver", value: "معافیت کفالت" },
                { id: "Other cases", value: "سایر موارد" },
              ]}
              label="وضعیت نظام وظیفه"
              error={errors.duty_status}
            />
          </div>
        )}

        <div className="col-span-12 lg:col-span-6">
          <Input
            value={data.history_of_service_in__the_basij}
            onChange={(val) =>
              handleFieldChange("history_of_service_in__the_basij", val)
            }
            type="text"
            maxLength={256}
            label="در صورتی که سابقه حضور در بسیج را دارید سنوات  سوابق خود را وارد کنید (سال)"
            onlyNumber={"true"}
          />
        </div>
      </div>

      {data.duty_status === "End of service" && (
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 md:col-span-6">
            <Input
              value={data.service_deficit_amount}
              onChange={(val) =>
                handleFieldChange("service_deficit_amount", val)
              }
              type="text"
              maxLength={256}
              label="میزان کسری خدمت (ماه)"
              onlyNumber={"true"}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Input
              value={data.type_of_service_deficit}
              onChange={(val) =>
                handleFieldChange("type_of_service_deficit", val)
              }
              type="text"
              maxLength={256}
              label="نوع کسری خدمت"
              onlyPersian={"true"}
              error={errors.type_of_service_deficit}
            />
          </div>
        </div>
      )}

      {(data.duty_status === "Medical exemption" ||
        data.duty_status === "Bail waiver" ||
        data.duty_status === "Other cases") && (
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12">
            <Input
              value={data.explanation_of_the_duty_system}
              onChange={(val) =>
                handleFieldChange("explanation_of_the_duty_system", val)
              }
              type="text"
              maxLength={256}
              label="توضیحات وضعیت نظام وظیفه"
              onlyPersian={"true"}
              error={errors.explanation_of_the_duty_system}
            />
          </div>
        </div>
      )}

      {["End of service", "Other cases"].includes(data.duty_status) && (
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 md:col-span-6">
            <span className="font-bold block mb-[1rem]">تاریخ شروع خدمت</span>
            <DatePicker
              startYear={1330}
              endYear={""}
              value={data.service_start_date}
              onChange={(val) => handleFieldChange("service_start_date", val)}
              error={errors.service_start_date}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <span className="font-bold block mb-[1rem]">تاریخ پایان خدمت</span>
            <DatePicker
              startYear={1330}
              endYear={""}
              value={data.service_end_date}
              onChange={(val) => handleFieldChange("service_end_date", val)}
              error={errors.service_end_date}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12 md:col-span-4">
          <DropDown
            value={data.state}
            onChange={(val) => handleFieldChange("state", val)}
            options={states.map((state) => ({
              id: state?.id,
              value: state?.name,
            }))}
            label="استان"
            error={errors.state}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Input
            value={data.landline}
            onChange={(val) => handleFieldChange("landline", val)}
            type="text"
            maxLength={256}
            label="تلفن ثابت (به همراه کد شهر)"
            onlyNumber={"true"}
            error={errors.landline}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Input
            value={data.mobile}
            onChange={(val) => handleFieldChange("mobile", val)}
            type="text"
            maxLength={256}
            label="تلفن همراه"
            onlyNumber={"true"}
            error={errors.mobile}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <Input
            value={data.address}
            onChange={(val) => handleFieldChange("address", val)}
            type="text"
            maxLength={256}
            label="آدرس"
            error={errors.address}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full my-[1rem]">
        <div className="col-span-12 flex gap-2">
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
