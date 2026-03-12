import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahaayam - Enterprise IT Self-Service Portal",
  description: "Workplace Central - Enterprise IT Self-Service Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
