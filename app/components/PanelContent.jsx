"use client";
import { MdSecurity, MdPalette, MdRocketLaunch } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useLang } from "../../context/LanguageContext";
import Image from "next/image";
import { useState, useEffect } from "react";

const panelItems = [
  { titleKey: "panelItem1", image: "/panel-1.jpeg" },
  { titleKey: "panelItem2", image: "/panel-2.jpeg" },
  { titleKey: "panelItem3", image: "/panel-3.jpeg" },
  { titleKey: "panelItem4", image: "/panel-4.jpeg" },
];

export default function PanelContent() {
  const { t } = useLang();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section
      id="panel"
      className="relative w-full py-20 bg-gradient-to-b from-gray-50 via-white to-gray-100 overflow-hidden"
    >
      {/* Dekoratif Arka Plan Shape'leri */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>

      <div className="relative z-10 mx-auto px-6 text-center max-w-7xl">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 pb-4 bg-gradient-to-r from-rose-500 to-orange-600 bg-clip-text text-transparent">
          {t("panel")}
        </h2>

        <p className="max-w-2xl mx-auto text-gray-600 mb-12 text-lg leading-relaxed">
          {t("panelDesc") ||
            "Panelimizi keşfedin. En iyi projelerimizi, detaylı görsellerle inceleyin ve ilham alın."}
        </p>

        {/* Slider */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
          }}
        >
          {panelItems.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="group flex flex-col items-center bg-white rounded-2xl transition duration-300 cursor-pointer overflow-hidden border border-gray-200 shadow hover:shadow-lg"
                onClick={() => setSelectedImage(item.image)}
              >
                <div className="relative w-full h-60 md:h-80 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={t(item.titleKey)}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                </div>
                <h3 className="text-lg font-semibold mt-4 mb-6 text-gray-800 group-hover:text-rose-600 transition">
                  {t(item.titleKey)}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA Buton */}
        <div className="mt-12">
          <a
            href="#services"
            className="inline-block bg-gradient-to-r from-rose-500 to-orange-600 text-white font-medium px-8 py-3 rounded-lg shadow hover:shadow-lg transition"
          >
            {t("seeMore") || "Tümünü Gör"}
          </a>
        </div>

        {/* Özellik Kartları */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow hover:shadow-md transition">
            <span className="text-4xl text-rose-500">
              <MdRocketLaunch />
            </span>
            <h4 className="font-semibold mt-3">{t("fastPerformance") || "Hızlı Performans"}</h4>
            <p className="text-sm text-gray-600 mt-2">
              {t("fastPerformanceDesc") || "Her zaman yüksek hızda çalışan yapılar."}
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow hover:shadow-md transition">
            <span className="text-4xl text-orange-500">
              <MdPalette />
            </span>
            <h4 className="font-semibold mt-3">{t("modernDesign") || "Modern Tasarım"}</h4>
            <p className="text-sm text-gray-600 mt-2">
              {t("modernDesignDesc") || "Estetik ve kullanıcı dostu arayüzler."}
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow hover:shadow-md transition">
            <span className="text-4xl text-rose-400">
              <MdSecurity />
            </span>
            <h4 className="font-semibold mt-3">{t("security") || "Güvenlik"}</h4>
            <p className="text-sm text-gray-600 mt-2">
              {t("securityDesc") || "Verileriniz daima güvende."}
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl italic text-gray-700">
            "{t("testimonialQuote") || "Bu panel sayesinde işlerimiz daha verimli hale geldi!"}"
          </blockquote>
          <p className="mt-4 text-gray-500">
            — {t("testimonialAuthor") || "Ali Yılmaz, CEO"}
          </p>
        </div>
      </div>

      {/* Modal (Lightbox) */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-[85vw] h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Selected"
              fill
              className="object-contain"
              sizes="85vw"
            />
            {/* Caption */}
            <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white p-4 text-center text-sm">
              {t("imageCaption") || "Detaylı incelemek için yakınlaştırın."}
            </div>
            {/* Kapat Butonu */}
            <button
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-900 rounded-full px-2 py-1 shadow-md cursor-pointer transition"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
