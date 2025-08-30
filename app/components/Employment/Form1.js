// Form1.jsx
import React, { useState } from "react";
import DatePicker from "../module/Form/DatePicker";
import Input from "../module/Form/Input";
import DropDown from "../module/Form/DropDown";
import Texterea from "../module/Form/Texterea";
import axios from "axios";
import { validateForm1 } from "@/validation/form1Validate";

export default function Form1({ data, setData, onSuccess, onPrev, states }) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!validateForm1(data, setErrors)) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/app/work-with-us/`,
        data
      );
      if (response.status === 201) {
        console.log(response.data);
        onSuccess();
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
            onChange={(val) => setData({ ...data, gender: val })}
            options={[
              { id: "Male", value: "مرد" },
              { id: "Female", value: "زن" },
            ]}
            label="جنسیت"
            error={errors.gender}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Input
            value={data.first_name}
            onChange={(val) => setData({ ...data, first_name: val })}
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
            onChange={(val) => setData({ ...data, last_name: val })}
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
            onChange={(val) => setData({ ...data, father_name: val })}
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
            onChange={(val) => setData({ ...data, certificate_number: val })}
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
            onChange={(val) => setData({ ...data, national_code: val })}
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
            onChange={(val) => setData({ ...data, short_biography: val })}
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
            onChange={(val) => setData({ ...data, birth_date: val })}
            error={errors.birth_date}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-6 md:col-span-3">
          <Input
            value={data.birth_location}
            onChange={(val) => setData({ ...data, birth_location: val })}
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
            onChange={(val) => setData({ ...data, religion: val })}
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
            onChange={(val) => setData({ ...data, marital_status: val })}
            options={[
              { id: "Single", value: "مجرد" },
              { id: "Married", value: "متاهل" },
            ]}
            label="وضعیت تاهل"
            error={errors.marital_status}
          />
        </div>
        {data.marital_status === "married" && (
          <div className="col-span-6 md:col-span-3">
            <Input
              value={data.spouse_job}
              onChange={(val) => setData({ ...data, spouse_job: val })}
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
            onChange={(val) => setData({ ...data, fother_job: val })}
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
            onChange={(val) => setData({ ...data, mother_job: val })}
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
            onChange={(val) => setData({ ...data, dependents: val })}
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
            onChange={(val) => setData({ ...data, height: val })}
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
            onChange={(val) => setData({ ...data, weight: val })}
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
              onChange={(val) => setData({ ...data, duty_status: val })}
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
              setData({
                ...data,
                history_of_service_in__the_basij: val,
              })
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
                setData({
                  ...data,
                  service_deficit_amount: val,
                })
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
                setData({
                  ...data,
                  type_of_service_deficit: val,
                })
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
                setData({
                  ...data,
                  explanation_of_the_duty_system: val,
                })
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
              endYear={1490}
              value={data.service_start_date}
              onChange={(val) => setData({ ...data, service_start_date: val })}
              error={errors.service_start_date}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <span className="font-bold block mb-[1rem]">تاریخ پایان خدمت</span>
            <DatePicker
              startYear={1330}
              endYear={1490}
              value={data.service_end_date}
              onChange={(val) => setData({ ...data, service_end_date: val })}
              error={errors.service_end_date}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12 md:col-span-4">
          <DropDown
            value={data.state}
            onChange={(val) => setData({ ...data, state: val })}
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
            onChange={(val) => setData({ ...data, landline: val })}
            type="text"
            maxLength={256}
            label="تلفن ثابت (به همراه کد شهر)"
            onlyNumber={"true"}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Input
            value={data.mobile}
            onChange={(val) => setData({ ...data, mobile: val })}
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
            onChange={(val) => setData({ ...data, address: val })}
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
