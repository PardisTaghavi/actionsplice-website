import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://counterfactual-state-transport.ptgh.chatgpt.site'),
  title: 'Counterfactual State Transport',
  description: 'In-flight action editing for interactive world models.',
  openGraph: {
    title: 'Counterfactual State Transport',
    description: 'In-flight action editing for interactive world models.',
    type: 'website',
    url: '/',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Counterfactual State Transport' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Counterfactual State Transport',
    description: 'In-flight action editing for interactive world models.',
    images: ['/og.png'],
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
