"use client";
import React, { useState } from "react";
import SelectLocation from "../Representatives/SelectLocation";
import MapWrapper from "../module/MapWrapper";
import RepresentationItem from "../Representatives/RepresentationItem";
import styles from "../../[locale]/representatives/representatives.module.css";

export default function Representatives({ representatives }) {
  const [selectedProvince, setSelectedProvince] = useState(null);

  console.log(selectedProvince);
  return (
    <main className="wrapper">
      <h1 className="sr-only">نمایندگان شرکت ما</h1>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-[2rem] px-20 md:px-40 lg:px-80  pt-[140px] lg:pt-[120px] lg:pb-[3rem]">
        <aside className="lg:col-span-4 xl:col-span-3 flex flex-col ">
          <SelectLocation
            locations={representatives}
            onProvinceSelect={setSelectedProvince}
          />
          <section
            className={`block lg:hidden lg:col-span-8 xl:col-span-9 lg:h-full inset-0 z-0  mb-[1rem] ${styles.mapContainer}`}
            aria-label="نقشه نمایندگان"
          >
            <MapWrapper province={selectedProvince} />
          </section>
          <div
            className={`overflow-y-auto flex-1 ${styles.wrapperRepresentation}`}
            aria-label="لیست نمایندگان"
          >
            {selectedProvince?.cities?.map((rep) => (
              <RepresentationItem key={rep.id} city={rep} />
            ))}
          </div>
        </aside>
        <section
          className={`hidden lg:block lg:col-span-8 xl:col-span-9 lg:h-full inset-0 z-0  ${styles.mapContainer}`}
          aria-label="نقشه نمایندگان"
        >
          <MapWrapper province={selectedProvince} />
        </section>
      </div>
    </main>
  );
}
