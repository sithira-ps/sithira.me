import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      return profile?.login === process.env.ALLOWED_GITHUB_USERNAME
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
})
