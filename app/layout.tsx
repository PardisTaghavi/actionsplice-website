import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export const metadata: Metadata = {
  metadataBase: new URL('https://pardistaghavi.github.io/actionsplice-website'),
  title: 'ActionSplice: In-Flight Action Editing for Interactive World Models',
  description: 'In-flight action editing for interactive world models.',
  openGraph: {
    title: 'ActionSplice: In-Flight Action Editing for Interactive World Models',
    description: 'In-flight action editing for interactive world models.',
    type: 'website',
    url: '/',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'ActionSplice' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ActionSplice: In-Flight Action Editing for Interactive World Models',
    description: 'In-flight action editing for interactive world models.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        {googleAnalyticsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}');
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
