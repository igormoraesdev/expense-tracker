"use client";
import { cn } from "@/lib/utils";
import { ChevronRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../Logo";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "Visão geral das suas finanças",
  },
  // {
  //   title: "Expenses",
  //   url: "/dashboard/expenses",
  //   icon: Banknote,
  // },
];

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (url: string) => pathname === url;

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-white via-white to-indigo-50/20">
      {/* Header */}
      <div className="flex items-center h-[100px] px-6 border-b border-indigo-100/50 bg-white/50 backdrop-blur-sm">
        <Logo className="mx-auto" />
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col gap-1 p-4">
        <div className="px-2 mb-3">
          <h2 className="text-xs font-semibold text-indigo-950/50 uppercase tracking-wider">
            Principal
          </h2>
        </div>
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className={cn(
              "group relative flex items-center gap-3 rounded-xl p-3 transition-all duration-200",
              "hover:bg-gradient-to-r hover:from-indigo-50 hover:to-indigo-100/50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
              isActive(item.url)
                ? "bg-gradient-to-r from-indigo-50 to-indigo-100/50 text-indigo-700 shadow-[0_2px_4px_rgba(99,102,241,0.05)]"
                : "text-indigo-950/70 hover:text-indigo-700"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center size-9 rounded-lg transition-all duration-200",
                isActive(item.url)
                  ? "bg-white shadow-sm text-indigo-600"
                  : "text-indigo-950/70 group-hover:text-indigo-600 group-hover:bg-white group-hover:shadow-sm"
              )}
            >
              <item.icon size={20} className="shrink-0" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium leading-none mb-1">
                {item.title}
              </span>
              <span className="text-xs text-indigo-950/50 group-hover:text-indigo-600/70">
                {item.description}
              </span>
            </div>
            <ChevronRight
              size={16}
              className={cn(
                "absolute right-3 opacity-0 transition-all duration-200",
                "group-hover:opacity-100 group-hover:translate-x-1",
                isActive(item.url) && "opacity-100"
              )}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
