import React, { useState, useMemo, useEffect } from "react";
import DropDown from "./DropDown";
import jalaali from "jalaali-js";

const isLeapYear = (year) => {
  const mod = ((year - (year > 0 ? 474 : 473)) % 2820) + 474;
  return ((mod + 38) * 682) % 2816 < 682;
};

const DatePicker = ({
  startYear,
  endYear,
  value = "",
  onChange,
  error = "",
}) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (value) {
      const [y, m, d] = value.split("/");
      setYear(y || "");
      setMonth(m || "");
      setDay(d || "");
    }
  }, [value]);

  // محاسبه سال جاری شمسی
  const currentJalaliYear = jalaali.toJalaali(new Date()).jy;
  const lastYear = endYear || currentJalaliYear + 1;

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from(
    { length: lastYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const daysInMonth = useMemo(() => {
    if (!month) return 31;

    const m = parseInt(month);
    const y = parseInt(year);

    if (m >= 1 && m <= 6) return 31;
    if (m >= 7 && m <= 11) return 30;
    if (m === 12) return y && isLeapYear(y) ? 30 : 29;

    return 31;
  }, [month, year]);

  const daysInMonthFor = (m, y) => {
    const month = parseInt(m);
    const year = parseInt(y);

    if (!month) return 31;
    if (month >= 1 && month <= 6) return 31;
    if (month >= 7 && month <= 11) return 30;
    if (month === 12) return year && isLeapYear(year) ? 30 : 29;
    return 31;
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleChange = (type, val) => {
    let newDay = day;
    let newMonth = month;
    let newYear = year;

    if (type === "day") newDay = val;
    if (type === "month") {
      newMonth = val;
      if (newDay && parseInt(newDay) > daysInMonthFor(val, newYear)) {
        newDay = "";
      }
    }
    if (type === "year") {
      newYear = val;
      if (newDay && parseInt(newDay) > daysInMonthFor(newMonth, val)) {
        newDay = "";
      }
    }

    setDay(newDay);
    setMonth(newMonth);
    setYear(newYear);

    if (onChange) {
      const formatted =
        newYear && newMonth && newDay
          ? `${newYear}/${String(newMonth).padStart(2, "0")}/${String(
              newDay
            ).padStart(2, "0")}`
          : "";
      onChange(formatted);
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-[1rem]">
        <div className="col-span-4">
          <DropDown
            label="روز"
            options={days.map((d) => ({ id: d, value: d }))}
            value={day}
            onChange={(val) => handleChange("day", val)}
            error={error}
            hideError="true"
          />
        </div>
        <div className="col-span-4">
          <DropDown
            label="ماه"
            options={months.map((m) => ({ id: m, value: m }))}
            value={month}
            onChange={(val) => handleChange("month", val)}
            error={error}
            hideError="true"
          />
        </div>
        <div className="col-span-4">
          <DropDown
            label="سال"
            options={years.map((y) => ({ id: y, value: y }))}
            value={year}
            onChange={(val) => handleChange("year", val)}
            error={error}
            hideError="true"
          />
        </div>
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </>
  );
};

export default DatePicker;
