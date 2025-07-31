// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ALLOWED_ORIGINS = [
  'https://roomsnearme.in',
  // 'http://localhost:3000'
]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // we’ll never see /api/media here because our matcher skips it
  // (but you can still add an extra guard if you like)
  if (pathname.startsWith('/api/media')) {
    return NextResponse.next()
  }

  // now only non-media /api/* lands here
  if (pathname.startsWith('/api/')) {
    const origin = req.headers.get('origin') || req.headers.get('referer') || ''
    try {
      const host = new URL(origin).origin
      if (!ALLOWED_ORIGINS.includes(host)) {
        return new NextResponse('Forbidden', { status: 403 })
      }
    } catch {
      return new NextResponse('Forbidden', { status: 403 })
    }

    if (req.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    const res = NextResponse.next()
    res.headers.set('Access-Control-Allow-Origin', origin)
    return res
  }

  return NextResponse.next()
}

export const config = {
  // match /api/<anything> except if it starts with "media/"
  matcher: ['/api/:path((?!media/).*)'],
}
