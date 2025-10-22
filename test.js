"use client";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("./Map"), { ssr: false });

export default function MapWrapper({ province, city }) {
  // If a specific city is selected, show only that city
  // Otherwise, show all cities in the selected province
  const reps = city ? [city] : province?.cities || [];

  return <Map reps={reps} />;
}
/////////////////
"use client";
import { useState, useEffect } from "react";
import SelectDropDown from "../../components/module/SelectDropDown";
import { useTranslation } from "@/context/TranslationContext";

export default function SelectLocation({
  locations,
  onProvinceSelect,
  onCitySelect,
}) {
  const [countryId, setCountryId] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");
  const { t } = useTranslation();

  const selectedCountry = locations.find((c) => c.id === countryId);
  const provinces = selectedCountry?.provinces || [];
  const selectedProvince = provinces.find((p) => p.id === provinceId);
  const cities = selectedProvince?.cities || [];
  const selectedCity = cities.find((c) => c.id === cityId);



  useEffect(() => {
    if (onProvinceSelect) {
      onProvinceSelect(selectedProvince || null);
    }
  }, [selectedProvince, onProvinceSelect]);

  useEffect(() => {
    if (onCitySelect) {
      onCitySelect(selectedCity || null);
    }
  }, [selectedCity, onCitySelect]);

  return (
    <div>
      <div className="mb-[2rem]">
        <SelectDropDown
          label={t("Country")}
          data={locations}
          value={countryId}
          onChange={(option) => {
            setCountryId(option?.value || "");
            setProvinceId("");
            setCityId("");
          }}
        />
      </div>

      <div className="mb-[2rem]">
        <SelectDropDown
          label={t("Province")}
          data={provinces}
          value={provinceId}
          onChange={(option) => {
            setProvinceId(option?.value || "");
            setCityId("");
          }}
        />
      </div>

      <div className="mb-[2rem]">
        <SelectDropDown
          label={t("City")}
          data={cities}
          value={cityId}
          onChange={(option) => {
            setCityId(option?.value || "");
          }}
        />
      </div>
    </div>
  );
}
/////////////////////////////////
"use client";
import React, { useState } from "react";
import SelectLocation from "../Representatives/SelectLocation";
import MapWrapper from "../module/MapWrapper";
import RepresentationItem from "../Representatives/RepresentationItem";
import styles from "../../app/[locale]/representatives/representatives.module.css";

export default function Representatives({ representatives }) {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);



  return (
    <main className="wrapper">
      <h1 className="sr-only">نمایندگان شرکت ما</h1>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-[2rem] px-20 md:px-40 lg:px-80  pt-[140px] lg:pt-[120px] lg:pb-[3rem]">
        <aside className="lg:col-span-4 xl:col-span-3 flex flex-col ">
          <SelectLocation
            locations={representatives}
            onProvinceSelect={setSelectedProvince}
            onCitySelect={setSelectedCity}
          />
          <section
            className={`block lg:hidden lg:col-span-8 xl:col-span-9 lg:h-full inset-0 z-0  mb-[1rem] ${styles.mapContainer}`}
            aria-label="نقشه نمایندگان"
          >
            <MapWrapper province={selectedProvince} city={selectedCity} />
          </section>
          <div
            className={`overflow-y-auto flex-1 ${styles.wrapperRepresentation}`}
            aria-label="لیست نمایندگان"
          >
            {selectedCity ? (
              <RepresentationItem city={selectedCity} />
            ) : (
              selectedProvince?.cities?.map((rep, i) => (
                <RepresentationItem key={i} city={rep} />
              ))
            )}
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
