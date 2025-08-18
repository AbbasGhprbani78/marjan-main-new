export default function CheckBox({ label, checked, onChange, value, name }) {
  const id = `checkbox-${name || label?.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="flex items-center space-x-2">
      <input
        id={id}
        type="checkbox"
        name={name || label}
        checked={checked}
        onChange={onChange}
        className="text-[#292d32] focus:ring-0 border-gray-400 rounded"
        value={value || label}
      />
      <label htmlFor={id} className="text-[#292d32] block px-6 cursor-pointer">
        {label}
      </label>
    </div>
  );
}
