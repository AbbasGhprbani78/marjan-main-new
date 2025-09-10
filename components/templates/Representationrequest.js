"use client";
import React, { useState } from "react";
import { useTranslation } from "@/hook/useTranslation";
import Input from "../module/Form/Input";
import DropDown from "../module/Form/DropDown";
import Texterea from "../module/Form/Texterea";
import axios from "axios";
import { successMessage, ToastContainerCustom } from "../module/Toast";
import { validateRepresentationrequest } from "@/validation/representationrequestValidate";

const province = [
  { id: 1, name: "آذربایجان شرقی" },
  { id: 2, name: "آذربایجان غربی" },
  { id: 3, name: "اردبیل" },
  { id: 4, name: "اصفهان" },
  { id: 5, name: "البرز" },
  { id: 6, name: "ایلام" },
  { id: 7, name: "بوشهر" },
  { id: 8, name: "تهران" },
  { id: 9, name: "چهارمحال و بختیاری" },
  { id: 10, name: "خراسان جنوبی" },
  { id: 11, name: "خراسان رضوی" },
  { id: 12, name: "خراسان شمالی" },
  { id: 13, name: "خوزستان" },
  { id: 14, name: "زنجان" },
  { id: 15, name: "سمنان" },
  { id: 16, name: "سیستان و بلوچستان" },
  { id: 17, name: "فارس" },
  { id: 18, name: "قزوین" },
  { id: 19, name: "قم" },
  { id: 20, name: "کردستان" },
  { id: 21, name: "کرمان" },
  { id: 22, name: "کرمانشاه" },
  { id: 23, name: "کهگیلویه و بویراحمد" },
  { id: 24, name: "گلستان" },
  { id: 25, name: "گیلان" },
  { id: 26, name: "لرستان" },
  { id: 27, name: "مازندران" },
  { id: 28, name: "مرکزی" },
  { id: 29, name: "هرمزگان" },
  { id: 30, name: "همدان" },
  { id: 31, name: "یزد" },
];

const storeOwnershipType = [
  {
    id: 1,
    name: "اختصاصی",
  },
  {
    id: 2,
    name: "استیجاری",
  },
];

const typeOfWarehouse = [
  {
    id: 1,
    name: "باز",
  },
  {
    id: 2,
    name: "سرپوشیده",
  },
  {
    id: 3,
    name: "هردو",
  },
];

const warehouseFacilities = [
  {
    id: 1,
    name: "رمپ",
  },
  {
    id: 2,
    name: "لیفتراک",
  },
  {
    id: 3,
    name: "هردو",
  },
  {
    id: 4,
    name: "هیچ کدام",
  },
];

const foreignActivity = [
  { id: 1, name: "بله" },
  { id: 2, name: "خیر" },
];

const years = [];

for (let i = 1330; i <= 1390; i++) {
  years.push({ id: i, name: i });
}

