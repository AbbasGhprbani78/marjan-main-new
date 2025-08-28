import React, { useState, useMemo } from "react";
import DropDown from "./DropDown";

const isLeapYear = (year) => {
  const mod = ((year - (year > 0 ? 474 : 473)) % 2820) + 474;
  return ((mod + 38) * 682) % 2816 < 682;
};

const DatePicker = ({ startYear, endYear, onChange }) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from(
    { length: endYear - startYear + 1 },
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

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleChange = (type, value) => {
    if (type === "day") setDay(value);
    if (type === "month") {
      setMonth(value);
      setDay("");
    }
    if (type === "year") {
      setYear(value);
      setDay("");
    }

    if (onChange) {
      onChange({
        day: type === "day" ? value : day,
        month: type === "month" ? value : month,
        year: type === "year" ? value : year,
      });
    }
  };

  return (
    <div className="grid grid-cols-12 gap-[1rem]">
      <div className="col-span-4">
        <DropDown
          label="روز"
          options={days}
          value={day}
          onChange={(e) => handleChange("day", e.target.value)}
        />
      </div>

      <div className="col-span-4">
        <DropDown
          label="ماه"
          options={months}
          value={month}
          onChange={(e) => handleChange("month", e.target.value)}
        />
      </div>

      <div className="col-span-4">
        <DropDown
          label="سال"
          options={years}
          value={year}
          onChange={(e) => handleChange("year", e.target.value)}
        />
      </div>
    </div>
  );
};

export default DatePicker;
