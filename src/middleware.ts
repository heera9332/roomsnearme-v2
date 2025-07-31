// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ALLOWED_ORIGINS = [
  'https://roomsnearme.in',
  // 'http://localhost:3000'
]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 1) Don’t apply this middleware to /api/media or anything under it
  if (pathname.startsWith('/api/media')) {
    return NextResponse.next()
  }

  // 2) Only intercept other /api/* calls
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

// apply to all /api/* except /api/media/*
export const config = {
  matcher: [
    '/api/:path*',
    '!/api/media/:path*'
  ]
}
