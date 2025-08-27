import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import type React from "react";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "EatLister",
  description:
    "Plataforma inovadora que conecta pessoas apaixonadas por gastronomia e transforma experiências culinárias em momentos únicos.",
  keywords:
    "restaurantes, gastronomia, food tech, experiências culinárias, tecnologia, inovação, listas",
  authors: [
    { name: "Maycon Douglas" },
    { name: "Lucas Paiva" },
    { name: "Victor Peleteiro" },
  ],
  creator: "EatLister Team",
  publisher: "EatLister",
  openGraph: {
    title: "EatLister",
    description:
      "Plataforma inovadora que conecta pessoas apaixonadas por gastronomia e transforma experiências culinárias em momentos únicos.",
    url: "https://eatlister.com",
    siteName: "EatLister",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EatLister",
    description:
      "Plataforma inovadora que conecta pessoas apaixonadas por gastronomia e transforma experiências culinárias em momentos únicos.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${figtree.variable} antialiased`}>
      <body className="font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
