import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardData } from "@/hooks/useDashboardData";
import { CircleDollarSign } from "lucide-react";
import { useMemo } from "react";

export const TotalSpend = () => {
  const { totalSpend, isLoading } = useDashboardData();
  const currencyData = useMemo(
    () =>
      !isNaN(Number(totalSpend))
        ? new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalSpend as number)
        : "R$ 0,00",
    [totalSpend]
  );

  return (
    <div className="flex flex-row justify-between items-center p-6 border-2 border-indigo-200 rounded-xl w-full max-w-[340px] h-[140px] shadow-xl">
      <div>
        <p className="mb-1 text-sm font-medium">Total spend this month</p>
        {isLoading ? (
          <Skeleton className="h-[36px] w-[195px] rounded-xl" />
        ) : (
          <p className="text-3xl font-medium text-indigo-900">{currencyData}</p>
        )}
      </div>

      <CircleDollarSign size={24} className="text-indigo-700" />
    </div>
  );
};
