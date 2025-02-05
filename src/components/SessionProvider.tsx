"use client";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

export const SessionProviderComponent = (props: SessionProviderProps) => {
  return <SessionProvider {...props} />;
};
