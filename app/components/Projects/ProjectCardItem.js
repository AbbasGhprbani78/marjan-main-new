"use client";
import { truncateText, useLocalizedLink } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProjectCardItem({ project }) {
  const { localizedHref } = useLocalizedLink();
  return (
    <Link href={localizedHref("/projects/1")}>
      <div className="relative w-full aspect-[4/2]   mb-[1rem]  overflow-hidden">
        <Image
          src={project.image}
          alt="project image item"
          fill
          className="object-cover transform transition-transform duration-[2000ms] ease-in-out hover:scale-[1.15]"
        />
      </div>
      <h3 className="font-bold text-[1.1rem] text-[var(--color-gray-900)] mb-[.5rem]">
        {project.title}
      </h3>
      {/* <p className="text-[#919191] font-normal text-[.9rem]">
        <span>مکان : </span>
        {truncateText(project.text, 50)}
      </p> */}
    </Link>
  );
}
