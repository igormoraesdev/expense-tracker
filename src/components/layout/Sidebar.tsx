"use client";
import { useDetectTypeUser } from "@/hooks/useDetectTypeUser";
import { PlansIdEnum } from "@/lib/entities/plans/enum";
import { cn } from "@/lib/utils";
import { menuItems } from "@/lib/utils/constants";
import { ChevronRight, CreditCard, Crown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../Logo";
import { Skeleton } from "../ui/skeleton";
export function Sidebar() {
  const { userPlan, isPending, totalBills, userFreeExceeded } =
    useDetectTypeUser();
  const pathname = usePathname();
  const isActive = (url: string) => pathname === url;

  if (isPending) {
    return (
      <div className="flex flex-col h-full w-full bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white border-r border-indigo-100/20">
        <div className="flex items-center h-[90px] px-6">
          <Logo className="mx-auto" color="#c7d2fe" />
        </div>
        <div className="flex-1 flex flex-col gap-4 p-4 mt-2">
          <div className="px-3 mb-3">
            <h2 className="text-xs font-semibold text-indigo-300/70 uppercase tracking-wider">
              Principal
            </h2>
          </div>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-[76px] w-full rounded-xl bg-white/5"
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white border-r border-indigo-100/20">
      <div className="flex items-center h-[90px] px-6">
        <Logo className="mx-auto" color="#c7d2fe" />
      </div>
      <div className="flex-1 flex flex-col gap-4 p-4 mt-2">
        <div className="px-3 mb-3">
          <h2 className="text-xs font-semibold text-indigo-300/70 uppercase tracking-wider">
            Principal
          </h2>
        </div>
        {menuItems
          .filter((item) => item.plans.includes(userPlan?.id))
          .map((item) => (
            <div key={item.description}>
              <Link
                href={item.url}
                className={cn(
                  "min-h-[76px] group relative flex items-center gap-3 rounded-xl p-3 transition-all duration-200",
                  "hover:bg-white/10 hover:shadow-md",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70",
                  isActive(item.url)
                    ? "bg-white/10 text-indigo-100 shadow-[0_2px_4px_rgba(99,102,241,0.15)]"
                    : "text-indigo-200/90 hover:text-indigo-100"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center size-10 rounded-lg transition-all duration-200",
                    isActive(item.url)
                      ? "bg-indigo-600/20 shadow-inner text-indigo-300"
                      : "text-indigo-300/70 group-hover:text-indigo-300 group-hover:bg-indigo-600/10"
                  )}
                >
                  <item.icon size={20} className="shrink-0" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium leading-none mb-1">
                    {item.title}
                  </span>
                  <span className="text-xs text-indigo-300/60 group-hover:text-indigo-300/80">
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
            </div>
          ))}
      </div>
      <div className="px-4 py-3 mb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {userPlan?.id === PlansIdEnum.Gratuito ? (
              <CreditCard size={16} className="text-indigo-300" />
            ) : (
              <Crown size={16} className="text-yellow-300" />
            )}
            <span className="text-sm font-medium text-indigo-200">
              {userPlan?.title}
            </span>
          </div>
        </div>

        {userPlan?.id === PlansIdEnum.Gratuito && (
          <>
            <div className="w-full h-2 bg-indigo-900/50 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${totalBills * 10}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-indigo-300/70">
                {totalBills}/10 Despesas
              </span>
              {userFreeExceeded && (
                <span className="text-xs text-yellow-300">Limite atingido</span>
              )}
            </div>
          </>
        )}
      </div>
      <div className="p-4 mt-auto border-t border-indigo-100/20 bg-gradient-to-t from-indigo-950/40 to-transparent">
        <div className="flex items-center justify-center">
          <span className="text-xs text-indigo-200">
            Expense Tracker © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
}
