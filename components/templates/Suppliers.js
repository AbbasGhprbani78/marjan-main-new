"use client";
import { useTranslation } from "@/context/TranslationContext";
import React, { useState } from "react";
import Input from "../module/Form/Input";
import DropDown from "../module/Form/DropDown";
import Texterea from "../module/Form/Texterea";
import { successMessage, ToastContainerCustom } from "../module/Toast";
import { validateSupliers } from "@/validation/suppliersValidate";

const services = [
  { id: 1, name: "مواد" },
  { id: 2, name: "خاک" },
  { id: 3, name: "قطعات" },
  { id: 4, name: "سایز" },
];

const countries = [
  { id: 1, name: "Afghanistan" },
  { id: 2, name: "Albania" },
  { id: 3, name: "Algeria" },
  { id: 4, name: "Andorra" },
  { id: 5, name: "Angola" },
  { id: 6, name: "Argentina" },
  { id: 7, name: "Armenia" },
  { id: 8, name: "Australia" },
  { id: 9, name: "Austria" },
  { id: 10, name: "Azerbaijan" },
  { id: 11, name: "Bahamas" },
  { id: 12, name: "Bahrain" },
  { id: 13, name: "Bangladesh" },
  { id: 14, name: "Belarus" },
  { id: 15, name: "Belgium" },
  { id: 16, name: "Belize" },
  { id: 17, name: "Benin" },
  { id: 18, name: "Bhutan" },
  { id: 19, name: "Bolivia" },
  { id: 20, name: "Bosnia and Herzegovina" },
  { id: 21, name: "Botswana" },
  { id: 22, name: "Brazil" },
  { id: 23, name: "Brunei" },
  { id: 24, name: "Bulgaria" },
  { id: 25, name: "Burkina Faso" },
  { id: 26, name: "Burundi" },
  { id: 27, name: "Cambodia" },
  { id: 28, name: "Cameroon" },
  { id: 29, name: "Canada" },
  { id: 30, name: "Cape Verde" },
  { id: 31, name: "Central African Republic" },
  { id: 32, name: "Chad" },
  { id: 33, name: "Chile" },
  { id: 34, name: "China" },
  { id: 35, name: "Colombia" },
  { id: 36, name: "Comoros" },
  { id: 37, name: "Congo" },
  { id: 38, name: "Costa Rica" },
  { id: 39, name: "Croatia" },
  { id: 40, name: "Cuba" },
  { id: 41, name: "Cyprus" },
  { id: 42, name: "Czech Republic" },
  { id: 43, name: "Denmark" },
  { id: 44, name: "Djibouti" },
  { id: 45, name: "Dominica" },
  { id: 46, name: "Dominican Republic" },
  { id: 47, name: "Ecuador" },
  { id: 48, name: "Egypt" },
  { id: 49, name: "El Salvador" },
  { id: 50, name: "Estonia" },
  { id: 51, name: "Ethiopia" },
  { id: 52, name: "Fiji" },
  { id: 53, name: "Finland" },
  { id: 54, name: "France" },
  { id: 55, name: "Gabon" },
  { id: 56, name: "Gambia" },
  { id: 57, name: "Georgia" },
  { id: 58, name: "Germany" },
  { id: 59, name: "Ghana" },
  { id: 60, name: "Greece" },
  { id: 61, name: "Greenland" },
  { id: 62, name: "Guatemala" },
  { id: 63, name: "Guinea" },
  { id: 64, name: "Guyana" },
  { id: 65, name: "Haiti" },
  { id: 66, name: "Honduras" },
  { id: 67, name: "Hungary" },
  { id: 68, name: "Iceland" },
  { id: 69, name: "India" },
  { id: 70, name: "Indonesia" },
  { id: 71, name: "Iran" },
  { id: 72, name: "Iraq" },
  { id: 73, name: "Ireland" },
  { id: 74, name: "Israel" },
  { id: 75, name: "Italy" },
  { id: 76, name: "Jamaica" },
  { id: 77, name: "Japan" },
  { id: 78, name: "Jordan" },
  { id: 79, name: "Kazakhstan" },
  { id: 80, name: "Kenya" },
  { id: 81, name: "Kuwait" },
  { id: 82, name: "Kyrgyzstan" },
  { id: 83, name: "Laos" },
  { id: 84, name: "Latvia" },
  { id: 85, name: "Lebanon" },
  { id: 86, name: "Liberia" },
  { id: 87, name: "Libya" },
  { id: 88, name: "Lithuania" },
  { id: 89, name: "Luxembourg" },
  { id: 90, name: "Madagascar" },
  { id: 91, name: "Malawi" },
  { id: 92, name: "Malaysia" },
  { id: 93, name: "Maldives" },
  { id: 94, name: "Mali" },
  { id: 95, name: "Malta" },
  { id: 96, name: "Mauritania" },
  { id: 97, name: "Mauritius" },
  { id: 98, name: "Mexico" },
  { id: 99, name: "Moldova" },
  { id: 100, name: "Monaco" },
  { id: 101, name: "Mongolia" },
  { id: 102, name: "Montenegro" },
  { id: 103, name: "Morocco" },
  { id: 104, name: "Mozambique" },
  { id: 105, name: "Myanmar" },
  { id: 106, name: "Namibia" },
  { id: 107, name: "Nepal" },
  { id: 108, name: "Netherlands" },
  { id: 109, name: "New Zealand" },
  { id: 110, name: "Nicaragua" },
  { id: 111, name: "Niger" },
  { id: 112, name: "Nigeria" },
  { id: 113, name: "North Korea" },
  { id: 114, name: "North Macedonia" },
  { id: 115, name: "Norway" },
  { id: 116, name: "Oman" },
  { id: 117, name: "Pakistan" },
  { id: 118, name: "Palestine" },
  { id: 119, name: "Panama" },
  { id: 120, name: "Paraguay" },
  { id: 121, name: "Peru" },
  { id: 122, name: "Philippines" },
  { id: 123, name: "Poland" },
  { id: 124, name: "Portugal" },
  { id: 125, name: "Qatar" },
  { id: 126, name: "Romania" },
  { id: 127, name: "Russia" },
  { id: 128, name: "Rwanda" },
  { id: 129, name: "Saudi Arabia" },
  { id: 130, name: "Senegal" },
  { id: 131, name: "Serbia" },
  { id: 132, name: "Seychelles" },
  { id: 133, name: "Singapore" },
  { id: 134, name: "Slovakia" },
  { id: 135, name: "Slovenia" },
  { id: 136, name: "Somalia" },
  { id: 137, name: "South Africa" },
  { id: 138, name: "South Korea" },
  { id: 139, name: "Spain" },
  { id: 140, name: "Sri Lanka" },
  { id: 141, name: "Sudan" },
  { id: 142, name: "Sweden" },
  { id: 143, name: "Switzerland" },
  { id: 144, name: "Syria" },
  { id: 145, name: "Taiwan" },
  { id: 146, name: "Tajikistan" },
  { id: 147, name: "Tanzania" },
  { id: 148, name: "Thailand" },
  { id: 149, name: "Togo" },
  { id: 150, name: "Tunisia" },
  { id: 151, name: "Turkey" },
  { id: 152, name: "Turkmenistan" },
  { id: 153, name: "Uganda" },
  { id: 154, name: "Ukraine" },
  { id: 155, name: "United Arab Emirates" },
  { id: 156, name: "United Kingdom" },
  { id: 157, name: "United States" },
  { id: 158, name: "Uruguay" },
  { id: 159, name: "Uzbekistan" },
  { id: 160, name: "Vatican City" },
  { id: 161, name: "Venezuela" },
  { id: 162, name: "Vietnam" },
  { id: 163, name: "Yemen" },
  { id: 164, name: "Zambia" },
  { id: 165, name: "Zimbabwe" },
];

export default function Suppliers() {
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
    });
    successMessage(t("SuccessForm"));
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

  return (
    <div className="px-20 md:px-40 lg:px-80 mt-[130px] lg:mt-[110px]">
      <h2 className=" text-[.9rem] lg:text-[1.1rem] font-bold">
        {t("Obtainingsupplierinformation")}
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
              options={countries.map((country) => ({
                id: country?.id,
                value: country?.name,
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
              label={`${t("Province")}/${t("State")}`}
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
              options={services.map((service) => ({
                id: service?.id,
                value: service?.name,
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

// DropDown
// Input
