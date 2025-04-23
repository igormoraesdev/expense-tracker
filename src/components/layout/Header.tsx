"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { menuItems } from "@/lib/utils/constants";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { motion } from "framer-motion";
import { Bell, ChevronRight, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../Logo";

export const Header = () => {
  const session = useSession();
  const pathname = usePathname();
  const isActive = (url: string) => pathname === url;

  const nameSplited = session.data?.user.name
    ?.split(" ")
    .map((n) => n[0].toUpperCase())
    .join("");

  return (
    <>
      <header className="sticky top-0 z-[50] flex items-center justify-between w-full h-[90px] px-6 bg-white/10 backdrop-blur-xl border-b border-indigo-100/20 text-white bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 shadow-lg">
        <div className="md:hidden">
          <Logo className="mx-auto" color="#c7d2fe" />
        </div>

        <div className="flex items-center gap-6 ml-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center justify-center size-10 rounded-xl text-purple-100 hover:text-white hover:bg-indigo-500/20 hover:shadow-md transition-all duration-200"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 size-2 bg-indigo-400 rounded-full animate-pulse" />
          </motion.button>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 p-2 rounded-xl outline-none transition-all duration-200 hover:bg-indigo-500/20 hover:shadow-md group">
              <Avatar className="flex items-center justify-center size-10 rounded-full overflow-hidden border-2 border-indigo-300/30 bg-white/10 transition-shadow duration-200 group-hover:shadow-md">
                {session.data?.user.image ? (
                  <Image
                    width={40}
                    height={40}
                    src={session.data?.user.image as string}
                    alt="Avatar"
                    className="object-cover z-10"
                    priority
                  />
                ) : (
                  <AvatarFallback className="flex items-center justify-center text-sm font-medium text-indigo-100 bg-white/10">
                    {nameSplited}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-medium text-indigo-100 leading-none">
                  {session.data?.user.name}
                </span>
                <span className="text-xs text-indigo-300/80">
                  {session.data?.user.email}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 mt-2 bg-white/10 backdrop-blur-xl border-white/20 text-white shadow-xl"
            >
              <DropdownMenuLabel className="text-xs font-medium text-indigo-300">
                Minha Conta
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/20" />
              <DropdownMenuItem
                className="gap-2 text-sm cursor-pointer text-red-300 hover:bg-white/10 hover:text-red-200 focus:bg-white/10 focus:text-red-200 transition-colors duration-200"
                onClick={() => signOut({ callbackUrl: "/auth" })}
              >
                <LogOut size={16} />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <nav className="md:hidden sticky top-[90px] z-[50] w-full bg-white/10 backdrop-blur-xl border-b border-white/20 text-white bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 shadow-md overflow-x-auto">
        <div
          className="flex items-center gap-2 px-4 py-3 overflow-x-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#E0E7FF",
          }}
        >
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className={cn(
                "flex items-center gap-2 shrink-0 px-4 py-2 rounded-lg transition-all duration-200",
                "hover:bg-indigo-500/20 hover:text-indigo-100 hover:shadow-md",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300",
                isActive(item.url)
                  ? "bg-indigo-500/20 text-indigo-100 shadow-md"
                  : "text-indigo-200"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center size-8 rounded-lg transition-all duration-200",
                  isActive(item.url)
                    ? "bg-white/10 shadow-inner text-indigo-300"
                    : "text-indigo-200"
                )}
              >
                <item.icon size={18} />
              </div>
              <span className="text-sm font-medium whitespace-nowrap">
                {item.title}
              </span>
              <ChevronRight
                size={14}
                className={cn(
                  "transition-all duration-200",
                  isActive(item.url) ? "opacity-100" : "opacity-0"
                )}
              />
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};
