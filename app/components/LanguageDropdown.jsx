import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

export default function LanguageDropdown({ options, lang, handleLangChange }) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === lang);

  return (
    <div className="relative w-28">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center bg-white/90 backdrop-blur-md border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:shadow-md transition-all duration-300"
      >
        {selectedOption.label}
        {open ? <HiChevronUp className="ml-2" /> : <HiChevronDown className="ml-2" />}
      </button>

      {open && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                handleLangChange(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-rose-100 hover:text-rose-600 transition-all duration-200 ${
                opt.value === lang ? "bg-rose-50 text-rose-500 font-semibold" : ""
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
