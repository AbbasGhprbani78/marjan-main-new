"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/hook/useTranslation";
import Modal from "../module/Modal";
import * as Icons from "iconsax-reactjs";

export default function CertificateContainer({ data }) {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [mainItem, setMainItem] = useState(null);
  const scrollRef = useRef(null);
  const [canScroll, setCanScroll] = useState(false);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const checkScrollable = () => {
      const el = scrollRef.current;
      if (!el) return;
      setCanScroll(el.scrollWidth > el.clientWidth);
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [data]);

  return (
    <>
      <div className="flex flex-col bg-gray-800 pb-40 pt-30 px-20 md:px-40 lg:px-80 relative">
        <p className="text-gray-white font-[500] title pb-30">
          {t("CertificatesAndStandards")}
        </p>

        {canScroll && (
          <>
            <button
              onClick={() => scroll("right")}
              className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] absolute top-[50%] right-[10px] lg:right-[50px] translate-y-[-50%] z-10 rounded-full backdrop-blur-[4px] cursor-pointer"
              style={{ backgroundColor: "rgba(31, 41, 55, 0.5)" }}
            >
              <Icons.ArrowRight className="m-auto text-white w-20 h-20 md:w-35 md:h-35" />
            </button>
            <button
              onClick={() => scroll("left")}
              className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] absolute top-[50%] left-[10px] lg:left-[50px] translate-y-[-50%] z-10 rounded-full backdrop-blur-[4px] cursor-pointer"
              style={{ backgroundColor: "rgba(31, 41, 55, 0.5)" }}
            >
              <Icons.ArrowLeft className="m-auto text-white w-20 h-20 md:w-35 md:h-35" />
            </button>
          </>
        )}

        <div className="overflow-x-auto hide-scrollbar" ref={scrollRef}>
          <div className="flex justify-center gap-[2rem] lg:gap-82 flex-nowrap w-max px-4 py-2 mx-auto">
            {data.map((cert, i) => (
              <div
                key={i}
                className="cursor-pointer relative min-w-[120px] md:min-w-[180px] aspect-[2/3]"
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
                <p className="text-gray-white pt-4 text-center text-xs md:text-sm">
                  {cert.title}
                </p>
              </div>
            ))}
          </div>
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
