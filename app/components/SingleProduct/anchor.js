"use client";
import { useTranslation } from "@/hook/useTranslation";
import { useState, useEffect } from "react";

export function Anchor({ data }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 680);
    };

    setScrolled(window.scrollY > 50);
    setIsMobile(window.innerWidth < 680);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`flex h-60 fixed ${
        isMobile
          ? "bottom-[30px]"
          : scrolled
          ? "bottom-[30px]"
          : "bottom-[40dvh] lg:bottom-[calc(30dvh)]"
      } left-1/2 -translate-x-1/2 w-[95%] md:w-auto bg-gray-900 rounded-[5px] transition-normal duration-400 z-10`}
    >
      <div className="flex my-auto w-full justify-center">
        {/* <AnchorText text={t("Catalogs")} targetId="catalog" /> */}
        <AnchorText text={t("Gallery")} targetId="gallery" />
        <AnchorText text={t("color")} targetId="colors" />
        {data > 0 && <AnchorText text={t("Projects")} targetId="projects" />}
        <AnchorText text={t("Certificates")} targetId="certificates" end />
      </div>
    </div>
  );
}

function AnchorText({ text, end, targetId }) {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <p
      onClick={handleClick}
      className={`cursor-pointer font-[400] text-[.8rem] md:text-[16px] px-20 text-gray-white my-auto ${
        end ? "" : "border-r-1"
      } border-gray-700`}
    >
      {text}
    </p>
  );
}
