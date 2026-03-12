import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      employeeId: string;
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    employeeId: string;
    role: string;
    name?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    employeeId: string;
    role: string;
  }
}
