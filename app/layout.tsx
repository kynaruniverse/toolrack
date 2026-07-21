import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToolRack — The Digital Toolbox for Skilled Trades",
  description: "Fast, reliable calculators for tradespeople. Calculate concrete, bricks, and material costs on-site, on your phone.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}