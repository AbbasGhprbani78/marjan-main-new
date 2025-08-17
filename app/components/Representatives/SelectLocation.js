"use client";
import React, { useState } from "react";
import SelectDropDown from "../module/SelectDropDown";
import { useTranslation } from "@/hook/useTranslation";

export default function SelectLocation({ locations }) {
  const [countryId, setCountryId] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");
  const { t } = useTranslation();

  const selectedCountry = locations.find((c) => c.id === countryId);
  const provinces = selectedCountry?.provinces || [];

  const selectedProvince = provinces.find((p) => p.id === provinceId);
  const cities = selectedProvince?.cities || [];

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
