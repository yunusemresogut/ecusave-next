"use client";
import { useLang } from "../../context/LanguageContext";
import Select from "react-select";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const { t, lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const options = [
    { value: "tr", label: "TR" },
    { value: "en", label: "EN" },
  ];

  // localStorage'dan dili al ve set et
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang && savedLang !== lang) {
      setLang(savedLang);
    }
  }, []);

  // Dil değişince localStorage'a yaz
  const handleLangChange = (selectedOption) => {
    setLang(selectedOption.value);
    localStorage.setItem("lang", selectedOption.value);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="mx-auto flex justify-between items-center p-6 md:p-10">
        {/* Logo */}
        <a href="#" className="font-bold text-xl">
          Ecusave
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
  {["panel", "tuning", "services", "contact"].map((key) => (
    <a
  key={key}
  href={`#${key}`}
  className="relative group px-1 py-2 text-gray-700 hover:text-blue-600 transition"
>
  {t(key)}
  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
</a>
  ))}
</nav>

        {/* Right Section */}
        <div className="flex gap-4 items-center">
          <a
            href="/panel"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hidden md:inline-block"
          >
            {t("gotoPanel")}
          </a>

          <Select
            instanceId="lang"
            options={options}
            value={options.find((opt) => opt.value === lang)}
            onChange={handleLangChange}
            className="w-24"
            isSearchable={false}
          />

          {/* Hamburger button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 pb-6 space-y-4">
  {["panel", "tuning", "services", "contact"].map((key) => (
    <a
      key={key}
      href={`#${key}`}
      onClick={() => setMenuOpen(false)}
      className="block px-2 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded transition"
    >
      {t(key)}
    </a>
  ))}
  <a
            href="/panel"
            onClick={() => setMenuOpen(false)}
            className="block bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {t("gotoPanel")}
          </a>
</div>
      )}
    </header>
  );
}
