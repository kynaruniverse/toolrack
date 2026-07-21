import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToolRack — The digital toolbox for skilled trades",
  description:
    "Fast, reliable calculators for builders. No sign-up, no fuss — get your answer and get back to the job.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body min-h-screen antialiased">{children}</body>
    </html>
  );
}
