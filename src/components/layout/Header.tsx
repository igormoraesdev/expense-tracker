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
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Bell, ChevronRight, LayoutDashboard, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "Visão geral das suas finanças",
  },
];

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
      <header className="sticky top-0 z-[50] flex items-center justify-between w-full h-[100px] px-6 bg-gradient-to-r from-white to-indigo-50/30 border-b border-indigo-100/50 backdrop-blur-sm">
        <div className="md:hidden">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={162}
            height={50}
            className="transition-transform duration-200 hover:scale-[0.98]"
          />
        </div>

        <div className="flex items-center gap-6 ml-auto">
          {/* Notifications */}
          <button className="relative flex items-center justify-center size-10 rounded-xl text-indigo-950/70 hover:text-indigo-600 hover:bg-white hover:shadow-sm transition-all duration-200">
            <Bell size={20} />
            <span className="absolute top-2 right-2 size-2 bg-indigo-500 rounded-full" />
          </button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 p-2 rounded-xl outline-none transition-all duration-200 hover:bg-white hover:shadow-sm group">
              <Avatar className="size-10 rounded-lg overflow-hidden border-2 border-indigo-100 bg-indigo-50 transition-shadow duration-200 group-hover:shadow-sm">
                <AvatarImage
                  src={session.data?.user.image as string}
                  alt="Avatar"
                  className="object-cover"
                />
                <AvatarFallback className="flex items-center justify-center text-sm font-medium text-indigo-700 bg-indigo-50">
                  {nameSplited}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-medium text-indigo-950 leading-none">
                  {session.data?.user.name}
                </span>
                <span className="text-xs text-indigo-950/50">
                  {session.data?.user.email}
                </span>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuLabel className="text-xs font-medium text-indigo-950/50">
                Minha Conta
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 text-sm cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700"
                onClick={() => signOut({ callbackUrl: "/auth" })}
              >
                <LogOut size={16} />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden sticky top-[100px] z-[50] w-full bg-white border-b border-indigo-100/50 shadow-sm">
        <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto scrollbar-none">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className={cn(
                "flex items-center gap-2 shrink-0 px-4 py-2 rounded-lg transition-all duration-200",
                "hover:bg-indigo-50 hover:text-indigo-700",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                isActive(item.url)
                  ? "bg-indigo-50 text-indigo-700 shadow-sm"
                  : "text-indigo-950/70"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center size-8 rounded-lg transition-all duration-200",
                  isActive(item.url)
                    ? "bg-white shadow-sm text-indigo-600"
                    : "text-indigo-950/70"
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
