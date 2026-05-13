import { auth } from '@/auth'

export default auth((req) => {
  const isAdmin = req.nextUrl.pathname.startsWith('/admin')

  if (isAdmin && !req.auth) {
    const signInUrl = new URL('/api/auth/signin', req.nextUrl.origin)
    signInUrl.searchParams.set('callbackUrl', req.nextUrl.href)
    return Response.redirect(signInUrl)
  }
})

export const config = {
  matcher: ['/admin/:path*'],
}
