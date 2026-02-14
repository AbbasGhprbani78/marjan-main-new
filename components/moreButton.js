"use client";
import { useState } from "react";
import * as Icons from "iconsax-reactjs";
import Link from "next/link";
import { useParams } from "next/navigation";

export function MoreButton({
  text,
  width,
  height,
  invert,
  className = "",
  href,
  onClick,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { locale } = useParams();

  const isExternal = href.startsWith("https://");
  const cleanHref = !isExternal && href.startsWith("/") ? href.slice(1) : href;
  const linkHref = isExternal ? href : `/${locale}/${cleanHref}`;

  return (
    <Link
      target={isExternal ? "_blank" : undefined}
      href={linkHref}
      onClick={(e) => {
        if (!href || href === "#") e.preventDefault();
        if (onClick) onClick();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex cursor-pointer button ${
        invert ? "text-gray-white" : ""
      } ${className} ${
        isHovered ? "bg-gray-800 text-gray-white" : ""
      } transition-colors duration-400 backdrop-blur-[4px]`}
      style={{
        minWidth: "157px",
        width: width ? `${width}px` : "auto",
        height: height ? `${height}px` : auto,
      }}
    >
      <p className="ms-auto my-auto">{text}</p>
      <Icons.ArrowLeft2
        size="10"
        className="ms-[10px] me-auto my-auto ltr:rotate-180 transition-transform duration-300"
      />
    </Link>
  );
}
