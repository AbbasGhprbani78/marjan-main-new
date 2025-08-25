import React from "react";
import { fetchRepresentatives } from "@/services/representatives";
import Representatives from "@/app/components/templates/Representatives";

export const metadata = {
  title: "نمایندگان ما در سراسر جهان | شرکت ما",
  description:
    "لیست نمایندگان رسمی شرکت ما در کشورهای مختلف همراه با اطلاعات تماس و موقعیت مکانی روی نقشه.",
  keywords: [
    "نمایندگان",
    "نمایندگی رسمی",
    "موقعیت نمایندگان",
    "نماینده شرکت",
    "موقعیت مکانی",
    "تماس با نمایندگی",
  ],
  openGraph: {
    title: "نمایندگان شرکت ما",
    description:
      "آدرس و اطلاعات نمایندگان شرکت ما در کشورهای مختلف را روی نقشه ببینید.",
    url: "https://yourdomain.com/representatives",
    type: "website",
    images: [
      {
        url: "/images/25.png",
        width: 1200,
        height: 630,
        alt: "نمایندگان شرکت ما",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "نمایندگان شرکت ما",
    description:
      "آدرس و اطلاعات نمایندگان شرکت ما در کشورهای مختلف را روی نقشه ببینید.",
    images: ["/images/25.png"],
  },
  alternates: {
    canonical: "https://yourdomain.com/representatives",
  },
};

export default async function page({ params }) {
  const { locale } = await params;
  const representatives = await fetchRepresentatives(locale);

  console.log(representatives);

  return <Representatives representatives={representatives} />;
}
