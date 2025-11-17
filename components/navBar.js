"use client";
import Image from "next/image";
import * as Icons from "iconsax-reactjs";
import { useState, useEffect, useRef } from "react";
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
import { useTranslation } from "@/context/TranslationContext";
import axios from "axios";
import { useToggle } from "@/context/context";

export function NavBar({ dataHeader }) {
  const [scrolled, setScrolled] = useState(false);
  const [showInnerMenu, setShowInnerMenu] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isChangeBg, setIsChangeBg] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale } = useParams();
  const { t } = useTranslation();

  function handleLangChange(newLocale) {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length && ["fa", "en", "ar", "ru"].includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    const newPathname = "/" + segments.join("/");

    document.cookie = `lang=${newLocale}; path=/; max-age=31536000;`;

    router.replace(newPathname);
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
    cleanPathname === "/employment" ||
    cleanPathname === "/representationrequest" ||
    cleanPathname === "/suppliers" ||
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
      setScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const queryFilterKey = searchParams.get("filterKey");
  const queryValues = searchParams.get("values");

  useEffect(() => {
    setShowFilterMenu(false);
    setIsOpen(false);
    setIsChangeBg(false);
    setIsShowSearch(false);
    setScrolled(false);
    setIsHovered(false);
  }, [pathname, queryFilterKey, queryValues]);

  return (
    <header
      className={`absolute w-full z-20 bg-gary-black ${
        ["ar", "fa"].includes(locale) ? "font-fa" : "font-en"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`hidden xl:flex flex-row justify-between w-full fixed z-10 h-102 px-40 xl:px-80 py-10  transition-all duration-300 ${
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
                dir="ltr"
                className="cursor-pointer flex items-center gap-[5px] select-none"
                onClick={() => handleToggle("open")}
              >
                {currentLocale.toUpperCase()}
                <Icons.ArrowDown2
                  size="20"
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {isOpen && (
                <ul className="absolute top-full mt-2 bg-white shadow-md text-sm overflow-hidden z-[9999] text-[var(--color-gray-900)] px-4 flex flex-col gap-4">
                  <li
                    dir="ltr"
                    className="  cursor-pointer w-full flex items-center justify-between "
                    onClick={() => handleLangChange("fa")}
                  >
                    FA
                  </li>
                  <li
                    dir="ltr"
                    className="  cursor-pointer  flex items-center justify-between "
                    onClick={() => handleLangChange("en")}
                  >
                    EN
                  </li>
                  <li
                    dir="ltr"
                    className="  cursor-pointer flex items-center justify-between"
                    onClick={() => handleLangChange("ar")}
                  >
                    AR
                  </li>
                  {/* <li
                    dir="ltr"
                    className="  cursor-pointer flex items-center justify-between"
                    onClick={() => handleLangChange("ru")}
                  >
                  
                    RU
                  </li> */}
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
            src={
              ["fa"].includes(locale)
                ? "/images/logofa.png"
                : "/images/logo1.png"
            }
            alt="White Logo"
            fill
            className={`${
              shouldApplyScrolledStyles ? "invert" : ""
            } object-contain`}
          />
        </Link>

        <Menu
          show={showInnerMenu}
          setShowInnerMenu={setShowInnerMenu}
          locale={locale}
        />
        <FilterHeader
          show={showFilterMenu}
          setShowFilterMenu={setShowFilterMenu}
          dataHeader={dataHeader}
        />
      </div>
      <MenuMobile dataHeader={dataHeader} />
    </header>
  );
}

function Menu({ show, setShowInnerMenu }) {
  const { locale } = useParams();
  const { setIsShowChatbot } = useToggle();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState({
    assistant: false,
    blog: false,
    collab: false,
  });

  const [activeBlog, setActiveBlog] = useState(null);

  const pathname = usePathname();

  const localizedPath = (path) => `/${locale}${path}`;

  const isActivePath = (route, category) => {
    const currentCategory = searchParams.get("category")?.toLowerCase();
    const fullPath = route === "/" ? `/${locale}` : `/${locale}${route}`;
    return pathname === fullPath && currentCategory === category?.toLowerCase();
  };

  const toggleItem = (key) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    setShowInnerMenu(false);
  }, [pathname, searchParams.get("category")]);

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
        className={`w-full fixed top-[102px] left-0 right-0 z-50 transition-all duration-700 ease-in-out bottom-0
    ${
      show
        ? ["fa", "ar"].includes(locale)
          ? "translate-x-0"
          : "translate-x-0"
        : ["fa", "ar"].includes(locale)
        ? "translate-x-full"
        : "-translate-x-full"
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
                  <li
                    className="py-[10px]"
                    onClick={() => {
                      setIsShowChatbot(true);
                      setShowInnerMenu(false);
                    }}
                  >
                    <span className="custom-link">{t("Chatbot")}</span>
                  </li>
                  <li className="py-[10px] ">
                    <Link
                      href="https://marjan.ariisco.com/en"
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
                      {t("Estimatetilearea")}
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
                  {[
                    { label: t("Articles"), category: "articles" },
                    { label: t("Videos"), category: "videos" },
                    { label: t("News"), category: "news" },
                  ].map((item, i) => (
                    <li key={i} className="py-[10px]">
                      <Link
                        href={localizedPath(
                          `/blogs?tab=2&category=${item.label.toLowerCase()}`
                        )}
                        className={`custom-link ${
                          activeBlog === item?.category ? "active" : ""
                        }`}
                        onClick={() => setActiveBlog(item.category)}
                      >
                        {item.label}
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
                  {locale === "fa" && (
                    <li className="py-[10px] ">
                      <Link
                        href="/employment"
                        className={`custom-link ${
                          isActivePath("/employment") ? "active" : ""
                        }`}
                      >
                        {t("employment")}
                      </Link>
                    </li>
                  )}

                  <li className="py-[10px] ">
                    <Link
                      href="/representationrequest"
                      className={`custom-link ${
                        isActivePath("/representationrequest") ? "active" : ""
                      }`}
                    >
                      {t("representationrequest")}
                    </Link>
                  </li>
                  {locale === "fa" && (
                    <li className="py-[10px] ">
                      <Link
                        href="/suppliers"
                        className={`custom-link ${
                          isActivePath("/suppliers") ? "active" : ""
                        }`}
                      >
                        {t("suppliers")}
                      </Link>
                    </li>
                  )}
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

export default function BoxSearch({ showBox }) {
  const { t, locale } = useTranslation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length >= 3) {
        searchProducts(query);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const searchProducts = async (q) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/api/products/search/`,
        {
          params: { query: q },
          headers: {
            "Accept-Language": locale,
          },
        }
      );
      if (response.status === 200) {
        setResults(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (showBox) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery("");
    }
  }, [showBox]);

  return (
    <div
      className={`
    bg-[#eeedec] px-[20px] pb-[10px] pt-[20px] 
    absolute z-30 text-[var(--color-gray-900)] rounded-[4px] 
    transition-all duration-700 ease-in-out 
    top-[120%]
    w-[90vw] md:w-[355px] 
    ${
      ["fa", "ar"].includes(locale)
        ? "left-0 right-auto  xl:right-0 xl:left-auto"
        : "right-0 left-auto  xl:left-0 xl:right-auto"
    }


    ${showBox ? "opacity-100 visible" : "opacity-0 invisible"}
  `}
    >
      <div className="bg-white rounded-[50px] py-[7px] px-[15px] flex items-center justify-between">
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          maxLength={50}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent w-full h-full text-[.9rem]"
          placeholder={t("Search")}
        />
        <Icons.SearchNormal1 size="20" className="cursor-pointer" />
      </div>

      <div className="flex flex-col items-center max-h-[300px] overflow-y-auto pt-[20px] hide-scrollbar">
        {results.length > 0 ? (
          results.map((item) => <SearchItem key={item.id} item={item} />)
        ) : query.length >= 3 ? (
          <span className="text-sm text-gray-500">{t("No results found")}</span>
        ) : null}
      </div>
    </div>
  );
}

function SearchItem({ item }) {
  const { t, locale } = useTranslation();
  return (
    <div className="flex items-center justify-between w-full mb-[20px]">
      <div className="flex items-center gap-[10px] ">
        <div className=" aspect-[1/1] w-[65px] relative overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${item?.main_image}`}
            alt="image item search"
            className="object-cover rounded-[2px]"
            fill
          />
        </div>
        <span className={"font-en"}>{item?.title}</span>
      </div>
      <MoreButton
        text={t("View")}
        width={100}
        height={40}
        href={`/products/${item?.slug}`}
      />
    </div>
  );
}

function MenuMobile({ dataHeader }) {
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
    product: false,
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setIsShowChatbot } = useToggle();
  const [activeBlog, setActiveBlog] = useState(null);

  const localizedPath = (path) => `/${locale}${path}`;

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

  const isRTL = ["fa", "ar"].includes(locale);

  const currentLocale = pathname.split("/")[1] || "fa";

  function handleLangChange(newLocale) {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length && ["fa", "en", "ar", "ru"].includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    const newPathname = "/" + segments.join("/");

    document.cookie = `lang=${newLocale}; path=/; max-age=31536000;`;

    router.replace(newPathname);
  }

  const queryString = searchParams.toString();

  const categoryMap = {
    fa: "چرا مرجان",
    ar: "لماذا المرجان",
    en: "Why Coral",
    ru: "Почему коралл",
  };

  const category = categoryMap[locale] || categoryMap.fa;

  useEffect(() => {
    setIsOpen(false);
    setIsShowSearch(false);
  }, [queryString, pathname]);

  return (
    <div className="fixed w-full left-0 right-0 z-[9999999]  xl:hidden">
      <div className="flex items-center justify-between bg-[#292d32] px-20 py-3">
        <div
          className="cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <HamburgerButton isOpen={isOpen} />
        </div>
        <Link href={`/`}>
          <Image
            src={
              ["fa"].includes(locale)
                ? "/images/logofa.png"
                : "/images/logo1.png"
            }
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
            dir={"ltr"}
            className="cursor-pointer flex items-center gap-[5px] select-none"
            onClick={() => setIsOpenLanguage((prev) => !prev)}
          >
            {currentLocale.toUpperCase()}
            <Icons.ArrowDown2
              size="20"
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {isOpenLanguage && (
            <ul className="absolute top-full mt-2 bg-white shadow-md text-sm overflow-hidden z-50 text-[var(--color-gray-900)] px-4 flex flex-col gap-4">
              <li
                dir="ltr"
                className=" cursor-pointer w-full flex items-center justify-between "
                onClick={() => handleLangChange("fa")}
              >
                FA
              </li>
              <li
                dir="ltr"
                className=" cursor-pointer  flex items-center justify-between "
                onClick={() => handleLangChange("en")}
              >
                EN
              </li>
              <li
                dir="ltr"
                className=" cursor-pointer flex items-center justify-between"
                onClick={() => handleLangChange("ar")}
              >
                AR
              </li>
              {/* <li
                dir="ltr"
                className=" hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                onClick={() => handleLangChange("ru")}
              >
              
                RU
              </li> */}
            </ul>
          )}
        </div>
        <div className="flex items-start gap-[15px] md:relative">
          <MenuLink href="/saved" className="custom-link">
            <Icons.Save2 size={25} />
          </MenuLink>

          <div className="relative">
            <Icons.SearchNormal1
              size="25"
              onClick={() => setIsShowSearch((prev) => !prev)}
              color="#000"
              className="cursor-pointer"
            />
            <BoxSearch showBox={isShowSearch} />
          </div>
        </div>
      </div>
      <div
        className={`fixed top-[66.94px] h-[calc(100dvh-66.94px)] pb-[20px] w-full bg-white z-50 transform transition-transform duration-300 overflow-y-auto ${
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
          <li className="w-full font-medium">
            <div
              onClick={() => toggleItem("product")}
              className="flex items-center gap-[10px] cursor-pointer"
            >
              {t("Products")}
              <Icons.ArrowDown2
                size="20"
                className={`transition-transform duration-300 ${
                  openItems.product ? "rotate-180" : ""
                }`}
              />
            </div>
            <AnimatePresence>
              {openItems.product && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-[10px] flex flex-col gap-2 text-sm"
                >
                  <MenuLink
                    href={"/products"}
                    className={`w-max flex justify-between  py-3 font-medium text-[var(--color-gray-900)] ms-[15px] ${
                      isActive("/products") ? "border-b-2 border-primary" : ""
                    }`}
                  >
                    {t("AllProducts")}
                  </MenuLink>
                  <MenuLink
                    href={"/industrial"}
                    className={`w-max mt-[.5rem] flex justify-between  py-3 font-medium text-[var(--color-gray-900)] ms-[15px] ${
                      isActive("/industrial") ? "border-b-2 border-primary" : ""
                    }`}
                  >
                    {t("Industrial")}
                  </MenuLink>
                  <MenuLink
                    href={`/catalog?category=${encodeURIComponent(category)}`}
                    className={`w-max mt-[.5rem] flex justify-between  py-3 font-medium text-[var(--color-gray-900)] ms-[15px] `}
                  >
                    {t("Why Marjan")}
                  </MenuLink>

                  <FilterHeader
                    show={isOpen}
                    setShowFilterMenu={setIsOpen}
                    dataHeader={dataHeader}
                  />
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

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
                    {
                      label: t("Chatbot"),
                      action: () => setIsShowChatbot(true),
                    },
                    {
                      label: t("Smart Layout Software"),
                      href: "https://marjan.ariisco.com/en",
                    },
                    {
                      label: t("Estimatetilearea"),
                      href: "/calculator",
                    },
                  ].map(({ label, href, action }, i) => (
                    <li className="py-[10px]" key={i}>
                      {href ? (
                        href.startsWith("http") ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsOpen(false)}
                            className="ms-[15px] custom-link"
                          >
                            {label}
                          </a>
                        ) : (
                          <MenuLink
                            href={href}
                            onClick={() => setIsOpen(false)}
                            className={`ms-[15px] custom-link ${
                              isActive(href) ? "border-b-2 border-primary" : ""
                            }`}
                          >
                            {label}
                          </MenuLink>
                        )
                      ) : (
                        <button
                          onClick={() => {
                            action?.();
                            setIsOpen(false);
                          }}
                          className="ms-[15px] custom-link"
                        >
                          {label}
                        </button>
                      )}
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
                  {[
                    { label: t("Articles"), category: "articles" },
                    { label: t("Videos"), category: "videos" },
                    { label: t("News"), category: "news" },
                  ].map((item, i) => (
                    <li key={i} className="py-[10px] ms-[15px]">
                      <Link
                        href={localizedPath(
                          `/blogs?tab=2&category=${item.label.toLowerCase()}`
                        )}
                        className={`custom-link ${
                          activeBlog === item?.category ? "active" : ""
                        }`}
                        onClick={() => setActiveBlog(item.category)}
                      >
                        {item.label}
                      </Link>
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
                    ...(locale === "fa"
                      ? [{ label: t("employment"), href: "/employment" }]
                      : []),
                    {
                      label: t("representationrequest"),
                      href: "/representationrequest",
                    },
                    ...(locale === "fa"
                      ? [{ label: t("suppliers"), href: "/suppliers" }]
                      : []),
                  ].map((item, i) => (
                    <li className="py-[10px] ms-[15px]" key={i}>
                      <MenuLink
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`custom-link ${
                          isActive(item.href) ? "border-b-2 border-primary" : ""
                        }`}
                      >
                        {item.label}
                      </MenuLink>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
          {[{ label: t("Contactus"), href: "/contactus" }].map(
            ({ label, href }) => (
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
            )
          )}
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
