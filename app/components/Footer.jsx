"use client";
import { FaInstagram } from "react-icons/fa";
import { useLang } from "../../context/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="w-full bg-gray-900 text-gray-300 pt-14 pb-6">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Ecusave</h2>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">{t("links") || "Bağlantılar"}</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-rose-500 transition-all duration-300">
                {t("home") || "Ana Sayfa"}
              </a>
            </li>
            <li>
              <a href="#panel" className="hover:text-rose-500 transition-all duration-300">
                {t("panel") || "Panel"}
              </a>
            </li>
            <li>
              <a href="#tuning" className="hover:text-rose-500 transition-all duration-300">
                {t("tuning") || "Tuning"}
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-rose-500 transition-all duration-300">
                {t("services") || "Hizmetler"}
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-rose-500 transition-all duration-300">
                {t("contact") || "İletişim"}
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">{t("contact") || "İletişim"}</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:info@ecusave.com" className="hover:text-rose-500">info@ecusave.com</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6">
        <div className="mx-auto max-w-7xl px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Ecusave. {t("footer") || "Tüm hakları saklıdır."}
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/ecusavetr" target="_blank" className="hover:text-pink-500 transition">
              <FaInstagram size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
