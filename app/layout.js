import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";

export const metadata = {
  title: {
    default: 'Ecusave – Araç Yazılım Çözümleri',
    template: '%s | Ecusave'
  },
  description: 'Ecusave – Araç yazılımları, tuning hesaplama ve hizmetlerimiz hakkında bilgi alın.',
  keywords: ['araç yazılımı', 'chip tuning', 'motor optimizasyonu', 'Ecusave'],
  openGraph: {
    title: 'Ecusave – Araç Yazılım Çözümleri',
    description: 'Araç yazılımı ve tuning konusunda profesyonel çözümler.',
    url: 'https://www.ecusave.com',
    siteName: 'Ecusave',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.ecusave.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="bg-gray-50 text-gray-900">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
