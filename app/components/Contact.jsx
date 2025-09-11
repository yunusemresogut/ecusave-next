"use client";
import Image from "next/image";
import { useState } from "react";
import { useLang } from "../../context/LanguageContext";

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form gönderildi:", form);
    // Burada API isteği yapabilirsin
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
        {/* Form */}
        <div>
          <h2 className="text-5xl font-bold mb-6">{t("contact") || "İletişim"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder={t("name_surname")}
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t("email")}
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder={t("phone")}
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
            <textarea
              name="message"
              placeholder={t("message")}
              value={form.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 h-32 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              {t("submit")}
            </button>
          </form>
        </div>

        {/* Görsel */}
        <div className="relative w-full h-96 hidden md:block">
          <Image
            src="/contact.jpg"
            alt="Contact"
            fill
            className="object-cover rounded-2xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