export default function Representationrequest() {
  const { t, locale } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    fullName: "",
    birthYear: "",
    educationDegree: "",
    fieldOfStudy: "",
    phoneNumber: "",
    province: "",
    storeName: "",
    storeArea: "",
    storeOwnershipType: "",
    storePhone: "",
    storeAddress: "",
    warehouseType: "",
    warehouseArea: "",
    warehouseFacilities: "",
    warehouseOwnershipType: "",
    warehousePhone: "",
    warehouseAddress: "",
    representativeCompanies: "",
    foreignTileActivity: "",
    reasonForChoosingMarjan: "",
    salesExperienceYears: "",
    additionalDescription: "",
  });

  const handleFieldChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = async () => {
    if (!validateRepresentationrequest(form, setErrors)) return;

    setForm({});
    successMessage(t("SuccessForm"));
    setForm({
      fullName: "",
      birthYear: "",
      educationDegree: "",
      fieldOfStudy: "",
      phoneNumber: "",
      province: "",
      storeName: "",
      storeArea: "",
      storeOwnershipType: "",
      storePhone: "",
      storeAddress: "",
      warehouseType: "",
      warehouseArea: "",
      warehouseFacilities: "",
      warehouseOwnershipType: "",
      warehousePhone: "",
      warehouseAddress: "",
      representativeCompanies: "",
      foreignTileActivity: "",
      reasonForChoosingMarjan: "",
      salesExperienceYears: "",
      additionalDescription: "",
    });
    // setLoading(true);
    // try {
    //   let response;

    //   response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}//`, form);

    //   if (response.status === 201) {
    //     console.log(response.address);
    //     successMessage(t("SuccessForm"));
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setLoading(false);
    // }
  };

  console.log(form);
  return (
    <div className="px-20 md:px-40 lg:px-80 mt-[130px] lg:mt-[110px]">
      <form
        className="lg:px-80 xl:px-197 mt-[1.5rem]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <p className="font-bold mb-[1.3rem]">اطلاعات شخصی مدیر</p>
        <div className="grid grid-cols-12 gap-[1rem] w-full">
          <div className="col-span-12 md:col-span-8">
            <Input
              value={form.fullName}
              onChange={(val) => handleFieldChange("fullName", val)}
              type="text"
              maxLength={256}
              label={"نام و نام خانوادگی"}
              noNumber={true}
              onlyPersian={true}
              error={errors.fullName}
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <DropDown
              label="سال تولد"
              options={years.map((year) => ({
                id: year?.id,
                value: year?.name,
              }))}
              value={form.birthYear}
              onChange={(val) => handleFieldChange("birthYear", val)}
              error={errors.birthYear}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 md:col-span-6">
            <Input
              value={form.educationDegree}
              onChange={(val) => handleFieldChange("educationDegree", val)}
              type="text"
              maxLength={256}
              label={"مدرک تحصیلی"}
              noNumber={true}
              error={errors.educationDegree}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Input
              value={form.fieldOfStudy}
              onChange={(val) => handleFieldChange("fieldOfStudy", val)}
              type="text"
              maxLength={256}
              label={"رشته تحصیلی"}
              noNumber={true}
              error={errors.fieldOfStudy}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 ">
            <Input
              value={form.phoneNumber}
              onChange={(val) => handleFieldChange("phoneNumber", val)}
              type="text"
              maxLength={256}
              label={"تلفن همراه"}
              onlyNumber={true}
              error={errors.phoneNumber}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 md:col-span-6">
            <DropDown
              value={form.province}
              onChange={(val) => handleFieldChange("province", val)}
              options={province.map((item) => ({
                id: item?.id,
                value: item?.name,
              }))}
              type="text"
              maxLength={256}
              label={"استان"}
              error={errors.province}
            />
          </div>
        </div>
        <p className="font-bold  mt-[1.7rem] mb-[1.3rem]">اطلاعات فروشگاه</p>
        <div className="grid grid-cols-12 gap-[1rem] w-full">
          <div className="col-span-12 md:col-span-8">
            <Input
              value={form.storeName}
              onChange={(val) => handleFieldChange("storeName", val)}
              type="text"
              maxLength={256}
              label={"نام فروشگاه"}
              noNumber={true}
              error={errors.storeName}
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <Input
              value={form.storeArea}
              onChange={(val) => handleFieldChange("storeArea", val)}
              type="text"
              maxLength={256}
              label={"متراژ فروشگاه"}
              error={errors.storeArea}
              onlyNumber={true}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 md:col-span-6">
            <DropDown
              value={form.storeOwnershipType}
              onChange={(val) => handleFieldChange("storeOwnershipType", val)}
              type="text"
              options={storeOwnershipType.map((item) => ({
                id: item?.id,
                value: item?.name,
              }))}
              error={errors.storeOwnershipType}
              label={"نوع مالکیت"}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Input
              value={form.storePhone}
              onChange={(val) => handleFieldChange("storePhone", val)}
              type="text"
              maxLength={256}
              label={"تلفن فروشگاه"}
              onlyNumber={true}
              error={errors.storePhone}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12">
            <Texterea
              value={form.storeAddress}
              onChange={(val) => handleFieldChange("storeAddress", val)}
              type="text"
              maxLength={1000}
              label={"آدرس فروشگاه"}
              error={errors.storeAddress}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 md:col-span-6">
            <DropDown
              value={form.warehouseType}
              onChange={(val) => handleFieldChange("warehouseType", val)}
              label={"نوع انبار"}
              options={typeOfWarehouse.map((item) => ({
                id: item?.id,
                value: item?.name,
              }))}
              error={errors.warehouseType}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Input
              value={form.warehouseArea}
              onChange={(val) => handleFieldChange("warehouseArea", val)}
              type="text"
              maxLength={256}
              label={"متراژ انبار"}
              onlyNumber={true}
              error={errors.warehouseArea}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 ">
            <DropDown
              value={form.warehouseFacilities}
              onChange={(val) => handleFieldChange("warehouseFacilities", val)}
              options={warehouseFacilities.map((item) => ({
                id: item?.id,
                value: item?.name,
              }))}
              label={"امکانات انبار"}
              error={errors.warehouseFacilities}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 ">
            <DropDown
              value={form.warehouseOwnershipType}
              onChange={(val) =>
                handleFieldChange("warehouseOwnershipType", val)
              }
              options={storeOwnershipType.map((item) => ({
                id: item?.id,
                value: item?.name,
              }))}
              label={"نوع مالکیت"}
              error={errors.warehouseOwnershipType}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 ">
            <Input
              value={form.warehousePhone}
              onChange={(val) => handleFieldChange("warehousePhone", val)}
              type="text"
              maxLength={256}
              label={"تلفن انبار"}
              onlyNumber={true}
              error={errors.warehousePhone}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12">
            <Texterea
              value={form.warehouseAddress}
              onChange={(val) => handleFieldChange("warehouseAddress", val)}
              type="text"
              maxLength={256}
              label={"آدرس انبار"}
              error={errors.warehouseAddress}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12">
            <Texterea
              value={form.representativeCompanies}
              onChange={(val) =>
                handleFieldChange("representativeCompanies", val)
              }
              type="text"
              maxLength={256}
              label={
                "نام شرکت هایی که در زمینه خرید کاشی نمایندگی رسمی دارید /سابقه نمایندگی / نام شرکت / سابقه"
              }
              error={errors.representativeCompanies}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 ">
            <DropDown
              value={form.foreignTileActivity}
              onChange={(val) => handleFieldChange("foreignTileActivity", val)}
              options={foreignActivity.map((item) => ({
                id: item?.id,
                value: item?.name,
              }))}
              label={"آیا در زمینه فروش کاشی های خارجی فعالیت دارید ؟"}
              error={errors.foreignTileActivity}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 ">
            <Input
              value={form.reasonForChoosingMarjan}
              onChange={(val) =>
                handleFieldChange("reasonForChoosingMarjan", val)
              }
              type="text"
              maxLength={256}
              label={"علت انتخاب کاشی مرجان"}
              onlyPersian={true}
              error={errors.reasonForChoosingMarjan}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 ">
            <Input
              value={form.salesExperienceYears}
              onChange={(val) => handleFieldChange("salesExperienceYears", val)}
              type="text"
              maxLength={256}
              label={"سابقه فعالیت در زمینه فروش کاشی( سال )"}
              onlyNumber={true}
              error={errors.salesExperienceYears}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12">
            <Texterea
              value={form.additionalDescription}
              onChange={(val) =>
                handleFieldChange("additionalDescription", val)
              }
              type="text"
              maxLength={526}
              label={"توضیحات تکمیلی"}
              error={errors.additionalDescription}
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
              {loading ? t("Sending") : t("Send")}
            </button>
          </div>
        </div>
      </form>
      <ToastContainerCustom />
    </div>
  );
}
