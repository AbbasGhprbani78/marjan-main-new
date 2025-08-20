"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import "react-aspect-ratio/aspect-ratio.css";
import PopupGallery from "../module/PopupGallery";
import * as Icons from "iconsax-reactjs";
import { useTranslation } from "@/hook/useTranslation";
export default function Texture({ textureImage }) {
  const [showTexture, setShowTexture] = useState(false);
  const [tailesToShow, setTailesToShow] = useState([]);
  const [mainHorizontalTile, setMainHorizontalTile] = useState(null);
  const [mainVerticalTile, setMainVerticalTile] = useState(null);
  const [activeColor, setActiveColor] = useState(null);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [fullTiles, setFullTiles] = useState([]);
  const [open, setOpen] = useState(false);
  const { t, locale } = useTranslation();
  useEffect(() => {
    if (textureImage.length > 0) {
      showImages(textureImage[0]);
      setShowTexture(true);
      setActiveColor(0);
    }
  }, [textureImage]);

  const showImages = (item) => {
    const horizontal = item.imagesTailes?.horizontal || [];
    const vertical = item.imagesTailes?.vertical || [];

    if (horizontal.length > 0) {
      setIsHorizontal(true);
    } else {
      setIsHorizontal(false);
    }

    const combinedTiles = horizontal.length
      ? horizontal.slice(0, 4)
      : vertical.slice(0, 4);

    setTailesToShow(combinedTiles);
    setFullTiles(horizontal.length > 0 ? horizontal : vertical);

    setMainHorizontalTile(horizontal.length ? horizontal[0] : null);
    setMainVerticalTile(vertical.length ? vertical[0] : null);
  };

  const switchTiles = () => {
    if (!mainHorizontalTile && !mainVerticalTile) return;

    if (isHorizontal) {
      const vertical = textureImage[activeColor]?.imagesTailes?.vertical || [];
      setTailesToShow(vertical.slice(0, 4));
      setFullTiles(vertical);
      setIsHorizontal(false);
    } else {
      const horizontal =
        textureImage[activeColor]?.imagesTailes?.horizontal || [];
      setTailesToShow(horizontal.slice(0, 4));
      setFullTiles(horizontal);
      setIsHorizontal(true);
    }
  };

  const getMaxDimension = (tiles) => {
    let max = 0;
    tiles.forEach((tile) => {
      if (!tile?.size) return;
      const parts = tile.size.split(/[*x×]/i).map(Number);
      if (parts.length === 2) {
        const [h, w] = parts;
        max = Math.max(max, h, w);
      }
    });
    return max || 1;
  };

  const getScaledSize = (size, maxDimension, scale = 150) => {
    if (!size) return { width: scale, height: scale };
    const parts = size.split(/[*x×]/i).map(Number);
    if (parts.length !== 2) return { width: scale, height: scale };
    const [h, w] = parts;
    return {
      width: (w / maxDimension) * scale,
      height: (h / maxDimension) * scale,
    };
  };

  return (
    <div>
      <p className=" font-[500] text-[1.3rem] md:text-[1.5rem]  pb-[30]  px-20 md:px-40 lg:px-80">
        {t("color")}
      </p>
      <div
        className="grid justify-center gap-y-[2rem] gap-x-[10px] md:gap-x-[3rem] border-b-1 border-gray-500 pb-[2rem] px-20 md:px-40 lg:px-80"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
          maxWidth: "100%",
          direction: "ltr",
        }}
      >
        {textureImage.map((item, i) => (
          <div
            className={`flex flex-col cursor-pointer w-full`}
            key={i}
            onClick={() => {
              showImages(item);
              setShowTexture(true);
              setActiveColor(i);
            }}
          >
            <div className="relative aspect-square w-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${item?.image}`}
                className="object-cover"
                alt="color image"
                fill
              />

              <div className="absolute top-5 right-5 z-10">
                <input
                  type="radio"
                  checked={activeColor === i}
                  className="w-[16px] h-[16px] accent-black"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-[7px] text-sm">
              <span>{item.code}</span>
              <div className="flex items-center gap-[5px]">
                <span
                  style={{ backgroundColor: item.color }}
                  className="w-[15px] h-[15px] inline-block rounded-full"
                />
                <span>{item.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showTexture && (
        <>
          <p className="font-[500] text-[1.3rem] md:text-[1.5rem] py-[2rem] px-20 md:px-40 lg:px-80">
            {t("Texture")}
          </p>

          <div className="grid grid-cols-12 gap-[2rem] lg:gap-[1rem] px-4 sm:px-8 md:px-16 lg:px-40 xl:px-80">
            <div className="col-span-12 order-2 md:order-2 lg:col-span-8">
              <div
                dir="ltr"
                className="flex flex-wrap gap-4 items-center w-full justify-center sm:justify-start"
              >
                {(() => {
                  const maxDim = getMaxDimension(tailesToShow);

                  return tailesToShow.map((tile, index) => {
                    const { width, height } = getScaledSize(
                      tile?.size,
                      maxDim,
                      150
                    );
                    const isLast = index === tailesToShow.length - 1;

                    return (
                      <div
                        key={index}
                        className="relative overflow-hidden bg-gray-100 w-full sm:w-auto"
                        style={{
                          width: `${width}px`,
                          height: `${height}px`,
                        }}
                      >
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}${tile?.image}`}
                          alt={`tile-${index}`}
                          className="object-cover"
                          fill
                        />
                        {isLast && (
                          <div
                            className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 cursor-pointer"
                            onClick={() => setOpen(true)}
                          >
                            <Icons.More className="text-gray-white w-12 h-12 md:w-20 md:h-20" />
                          </div>
                        )}
                      </div>
                    );
                  });
                })()}

                <PopupGallery
                  images={fullTiles.map((tile) => tile?.image)}
                  open={open}
                  setOpen={setOpen}
                />
              </div>
            </div>

            <div className="col-span-12 order-1 lg:order-1 lg:col-span-4">
              <div className="flex gap-5 items-end overflow-hidden max-w-full justify-center  ">
                <div className="flex flex-col">
                  {mainHorizontalTile && (
                    <div
                      className="relative cursor-pointer"
                      style={getScaledSize(
                        mainHorizontalTile?.size,
                        getMaxDimension([mainHorizontalTile, mainVerticalTile]),
                        150
                      )}
                      onClick={() => {
                        if (!isHorizontal) switchTiles();
                      }}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${mainHorizontalTile?.image}`}
                        alt="main horizontal tile"
                        className="object-cover"
                        fill
                      />
                      <div className="absolute top-5 right-5 z-10">
                        <input
                          type="radio"
                          name="tileOrientation"
                          checked={isHorizontal}
                          onChange={() => {
                            if (!isHorizontal) switchTiles();
                          }}
                          className="w-[16px] h-[16px] accent-black"
                        />
                      </div>
                    </div>
                  )}
                  <span className="pt-[10px]">{mainHorizontalTile?.size}</span>
                </div>
                <div className="flex flex-col">
                  {mainVerticalTile && (
                    <div
                      className="relative cursor-pointer"
                      style={getScaledSize(
                        mainVerticalTile?.size,
                        getMaxDimension([mainHorizontalTile, mainVerticalTile]),
                        150
                      )}
                      onClick={() => {
                        if (isHorizontal) switchTiles();
                      }}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${mainVerticalTile?.image}`}
                        alt="main vertical tile"
                        className="object-cover"
                        fill
                      />
                      <div className="absolute top-2 right-2 z-10">
                        <input
                          type="radio"
                          name="tileOrientation"
                          checked={!isHorizontal}
                          onChange={() => {
                            if (isHorizontal) switchTiles();
                          }}
                          className="w-[16px] h-[16px] accent-black"
                        />
                      </div>
                    </div>
                  )}
                  <span className="pt-[10px]">{mainVerticalTile?.size}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
