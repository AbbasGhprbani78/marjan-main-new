import React, { useState } from "react";
import DropDown from "../module/Form/DropDown";
import Input from "../module/Form/Input";
import DatePicker from "../module/Form/DatePicker";
import Upload from "../module/Form/Upload";
import axios from "axios";
import { validateForm4 } from "@/validation/form4Validate";
import { successMessage, ToastContainerCustom } from "../module/Toast";

export default function Form4({
  data,
  setData,
  onSuccess,
  onPrev,
  dataJobs,
  dataWaysofacquaintance,
  savedSteps,
  setSavedSteps,
}) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [idForm4, setIdForm4] = useState("");

  const handleSubmit = async () => {
    if (!validateForm4(data, setErrors)) return;
    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === "personal_image" && data[key] instanceof File) {
          formData.append(key, data[key]);
        } else if (key !== "personal_image") {
          formData.append(key, data[key] || "");
        }
      });

      if (idForm4) {
        formData.append("id", idForm4);
      }
      let response;

      if (!savedSteps.form4.isSaved) {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/app/request-details/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.status === 201) {
          setIdForm4(response.data.id);
          setSavedSteps((prev) => ({
            ...prev,
            form4: { isSaved: true },
          }));
          successMessage("فرم با موفقیت تکمیل شد");
        }
      } else {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/app/request-details/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.status === 200) {
          successMessage("فرم با موفقیت تکمیل شد");
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
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12 md:col-span-6">
          <DropDown
            value={data.job_application}
            onChange={(val) => {
              setData({ ...data, job_application: val });
              setErrors((prev) => ({ ...prev, job_application: "" }));
            }}
            options={dataJobs.map((item) => ({ id: item.id, value: item.job }))}
            label="شغل درخواستی"
            error={errors.job_application}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <Input
            value={data.requested_rights}
            onChange={(val) => {
              setData({ ...data, requested_rights: val });
              setErrors((prev) => ({ ...prev, requested_rights: "" }));
            }}
            type="text"
            maxLength={256}
            label="حقوق درخواستی (تومان)"
            onlyNumber={true}
            error={errors.requested_rights}
          />
        </div>
      </div>

      <p className="text-[.8rem] font-bold mt-[1rem]">
        از چه تاریخی می توانید مشغول به کار شوید؟
      </p>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <DatePicker
            value={data.been_working_since}
            onChange={(val) => {
              setData({ ...data, been_working_since: val });
              setErrors((prev) => ({ ...prev, been_working_since: "" }));
            }}
            startYear={1404}
            endYear={""}
            error={errors.been_working_since}
          />
        </div>
      </div>

      <p className="text-[.8rem] font-bold mt-[1rem]">
        به چه مشاغلی علاقه مند هستید؟
      </p>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12 md:col-span-4">
          <DropDown
            value={data.fav_job_one}
            onChange={(val) => {
              setData({ ...data, fav_job_one: val });
              setErrors((prev) => ({ ...prev, fav_job_one: "" }));
            }}
            options={dataJobs.map((item) => ({ id: item.id, value: item.job }))}
            label="اولویت 1"
            error={errors.fav_job_one}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <DropDown
            value={data.fav_job_two}
            onChange={(val) => {
              setData({ ...data, fav_job_two: val });
              setErrors((prev) => ({ ...prev, fav_job_two: "" }));
            }}
            options={dataJobs.map((item) => ({ id: item.id, value: item.job }))}
            label="اولویت 2"
            error={errors.fav_job_two}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <DropDown
            value={data.fav_job_three}
            onChange={(val) => {
              setData({ ...data, fav_job_three: val });
              setErrors((prev) => ({ ...prev, fav_job_three: "" }));
            }}
            options={dataJobs.map((item) => ({ id: item.id, value: item.job }))}
            label="اولویت 3"
            error={errors.fav_job_three}
          />
        </div>
      </div>

      <p className="text-[.8rem] font-bold mt-[1rem]">
        در صورتی که قبلا برای استخدام در این شرکت اقدام نموده اید تاریخ آن را
        وارد نمایید.
      </p>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <DatePicker
            value={data.previous_job_application_date}
            onChange={(val) =>
              setData({ ...data, previous_job_application_date: val })
            }
            startYear={1372}
            endYear={""}
            useCurrentYearAsEnd={true}
          />
        </div>
      </div>

      <p className="text-[.8rem] font-bold mt-[1rem]">معرف</p>
      <p className="text-[.8rem] font-bold mt-[1rem]">
        مشخصات یک نفر که ترجیحا از خویشاوندانتان نباشد را به عنوان معرف به طور
        کامل بنویسد.
      </p>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12 md:col-span-4">
          <Input
            value={data.reagent_full_name}
            onChange={(val) => {
              setData({ ...data, reagent_full_name: val });
              setErrors((prev) => ({ ...prev, reagent_full_name: "" }));
            }}
            type="text"
            maxLength={256}
            label="نام و نام خانوادگی"
            onlyPersian={true}
            error={errors.reagent_full_name}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Input
            value={data.reagent_job}
            onChange={(val) => {
              setData({ ...data, reagent_job: val });
              setErrors((prev) => ({ ...prev, reagent_job: "" }));
            }}
            type="text"
            maxLength={256}
            label="شغل"
            onlyPersian={true}
            error={errors.reagent_job}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Input
            value={data.reagent_type_of_acquaintance}
            onChange={(val) => {
              setData({ ...data, reagent_type_of_acquaintance: val });
              setErrors((prev) => ({
                ...prev,
                reagent_type_of_acquaintance: "",
              }));
            }}
            type="text"
            maxLength={256}
            label="نوع آشنایی"
            onlyPersian={true}
            error={errors.reagent_type_of_acquaintance}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12 md:col-span-9">
          <Input
            value={data.reagent_address}
            onChange={(val) => {
              setData({ ...data, reagent_address: val });
              setErrors((prev) => ({ ...prev, reagent_address: "" }));
            }}
            type="text"
            maxLength={256}
            label="آدرس"
            error={errors.reagent_address}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <Input
            value={data.reagent_phone}
            onChange={(val) => {
              setData({ ...data, reagent_phone: val });
              setErrors((prev) => ({ ...prev, reagent_phone: "" }));
            }}
            type="text"
            maxLength={256}
            label="تلفن"
            onlyNumber={true}
            error={errors.reagent_phone}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <Input
            value={data.specific_disease}
            onChange={(val) => {
              setData({ ...data, specific_disease: val });
              setErrors((prev) => ({ ...prev, specific_disease: "" }));
            }}
            type="text"
            maxLength={256}
            label="در صورت داشتن بیماری خاص یا سابقه جراحی نام آن یا نوع عمل جراحی را ثبت فرمایید."
            error={errors.specific_disease}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <DropDown
            value={data.way_of_acquaintance}
            onChange={(val) => {
              setData({ ...data, way_of_acquaintance: val });
              setErrors((prev) => ({ ...prev, way_of_acquaintance: "" }));
            }}
            options={dataWaysofacquaintance.map((item) => ({
              id: item.id,
              value: item.way,
            }))}
            label="از چه طریقی جهت استخدام به این شرکت معرفی شده و یا از استخدام این شرکت مطلع شده اید ؟"
            error={errors.way_of_acquaintance}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <Upload
            label="تصویر پرسنلی (با فرمت jpg)"
            value={data.personal_image}
            onChange={(val) => {
              setData({ ...data, personal_image: val });
              setErrors((prev) => ({ ...prev, personal_image: "" }));
            }}
            error={errors.personal_image}
          />
        </div>
      </div>

      <div className="flex items-start gap-5 mt-[1rem]">
        <input
          type="checkbox"
          checked={data.confirmation || false}
          onChange={(e) => {
            setData({ ...data, confirmation: e.target.checked });
            setErrors((prev) => ({ ...prev, confirmation: "" }));
          }}
          className="mt-4"
        />
        <p className="text-[.8rem] font-bold">
          تایید میکنم که به پرسش های فوق با آگاهی صحیح از مفهوم آنها به طور کامل
          و صحیح پاسخ داده ام و شرکت مرجان می تواند درباره آنها تحقیق نماید و
          چنانچه کذب هر یک از پاسخ ها محرز گردد شرکت حق دارد در هر مرحله از
          استخدام به کار استخدام خاتمه دهد و در این صورت حق ادعای هرگونه حقی را
          از خود سلب می نمایم.
        </p>
      </div>
      {errors.confirmation && (
        <span className="text-red-500 text-sm">{errors.confirmation}</span>
      )}

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-6">
          <button
            type="button"
            onClick={onPrev}
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
      <ToastContainerCustom />
    </form>
  );
}
