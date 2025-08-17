"use client";
import React, { useState } from "react";
import * as Icons from "iconsax-reactjs";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hook/useTranslation";

export default function PopupGallery({ open, images, setOpen }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = images[currentIndex];
    link.download = `image-${currentIndex + 1}.jpg`;
    link.click();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="popup-gallery"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 w-screen h-screen bg-[#292D32CC] flex justify-center items-center z-[9999] flex-col p-5"
          aria-modal="true"
          role="dialog"
        >
          <button
            className="absolute top-[30px] right-[50px] text-[24px] bg-transparent text-white cursor-pointer"
            onClick={() => setOpen(false)}
            aria-label="Close Gallery"
          >
            <Icons.CloseCircle className="m-auto text-gray-white w-30 h-30" />
          </button>

          <div className="relative flex items-center mb-[20px] max-w-[80vw] max-h-[60dvh]">
            <button
              onClick={prevImage}
              className="absolute left-[-80px] text-white cursor-pointer rounded-full backdrop-blur-[4px] w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-[background:#24202180]"
              aria-label="Previous Image"
            >
              <Icons.ArrowLeft className="m-auto text-gray-white w-20 h-20 md:w-35 md:h-35" />
            </button>

            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${images[currentIndex]}`}
              alt={`Image ${currentIndex + 1}`}
              className="h-[50dvh] md:h-[60dvh] max-w-[80vw] object-contain"
              draggable={false}
            />

            <button
              onClick={nextImage}
              className="absolute right-[-80px] text-white cursor-pointer rounded-full backdrop-blur-[4px] w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-[background:#24202180]"
              aria-label="Next Image"
            >
              <Icons.ArrowRight className="m-auto text-gray-white w-20 h-20 md:w-35 md:h-35" />
            </button>
          </div>

          <div className="flex gap-[10px] overflow-x-auto max-w-[80vw] mb-[20px]">
            {images.map((img, i) => (
              <img
                key={i}
                src={`${process.env.NEXT_PUBLIC_API_URL}${img}`}
                alt={`Thumbnail ${i + 1}`}
                onClick={() => setCurrentIndex(i)}
                className="w-100 h-100 object-cover cursor-pointer"
                style={{
                  border:
                    i === currentIndex ? "3px solid #fff" : "2px solid #888",
                  opacity: i === currentIndex ? 1 : 0.6,
                  userSelect: "none",
                }}
                draggable={false}
              />
            ))}
          </div>

          <button
            onClick={downloadImage}
            className="py-[10px] w-[200px] font-normal border-none outline-none text-white bg-[#242021] cursor-pointer"
          >
            {t("DownloadFaces")}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
