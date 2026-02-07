import type { Metadata } from 'next';
import { Inter, Space_Grotesk as SpaceGrotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AppLayout from '@/components/app-layout';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
});

const spaceGrotesk = SpaceGrotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'PlugRight',
  description: 'Universal EV Charging Companion App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className={cn('font-body antialiased', 'bg-background')}>
        <AppLayout>{children}</AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
