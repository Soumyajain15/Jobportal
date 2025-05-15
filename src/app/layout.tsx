import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import Header from '@/components/layout/header';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'CareerConnect Pro',
  description: 'Full-Stack Job Portal with Resume Builder & ATS Score Analysis',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased font-sans`}>
        <Header />
        <main className="pt-16"> {/* Add padding to avoid content overlap with fixed header */}
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
