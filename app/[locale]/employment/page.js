import Employment from "@/app/components/templates/Employment";
import React from "react";

export default async function page({ params }) {
  const { locale } = await params;
  return (
    <>
      <Employment />
    </>
  );
}
