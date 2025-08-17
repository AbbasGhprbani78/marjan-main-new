"use client";
import React, { useEffect, useRef, useState } from "react";

export default function AboutHistory({ history }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="gap-[3rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-8 text-center w-3/4 mx-auto"
    >
      {history.map((item, index) => (
        <HistoryComponent key={index} item={item} start={inView} />
      ))}
    </div>
  );
}
const HistoryComponent = ({ item, start }) => {
  const [count, setCount] = useState(0);
  const valueText = item.value;
  const numberMatch = valueText.match(/\d+/);
  const prefix = valueText.split(numberMatch?.[0])[0] || "";
  const targetValue = numberMatch ? parseInt(numberMatch[0], 10) : 0;
  const duration = 2000;

  useEffect(() => {
    if (!start || !targetValue) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      const current = Math.floor(percent * targetValue);
      setCount(current);

      if (percent < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [start, targetValue]);

  return (
    <div className="space-y-3">
      <h3 className="font-[500] text-[1.5rem]">{item.title}</h3>
      <div className="flex items-end gap-3 justify-center">
        <p className="font-[600] text-[1.2rem] mt-[1.1rem]">
          {prefix}
          {count}
        </p>
        <span className="text-[.9rem] font-[500]">{item.unit}</span>
      </div>
    </div>
  );
};
