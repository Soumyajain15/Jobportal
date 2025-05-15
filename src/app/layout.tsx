
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import Header from '@/components/layout/header';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/hooks/useAuth';
import CareerAssistantWidget from '@/components/chatbot/career-assistant-widget';
import { ThemeProvider } from '@/components/theme-provider';

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
    <html lang="en" suppressHydrationWarning={true}>
      {/* Next.js automatically handles the <head> tag content based on Metadata API and child components */}
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Header />
            <main className="pt-16">
              {children}
            </main>
            <Toaster />
            <CareerAssistantWidget />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
