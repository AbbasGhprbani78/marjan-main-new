"use client";
import { filter } from "@/app/dataFIlter";
import Image from "next/image";
import { MoreButton } from "../moreButton";
import * as Icons from "iconsax-reactjs";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hook/useTranslation";
import Link from "next/link";

export default function FilterHeader({ show }) {
  const { t } = useTranslation();

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[70px] left-0 right-0 bg-white z-10 w-full px-80  pt-[3rem]"
          >
            <div className="h-[80dvh] overflow-y-auto pb-[3rem] hide-scrollbar">
              <div className="grid grid-cols-12 gap-[2rem] ">
                <div className=" md:col-span-6 xl:col-span-3 text-start">
                  <span className="font-medium pb-[5px] border-b-2 inline-block w-85 text-center text-[var(--color-gray-900)]">
                    {t("Size")}
                  </span>
                  <div className="grid grid-cols-2 gap-[10px] mt-[1rem]">
                    {filter.size.map((item, i) => (
                      <ItemFilterBox
                        key={i}
                        text={item}
                        type="size"
                        // selected={selectedSizes.includes(item)}
                        // onClick={() => handleSizeClick(item)}
                      />
                    ))}
                  </div>
                </div>
                <div className=" md:col-span-6 xl:col-span-3 text-start">
                  <span className="font-medium pb-[5px] border-b-2 inline-block w-85 text-center text-[var(--color-gray-900)]">
                    {t("Color")}
                  </span>
                  <div className="grid grid-cols-2 gap-[10px] mt-[1rem]">
                    {filter.colors.map((item, i) => (
                      <ItemFilterBox
                        key={i}
                        item={item}
                        type="color"
                        // selected={selectedColors.includes(item)}
                        // onClick={() => handleColorClick(item)}
                      />
                    ))}
                  </div>
                </div>
                <div className=" md:col-span-6 xl:col-span-3 text-start ">
                  <span className="font-medium pb-[5px] border-b-2 inline-block w-85 text-center text-[var(--color-gray-900)]">
                    {t("Style")}
                  </span>
                  <div className="grid grid-cols-3 gap-[10px] mt-[1rem]">
                    {filter.style.map((item, i) => (
                      <ItemStyle
                        key={i}
                        item={item}
                        // selected={selectedStyles.includes(item.title)}
                        // onClick={() => handleStyleClick(item)}
                      />
                    ))}
                  </div>
                </div>
                <div className=" md:col-span-6 xl:col-span-3 text-start">
                  <span className="font-medium pb-[5px] border-b-2 inline-block w-85 text-center text-[var(--color-gray-900)]">
                    {t("Usage")}
                  </span>
                  <div className="grid grid-cols-2 gap-[10px] mt-[1rem]">
                    {filter.usecase.map((item, i) => (
                      <UseCase
                        key={i}
                        item={item}
                        // selected={selectedUseCases.includes(item.title)}
                        // onClick={() => handleUseCaseClick(item)}
                      />
                    ))}
                    <Link
                      href={"/industrial"}
                      className="relative aspect-[3/2] cursor-pointer"
                    >
                      <Image
                        src={"/images/49.jpg"}
                        alt="use case image item filter"
                        fill
                        className="object-fill"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-end">
                        <span className="text-white font-medium text-[.9rem] px-10 pb-10">
                          {t("Industrial")}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-[1rem]">
                <div className="flex items-center gap-[1.5rem]">
                  <MoreButton
                    text={t("Products")}
                    width="124"
                    height="40"
                    invert=""
                    href="/products"
                  />
                  <MoreButton
                    text={t("Why Marjan")}
                    width="124"
                    height="40"
                    invert=""
                    href="#"
                  />
                  <MoreButton
                    text={t("Catalog")}
                    width="124"
                    height="40"
                    invert=""
                    href="/catalog"
                  />
                </div>
                <div className="flex gap-20 items-center">
                  <a
                    href="https://www.pinterest.com/marjantileco/"
                    target="_blank"
                  >
                    <Image
                      src={"/images/pintrest.png"}
                      width={30}
                      height={30}
                      className="object-fill cursor-pointer  mix-blend-multiply"
                      alt=""
                    />
                  </a>
                  <a
                    href="https://instagram.com/marjantileco?utm_medium=copy_link"
                    target="_blank"
                  >
                    <Image
                      src={"/images/instagram.png"}
                      width={40}
                      height={40}
                      className="object-fill cursor-pointer mix-blend-multiply"
                      alt=""
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/marjantilecompany"
                    target="_blank"
                  >
                    <Image
                      src={"/images/linkdin.png"}
                      width={40}
                      height={40}
                      className="object-fill cursor-pointer mix-blend-multiply"
                      alt=""
                    />
                  </a>
                  <a href="https://www.aparat.com/marjantile" target="_blank">
                    <Image
                      src={"/images/aparat.png"}
                      width={35}
                      height={35}
                      className="object-fill cursor-pointer mix-blend-multiply"
                      alt=""
                    />
                  </a>
                  <a
                    href="https://www.youtube.com/@marjantile6108"
                    target="_blank"
                  >
                    <Image
                      src={"/images/youtube.png"}
                      width={40}
                      height={40}
                      className="object-fill cursor-pointer mix-blend-multiply"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ItemFilterBox({ text, type, item }) {
  const { t } = useTranslation();
  let width = 0;
  let height = 0;

  if (text && text.includes("*")) {
    [height, width] = text.split("*").map((n) => parseInt(n.trim()));
  }

  return (
    <div className="relative flex items-center justify-around h-[46px] px-2 bg-[#f7f5f4] text-[var(--color-gray-900)] cursor-pointer">
      <span className="font-medium">{text ? text : item.text}</span>
      <div>
        {type === "size" ? (
          <div
            className="bg-[#d9d9d9]"
            style={{
              width: `${(width / Math.max(width, height)) * 40}px`,
              height: `${(height / Math.max(width, height)) * 40}px`,
            }}
          />
        ) : (
          <div className="relative w-[40px] h-[30px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute h-[21px] w-[21px] rounded-full"
                style={{
                  backgroundColor: item.color,
                  left: `${i === 0 ? 7 : i === 1 ? 0 : 10}px`,
                  bottom: `${i === 0 ? 6 : i === 1 ? 0 : -4}px`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ItemStyle({ item }) {
  return (
    <div className="relative flex flex-col gap-[2px] cursor-pointer">
      <div className="relative aspect-square">
        <Image
          src={item.image}
          alt="style image item filter"
          fill
          className="object-fill"
        />
      </div>
      <span className="font-medium text-[.85rem] text-[var(--color-gray-900)]">
        {item.title}
      </span>
    </div>
  );
}

function UseCase({ item }) {
  return (
    <div className="relative aspect-[3/2] cursor-pointer">
      <Image
        src={item.image}
        alt="use case image item filter"
        fill
        className="object-fill"
      />
      <div className="absolute inset-0 bg-black/50 flex items-end">
        <span className="text-white font-medium text-[.9rem] px-10 pb-10">
          {item.title}
        </span>
      </div>
    </div>
  );
}

// {selected && (
//           <Icons.TickCircle
//             size={"25"}
//             className="absolute left-[5px] top-5 w-[16px] h-[16px]"
//             color="#37d67a"
//           />
//         )}

// const handleSizeClick = (text) => {
//   setSelectedSizes((prev) =>
//     prev.includes(text) ? prev.filter((s) => s !== text) : [...prev, text]
//   );
// };

// const handleColorClick = (color) => {
//   setSelectedColors((prev) =>
//     prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
//   );
// };

// const handleStyleClick = (item) => {
//   setSelectedStyles((prev) =>
//     prev.includes(item.title)
//       ? prev.filter((i) => i !== item.title)
//       : [...prev, item.title]
//   );
// };

// const handleUseCaseClick = (item) => {
//   setSelectedUseCases((prev) =>
//     prev.includes(item.title)
//       ? prev.filter((i) => i !== item.title)
//       : [...prev, item.title]
//   );
// };

//  const [selectedSizes, setSelectedSizes] = useState([]);
//   const [selectedColors, setSelectedColors] = useState([]);
//   const [selectedStyles, setSelectedStyles] = useState([]);
//   const [selectedUseCases, setSelectedUseCases] = useState([]);
