"use client";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center">
      {/* Video Arkaplan */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Siyah overlay (videoyu soluklaştırmak için) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* İçerik */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-7xl font-extrabold tracking-wide">ECUSAVE</h1>
        <p className="mt-4 text-2xl">Drive Smarter, Tune Better</p>
      </div>
    </section>
  );
}
