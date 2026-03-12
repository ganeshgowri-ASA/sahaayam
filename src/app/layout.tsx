import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "./fonts/GeistVF.woff",
      weight: "100 900",
    },
  ],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sahaayam - Workplace Central",
  description: "Your workplace central hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
