"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export const Header = () => {
  const session = useSession();

  const nameSplited = session.data?.user.name
    ?.split(" ")
    .map((n) => n[0].toUpperCase())
    .join("");

  return (
    <header className="flex items-center justify-between w-full px-6 py-4 bg-white border-b-2">
      <div className="flex items-center gap-4">
        <Image src="/icon.svg" alt="Logo" width={50} height={50} />
        <p className="font-bold text-xl">Expense Tracker</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="size-12 outline-none">
          <Avatar>
            <AvatarImage
              className="rounded-full"
              src={session.data?.user.image as string}
              alt="Avatar"
            />
            <AvatarFallback className="flex items-center justify-center rounded-full h-full w-full bg-gray-800 text-white">
              {nameSplited}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/auth" })}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
