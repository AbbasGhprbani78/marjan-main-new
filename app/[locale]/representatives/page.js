import React from "react";
import { fetchRepresentatives } from "@/services/representatives";
import Representatives from "@/components/templates/Representatives";
import translations from "@/components/module/translations";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const dict = translations[locale] || translations["en"];
  const pageKey = "Representatives";

  return {
    title: `${dict.websiteName} | ${dict[pageKey] || "Representatives"}`,
  };
}
export default async function page({ params }) {
  const { locale } = await params;
  const representatives = await fetchRepresentatives(locale);

  return <Representatives representatives={representatives} />;
}
