import type { Metadata } from "next";
import { Oswald, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "ToolRack — The Digital Toolbox for Skilled Trades",
  description:
    "Fast, reliable calculators for tradespeople. Calculate concrete, bricks, and material costs on-site, on your phone.",
  themeColor: "#1C1F22",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="bg-concrete text-graphite antialiased font-body">
        {children}
      </body>
    </html>
  );
}
