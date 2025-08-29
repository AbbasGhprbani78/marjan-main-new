import React from "react";
import DropDown from "../module/Form/DropDown";
import Input from "../module/Form/Input";
import AddRemoveForm from "../module/Form/AddRemoveForm";
import Texterea from "../module/Form/Texterea";

export default function Form2() {
  return (
    <form className="w-full">
      <p className="text-[.8rem] font-bold">
        {
          "تکمیل کلیه مقاطع تحصیلی از دیپلم به بالا به صورت جدا گانه ضروری است (در صورت عدم اراعه اطلاعات کامل به پرسشنامه ترتیب اثر داده نخواهد شد)"
        }
      </p>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-4">
          <DropDown value="" onChange={""} options={[]} label="مقطع" />
        </div>
        <div className="col-span-4">
          <DropDown value="" onChange={""} options={[]} label="رشته" />
        </div>
        <div className="col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"گرایش"}
            onlyPersian={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-4">
          <DropDown value="" onChange={""} options={[]} label="معدل" />
        </div>
        <div className="col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"موسسه آموزشی"}
            onlyPersian={true}
          />
        </div>
        <div className="col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"استان / شهر"}
            onlyPersian={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-4">
          <DropDown value="" onChange={""} options={[]} label="معدل" />
        </div>
        <div className="col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"موسسه آموزشی"}
            onlyPersian={true}
          />
        </div>
        <div className="col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"استان / شهر"}
            onlyPersian={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-3">
          <DropDown value="" onChange={""} options={[]} label="سال شروع" />
        </div>
        <div className="col-span-3">
          <DropDown value="" onChange={""} options={[]} label="ماه شروع" />
        </div>
        <div className="col-span-3">
          <DropDown value="" onChange={""} options={[]} label="سال پایان" />
        </div>
        <div className="col-span-3">
          <DropDown value="" onChange={""} options={[]} label="ماه پایان" />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <AddRemoveForm addForm={""} removeForm={""} />
      </div>
      <p className="text-[.8rem] font-bold mt-[1rem]">
        در صورتی که درحال حاضر مشغول به تحصیل هستید تعداد ماه های باقی مانده از
        تحصیلتان را بنویسید.
      </p>
      <div className="grid grid-cols-12 gap-[1rem] w-full ">
        <div className="col-span-3">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={""}
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
            label={
              "در صورتی که دوره تخصصی طی شده یا مهارت خاصی دارید ذکر نمایید"
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-2">
          <DropDown value="" onChange={""} options={[]} label="زبان" />
        </div>
        <div className="col-span-2">
          <DropDown value="" onChange={""} options={[]} label="سطح مکالمه" />
        </div>
        <div className="col-span-2">
          <DropDown value="" onChange={""} options={[]} label="سطح ترجمه" />
        </div>
        <div className="col-span-2">
          <DropDown value="" onChange={""} options={[]} label="سطح نوشتن" />
        </div>
        <div className="col-span-2">
          <DropDown value="" onChange={""} options={[]} label="سطح درک مطلب" />
        </div>
        <div className="col-span-2">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"توضیحات"}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <AddRemoveForm addForm={""} removeForm={""} />
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-6">
          <button
            type="button"
            className="w-full flex justify-center items-center h-[34px] bg-gray-500 text-white"
          >
            قبلی
          </button>
        </div>
        <div className="col-span-6">
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
