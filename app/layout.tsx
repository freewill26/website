import type { Metadata, Viewport } from "next";
import { Anton, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

// `viewport-fit=cover` is what makes env(safe-area-inset-*) non-zero on
// notched phones — the lightbox/menu safe-area padding depends on it.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Freewill · Sports Infrastructure Since 1990",
  description:
    "Taraflex® vinyl sports flooring — competition surfaces specified by FIBA, FIVB and BWF. The ground India plays on.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${anton.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
