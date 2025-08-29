import React from "react";
import Input from "../module/Form/Input";
import AddRemoveForm from "../module/Form/AddRemoveForm";

export default function Form3() {
  return (
    <form>
      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"عنوان شغل"}
            onlyPersian={true}
          />
        </div>
        <div className="col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"موسسه / شرکت"}
            onlyPersian={true}
          />
        </div>
        <div className="col-span-4">
          <Input
            value={""}
            onChange={""}
            type={"text"}
            maxLength={256}
            label={"مدت همکاری"}
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
            label={"سابقه پرداخت بیمه (ماه)"}
            onlyNumber={"true"}
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
