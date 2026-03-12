import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    // Mobile OTP and Email OTP via CredentialsProvider (no database required)
    // NOTE: Uses hardcoded demo OTP "123456" to avoid serverless in-memory store
    // issues on Vercel where /api/otp/send and NextAuth authorize run in different
    // lambda instances and cannot share state.
    CredentialsProvider({
      id: "otp",
      name: "OTP",
      credentials: {
        identifier: { label: "Identifier", type: "text" },
        otp: { label: "OTP", type: "text" },
        type: { label: "Type", type: "text" }, // "mobile" | "email"
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.otp || !credentials?.type) {
          return null;
        }

        const { identifier, otp, type } = credentials;

        // Demo OTP bypass: accept "123456" for any identifier
        if (otp !== "123456") {
          return null;
        }

        // Build in-memory user — no database calls
        const isEmail = type === "email";
        return {
          id: identifier,
          name: identifier.includes("@") ? identifier.split("@")[0] : identifier,
          email: identifier.includes("@") ? identifier : undefined,
          mobile: isEmail ? null : identifier,
          role: "EMPLOYEE",
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "EMPLOYEE";
        token.mobile = (user as { mobile?: string | null }).mobile ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.mobile = (token.mobile as string | null) ?? null;
      session.user.provider = (token.provider as string | undefined) ?? undefined;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
