import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const MOCK_USERS = [
  {
    id: "1",
    employeeId: "admin",
    passwordHash: bcrypt.hashSync("admin123", 10),
    name: "Administrator",
    role: "SUPER_ADMIN",
  },
  {
    id: "2",
    employeeId: "itadmin",
    passwordHash: bcrypt.hashSync("itadmin123", 10),
    name: "IT Administrator",
    role: "IT_ADMIN",
  },
  {
    id: "3",
    employeeId: "employee",
    passwordHash: bcrypt.hashSync("emp123", 10),
    name: "Employee",
    role: "EMPLOYEE",
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        employeeId: { label: "Employee ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.employeeId || !credentials?.password) {
          return null;
        }

        const user = MOCK_USERS.find(
          (u) => u.employeeId === credentials.employeeId
        );

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          employeeId: user.employeeId,
          name: user.name,
          role: user.role,
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
        token.employeeId = user.employeeId;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.employeeId = token.employeeId;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
