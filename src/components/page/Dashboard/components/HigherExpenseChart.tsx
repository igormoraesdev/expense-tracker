"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { useDashboardData } from "@/hooks/useDashboardData";
import { CategoryEnum } from "@/lib/entities/bills/enum";
import {
  CreditCard,
  Ham,
  HeartPulse,
  House,
  Package,
  Paperclip,
  Phone,
} from "lucide-react";
import { useMemo } from "react";
import { HighExpenseChartSkeleton } from "./HighExpenseChartSkeleton";

const chartConfig = {
  desktop: {
    color: "#4F46E5",
  },
} satisfies ChartConfig;

// Gradient colors for the chart
const GRADIENT_COLORS = {
  from: "#4F46E5",
  to: "#818CF8",
};

// Category icons mapping
const CATEGORY_ICONS = {
  [CategoryEnum.Card]: CreditCard,
  [CategoryEnum.Food]: Ham,
  [CategoryEnum.Health]: HeartPulse,
  [CategoryEnum.House]: House,
  [CategoryEnum.Phone]: Phone,
  [CategoryEnum.Utilities]: Package,
  [CategoryEnum.Other]: Paperclip,
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;
  const Icon = CATEGORY_ICONS[data.category as CategoryEnum];

  return (
    <div className="bg-white rounded-lg border border-indigo-100 shadow-lg p-3 min-w-[200px]">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-indigo-50 rounded-md">
          <Icon className="w-4 h-4 text-indigo-600" />
        </div>
        <span className="font-medium text-indigo-900">{data.category}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-indigo-400">Total amount</span>
        <span className="font-semibold text-indigo-900">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(data.amount)}
        </span>
      </div>
    </div>
  );
};

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
      ).sort((a, b) => b.amount - a.amount);
    }
    return [];
  }, [bills]);

  if (Number(bills?.length) <= 0) {
    return (
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold text-indigo-900">
          Spending by category
        </h3>
        <div className="flex flex-col gap-6 py-2">
          <div className="flex justify-center items-center w-full p-6 sm:p-8 bg-indigo-50 border border-indigo-100 rounded-xl gap-4">
            <p className="text-sm sm:text-lg font-semibold text-indigo-600">
              No expenses registered
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-bold text-indigo-900 mb-4">
        Spending by category
      </h3>
      <div className="relative overflow-hidden bg-white rounded-xl border border-indigo-100 transition-all duration-300 hover:shadow-lg hover:border-indigo-300">
        <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-12 translate-y-[-60%] bg-indigo-50/50 rounded-full" />

        <div className="relative p-6">
          {isLoading ? (
            <HighExpenseChartSkeleton />
          ) : (
            <ChartContainer
              config={chartConfig}
              className="min-h-[400px] w-full"
            >
              <BarChart data={groupedByCategory}>
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={GRADIENT_COLORS.from}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={GRADIENT_COLORS.to}
                      stopOpacity={0.3}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="#E2E8F0"
                  strokeDasharray="4"
                />
                <XAxis
                  dataKey="category"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  tickMargin={12}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  tickMargin={12}
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      notation: "compact",
                    }).format(value)
                  }
                />
                <ChartTooltip
                  cursor={{ fill: "rgba(79, 70, 229, 0.1)" }}
                  content={<CustomTooltip />}
                />
                <Bar
                  dataKey="amount"
                  fill="url(#colorGradient)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={60}
                />
              </BarChart>
            </ChartContainer>
          )}
        </div>
      </div>
    </div>
  );
};
