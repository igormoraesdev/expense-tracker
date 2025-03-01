import { Skeleton } from "@/components/ui/skeleton";
import { useCountAnimation } from "@/hooks/useCountAnimation";
import { useDashboardData } from "@/hooks/useDashboardData";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const currencyData = useMemo(
    () =>
      !isNaN(Number(animatedTotal)) ? formatCurrency(animatedTotal) : "R$ 0,00",
    [animatedTotal]
  );

  const isNegative = percentageChange < 0;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl group">
      <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16 bg-indigo-400/20 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 transform -translate-x-16 translate-y-16 bg-indigo-400/20 rounded-full blur-2xl" />

      <div className="relative flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-12 rounded-xl bg-white/10 backdrop-blur-sm">
              <DollarSign className="size-6 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white/80">Total Gasto</h3>
              <p className="text-xs text-white/60">Este Mês</p>
            </div>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
            {isNegative ? (
              <TrendingUp className="size-3 text-green-300" />
            ) : (
              <TrendingDown className="size-3 text-red-300" />
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
        {isLoading ? (
          <Skeleton className="h-12 w-48 bg-white/10" />
        ) : (
          <div className="flex items-end gap-2">
            <h2 className="text-3xl font-bold text-white">{currencyData}</h2>
            {isNegative ? (
              <ArrowUpRight className="size-5 text-green-300 mb-1" />
            ) : (
              <ArrowDownRight className="size-5 text-red-300 mb-1" />
            )}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
          <div>
            <p className="text-sm text-white/60 mb-1">Mês Anterior</p>
            {isLoading ? (
              <Skeleton className="h-6 w-24 bg-white/10" />
            ) : (
              <p className="text-lg font-semibold text-white">
                {formatCurrency(animatedPrevious)}
              </p>
            )}
          </div>
          <div>
            <p className="text-sm text-white/60 mb-1">
              Média dos últimos 3 meses
            </p>
            {isLoading ? (
              <Skeleton className="h-6 w-24 bg-white/10" />
            ) : (
              <p className="text-lg font-semibold text-white">
                {formatCurrency(animatedAverage)}
              </p>
            )}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-indigo-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};
