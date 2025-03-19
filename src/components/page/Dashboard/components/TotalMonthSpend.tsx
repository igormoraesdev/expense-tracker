import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCountAnimation } from "@/hooks/useCountAnimation";
import { useDashboardData } from "@/hooks/useDashboardData";
import { cn, formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { DollarSign, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useMemo } from "react";

export const TotalMonthSpend = () => {
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

  const isNegative = percentageChange <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="col-span-1 w-full h-full order-2 sm:order-1"
    >
      <Card className="h-full bg-white/10 backdrop-blur-xl border-white/20 text-white overflow-hidden relative">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-indigo-300" />
            Despesas Totais
          </CardTitle>
          <CardDescription className="text-indigo-200">
            Total gasto no mês atual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-2 text-indigo-100">
            <div className="flex flex-col">
              <div className="flex flex-col items-center justify-between rounded-lg ">
                <div className="w-full flex flex-1 gap-4 items-center justify-between pb-7">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3">
                      {isLoading ? (
                        <Skeleton className="h-5 w-5 bg-white/10 rounded-md" />
                      ) : (
                        <DollarSign className="h-5 w-5 text-indigo-300" />
                      )}
                    </div>
                    {isLoading ? (
                      <Skeleton className="h-[40px] w-[150px] bg-white/10 rounded-md" />
                    ) : (
                      <p className="font-semibold text-indigo-100">
                        {currencyData}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full flex gap-5 pt-7 border-t border-white/10">
                  <div className="rounded-xl pl-4 lg:pl-0 p-1 sm:p-4 transition-all duration-300 hover:bg-indigo-400/10">
                    {isLoading ? (
                      <div className="flex flex-col gap-5">
                        <Skeleton className="h-[20px] w-[110px] bg-white/10 rounded-md" />
                        <Skeleton className="h-[28px] w-[110px] bg-white/10 rounded-md" />
                      </div>
                    ) : (
                      <>
                        <p className="text-xs sm:text-sm text-white/70 mb-2 font-medium">
                          Mês Anterior
                        </p>
                        <p className="text-lg font-semibold text-white">
                          {formatCurrency(animatedPrevious)}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="rounded-xl p-1 sm:p-4 transition-all duration-300 hover:bg-indigo-400/10">
                    {isLoading ? (
                      <div className="flex flex-col gap-5">
                        <Skeleton className="h-[20px] w-[110px] bg-white/10 rounded-md" />
                        <Skeleton className="h-[28px] w-[110px] bg-white/10 rounded-md" />
                      </div>
                    ) : (
                      <>
                        <p className="text-xs sm:text-sm text-white/70 mb-2 font-medium">
                          Média (3 meses)
                        </p>
                        <p className="text-lg font-semibold text-white">
                          {formatCurrency(animatedAverage)}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  "w-auto mt-4 flex items-center gap-1.5 py-1.5 rounded-full bg-transparent"
                )}
              >
                {isLoading ? (
                  <Skeleton className="h-4 w-10 bg-white/10 rounded-md" />
                ) : (
                  <>
                    {isNegative ? (
                      <TrendingDown className="size-3.5 text-green-200" />
                    ) : (
                      <TrendingUp className="size-3.5 text-red-200" />
                    )}
                  </>
                )}
                <span
                  className={`text-xs font-medium ${
                    isNegative ? "text-green-200" : "text-red-200"
                  }`}
                >
                  {isLoading ? (
                    <Skeleton className="h-4 w-24 bg-white/10 rounded-md" />
                  ) : (
                    <>
                      {isNegative
                        ? `${Math.abs(
                            animatedPercentage
                          )}% a menos que o mês anterior`
                        : `${animatedPercentage}% a mais que o mês anterior`}
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
