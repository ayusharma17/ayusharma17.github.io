import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Manrope, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme';
import { MotionProvider } from '@/lib/motion';
import SkipLink from '@/components/SkipLink';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ayush.dev'),
  title: {
    default: 'Ayush Sharma — Keita-meets-Minimal Portfolio',
    template: '%s · Ayush Sharma Portfolio'
  },
  description:
    'Ayush Sharma is a developer blending responsible AI, tactile hardware, and narrative-driven experiences. Explore projects, case studies, and contact info.',
  openGraph: {
    title: 'Ayush Sharma — Portfolio',
    description:
      'Explore machine learning, robotics, and creative engineering projects designed and built by Ayush Sharma.',
    url: 'https://ayush.dev',
    siteName: 'Ayush Sharma Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/fallback-hero.svg',
        width: 1200,
        height: 900,
        alt: 'Ayush Sharma Portfolio preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ayush_codes',
    creator: '@ayush_codes',
    title: 'Ayush Sharma — Portfolio',
    description: 'Interactive portfolio with WebGL hero, GSAP motion, and detailed case studies.',
    images: ['/fallback-hero.svg']
  },
  alternates: {
    canonical: '/'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="theme-light" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${display.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <MotionProvider>
            <Analytics />
            <SkipLink />
            <Nav />
            <main id="main" className="pt-24">
              {children}
            </main>
            <Footer />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
