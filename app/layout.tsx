import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Nova Astro — частные орбитальные и дальние экспедиции",
  description:
    "Nova Astro — операционный интегратор сертифицированных экипажных полётов для частных клиентов. Три маршрута, шесть стартовых окон в год.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen overflow-x-hidden">
        <div className="nova-bg" />
        <div className="nova-grid" />
        {children}
      </body>
    </html>
  );
}
