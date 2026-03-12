import type { Metadata } from "next";
import "./globals.css";
import ChatbotGenie from "@/components/shared/ChatbotGenie";

export const metadata: Metadata = {
  title: "Sahaayam – IT Help Desk",
  description: "Your one-stop IT support portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
        <ChatbotGenie />
      </body>
    </html>
  );
}
