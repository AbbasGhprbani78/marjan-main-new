import Input from "../module/Input";
import React, { useEffect, useState } from "react";
import MySelect from "./../module/SelectDropDown";
import * as Icons from "iconsax-reactjs";

const maxWallsByShape = {
  rectangle: 4,
  square: 4,
  triangle: 3,
  circle: 1,
  semicircle: 2,
  trapezoid: 4,
  parallelogram: 4,
  pentagon: 5,
};

const shapes = [
  {
    label: "مستطیل",
    value: "rectangle",
    inputs: {
      floor: [
        { name: "length", label: "طول (متر)" },
        { name: "width", label: "عرض (متر)" },
      ],
      wall: [
        { name: "length", label: "طول اتاق (متر)" },
        { name: "width", label: "عرض اتاق (متر)" },
      ],
      both: [
        { name: "length", label: "طول اتاق (متر)" },
        { name: "width", label: "عرض اتاق (متر)" },
      ],
    },
  },
  {
    label: "مربع",
    value: "square",
    inputs: {
      floor: [{ name: "side", label: "ضلع (متر)" }],
      wall: [{ name: "side", label: "ضلع اتاق (متر)" }],
      both: [{ name: "side", label: "ضلع اتاق (متر)" }],
    },
  },
  {
    label: "مثلث",
    value: "triangle",
    edges: 3,
    inputs: {
      floor: [
        { name: "length1", label: "ضلع اول (متر)" },
        { name: "length2", label: "ضلع دوم (متر)" },
        { name: "length3", label: "ضلع سوم (متر)" },
      ],
      wall: [
        { name: "length1", label: "طول ضلع 1 (متر)" },
        { name: "length2", label: "طول ضلع 2 (متر)" },
        { name: "length3", label: "طول ضلع 3 (متر)" },
      ],

      both: [
        { name: "length1", label: "ضلع اول (متر)" },
        { name: "length2", label: "ضلع دوم (متر)" },
        { name: "length3", label: "ضلع سوم (متر)" },
      ],
    },
  },
  {
    label: "دایره",
    value: "circle",
    edges: 1,
    inputs: {
      floor: [{ name: "radius", label: "شعاع (متر)" }],
      wall: [
        { name: "radius", label: "شعاع (متر)" },
        { name: "height1", label: "ارتفاع دیوار (متر)" },
      ],
      both: [
        { name: "radius", label: "شعاع (متر)" },
        { name: "height1", label: "ارتفاع دیوار (متر)" },
      ],
    },
  },
  {
    label: "نیم‌دایره",
    value: "semicircle",
    edges: 1,
    inputs: {
      floor: [{ name: "radius", label: "شعاع (متر)" }],
      wall: [{ name: "radius", label: "شعاع (متر)" }],
      both: [{ name: "radius", label: "شعاع (متر)" }],
    },
  },
  {
    label: "ذوزنقه",
    value: "trapezoid",
    edges: 4,
    inputs: {
      floor: [
        { name: "side1", label: "ضلع ۱ (متر)" },
        { name: "side2", label: "ضلع ۲ (متر)" },
        { name: "side3", label: "ضلع ۳ (متر)" },
        { name: "side4", label: "ضلع ۴ (متر)" },
        { name: "floorHeight", label: "ارتفاع کف (متر)" },
      ],
      wall: [
        { name: "side1", label: "ضلع ۱ (متر)" },
        { name: "side2", label: "ضلع ۲ (متر)" },
        { name: "side3", label: "ضلع ۳ (متر)" },
        { name: "side4", label: "ضلع ۴ (متر)" },
        { name: "floorHeight", label: "ارتفاع کف (متر)" },
      ],
      both: [
        { name: "side1", label: "ضلع ۱ (متر)" },
        { name: "side2", label: "ضلع ۲ (متر)" },
        { name: "side3", label: "ضلع ۳ (متر)" },
        { name: "side4", label: "ضلع ۴ (متر)" },
        { name: "floorHeight", label: "ارتفاع کف (متر)" },
      ],
    },
  },
  {
    label: "متوازی‌الأضلاع",
    value: "parallelogram",
    edges: 4,
    inputs: {
      floor: [
        { name: "length1", label: "ضلع اول (متر)" },
        { name: "length2", label: "ضلع دوم (متر)" },
        { name: "height1", label: "ارتفاع (متر)" },
      ],
      wall: [
        { name: "length1", label: "ضلع اول (متر)" },
        { name: "length2", label: "ضلع دوم (متر)" },
        { name: "height1", label: "ارتفاع (متر)" },
      ],
      both: [
        { name: "length1", label: "ضلع اول (متر)" },
        { name: "length2", label: "ضلع دوم (متر)" },
        { name: "height1", label: "ارتفاع (متر)" },
      ],
    },
  },
  {
    label: "پنج‌ضلعی",
    value: "pentagon",
    edges: 5,
    inputs: {
      floor: [{ name: "length1", label: "طول ضلع (متر)" }],
      wall: [{ name: "length1", label: "طول ضلع (متر)" }],
      both: [{ name: "length1", label: "طول ضلع (متر)" }],
    },
  },
];

