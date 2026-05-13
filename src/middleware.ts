import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { nextUrl } = request

  if (nextUrl.pathname === '/admin/login') return NextResponse.next()

  const sessionToken =
    request.cookies.get('authjs.session-token')?.value ||
    request.cookies.get('__Secure-authjs.session-token')?.value

  if (!sessionToken) {
    return NextResponse.redirect(new URL('/admin/login', nextUrl.origin))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
