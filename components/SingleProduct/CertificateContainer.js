// "use client";
// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { useTranslation } from "@/context/TranslationContext";
// import Modal from "../module/Modal";
// import * as Icons from "iconsax-reactjs";

// export default function CertificateContainer({ data }) {
//   const { t } = useTranslation();
//   const [openModal, setOpenModal] = useState(false);
//   const [mainItem, setMainItem] = useState(null);
//   const containerRef = useRef(null);
//   const [showArrows, setShowArrows] = useState(false);

//   const checkScroll = () => {
//     const el = containerRef.current;
//     if (!el) return;

//     setShowArrows(el.scrollWidth > el.clientWidth);
//   };

//   useEffect(() => {
//     checkScroll();
//     const el = containerRef.current;
//     if (!el) return;
//     window.addEventListener("resize", checkScroll);
//     return () => {
//       window.removeEventListener("resize", checkScroll);
//     };
//   }, []);

//   const scrollByX = (amount) => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({ left: amount, behavior: "smooth" });
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col bg-gray-800 pb-40 pt-30 px-20 md:px-40 lg:px-80 relative">
//         <p className="text-gray-white font-[500] title pb-30">
//           {t("CertificatesAndStandards")}
//         </p>
//         <div className="relative w-full bg-gray-800 py-10">
//           <div
//             ref={containerRef}
//             className="w-full flex justify-evenly items- overflow-x-auto overflow-y-hidden whitespace-nowrap hide-scrollbar gap-[1rem]"
//           >
//             {data.map((cert, i) => (
//               <div
//                 key={i}
//                 className="flex flex-col items-center gap-y-[10px] flex-shrink-0"
//                 onClick={() => {
//                   setMainItem(cert);
//                   setOpenModal(true);
//                 }}
//               >
//                 <div className="relative h-[270px] w-[180px] md:h-[300px] md:w-[200px] cursor-pointer">
//                   <Image
//                     src={`${process.env.NEXT_PUBLIC_API_URL}${cert.image}`}
//                     alt="certificate image"
//                     className="select-none object-cover"
//                     fill
//                     onContextMenu={(e) => e.preventDefault()}
//                     draggable={false}
//                   />
//                 </div>
//                 <p className="text-gray-200 pt-4  text-xs md:text-sm w-[180px] md:w-[200px] text-center whitespace-pre-wrap">
//                   {cert.title}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {showArrows && (
//             <>
//               <button
//                 onClick={() => scrollByX(-250)}
//                 className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] absolute top-1/2 left-2 -translate-y-1/2 z-10 rounded-full backdrop-blur bg-gray-700/50 flex items-center justify-center"
//               >
//                 <Icons.ArrowLeft className="m-auto text-gray-white w-20 h-20 md:w-35 md:h-35" />
//               </button>

//               <button
//                 onClick={() => scrollByX(250)}
//                 className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] absolute top-1/2 right-2 -translate-y-1/2 z-10 rounded-full backdrop-blur bg-gray-700/50 flex items-center justify-center"
//               >
//                 <Icons.ArrowRight className="m-auto text-gray-white w-20 h-20 md:w-35 md:h-35" />
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       <Modal openModal={openModal} setOpenModal={setOpenModal}>
//         <div className="flex flex-col items-center gap-[1rem]">
//           <div className="relative w-[250px] md:w-[400px] aspect-[3/4]">
//             <Image
//               src={`${process.env.NEXT_PUBLIC_API_URL}${mainItem?.image}`}
//               alt="certificate image"
//               fill
//               className="object-cover select-none"
//               onContextMenu={(e) => e.preventDefault()}
//             />
//           </div>
//           <p className="text-gray-white pt-20 text-center">{mainItem?.title}</p>
//         </div>
//       </Modal>
//     </>
//   );
// }

"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/context/TranslationContext";
import Modal from "../module/Modal";
import * as Icons from "iconsax-reactjs";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function CertificateContainer({ data }) {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [mainItem, setMainItem] = useState(null);

  return (
    <>
      <div className="flex flex-col bg-gray-800 pb-40 pt-30 px-20 md:px-40 lg:px-80 relative">
        <p className="text-gray-white font-[500] title pb-30">
          {t("CertificatesAndStandards")}
        </p>

        <div className="relative w-full bg-gray-800 py-10">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 16 },
            }}
            loop={true}
          >
            {data.map((cert, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col items-center gap-y-[10px] cursor-pointer">
                  <div
                    className="relative h-[270px] w-[180px] md:h-[300px] md:w-[200px]"
                    onClick={() => {
                      setMainItem(cert);
                      setOpenModal(true);
                    }}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${cert.image}`}
                      alt="certificate image"
                      fill
                      className="object-cover select-none"
                      onContextMenu={(e) => e.preventDefault()}
                      draggable={false}
                    />
                  </div>
                  <p className="text-gray-200 pt-4 text-xs md:text-sm w-[180px] md:w-[200px] text-center whitespace-pre-wrap">
                    {cert.title}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="swiper-button-prev-custom w-[40px] h-[40px] md:w-[50px] md:h-[50px] absolute top-1/2 left-2 -translate-y-1/2 z-10 rounded-full backdrop-blur bg-gray-700/50 flex items-center justify-center">
            <Icons.ArrowLeft className="m-auto text-gray-white w-20 h-20 md:w-35 md:h-35" />
          </button>
          <button className="swiper-button-next-custom w-[40px] h-[40px] md:w-[50px] md:h-[50px] absolute top-1/2 right-2 -translate-y-1/2 z-10 rounded-full backdrop-blur bg-gray-700/50 flex items-center justify-center">
            <Icons.ArrowRight className="m-auto text-gray-white w-20 h-20 md:w-35 md:h-35" />
          </button>
        </div>
      </div>

      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <div className="flex flex-col items-center gap-[1rem]">
          <div className="relative w-[250px] md:w-[400px] aspect-[3/4]">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${mainItem?.image}`}
              alt="certificate image"
              fill
              className="object-cover select-none"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
          <p className="text-gray-white pt-20 text-center">{mainItem?.title}</p>
        </div>
      </Modal>
    </>
  );
}
