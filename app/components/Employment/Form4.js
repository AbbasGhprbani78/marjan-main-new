import React from "react";
import DropDown from "../module/Form/DropDown";
import Input from "../module/Form/Input";
import DatePicker from "../module/Form/DatePicker";
import Upload from "../module/Form/Upload";
export default function Form4() {
  return (
    <form className="w-full">
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-6">
          <DropDown value="" onChange={""} options={[]} label="شغل درخواستی" />
        </div>
        <div className="col-span-6">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"حقوق درخواستی ( تومان)"}
            onlyNumber={"true"}
          />
        </div>
      </div>
      <p className="text-[.8rem] font-bold mt-[1rem]">
        از چه تاریخی می توانید مشغول به کار شوید؟
      </p>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <DatePicker />
        </div>
      </div>
      <p className="text-[.8rem] font-bold mt-[1rem]">
        به چه مشاغلی علاقه مند هستید ؟
      </p>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-4">
          <DropDown value="" onChange={""} options={[]} label="اولویت 1" />
        </div>
        <div className="col-span-4">
          <DropDown value="" onChange={""} options={[]} label="اولویت 2" />
        </div>
        <div className="col-span-4">
          <DropDown value="" onChange={""} options={[]} label="اولویت 3" />
        </div>
      </div>
      <p className="text-[.8rem] font-bold mt-[1rem]">
        در صورتی که قبلا برای استخدام در این شرکت اقدام نموده اید تاریخ آن را
        وارد نمایید.
      </p>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <DatePicker />
        </div>
      </div>
      <p className="text-[.8rem] font-bold mt-[1rem]">معرف</p>
      <p className="text-[.8rem] font-bold mt-[1rem]">
        مشخصات یک نفر که ترجیحا از خویشاوندانتان نباشد را به عنوان معرف به طور
        کامل بنویسد.
      </p>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"نام و نام خانوادگی"}
            onlyPersian={"true"}
          />
        </div>
        <div className="col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"شغل"}
            onlyPersian={"true"}
          />
        </div>
        <div className="col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"نوع آشنایی"}
            onlyPersian={"true"}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-9">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"آدرس"}
          />
        </div>
        <div className="col-span-3">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"تلفن"}
            onlyNumber={"true"}
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
            label={
              "در صورت داشتن بیماری خاص یا سابقه جراحی نام آن یا نوع عمل جراحی را ثبت فرمایید."
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <DropDown
            value=""
            onChange={""}
            options={[]}
            label="از چه طریقی جهت استخدام به این شرکت معرفی شده و یا از استخدام این شرکت مطلع شده اید ؟"
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-12">
          <Upload
            label={"تصویر پرسنلی (با فرمت jpg )"}
            value={""}
            onChange={""}
          />
        </div>
      </div>
      <div className="flex items-start gap-5 mt-[1rem]">
        <input type="checkbox" value={""} onChange={""} className="mt-4" />
        <p className="text-[.8rem] font-bold">
          تایید میکنم که به پرسش های فوق با آگاهی صحیح از مفهوم آنها به طور کامل
          و صحیح پاسخ داده ام وشرکت مرجان می تواند درباره آنها تحقیق نماید و
          چنانچه کذب هر یک از پاسخ ها محرز گردد شرکت حق دارد در هر مرحله از
          استخدام به کار استخدام خاتمه دهد و در این صورت حق ادعای هرگونه حقی را
          از خود سلب می نمایم.
        </p>
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
            ارسال
          </button>
        </div>
      </div>
    </form>
  );
}
