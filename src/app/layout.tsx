import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahaayam – IT Support Portal",
  description: "Your one-stop IT support portal for services, incidents, and knowledge base.",
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
