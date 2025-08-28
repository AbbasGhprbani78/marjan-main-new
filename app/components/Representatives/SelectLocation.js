"use client";
import { useState, useEffect } from "react";
import SelectDropDown from "../../components/module/SelectDropDown";
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

  // useEffect(() => {
  //   fetch("/api/ip")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("IP Info:", data);
  //       if (data.x && data.y) {
  //         const nearest = findNearestCity(locations, data.x, data.y);
  //         if (nearest) {
  //           setCountryId(nearest.countryId);
  //           setProvinceId(nearest.provinceId);
  //           if (onProvinceSelect) {
  //             const prov = locations
  //               .find((c) => c.id === nearest.countryId)
  //               ?.provinces.find((p) => p.id === nearest.provinceId);
  //             onProvinceSelect(prov || null);
  //           }
  //         }
  //       }
  //     });
  // }, [locations, onProvinceSelect]);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         console.log("مختصات کاربر:", latitude, longitude);
  //         const nearest = findNearestCity(locations, latitude, longitude);
  //         if (nearest) {
  //           setCountryId(nearest.countryId);
  //           setProvinceId(nearest.provinceId);
  //           if (onProvinceSelect) {
  //             const prov = locations
  //               .find((c) => c.id === nearest.countryId)
  //               ?.provinces.find((p) => p.id === nearest.provinceId);
  //             onProvinceSelect(prov || null);
  //           }
  //         }
  //       },
  //       (err) => console.error("کاربر اجازه دسترسی به GPS را نداد", err)
  //     );
  //   }
  // }, [locations, onProvinceSelect]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("http://ip-api.com/json");
        const data = await res.json();
        console.log("موقعیت کاربر از IP:", data);
        const nearest = findNearestCity(locations, data.lat, data.lon);
        if (nearest) {
          setCountryId(nearest.countryId);
          setProvinceId(nearest.provinceId);
          if (onProvinceSelect) {
            const prov = locations
              .find((c) => c.id === nearest.countryId)
              ?.provinces.find((p) => p.id === nearest.provinceId);
            onProvinceSelect(prov || null);
          }
        }
      } catch (err) {
        console.error("مشکل در دریافت موقعیت کاربر:", err);
      }
    };

    fetchLocation();
  }, [locations, onProvinceSelect]);

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

function distance(lat1, lon1, lat2, lon2) {
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  return Math.sqrt(dLat * dLat + dLon * dLon);
}

function findNearestCity(countries, userX, userY) {
  let nearestCity = null;
  let minDist = Infinity;

  countries.forEach((country) => {
    country.provinces.forEach((province) => {
      province.cities.forEach((city) => {
        const dist = distance(userX, userY, city.x, city.y);
        if (dist < minDist) {
          minDist = dist;
          nearestCity = {
            countryId: country.id,
            provinceId: province.id,
            cityId: city.id,
          };
        }
      });
    });
  });

  return nearestCity;
}
