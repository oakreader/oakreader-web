import type { Metadata } from "next";
import { DM_Sans, Fraunces, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// ABC Oracle alternative — warm, clean grotesque sans-serif
// DM Sans has similar rounded, friendly letterforms to ABC Oracle
const dmSans = DM_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Fraunces — variable serif with SOFT axis for rounded terminals
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
});

// Exposure VAR — variable display font extracted from Dia
const exposure = localFont({
  variable: "--font-exposure",
  src: [
    { path: "../../public/fonts/exposure-1.woff2", weight: "1", style: "normal" },
    { path: "../../public/fonts/exposure-50.woff2", weight: "50", style: "normal" },
    { path: "../../public/fonts/exposure-100.woff2", weight: "100", style: "normal" },
    { path: "../../public/fonts/exposure-150.woff2", weight: "150", style: "normal" },
    { path: "../../public/fonts/exposure-200.woff2", weight: "200", style: "normal" },
    { path: "../../public/fonts/exposure-250.woff2", weight: "250", style: "normal" },
    { path: "../../public/fonts/exposure-300.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/exposure-350.woff2", weight: "350", style: "normal" },
    { path: "../../public/fonts/exposure-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/exposure-450.woff2", weight: "450", style: "normal" },
    { path: "../../public/fonts/exposure-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/exposure-550.woff2", weight: "550", style: "normal" },
    { path: "../../public/fonts/exposure-550-italic.woff2", weight: "550", style: "italic" },
    { path: "../../public/fonts/exposure-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/exposure-650.woff2", weight: "650", style: "normal" },
    { path: "../../public/fonts/exposure-700.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/exposure-750.woff2", weight: "750", style: "normal" },
    { path: "../../public/fonts/exposure-800.woff2", weight: "800", style: "normal" },
    { path: "../../public/fonts/exposure-850.woff2", weight: "850", style: "normal" },
    { path: "../../public/fonts/exposure-900.woff2", weight: "900", style: "normal" },
  ],
});

// ABC Favorit Mono alternative — design-oriented monospace
const spaceMono = Space_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Oak | A thinking partner that inspires insight",
  description:
    "Oak is a thinking partner that inspires insight. The purpose of reading is insight, not information.",
  keywords:
    "AI reader, research tool, thinking partner, reading assistant, insight, knowledge, AI research",
  openGraph: {
    title: "Oak | A thinking partner that inspires insight",
    siteName: "Oak",
    description:
      "Oak is a thinking partner that inspires insight. The purpose of reading is insight, not information.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oak | A thinking partner that inspires insight",
    description:
      "Oak is a thinking partner that inspires insight. The purpose of reading is insight, not information.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable} ${spaceMono.variable} ${exposure.variable} antialiased`}
    >
      <body className="min-h-dvh overflow-x-hidden font-sans">{children}</body>
    </html>
  );
}
