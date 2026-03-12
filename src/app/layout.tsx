import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahaayam - Enterprise IT Self-Service Portal",
  description: "Workplace Central - IT Services Catalog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
