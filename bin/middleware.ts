// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ALLOWED_ORIGINS = [
  'https://roomsnearme.in',
  'http://localhost:3000'
]

function getRequestOrigin(req: NextRequest): string | null {
  const originHeader = req.headers.get('origin') || ''
  try {
    return new URL(originHeader).origin
  } catch {
    return null
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // skip /api/media entirely
  if (pathname.startsWith('/api/media') || pathname.startsWith('/api/users')) {
    return NextResponse.next()
  }

  // apply to all other /api/* routes
  if (pathname.startsWith('/api/')) {
    const origin = getRequestOrigin(req)
    if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    // preflight
    if (req.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
          'Vary': 'Origin',
        },
      })
    }

    // actual request
    const res = NextResponse.next()
    res.headers.set('Access-Control-Allow-Origin', origin)
    res.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.headers.set('Access-Control-Max-Age', '86400')
    res.headers.set('Vary', 'Origin')
    return res
  }

  return NextResponse.next()
}

export const config = {
  // match /api/* except /api/media
  // matcher: ['/api/:path((?!media/).*)'],
}
