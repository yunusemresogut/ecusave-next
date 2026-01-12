"use client";
import { CheckCircle, Award, Users, Briefcase } from "lucide-react";
import Image from "next/image";
import { useLang } from "../../context/LanguageContext";

export default function Services() {
  const { t } = useLang();
  const services = [
    "Stage 1 / Stage 1+ / Stage 2",
    "EGR OFF",
    "DPF OFF",
    "KAT OFF",
    "DTC OFF",
    "NOX OFF",
    "ADBLUE OFF",
    "POP&BANG",
    "LIMIT OFF",
    "MAF OFF",
    "SOFT/ECO Mod",
    "REV LIMITER",
    "LAMBDA/O2",
    "FLAP OFF",
    "SUPERCAR",
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-12 items-center">
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
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
            {t("services")}
          </h2>
          <p className="text-gray-600 mb-8">
            {t("servicesDescription") ||
              "Sunduğumuz hizmetlerle işinizi ileriye taşıyor, güvenilir çözümler üretiyoruz. Deneyimli ekibimiz ve müşteri odaklı yaklaşımımızla her zaman yanınızdayız."}
          </p>

          <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8 mb-10">
            {services.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle className="text-green-500 w-5 h-5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button className="px-6 py-3 bg-rose-500 hover:bg-orange-500 text-white font-semibold rounded-xl shadow-md transition">
            {t("gotoPanel") || "Panele Git"}
          </button>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="mt-20 container mx-auto px-6 lg:px-12 grid sm:grid-cols-3 gap-8 text-center">
        <div className="bg-white rounded-2xl shadow p-6">
          <Award className="mx-auto text-rose-600 w-10 h-10 mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">10+</h3>
          <p className="text-gray-500 text-sm">{t("yearsExperience") || "Yıllık Deneyim"}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <Users className="mx-auto text-rose-600 w-10 h-10 mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">500+</h3>
          <p className="text-gray-500 text-sm">{t("happyClients") || "Mutlu Müşteri"}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <Briefcase className="mx-auto text-rose-600 w-10 h-10 mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">5200+</h3>
          <p className="text-gray-500 text-sm">{t("completedProjects") || "Tamamlanan Proje"}</p>
        </div>
      </div>
    </section>
  );
}
