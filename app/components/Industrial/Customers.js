import Image from "next/image";
import React from "react";
import styles from "./Customer.module.css";

export default function Customers({ data }) {
  const marqueeStyle = {
    "--dynamic-items": data.customerImages ? data.customerImages.length : 8,
  };
  return (
    <div>
      <h3 className="text-center md:text-start font-medium title  mb-[2.5rem] md:mb-[1.5rem]">
        {data.title}
      </h3>

      <div
        className={`${styles.marquee} ${styles.marquee__8}`}
        style={marqueeStyle}
      >
        {data.customerImages &&
          data.customerImages.map((item, i) => (
            <div
              className={`${styles.marquee__item} relative  `}
              key={i}
              style={{ "--marquee-item-index": i + 1 }}
            >
              <Image
                src={item}
                alt="Customer logos"
                fill
                loading={i === 0 ? "eager" : "lazy"}
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
