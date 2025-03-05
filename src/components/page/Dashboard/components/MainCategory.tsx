import { ArrowUpRight } from "lucide-react";

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
import { CategoryEnum } from "@/lib/entities/bills/enum";
import { formatCurrency, translateCategory } from "@/lib/utils";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { Fragment, useMemo } from "react";

export const MainCategory = () => {
  const { bills, isLoading } = useDashboardData();

  const groupedByCategory = useMemo(() => {
    if (bills) {
      return Object.values(
        bills?.reduce(
          (
            acc: Record<
              CategoryEnum,
              { amount: number; category: CategoryEnum }
            >,
            bill
          ) => {
            const category = bill.category as CategoryEnum;
            const amount = parseFloat(bill.amount);

            if (!acc[category]) {
              acc[category] = {
                amount: 0,
                category,
              };
            }

            acc[category].amount += amount;

            return acc;
          },
          {} as Record<CategoryEnum, { amount: number; category: CategoryEnum }>
        )
      ).sort((a, b) => b.amount - a.amount);
    }
    return [];
  }, [bills]);

  const topCategory = useMemo(() => {
    if (groupedByCategory && groupedByCategory.length > 0) {
      return {
        category: translateCategory(groupedByCategory[0].category),
        amount: groupedByCategory[0].amount,
      };
    }
    return { category: "Sem dados", amount: 0 };
  }, [groupedByCategory]);

  const percentage = useMemo(() => {
    if (bills) {
      return (
        (topCategory.amount /
          bills.reduce((acc, bill) => acc + parseFloat(bill.amount), 0)) *
        100
      );
    }
    return 0;
  }, [bills, topCategory.amount]);

  const animatedAmount = useCountAnimation(topCategory.amount);
  const animatedPercentage = useCountAnimation(percentage);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-[32px] w-[100px] bg-white/10 rounded-md mb-2" />
          <Skeleton className="h-[28px] w-[150px] bg-white/10 rounded-md mb-2" />
          <Skeleton className="h-[28px] w-[200px] bg-white/10 rounded-md" />
        </div>
      );
    }

    return (
      <>
        <div className="text-2xl font-bold mb-2 text-purple-100">
          {topCategory.category}
        </div>
        <div className="text-xl font-semibold mb-2 text-purple-100">
          {formatCurrency(animatedAmount)}
        </div>
        {animatedPercentage > 0 && (
          <div className="flex items-center text-purple-300 text-sm">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <Fragment>{animatedPercentage.toFixed(2)}% do total gasto</Fragment>
          </div>
        )}
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="col-span-1 w-full h-full order-3 sm:order-2"
    >
      <Card className="w-full h-full bg-white/10 backdrop-blur-xl border-white/20 text-white overflow-hidden relative">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-purple-300" />
            Categoria Principal
          </CardTitle>
          <CardDescription className="text-purple-200">
            Sua maior categoria de gastos
          </CardDescription>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </motion.div>
  );
};
