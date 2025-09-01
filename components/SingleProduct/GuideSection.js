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
  dataPack = [],
}) {
  const { localizedHref } = useLocalizedLink();
  const { t } = useTranslation();
  const GuideIcon = Icons[icon];
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {isLink ? (
        <Link href={localizedHref(href)} className="flex gap-5" target="_blank">
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
                  t("Size (cm)"),
                  t("Tiles per Carton"),
                  t("Tile Area per Carton (m²)"),
                  t("Approx. Weight per Carton (kg)"),
                  t("Cartons per Pallet"),
                  t("Area per Pallet (m²)"),
                  t("Approx. Weight per Pallet (kg)"),
                ]}
                data={dataPack.map((item) => ({
                  [t("Size (cm)")]: item.size || "-",
                  [t("Tiles per Carton")]:
                    item.number_of_tiles_per_carton || "-",
                  [t("Tile Area per Carton (m²)")]:
                    item.tile_meters_per_carton || "-",
                  [t("Approx. Weight per Carton (kg)")]:
                    item.approximate_weight_of_each_carton || "-",
                  [t("Cartons per Pallet")]:
                    item.number_of_cartons_per_pallet || "-",
                  [t("Area per Pallet (m²)")]: item.area_of_each_pallet || "-",
                  [t("Approx. Weight per Pallet (kg)")]:
                    item.approximate_weight_of_each_pallet || "-",
                }))}
              />
            </>
          ) : typeModel == "properties" ? (
            <>
              <Table
                columns={[
                  t("Size (cm)"),
                  t("Tiles per Carton"),
                  t("Tile Area per Carton (m²)"),
                  t("Approx. Weight per Carton (kg)"),
                  t("Cartons per Pallet"),
                  t("Area per Pallet (m²)"),
                  t("Approx. Weight per Pallet (kg)"),
                ]}
                data={dataPack.map((item) => ({
                  [t("Size (cm)")]: item.size || "-",
                  [t("Tiles per Carton")]:
                    item.number_of_tiles_per_carton || "-",
                  [t("Tile Area per Carton (m²)")]:
                    item.tile_meters_per_carton || "-",
                  [t("Approx. Weight per Carton (kg)")]:
                    item.approximate_weight_of_each_carton || "-",
                  [t("Cartons per Pallet")]:
                    item.number_of_cartons_per_pallet || "-",
                  [t("Area per Pallet (m²)")]: item.area_of_each_pallet || "-",
                  [t("Approx. Weight per Pallet (kg)")]:
                    item.approximate_weight_of_each_pallet || "-",
                }))}
              />
            </>
          ) : null}
        </div>
      </Modal>
      <ToastContainerCustom />
    </>
  );
}
