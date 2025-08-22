import React, { useState, useEffect } from "react";
import Options from "../module/Options";
import SelectDropDown from "@/app/components/module/SelectDropDown";

const dimensions = [
  { id: "7 * 29", name: "7 * 29" },
  { id: "11.5 * 24", name: "11.5 * 24" },
  { id: "15 * 15", name: "15 * 15" },
  { id: "20 * 20", name: "20 * 20" },
  { id: "25 * 25", name: "25 * 25" },
  { id: "30 * 30", name: "30 * 30" },
  { id: "33 * 33", name: "33 * 33" },
  { id: "40 * 40", name: "40 * 40" },
  { id: "60 * 60", name: "60 * 60" },
  { id: "20 * 120", name: "20 * 120" },
  { id: "60 * 120", name: "60 * 120" },
  { id: "100 * 100", name: "100 * 100" },
];

export default function TileSize({
  value,
  onChange,
  tab,
  walls = [],
  isClean,
}) {
  const [isSameSize, setIsSameSize] = useState(false);
  const [allSize, setAllSize] = useState("");
  const [floorSize, setFloorSize] = useState("");
  const [wallSizes, setWallSizes] = useState({});

  useEffect(() => {
    onChange?.({
      mode: isSameSize ? "same" : "per",
      all: allSize,
      floor: floorSize,
      walls: wallSizes,
    });
  }, [isSameSize, allSize, floorSize, wallSizes, onChange]);

  useEffect(() => {
    // Reset sizes when tab changes (optional)
    setAllSize("");
    setFloorSize("");
    setWallSizes({});
  }, [tab]);

  useEffect(() => {
    // Reset all sizes when isClean changes
    if (isClean) {
      setIsSameSize(false);
      setAllSize("");
      setFloorSize("");
      setWallSizes({});
    }
  }, [isClean]);

  return (
    <div>
      <p className=" font-[600] text-[1rem] pb-30">سایز کاشی</p>
      <div className="grid grid-cols-12 items-start gap-[1rem]">
        <div className="flex flex-col gap-[1rem] col-span-12 md:col-span-6 lg:col-span-4">
          <p className="font-bold text-[.9rem]">
            آیا می‌خواهید اندازه کاشی برای هر سطح یکسان باشد؟
          </p>
          <Options
            isTrue={isSameSize}
            setIsTrue={setIsSameSize}
            text1={"خیر"}
            text2={"بله"}
          />
        </div>

        <div className="col-span-12 lg:col-span-8">
          {isSameSize ? (
            <div className=" flex flex-col md:flex-row md:items-end gap-[1rem] justify-end">
              <span className="font-bold mt-[1.5rem]">
                اندازه کاشی (همه سطوح):{" "}
              </span>
              <div className="flex-1 md:max-w-[300px]">
                <SelectDropDown
                  data={dimensions}
                  label={"cm"}
                  value={allSize}
                  onChange={(selectedOption) =>
                    setAllSize(selectedOption?.value)
                  }
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {(tab === "floor" || tab === "both") && (
                <div className="flex items-end gap-[1rem]  lg:justify-end">
                  <span className="font-bold"> کف : </span>
                  <div className="flex-1 md:max-w-[300px]">
                    <SelectDropDown
                      data={dimensions}
                      label={"cm"}
                      value={floorSize}
                      onChange={(selectedOption) =>
                        setFloorSize(selectedOption?.value)
                      }
                    />
                  </div>
                </div>
              )}

              {(tab === "wall" || tab === "both") && (
                <div className="flex flex-col ">
                  {walls?.map((w) => (
                    <div
                      key={w.label}
                      className="flex items-end mt-[2rem] lg:justify-end gap-[1rem]"
                    >
                      <span className="font-bold">{w.label}:</span>
                      <div className="flex-1 md:max-w-[300px]">
                        <SelectDropDown
                          data={dimensions}
                          label={"cm"}
                          value={wallSizes[w.label] || ""}
                          onChange={(selectedOption) =>
                            setWallSizes((prev) => ({
                              ...prev,
                              [w.label]: selectedOption?.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
