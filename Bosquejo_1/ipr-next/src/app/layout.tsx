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

const description =
  "IPR Constructora desarrolla obras civiles, industriales, comerciales y habitacionales en Santiago con orden, cumplimiento y calidad.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ipr-next.vercel.app"),
  title: {
    default: "IPR Constructora | Constructora en Santiago",
    template: "%s | IPR Constructora",
  },
  description,
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
  applicationName: "IPR Constructora",
  authors: [{ name: "IPR Constructora" }],
  creator: "IPR Constructora",
  publisher: "IPR Constructora",
  openGraph: {
    title: "IPR Constructora | Constructora en Santiago",
    description,
    url: "https://ipr-next.vercel.app",
    siteName: "IPR Constructora",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "IPR Constructora | Constructora en Santiago",
      },
    ],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "IPR Constructora | Constructora en Santiago",
    description,
    images: ["/twitter-image"],
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