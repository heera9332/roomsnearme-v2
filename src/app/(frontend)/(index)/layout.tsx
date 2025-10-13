import '../globals.css'
import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'

import { Jost, Manrope, Open_Sans } from 'next/font/google'
import Script from 'next/script'

const jost = Jost({ subsets: ['latin'], variable: '--font-jost' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'https://roomsnearme.in'

export const metadata: Metadata = {
  title: {
    template: '%s | Rooms Near Me',
    default: 'Rooms Near Me - Find Affordable Rooms & Stays Nearby',
  },
  description:
    'Discover and book rooms easily with Rooms Near Me. Find affordable stays nearby, compare prices, amenities, and book instantly.',
  keywords: [
    'rooms near me',
    'hotel booking',
    'cheap rooms',
    'room rentals',
    'short-term stays',
    'online room booking',
  ],
  openGraph: {
    title: 'Rooms Near Me - Find Affordable Rooms & Stays Nearby',
    description:
      'Easily find affordable rooms and accommodations nearby. Compare rates, amenities, and book your stay instantly on Rooms Near Me.',
    url: 'https://roomsnearme.in',
    siteName: 'Rooms Near Me',
    images: [
      {
        url: '/assets/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rooms Near Me - Affordable rooms nearby',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rooms Near Me - Book Affordable Rooms Nearby',
    description:
      'Find and book affordable rooms easily on Rooms Near Me. Compare prices, view amenities, and reserve instantly.',
    images: ['/assets/images/og-image.png'],
  },
}

interface RootArgs {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootArgs) {
  const clarityId = process.env.NEXT_PUBLIC_MS_CLARITY_ID

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rooms Near Me',
    url: SITE_URL,
    logo: `${SITE_URL}/icons/icon-512.png`,
    sameAs: [
      'https://x.com/roomsnearme',
      // add more socials if you have them
    ],
  }

  const siteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Rooms Near Me',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={query}`,
      'query-input': 'required name=query',
    },
  }
  return (
    <html lang="en" className={`${jost.variable} ${manrope.variable} ${openSans.variable}`}>
      <body className="antialiased">
        <Header />
        <div className="mt-[72px]">{children}</div>
        <Footer />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([orgJsonLd, siteJsonLd]),
          }}
        />
        {clarityId && (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        )}
      </body>
    </html>
  )
}
