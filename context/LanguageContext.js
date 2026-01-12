"use client";
import { createContext, useContext, useState, useEffect } from "react";

const translations = {
  tr: {
    home: "Ana Sayfa",
    panel: "Panel Tanıtımı", // Panel İçeriği Panel Tanıtımı Panel Özellikleri
    panelDesc: "Panelimizi keşfedin. Modern arayüzü detaylı görsellerle inceleyin ve ilham alın.",
    tuning: "Tuning Simülatörü",
    services: "Hizmetlerimiz",
    servicesDescription: "Sunduğumuz hizmetlerle işinizi ileriye taşıyor, güvenilir çözümler üretiyoruz. Deneyimli ekibimiz ve müşteri odaklı yaklaşımımızla her zaman yanınızdayız.",
    contact: "İletişim",
    gotoPanel: "Panele Git",
    calculate: "Hesapla",
    nowCalculate: "Şimdi Hesapla",
    submit: "Gönder",
    name_surname: "Ad Soyad",
    email: "Email",
    phone: "Telefon",
    message: "Mesajınız",
    footer: "Tüm hakları saklıdır.",
    tuningTitle: "Tuning Hesapla",
    tuningDesc: "Araç performansınızı arttırmak ve doğru ayarları bulmak için gelişmiş hesaplama aracımızı kullanın.",
    marka: "Marka Seçin",
    model: "Model Seçin",
    yil: "Yıl Seçin",
    motor: "Motor Seçin",
    back: "Geri",
    panelItem1: "Hızlı İşlemler",
    panelItem2: "Kolay Dosya Yönetimi",
    panelItem3: "Gelişmiş Hesap Yönetimi",
    panelItem4: "Kullanıcı Destek Paneli",
    seeMore: "Daha Fazlasını Gör",
    hero1: "Aracınızın Performansını Zirveye Taşıyın",
    hero2: "ECU yazılımları ile maksimum verim, minimum yakıt tüketimi",
    fastPerformance: "Hızlı Performans",
    fastPerformanceDesc: "ECU yazılımınız için maksimum performans ve hız.",
    modernDesign: "Modern Tasarım",
    modernDesignDesc: "Kullanıcı dostu ve modern panel arayüzleri.",
    security: "Güvenlik",
    securityDesc: "Güvenli bağlantılarla verileriniz koruma altında.",
    testimonialQuote: "Bu panel sayesinde işlerimiz daha verimli hale geldi!",
    testimonialAuthor: "Ali Yılmaz, CEO",
    links: "Bağlantılar",
    yearsExperience: "Yıllık Deneyim",
    happyClients: "Müşteri",
    completedProjects: "Tamamlanan İşlem",
  },
  en: {
    home: "Home",
    panel: "Panel Introduction", // Panel Introduction Panel Content
    panelDesc: "Explore our panel. Review the best projects with detailed visuals and get inspired.",
    tuning: "Tuning Calculator",
    services: "Our Services",
    servicesDescription: "We move your business forward with the services we offer and create reliable solutions. With our experienced team and customer-focused approach, we're always here for you.",
    contact: "Contact",
    gotoPanel: "Go to Panel",
    calculate: "Calculate",
    nowCalculate: "Calculate Now",
    submit: "Submit",
    name_surname: "Name Surname",
    email: "Email",
    phone: "Phone",
    message: "Your Message",
    footer: "All rights reserved.",
    tuningTitle: "Tuning Calculator",
    tuningDesc: "Use our advanced calculation tool to enhance your vehicle's performance and find the right settings.",
    marka: "Select Brand",
    model: "Select Model",
    yil: "Select Year",
    motor: "Select Engine",
    back: "Back",
    panelItem1: "Quick Actions",
    panelItem2: "Easy File Management",
    panelItem3: "Advanced Account Management",
    panelItem4: "User Support Panel",
    seeMore: "See More",
    hero1: "Take Your Vehicle's Performance to the Peak",
    hero2: "Maximum efficiency with ECU software, minimum fuel consumption",
    fastPerformance: "Fast Performance",
    fastPerformanceDesc: "Maximum performance and speed for your ECU software.",
    modernDesign: "Modern Design",
    modernDesignDesc: "User-friendly and modern panel interfaces.",
    security: "Security",
    securityDesc: "Your data is protected with secure connections.",
    testimonialQuote: "Thanks to this panel, our operations have become more efficient!",
    testimonialAuthor: "Ali Yılmaz, CEO",
    links: "Links",
    yearsExperience: "Years of Experience",
    happyClients: "Customer",
    completedProjects: "Completed Transaction",
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("tr");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) {
      setLang(storedLang);
    }
  }, []);

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
