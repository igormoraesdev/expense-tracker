import { signIn, signOut } from "next-auth/react";

export const login = async () => {
  await signIn("google", { callbackUrl: "/dashboard" });
};

export const logout = async () => {
  await signOut({ redirect: true, callbackUrl: "/" });
};
