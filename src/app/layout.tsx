// app/layout.tsx
import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'MagicPark - Amusement Park',
  description: 'Experience the magic at MagicPark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main className="pt-16 lg:pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
