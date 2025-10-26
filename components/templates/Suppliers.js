"use client";
import { useTranslation } from "@/context/TranslationContext";
import React, { useState } from "react";
import Input from "../module/Form/Input";
import DropDown from "../module/Form/DropDown";
import Texterea from "../module/Form/Texterea";
import { successMessage, ToastContainerCustom } from "../module/Toast";
import { validateSupliers } from "@/validation/suppliersValidate";
import axios from "axios";

export default function Suppliers({ suppliersData, typesOfService }) {
  const { t, locale } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    country: "",
    address: "",
    state: "",
    city: "",
    postal_code: "",
    phone_number: "",
    email: "",
    Typeofservice: "",
  });

  const handleFieldChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = async () => {
    if (!validateSupliers(form, setErrors)) return;

    setLoading(true);
    try {
      const formData = {
        ...form,
        Typeofservice: form.Typeofservice
          ? parseInt(form.Typeofservice, 10)
          : null,
        country: form.country ? parseInt(form.country, 10) : null,
      };

      if (formData.Typeofservice !== null && isNaN(formData.Typeofservice)) {
        setErrors((prev) => ({
          ...prev,
          Typeofservice: t("InvalidTypeOfService"),
        }));
        setLoading(false);
        return;
      }

      if (formData.country !== null && isNaN(formData.country)) {
        setErrors((prev) => ({
          ...prev,
          country: t("InvalidCountry"),
        }));
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/app/suppliers/`,
        formData
      );

      if (response.status === 201) {
        successMessage(t("SuccessForm"));
        setForm({
          langs: locale,
          first_name: "",
          last_name: "",
          country: "",
          address: "",
          state: "",
          city: "",
          postal_code: "",
          phone_number: "",
          email: "",
          Typeofservice: "",
        });
      }
    } catch (error) {
      console.log(error);
      setErrors((prev) => ({
        ...prev,
        general: t("SubmissionFailed"),
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-20 md:px-40 lg:px-80 mt-[130px] lg:mt-[110px]">
      <h2 className=" text-[.9rem] lg:text-[1.1rem] font-bold">
        {t("Obtaining supplier information")}
      </h2>
      <form
        className="lg:px-80 xl:px-197 mt-[1.5rem]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="grid grid-cols-12 gap-[1rem] w-full">
          <div className="col-span-12 md:col-span-6">
            <Input
              value={form.first_name}
              onChange={(val) => handleFieldChange("first_name", val)}
              type="text"
              maxLength={256}
              label={t("FirstName")}
              noNumber={true}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Input
              value={form.last_name}
              onChange={(val) => handleFieldChange("last_name", val)}
              type="text"
              maxLength={256}
              label={t("LastName")}
              noNumber={true}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 md:col-span-6">
            <DropDown
              value={form.country}
              onChange={(val) => handleFieldChange("country", val)}
              options={suppliersData.map((country) => ({
                id: country?.id,
                value: country?.country_name,
              }))}
              label={t("Country")}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Input
              value={form.state}
              onChange={(val) => handleFieldChange("state", val)}
              type="text"
              maxLength={256}
              label={`${t("Province")}`}
              noNumber={true}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 md:col-span-6">
            <Input
              value={form.city}
              onChange={(val) => handleFieldChange("city", val)}
              type="text"
              maxLength={256}
              label={t("City")}
              noNumber={true}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Input
              value={form.postal_code}
              onChange={(val) => handleFieldChange("postal_code", val)}
              type="text"
              maxLength={256}
              label={t("Postal Code")}
              onlyNumber={true}
              error={errors.postal_code}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12">
            <Texterea
              label={t("Address")}
              value={form.address}
              onChange={(val) => handleFieldChange("address", val)}
              maxLength={1000}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 md:col-span-6">
            <Input
              value={form.phone_number}
              onChange={(val) => handleFieldChange("phone_number", val)}
              type="text"
              maxLength={256}
              label={t("Phone")}
              error={errors.phone_number}
              onlyNumber={true}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Input
              value={form.email}
              onChange={(val) => handleFieldChange("email", val)}
              type="text"
              maxLength={256}
              label={t("Email")}
              error={errors.email}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 ">
            <DropDown
              value={form.Typeofservice}
              onChange={(val) => handleFieldChange("Typeofservice", val)}
              options={typesOfService.map((service) => ({
                id: service?.id,
                value: service?.service_name,
              }))}
              label={t("Type of service")}
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
