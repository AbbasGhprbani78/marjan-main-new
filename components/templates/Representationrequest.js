"use client";
import React, { useEffect, useState } from "react";
import Input from "../module/Form/Input";
import DropDown from "../module/Form/DropDown";
import Texterea from "../module/Form/Texterea";
import { successMessage, ToastContainerCustom } from "../module/Toast";
import { validateRepresentationrequest } from "@/validation/representationrequestValidate";
import { useTranslation } from "@/context/TranslationContext";
import axios from "axios";

export default function Representationrequest({
  ownership,
  warehouse,
  birthYears,
  warehouseFacilities,
  countries,
}) {
  const { t, locale } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [form, setForm] = useState({
    langs: locale,
    fullName: "",
    birthYear: "",
    educationDegree: "",
    fieldOfStudy: "",
    phoneNumber: "",
    province: "",
    country: "",
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
    if (!validateRepresentationrequest(form, setErrors, t)) return;

    setLoading(true);
    try {
      const formattedForm = {
        full_name: form.fullName,
        phone_number: form.phoneNumber,
        birth_year: Number(form.birthYear),
        education_degree: form.educationDegree,
        field_of_study: form.fieldOfStudy,
        province: Number(form.province),
        country: Number(form.country),
        store_name: form.storeName,
        store_area: Number(form.storeArea),
        store_ownership_type: Number(form.storeOwnershipType),
        store_phone: form.storePhone,
        store_address: form.storeAddress,
        warehouse_type: Number(form.warehouseType),
        warehouse_area: Number(form.warehouseArea),
        warehouse_facilities: form.warehouseFacilities,
        warehouse_ownership_type: Number(form.warehouseOwnershipType),
        warehouse_phone: form.warehousePhone,
        warehouse_address: form.warehouseAddress,
        representative_companies: form.representativeCompanies,
        foreign_tile_activity: Number(form.foreignTileActivity),
        reason_for_choosing_marjan: form.reasonForChoosingMarjan,
        sales_experience_years: Number(form.salesExperienceYears),
        additional_description: form.additionalDescription,
        langs: form.langs,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/app/representation-requests/`,
        formattedForm
      );

      if (response.status === 201) {
        setForm({
          fullName: "",
          birthYear: "",
          educationDegree: "",
          fieldOfStudy: "",
          phoneNumber: "",
          province: "",
          country: "",
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
        successMessage(t("SuccessForm"));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProvinces = async (countryId) => {
    if (!countryId) {
      setProvinces([]);
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/app/provinces/?country_id=${countryId}`,
        {
          method: "GET",
          headers: {
            "Accept-Language": locale,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch provinces");
      }

      const data = await res.json();
      setProvinces(data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
      setProvinces([]);
    }
  };

  useEffect(() => {
    if (form.country) {
      fetchProvinces(form.country);
    } else {
      setProvinces([]);
      handleFieldChange("province", "");
    }
  }, [form.country, locale]);

  const foreignActivity = [
    { id: 0, name: t("No") },
    { id: 1, name: t("Yes") },
  ];

  return (
    <div className="px-20 md:px-40 lg:px-80 mt-[130px] lg:mt-[110px]">
      <form
        className="lg:px-80 xl:px-197 mt-[1.5rem]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <p className="font-bold mb-[1.3rem]">
          {t("Manager's personal information")}
        </p>
        <div className="grid grid-cols-12 gap-[1rem] w-full">
          <div className="col-span-12 md:col-span-8">
            <Input
              value={form.fullName}
              onChange={(val) => handleFieldChange("fullName", val)}
              type="text"
              maxLength={256}
              label={t("Full Name")}
              noNumber={true}
              error={errors.fullName}
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <DropDown
              label={t("year of birth")}
              options={birthYears.map((year) => ({
                id: year?.id,
                value: year?.year,
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
              label={t("Degree")}
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
              label={t("field of study")}
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
              label={t("PhoneNumber")}
              onlyNumber={true}
              error={errors.phoneNumber}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 md:col-span-6">
            <DropDown
              value={form.country}
              onChange={(val) => handleFieldChange("country", val)}
              options={countries?.map((item) => ({
                id: item?.id,
                value: item?.name,
              }))}
              type="text"
              maxLength={256}
              label={t("Country")}
              error={errors.country}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <DropDown
              value={form.province}
              onChange={(val) => handleFieldChange("province", val)}
              options={provinces?.map((item) => ({
                id: item?.id,
                value: item?.name,
              }))}
              type="text"
              maxLength={256}
              label={t("Province")}
              error={errors.province}
            />
          </div>
        </div>
        <p className="font-bold  mt-[1.7rem] mb-[1.3rem]">
          {t("Store information")}
        </p>
        <div className="grid grid-cols-12 gap-[1rem] w-full">
          <div className="col-span-12 md:col-span-8">
            <Input
              value={form.storeName}
              onChange={(val) => handleFieldChange("storeName", val)}
              type="text"
              maxLength={256}
              label={t("Store Name")}
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
              label={t("The size of the store")}
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
              options={ownership?.map((item) => ({
                id: item?.id,
                value: item?.name,
              }))}
              error={errors.storeOwnershipType}
              label={t("Type of ownership")}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Input
              value={form.storePhone}
              onChange={(val) => handleFieldChange("storePhone", val)}
              type="text"
              maxLength={256}
              label={t("Store phone")}
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
              label={t("Store address")}
              error={errors.storeAddress}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 md:col-span-6">
            <DropDown
              value={form.warehouseType}
              onChange={(val) => handleFieldChange("warehouseType", val)}
              label={t("Warehouse type")}
              options={warehouse?.map((item) => ({
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
              label={t("Warehouse size")}
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
              options={warehouseFacilities?.map((item) => ({
                id: item?.id,
                value: item?.facility,
              }))}
              label={t("Warehouse facilities")}
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
              options={ownership?.map((item) => ({
                id: item?.id,
                value: item?.name,
              }))}
              label={t("Type of ownership")}
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
              label={t("Warehouse phone")}
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
              label={t("warehouse address")}
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
              label={t(
                "Names of companies that you have official representation in the field of tile purchasing / representation history / company name / history"
              )}
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
              label={t(
                "Are you active in the field of selling foreign tiles ?"
              )}
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
              label={t("The reason for choosing Marjan tile")}
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
              label={t("Experience in tile sales (years)")}
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
              label={t("Additional information")}
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
