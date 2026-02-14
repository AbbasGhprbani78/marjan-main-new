// import { useTranslation } from "@/context/TranslationContext";
// import React, { useState, useRef, useEffect } from "react";

// export default function DropDown({
//   label = "",
//   value = "",
//   options = [],
//   onChange,
//   error = "",
//   hideError = false,
//   placeholder = "",
// }) {
//   const { t } = useTranslation();
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedOption, setSelectedOption] = useState(null);
//   const dropdownRef = useRef(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (value) {
//       const found = options.find((opt) => opt.id === value);
//       if (found) {
//         setSelectedOption(found);
//         setSearchTerm(found.value);
//       }
//     } else {
//       setSelectedOption(null);
//     }
//   }, [value, options]);

//   const filteredOptions = options.filter((opt) =>
//     opt?.value?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const displayText = selectedOption ? selectedOption?.value : searchTerm;

//   const handleSelect = (option) => {
//     setSelectedOption(option);
//     setSearchTerm(option.value);
//     onChange?.(option.id);
//     setIsOpen(false);
//   };

//   const handleInputChange = (e) => {
//     const text = e.target.value;
//     setSearchTerm(text);

//     const matched = options.find(
//       (opt) => opt?.value?.toLowerCase() === text.toLowerCase()
//     );
//     if (matched) {
//       setSelectedOption(matched);
//       onChange?.(matched.id);
//     } else {
//       setSelectedOption(null);
//       onChange?.("");
//     }

//     setIsOpen(true);
//   };

//   const handleInputFocus = () => {
//     setIsOpen(true);
//   };

//   const handleInputBlur = () => {
//     setTimeout(() => {
//       if (!dropdownRef.current?.contains(document.activeElement)) {
//         setIsOpen(false);
//       }
//     }, 150);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="flex flex-col gap-[.3rem]">
//       <label className="text-[.7rem] font-bold">{label}</label>
//       <div className="relative" ref={dropdownRef}>
//         <input
//           ref={inputRef}
//           type="text"
//           value={displayText}
//           onChange={handleInputChange}
//           onFocus={handleInputFocus}
//           onBlur={handleInputBlur}
//           placeholder={placeholder || t("Choose")}
//           className={`
//             h-[34px] px-5 text-[.8rem] border w-full rounded pr-10
//             ${error ? "border-red-500" : "border-gray-500"}
//             focus:border-blue-500 focus:outline-none
//           `}
//         />
//         <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//           <svg
//             className="w-4 h-4 text-gray-500"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M19 9l-7 7-7-7"
//             />
//           </svg>
//         </div>

//         {isOpen && (
//           <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-120 overflow-y-auto">
//             {filteredOptions.length === 0 ? (
//               <div className="px-4 py-2 text-sm text-gray-500">
//                 {searchTerm ? "نتیجه‌ای یافت نشد" : t("Choose")}
//               </div>
//             ) : (
//               filteredOptions.map((opt) => (
//                 <div
//                   key={opt.id}
//                   onMouseDown={(e) => e.preventDefault()}
//                   onClick={() => handleSelect(opt)}
//                   className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer"
//                 >
//                   {opt.value}
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>

//       {!hideError && error && (
//         <span className="text-red-500 text-sm">{error}</span>
//       )}
//     </div>
//   );
// }

import { useTranslation } from "@/context/TranslationContext";
import React, { useState, useRef, useEffect } from "react";

export default function DropDown({
  label = "",
  value = "",
  options = [],
  onChange,
  error = "",
  hideError = false,
  placeholder = "",
}) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // وقتی value از بیرون تغییر کرد، گزینه انتخاب‌شده رو بروز کن
  useEffect(() => {
    if (value !== undefined && value !== null && value !== "") {
      const found = options.find((opt) => opt.id === value);
      if (found) {
        setSelectedOption(found);
        setSearchTerm(String(found.value));
      }
    } else {
      setSelectedOption(null);
      setSearchTerm("");
    }
  }, [value, options]);

  // فیلتر گزینه‌ها بر اساس جستجو (حالا با عدد و رشته کار می‌کنه)
  const filteredOptions = options.filter((opt) => {
    const optValue = String(opt?.value ?? "").toLowerCase();
    return optValue.includes(searchTerm.toLowerCase());
  });

  // متن نمایش داده شده در اینپوت
  const displayText = selectedOption
    ? String(selectedOption.value)
    : searchTerm;

  const handleSelect = (option) => {
    setSelectedOption(option);
    setSearchTerm(String(option.value));
    onChange?.(option.id);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setSearchTerm(text);

    // اگر دقیقاً با یک گزینه مطابقت داشت، اون رو انتخاب کن
    const matched = options.find((opt) => {
      return String(opt?.value ?? "").toLowerCase() === text.toLowerCase();
    });

    if (matched) {
      setSelectedOption(matched);
      onChange?.(matched.id);
    } else {
      setSelectedOption(null);
      onChange?.("");
    }

    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 150);
  };

  // کلیک بیرون از دراپ‌داون → بستن
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-[.3rem]">
      <label className="text-[.7rem] font-bold">{label}</label>
      <div className="relative" ref={dropdownRef}>
        <input
          ref={inputRef}
          type="text"
          value={displayText}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder || t("Choose")}
          className={`
            h-[34px] px-5 text-[.8rem] border w-full rounded pr-10
            ${error ? "border-red-500" : "border-gray-500"}
            focus:border-blue-500 focus:outline-none
          `}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-120 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-500">
                {searchTerm ? "نتیجه‌ای یافت نشد" : t("Choose")}
              </div>
            ) : (
              filteredOptions.map((opt) => (
                <div
                  key={opt.id}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(opt)}
                  className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer"
                >
                  {String(opt.value)}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {!hideError && error && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
}
