import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Baustein - Almanca Öğrenme Platformu",
    template: "%s | Baustein",
  },
  description:
    "Geliştiriciler için tasarlanmış Almanca A1.1 öğrenme platformu. Kelime dağarcığı, dilbilgisi pratikleri ve interaktif oyunlarla Almanca öğren.",
  keywords: [
    "almanca öğren",
    "german learning",
    "a1 almanca",
    "almanca kelime",
    "deutsch lernen",
    "almanca sözlük",
    "almanca pratik",
    "almanca oyunlar",
  ],
  authors: [{ name: "Baustein Team" }],
  creator: "Baustein",
  publisher: "Baustein",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Baustein",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    title: "Baustein - Almanca Öğrenme Platformu",
    description:
      "Geliştiriciler için tasarlanmış Almanca A1.1 öğrenme platformu. Kelime dağarcığı, dilbilgisi pratikleri ve interaktif oyunlarla Almanca öğren.",
    siteName: "Baustein",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baustein - Almanca Öğrenme Platformu",
    description:
      "Geliştiriciler için tasarlanmış Almanca A1.1 öğrenme platformu.",
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
} satisfies Viewport;

export default function RootLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
