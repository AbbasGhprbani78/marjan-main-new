import React, { useState } from "react";
import Input from "../module/Form/Input";
import DropDown from "../module/Form/DropDown";
import Texterea from "../module/Form/Texterea";

export default function Form1() {
  return (
    <form className="w-full">
      <div className="grid grid-cols-12 gap-[1rem] w-full">
        <div className="col-span-4">
          <DropDown value="" onChange={""} options={[]} label="جنسیت" />
        </div>
        <div className="col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={200}
            label={"نام"}
            onlyPersian={true}
          />
        </div>
        <div className="col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={200}
            label={"نام خانوادگی"}
            onlyPersian={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={200}
            label={"نام پدر"}
            onlyPersian={true}
          />
        </div>
        <div className="col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={200}
            label={"شماره شناسنامه"}
            onlyNumber={true}
          />
        </div>
        <div className="col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={200}
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
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-4">1</div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-3">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={200}
            label={"محل تولد"}
            onlyPersian={true}
          />
        </div>
        <div className="col-span-3">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={200}
            label={"دین و مذهب"}
            onlyPersian={true}
          />
        </div>
        <div className="col-span-3">
          <DropDown value="" onChange={""} options={[]} label="وضعیت تاهل" />
        </div>
        <div className="col-span-3">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={200}
            label={"محل تولد"}
            onlyPersian={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-3">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={200}
            label={"شغل پدر"}
            onlyPersian={true}
          />
        </div>
        <div className="col-span-3">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={200}
            label={"شغل مادر"}
            onlyPersian={true}
          />
        </div>
        <div className="col-span-3">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={200}
            label={"افراد تحت تکفل"}
            onlyNumber={"true"}
          />
        </div>
        <div className="col-span-3">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={200}
            label={"قد (سانتی متر)"}
            onlyPersian={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-3">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={200}
            label={"وزن (کیلوگرم)"}
            onlyNumber={"true"}
          />
        </div>
        <div className="col-span-3">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={200}
            label={"شغل مادر"}
            onlyPersian={true}
          />
        </div>
        <div className="col-span-6">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={200}
            label={
              "در صورتی که سابقه حضور ئذ بسیج را دارید سنوات سوابق خود را وارد کنید (سال)"
            }
            onlyNumber={"true"}
          />
        </div>
      </div>
    </form>
  );
}
