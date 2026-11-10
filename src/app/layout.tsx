import type { Metadata, Viewport } from "next";
import { Syne, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { seo } from "@/data/portfolio";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: "Rowdro Mrong" }],
  openGraph: {
    title: seo.title,
    description: seo.description,
    siteName: "Rowdro Mrong — Building Digital Experiences That Move Businesses Forward.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      {/* suppressHydrationWarning: browser extensions inject attributes (e.g.
          __processed_<uuid>__) onto <body> before React hydrates. This silences
          that harmless mismatch on the body element only — real hydration
          errors inside components are still reported. */}
      <body
        suppressHydrationWarning
        className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-abyss text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
