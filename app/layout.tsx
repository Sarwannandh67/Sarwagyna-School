import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { BRAND, SITE_NAME } from '@/lib/branding';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://school.sarwagyna.com'),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Free and low-cost sessions on startup reality, investment, AI tools, and career readiness. Taught by founders and practitioners. Join 410+ students across India.',
  authors: [{ name: 'Sarwagyna School', url: 'https://school.sarwagyna.com' }],
  creator: 'Sarwagyna Private Limited',
  publisher: 'Sarwagyna Private Limited',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: BRAND.favicon },
      { url: BRAND.faviconSvg, type: 'image/svg+xml' },
      { url: BRAND.favicon96, sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: BRAND.icon192, sizes: '192x192', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    siteName: SITE_NAME,
    locale: 'en_IN',
    type: 'website',
    title: SITE_NAME,
    description:
      'Free and low-cost sessions on startup reality, investment, AI tools, and career readiness. Taught by founders. Join 410+ students.',
    images: [{ url: '/og/home.png', width: 1200, height: 630, alt: `${SITE_NAME} — Know everything. Lose nothing.` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: 'Free sessions on startups, AI, investment, and careers — taught by founders. 410+ students.',
    images: ['/og/home.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
