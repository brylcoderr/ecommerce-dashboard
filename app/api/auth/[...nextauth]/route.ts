import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { users } from "@/lib/auth"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // In a real application, you would check the credentials against your database
        const user = users.find((user) => user.email === credentials.email)

        if (user && user.password === credentials.password) {
          // Return only the data you want to store in the session
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      // Add custom user data to the JWT token
      if (user) {
        token.id = user.id
        token.role = user.role
        token.avatar = user.avatar
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      // Add custom user data to the session
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.avatar = token.avatar
      }
      return session
    },
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
