"use client";
import React, { useState } from "react";
import Accordion from "./Accardion";
import { useTranslation } from "@/hook/useTranslation";

const CategoryFilters = ({
  categories,
  handleFilterChange,
  isEmptyCheckBox,
  ismobile = false,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {Object.entries(categories).map(([key, values], index) => {
        const accordion = (
          <Accordion
            key={key}
            itemsCheckBox={values}
            filterKey={key}
            onFilterChange={handleFilterChange}
            title={t(key)}
            isEmptyCheckBox={isEmptyCheckBox}
            defaultOpen={ismobile ? false : index === 0}
          />
        );

        return index === 0 ? (
          <div key={key} className="mt-[.8rem] md:m2-0">
            {accordion}
          </div>
        ) : (
          accordion
        );
      })}
    </>
  );
};

export default CategoryFilters;

{
  /* <div className="mt-[.8rem]  md:m2-0">
        <Accordion
          itemsCheckBox={categories.color}
          filterKey="color"
          onFilterChange={handleFilterChange}
          title={t("Color")}
          isEmptyCheckBox={isEmptyCheckBox}
        />
      </div>
      <Accordion
        itemsCheckBox={categories.environment}
        filterKey="environment"
        onFilterChange={handleFilterChange}
        title={t("Environment")}
        isEmptyCheckBox={isEmptyCheckBox}
      />
      <Accordion
        itemsCheckBox={categories.industry}
        filterKey="industry"
        onFilterChange={handleFilterChange}
        title={t("Industry")}
        isEmptyCheckBox={isEmptyCheckBox}
      />
      <Accordion
        itemsCheckBox={categories.size}
        filterKey="size"
        onFilterChange={handleFilterChange}
        title={t("Size")}
        isEmptyCheckBox={isEmptyCheckBox}
      />
      <Accordion
        itemsCheckBox={categories.style}
        filterKey="style"
        onFilterChange={handleFilterChange}
        title={t("Style")}
        isEmptyCheckBox={isEmptyCheckBox}
      />
      <Accordion
        itemsCheckBox={categories.thickness}
        filterKey="thickness"
        onFilterChange={handleFilterChange}
        title={t("Thickness")}
        isEmptyCheckBox={isEmptyCheckBox}
      /> */
}
