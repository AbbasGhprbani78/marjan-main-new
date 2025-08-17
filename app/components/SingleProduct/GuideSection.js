"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as Icons from "iconsax-reactjs";
import Modal from "../module/Modal";
import Input from "../module/Input";
import SelectDropDown from "../module/SelectDropDown";
import Button2 from "../module/Button2";
import Table from "../module/Table";
import { useLocalizedLink } from "@/utils/helper";
import { useTranslation } from "@/hook/useTranslation";
import QuestionForm from "../module/QuestionForm";
import { successMessage, ToastContainerCustom } from "../module/Toast";
export default function GuideSection({
  text,
  icon,
  isLink,
  href,
  typeModel,
  subjects = [],
}) {
  const { localizedHref } = useLocalizedLink();
  const { t } = useTranslation();
  const GuideIcon = Icons[icon];
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {isLink ? (
        <Link href={localizedHref(href)} className="flex gap-5">
          <GuideIcon size="24" className="text-gray-700" />
          <p className="my-auto font-[700] text-[14px] text-gray-700">{text}</p>
        </Link>
      ) : (
        <div
          className="flex gap-5 cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          <GuideIcon size="24" className="text-gray-700" />
          <p className="my-auto font-[700] text-[14px] text-gray-700">{text}</p>
        </div>
      )}

      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <div className="bg-white  px-[2rem] pb-[2rem] pt-[1rem] flex flex-col ">
          <div className="flex items-center justify-between pb-[2rem]">
            <span className="font-medium text-[1.2rem]">
              {typeModel == "questions"
                ? t("AskQuestion")
                : typeModel === "categories"
                ? t("CategoryTable")
                : typeModel === "properties"
                ? t("TechnicalSpecsTable")
                : null}
            </span>
            <Icons.CloseCircle
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenModal(false)}
            />
          </div>
          {typeModel == "questions" ? (
            <>
              <QuestionForm openModal={openModal} subjects={subjects} />
            </>
          ) : typeModel == "categories" ? (
            <>
              <Table
                columns={[
                  "سایز (cm)",
                  "تعداد کاشی در هرکارتن",
                  "متراژ کاشی هر کارتن (m2)",
                  "وزن تقریبی هر کارتن (kg)",
                  "تعداد کارتن هر پالت",
                  "متراژ هر پالت (m2)",
                  "وزن تقریبی هرپالت (kg)",
                ]}
                data={{
                  "سایز (cm)": "30x30",
                  "تعداد کاشی در هرکارتن": 20,
                  "متراژ کاشی هر کارتن (m2)": 1.8,
                  "وزن تقریبی هر کارتن (kg)": 25,
                  "تعداد کارتن هر پالت": 50,
                  "متراژ هر پالت (m2)": 90,
                  "وزن تقریبی هرپالت (kg)": 1200,
                }}
              />
            </>
          ) : typeModel == "properties" ? (
            <>
              <Table
                columns={[
                  "سایز (cm)",
                  "تعداد کاشی در هرکارتن",
                  "متراژ کاشی هر کارتن (m2)",
                  "وزن تقریبی هر کارتن (kg)",
                  "تعداد کارتن هر پالت",
                  "متراژ هر پالت (m2)",
                  "وزن تقریبی هرپالت (kg)",
                ]}
                data={{
                  "سایز (cm)": "30x30",
                  "تعداد کاشی در هرکارتن": 20,
                  "متراژ کاشی هر کارتن (m2)": 1.8,
                  "وزن تقریبی هر کارتن (kg)": 25,
                  "تعداد کارتن هر پالت": 50,
                  "متراژ هر پالت (m2)": 90,
                  "وزن تقریبی هرپالت (kg)": 1200,
                }}
              />
            </>
          ) : null}
        </div>
      </Modal>
      <ToastContainerCustom />
    </>
  );
}
