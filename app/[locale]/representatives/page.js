import React from "react";
import RepresentationItem from "@/app/components/Representatives/RepresentationItem";
import SelectLocation from "@/app/components/Representatives/SelectLocation";
import { locations } from "@/app/dataMap";
import styles from "./representatives.module.css";
import MapWrapper from "@/app/components/module/MapWrapper";

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

export default async function page() {
  return (
    <main className="wrapper">
      <h1 className="sr-only">نمایندگان شرکت ما</h1>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-[2rem] px-20 md:px-40 lg:px-80  pt-[140px] lg:pt-[120px] pb-[3rem]">
        <aside className="lg:col-span-4 xl:col-span-3 flex flex-col ">
          <SelectLocation locations={locations} />
          <section
            className={`block lg:hidden lg:col-span-8 xl:col-span-9 lg:h-full inset-0 z-0  mb-[1rem] ${styles.mapContainer}`}
            aria-label="نقشه نمایندگان"
          >
            <MapWrapper />
          </section>
          <div
            className={`overflow-y-auto flex-1 ${styles.wrapperRepresentation}`}
            aria-label="لیست نمایندگان"
          >
            {[...Array(7)].map((_, i) => (
              <RepresentationItem key={i} />
            ))}
          </div>
        </aside>
        <section
          className={`hidden lg:block lg:col-span-8 xl:col-span-9 lg:h-full inset-0 z-0  ${styles.mapContainer}`}
          aria-label="نقشه نمایندگان"
        >
          <MapWrapper />
        </section>
      </div>
    </main>
  );
}
