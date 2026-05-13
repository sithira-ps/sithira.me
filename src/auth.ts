import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/signout',
  },
  callbacks: {
    async signIn({ profile }) {
      return profile?.login === process.env.ALLOWED_GITHUB_USERNAME
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      if (url.startsWith('/') && !url.startsWith('//')) return `${baseUrl}${url}`
      return `${baseUrl}/admin`
    },
    async jwt({ token, profile }) {
      if (profile) {
        token.username = profile.login
      }
      return token
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub
      }
      if (token.username) {
        session.user.username = token.username as string
      }
      return session
    },
  },
})
