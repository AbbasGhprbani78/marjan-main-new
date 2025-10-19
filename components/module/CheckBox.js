import { useTranslation } from "@/context/TranslationContext";
import { toPersianDigits } from "@/utils/helper";

export default function CheckBox({
  label,
  checked,
  onChange,
  value,
  name,
  dir,
}) {
  const id = `checkbox-${name || label?.replace(/\s+/g, "-").toLowerCase()}`;

  const { locale } = useTranslation();

  return (
    <div className="flex  space-x-2 rtl:space-x-reverse gap-4">
      <input
        id={id}
        type="checkbox"
        name={name || label}
        checked={checked}
        onChange={onChange}
        className="focus:ring-0 border-gray-400 rounded mt-4 flex-shrink-0"
        value={value || label}
      />
      <label
        htmlFor={id}
        dir={dir || "auto"}
        className="text-[#292d32] block cursor-pointer text-sm leading-relaxed"
      >
        {["fa", "ar"].includes(locale)
          ? toPersianDigits(String(label).trim())
          : String(label).trim()}
      </label>
    </div>
  );
}
