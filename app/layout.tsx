import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://software.caldimengg.in"),
  title: {
    default: "CALDIM-DAS — Enterprise Digital Solutions",
    template: "%s | CALDIM-DAS",
  },
  description:
    "CALDIM-DAS delivers enterprise software, AI solutions, and digital transformation services for manufacturing, automotive, and industrial enterprises.",
  keywords: [
    "enterprise software",
    "digital transformation",
    "ERP solutions",
    "custom software development",
    "AI solutions",
   
    "CALDIM",
    "manufacturing software",
    "industrial software",
  ],
  authors: [{ name: "CALDIM Software Division" }],
  creator: "CALDIM",
  publisher: "CALDIM",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://software.caldimengg.in",
    siteName: "CALDIM Software Division",
    title: "CALDIM Software Division — Enterprise Digital Solutions",
    description:
      "Engineering-grade software solutions for modern enterprises. From ERP to AI, CALDIM delivers technology that works.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CALDIM Software Division",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CALDIM Software Division — Enterprise Digital Solutions",
    description:
      "Engineering-grade software solutions for modern enterprises.",
    images: ["/og-image.png"],
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
};

import { AnalyticsTracker } from "@/components/shared/AnalyticsTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CALDIM Software Division",
              url: "https://software.caldimengg.in",
              logo: "https://software.caldimengg.in/logo.png",
              description:
                "Enterprise software solutions and digital transformation services",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                areaServed: "IN",
              },
            }),
          }}
        />
      </head>
      <body
        style={{
          fontFamily: "var(--font-inter, 'Inter', sans-serif)",
        }}
      >
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
