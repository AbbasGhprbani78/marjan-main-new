import React from "react";
import { fetchRepresentatives } from "@/services/representatives";
import Representatives from "@/components/templates/Representatives";

export const metadata = {
  title: "representatives",
};

export default async function page({ params }) {
  const { locale } = await params;
  const representatives = await fetchRepresentatives(locale);

  console.log(representatives);

  return <Representatives representatives={representatives} />;
}
