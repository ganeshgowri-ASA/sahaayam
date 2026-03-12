import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahaayam - IT Self-Service Portal",
  description: "Enterprise IT Self-Service Portal - Workplace Central",
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
