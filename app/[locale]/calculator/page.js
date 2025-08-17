import CalculatorT from "@/app/components/templates/Calculator";

import React from "react";

export default async function page() {
  return (
    <div className="wrapper">
      <h1 className="sr-only">براورد متراژ کاشی</h1>
      <CalculatorT />
    </div>
  );
}
