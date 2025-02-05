"use server";
import NextAuth from "next-auth";
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
    async session(sessionParam: any) {
      sessionParam.user.id = sessionParam.token.sub!;
      return sessionParam;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as DELETE, handler as GET, handler as POST, handler as PUT };
