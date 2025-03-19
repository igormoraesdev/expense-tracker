import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllBills } from "@/hooks/api/bills/useGetAllBills";

import { useCountAnimation } from "@/hooks/useCountAnimation";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { DollarSign, Wallet } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
export const TotalSpend = () => {
  const session = useSession();
  const { data, isLoading } = useGetAllBills({
    userId: session.data?.user.userId as string,
    page: 1,
    limit: 10,
  });

  const animatedTotal = useCountAnimation(Number(data?.totalSpend) || 0);

  const currencyData = useMemo(
    () =>
      !isNaN(Number(animatedTotal)) ? formatCurrency(animatedTotal) : "R$ 0,00",
    [animatedTotal]
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="h-full w-full max-w-[400px]"
    >
      <Card className="h-full bg-white/10 backdrop-blur-xl border-white/20 text-white overflow-hidden relative">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-indigo-300" />
            Total Gasto
          </CardTitle>
          <CardDescription className="text-indigo-200">
            Total gasto no ano atual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-2 text-indigo-100">
            <div className="flex flex-col">
              <div className="flex flex-col items-center justify-between rounded-lg ">
                <div className="w-full flex flex-1 gap-4 items-center justify-between pb-7">
                  <div className="flex flex-row items-start sm:items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
                      {isLoading ? (
                        <Skeleton className="h-5 w-5 bg-white/10 rounded-md" />
                      ) : (
                        <DollarSign className="h-5 w-5 text-white" />
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
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
