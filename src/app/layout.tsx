import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shareef 3Ts Consulting",
  description: "Contributing to a world where collaboration, cooperation, and kindness thrive.",
  icons: {
    icon: "/3Ts-latest-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans bg-cream text-charcoal selection:bg-gold selection:text-cream overflow-x-hidden w-full relative">
        {children}
      </body>
    </html>
  );
}
