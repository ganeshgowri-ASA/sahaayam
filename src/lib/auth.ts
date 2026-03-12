import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { otpStore } from "@/lib/otp-store";

export const authOptions: NextAuthOptions = {
  providers: [
    // Mobile OTP and Email OTP via CredentialsProvider (no database required)
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
        const valid = otpStore.verify(identifier, otp, type as "mobile" | "email");

        if (!valid) {
          return null;
        }

        // Build in-memory user — no database calls
        const isEmail = type === "email";
        return {
          id: Buffer.from(identifier).toString("base64"),
          name: isEmail ? identifier.split("@")[0] : `User ${identifier.slice(-4)}`,
          email: isEmail ? identifier : null,
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
