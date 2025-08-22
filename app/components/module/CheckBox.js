export default function CheckBox({
  label,
  checked,
  onChange,
  value,
  name,
  dir = "ltr",
}) {
  const id = `checkbox-${name || label?.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="flex items-start sm:items-center space-x-2 rtl:space-x-reverse gap-4">
      <input
        id={id}
        type="checkbox"
        name={name || label}
        checked={checked}
        onChange={onChange}
        className=" text-[#292d32] focus:ring-0 border-gray-400 rounded mt-[4px] sm:mt-0 flex-shrink-0"
        value={value || label}
      />
      <label
        htmlFor={id}
        dir={dir}
        className="text-[#292d32] block cursor-pointer text-sm leading-relaxed"
      >
        {label}
      </label>
    </div>
  );
}
