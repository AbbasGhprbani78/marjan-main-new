"use client";
import Image from "next/image";
import * as Icons from "iconsax-reactjs";
import { useState, useEffect } from "react";
import { MoreButton } from "./moreButton";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from "next/navigation";
import FilterHeader from "./module/FilterHeader";
import { useTranslation } from "@/hook/useTranslation";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [showInnerMenu, setShowInnerMenu] = useState(false); //
  const [isShowSearch, setIsShowSearch] = useState(false); //
  const [showFilterMenu, setShowFilterMenu] = useState(false); //
  const [isOpen, setIsOpen] = useState(false); //
  const [isHovered, setIsHovered] = useState(false);
  const [isChangeBg, setIsChangeBg] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale } = useParams();
  const { t } = useTranslation();

  function handleLangChange(newLocale) {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length && ["fa", "en"].includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    const newPathname = "/" + segments.join("/");
    const search = searchParams.toString();

    document.cookie = `lang=${newLocale}; path=/; max-age=31536000`;

    setIsOpen(false);
    router.push(newPathname + (search ? "?" + search : ""));
  }

  const currentLocale = pathname.split("/")[1] || "fa";
  const cleanPathname = pathname.replace(`/${locale}`, "");
  const isInDustrial = cleanPathname === "/industrial";

  const isSpecialPage =
    cleanPathname === "/products" ||
    cleanPathname === "/catalog" ||
    cleanPathname === "/representatives" ||
    cleanPathname === "/contactus" ||
    cleanPathname === "/calculator" ||
    cleanPathname === "/saved";

  const shouldApplyScrolledStyles =
    scrolled || isHovered || isSpecialPage || isChangeBg;

  const isActive = (route) => {
    if (route === "/") {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname === `/${locale}${route}`;
  };

  const handleToggle = (menu) => {
    setShowInnerMenu(menu === "inner" ? !showInnerMenu : false);
    setIsShowSearch(menu === "search" ? !isShowSearch : false);
    setShowFilterMenu(menu === "filter" ? !showFilterMenu : false);
    setIsOpen(menu === "open" ? !isOpen : false);
  };

  useEffect(() => {
    if (showInnerMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showInnerMenu]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight - 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setShowFilterMenu(false);
    setIsOpen(false);
    setIsChangeBg(false);
    setIsShowSearch(false);
  }, [pathname]);

  return (
    <header
      className="absolute w-full z-20 bg-gary-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`hidden lg:flex flex-row justify-between w-full fixed z-10 h-102 px-40 xl:px-80 py-10 font-fa transition-all duration-300 ${
          shouldApplyScrolledStyles
            ? isInDustrial
              ? "bg-[#fabd02]"
              : "bg-gray-white"
            : ""
        }`}
      >
        <nav
          className={`flex flex-row my-auto  lg:gap-30 xl:gap-50 text-[16px] ${
            shouldApplyScrolledStyles
              ? isInDustrial
                ? "text-gray-700"
                : "text-gray-900"
              : "text-gray-white"
          }`}
        >
          <div className="flex items-center gap-[30px]">
            <HamburgerButton
              isOpen={showInnerMenu}
              onClick={() => {
                handleToggle("inner");
                setIsChangeBg((prev) => !prev);
              }}
              scrolled={scrolled}
              isSpecialPage={shouldApplyScrolledStyles}
            />
            <div className="relative">
              <div
                className="cursor-pointer flex items-center gap-[5px] select-none"
                onClick={() => handleToggle("open")}
              >
                <Icons.ArrowDown2
                  size="20"
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
                {currentLocale.toUpperCase()}
              </div>

              {isOpen && (
                <ul className="absolute top-full mt-2 bg-white shadow-md text-sm overflow-hidden z-[9999] text-[var(--color-gray-900)]">
                  <li
                    className=" hover:bg-gray-100 cursor-pointer font-semibold p-[7px]"
                    onClick={() => handleLangChange("fa")}
                  >
                    Fa
                  </li>
                  <li
                    className=" hover:bg-gray-100 cursor-pointer p-[7px]"
                    onClick={() => handleLangChange("en")}
                  >
                    En
                  </li>
                </ul>
              )}
            </div>
            <div className="relative cursor-pointer">
              <Icons.SearchNormal1
                size="20"
                onClick={() => handleToggle("search")}
              />
              <BoxSearch showBox={isShowSearch} />
            </div>
            <Link
              href={`/${locale}/saved`}
              className={`custom-link ${isActive("/saved") && "active"}`}
            >
              <Icons.Save2 size="20" />
            </Link>
          </div>
          <Link
            href={`/${locale}`}
            className={`custom-link ${isActive("/") && "active"}`}
          >
            {t("Home")}
          </Link>
          <li
            className="flex cursor-pointer items-center"
            onClick={() => handleToggle("filter")}
          >
            <p>{t("Products")}</p>
            <motion.div
              animate={{ rotate: showFilterMenu ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="ms-2"
            >
              <Icons.ArrowDown2 size="20" />
            </motion.div>
          </li>
          <Link
            href={`/${locale}/catalog`}
            className={`custom-link ${isActive("/catalog") && "active"}`}
          >
            {t("Catalog")}
          </Link>

          <Link
            href={`/${locale}/representatives`}
            className={`custom-link ${
              isActive("/representatives") && "active"
            }`}
          >
            {t("Representatives")}
          </Link>

          <Link
            href={`/${locale}/aboutus`}
            className={`custom-link ${isActive("/aboutus") && "active"}`}
          >
            {t("About")}
          </Link>
        </nav>

        <Link
          href={`/${locale}`}
          className="relative w-[0px] aspect-[3/2] md:w-[205px]"
        >
          <Image
            src={locale === "fa" ? "/images/logofa.png" : "/images/logo1.png"}
            alt="White Logo"
            fill
            className={`${
              shouldApplyScrolledStyles ? "invert" : ""
            } object-contain`}
          />
        </Link>

        <Menu show={showInnerMenu} setShowInnerMenu={setShowInnerMenu} />
        <FilterHeader
          show={showFilterMenu}
          setShowFilterMenu={setShowFilterMenu}
        />
      </div>
      <MenuMobile />
    </header>
  );
}

function Menu({ show, setShowInnerMenu }) {
  const { locale } = useParams();

  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState({
    assistant: false,
    blog: false,
    collab: false,
  });

  const pathname = usePathname();

  const localizedPath = (path) => `/${locale}${path}`;
  const isActivePath = (route) =>
    route === "/"
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname === `/${locale}${route}`;

  const toggleItem = (key) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    setShowInnerMenu(false);
  }, [pathname, setShowInnerMenu]);

  return (
    <>
      <div
        className={`
    fixed top-[102px] left-0 right-0 bottom-0 z-40 bg-[#00000056]
    transition-opacity duration-500 ease-in-out
    ${
      show
        ? "opacity-100 delay-500 pointer-events-auto"
        : "opacity-0 delay-0 pointer-events-none"
    }
  `}
      />

      <div
        className={`w-full fixed top-[102px] left-0 right-0 z-50 transition-all duration-700 ease-in-out bottom-0 ${
          show ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-start gap-[2.5rem] text-[var(--color-gray-900)] h-full overflow-y-auto  hide-scrollbar w-[53%] bg-white lg:px-80 pb-[2rem] pt-10 ">
          <li className="w-full">
            <div
              onClick={() => toggleItem("assistant")}
              className="flex items-center gap-[10px] cursor-pointer"
            >
              {t("DigitalAssistant")}
              <Icons.ArrowDown2
                size="20"
                className={`transition-transform duration-300 ${
                  openItems.assistant ? "rotate-180" : ""
                }`}
              />
            </div>
            <AnimatePresence>
              {openItems.assistant && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-[10px] flex flex-col gap-2 text-sm text-black"
                >
                  <li className="py-[10px] ">
                    <Link
                      href={localizedPath("/chatbot")}
                      className="custom-link"
                    >
                      {t("Chatbot")}
                    </Link>
                  </li>
                  <li className="py-[10px] ">
                    <Link
                      href="https://marjan.ariisco.com/"
                      className="custom-link"
                      target="_blank"
                    >
                      {t("Smart Layout Software")}
                    </Link>
                  </li>
                  <li className="py-[10px] ">
                    <Link
                      href={localizedPath("/calculator")}
                      className={`custom-link ${
                        isActivePath("/calculator") ? "active" : ""
                      }`}
                    >
                      {t("Tile Area Estimator")}
                    </Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
          <li className="w-full">
            <div
              onClick={() => toggleItem("blog")}
              className="flex items-center gap-[10px] cursor-pointer"
            >
              {t("Blog")}
              <Icons.ArrowDown2
                size="20"
                className={`transition-transform duration-300 ${
                  openItems.blog ? "rotate-180" : ""
                }`}
              />
            </div>
            <AnimatePresence>
              {openItems.blog && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-[10px] flex flex-col gap-2 text-sm text-black"
                >
                  {[t("Articles"), t("Videos"), t("News")].map((label, i) => (
                    <li key={i} className="py-[10px] ">
                      <Link
                        href={localizedPath("/blogs")}
                        className={`custom-link ${
                          isActivePath("/blogs") ? "active" : ""
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
          <li>
            <Link
              href={localizedPath("/projects")}
              className={`custom-link ${
                isActivePath("/projects") ? "active" : ""
              }`}
            >
              {t("Projects")}
            </Link>
          </li>
          <li>
            <Link
              href={localizedPath("/newsletter")}
              className={`custom-link ${
                isActivePath("/newsletter") ? "active" : ""
              }`}
            >
              {t("Newsletter")}
            </Link>
          </li>
          <li>
            <Link
              href={localizedPath("/faq")}
              className={`custom-link ${isActivePath("/faq") ? "active" : ""}`}
            >
              {t("FAQ")}
            </Link>
          </li>
          <li className="w-full">
            <div
              onClick={() => toggleItem("collab")}
              className="flex items-center gap-[10px] cursor-pointer"
            >
              {t("Join Us")}
              <Icons.ArrowDown2
                size="20"
                className={`transition-transform duration-300 ${
                  openItems.collab ? "rotate-180" : ""
                }`}
              />
            </div>
            <AnimatePresence>
              {openItems.collab && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-[10px] flex flex-col gap-2 text-sm text-black"
                >
                  <li className="py-[10px] ">
                    <Link href="#" className="custom-link">
                      {t("Employment")}
                    </Link>
                  </li>
                  <li className="py-[10px] ">
                    <Link href="#" className="custom-link">
                      {t("Representationrequest")}
                    </Link>
                  </li>
                  <li className="py-[10px] ">
                    <Link href="#" className="custom-link">
                      {t("Suppliers")}
                    </Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
          <li>
            <Link
              href={localizedPath("/contactus")}
              className={`custom-link ${
                isActivePath("/contactus") ? "active" : ""
              }`}
            >
              {t("Contactus")}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

function HamburgerButton({ isOpen, onClick, scrolled, isSpecialPage }) {
  return (
    <button
      onClick={onClick}
      className="relative w-24 h-14 flex flex-col justify-between items-center z-50 cursor-pointer"
    >
      <span
        className={`block h-[1px] w-full ${
          scrolled || isSpecialPage ? "bg-[var(--color-gray-900)]" : "bg-white"
        }
           transform transition duration-300 ease-in-out 
        ${isOpen ? "rotate-45 translate-y-[9px]" : ""}`}
      />
      <span
        className={`block h-[.8px] w-full ${
          scrolled || isSpecialPage ? "bg-[var(--color-gray-900)]" : "bg-white"
        } transition-all duration-300 ease-in-out 
        ${isOpen ? "opacity-0" : "opacity-100"}`}
      />
      <span
        className={`block h-[.8px] w-full ${
          scrolled || isSpecialPage ? "bg-[var(--color-gray-900)]" : "bg-white"
        } transform transition duration-300 ease-in-out 
        ${isOpen ? "-rotate-45 -translate-y-[4.5px]" : ""}`}
      />
    </button>
  );
}

function BoxSearch({ showBox }) {
  const { t } = useTranslation();
  return (
    <div
      className={`
  bg-[#eeedec] px-[20px] pb-[10px] pt-[20px] absolute z-30 text-[var(--color-gray-900)]
  rounded-[4px] transition-all duration-700 ease-in-out
  top-[120%]
  inset-x-[20px]
  md:inset-x-auto md:w-[355px]
  rtl:md:right-0 rtl:md:left-auto
  ltr:md:left-0 ltr:md:right-auto

  ${showBox ? "opacity-100 visible" : "opacity-0 invisible"}
`}
    >
      <div className="bg-white rounded-[50px] py-[7px] px-[15px] flex items-center justify-between">
        <input
          type="text"
          autoComplete="off"
          maxLength={50}
          className="bg-transparent w-full h-full text-[.9rem]"
          placeholder={t("Search")}
        />
        <Icons.SearchNormal1 size="20" className=" cursor-pointer" />
      </div>
      <div className="flex flex-col items-center max-h-[300px] overflow-y-auto pt-[20px] hide-scrollbar">
        {Array(10)
          .fill(0)
          .map((item, i) => (
            <SearchItem key={i} />
          ))}
      </div>
    </div>
  );
}

function SearchItem() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between w-full mb-[20px]">
      <div className="flex items-center gap-[10px] ">
        <div className=" aspect-[1/1] w-[65px] relative overflow-hidden">
          <Image
            src={"/images/38.png"}
            alt="image item search"
            className="object-cover rounded-[2px]"
            fill
          />
        </div>
        <span className="font-en">Titan20</span>
      </div>
      <MoreButton
        text={t("View")}
        width={100}
        height={40}
        href={"/products/1"}
      />
    </div>
  );
}

function MenuMobile() {
  const { locale } = useParams();
  const { t } = useTranslation();
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const router = useRouter();
  const [openItems, setOpenItems] = useState({
    assistant: false,
    blog: false,
    collab: false,
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleItem = (key) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const isActive = (route) => {
    if (route === "/") {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname === `/${locale}${route}`;
  };

  const isRTL = locale === "fa";

  const currentLocale = pathname.split("/")[1] || "fa";
  function handleLangChange(newLocale) {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length && ["fa", "en"].includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    const newPathname = "/" + segments.join("/");
    const search = searchParams.toString();

    document.cookie = `lang=${newLocale}; path=/; max-age=31536000`;

    setIsOpen(false);
    router.push(newPathname + (search ? "?" + search : ""));
  }

  return (
    <div className="fixed w-full left-0 right-0 z-[9999999]  lg:hidden">
      <div className="flex items-center justify-between bg-[#292d32] px-20 py-3">
        <div
          className="cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <HamburgerButton isOpen={isOpen} />
        </div>
        <Link href={`${locale}/`}>
          <Image
            src={"/images/logo1.png"}
            alt="White Logo"
            width={150}
            height={50}
          />
        </Link>
      </div>
      <div
        className={`flex items-center justify-between py-[15px] px-20 bg-white/60 backdrop-blur-xs `}
      >
        <div className="relative">
          <div
            className="cursor-pointer flex items-center gap-[5px] select-none"
            onClick={() => setIsOpenLanguage((prev) => !prev)}
          >
            <Icons.ArrowDown2
              size="20"
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
            {currentLocale.toUpperCase()}
          </div>

          {isOpenLanguage && (
            <ul className="absolute top-full mt-2 bg-white shadow-md text-sm overflow-hidden z-50 text-[var(--color-gray-900)]">
              <li
                className=" hover:bg-gray-100 cursor-pointer font-semibold p-[7px]"
                onClick={() => handleLangChange("fa")}
              >
                Fa
              </li>
              <li
                className=" hover:bg-gray-100 cursor-pointer p-[7px]"
                onClick={() => handleLangChange("en")}
              >
                En
              </li>
            </ul>
          )}
        </div>
        <div className="flex items-start gap-[15px] md:relative">
          <MenuLink href="/saved" className="custom-link">
            <Icons.Save2 size={25} />
          </MenuLink>
          <Icons.SearchNormal1
            size="25"
            onClick={() => setIsShowSearch((prev) => !prev)}
            color="#000"
          />
          <BoxSearch showBox={isShowSearch} />
        </div>
      </div>

      <div
        className={`fixed top-[66.94px] h-[calc(100dvh-66.94px)] pb-[40px] w-full bg-white z-50 transform transition-transform duration-300 overflow-y-auto ${
          isOpen
            ? "translate-x-0"
            : isRTL
            ? "translate-x-full"
            : "-translate-x-full"
        }`}
      >
        <ul className="px-20 py-30 text-[var(--color-gray-900)] flex flex-col gap-[2rem]">
          <li className="font-medium">
            <MenuLink
              href={"/"}
              onClick={() => setIsOpen(false)}
              className={`pb-1 ${
                isActive("/") ? "border-b-2 border-primary" : ""
              }`}
            >
              {t("Home")}
            </MenuLink>
          </li>

          {/* <FilterHeader show={true} /> */}
          {[
            { label: t("Catalog"), href: "/catalog" },
            { label: t("Representatives"), href: "/representatives" },
            { label: t("About"), href: "/aboutus" },
          ].map(({ label, href }) => (
            <li className="font-medium" key={href}>
              <MenuLink
                href={href}
                onClick={() => setIsOpen(false)}
                className={`pb-1 ${
                  isActive(href) ? "border-b-2 border-primary" : ""
                }`}
              >
                {label}
              </MenuLink>
            </li>
          ))}

          <li className="w-full font-medium">
            <div
              onClick={() => toggleItem("assistant")}
              className="flex items-center gap-[10px] cursor-pointer"
            >
              {t("DigitalAssistant")}
              <Icons.ArrowDown2
                size="20"
                className={`transition-transform duration-300 ${
                  openItems.assistant ? "rotate-180" : ""
                }`}
              />
            </div>
            <AnimatePresence>
              {openItems.assistant && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-[10px] flex flex-col gap-2 text-sm"
                >
                  {[
                    { label: t("Chatbot"), href: "#" },
                    {
                      label: t("Smart Layout Software"),
                      href: "https://marjan.ariisco.com",
                    },
                    {
                      label: t("Tile Area Estimator"),
                      href: "#",
                    },
                  ].map(({ label, href }, i) => (
                    <li className="py-[10px]" key={i}>
                      <MenuLink
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className="ms-[15px] custom-link"
                      >
                        {label}
                      </MenuLink>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          <li className="w-full font-medium">
            <div
              onClick={() => toggleItem("blog")}
              className="flex items-center gap-[10px] cursor-pointer"
            >
              {t("Blog")}
              <Icons.ArrowDown2
                size="20"
                className={`transition-transform duration-300 ${
                  openItems.blog ? "rotate-180" : ""
                }`}
              />
            </div>
            <AnimatePresence>
              {openItems.blog && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-[10px] flex flex-col gap-2 text-sm"
                >
                  {[t("Articles"), t("Videos"), t("News")].map((label, i) => (
                    <li className="py-[10px]" key={i}>
                      <MenuLink
                        href="/blogs"
                        onClick={() => setIsOpen(false)}
                        className={`ms-[15px] custom-link pb-1 ${
                          isActive("/blogs") ? "border-b-2 border-primary" : ""
                        }`}
                      >
                        {label}
                      </MenuLink>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          {[
            { label: t("Projects"), href: "/projects" },
            { label: t("Newsletter"), href: "/newsletter" },
            { label: t("FAQ"), href: "/faq" },
          ].map(({ label, href }) => (
            <li className="font-medium" key={href}>
              <MenuLink
                href={href}
                onClick={() => setIsOpen(false)}
                className={`pb-1 ${
                  isActive(href) ? "border-b-2 border-primary" : ""
                }`}
              >
                {label}
              </MenuLink>
            </li>
          ))}

          <li className="w-full font-medium">
            <div
              onClick={() => toggleItem("collab")}
              className="flex items-center gap-[10px] cursor-pointer"
            >
              {t("Join Us")}
              <Icons.ArrowDown2
                size="20"
                className={`transition-transform duration-300 ${
                  openItems.collab ? "rotate-180" : ""
                }`}
              />
            </div>
            <AnimatePresence>
              {openItems.collab && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-[10px] flex flex-col gap-2 text-sm"
                >
                  {[
                    t("Employment"),
                    t("Representationrequest"),
                    t("Suppliers"),
                  ].map((label, i) => (
                    <li className="py-[10px] ms-[15px]" key={i}>
                      <MenuLink
                        href="#"
                        onClick={() => setIsOpen(false)}
                        className="custom-link"
                      >
                        {label}
                      </MenuLink>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
          {[
            { label: t("Contactus"), href: "/contactus" },
            { label: t("Industrial"), href: "/industrial" },
          ].map(({ label, href }) => (
            <li className="font-medium" key={href}>
              <MenuLink
                href={href}
                onClick={() => setIsOpen(false)}
                className={`pb-1 ${
                  isActive(href) ? "border-b-2 border-primary" : ""
                }`}
              >
                {label}
              </MenuLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MenuLink({ href, children, className = "", onClick }) {
  const { locale } = useParams();

  const cleanHref = href.startsWith("/") ? href.slice(1) : href;

  const linkHref = href.startsWith("/")
    ? `/${locale}/${cleanHref}`
    : `/${locale}/${href}`;

  return (
    <Link href={linkHref}>
      <span onClick={onClick} className={`cursor-pointer ${className}`}>
        {children}
      </span>
    </Link>
  );
}

{
  /* <li className="w-full font-medium">
            <div
              onClick={() => toggleItem("products")}
              className="flex items-center gap-[10px] cursor-pointer"
            >
              {t("Products")}
              <Icons.ArrowDown2
                size="20"
                className={`transition-transform duration-300`}
              />
            </div>
            <AnimatePresence>
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-[10px] flex flex-col gap-2 text-sm"
              ></motion.ul>
            </AnimatePresence>
          </li> */
}

// ${
//                 openItems.assistant ? "rotate-180" : ""
//               }
