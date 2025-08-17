import Image from "next/image";
import React, { useEffect, useState } from "react";
import Input from "../module/Input";
import * as Icons from "iconsax-reactjs";
import Options from "../module/Options";

const deductionItems = [
  { key: "door", image: "/images/99.png", name: "درب" },
  { key: "window", image: "/images/100.png", name: "پنجره" },
  { key: "cabinet", image: "/images/101.png", name: "کابینت" },
  { key: "closet", image: "/images/101.png", name: "کمد" },
  { key: "other", image: "/images/101.png", name: "سایر" },
];

export default function Deduction({
  uniMeasurement,
  onDeductAreaChange,
  isClean,
  tab,
  walls,
}) {
  const [isDeduction, setIsDeduction] = useState(false);
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
        const height = key === "window" ? 1 : parseFloat(row.height) || 1; // فرض برای "فقط عرض"
        totalDeductArea += width * height;
      });
    });
    if (onDeductAreaChange) onDeductAreaChange(totalDeductArea.toFixed(2));
  }, [tabRows, uniMeasurement, onDeductAreaChange]);

  useEffect(() => {
    if (isClean) {
      setTabRows(
        deductionItems.map((item) =>
          item.key === "window" ? [{ width: "" }] : [{ width: "", height: "" }]
        )
      );
      setIsDeduction(false);
      setSelectedTab("door");
    }
  }, [isClean]);

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
      <p className="font-[600] text-[1rem] pb-30">کسر</p>
      <div className="grid grid-cols-12 items-start">
        <div className="col-span-4">
          <Options
            setIsTrue={setIsDeduction}
            isTrue={isDeduction}
            text1={"ندارد"}
            text2={"دارد"}
          />
        </div>

        {isDeduction && tab === "floor" && (
          <div className="col-span-8 flex flex-col gap-[2rem]">
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setShowDoorInputs((prev) => !prev)}
                className={`border px-4 py-1 rounded ${
                  showDoorInputs ? "bg-gray-300 font-bold" : ""
                }`}
              >
                درب
              </button>
            </div>

            {showDoorInputs && (
              <div>
                <p className="font-bold text-center">عرض درب‌ها</p>
                {tabRows[getTabIndex("door")]?.map((row, idx) => (
                  <div
                    key={idx}
                    className="flex items-end gap-[1rem] mb-[2.3rem] justify-center"
                  >
                    <span className="font-bold">{`درب (${idx + 1}) :`}</span>

                    <Input
                      label={`عرض (${uniMeasurement === 1 ? "m" : "ft"})`}
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

                    <button
                      type="button"
                      onClick={handleAddRow}
                      className="rounded-full w-[20px] h-[20px] flex items-center justify-center border"
                      disabled={!isDeduction}
                    >
                      <Icons.Add size="20" />
                    </button>

                    {idx !== 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(idx)}
                        className="rounded-full w-[20px] h-[20px] flex items-center justify-center border"
                        disabled={!isDeduction}
                      >
                        <Icons.Minus size="20" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div>
              <p className="font-bold text-center">کسر مساحت کلی کف</p>
              {floorRects.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-end gap-[1rem] mb-[2.3rem] justify-center"
                >
                  <span className="font-bold">{`بخش ${idx + 1} :`}</span>

                  <Input
                    label={`طول (${uniMeasurement === 1 ? "m" : "ft"})`}
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

                  <span>X</span>

                  <Input
                    label={`عرض (${uniMeasurement === 1 ? "m" : "ft"})`}
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

                  <button
                    type="button"
                    onClick={() =>
                      setFloorRects((prev) => [
                        ...prev,
                        { width: "", height: "" },
                      ])
                    }
                    className="rounded-full w-[20px] h-[20px] flex items-center justify-center border"
                    disabled={!isDeduction}
                  >
                    <Icons.Add size="20" />
                  </button>

                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setFloorRects((prev) =>
                          prev.filter((_, i) => i !== idx)
                        );
                      }}
                      className="rounded-full w-[20px] h-[20px] flex items-center justify-center border"
                      disabled={!isDeduction}
                    >
                      <Icons.Minus size="20" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {isDeduction && tab === "wall" && (
          <div>
            <div>
              <h3>انتخاب دیوار:</h3>
              <div style={{ display: "flex", gap: "1rem" }}>
                {walls
                  .filter((w) => Number(w.length) > 0 && Number(w.height) > 0)
                  .map((wall) => (
                    <button
                      key={wall.label}
                      onClick={() => setActiveWall(wall.label)}
                      style={{
                        fontWeight:
                          activeWall === wall.label ? "bold" : "normal",
                        border:
                          activeWall === wall.label
                            ? "2px solid black"
                            : "1px solid gray",
                        padding: "0.5rem 1rem",
                        borderRadius: "5px",
                        background:
                          activeWall === wall.label ? "#e0e0e0" : "#fff",
                      }}
                    >
                      {wall.label}
                    </button>
                  ))}
              </div>
            </div>

            <div>
              <h3>تب‌ها:</h3>
              {deductionItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  style={{
                    fontWeight: activeTab === item.key ? "bold" : "normal",
                    marginRight: "0.5rem",
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div>
              <h4>{`کسرهای ${activeTab} برای ${activeWall}`}</h4>
              {deductions[activeWall]?.[activeTab]?.map((item, idx) => (
                <div key={idx}>
                  <input
                    placeholder="طول"
                    value={item.width}
                    onChange={(e) => handleChange(idx, "width", e.target.value)}
                  />
                  <input
                    placeholder="عرض"
                    value={item.height}
                    onChange={(e) =>
                      handleChange(idx, "height", e.target.value)
                    }
                  />
                  <button onClick={() => handleRemove(idx)}>حذف</button>
                </div>
              ))}
              <button onClick={handleAddItem}>افزودن</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
