import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const canonicalUrl = 'https://pardistaghavi.github.io/actionsplice-website/';
const arxivUrl = 'https://arxiv.org/abs/2609.08230';
const paperTitle = 'ActionSplice: In-Flight Action Editing for Interactive World Models';
const authors = [
  'Pardis Taghavi',
  'Tingyu Guo',
  'Jonas Lossner',
  'Gaurav Pandey',
  'Reza Langari',
];
const abstract = 'ActionSplice enables in-flight action editing in chunk-autoregressive video world models through Counterfactual State Transport. A lightweight corrector transports an interrupted backbone-native representation toward the matched state induced by a revised action at the same solver step, allowing the frozen world model and sampler to resume without replaying completed evaluations.';

const scholarlyArticleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ScholarlyArticle',
  headline: paperTitle,
  name: paperTitle,
  abstract,
  datePublished: '2026-09-08',
  url: canonicalUrl,
  mainEntityOfPage: canonicalUrl,
  identifier: 'arXiv:2609.08230',
  author: authors.map((name) => ({ '@type': 'Person', name })),
  publisher: { '@type': 'CollegeOrUniversity', name: 'Texas A&M University' },
  sameAs: [
    arxivUrl,
    'https://github.com/PardisTaghavi/ActionSplice',
  ],
  about: [
    'interactive world models',
    'video generation',
    'counterfactual state transport',
    'diffusion models',
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(canonicalUrl),
  title: paperTitle,
  description: 'ActionSplice edits an active diffusion state when an action changes, then resumes the frozen world model without replaying completed solver evaluations.',
  applicationName: 'ActionSplice',
  authors: authors.map((name) => ({ name })),
  creator: 'Pardis Taghavi',
  publisher: 'Texas A&M University',
  keywords: [
    'ActionSplice',
    'Counterfactual State Transport',
    'interactive world models',
    'video world models',
    'diffusion models',
    'in-flight action editing',
    'controllable video generation',
  ],
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: paperTitle,
    description: 'In-flight action editing for interactive world models without replaying completed solver evaluations.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: `${canonicalUrl}og.png`, width: 1200, height: 630, alt: paperTitle }],
  },
  twitter: {
    card: 'summary_large_image',
    title: paperTitle,
    description: 'In-flight action editing for interactive world models without replaying completed solver evaluations.',
    images: [`${canonicalUrl}og.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  other: {
    citation_title: paperTitle,
    citation_author: authors,
    citation_publication_date: '2026/09/08',
    citation_arxiv_id: '2609.08230',
    citation_pdf_url: 'https://arxiv.org/pdf/2609.08230',
    citation_abstract_html_url: arxivUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticleJsonLd).replace(/</g, '\\u003c') }}
        />
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
