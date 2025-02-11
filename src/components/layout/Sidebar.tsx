"use client";
import { cn } from "@/lib/utils";
import { CreditCard, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Expenses",
    url: "/dashboard/expenses",
    icon: CreditCard,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (url: string) => pathname === url;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-center gap-4 h-[100px] px-6 py-4">
        <Image src="/images/logo.svg" alt="Logo" width={162} height={50} />
      </div>
      <div className="flex flex-col gap-4 px-6 py-4">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className={cn(
              "flex justify-center items-center font-bold gap-2 rounded-md p-4 transition-all hover:bg-indigo-100 hover:text-indigo-700",
              isActive(item.url) && "bg-indigo-100 text-indigo-700"
            )}
          >
            <item.icon size={24} />
            <p>{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
