// middleware.ts (in your project root)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Only allow these origins to call your API:
 * - your live domain
 * - localhost during dev (optional)
 */
const ALLOWED_ORIGINS = [
  'https://roomsnearme.in',
  // 'http://localhost:3000' // only for dev
]

export function middleware(req: NextRequest) {
  // only intercept /api/* calls
  if (req.nextUrl.pathname.startsWith('/api/')) {
    const origin = req.headers.get('origin') || req.headers.get('referer') || ''

    // 1) Block everything not from your domain
    try {
      const host = new URL(origin).origin
      if (!ALLOWED_ORIGINS.includes(host)) {
        return new NextResponse('Forbidden', { status: 403 })
      }
    } catch {
      return new NextResponse('Forbidden', { status: 403 })
    }

    // 2) Handle preflight
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

    // 3) For real requests, let them through—then add CORS header
    const res = NextResponse.next()
    res.headers.set('Access-Control-Allow-Origin', origin)
    return res
  }

  // non-API routes continue normally
  return NextResponse.next()
}

// apply this middleware to all /api/* paths
export const config = {
  matcher: '/api/:path*',
}
