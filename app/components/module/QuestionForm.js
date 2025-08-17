"use client";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import SelectDropDown from "./SelectDropDown";
import { useTranslation } from "@/hook/useTranslation";
import Button2 from "./Button2";
import { successMessage } from "./Toast";

export default function QuestionForm({ openModal, subjects }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      if (!/^\d*$/.test(value)) return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]: value ? "" : prev[name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.fullName) newErrors.fullName = t("NameRequired");
    if (!form.email) newErrors.email = t("EmailRequired");
    if (!form.subject) newErrors.subject = t("SubjectRequired");
    if (!form.phoneNumber) newErrors.phoneNumber = t("PhoneNumberRequired");
    if (!form.message) newErrors.message = t("MessageRequired");

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t("InvalidEmail");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.fullName);
      formData.append("email", form.email);
      formData.append("text", form.message);
      formData.append("phone", form.phoneNumber);
      formData.append("subject_id", form.subject);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/app/ask-a-question/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setErrors({});
        setForm({
          fullName: "",
          email: "",
          subject: "",
          phoneNumber: "",
          message: "",
        });

        successMessage(t("Yourquestion"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!openModal) {
      setErrors({});
      setForm({
        fullName: "",
        email: "",
        subject: "",
        phoneNumber: "",
        message: "",
      });
    }
  }, [openModal]);

  console.log(subjects);

  return (
    <form>
      <div className="max-h-[500px] overflow-y-auto ">
        <div className="grid grid-cols-12 md:gap-[3rem] md:my-[2rem]">
          <div className="pt-[20px] md:pt-0 mb-[3rem] md:mb-0 col-span-12 md:col-span-6">
            <Input
              label={t("Name")}
              name={"fullName"}
              value={form.fullName}
              onChange={handleChange}
            />
            <div>
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-[10px]">
                  {errors.fullName}
                </p>
              )}
            </div>
          </div>
          <div className=" mb-[2rem] md:mb-0 col-span-12 md:col-span-6">
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
        </div>
        <div className="grid grid-cols-12 md:gap-[3rem] md:my-[2rem] items-center">
          <div className=" mb-[3rem] md:mb-0 col-span-12 md:col-span-6">
            <SelectDropDown
              label={t("Subject")}
              name={"subject"}
              data={subjects.map((item) => ({
                id: item.id,
                name: item.title,
              }))}
              value={form.subject}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  subject: e ? e.value : "",
                }))
              }
            />
            <div>
              {errors.subject && (
                <p className="text-red-500 text-sm mt-[10px]">
                  {errors.subject}
                </p>
              )}
            </div>
          </div>
          <div className=" mb-[3rem] md:mb-0 col-span-12 md:col-span-6 ">
            <Input
              label={t("PhoneNumber")}
              name={"phoneNumber"}
              value={form.phoneNumber}
              onChange={handleChange}
            />
            <div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-[10px]">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className=" mb-[1rem]">
          <label
            htmlFor={"message"}
            className={` text-[16px] inline-block text-[var(--color-gray-900)] pb-[.5rem]`}
          >
            {t("Message")}
          </label>
          <textarea
            maxLength={700}
            value={form.message}
            onChange={handleChange}
            name="message"
            className="border w-full p-[10px]  resize-none min-h-[110px] h-[15dvh]"
          />
          <div>
            {errors.message && (
              <p className="text-red-500 text-sm mt-[10px]">{errors.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className="w-full md:w-[180px]">
        <Button2
          text={t("Send")}
          onClick={handleSubmit}
          loading={loading}
          bgblack={"#000"}
        />
      </div>
    </form>
  );
}
