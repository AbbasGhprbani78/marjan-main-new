"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Input from "../module/Input";
import * as Icons from "iconsax-reactjs";
import Options from "../module/Options";
import { useTranslation } from "@/context/TranslationContext";

export default function Deduction({
  uniMeasurement,
  onDeductAreaChange,
  isClean,
  tab,
  walls,
}) {
  const [isDeduction, setIsDeduction] = useState(false);
  const { t } = useTranslation();

  const deductionItems = [
    { key: "door", name: t("door"), icon: "GasStation" },
    { key: "window", name: t("window"), icon: "Windows" },
    { key: "cabinet", name: t("cabinet"), icon: "Buliding" },
    { key: "closet", name: t("closet"), icon: "Bus" },
    { key: "other", name: t("other"), icon: "Layer" },
  ];

  useEffect(() => {
    if (!isDeduction) {
      setTabRows(
        deductionItems.map((item) =>
          item.key === "window" ? [{ width: "" }] : [{ width: "", height: "" }]
        )
      );
      setFloorRects([{ width: "", height: "" }]);
      setDeductions({
        wall1: {
          door: [],
          cabinet: [],
          window: [],
          closet: [],
          other: [],
        },
      });
      if (onDeductAreaChange) {
        onDeductAreaChange(false);
      }
    }
  }, [isDeduction, onDeductAreaChange]);
  const [selectedTab, setSelectedTab] = useState("door");
  const [floorRects, setFloorRects] = useState([{ width: "", height: "" }]);
  const [showDoorInputs, setShowDoorInputs] = useState(false);
  const [activeWall, setActiveWall] = useState("wall1");
  const [activeTab, setActiveTab] = useState("door");
  const [deductions, setDeductions] = useState({
    wall1: {
      door: [],
      cabinet: [],
      window: [],
      closet: [],
      other: [],
    },
  });

  const [tabRows, setTabRows] = useState(() =>
    deductionItems.map((item) =>
      item.key === "window" ? [{ width: "" }] : [{ width: "", height: "" }]
    )
  );

  const getTabIndex = (key) =>
    deductionItems.findIndex((item) => item.key === key);

  const handleInputChange = (rowIdx, field, value) => {
    const tabIndex = getTabIndex(selectedTab);
    setTabRows((prev) => {
      const updated = [...prev];
      updated[tabIndex][rowIdx] = {
        ...updated[tabIndex][rowIdx],
        [field]: value,
      };
      return updated;
    });
  };

  const handleAddRow = () => {
    const tabIndex = getTabIndex(selectedTab);
    setTabRows((prev) => {
      const updated = [...prev];
      const newItem =
        selectedTab === "window" ? { width: "" } : { width: "", height: "" };
      updated[tabIndex] = [...updated[tabIndex], newItem];
      return updated;
    });
  };

  const handleRemoveRow = (rowIdx) => {
    const tabIndex = getTabIndex(selectedTab);
    setTabRows((prev) => {
      const updated = [...prev];
      updated[tabIndex] = updated[tabIndex].filter((_, i) => i !== rowIdx);
      return updated;
    });
  };

  useEffect(() => {
    let totalDeductArea = 0;

    tabRows.forEach((rows, i) => {
      const key = deductionItems[i].key;
      rows.forEach((row) => {
        const width = parseFloat(row.width) || 0;
        const height = key === "window" ? 1 : parseFloat(row.height) || 1;
        totalDeductArea += width * height;
      });
    });

    Object.keys(deductions).forEach((wallKey) => {
      Object.keys(deductions[wallKey]).forEach((deductionType) => {
        deductions[wallKey][deductionType].forEach((item) => {
          const width = parseFloat(item.width) || 0;
          const height = parseFloat(item.height) || 0;
          totalDeductArea += width * height;
        });
      });
    });

    floorRects.forEach((item) => {
      const width = parseFloat(item.width) || 0;
      const height = parseFloat(item.height) || 0;
      totalDeductArea += width * height;
    });

    if (onDeductAreaChange) {
      onDeductAreaChange(totalDeductArea.toFixed(2));
    }
  }, [
    tabRows,
    deductions,
    floorRects,
    uniMeasurement,
    onDeductAreaChange,
    isClean,
  ]);

  const handleAddItem = () => {
    setDeductions((prev) => {
      const wall = prev[activeWall] || {};
      const tab = wall[activeTab] || [];
      return {
        ...prev,
        [activeWall]: {
          ...wall,
          [activeTab]: [...tab, { width: "", height: "" }],
        },
      };
    });
  };

  const handleChange = (index, field, value) => {
    setDeductions((prev) => {
      const updatedItems = [...prev[activeWall][activeTab]];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      return {
        ...prev,
        [activeWall]: {
          ...prev[activeWall],
          [activeTab]: updatedItems,
        },
      };
    });
  };

  const handleRemove = (index) => {
    setDeductions((prev) => {
      const updatedItems = prev[activeWall][activeTab].filter(
        (_, i) => i !== index
      );
      return {
        ...prev,
        [activeWall]: {
          ...prev[activeWall],
          [activeTab]: updatedItems,
        },
      };
    });
  };

  return (
    <div>
      <p className="font-[600] text-[1rem] pb-30">{t("deduction")}</p>
      <div className="grid grid-cols-12 items-start gap-y-[2rem] lg:gap-y-0 lg:gap-[4rem]">
        <div className="col-span-12 md:col-span-6 lg:col-span-4 ">
          <Options
            setIsTrue={setIsDeduction}
            isTrue={isDeduction}
            text1={t("No")}
            text2={t("Yes")}
          />
        </div>

        {isDeduction && tab === "floor" && (
          <div className="col-span-12 lg:col-span-8">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setShowDoorInputs((prev) => !prev)}
                  className={`flex justify-center gap-4 border-t border-b items-center min-w-[133px] py-[8px] font-bold 
    transition-colors duration-300
    ${
      showDoorInputs ? "text-white bg-black" : "hover:text-white hover:bg-black"
    }
  `}
                >
                  {t("door")}
                  <Icons.GasStation size={20} />
                </button>
              </div>

              {showDoorInputs && (
                <div className="">
                  {tabRows[getTabIndex("door")]?.map((row, idx) => (
                    <div
                      key={idx}
                      className="flex items-center mt-[2rem] gap-[1rem] w-full  md:max-w-[400px]"
                    >
                      <span className="font-bold">{`${t("door")} ${
                        idx + 1
                      }`}</span>
                      <div className="flex flex-1 gap-5">
                        <div className="flex-1">
                          <Input
                            label={`${t("Width")} (${
                              uniMeasurement === 1 ? t("Meter") : t("Foot")
                            })`}
                            value={row.width}
                            onChange={(e) => {
                              const raw = e.target.value;
                              const cleaned = raw.replace(/[^\d.]/g, "");
                              const parts = cleaned.split(".");
                              const finalValue =
                                parts.length <= 2
                                  ? cleaned
                                  : parts[0] + "." + parts[1];
                              handleInputChange(idx, "width", finalValue);
                            }}
                            disabled={!isDeduction}
                          />
                        </div>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={handleAddRow}
                            className="rounded-full flex items-center justify-center disabled:opacity-50"
                            disabled={!isDeduction}
                          >
                            <Icons.AddCircle fontSize="20" />
                          </button>

                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveRow(idx)}
                              className="rounded-full flex items-center justify-center disabled:opacity-50"
                              disabled={!isDeduction}
                            >
                              <Icons.MinusCirlce fontSize="20" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className=" pt-[1rem]">
              {/* <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                {t("Fractionofthetotalfloorarea")}
              </h4> */}
              <div className="">
                {floorRects.map((item, idx) => (
                  <div key={idx} className="flex items-end gap-5">
                    <div className="flex flex-1 items-end gap-[1.5rem] mt-[2rem]">
                      <Input
                        label={`${t("Length")} (${
                          uniMeasurement === 1 ? t("Meter") : t("Foot")
                        })`}
                        value={item.height}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^\d.]/g, "");
                          setFloorRects((prev) => {
                            const updated = [...prev];
                            updated[idx].height = value;
                            return updated;
                          });
                        }}
                        disabled={!isDeduction}
                      />

                      <span className="font-bold">X</span>

                      <Input
                        label={`${t("Width")} (${
                          uniMeasurement === 1 ? "Meter" : "Foot"
                        })`}
                        value={item.width}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^\d.]/g, "");
                          setFloorRects((prev) => {
                            const updated = [...prev];
                            updated[idx].width = value;
                            return updated;
                          });
                        }}
                        disabled={!isDeduction}
                      />
                    </div>
                    <div className="flex ">
                      {idx === 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            setFloorRects((prev) => [
                              ...prev,
                              { width: "", height: "" },
                            ])
                          }
                          className="rounded-full flex items-center justify-center disabled:opacity-50"
                          disabled={!isDeduction}
                        >
                          <Icons.AddCircle fontSize="20" />
                        </button>
                      )}

                      {idx !== 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setFloorRects((prev) =>
                              prev.filter((_, i) => i !== idx)
                            );
                          }}
                          className="rounded-full flex items-center justify-center disabled:opacity-50"
                          disabled={!isDeduction}
                        >
                          <Icons.MinusCirlce fontSize="20" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {isDeduction && tab === "wall" && (
          <div className="col-span-12 lg:col-span-8">
            <div className="flex flex-nowrap gap-[1rem] overflow-x-auto mb-[1.5rem] hide-scrollbar">
              {walls
                .filter((w) => Number(w.length) > 0 && Number(w.height) > 0)
                .map((wall) => (
                  <button
                    key={wall.label}
                    onClick={() => setActiveWall(wall.label)}
                    className={`px-8 py-4 rounded-lg border-2 transition-all duration-200 font-medium ${
                      activeWall === wall.label
                        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-md"
                        : "border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {wall.label}
                  </button>
                ))}
            </div>

            <div className="flex flex-nowrap gap-[1rem] overflow-x-auto  hide-scrollbar">
              {deductionItems.map((item) => {
                const IconComponent = Icons[item.icon];
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveTab(item.key)}
                    className={`flex justify-center gap-4 border-t border-b items-center min-w-[130px] py-[8px] font-bold
        transition-colors duration-300
        ${
          activeTab === item.key
            ? "text-white bg-black"
            : "hover:text-white hover:bg-black"
        }
      `}
                  >
                    {item.name}
                    {IconComponent && <IconComponent size="20" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-[2rem]">
              {(deductions[activeWall]?.[activeTab]?.length
                ? deductions[activeWall][activeTab]
                : [{ width: "", height: "" }]
              ).map((item, idx) => (
                <div key={idx} className="flex items-end gap-5">
                  <div className="flex flex-1 items-end gap-[1.5rem] mt-[2rem]">
                    <Input
                      label={`${t("Length")} (${
                        uniMeasurement === 1 ? t("Meter") : t("Foot")
                      })`}
                      value={item.width}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          "width",
                          e.target.value.replace(/[^\d.]/g, "")
                        )
                      }
                      disabled={!isDeduction}
                    />

                    <span className="font-bold">X</span>

                    <Input
                      label={`${t("Width")} (${
                        uniMeasurement === 1 ? t("Meter") : t("Foot")
                      })`}
                      value={item.height}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          "height",
                          e.target.value.replace(/[^\d.]/g, "")
                        )
                      }
                      disabled={!isDeduction}
                    />
                  </div>

                  <div className="flex">
                    {idx === 0 ? (
                      <button
                        type="button"
                        onClick={handleAddItem}
                        className="rounded-full flex items-center justify-center disabled:opacity-50"
                        disabled={!isDeduction}
                      >
                        <Icons.AddCircle fontSize="20" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleRemove(idx)}
                        className="rounded-full flex items-center justify-center disabled:opacity-50"
                        disabled={!isDeduction}
                      >
                        <Icons.MinusCirlce fontSize="20" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isDeduction && tab === "both" && (
          <div className="col-span-12 lg:col-span-8">
            <div className="flex flex-nowrap gap-[1rem] overflow-x-auto mb-[1.5rem] hide-scrollbar">
              {walls
                .filter((w) => Number(w.length) > 0 && Number(w.height) > 0)
                .map((wall) => (
                  <button
                    key={wall.label}
                    onClick={() => setActiveWall(wall.label)}
                    className={`px-8 py-4 rounded-lg border-2 transition-all duration-200 font-medium ${
                      activeWall === wall.label
                        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-md"
                        : "border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {wall.label}
                  </button>
                ))}
            </div>

            <div className="flex flex-nowrap gap-[1rem] overflow-x-auto  hide-scrollbar">
              {deductionItems.map((item) => {
                const IconComponent = Icons[item.icon];
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveTab(item.key)}
                    className={`flex justify-center gap-4 border-t border-b items-center min-w-[130px] py-[8px] font-bold
        transition-colors duration-300
        ${
          activeTab === item.key
            ? "text-white bg-black"
            : "hover:text-white hover:bg-black"
        }
      `}
                  >
                    {item.name}
                    {IconComponent && <IconComponent size="20" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-[2rem]">
              {(deductions[activeWall]?.[activeTab]?.length
                ? deductions[activeWall][activeTab]
                : [{ width: "", height: "" }]
              ).map((item, idx) => (
                <div key={idx} className="flex items-end gap-5">
                  <div className="flex flex-1 items-end gap-[1.5rem] mt-[2rem]">
                    <Input
                      label={`${t("Length")} (${
                        uniMeasurement === 1 ? t("Meter") : t("Foot")
                      })`}
                      value={item.width}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          "width",
                          e.target.value.replace(/[^\d.]/g, "")
                        )
                      }
                      disabled={!isDeduction}
                    />

                    <span className="font-bold">X</span>

                    <Input
                      label={`${t("Width")} (${
                        uniMeasurement === 1 ? t("Meter") : t("Foot")
                      })`}
                      value={item.height}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          "height",
                          e.target.value.replace(/[^\d.]/g, "")
                        )
                      }
                      disabled={!isDeduction}
                    />
                  </div>

                  <div className="flex">
                    {idx === 0 ? (
                      <button
                        type="button"
                        onClick={handleAddItem}
                        className="rounded-full flex items-center justify-center disabled:opacity-50"
                        disabled={!isDeduction}
                      >
                        <Icons.AddCircle fontSize="20" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleRemove(idx)}
                        className="rounded-full flex items-center justify-center disabled:opacity-50"
                        disabled={!isDeduction}
                      >
                        <Icons.MinusCirlce fontSize="20" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className=" pt-[1rem]">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                {t("Fractionofthetotalfloorarea")}
              </h4>
              <div className="">
                {floorRects.map((item, idx) => (
                  <div key={idx} className="flex items-end gap-5">
                    <div className="flex flex-1 items-end gap-[1.5rem] mt-[2rem]">
                      <Input
                        label={`${t("Length")} (${
                          uniMeasurement === 1 ? t("Meter") : t("Foot")
                        })`}
                        value={item.height}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^\d.]/g, "");
                          setFloorRects((prev) => {
                            const updated = [...prev];
                            updated[idx].height = value;
                            return updated;
                          });
                        }}
                        disabled={!isDeduction}
                      />

                      <span className="font-bold">X</span>

                      <Input
                        label={`${t("Width")} (${
                          uniMeasurement === 1 ? t("Meter") : t("Foot")
                        })`}
                        value={item.width}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^\d.]/g, "");
                          setFloorRects((prev) => {
                            const updated = [...prev];
                            updated[idx].width = value;
                            return updated;
                          });
                        }}
                        disabled={!isDeduction}
                      />
                    </div>
                    <div className="flex ">
                      {idx === 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            setFloorRects((prev) => [
                              ...prev,
                              { width: "", height: "" },
                            ])
                          }
                          className="rounded-full flex items-center justify-center disabled:opacity-50"
                          disabled={!isDeduction}
                        >
                          <Icons.AddCircle fontSize="20" />
                        </button>
                      )}

                      {idx !== 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setFloorRects((prev) =>
                              prev.filter((_, i) => i !== idx)
                            );
                          }}
                          className="rounded-full flex items-center justify-center disabled:opacity-50"
                          disabled={!isDeduction}
                        >
                          <Icons.MinusCirlce fontSize="20" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
