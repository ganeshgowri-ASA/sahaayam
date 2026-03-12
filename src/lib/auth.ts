import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import { otpStore } from "@/lib/otp-store";

export const authOptions: NextAuthOptions = {
  providers: [
    // Mobile OTP and Email OTP via CredentialsProvider
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

        // Auto-create or find user
        const isEmail = type === "email";
        const user = {
          id: Buffer.from(identifier).toString("base64"),
          name: isEmail ? identifier.split("@")[0] : `User ${identifier.slice(-4)}`,
          email: isEmail ? identifier : null,
          mobile: isEmail ? null : identifier,
          role: "EMPLOYEE",
        };

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          role: user.role,
        };
      },
    }),

    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "placeholder-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "placeholder-google-client-secret",
      allowDangerousEmailAccountLinking: true,
    }),

    // Microsoft / Outlook OAuth
    AzureADProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID ?? "placeholder-microsoft-client-id",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET ?? "placeholder-microsoft-client-secret",
      tenantId: process.env.MICROSOFT_TENANT_ID ?? "common",
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "EMPLOYEE";
        token.mobile = (user as { mobile?: string | null }).mobile ?? null;
      }
      if (account?.provider === "google" || account?.provider === "azure-ad") {
        token.role = token.role ?? "EMPLOYEE";
        token.provider = account.provider;
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
