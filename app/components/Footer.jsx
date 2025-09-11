"use client";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useLang } from "../../context/LanguageContext";

export default function Footer() {
    const { t } = useLang();
  return (
    <footer className="w-full bg-gray-100 py-6 mt-20">
      <div className="mx-auto p-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Sol taraf */}
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} Ecusave. {t("footer")}
        </p>

        {/* Sağ taraf sosyal medya */}
        <div className="flex space-x-4 text-gray-500">
          <a href="https://www.facebook.com/ecusavetr" target="_blank" className="hover:text-blue-600 transition">
            <FaFacebook size={20} />
          </a>
          <a href="https://www.instagram.com/ecusavetr" target="_blank" className="hover:text-pink-500 transition">
            <FaInstagram size={20} />
          </a>
          <a href="https://x.com/ecusave" target="_blank" className="hover:text-sky-500 transition">
            <FaTwitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
