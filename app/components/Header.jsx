"use client";
import { useLang } from "../../context/LanguageContext";
import { useState, useEffect } from "react";
import Image from "next/image";
import LanguageDropdown from "./LanguageDropdown";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const { t, lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const options = [
    { value: "tr", label: "TR" },
    { value: "en", label: "EN" },
  ];

  // localStorage'dan dili al
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang && savedLang !== lang) {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLangChange = (selectedOption) => {
    setLang(selectedOption.value);
    localStorage.setItem("lang", selectedOption.value);
  };

  const menuItems = ["home", "panel", "tuning", "services", "contact"];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 shadow-lg transition-all duration-500 ${
        scrolled ? "py-2 md:py-4" : "py-6 md:py-10"
      }`}
    >
      <div className="mx-auto flex justify-between items-center px-6 md:px-10 transition-all duration-500">
        <a href="#" className="flex items-center">
          <Image
            src="/ecusavelogo.png"
            alt="Ecusave Logo"
            width={scrolled ? 180 : 260}
            height={scrolled ? 28 : 40}
            priority
          />
        </a>

        {/* Desktop Menü */}
        <nav className="hidden md:flex gap-8 flex-1 justify-center">
          {menuItems.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="relative group px-1 py-2 font-medium text-gray-700 hover:text-rose-500 transition-all duration-300 whitespace-nowrap"
            >
              {t(key)}
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        <div className="flex gap-4 items-center">
          <a
            href="/portal"
            className="hidden md:inline-block bg-rose-500 hover:bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition-all duration-300"
          >
            {t("gotoPanel")}
          </a>

          <LanguageDropdown options={options} lang={lang} handleLangChange={handleLangChange} />

          {/* Mobile Menü Butonu */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Menü */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg px-6 pb-6 space-y-4 rounded-b-xl max-h-[calc(100vh-60px)] overflow-y-auto animate-fadeIn z-50">
            {menuItems.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 font-medium hover:text-rose-500 hover:bg-gray-100 rounded-lg transition"
              >
                {t(key)}
              </a>
            ))}
            <a
              href="/portal"
              onClick={() => setMenuOpen(false)}
              className="block bg-rose-500 hover:bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              {t("gotoPanel")}
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
