import React from "react";
import MapWrapper from "@/app/components/module/MapWrapper";
import styles from "./contactus.module.css";
import Button2 from "@/app/components/module/Button2";
import ContactusItem from "@/app/components/ContactUs/ContactusItem";
import { fetchContactUs } from "@/services/contactus";
export default async function page({ params }) {
  const { locale } = params;
  // const contactusData = await fetchContactUs(locale);

  const province = {
    name: "اصفهان",
    cities: [
      {
        name: "دفتر مرکزی",
        phone: "03136248019",
        email: "info@marjantileco.com",
        address: "اصفهان، چهارباغ بالا، کوچه کاویان، پلاک 45",
        x: 32.654232,
        y: 51.667491,
        link: `https://www.google.com/maps?q=32.654232,51.667491`,
      },
      {
        name: "کارخانه واحد 2",
        phone: "03142290470",
        email: "info@marjantileco.com",
        address:
          "اصفهان، کمربندی شمالی نجف آباد، شهرک صنعتی منتظریه (ویلا شهر)، شرکت کاشی مرجان",
        x: 32.654232,
        y: 51.667491,
        link: `https://www.google.com/maps?q=32.654232,51.667491`,
      },
      {
        name: "کارخانه واحد 1",
        phone: "03142290477",
        email: "info@marjantileco.com",
        address:
          "اصفهان، کمربندی شمالی نجف آباد، شهرک صنعتی منتظریه (ویلا شهر)، شرکت کاشی مرجان",
        x: 32.654232,
        y: 51.667491,
        link: `https://www.google.com/maps?q=32.654232,51.667491`,
      },
    ],
  };

  return (
    <main className="wrapper">
      <h1 className="sr-only">تماس با ما</h1>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-[2rem] px-20 md:px-40 lg:px-80  pt-[140px] lg:pt-[120px] pb-[3rem]">
        <aside className="lg:col-span-4 xl:col-span-3 flex flex-col ">
          <section
            className={`block lg:hidden lg:col-span-8 xl:col-span-9 lg:h-full inset-0 z-0  mb-[1rem] ${styles.mapContainer}`}
            aria-label="نقشه دفاتر ما"
          >
            <MapWrapper province={province} />
          </section>
          <div
            className={`overflow-y-auto flex-1 ${styles.wrapperRepresentation}`}
            aria-label="لیست دفاتر"
          >
            {province?.cities?.map((info, i) => (
              <ContactusItem key={i} info={info} />
            ))}
          </div>
        </aside>
        <section
          className={`hidden lg:block lg:col-span-8 xl:col-span-9 lg:h-full inset-0 z-0  ${styles.mapContainer}`}
          aria-label="نقشه دفاتر ما"
        >
          <MapWrapper province={province} />
        </section>
      </div>
    </main>
  );
}
