"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export const DashboardContent = () => {
  const session = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h1 className="text-xl">Dashboard</h1>
      <div>{session.data?.user.email}</div>
      <div>{session.data?.user.name}</div>
      <Image
        priority
        className="rounded-full"
        src={session.data?.user.image as string}
        alt="logo"
        width={80}
        height={80}
      />
    </div>
  );
};
