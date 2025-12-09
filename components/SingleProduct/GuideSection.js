"use client";
import Link from "next/link";
import React, { useState } from "react";
import * as Icons from "iconsax-reactjs";
import Modal from "../module/Modal";
import Table from "../module/Table";
import { useLocalizedLink } from "@/utils/helper";
import { useTranslation } from "@/context/TranslationContext";
import QuestionForm from "../module/QuestionForm";
import { ToastContainerCustom } from "../module/Toast";
export default function GuideSection({
  text,
  icon,
  isLink,
  href,
  typeModel,
  subjects = [],
  dataPack = [],
  iscatalog = false,
  dataTechnical = [],
  is_industrial = false,
  value = "",
  category = "",
  id = null,
}) {
  const { localizedHref } = useLocalizedLink();
  const { t, locale } = useTranslation();
  const GuideIcon = Icons[icon];
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {iscatalog ? (
        value ? (
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-5"
          >
            <GuideIcon size="24" className="text-gray-700" />
            <p className="my-auto font-[700] text-[14px] text-gray-700">
              {text}
            </p>
          </a>
        ) : (
          <Link
            href={
              is_industrial
                ? `/${locale}/catalog?category=${category}`
                : `/${locale}/catalog?category=${category}`
            }
            className="flex gap-5"
          >
            <GuideIcon size="24" className="text-gray-700" />
            <p className="my-auto font-[700] text-[14px] text-gray-700">
              {text}
            </p>
          </Link>
        )
      ) : isLink ? (
        <a
          href={localizedHref(href)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-5"
        >
          <GuideIcon size="24" className="text-gray-700" />
          <p className="my-auto font-[700] text-[14px] text-gray-700">{text}</p>
        </a>
      ) : (
        <div
          className="flex gap-5 cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          <GuideIcon size="24" className="text-gray-700" />
          <p className="my-auto font-[700] text-[14px] text-gray-700">{text}</p>
        </div>
      )}

      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        customeWidth={typeModel !== "questions" && true}
      >
        <div className="bg-white  px-[1rem] pb-[2rem] pt-[1rem] flex flex-col ">
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
              <QuestionForm openModal={openModal} subjects={subjects} id={id} />
            </>
          ) : typeModel == "categories" ? (
            <>
              <Table
                isEn={true}
                columns={[
                  t("Size_table"),
                  t("palet_size"),
                  t("Thickness_Technical"),
                  t("Tiles per Carton"),
                  t("Tile Area per Carton (m²)"),
                  t("Approx. Weight per Carton (kg)"),
                  t("Cartons per Pallet"),
                  t("Area per Pallet (m²)"),
                  t("Approx. Weight per Pallet (kg)"),
                ]}
                data={dataPack.map((item) => ({
                  [t("Size_table")]: item.size || "-",
                  [t("palet_size")]: item?.palet_size || "-",
                  [t("Thickness_Technical")]: item?.thickness || "-",
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
                isEn={true}
                columns={[
                  t("Size_table"),
                  t("Abrasion Resistance"),
                  t("Breaking Strength"),
                  t("Chemical Resistance"),
                  t("Crazing Resistance"),
                  t("Friction Class"),
                  t("Frost Resistance"),
                  t("Impact Resistance"),
                  t("Linear Thermal Expansion Coefficient"),
                  t("Modulus of Rupture"),
                  t("Rectangularity"),
                  t("Stain Resistance"),
                  t("Straightness of Sides"),
                  t("Surface Flatness"),
                  t("Thermal Shock Resistance"),
                  t("Thickness_Technical"),
                  t("Water Absorption"),
                ]}
                data={dataTechnical.map((item) => ({
                  [t("Size_table")]: item.size || "-",
                  [t("Abrasion Resistance")]:
                    item.specifications?.abrasion_resistance || "-",
                  [t("Breaking Strength")]:
                    item.specifications?.breaking_strength || "-",
                  [t("Chemical Resistance")]:
                    item.specifications?.chemical_resistance || "-",
                  [t("Crazing Resistance")]:
                    item.specifications?.crazing_resistance || "-",
                  [t("Friction Class")]:
                    item.specifications?.friction_class || "-",
                  [t("Frost Resistance")]:
                    item.specifications?.frost_resistance || "-",
                  [t("Impact Resistance")]:
                    item.specifications?.impact_resistance || "-",
                  [t("Linear Thermal Expansion Coefficient")]:
                    item.specifications?.linear_thermal_expansion_coefficient ||
                    "-",
                  [t("Modulus of Rupture")]:
                    item.specifications?.modulus_of_rupture || "-",
                  [t("Rectangularity")]:
                    item.specifications?.rectangularity || "-",
                  [t("Stain Resistance")]:
                    item.specifications?.stain_resistance || "-",
                  [t("Straightness of Sides")]:
                    item.specifications?.straightness_of_sides || "-",
                  [t("Surface Flatness")]:
                    item.specifications?.surface_flatness || "-",
                  [t("Thermal Shock Resistance")]:
                    item.specifications?.thermal_shock_resistance || "-",
                  [t("Thickness_Technical")]:
                    item.specifications?.thickness || "-",
                  [t("Water Absorption")]:
                    item.specifications?.water_absorption || "-",
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
