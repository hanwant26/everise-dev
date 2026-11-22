
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://everise-dev.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: "EVERISE DEV | Professional Web Development Studio",

  description:
    "EVERISE DEV is an independent web development studio creating modern websites, e-commerce solutions, custom web applications, and digital experiences for businesses.",

  applicationName: "EVERISE DEV",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "EVERISE DEV | Professional Web Development Studio",
    description:
      "Modern websites, e-commerce solutions, and custom web applications designed to help ambitious businesses grow.",
    url: siteUrl,
    siteName: "EVERISE DEV",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1732,
        height: 908,
        alt: "EVERISE DEV — Digital experiences, built to stand out.",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EVERISE DEV | Professional Web Development Studio",
    description:
      "Modern websites, e-commerce solutions, and custom web applications for ambitious businesses.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
