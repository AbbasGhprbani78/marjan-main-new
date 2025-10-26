"use client";
import React, { useCallback, useState } from "react";
import UnitMeasurement from "../Calculator/UnitMeasurement";
import SelectSurfaceSizeRoom from "../Calculator/SelectSurfaceSizeRoom";
import Deduction from "../Calculator/Deduction";
import PrecentageWastage from "../Calculator/PrecentageWastage";
import TileSize from "../Calculator/TileSize";
import Button2 from "../module/Button2";
import { Refresh, Calculator } from "iconsax-reactjs";
import { ToastContainer } from "react-toastify";
import { warningMessage } from "../module/Toast";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/context/TranslationContext";
import { toPersianDigits } from "@/utils/helper";

export default function CalculatorT({ dataSizes }) {
  const [uniMeasurement, setUnitMeasurement] = useState(1);
  const { t, locale } = useTranslation();
  const TABS = [
    { label: t("Floor"), value: "floor" },
    { label: t("Wall"), value: "wall" },
    // { label: t("FloorWall"), value: "both" },
  ];
  const [area, setArea] = useState({
    floorArea: "0.00",
    wallArea: "0.00",
    totalArea: "0.00",
    walls: [],
  });
  const [tab, setTab] = useState("floor");
  const [includeWastage, setIncludeWastage] = useState(0);
  const [size, setSize] = useState({
    mode: "same",
    all: "",
    floor: "",
    walls: {},
  });
  const [isClean, setIsClean] = useState(true);
  const [totalArea, setTotalArea] = useState(0);
  const [numberOfTiles, setNumberOfTiles] = useState(0);
  const [deductArea, setDeductArea] = useState(0);
  const [perResults, setPerResults] = useState([]);

  const onDeductChange = (deductValue) => {
    if (deductValue === false) {
      setDeductArea(0);
      return;
    }
    const value = parseFloat(deductValue) || 0;
    setDeductArea(value);
  };

  const handleCalculate = () => {
    const baseArea =
      tab === "floor"
        ? area.floorArea
        : tab === "wall"
        ? area.wallArea
        : area.totalArea;

    if (!baseArea || parseFloat(baseArea) <= 0) {
      if (tab === "wall" && area?.error) {
        warningMessage(area.error);
      } else {
        warningMessage(t("invalid_area"));
      }
      return;
    }

    const numericArea = parseFloat(baseArea);
    const numericDeductArea = parseFloat(deductArea);

    if (numericDeductArea > numericArea) {
      warningMessage(t("deduct_more_than_area"));
      return;
    }

    const netArea = numericArea - numericDeductArea;

    if (netArea <= 0) {
      warningMessage(t("net_area_zero"));
      return;
    }

    const finalArea = netArea * (1 + includeWastage);

    const getTileAreaInMeter = (sizeStr) => {
      if (!sizeStr) return 0;
      const fixedStr = sizeStr.replace(/[Xx×]/gi, "*");
      const [w, h] = fixedStr.split("*").map((v) => parseFloat(v.trim()));
      if (!w || !h) return 0;
      return (w / 100) * (h / 100);
    };

    const surfaces = [];
    if (tab === "floor" || tab === "both") {
      surfaces.push({
        key: "floor",
        label: t("Floor"),
        area: parseFloat(area.floorArea) || 0,
        tile: size?.mode === "same" ? size?.all : size?.floor,
      });
    }
    if (tab === "wall" || tab === "both") {
      (area?.walls || []).forEach((w, idx) => {
        const wallArea =
          (parseFloat(w.length) || 0) * (parseFloat(w.height) || 0);
        surfaces.push({
          key: w.label || `wall${idx + 1}`,
          label: w.label || `${t("Wall")} ${idx + 1}`,
          area: wallArea,
          tile: size?.mode === "same" ? size?.all : size?.walls?.[w.label],
        });
      });
    }

    const sumArea = surfaces.reduce((s, x) => s + (x.area || 0), 0) || 0;
    if (sumArea <= 0) {
      warningMessage(t("no_surface_area"));
      return;
    }

    const deduction = Math.min(numericDeductArea, sumArea);
    const factor = (sumArea - deduction) / sumArea;

    let totalTiles = 0;
    const results = [];

    for (const s of surfaces) {
      const effArea = (s.area || 0) * factor;
      const effAreaWithWaste = effArea * (1 + includeWastage);
      const tArea = getTileAreaInMeter(s.tile);

      if (!tArea || tArea <= 0) {
        warningMessage(t("tile_size_missing"));
        return;
      }
      const tiles = Math.ceil(effAreaWithWaste / tArea);
      totalTiles += tiles;
      results.push({
        key: s.key,
        label: s.label,
        area: effAreaWithWaste,
        tiles,
      });
    }

    const unit = uniMeasurement === 1 ? t("unit_m2") : t("unit_ft2");
    const areaStr = finalArea.toFixed(2);

    setTotalArea(areaStr + " " + unit);
    setNumberOfTiles(totalTiles);
    setPerResults(results);
  };

  const restartHandler = () => {
    setIsClean(false);

    setUnitMeasurement(1);
    setArea({
      floorArea: "0.00",
      wallArea: "0.00",
      totalArea: "0.00",
      walls: [],
    });
    setDeductArea(0);
    setIncludeWastage(0);
    setSize({ mode: "same", all: "", floor: "", walls: {} });
    setTotalArea(0);
    setNumberOfTiles(0);
    setPerResults([]);
    setTab("floor");

    setTimeout(() => {
      setIsClean(true);
    }, 50);
  };

  const handleWastageChange = useCallback((percentage) => {
    setIncludeWastage(percentage);
  }, []);

  return (
    <main className="px-20 md:px-40 lg:px-80  mt-[145px] lg:mt-[8rem]">
      <section className="mt-[2rem]">
        <UnitMeasurement value={uniMeasurement} onChange={setUnitMeasurement} />
      </section>
      <section className="mt-[3rem]">
        <SelectSurfaceSizeRoom
          uniMeasurement={uniMeasurement}
          setArea={setArea}
          area={area}
          isClean={isClean}
          tab={tab}
          setTab={setTab}
          TABS={TABS}
        />
      </section>
      <section className="mt-[2rem]">
        <Deduction
          uniMeasurement={uniMeasurement}
          onDeductAreaChange={onDeductChange}
          isClean={isClean}
          tab={tab}
          walls={area.walls}
        />
      </section>
      <section className="mt-[2rem]">
        <PrecentageWastage onChange={handleWastageChange} isClean={isClean} />
      </section>
      <section className="mt-[4rem]">
        <TileSize
          value={size}
          onChange={setSize}
          tab={tab}
          walls={area.walls}
          isClean={isClean}
          dataSizes={dataSizes}
        />
      </section>
      <section className="flex  flex-col items-center  mt-[4rem] pb-[3rem] gap-[2rem]">
        <div className="flex items-center gap-[2rem] w-full flex-col md:flex-row lg:w-1/2">
          <Button2
            text={t("Estimatetilearea")}
            onClick={handleCalculate}
            icon={Calculator}
            bgblack={"#000"}
          />
          <Button2
            text={t("Reset")}
            onClick={restartHandler}
            icon={Refresh}
            bgblack={"#000"}
          />
        </div>
        <div className="flex flex-col items-start w-full lg:w-1/2 gap-[1rem]">
          <AnimatePresence>
            {deductArea > 0 && typeof deductArea === "number" && (
              <motion.div
                key="deduct"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-4 p-3 bg-red-50 rounded-lg border border-red-200"
              >
                <span className="font-bold text-red-700">
                  {t("Deductedarea")}:
                </span>
                <span className="text-red-600">
                  {["fa", "ar"].includes(locale)
                    ? toPersianDigits(deductArea.toFixed(2))
                    : deductArea.toFixed(2)}{" "}
                  {uniMeasurement === 1 ? t("unit_m2") : t("unit_ft2")}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {totalArea && (
              <motion.p
                key="area"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
                className="flex items-center flex-row gap-4 p-3 bg-green-50 rounded-lg border border-green-200 w-full"
              >
                <span className="font-bold text-green-700">
                  {t("Finaltilearearequired")} :
                </span>
                <span className="text-green-600">
                  {["fa", "ar"].includes(locale)
                    ? toPersianDigits(totalArea)
                    : totalArea}
                </span>
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {numberOfTiles && (
              <motion.p
                key="tiles"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
                className="flex items-center flex-row gap-4 p-3 bg-blue-50 rounded-lg border border-blue-200 w-full"
              >
                <span className="font-bold text-blue-700">
                  {t("Numberoftilesrequired")} :
                </span>
                <span className="text-blue-600">
                  {["fa", "ar"].includes(locale)
                    ? toPersianDigits(numberOfTiles)
                    : numberOfTiles}{" "}
                  {t("Number")}
                </span>
              </motion.p>
            )}
          </AnimatePresence>

          {perResults.length > 0 && (
            <div className="w-full mt-2 p-10 rounded-lg border border-gray-200 bg-white">
              <p className="font-bold mb-2">{t("Detailsofeachlevel")}</p>
              <div className="flex flex-col gap-2">
                {perResults.map((r) => (
                  <div
                    key={r.key}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="font-medium">{r.label}</span>
                    <span>
                      {t("Area")}:{" "}
                      {["fa", "ar"].includes(locale)
                        ? toPersianDigits(r.area.toFixed(2))
                        : r.area.toFixed(2)}{" "}
                      {uniMeasurement === 1 ? t("unit_m2") : t("unit_ft2")}
                    </span>
                    <span>
                      {t("Tile")}:{" "}
                      {["fa", "ar"].includes(locale)
                        ? toPersianDigits(r.tiles)
                        : r.tiles}{" "}
                      {t("Number")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <ToastContainer />
    </main>
  );
}
