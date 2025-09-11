"use client";
import { createContext, useContext, useState } from "react";

const translations = {
  tr: {
    panel: "Panel İçeriği",
    tuning: "Tuning Hesapla",
    services: "Hizmetlerimiz",
    contact: "İletişim",
    gotoPanel: "Panele Git",
    calculate: "Hesapla",
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
  },
  en: {
    panel: "Panel Content",
    tuning: "Tuning Calculator",
    services: "Our Services",
    contact: "Contact",
    gotoPanel: "Go to Panel",
    calculate: "Calculate",
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
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "tr");
  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
