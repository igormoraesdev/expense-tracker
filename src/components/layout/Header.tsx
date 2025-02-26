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
    <header className="z-1 fixed sm:relative flex items-center justify-between md:justify-end w-full max-h-[100px] px-6 py-4 bg-white border-b-2 border-indigo-100">
      <div className="md:hidden flex items-center justify-center gap-4 h-[100px] px-6 py-4">
        <Image src="/images/logo.svg" alt="Logo" width={162} height={50} />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="size-12 outline-none">
          <Avatar>
            <AvatarImage
              className="rounded-full"
              src={session.data?.user.image as string}
              alt="Avatar"
            />
            <AvatarFallback className="flex items-center justify-center rounded-full h-full w-full bg-indigo-700 text-white">
              {nameSplited}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="focus:bg-indigo-100 focus:text-indigo-700"
            onClick={() => signOut({ callbackUrl: "/auth" })}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
