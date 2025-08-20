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

const TABS = [
  { label: "کف", value: "floor" },
  { label: "دیوار", value: "wall" },
  { label: "کف و دیوار", value: "both" },
];
export default function CalculatorT() {
  const [uniMeasurement, setUnitMeasurement] = useState(1);
  const [area, setArea] = useState({
    floorArea: "0.00",
    wallArea: "0.00",
    totalArea: "0.00",
    walls: [],
  });
  const [tab, setTab] = useState("floor");
  const [includeWastage, setIncludeWastage] = useState(false);
  const [size, setSize] = useState(0);
  const [isClean, setIsClean] = useState(true);
  const [totalArea, setTotalArea] = useState(0);
  const [numberOfTiles, setNumberOfTiles] = useState(0);
  const onDeductChange = () => {};

  const handleCalculate = () => {};

  const restartHandler = () => {
    setUnitMeasurement(1);
    setArea({
      floorArea: "0.00",
      wallArea: "0.00",
      totalArea: "0.00",
      walls: [],
    });
    setDeductArea(0);
    setIncludeWastage(false);
    setSize(0);
    setIsClean(true);
    setTotalArea(0);
    setNumberOfTiles(0);
  };

  const handleWastageChange = useCallback((checked) => {
    setIncludeWastage(checked);
  }, []);

  return (
    <main className="px-20 md:px-40 lg:px-80  mt-[8rem]">
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
          onDeductChange={onDeductChange}
          isClean={isClean}
          tab={tab}
          walls={area.walls}
        />
      </section>
      <section className="mt-[2rem]">
        <PrecentageWastage onChange={handleWastageChange} />
      </section>
      <section className="mt-[4rem]">
        <TileSize value={size} onChange={setSize} />
      </section>
      <section className="flex  flex-col items-center  mt-[4rem] pb-[3rem] gap-[2rem]">
        <div className="flex items-center gap-[2rem] w-1/2">
          <Button2
            text={"برآورد متراژ کاشی"}
            onClick={handleCalculate}
            icon={Calculator}
            bgblack={"#000"}
          />
          <Button2
            text={"تنظیم مجدد"}
            onClick={restartHandler}
            icon={Refresh}
            bgblack={"#000"}
          />
        </div>
        <div className="flex flex-col items-start w-1/2 gap-[1rem]">
          <AnimatePresence>
            {totalArea && (
              <motion.p
                key="area"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
                className="flex items-center flex-row gap-4"
              >
                <span className="font-bold">متراژ نهایی کاشی مورد نیاز : </span>
                {totalArea}
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
                className="flex items-center flex-row gap-4"
              >
                <span className="font-bold">تعداد کاشی مورد نیاز : </span>
                {numberOfTiles}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>

      <ToastContainer />
    </main>
  );
}

// setIsClean(false);

// if (!area || area <= 0) {
//   warningMessage("لطفاً ابتدا مساحت را وارد کنید.");
//   return;
// }

// const numericArea = parseFloat(area);
// const numericDeductArea = parseFloat(DeductArea);

// if (numericDeductArea > numericArea || numericDeductArea === numericArea) {
//   warningMessage(
//     "مقدار کسر شده نمی‌تواند بیشتر یا مساوی با مساحت کل باشد."
//   );
//   return;
// }

// const netArea = area - DeductArea;

// if (netArea <= 0) {
//   warningMessage("مساحت نهایی باید بیشتر از صفر باشد.");
//   return;
// }

// const finalArea = includeWastage ? netArea * 1.05 : netArea;

// const getTileAreaInMeter = (sizeStr) => {
//   if (!sizeStr) return 0;
//   const [w, h] = sizeStr.split("*").map((v) => parseFloat(v.trim()));
//   if (!w || !h) return 0;
//   return (w / 100) * (h / 100);
// };

// const tileArea = getTileAreaInMeter(size);

// if (!tileArea || tileArea <= 0) {
//   warningMessage("لطفاً اندازه کاشی را به درستی انتخاب کنید.");
//   return;
// }

// const tileCount = Math.ceil(finalArea / tileArea);
// const unit = uniMeasurement === 1 ? "متر مربع" : "فوت مربع";
// const areaStr = finalArea.toFixed(2);
// setTotalArea(areaStr + " " + unit);
// setNumberOfTiles(tileCount);