export default function SelectSurfaceSizeRoom({
  setArea,
  isClean,
  uniMeasurement,
  area,
  tab,
  setTab,
  TABS,
}) {
  const [shape, setShape] = useState("rectangle");
  const [inputs, setInputs] = useState({});
  const [wallHeightsCount, setWallHeightsCount] = useState(1);

  const handleAddHeightRow = () => {
    setWallHeightsCount((prev) => Math.min(prev + 1, maxWalls));
  };

  const handleRemoveHeightRow = (removeIndex) => {
    if (removeIndex <= 0) return;
    setInputs((prev) => {
      const updated = { ...prev };
      for (let j = removeIndex + 1; j <= wallHeightsCount; j++) {
        updated[`height${j - 1}`] = updated[`height${j}`] || "";
      }
      delete updated[`height${wallHeightsCount}`];
      return updated;
    });
    setWallHeightsCount((prev) => Math.max(1, prev - 1));
  };

  const shapeInputs = shapes.find((s) => s.value === shape)?.inputs[tab] || [];

  useEffect(() => {
    setWallHeightsCount(1);
  }, [shape, tab]);

  const maxWalls = maxWallsByShape[shape] || 1;

  useEffect(() => {
    const result = calculateArea({ shape, inputs, tab, wallHeightsCount });

    setArea(result);
  }, [shape, inputs, tab, wallHeightsCount, setArea]);

  return (
    <div>
      <p className="font-[600] text-[1rem] pb-30">نوع سطح و ابعاد اتاق</p>
      <div className="flex justify-between md:justify-center  md:gap-[4rem]">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`border-b ${
              tab === t.value
                ? "bg-[#231f20] text-white"
                : "bg-white text-[#231f20] font-normal"
            } text-[14px] md:text-[18px] py-[8px] md:py-[10px] px-4 md:px-8 cursor-pointer min-w-[80px] md:min-w-[100px] transition-all duration-200`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-[4rem] flex flex-col  lg:flex-row justify-between lg:items-center">
        <div className="flex flex-col md:flex-row items-start gap-[5rem]">
          <div className="w-full lg:w-auto   lg:min-w-[320px] bg-[#fafafa] border border-[#eee] rounded-[10px] py-[1.3rem] px-[1rem] shadow-[0px_0px_4px_0px_#00000040]">
            <MySelect
              data={shapes.map((s) => ({ id: s.value, name: s.label }))}
              value={shape}
              onChange={(selected) => {
                setShape(selected?.value || null);
                setInputs({});
              }}
              name="shape"
              isClearable={false}
            />

            <div className="flex flex-col items-center gap-2 mt-[1rem]">
              <ShapeSVG shape={shape} />
            </div>
          </div>
          <div className="flex justify-between w-full items-center">
            <div className="w-full lg:w-auto md:min-w-[250px]  lg:min-w-[230px]  xl:min-w-[350px]">
              <div className="font-bold text-[18px] mb-[3rem]">
                ابعاد{" "}
                {tab === "floor"
                  ? "کف"
                  : tab === "wall"
                  ? "دیوار"
                  : "کف و دیوار"}
              </div>

              {shapeInputs.map((input) => (
                <div key={input.name} className="mb-[4rem]">
                  <Input
                    label={input.label}
                    name={input.name}
                    value={inputs[input.name] || ""}
                    onChange={(e) => {
                      const raw = e.target.value;
                      const cleaned = raw.replace(/[^\d.]/g, "");
                      const parts = cleaned.split(".");
                      const finalValue =
                        parts.length <= 2 ? cleaned : parts[0] + "." + parts[1];
                      setInputs({ ...inputs, [input.name]: finalValue });
                    }}
                    inputMode="numeric"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {tab !== "floor" && shape !== "circle" && (
          <div className="flex flex-col items-stretch md:min-w-[250px] lg:min-w-[230px]  xl:min-w-[315px]">
            {Array.from({ length: wallHeightsCount }, (_, index) => {
              const key = `height${index + 1}`;
              return (
                <div key={key} className="flex items-end  mb-[2rem]">
                  <div className="flex-1">
                    <Input
                      label={`ارتفاع دیوار ${index + 1}`}
                      name={key}
                      value={inputs[key] || ""}
                      onChange={(e) => {
                        const raw = e.target.value;
                        const cleaned = raw.replace(/[^\d.]/g, "");
                        const parts = cleaned.split(".");
                        const finalValue =
                          parts.length <= 2
                            ? cleaned
                            : parts[0] + "." + parts[1];
                        setInputs({ ...inputs, [key]: finalValue });
                      }}
                      inputMode="numeric"
                      className="w-full"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={
                      index === 0
                        ? handleAddHeightRow
                        : () => handleRemoveHeightRow(index)
                    }
                    className="  flex items-center justify-center "
                    disabled={
                      index === 0
                        ? wallHeightsCount >= maxWalls
                        : wallHeightsCount <= 1
                    }
                    aria-label={index === 0 ? "add" : "remove"}
                  >
                    {index === 0 ? (
                      <Icons.AddCircle size="20" />
                    ) : (
                      <Icons.MinusCirlce size="20" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function ShapeSVG({ shape }) {
  switch (shape) {
    case "rectangle":
      return (
        <svg width="200" height="125">
          <rect
            x="12.5"
            y="37.5"
            width="175"
            height="75"
            fill="#ddd"
            stroke="#888"
          />
        </svg>
      );
    case "square":
      return (
        <svg width="125" height="125">
          <rect
            x="12.5"
            y="12.5"
            width="100"
            height="100"
            fill="#ddd"
            stroke="#888"
          />
        </svg>
      );
    case "triangle":
      return (
        <svg width="150" height="125">
          <polygon
            points="75,12.5 137.5,112.5 12.5,112.5"
            fill="#ddd"
            stroke="#888"
          />
        </svg>
      );
    case "circle":
      return (
        <svg width="125" height="125">
          <circle cx="62.5" cy="62.5" r="50" fill="#ddd" stroke="#888" />
        </svg>
      );
    case "semicircle":
      return (
        <svg width="125" height="75">
          <path
            d="M12.5,62.5 A50,50 0 0,1 112.5,62.5"
            fill="#ddd"
            stroke="#888"
          />
        </svg>
      );
    case "trapezoid":
      return (
        <svg
          width="150"
          height="100"
          viewBox="0 0 150 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="30,80 120,80 100,20 50,20"
            fill="#ddd"
            stroke="#888"
            strokeWidth="2"
          />
        </svg>
      );

    case "parallelogram":
      return (
        <svg width="150" height="100">
          <polygon
            points="37.5,87.5 137.5,87.5 112.5,25 12.5,25"
            fill="#ddd"
            stroke="#888"
          />
        </svg>
      );
    case "pentagon":
      return (
        <svg width="125" height="125">
          <polygon
            points="62.5,12.5 112.5,50 92.5,112.5 32.5,112.5 12.5,50"
            fill="#ddd"
            stroke="#888"
          />
        </svg>
      );
    default:
      return null;
  }
}

function calculateArea({ shape, inputs, tab, wallHeightsCount }) {
  const toNumber = (val) => (val ? parseFloat(val) : 0);
  let walls = [];
  let floorArea = 0;
  let error = null;
  switch (shape) {
    case "rectangle": {
      const length = toNumber(inputs.length);
      const width = toNumber(inputs.width);
      floorArea = length * width;

      const sides = [length, width, length, width];

      walls = [];
      for (let i = 0; i < wallHeightsCount; i++) {
        const height = toNumber(inputs[`height${i + 1}`]);
        const length = sides[i % sides.length];
        if (!isNaN(height)) {
          walls.push({ length, height });
        }
      }
      break;
    }

    case "triangle": {
      const a = toNumber(inputs.length1);
      const b = toNumber(inputs.length2);
      const c = toNumber(inputs.length3);

      if (a + b > c && a + c > b && b + c > a) {
        const s = (a + b + c) / 2;
        const floor = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        floorArea = isNaN(floor) ? 0 : floor;
      } else {
        error = "مقادیر واردشده مثلث معتبر نمی‌سازند.";
        floorArea = 0;
      }

      const sides = [a, b, c];
      walls = [];
      for (let i = 0; i < wallHeightsCount; i++) {
        const height = toNumber(inputs[`height${i + 1}`]);
        const length = sides[i % sides.length]; // مثلاً اگر 5 تا وارد کردیم، دوباره از اول می‌گرده
        if (!isNaN(height)) {
          walls.push({ length, height });
        }
      }

      break;
    }

    case "square": {
      const side = toNumber(inputs.side);
      floorArea = side * side;

      walls = [];
      for (let i = 0; i < wallHeightsCount; i++) {
        const height = toNumber(inputs[`height${i + 1}`]);
        if (!isNaN(height)) {
          walls.push({ length: side, height });
        }
      }

      break;
    }

    case "circle": {
      const r = toNumber(inputs.radius);
      const h = toNumber(inputs.height1);

      floorArea = isNaN(r) ? 0 : Math.PI * r * r;

      const perimeter = 2 * Math.PI * r;
      walls = [];

      for (let i = 0; i < wallHeightsCount; i++) {
        const height = toNumber(inputs[`height${i + 1}`] || h);
        if (!isNaN(height)) {
          walls.push({ length: perimeter, height });
        }
      }

      break;
    }

    case "semicircle": {
      const r = toNumber(inputs.radius);
      floorArea = isNaN(r) ? 0 : 0.5 * Math.PI * r * r;

      const lengths = [2 * r, Math.PI * r]; // قطر و نیم‌دایره

      walls = [];
      for (let i = 0; i < wallHeightsCount; i++) {
        const height = toNumber(inputs[`height${i + 1}`]);
        const length = lengths[i % lengths.length];
        if (!isNaN(height)) {
          walls.push({ length, height });
        }
      }

      break;
    }

    case "trapezoid": {
      const a = toNumber(inputs.side1);
      const b = toNumber(inputs.side2);
      const c = toNumber(inputs.side3);
      const d = toNumber(inputs.side4);
      const h = toNumber(inputs.floorHeight);

      floorArea = !isNaN(a) && !isNaN(b) && !isNaN(h) ? ((a + b) / 2) * h : 0;

      const sides = [a, b, c, d];
      walls = [];

      for (let i = 0; i < wallHeightsCount; i++) {
        const height = toNumber(inputs[`height${i + 1}`]);
        const length = sides[i % sides.length];
        if (!isNaN(height) && !isNaN(length)) {
          walls.push({ length, height });
        }
      }

      break;
    }

    case "parallelogram": {
      const base = toNumber(inputs.length1);
      const side = toNumber(inputs.length2);
      const heightForFloor = toNumber(inputs.height1);

      floorArea =
        isNaN(base) || isNaN(heightForFloor) ? 0 : base * heightForFloor;

      const sides = [base, side, base, side];
      walls = [];

      for (let i = 0; i < wallHeightsCount; i++) {
        const height = toNumber(inputs[`height${i + 1}`]);
        const length = sides[i % sides.length];
        if (!isNaN(height)) {
          walls.push({ length, height });
        }
      }

      break;
    }

    case "pentagon": {
      const a = toNumber(inputs.length1);

      if (tab !== "wall") {
        floorArea = isNaN(a) ? 0 : 1.72048 * a * a;
      }

      if (tab !== "floor") {
        walls = [];
        for (let i = 0; i < wallHeightsCount; i++) {
          const h = toNumber(inputs[`height${i + 1}`]);
          if (!isNaN(a) && !isNaN(h)) {
            walls.push({ length: a, height: h });
          }
        }
      }

      break;
    }

    default:
      walls = [];
      floorArea = 0;
  }
  const wallDetails = walls.map((w, index) => ({
    label: `wall${index + 1}`,
    length: w.length,
    height: w.height,
    area: (w.length * w.height).toFixed(2),
  }));

  const wallArea = walls.reduce((sum, w) => {
    const wall = w.length * w.height;
    return sum + (isNaN(wall) ? 0 : wall);
  }, 0);

  if (tab === "wall") {
    const hasAnyHeight = Array.from({ length: wallHeightsCount }).some(
      (_, i) => {
        const h = toNumber(inputs[`height${i + 1}`]);
        return h > 0;
      }
    );
    if (!hasAnyHeight) {
      error = "برای محاسبه دیوار، وارد کردن حداقل یک ارتفاع الزامی است.";
    }
  }

  return {
    floorArea: floorArea.toFixed(2),
    wallArea: wallArea.toFixed(2),
    totalArea: (floorArea + wallArea).toFixed(2),
    walls: wallDetails,
    error,
  };
}
