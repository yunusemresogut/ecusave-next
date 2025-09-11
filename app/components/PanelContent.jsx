// components/PanelContent.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useLang } from "../../context/LanguageContext";

const panelItems = [
  {
    title: "Hızlı Dosya Yükleme",
    image: "/images/upload.svg",
  },
  {
    title: "Kolay Dosya Yönetimi",
    image: "/images/file-management.svg",
  },
  {
    title: "Gelişmiş Tuning Hesaplama",
    image: "/images/tuning.svg",
  },
  {
    title: "Çoklu Kullanıcı Desteği",
    image: "/images/users.svg",
  },
  {
    title: "Detaylı Raporlama",
    image: "/images/report.svg",
  },
  {
    title: "Mobil Uyumlu Arayüz",
    image: "/images/mobile.svg",
  },
  {
    title: "Yüksek Güvenlik",
    image: "/images/security.svg",
  },
  {
    title: "API Entegrasyonu",
    image: "/images/api.svg",
  },
  {
    title: "Otomatik Güncellemeler",
    image: "/images/update.svg",
  },
  {
    title: "7/24 Destek",
    image: "/images/support.svg",
  },
];

export default function PanelContent() {
    const { t } = useLang();
  return (
    <section id="panel" className="w-full py-20 bg-gray-50">
      <div className="mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-10">{t("panel")}</h2>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {panelItems.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col items-center bg-white rounded-2xl shadow p-16 hover:shadow-md transition">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
