// app/auth/page.tsx
import type { Metadata } from 'next'
import AuthPageClient from './page.client'

// Optional: SEO metadata for /auth
export const metadata: Metadata = {
  title: 'Account · Sign in or Register | RoomsNearMe',
  description:
    'Sign in to your RoomsNearMe account or create a new customer or vendor account. Access bookings, manage listings, and update your profile.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: { canonical: 'https://www.roomsnearme.in/auth' },
  openGraph: {
    type: 'website',
    url: 'https://www.roomsnearme.in/auth',
    siteName: 'RoomsNearMe',
    title: 'Sign in or Register · RoomsNearMe',
    description:
      'Log in or create a customer/vendor account to manage bookings and listings on RoomsNearMe.',
    images: ['https://www.roomsnearme.in/og/auth.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign in or Register · RoomsNearMe',
    description:
      'Log in or create a customer/vendor account to manage bookings and listings on RoomsNearMe.',
    images: ['https://www.roomsnearme.in/og/auth.png'],
  },
}

type Props = {
  searchParams?: Promise<{
    action?: string
    role?: string
    redirect_to?: string
    token?: string
  }>
}

// Server Component: reads search params, applies defaults, and renders the client UI
export default async function Page({ searchParams }: Props) {
  const sp = (await searchParams) || {}

  const actionParam = (sp.action || 'login') as
    | 'login'
    | 'register'
    | 'forgot-password'
    | 'reset-password'
    | 'logout'

  const roleParam = (sp.role || 'custom') as 'vendor' | 'customer'

  const redirectTo = sp.redirect_to || '/my-account'

  // Pass any reset token through if present
  const token = sp.token || ''

  return (
    <AuthPageClient
      initialAction={actionParam}
      initialRole={roleParam}
      initialRedirectTo={redirectTo}
      initialToken={token}
    />
  )
}
