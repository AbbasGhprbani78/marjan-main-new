"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import SelectLocation from "../Representatives/SelectLocation";
import MapWrapper from "../module/MapWrapper";
import RepresentationItem from "../Representatives/RepresentationItem";
import styles from "../../app/[locale]/representatives/representatives.module.css";
import axios from "axios";

export default function Representatives({ representatives }) {
  const [selectedCity, setSelectedCity] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [initialCitySet, setInitialCitySet] = useState(false);
  const [focusedRepresentative, setFocusedRepresentative] = useState(null);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const findClosestRepresentative = useCallback(
    (userLat, userLon) => {
      let closestCity = null;
      let minDistance = Infinity;

      representatives.forEach((country) => {
        country.provinces?.forEach((province) => {
          province.cities?.forEach((city) => {
            city.representatives?.forEach((rep) => {
              if (rep.x && rep.y) {
                const distance = calculateDistance(
                  userLat,
                  userLon,
                  rep.x,
                  rep.y
                );
                if (distance < minDistance) {
                  minDistance = distance;
                  closestCity = city;
                }
              }
            });
          });
        });
      });

      return closestCity;
    },
    [representatives]
  );

  const handleAddressClick = (representative) => {
    setFocusedRepresentative(representative);
  };

  useEffect(() => {
    setFocusedRepresentative(null);
  }, [selectedCity]);

  const [ip, setIp] = useState("");

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        setIp(data.ip);

        return axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/app/api/ip-to-xy/`,
          { params: { ip: data.ip } }
        );
      })
      .then((res) => {
        const { x: latitude, y: longitude } = res.data;

        const closestCity = findClosestRepresentative(latitude, longitude);

        if (closestCity && !initialCitySet) {
          setSelectedCity(closestCity);
          setInitialCitySet(true);
        }
      })
      .catch((err) => console.error(err));
  }, [initialCitySet, findClosestRepresentative]);

  return (
    <main className="wrapper">
      <h1 className="sr-only">نمایندگان شرکت ما</h1>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-[2rem] px-20 md:px-40 lg:px-80 pt-[140px] lg:pt-[120px] lg:pb-[3rem]">
        <aside className="lg:col-span-4 xl:col-span-3 flex flex-col">
          <SelectLocation
            locations={representatives}
            onCitySelect={setSelectedCity}
            initialCity={selectedCity}
          />

          <section
            className={`block lg:hidden lg:col-span-8 xl:col-span-9 lg:h-full inset-0 z-0 mb-[1rem] ${styles.mapContainer}`}
            aria-label="نقشه نمایندگان"
          >
            <MapWrapper
              reps={
                focusedRepresentative
                  ? [focusedRepresentative]
                  : selectedCity?.representatives || []
              }
              userLocation={userLocation}
              focusedRep={focusedRepresentative}
            />
          </section>

          <div
            className={`overflow-y-auto flex-1 ${styles.wrapperRepresentation}`}
            aria-label="لیست نمایندگان"
          >
            {selectedCity?.representatives?.map((rep, index) => (
              <RepresentationItem
                key={`${rep.id || "rep"}-${rep.phone || ""}-${
                  rep.link || ""
                }-${index}`}
                city={rep}
                onAddressClick={handleAddressClick}
              />
            ))}
          </div>
        </aside>

        <section
          className={`hidden lg:block lg:col-span-8 xl:col-span-9 lg:h-full inset-0 z-0 ${styles.mapContainer}`}
          aria-label="نقشه نمایندگان"
        >
          <MapWrapper
            reps={
              focusedRepresentative
                ? [focusedRepresentative]
                : selectedCity?.representatives || []
            }
            userLocation={userLocation}
            focusedRep={focusedRepresentative}
          />
        </section>
      </div>
    </main>
  );
}

// useEffect(() => {
//   fetch("https://ipwho.is")
//     .then((res) => res.json())
//     .then((data) => {
//       if (data && data.latitude && data.longitude) {
//         setUserLocation([data.latitude, data.longitude]);

//         const closestCity = findClosestRepresentative(
//           data.latitude,
//           data.longitude
//         );

//         if (closestCity && !initialCitySet) {
//           setSelectedCity(closestCity);
//           setInitialCitySet(true);
//         }
//       }
//     })
//     .catch((err) => {
//       console.error("Error fetching IP location:", err);
//     });

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const preciseLocation = [pos.coords.latitude, pos.coords.longitude];
//         setUserLocation(preciseLocation);

//         const closestCity = findClosestRepresentative(
//           pos.coords.latitude,
//           pos.coords.longitude
//         );

//         if (closestCity && !initialCitySet) {
//           setSelectedCity(closestCity);
//           setInitialCitySet(true);
//         }
//       },
//       (err) => {
//         console.error("Geolocation error:", err);
//       }
//     );
//   }
// }, [representatives, initialCitySet, findClosestRepresentative]);
