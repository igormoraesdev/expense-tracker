import { Skeleton } from "@/components/ui/skeleton";
import { useCountAnimation } from "@/hooks/useCountAnimation";
import { useDashboardData } from "@/hooks/useDashboardData";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, DollarSign, TrendingUp } from "lucide-react";
import { useMemo } from "react";

export const TotalSpend = () => {
  const { totalSpendData, isLoading } = useDashboardData();

  const animatedTotal = useCountAnimation(
    Number(totalSpendData?.totalSpend) || 0
  );
  const animatedPrevious = useCountAnimation(
    Number(totalSpendData?.previousMonth) || 0
  );
  const animatedAverage = useCountAnimation(
    Number(totalSpendData?.average) || 0
  );
  const animatedPercentage = useCountAnimation(
    Number(totalSpendData?.percentageChange) || 0
  );
  const percentageChange = Number(totalSpendData?.percentageChange) || 0;

  const currencyData = useMemo(
    () =>
      !isNaN(Number(animatedTotal)) ? formatCurrency(animatedTotal) : "R$ 0,00",
    [animatedTotal]
  );

  const isNegative = percentageChange < 0;

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl group">
      {/* Card background with glass morphism effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 opacity-90" />
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 transform translate-x-20 -translate-y-20 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-40 h-40 transform -translate-x-20 translate-y-20 bg-indigo-300/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-32 h-32 transform -translate-x-1/2 -translate-y-1/2 bg-violet-400/10 rounded-full blur-2xl" />

      {/* Animated border on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-2xl border border-white/20 backdrop-blur-sm" />
      </div>

      {/* Content container */}
      <div className="relative p-7 h-full flex flex-col">
        {/* Header section */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center size-14 rounded-2xl bg-white/10 backdrop-blur-md shadow-inner border border-white/10">
              <DollarSign className="size-7 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Total</h3>
              <p className="text-sm text-white/70 mt-0.5">Este Mês</p>
            </div>
          </div>

          <div
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full ${
              isNegative ? "bg-green-500/20" : "bg-red-500/20"
            } backdrop-blur-md border ${
              isNegative ? "border-green-500/30" : "border-red-500/30"
            }`}
          >
            {isNegative ? (
              <TrendingUp className="size-3.5 text-green-300" />
            ) : (
              <TrendingUp className="size-3.5 text-red-300" />
            )}
            <span
              className={`text-xs font-medium ${
                isNegative ? "text-green-300" : "text-red-300"
              }`}
            >
              {isNegative ? Math.abs(animatedPercentage) : animatedPercentage}%
            </span>
          </div>
        </div>

        {/* Main value section */}
        {isLoading ? (
          <Skeleton className="h-14 w-56 bg-white/10 rounded-lg" />
        ) : (
          <div className="flex items-end gap-2 mb-2">
            <h2 className="text-4xl font-bold text-white tracking-tight">
              {currencyData}
            </h2>
            <div
              className={`flex items-center gap-1 mb-1.5 px-2 py-1 rounded-md ${
                isNegative ? "bg-green-500/10" : "bg-red-500/10"
              }`}
            >
              {isNegative ? (
                <ArrowUpRight className="size-4 text-green-300" />
              ) : (
                <ArrowUpRight className="size-4 text-red-300" />
              )}
            </div>
          </div>
        )}

        {/* Stats section with glass cards */}
        <div className="grid grid-cols-2 gap-5 mt-auto pt-7 border-t border-white/10">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 transition-all duration-300 hover:bg-white/10">
            <p className="text-sm text-white/70 mb-2 font-medium">
              Mês Anterior
            </p>
            {isLoading ? (
              <Skeleton className="h-7 w-28 bg-white/10 rounded-md" />
            ) : (
              <p className="text-lg font-semibold text-white">
                {formatCurrency(animatedPrevious)}
              </p>
            )}
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 transition-all duration-300 hover:bg-white/10">
            <p className="text-sm text-white/70 mb-2 font-medium">
              Média (3 meses)
            </p>
            {isLoading ? (
              <Skeleton className="h-7 w-28 bg-white/10 rounded-md" />
            ) : (
              <p className="text-lg font-semibold text-white">
                {formatCurrency(animatedAverage)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
