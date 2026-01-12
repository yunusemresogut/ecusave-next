"use client";
import Image from "next/image";
import { useState } from "react";
import { useLang } from "../../context/LanguageContext";

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // FormData oluştur
      const formData = new FormData();
      formData.append("name_surname", form.name);
      formData.append("iletisim_email", form.email);
      formData.append("iletisim_tel", form.phone);
      formData.append("iletisim_mesaj", form.message);
      formData.append("column_set_id", 45);

      // API URL (env'den ya da direkt yaz)
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      // İstek at
      const res = await fetch(`${API_URL}/public/tables/iletisim/store`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("İstek başarısız");
      }

      const data = await res.json();
      setResult({ success: true, message: "Mesajınız başarıyla gönderildi!" });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      setResult({ success: false, message: "Bir hata oluştu, tekrar deneyin." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
  <div className="container mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-12 items-center">
    {/* Form */}
    <div>
      <h2 className="text-4xl lg:text-5xl font-bold mb-6">
        {t("contact") || "İletişim"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder={t("name_surname")}
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder={t("email")}
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
          required
        />
        <input
          type="number"
          name="phone"
          placeholder={t("phone")}
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
          required
        />
        <textarea
          name="message"
          placeholder={t("message")}
          value={form.message}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-rose-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-rose-600 to-orange-600 hover:from-orange-600 hover:to-rose-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition disabled:from-gray-400 disabled:to-gray-400"
        >
          {loading ? "Gönderiliyor..." : t("submit")}
        </button>
      </form>

      {/* Sonuç Mesajı */}
      {result && (
        <p
          className={`mt-4 text-sm ${
            result.success ? "text-green-600" : "text-orange-600"
          }`}
        >
          {result.message}
        </p>
      )}
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