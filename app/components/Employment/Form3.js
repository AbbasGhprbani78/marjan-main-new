import React, { useState } from "react";
import Input from "../module/Form/Input";
import AddRemoveForm from "../module/Form/AddRemoveForm";
import axios from "axios";
import { ToastContainerCustom, warningMessage } from "../module/Toast";

export default function Form3({
  data,
  setData,
  onSuccess,
  onPrev,
  savedSteps,
  setSavedSteps,
}) {
  const [loading, setLoading] = useState(false);
  const handleChange = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    setData(updated);
  };

  const addForm = () => {
    if (data.length >= 5) return;

    const last = data[data.length - 1];
    const allFieldsFilled = Object.keys(last)
      .filter((key) => key !== "personal_detail")
      .every((key) => last[key] !== "" && last[key] != null);

    if (!allFieldsFilled) {
      warningMessage(
        "لطفاً فرم قبلی را کامل پر کنید تا بتوانید فرم جدید اضافه کنید."
      );
      return;
    }

    setData([
      ...data,
      {
        personal_detail: 1,
        job_title: null,
        company: null,
        duration_of_cooperation: null,
        insurance_history: null,
      },
    ]);
  };

  const removeForm = (index) => {
    if (index === 0) return;
    const updated = data.filter((_, i) => i !== index);
    setData(updated);
  };

  const handleSubmit = async () => {
    setLoading(true);

    let payload = [];

    if (data.length > 0) {
      const first = data[0];
      const allFieldsFilledFirst = Object.keys(first)
        .filter((key) => key !== "personal_detail")
        .every((key) => first[key] !== "" && first[key] != null);

      if (allFieldsFilledFirst) {
        payload.push(first);
      } else {
        const emptyObj = {};
        Object.keys(first).forEach((key) => {
          emptyObj[key] =
            key === "personal_detail" ? first.personal_detail : "";
        });
        payload.push(emptyObj);
      }

      for (let i = 1; i < data.length; i++) {
        const obj = data[i];
        const allFieldsFilled = Object.keys(obj)
          .filter((key) => key !== "personal_detail")
          .every((key) => obj[key] !== "" && obj[key] != null);

        if (allFieldsFilled) {
          payload.push(obj);
        }
      }
    }

    try {
      let response;
      if (!savedSteps.form3.isSaved) {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/app/career-history/`,
          payload
        );

        if (response.status === 201) {
          console.log(response.data);
          setSavedSteps((prev) => ({
            ...prev,
            form3: { isSaved: true, id: response.data.id },
          }));
          onSuccess();
        }
      } else {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/app/career-history/${savedSteps.form3.id}/`,
          payload
        );

        if (response.status === 200) {
          onSuccess();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {data.map((job, index) => (
        <div key={index}>
          <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
            <div className="col-span-12 md:col-span-4">
              <Input
                value={job.job_title}
                onChange={(val) => handleChange(index, "job_title", val)}
                type="text"
                maxLength={256}
                label="عنوان شغل"
                onlyPersian={true}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <Input
                value={job.company}
                onChange={(val) => handleChange(index, "company", val)}
                type="text"
                maxLength={256}
                label="موسسه / شرکت"
                onlyPersian={true}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <Input
                value={job.duration_of_cooperation}
                onChange={(val) =>
                  handleChange(index, "duration_of_cooperation", val)
                }
                type="text"
                maxLength={256}
                label="مدت همکاری"
                onlyNumber={true}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
            <div className="col-span-12">
              <Input
                value={job.insurance_history}
                onChange={(val) =>
                  handleChange(index, "insurance_history", val)
                }
                type="text"
                maxLength={256}
                label="سابقه پرداخت بیمه (ماه)"
                onlyNumber={true}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="w-full mt-[1rem]">
        <AddRemoveForm
          addForm={addForm}
          removeForm={() => removeForm(data.length - 1)}
        />
      </div>

      <div className="grid grid-cols-12 gap-[1rem] w-full mt-[1rem]">
        <div className="col-span-6">
          <button
            type="button"
            onClick={onPrev}
            className="w-full flex justify-center items-center h-[34px] bg-gray-500 text-white"
          >
            قبلی
          </button>
        </div>
        <div className="col-span-6">
          <button
            disabled={loading}
            type="submit"
            className={`w-full flex justify-center items-center h-[34px] text-white bg-gray-500 transition-opacity duration-200
    ${
      loading ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"
    }`}
          >
            {loading ? "در حال ارسال" : "بعدی"}
          </button>
        </div>
      </div>
      <ToastContainerCustom />
    </form>
  );
}
