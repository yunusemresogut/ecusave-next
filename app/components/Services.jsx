"use client";
import { CheckCircle } from "lucide-react"; // Lucide ikonları çok hafif ve modern
import Image from "next/image";
import { useLang } from "../../context/LanguageContext";

export default function Services() {
    const { t } = useLang();
  const services = [
    "ECU Yazılım Güncelleme",
    "Performans Artışı",
    "Yakıt Tüketimi Optimizasyonu",
    "Stage 1 / Stage 2 Yazılım",
    "EGR İptali",
    "DPF İptali",
    "AdBlue İptali",
    "Launch Control",
    "Pop&Bang Ayarı",
    "Immobilizer Çözümleri",
    "Hız Limiti İptali",
    "Start-Stop İptali",
    "Rev Limiter Ayarı",
    "Motor Koruma Yazılımı",
    "Özel Harita Ayarı"
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="mx-auto grid md:grid-cols-2 gap-12 items-center px-12">
        {/* Görsel */}
        <div className="relative w-full h-96">
          <Image
            src="/services.jpg"
            alt="Services"
            fill
            className="object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* Hizmet Listesi */}
        <div>
          <h2 className="text-5xl font-bold mb-6">{t("services")}</h2>
          <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
            {services.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle className="text-green-500 w-5 h-5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
