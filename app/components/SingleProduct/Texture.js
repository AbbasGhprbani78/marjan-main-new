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
  const { t } = useTranslation();
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
      if (!tile?.size?.includes("*")) return;
      const [h, w] = tile.size.split("*").map(Number);
      max = Math.max(max, h, w);
    });
    return max || 1;
  };

  const getScaledSize = (size, maxDimension, scale = 150) => {
    if (!size || !size.includes("*")) return { width: scale, height: scale };
    const [h, w] = size.split("*").map(Number);
    return {
      width: (w / maxDimension) * scale,
      height: (h / maxDimension) * scale,
    };
  };

  return (
    <div>
      <p className=" font-[500] title  pb-[30]">{t("Color")}</p>
      <div
        className="grid justify-center gap-y-[2rem] gap-x-[10px] md:gap-x-[3rem] lg:gap-x-[6rem]"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
          maxWidth: "100%",
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
          <p className="font-[500] title py-[2rem]">{t("Texture")}</p>

          <div className="grid grid-cols-12 gap-[2rem] lg:gap-[1rem]">
            <div className="col-span-12 order-1 lg:order-2 lg:col-span-8">
              <div className="flex flex-wrap gap-5 items-end max-w-full lg:justify-end">
                {(() => {
                  const maxDim = getMaxDimension(tailesToShow);

                  return tailesToShow.map((tile, index) => {
                    const { width, height } = getScaledSize(
                      tile.size,
                      maxDim,
                      150
                    );
                    const isLast = index === tailesToShow.length - 1;

                    return (
                      <div
                        key={index}
                        className="relative overflow-hidden bg-gray-100"
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
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                            onClick={() => setOpen(true)}
                          >
                            <Icons.More className="m-auto text-gray-white w-20 h-20 md:w-35 md:h-35" />
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

            <div className="col-span-12 order-2 lg:order-1 lg:col-span-4">
              <div className="flex gap-5 items-end overflow-hidden max-w-full">
                {mainHorizontalTile && (
                  <div
                    className="relative cursor-pointer"
                    style={getScaledSize(
                      mainHorizontalTile.size,
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

                {mainVerticalTile && (
                  <div
                    className="relative cursor-pointer"
                    style={getScaledSize(
                      mainVerticalTile.size,
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
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

{
  /* <div className="col-span-12 order-1 lg:order-2 lg:col-span-8">
              <div className="flex flex-wrap gap-5 max-w-full lg:justify-end">
                {tailesToShow.map((tile, index) => {
                  const [h, w] = tile.size.split("*").map(Number);
                  const aspectRatio = w / h;
                  const isLast = index === tailesToShow.length - 1;

                  return (
                    <div
                      key={index}
                      className="flex flex-col overflow-hidden relative"
                      style={{
                        aspectRatio,
                        height: "204px",
                      }}
                    >
                      <Image
                        src={tile.image}
                        alt={`tile-${index}`}
                        className="object-cover"
                        fill
                      />

                      {isLast && (
                        <div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                          onClick={() => setOpen(true)}
                        >
                          <Icons.More className="m-auto text-gray-white w-20 h-20 md:w-35 md:h-35" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <PopupGallery
                images={fullTiles.map((tile) => tile.image)}
                open={open}
                setOpen={setOpen}
              />
            </div> */
}
