"use client";
import { useState, useEffect } from "react";
import SelectDropDown from "../../components/module/SelectDropDown";
import { useTranslation } from "@/context/TranslationContext";

export default function SelectLocation({
  locations,
  onCitySelect,
  initialCity,
}) {
  const { t } = useTranslation();
  const [countryId, setCountryId] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");

  useEffect(() => {
    if (initialCity && !countryId && !provinceId && !cityId) {
      let foundCountry = null;
      let foundProvince = null;

      locations.forEach((country) => {
        country.provinces?.forEach((province) => {
          province.cities?.forEach((city) => {
            if (city.id === initialCity.id) {
              foundCountry = country;
              foundProvince = province;
            }
          });

          if (
            !foundCountry &&
            province.representatives?.some((rep) => rep.id === initialCity.id)
          ) {
            foundCountry = country;
            foundProvince = province;
          }
        });
      });

      if (foundCountry && foundProvince) {
        setCountryId(foundCountry.id);
        setProvinceId(foundProvince.id);

        const foundCity = foundProvince.cities?.find(
          (city) => city.id === initialCity.id
        );
        setCityId(foundCity ? initialCity.id : "");
      }
    }
  }, [initialCity, locations, countryId, provinceId, cityId]);

  const selectedCountry = locations.find((c) => c.id === countryId);
  const provinces = selectedCountry?.provinces || [];
  const selectedProvince = provinces.find((p) => p.id === provinceId);
  const cities = selectedProvince?.cities || [];
  const selectedCity = cities.find((c) => c.id === cityId);

  useEffect(() => {
    const finalSelection =
      selectedCity ||
      (selectedProvince && selectedProvince.representatives
        ? {
            id: selectedProvince.id,
            name: selectedProvince.name,
            representatives: selectedProvince.representatives,
          }
        : null);

    onCitySelect(finalSelection);
  }, [selectedCity, selectedProvince, onCitySelect]);

  return (
    <div className="flex flex-col gap-[1.5rem] mb-[2rem]">
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

      <SelectDropDown
        label={t("Province")}
        data={provinces}
        value={provinceId}
        onChange={(option) => {
          setProvinceId(option?.value || "");
          setCityId("");
        }}
        disabled={!selectedCountry}
      />

      {cities.length > 0 && (
        <SelectDropDown
          label={t("City")}
          data={cities}
          value={cityId}
          onChange={(option) => setCityId(option?.value || "")}
          disabled={!selectedProvince}
        />
      )}
    </div>
  );
}
