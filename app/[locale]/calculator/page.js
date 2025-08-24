import CalculatorT from "@/app/components/templates/Calculator";
import { fetchSizesCalculator } from "@/services/sizesCalculator";

import React from "react";

export default async function page({ params }) {
  const { locale } = await params;

  const dataSizes = await fetchSizesCalculator(locale);
  return (
    <div className="wrapper">
      <h1 className="sr-only">براورد متراژ کاشی</h1>
      <CalculatorT dataSizes={dataSizes} />
    </div>
  );
}
