// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { readNameFromJwt, readRoleFromJwt } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

interface DecodedJWT {
  sub: string;
  role: string;
  exp: number;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🔐 Received credentials:", credentials);

        if (!credentials) return null;

        try {
          const res = await fetch(
            "http://localhost:8080/api/auth/authenticate",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: credentials.username,
                password: credentials.password,
              }),
            }
          );

          console.log("📡 API Response status:", res.status);

          if (!res.ok) {
            const errorText = await res.text();
            console.log("❌ Auth API failed:", errorText);
            return null;
          }

          const data = await res.json();
          console.log("✅ API Response JSON:", data);

          const username = readNameFromJwt(data.access_token);
          const role = readRoleFromJwt(data.access_token);

          console.log("👤 Decoded username:", username);
          console.log("🔓 Decoded role:", role);

          if (!username || !role) return null;

          return {
            id: username,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            username,
            role,
          };
        } catch (error) {
          console.error("🔥 Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const typedUser = user as unknown as {
          accessToken: string;
          refreshToken: string;
          username: string;
          role: string;
        };
        const decoded = jwtDecode<DecodedJWT>(typedUser.accessToken);

        token.accessToken = typedUser.accessToken;
        token.refreshToken = typedUser.refreshToken;
        token.username = typedUser.username;
        token.role = typedUser.role;
        token.accessTokenExpires = decoded.exp * 1000;
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // TODO: refresh token flow
      return token;
    },
    async session({ session, token }) {
      session.user = {
        username: token.username as string,
        role: token.role as string,
        accessToken: token.accessToken as string,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
