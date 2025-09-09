"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import "react-aspect-ratio/aspect-ratio.css";
import PopupGallery from "../module/PopupGallery";
import * as Icons from "iconsax-reactjs";
import { useTranslation } from "@/hook/useTranslation";
import MySelect from "../module/SelectDropDown";
import { toPersianDigits } from "@/utils/helper";

export default function Texture({ textureImage }) {
  const [showTexture, setShowTexture] = useState(false);
  const [tailesToShow, setTailesToShow] = useState([]);
  const [activeColor, setActiveColor] = useState(null);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [fullTiles, setFullTiles] = useState([]);
  const [open, setOpen] = useState(false);
  const { t, locale } = useTranslation();
  const [activeGroupKey, setActiveGroupKey] = useState(null);

  useEffect(() => {
    if (textureImage.length > 0) {
      showImages(textureImage[0]);
      setShowTexture(true);
      setActiveColor(0);
    }
  }, [textureImage]);

  const getMaxDimension = (tiles) => {
    let max = 0;
    tiles.forEach((tile) => {
      if (!tile?.size) return;
      const parts = tile.size.split(/[*xX×]/i).map(Number);
      if (parts.length === 2) {
        const [h, w] = parts;
        max = Math.max(max, h, w);
      }
    });
    return max || 1;
  };

  const getScaledSize = (size, maxDimension, scale = 150) => {
    if (!size) return { width: scale, height: scale };
    const parts = size.split(/[*xX×]/i).map(Number);
    if (parts.length !== 2) return { width: scale, height: scale };
    const [h, w] = parts;
    return {
      width: (w / maxDimension) * scale,
      height: (h / maxDimension) * scale,
    };
  };

  const groupBySize = (tiles = []) => {
    const groups = {};
    tiles.forEach((tile) => {
      if (!tile?.size) return;
      if (!groups[tile.size]) groups[tile.size] = [];
      groups[tile.size].push(tile);
    });
    return Object.values(groups);
  };

  const [groupedTiles, setGroupedTiles] = useState({
    horizontal: [],
    vertical: [],
  });

  const showImages = (item) => {
    const horizontal = item.imagesTailes?.horizontal || [];
    const vertical = item.imagesTailes?.vertical || [];

    const groupedHorizontal = groupBySize(horizontal);
    const groupedVertical = groupBySize(vertical);

    setGroupedTiles({
      horizontal: groupedHorizontal,
      vertical: groupedVertical,
    });

    if (groupedHorizontal.length > 0) {
      const firstGroup = groupedHorizontal[0];
      setTailesToShow(firstGroup.slice(0, 4));
      setFullTiles(firstGroup);
      setIsHorizontal(true);
      setActiveGroupKey(`h-0`);
    } else if (groupedVertical.length > 0) {
      const firstGroup = groupedVertical[0];
      setTailesToShow(firstGroup.slice(0, 4));
      setFullTiles(firstGroup);
      setIsHorizontal(false);
      setActiveGroupKey(`v-0`);
    } else {
      setTailesToShow([]);
      setFullTiles([]);
      setActiveGroupKey(null);
    }
  };

  const handleTileGroupClick = (group, orientation, key) => {
    setTailesToShow(group.slice(0, 4));
    setFullTiles(group);
    setIsHorizontal(orientation === "horizontal");
    setActiveGroupKey(key);
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
                  readOnly
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

          <div className="grid grid-cols-12  gap-y-[2rem] px-20 md:px-40 lg:px-80">
            <div className="col-span-12 order-2 md:order-2 md:col-span-8">
              <div
                dir="ltr"
                className={`flex flex-wrap gap-4 items-center w-full justify-center 
    ${locale === "fa" ? "md:justify-start" : "md:justify-end"}`}
              >
                {(() => {
                  const maxDim = getMaxDimension(tailesToShow);

                  return tailesToShow.map((tile, index) => {
                    const { width, height } = getScaledSize(
                      tile?.size,
                      maxDim,
                      150
                    );
                    const showMore =
                      fullTiles.length > 4 && index === tailesToShow.length - 1;

                    return (
                      <div
                        key={index}
                        className="relative overflow-hidden bg-gray-100 w-full sm:w-auto cursor-pointer"
                        style={{
                          width: `${width}px`,
                          height: `${height}px`,
                        }}
                        onClick={() => setOpen(true)}
                      >
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}${tile?.image}`}
                          alt={`tile-${index}`}
                          className="object-cover"
                          fill
                        />

                        {showMore && (
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
                  media={fullTiles.map((tile) => tile?.image)}
                  open={open}
                  setOpen={setOpen}
                />
              </div>
            </div>
            <div className="col-span-12 order-1 md:order-1 md:col-span-4">
              <div className="flex gap-5 items-end overflow-hidden max-w-full justify-center md:justify-start">
                {(() => {
                  const totalGroups =
                    groupedTiles.horizontal.length +
                    groupedTiles.vertical.length;
                  if (totalGroups <= 2) {
                    const allTiles = [
                      ...groupedTiles.horizontal.flat(),
                      ...groupedTiles.vertical.flat(),
                    ];
                    const maxDim = getMaxDimension(allTiles);

                    return (
                      <>
                        {groupedTiles.horizontal.map((group, idx) => {
                          const key = `h-${idx}`;
                          return (
                            <div key={key} className="flex flex-col">
                              <div
                                className="relative cursor-pointer"
                                style={getScaledSize(
                                  group[0]?.size,
                                  maxDim,
                                  150
                                )}
                                onClick={() =>
                                  handleTileGroupClick(group, "horizontal", key)
                                }
                              >
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_API_URL}${group[0]?.image}`}
                                  alt={key}
                                  className="object-cover"
                                  fill
                                />
                                <div className="absolute top-2 right-2 z-10">
                                  <input
                                    type="radio"
                                    name="tileGroup"
                                    checked={activeGroupKey === key}
                                    readOnly
                                    className="w-[16px] h-[16px] accent-black"
                                  />
                                </div>
                              </div>
                              <span className="pt-[10px]">
                                {toPersianDigits(group[0]?.size)}
                              </span>
                            </div>
                          );
                        })}

                        {groupedTiles.vertical.map((group, idx) => {
                          const key = `v-${idx}`;
                          return (
                            <div key={key} className="flex flex-col">
                              <div
                                className="relative cursor-pointer"
                                style={getScaledSize(
                                  group[0]?.size,
                                  maxDim,
                                  150
                                )}
                                onClick={() =>
                                  handleTileGroupClick(group, "vertical", key)
                                }
                              >
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_API_URL}${group[0]?.image}`}
                                  alt={key}
                                  className="object-cover"
                                  fill
                                />
                                <div className="absolute top-2 right-2 z-10">
                                  <input
                                    type="radio"
                                    name="tileGroup"
                                    checked={activeGroupKey === key}
                                    readOnly
                                    className="w-[16px] h-[16px] accent-black"
                                  />
                                </div>
                              </div>
                              <span className="pt-[10px]">
                                {toPersianDigits(group[0]?.size)}
                              </span>
                            </div>
                          );
                        })}
                      </>
                    );
                  }

                  const allGroups = [
                    ...groupedTiles.horizontal.map((group, idx) => ({
                      id: `h-${idx}`,
                      name: group[0]?.size,
                      group,
                      orientation: "horizontal",
                    })),
                    ...groupedTiles.vertical.map((group, idx) => ({
                      id: `v-${idx}`,
                      name: group[0]?.size,
                      group,
                      orientation: "vertical",
                    })),
                  ];

                  return (
                    <div className="w-2/3 md:w-1/2 mt-[1rem]">
                      <MySelect
                        label="انتخاب سایز"
                        data={allGroups}
                        value={activeGroupKey || allGroups[0]?.id}
                        onChange={(selected) => {
                          if (!selected) return;
                          const selectedGroup = allGroups.find(
                            (g) => g.id === selected.value
                          );
                          if (selectedGroup) {
                            handleTileGroupClick(
                              selectedGroup.group,
                              selectedGroup.orientation,
                              selectedGroup.id
                            );
                          }
                        }}
                      />
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// const switchTiles = () => {
//   if (!mainHorizontalTile && !mainVerticalTile) return;

//   if (isHorizontal) {
//     const vertical = textureImage[activeColor]?.imagesTailes?.vertical || [];
//     setTailesToShow(vertical.slice(0, 4));
//     setFullTiles(vertical);
//     setIsHorizontal(false);
//   } else {
//     const horizontal =
//       textureImage[activeColor]?.imagesTailes?.horizontal || [];
//     setTailesToShow(horizontal.slice(0, 4));
//     setFullTiles(horizontal);
//     setIsHorizontal(true);
//   }
// };
