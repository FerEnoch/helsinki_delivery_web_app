import { NextResponse } from 'next/server'

const currentEnvOrigin = process.env.NODE_ENV === 'development'
  ? process.env.NEXT_PUBLIC_LOCAL_BASE_URL
  : process.env.NEXT_PUBLIC_PROD_BASE_URL

const allowedOrigins = [currentEnvOrigin]

export const config = {
  matcher: '/api/:path*'
}

export function middleware (request) {
  const requestHeaders = new Headers(request.headers)
  const origin = requestHeaders.get('referer')

  const isAllowedOrigin = origin
    ? allowedOrigins.find(allowedOrigin => origin.includes(allowedOrigin))
    : requestHeaders.get('user-agent').includes('Google-Apps-Script')

  if (!isAllowedOrigin) {
    return NextResponse.json({
      message: 'ERROR */****-->> NOT ALLOWED CLIENT! Client client is not allowed to access the resource'
    },
    {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        'Content-Type': 'text/plain'
      }
    }
    )
  }

  const isAPIAuth = requestHeaders.get('x-api-key')
  if (!isAPIAuth || isAPIAuth !== process.env.API_KEY) {
    return NextResponse.json({
      message: 'ERROR */****-->> MISSED API-KEY! Client client is not allowed to access the resource'
    },
    { status: 401 })
  }
}
