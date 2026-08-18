import type { Metadata, Viewport } from "next";
import { Big_Shoulders_Stencil, Archivo, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const displayFont = Big_Shoulders_Stencil({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

const bodyFont = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-plex-mono",
});

const title = "ToolRack — The Digital Toolbox for Skilled Trades";
const description =
  "Fast, reliable tools for hands-on trades — construction, catering, and more. No sign-up, no clutter, built for the job.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s",
  },
  description,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "ToolRack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  verification: {
    google: "zVOsJt1VCzNzmvJNpJedXJBt8N-YEByBFAC9WdlkSLI",
  },
};

export const viewport: Viewport = {
  themeColor: "#1B1B1A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${plexMono.variable}`}>
      <body className="bg-kraft-dark text-ink antialiased font-body">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
