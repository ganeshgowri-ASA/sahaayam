import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sahaayam – Work Place Central',
  description: 'Sahaayam IT portal – your one-stop workplace central for IT SOPs, services, policies, and support.',
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
