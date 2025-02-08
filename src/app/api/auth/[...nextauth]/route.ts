"use server";
import { db } from "@/drizzle";
import { users } from "@/drizzle/schema/users";
import bcrypt from "bcrypt";
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
    async authorize(credentials: { email: string; password: string }) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Email e senha são obrigatórios");
      }

      const user = await db.query.users.findFirst({
        where: (user, { eq }) => eq(user.email, credentials.email),
      });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const isValidPassword = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (!isValidPassword) {
        throw new Error("Senha incorreta");
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    },
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
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
  },
};

const handler = NextAuth(authOptions);

export { handler as DELETE, handler as GET, handler as POST, handler as PUT };
