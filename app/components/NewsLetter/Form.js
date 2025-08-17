"use client";
import React, { useState } from "react";
import Input from "../module/Input";
import Button2 from "../module/Button2";
import SelectDropDown from "../module/SelectDropDown";
import { useTranslation } from "@/hook/useTranslation";

export default function Form() {
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

  const handleSubmit = (e) => {
    e.preventDefault();

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
      const response = fetch("https://api.example.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setErrors({});
        setForm({
          expertise: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        });
      }
    } catch (error) {
      console.log("Error submitting form:", error);
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
              data={[
                {
                  id: 1,
                  name: "معماری",
                },
                { id: 2, name: "مصرف کننده" },
                { id: 3, name: "پیمانکار ساختمانی" },
                { id: 4, name: "فروشنده‌ی کاشی" },
                { id: 5, name: "صادر کننده" },
                { id: 6, name: "تحقیقات" },
                { id: 8, name: "سایر" },
              ]}
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
    </>
  );
}
