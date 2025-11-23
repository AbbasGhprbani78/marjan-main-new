"use client";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "iconsax-reactjs";
import { useTranslation } from "@/context/TranslationContext";
import { useEffect, useState } from "react";

const getMaxDimension = (sizes) => {
  let max = 0;
  sizes.forEach((size) => {
    if (!size) return;
    const parts = size.split(/[*xX×]/i).map(Number);
    if (parts.length === 2) {
      const [h, w] = parts;
      max = Math.max(max, h, w);
    }
  });
  return max || 1;
};

const getScaledSize = (size, maxDimension, scale = 300, isrevers = false) => {
  if (!size) return { width: scale, height: scale };
  const parts = size.split(/[*xX×]/i).map(Number);
  if (parts.length !== 2) return { width: scale, height: scale };
  const [h, w] = parts;
  return {
    width: isrevers ? (h / maxDimension) * scale : (w / maxDimension) * scale,
    height: isrevers ? (w / maxDimension) * scale : (h / maxDimension) * scale,
  };
};

export default function PopupGallery({
  open,
  media = [],
  sizes = [],
  setOpen,
  isdownload = true,
  isrevers = false,
  startIndex = 0,
}) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const { t } = useTranslation();

  const [vhScale, setVhScale] = useState(
    typeof window !== "undefined" ? window.innerHeight * 0.6 : 300
  );

  useEffect(() => {
    const updateVhScale = () => {
      setVhScale(window.innerHeight * 0.6);
    };
    updateVhScale();
    window.addEventListener("resize", updateVhScale);
    return () => window.removeEventListener("resize", updateVhScale);
  }, []);

  useEffect(() => {
    if (open) {
      setCurrentIndex(Number.isFinite(+startIndex) ? startIndex : 0);
    }
  }, [open, startIndex]);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  const downloadImage = () => {
    const currentMedia = media[currentIndex];
    const isVideo = /\.(mp4|webm|ogg|mkv)$/i.test(currentMedia);

    if (!isVideo) {
      const link = document.createElement("a");
      link.href = `${process.env.NEXT_PUBLIC_API_URL}${currentMedia}`;
      link.download = currentMedia.split("/").pop();
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Downloading videos is not supported yet.");
    }
  };

  const hasSizes = sizes && sizes[currentIndex];
  let width, height;
  if (hasSizes) {
    const maxDim = getMaxDimension(sizes);
    ({ width, height } = getScaledSize(
      sizes[currentIndex],
      maxDim,
      vhScale,
      isrevers
    ));
  }

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

          <div
            className="relative flex items-center mb-[20px]"
            style={
              hasSizes
                ? {
                    width: `${width}px`,
                    height: `${height}px`,
                    maxWidth: "80vw",
                    maxHeight: "60dvh",
                  }
                : { maxWidth: "80vw", maxHeight: "60dvh" }
            }
          >
            <button
              onClick={prevImage}
              className="absolute left-[-8vw] text-white cursor-pointer rounded-full backdrop-blur-[4px] w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-[background:#24202180]"
              aria-label="Previous Media"
            >
              <Icons.ArrowLeft className="m-auto text-gray-white w-20 h-20 md:w-35 md:h-35" />
            </button>

            {/\.(mp4|webm|ogg|mkv)$/i.test(media[currentIndex]) ? (
              <video
                src={`${process.env.NEXT_PUBLIC_API_URL}${media[currentIndex]}`}
                controls
                className={`h-[45dvh] md:h-[60dvh] max-w-[80vw] ${
                  sizes.length === 0 && "object-cover"
                }`}
                style={
                  hasSizes ? { width: `${width}px`, height: `${height}px` } : {}
                }
              />
            ) : (
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${media[currentIndex]}`}
                alt={`Media ${currentIndex + 1}`}
                className={`h-[45dvh] md:h-[60dvh] max-w-[80vw] ${
                  sizes.length === 0 && "object-cover"
                }`}
                style={
                  hasSizes ? { width: `${width}px`, height: `${height}px` } : {}
                }
                draggable={false}
                onContextMenu={(e) => {
                  if (!isdownload) e.preventDefault();
                }}
              />
            )}

            <button
              onClick={nextImage}
              className="absolute right-[-8vw] text-white cursor-pointer rounded-full backdrop-blur-[4px] w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-[background:#24202180]"
              aria-label="Next Media"
            >
              <Icons.ArrowRight className="m-auto text-gray-white w-20 h-20 md:w-35 md:h-35" />
            </button>
          </div>

          <div
            dir="ltr"
            className="flex gap-[10px] overflow-x-auto max-w-[80vw] mb-[20px]"
          >
            {media.map((item, i) => {
              const isVideo = /\.(mp4|webm|ogg|mkv)$/i.test(item);
              return isVideo ? (
                <video
                  key={i}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${item}`}
                  onClick={() => setCurrentIndex(i)}
                  className="w-[100px] h-[100px] object-cover cursor-pointer"
                  style={{
                    border:
                      i === currentIndex ? "3px solid #fff" : "2px solid #888",
                    opacity: i === currentIndex ? 1 : 0.6,
                    userSelect: "none",
                  }}
                  muted
                />
              ) : (
                <img
                  key={i}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${item}`}
                  alt={`Thumbnail ${i + 1}`}
                  onClick={() => setCurrentIndex(i)}
                  className="w-[100px] h-[100px] object-cover cursor-pointer"
                  style={{
                    border:
                      i === currentIndex ? "3px solid #fff" : "2px solid #888",
                    opacity: i === currentIndex ? 1 : 0.6,
                    userSelect: "none",
                  }}
                  onContextMenu={(e) => {
                    if (!isdownload) e.preventDefault();
                  }}
                  draggable={false}
                />
              );
            })}
          </div>

          {isdownload && (
            <button
              onClick={downloadImage}
              className="py-[10px] w-[200px] font-normal border-none outline-none text-white bg-[#242021] cursor-pointer"
            >
              {t("DownloadFaces")}
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
