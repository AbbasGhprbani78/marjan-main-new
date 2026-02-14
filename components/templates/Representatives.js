// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import SelectLocation from "../Representatives/SelectLocation";
// import MapWrapper from "../module/MapWrapper";
// import RepresentationItem from "../Representatives/RepresentationItem";
// import styles from "../../app/[locale]/representatives/representatives.module.css";
// import axios from "axios";
// import * as Icons from "iconsax-reactjs";
// import { Swiper, SwiperSlide } from "swiper/react";
// import {} from "swiper";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { useTranslation } from "@/context/TranslationContext";
// import { useRouter, useSearchParams } from "next/navigation";

// function LeftArrow({ swiper }) {
//   return (
//     <button
//       className="cursor-pointer z-10 rounded-full"
//       onClick={() => swiper?.slidePrev()}
//     >
//       <Icons.ArrowLeft className="m-auto text-black w-25 h-25  " />
//     </button>
//   );
// }

// function RightArrow({ swiper }) {
//   return (
//     <button
//       className="cursor-pointer z-10 rounded-full"
//       onClick={() => swiper?.slideNext()}
//     >
//       <Icons.ArrowRight className="m-auto text-black w-25 h-25" />
//     </button>
//   );
// }

// export default function Representatives({ representatives }) {
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [initialCitySet, setInitialCitySet] = useState(false);
//   const [focusedRepresentative, setFocusedRepresentative] = useState(null);
//   const [swiperInstance, setSwiperInstance] = useState(null);
//   const { locale } = useTranslation();
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371;
//     const dLat = ((lat2 - lat1) * Math.PI) / 180;
//     const dLon = ((lon2 - lon1) * Math.PI) / 180;
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos((lat1 * Math.PI) / 180) *
//         Math.cos((lat2 * Math.PI) / 180) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   const findClosestRepresentative = useCallback(
//     (userLat, userLon) => {
//       let closestCity = null;
//       let minDistance = Infinity;

//       representatives.forEach((country) => {
//         country.provinces?.forEach((province) => {
//           province.cities?.forEach((city) => {
//             city.representatives?.forEach((rep) => {
//               if (rep.x && rep.y) {
//                 const distance = calculateDistance(
//                   userLat,
//                   userLon,
//                   rep.x,
//                   rep.y
//                 );
//                 if (distance < minDistance) {
//                   minDistance = distance;
//                   closestCity = city;
//                 }
//               }
//             });
//           });
//         });
//       });

//       return closestCity;
//     },
//     [representatives]
//   );

//   const handleAddressClick = (representative) => {
//     setFocusedRepresentative(representative);
//   };

//   useEffect(() => {
//     setFocusedRepresentative(null);
//   }, [selectedCity]);

//   const [ip, setIp] = useState("");

//   useEffect(() => {
//     fetch("https://api.ipify.org?format=json")
//       .then((res) => res.json())
//       .then((data) => {
//         setIp(data.ip);

//         return axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/app/api/ip-to-xy/`,
//           { params: { ip: data.ip } }
//         );
//       })
//       .then((res) => {
//         const { x: latitude, y: longitude } = res.data;

//         const closestCity = findClosestRepresentative(latitude, longitude);

//         if (closestCity && !initialCitySet) {
//           setSelectedCity(closestCity);
//           setInitialCitySet(true);
//         }
//       })
//       .catch((err) => console.error(err));
//   }, [initialCitySet, findClosestRepresentative]);

//   console.log(representatives);

//   return (
//     <main className="wrapper">
//       <h1 className="sr-only">نمایندگان شرکت ما</h1>

//       <div className="flex flex-col lg:grid lg:grid-cols-12 gap-[2rem] px-20 md:px-40 lg:px-80 pt-[140px] lg:pt-[120px] lg:pb-[3rem]">
//         <aside className="lg:col-span-4 xl:col-span-3 flex flex-col relative">
//           <SelectLocation
//             locations={representatives}
//             onCitySelect={setSelectedCity}
//             initialCity={selectedCity}
//           />
//           <section
//             className={`block lg:hidden lg:col-span-8 xl:col-span-9 lg:h-full inset-0 z-0 mb-[1rem] ${styles.mapContainer}`}
//             aria-label="نقشه نمایندگان"
//           >
//             <MapWrapper
//               reps={
//                 focusedRepresentative
//                   ? [focusedRepresentative]
//                   : selectedCity?.representatives || []
//               }
//               userLocation={userLocation}
//               focusedRep={focusedRepresentative}
//             />
//           </section>
//           <div className="lg:hidden">
//             {selectedCity?.representatives.length > 1 && (
//               <div className="flex items-center justify-between mb-[1rem]">
//                 {["ru", "en"].includes(locale) ? (
//                   <>
//                     <LeftArrow swiper={swiperInstance} />
//                     <RightArrow swiper={swiperInstance} />
//                   </>
//                 ) : (
//                   <>
//                     <RightArrow swiper={swiperInstance} />
//                     <LeftArrow swiper={swiperInstance} />
//                   </>
//                 )}
//               </div>
//             )}
//             <Swiper
//               onSwiper={setSwiperInstance}
//               className="my-swiper w-full max-w-full relative"
//               spaceBetween={0}
//               slidesPerView={1}
//               autoplay={{ disableOnInteraction: false }}
//               style={{ width: "100%", maxWidth: "100%" }}
//             >
//               {selectedCity?.representatives?.map((rep, index) => (
//                 <SwiperSlide key={index} style={{ position: "relative" }}>
//                   <RepresentationItem
//                     key={`${rep.id || "rep"}-${rep.phone || ""}-${
//                       rep.link || ""
//                     }-${index}`}
//                     city={rep}
//                     onAddressClick={handleAddressClick}
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//           <div
//             className={`overflow-y-auto flex-1 ${styles.wrapperRepresentation} hidden lg:block`}
//             aria-label="لیست نمایندگان"
//           >
//             {selectedCity?.representatives?.map((rep, index) => (
//               <RepresentationItem
//                 key={`${rep.id || "rep"}-${rep.phone || ""}-${
//                   rep.link || ""
//                 }-${index}`}
//                 city={rep}
//                 onAddressClick={handleAddressClick}
//               />
//             ))}
//           </div>
//         </aside>
//         <section
//           className={`hidden lg:block lg:col-span-8 xl:col-span-9 lg:h-full inset-0 z-0 ${styles.mapContainer}`}
//           aria-label="نقشه نمایندگان"
//         >
//           <MapWrapper
//             reps={
//               focusedRepresentative
//                 ? [focusedRepresentative]
//                 : selectedCity?.representatives || []
//             }
//             userLocation={userLocation}
//             focusedRep={focusedRepresentative}
//           />
//         </section>
//       </div>
//     </main>
//   );
// }

