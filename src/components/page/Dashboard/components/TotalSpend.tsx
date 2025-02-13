import { Skeleton } from "@/components/ui/skeleton";
import { useGetTotalSpend } from "@/hooks/api/bills/useGetTotalSpend";
import { CircleDollarSign } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

export const TotalSpend = () => {
  const session = useSession();
  const { watch } = useFormContext();
  const date = watch("date");
  const { data, isPending } = useGetTotalSpend(
    {
      userId: session.data?.user.userId as string,
      date,
    },
    {
      enabled: !!session.data?.user.userId,
    }
  );
  const currencyData = useMemo(
    () =>
      data
        ? new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(data as number)
        : "R$ 0,00",
    [data]
  );

  return (
    <div className="flex flex-row justify-between items-center p-6 border-2 border-indigo-200 rounded-2xl w-full max-w-[340px] h-[140px]">
      <div>
        <p className="mb-1 text-sm font-bold">Total spend this month</p>
        {isPending ? (
          <Skeleton className="h-[36px] w-[195px] rounded-xl" />
        ) : (
          <p className="text-3xl font-bold text-indigo-900">{currencyData}</p>
        )}
      </div>
      <div className="flex items-center justify-center size-12 rounded-full bg-indigo-700">
        <CircleDollarSign className="text-white" />
      </div>
    </div>
  );
};
