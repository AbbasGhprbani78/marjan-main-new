"use client";
import React from "react";
import Accordion from "./Accardion";
import { useTranslation } from "@/context/TranslationContext";

const CategoryFilters = ({
  categories,
  handleFilterChange,
  isEmptyCheckBox,
  ismobile = false,
  filters,
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
            open={filters[key]?.length > 0 || (!ismobile && index === 0)}
            queryValues={filters[key] || []}
            filters={filters}
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
