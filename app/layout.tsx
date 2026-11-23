import type { Metadata } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollReveal from "@/components/ScrollReveal";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://20-44-phi.vercel.app"),
  title: "20/44 — Underground klub elektronske muzike | Savamala, Beograd",
  description:
    "20/44 je kultni beogradski underground klub elektronske muzike u Savamali. Muzika je uvek ispred svega.",
  openGraph: {
    title: "20/44 — Underground klub elektronske muzike",
    description: "Savamala, Beograd. Muzika je uvek ispred svega.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr"
      className={`${archivo.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full bg-ink text-bone antialiased">
        <ScrollReveal />
        {children}
        {/* Globalni overlay slojevi — grid + prašina + mrlje + grain (preko celog sajta) */}
        <div className="fx-layer fx-grid" aria-hidden="true" />
        <div className="fx-layer fx-stain" aria-hidden="true" />
        <div className="fx-layer fx-dust" aria-hidden="true" />
        <div className="fx-layer grain" aria-hidden="true" />
      </body>
    </html>
  );
}
