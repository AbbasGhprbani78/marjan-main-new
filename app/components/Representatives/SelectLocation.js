"use client";
import React, { useEffect, useState } from "react";
import SelectDropDown from "../module/SelectDropDown";
import { useTranslation } from "@/hook/useTranslation";
export default function SelectLocation({ locations, onProvinceSelect }) {
  const [countryId, setCountryId] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const { t } = useTranslation();

  const selectedCountry = locations.find((c) => c.id === countryId);
  const provinces = selectedCountry?.provinces || [];

  const selectedProvince = provinces.find((p) => p.id === provinceId);

  useEffect(() => {
    if (onProvinceSelect) {
      onProvinceSelect(selectedProvince || null);
    }
  }, [selectedProvince, onProvinceSelect]);

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
          }}
        />
      </div>
    </div>
  );
}
