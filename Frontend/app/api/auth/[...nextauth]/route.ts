import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // BACKEND INTEGRATION: Replace with actual database lookup
        // This should connect to your actual user database and verify credentials
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Temporary mock implementation for testing
          const mockUsers = [
            { id: "1", name: "Admin User", email: "admin@example.com", password: "password", role: "admin" },
            { id: "2", name: "Shop User", email: "shop@example.com", password: "password", role: "shop" },
            { id: "3", name: "Supplier User", email: "supplier@example.com", password: "password", role: "supplier" },
            { id: "4", name: "Driver User", email: "driver@example.com", password: "password", role: "driver" },
          ]

          const user = mockUsers.find(
            (user) => user.email === credentials.email && user.password === credentials.password,
          )

          if (user) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            }
          }
        } catch (error) {
          console.error("Authentication error:", error)
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add role and id to JWT token when user signs in
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // Add role and id to session from JWT token
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
