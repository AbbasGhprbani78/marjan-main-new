"use client";
import React, { useState } from "react";
import Input from "../module/Input";
import Button2 from "../module/Button2";
import SelectDropDown from "../module/SelectDropDown";
import { useTranslation } from "@/hook/useTranslation";
import { successMessage, ToastContainerCustom } from "../module/Toast";

export default function Form({ dataTypeOfActivity }) {
  const [form, setForm] = useState({
    expertise: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {};
    if (!form.expertise) {
      newErrors.expertise = t("OccupationRequired");
    }
    if (!form.firstName) {
      newErrors.firstName = t("NameRequired");
    }
    if (!form.lastName) {
      newErrors.lastName = t("LastNameRequired");
    }
    if (!form.email) {
      newErrors.email = t("EmailRequired");
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t("InvalidEmail");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("field_of_activity", form.expertise);
      formData.append("first_name", form.firstName);
      formData.append("last_name", form.lastName);
      formData.append("email", form.email);
      formData.append("phone", form.phone || "");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/app/api/newsletters/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        successMessage(t("FormSubmittedSuccessfully"));
        setErrors({});
        setForm({
          expertise: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        });
      } else {
        console.log("Failed to submit form:", response.status);
      }
    } catch (error) {
      console.log("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form>
        <div className="mb-[3rem] mt-[2rem] md:mt-0 md:mb-0 grid grid-cols-12">
          <div className="col-span-12 md:col-span-4">
            <SelectDropDown
              label={t("Fieldofactivity")}
              name={"expertise"}
              data={dataTypeOfActivity.map((item) => ({
                id: item.id,
                name: item.title,
              }))}
              value={form.expertise}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  expertise: e ? e.value : "",
                }))
              }
            />
            <div>
              {errors.expertise && (
                <p className="text-red-500 text-sm mt-[10px]">
                  {errors.expertise}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 md:gap-[3rem] md:my-[3rem]">
          <div className=" mb-[3rem] md:mb-0 col-span-12 md:col-span-6">
            <Input
              label={t("FirstName")}
              name={"firstName"}
              value={form.firstName}
              onChange={handleChange}
            />
            <div>
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-[10px]">
                  {errors.firstName}
                </p>
              )}
            </div>
          </div>
          <div className=" mb-[3rem] md:mb-0 col-span-12 md:col-span-6">
            <Input
              label={t("LastName")}
              name={"lastName"}
              value={form.lastName}
              onChange={handleChange}
            />
            <div>
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-[10px]">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-12 md:gap-[3rem] md:mb-[4rem]">
          <div className="mb-[3rem] md:mb-0 col-span-12 md:col-span-6">
            <Input
              label={t("Email")}
              name={"email"}
              value={form.email}
              onChange={handleChange}
            />
            <div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-[10px]">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="mb-[4rem] md:mb-0 col-span-12 md:col-span-6">
            <Input
              label={t("Contactnumber(optional)")}
              name={"phone"}
              value={form.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-full md:w-[180px]">
          <Button2
            text={t("Send")}
            onClick={handleSubmit}
            loading={loading}
            bgblack={"true"}
          />
        </div>
      </form>
      <ToastContainerCustom />
    </>
  );
}
