"use server";
import { db } from "@/drizzle";
import { users } from "@/drizzle/schema/users";
import { getUserByEmail } from "@/lib/actions/users";
import bcrypt from "bcrypt";
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

      const user = await getUserByEmail(credentials.email as string);

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
        userId: user.id,
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
        const existingUser = await getUserByEmail(user.email as string);

        if (!existingUser) {
          const [newUser] = await db
            .insert(users)
            .values({
              email: user.email!,
              name: user.name!,
              password: "",
            })
            .returning();

          user.id = newUser.id;
        } else {
          user.id = existingUser.id;
        }
      }
      return true;
    },
    async session({ session, token }: any) {
      return {
        ...session,
        user: {
          ...session.user,
          userId: token.userId,
        },
      };
    },
    async jwt({ user, token, trigger, session }: any) {
      if (trigger === "update") {
        token.userId = session.userId;
      }

      if (user) {
        return { ...token, userId: user.id };
      }
      return token;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  },
  pages: {
    signIn: "/auth",
  },
};

const handler = NextAuth(authOptions);

export { handler as DELETE, handler as GET, handler as POST, handler as PUT };
