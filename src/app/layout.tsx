import type { Metadata, Viewport } from "next";
import { Golos_Text, Literata } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadProvider } from "@/components/LeadForm";
import "./globals.css";

const literata = Literata({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const golos = Golos_Text({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-text",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Scanddy — диваны и кресла от мебельной фабрики в Дагестане",
    template: "%s — Scanddy",
  },
  description:
    "Мягкая мебель Scanddy собственного производства. Подберём модель и комплектацию под ваш интерьер и рассчитаем стоимость.",
};

export const viewport: Viewport = {
  themeColor: "#F4F0E8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${literata.variable} ${golos.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Перейти к содержанию
        </a>
        <LeadProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </LeadProvider>
      </body>
    </html>
  );
}
