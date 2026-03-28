import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const suisseAlt = Geist({
  variable: "--font-suisse-alt",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iprconstructora.vercel.app"),
  title: {
    default: "IPR Constructora | Constructora en Santiago",
    template: "%s | IPR Constructora",
  },
  description:
    "IPR Constructora es una constructora en Santiago especializada en obras civiles, proyectos industriales, retail, oficinas y desarrollo habitacional.",
  keywords: [
    "constructora en Santiago",
    "constructora en Chile",
    "obras civiles",
    "construcción industrial",
    "proyectos habitacionales",
    "retail",
    "oficinas",
    "IPR Constructora",
  ],
  openGraph: {
    title: "IPR Constructora | Constructora en Santiago",
    description:
      "Obras civiles, industriales, retail, oficinas y proyectos habitacionales con estándares altos de calidad, seguridad y cumplimiento.",
    url: "https://iprconstructora.vercel.app",
    siteName: "IPR Constructora",
    locale: "es_CL",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "IPR Constructora | Constructora en Santiago",
    description:
      "Obras civiles, industriales, retail, oficinas y proyectos habitacionales con estándares altos de calidad, seguridad y cumplimiento.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${suisseAlt.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}