import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      planId: string;
      phone?: string;
    } & DefaultSession["user"];
  }
}
