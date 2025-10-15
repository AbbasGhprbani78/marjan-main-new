import Suppliers from "@/components/templates/Suppliers";
import React from "react";
export const metadata = {
  title: "Suppliers",
};
export default async function page() {
  return (
    <div className="wrapper">
      <h1 className="sr-only">Suppliers</h1>
      <Suppliers />
    </div>
  );
}
