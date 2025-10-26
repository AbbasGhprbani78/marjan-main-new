import React from "react";
import { fetchContactUs } from "@/services/contactus";
import translations from "@/components/module/translations";
import ContactusPageClient from "./ContactusPageClient";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const dict = translations[locale] || translations["en"];
  const pageKey = "Contact Us";

  return {
    title: `${dict.websiteName} | ${dict[pageKey] || "Contact Us"}`,
  };
}

export default async function page({ params }) {
  const { locale } = params;
  const contactusData = await fetchContactUs(locale);

  return <ContactusPageClient contactusData={contactusData} locale={locale} />;
}
