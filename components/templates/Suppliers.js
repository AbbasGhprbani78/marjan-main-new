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
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");

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
    description: "",
  });

  const handleFieldChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError("");
    setSelectedFile(null);

    if (!file) return;

    // محدودیت 50 مگابایت
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError(t("File size must be less than 50MB"));
      return;
    }

    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileError("");
    if (document.getElementById("file-upload")) {
      document.getElementById("file-upload").value = "";
    }
  };

  const handleSubmit = async () => {
    if (!validateSupliers(form, setErrors)) return;

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("first_name", form.first_name.trim());
      formData.append("last_name", form.last_name.trim());
      formData.append("address", form.address.trim());
      formData.append("state", form.state.trim());
      formData.append("city", form.city.trim());
      formData.append("postal_code", form.postal_code.trim());
      formData.append("phone_number", form.phone_number.trim());
      formData.append("email", form.email.trim());
      formData.append("description", form.description.trim());

      if (form.country) {
        formData.append("country", parseInt(form.country, 10));
      }
      if (form.Typeofservice) {
        formData.append("type_of_service", parseInt(form.Typeofservice, 10));
      }

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/app/suppliers/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        successMessage(t("SuccessForm"));
        setForm({
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
          description: "",
        });
        setSelectedFile(null);
        if (document.getElementById("file-upload")) {
          document.getElementById("file-upload").value = "";
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      let errorMsg = t("SubmissionFailed");

      if (error.response?.data) {
        console.log(error.response.data);
      }

      setErrors((prev) => ({
        ...prev,
        general: errorMsg,
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
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12 ">
            <Texterea
              label={t("توضیحات")}
              value={form.description}
              onChange={(val) => handleFieldChange("description", val)}
              maxLength={2000}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
          <div className="col-span-12">
            <label className="text-[.7rem] font-bold">
              پیوست فایل اختیاری حداکثر ۵۰ مگابایت
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-6 file:px-6
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-gray-500 file:text-white
                hover:file:bg-gray-600
              "
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
            />
            {fileError && (
              <p className="text-red-500 text-sm mt-1">{fileError}</p>
            )}
            {selectedFile && (
              <div className="mt-3 flex items-center justify-between bg-gray-100 p-3 rounded">
                <span className="text-sm truncate">{selectedFile.name}</span>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  حذف
                </button>
              </div>
            )}
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
