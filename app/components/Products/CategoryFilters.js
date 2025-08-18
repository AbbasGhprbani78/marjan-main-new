"use client";
import React from "react";
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
