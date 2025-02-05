"use server";
import { db } from "@/drizzle";
import { users } from "@/drizzle/schema/users";
import { eq } from "drizzle-orm";
import NextAuth, { Account, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        id: {},
        name: {},
        password: {},
      },
      authorize: async (data) => ({
        email: data?.email as string,
        id: data?.id as string,
        name: data?.name as string,
        password: data?.password as string,
      }),
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: User | AdapterUser;
      account: Account | null;
    }) {
      if (account?.provider === "google") {
        const existingUser = await db.query.users.findFirst({
          where: eq(users.email, user.email!),
        });

        if (!existingUser) {
          await db.insert(users).values({
            email: user.email!,
            name: user.name!,
            password: "",
          });
        }
      }
      return true;
    },
    async session(sessionParam: any) {
      sessionParam.user.id = sessionParam.token.sub!;
      return sessionParam;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
};

export const handler = NextAuth(authOptions);

export { handler as DELETE, handler as GET, handler as POST, handler as PUT };
