import { NextResponse } from 'next/server'

export const config = {
  matcher: '/api/:path*'
}

export function middleware (request) {
  const isAPIAuth = request.headers.get('x-api-key')
  if (!isAPIAuth || isAPIAuth !== process.env.API_KEY) {
    return NextResponse.json({
      message: 'ERROR */****-->> MISSED API-KEY! Client client is not allowed to access the resource'
    },
    { status: 401 })
  }
}
