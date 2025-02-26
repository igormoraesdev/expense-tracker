"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useDashboardData } from "@/hooks/useDashboardData";
import { CategoryEnum } from "@/lib/entities/bills/enum";
import { useMemo } from "react";
import { HighExpenseChartSkeleton } from "./HighExpenseChartSkeleton";

const chartConfig = {
  desktop: {
    color: "#4F46E5",
  },
} satisfies ChartConfig;

export const HigherExpenseChart = () => {
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
      );
    }
    return [];
  }, [bills]);

  if (Number(bills?.length) <= 0) {
    return (
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold">Pending Bills</h3>
        <div className="flex flex-col gap-6 py-2">
          <div className="flex justify-center items-center w-full p-6 sm:p-8 bg-indigo-100 border-2 border-gray-200 rounded-md gap-4">
            <p className="text-sm sm:text-lg font-bold">Empty</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-bold mb-4">Spending by category</h3>
      <div className="flex flex-col gap-6 p-4 border-2 border-indigo-100 rounded-xl shadow-xl">
        {isLoading ? (
          <HighExpenseChartSkeleton />
        ) : (
          <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
            <BarChart accessibilityLayer data={groupedByCategory}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                dataKey="amount"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                content={<ChartTooltipContent currency="pt-BR" />}
              />
              <Bar dataKey="amount" fill="var(--color-desktop)" radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </div>
    </div>
  );
};
