import React, { useState } from "react";
import Input from "../module/Form/Input";
import DropDown from "../module/Form/DropDown";
import Texterea from "../module/Form/Texterea";
import DatePicker from "../module/Form/DatePicker";

export default function Form1({ data, setData, onSuccess, onPrev }) {
  return (
    <form className="w-full">
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
          <DropDown value="" onChange={""} options={[]} label="جنسیت" />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"نام"}
            onlyPersian={true}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"نام خانوادگی"}
            onlyPersian={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12 md:col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"نام پدر"}
            onlyPersian={true}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"شماره شناسنامه"}
            onlyNumber={true}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"کد ملی"}
            onlyNumber={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <Texterea
            value={""}
            onChange={""}
            maxLength={1000}
            label={"بیوگرافی کوتاه"}
          />
        </div>
      </div>
      <span className="font-bold mt-[1rem] block">تاریخ تولد</span>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[.5rem]">
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <DatePicker startYear={1330} endYear={1390} />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-6 md:col-span-3">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"محل تولد"}
            onlyPersian={true}
          />
        </div>
        <div className="col-span-6 md:col-span-3">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"دین و مذهب"}
            onlyPersian={true}
          />
        </div>
        <div className="col-span-6 md:col-span-3">
          <DropDown value="" onChange={""} options={[]} label="وضعیت تاهل" />
        </div>
        <div className="col-span-6 md:col-span-3">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"شغل همسر"}
            onlyPersian={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-6 md:col-span-3">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"شغل پدر"}
            onlyPersian={true}
          />
        </div>
        <div className="col-span-6 md:col-span-3">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"شغل مادر"}
            onlyPersian={true}
          />
        </div>
        <div className="col-span-6 md:col-span-3">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"افراد تحت تکفل"}
            onlyNumber={"true"}
          />
        </div>
        <div className="col-span-6 md:col-span-3">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"قد (سانتی متر)"}
            onlyPersian={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"وزن (کیلوگرم)"}
            onlyNumber={"true"}
          />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <DropDown
            value=""
            onChange={""}
            options={[]}
            label="وضعیت نظام وظیفه"
          />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={
              "در صورتی که سابقه حضور در بسیج را دارید سنوات سوابق خود را وارد کنید (سال)"
            }
            onlyNumber={"true"}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12 md:col-span-6">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"میزان کسری خدمت (ماه)"}
            onlyNumber={"true"}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"نوع کسری خدمت"}
            onlyPersian={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"علت معافیت پزشکی"}
            onlyPersian={"true"}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12 md:col-span-6">
          <span className="font-bold block">تاریخ شروع خدمت</span>
          <div className="mt-[.5rem]">
            <DatePicker startYear={1330} endYear={1390} />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <span className="font-bold block">تاریخ پایان خدمت</span>
          <div className="mt-[.5rem]">
            <DatePicker startYear={1330} endYear={1390} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12 md:col-span-4">
          <DropDown value="" onChange={""} options={[]} label="استان" />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"تلفن ثابت (به همراه کد شهر)"}
            onlyNumber={true}
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"تلفن همراه"}
            onlyNumber={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"آدرس"}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full my-[1rem]">
        <div className="col-span-12">
          <button
            type="submit"
            className="w-full flex justify-center items-center h-[34px] bg-gray-500 text-white"
          >
            بعدی
          </button>
        </div>
      </div>
    </form>
  );
}
