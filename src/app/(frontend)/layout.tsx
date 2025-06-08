import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'

import { Jost, Manrope, Open_Sans } from 'next/font/google'

const jost = Jost({ subsets: ['latin'], variable: '--font-jost' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
})

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
        url: 'https://roomsnearme.in/images/og-image.jpg',
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
    images: ['https://roomsnearme.in/images/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${jost.variable} ${manrope.variable} ${openSans.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
