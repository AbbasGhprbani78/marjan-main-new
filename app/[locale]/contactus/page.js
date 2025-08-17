import React from "react";
import MapWrapper from "@/app/components/module/MapWrapper";
import RepresentationItem from "@/app/components/Representatives/RepresentationItem";
import styles from "./contactus.module.css";
import Button2 from "@/app/components/module/Button2";
import ContactusItem from "@/app/components/ContactUs/ContactusItem";
export default async function page() {
  return (
    <main className="wrapper">
      <h1 className="sr-only">تماس با ما</h1>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-[2rem] px-20 md:px-40 lg:px-80  pt-[140px] lg:pt-[120px] pb-[3rem]">
        <aside className="lg:col-span-4 xl:col-span-3 flex flex-col ">
          <section
            className={`block lg:hidden lg:col-span-8 xl:col-span-9 lg:h-full inset-0 z-0  mb-[1rem] ${styles.mapContainer}`}
            aria-label="نقشه دفاتر ما"
          >
            <MapWrapper />
          </section>
          <div
            className={`overflow-y-auto flex-1 ${styles.wrapperRepresentation}`}
            aria-label="لیست دفاتر"
          >
            {[...Array(7)].map((_, i) => (
              <ContactusItem key={i} />
            ))}
          </div>
        </aside>
        <section
          className={`hidden lg:block lg:col-span-8 xl:col-span-9 lg:h-full inset-0 z-0  ${styles.mapContainer}`}
          aria-label="نقشه دفاتر ما"
        >
          <MapWrapper />
        </section>
      </div>
    </main>
  );
}