"use client";
import React, { useState, useEffect, useCallback } from "react";
import SelectLocation from "../Representatives/SelectLocation";
import MapWrapper from "../module/MapWrapper";
import RepresentationItem from "../Representatives/RepresentationItem";
import styles from "../../app/[locale]/representatives/representatives.module.css";
import axios from "axios";
import * as Icons from "iconsax-reactjs";
import { Swiper, SwiperSlide } from "swiper/react";
import {} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from "@/context/TranslationContext";
import { useRouter, useSearchParams } from "next/navigation"; // اضافه شده

function LeftArrow({ swiper }) {
  return (
    <button
      className="cursor-pointer z-10 rounded-full"
      onClick={() => swiper?.slidePrev()}
    >
      <Icons.ArrowLeft className="m-auto text-black w-25 h-25  " />
    </button>
  );
}

function RightArrow({ swiper }) {
  return (
    <button
      className="cursor-pointer z-10 rounded-full"
      onClick={() => swiper?.slideNext()}
    >
      <Icons.ArrowRight className="m-auto text-black w-25 h-25" />
    </button>
  );
}

export default function Representatives({ representatives }) {
  const [selectedCity, setSelectedCity] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [initialCitySet, setInitialCitySet] = useState(false);
  const [focusedRepresentative, setFocusedRepresentative] = useState(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const { locale } = useTranslation();

  const router = useRouter();
  const searchParams = useSearchParams();

  const [ip, setIp] = useState("");

  // تابع پیدا کردن شهر بر اساس city.id
  const findCityById = useCallback(
    (cityId) => {
      let foundCity = null;
      representatives.forEach((country) => {
        country.provinces?.forEach((province) => {
          province.cities?.forEach((city) => {
            if (city.id === cityId) {
              foundCity = city;
            }
          });
        });
      });
      return foundCity;
    },
    [representatives]
  );

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
    if (!selectedCity) {
      if (searchParams.get("city")) {
        router.push(window.location.pathname, { scroll: false });
      }
      return;
    }

    const currentCityIdInUrl = searchParams.get("city");

    // فقط اگر city در URL وجود نداشته باشه یا متفاوت باشه، آپدیت کن
    if (currentCityIdInUrl !== selectedCity.id) {
      const params = new URLSearchParams(searchParams);
      params.set("city", selectedCity.id);
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [selectedCity, searchParams, router]);

  useEffect(() => {
    const cityIdFromUrl = searchParams.get("city");

    if (cityIdFromUrl && !initialCitySet) {
      const city = findCityById(cityIdFromUrl);
      if (city) {
        setSelectedCity(city);
        setInitialCitySet(true);
      }
    }
  }, [searchParams, findCityById, initialCitySet]);

  useEffect(() => {
    const cityIdFromUrl = searchParams.get("city");

    if (cityIdFromUrl && !initialCitySet) {
      const city = findCityById(cityIdFromUrl);
      if (city) {
        setSelectedCity(city);
        setInitialCitySet(true);
      }
    }
  }, [searchParams, findCityById, initialCitySet]);

  useEffect(() => {
    if (initialCitySet || searchParams.get("city")) return;

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
  }, [initialCitySet, findClosestRepresentative, searchParams]);

  return (
    <main className="wrapper">
      <h1 className="sr-only">نمایندگان شرکت ما</h1>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-[2rem] px-20 md:px-40 lg:px-80 pt-[140px] lg:pt-[120px] lg:pb-[3rem]">
        <aside className="lg:col-span-4 xl:col-span-3 flex flex-col relative">
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

          <div className="lg:hidden">
            {selectedCity?.representatives.length > 1 && (
              <div className="flex items-center justify-between mb-[1rem]">
                {["ru", "en"].includes(locale) ? (
                  <>
                    <LeftArrow swiper={swiperInstance} />
                    <RightArrow swiper={swiperInstance} />
                  </>
                ) : (
                  <>
                    <RightArrow swiper={swiperInstance} />
                    <LeftArrow swiper={swiperInstance} />
                  </>
                )}
              </div>
            )}
            <Swiper
              onSwiper={setSwiperInstance}
              className="my-swiper w-full max-w-full relative"
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{ disableOnInteraction: false }}
              style={{ width: "100%", maxWidth: "100%" }}
            >
              {selectedCity?.representatives?.map((rep, index) => (
                <SwiperSlide key={index} style={{ position: "relative" }}>
                  <RepresentationItem
                    key={`${rep.id || "rep"}-${rep.phone || ""}-${
                      rep.link || ""
                    }-${index}`}
                    city={rep}
                    onAddressClick={handleAddressClick}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div
            className={`overflow-y-auto flex-1 ${styles.wrapperRepresentation} hidden lg:block`}
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
