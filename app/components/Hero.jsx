"use client";
import { FaChevronDown } from "react-icons/fa";
import { useLang } from "../../context/LanguageContext";

export default function Hero() {
  const { t } = useLang();
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-rose-900 via-orange-900 to-rose-800 overflow-hidden">
      <div className="absolute inset-0">
        <video className="absolute top-0 left-0 w-full h-full object-cover opacity-50" autoPlay loop muted playsInline>
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg animate-fadeIn">
          {t("hero1")}
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-gray-200 animate-fadeIn delay-200">
          {t("hero2")}
        </p>
        <a
          href="#tuning"
          className="mt-10 inline-block bg-gradient-to-r from-rose-500 to-orange-500 hover:from-orange-500 hover:to-rose-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 animate-fadeIn delay-400"
        >
          {t("nowCalculate")}
        </a>
      </div>
      <a href="#panel" className="absolute bottom-32 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer">
        <FaChevronDown className="text-white text-3xl" />
      </a>
    </section>
  );
}
