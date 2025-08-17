"use client";
import Link from "next/link";
import React from "react";
import * as Icons from "iconsax-reactjs";
import { useLocalizedLink } from "@/utils/helper";

export default function LinkButton({
  bgColor,
  textColor,
  text,
  href,
  colorIcon,
}) {
  const { localizedHref } = useLocalizedLink();
  return (
    <Link
      className="w-full py-[7px] flex items-center justify-center gap-[.5rem] font-medium text-[14px]"
      href={localizedHref(href)}
      style={{ color: textColor, background: bgColor }}
    >
      {text}

      <Icons.ArrowLeft2
        size="15"
        variant="Outline"
        color={colorIcon ? colorIcon : "#fff"}
        className=" ltr:rotate-180"
      />
    </Link>
  );
}
