"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { useDashboardData } from "@/hooks/useDashboardData";
import { CategoryEnum } from "@/lib/entities/bills/enum";
import { formatCurrency, translateCategory } from "@/lib/utils";
import {
  BarChart3,
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
  from: "#4f46e5",
  to: "#7c3aed",
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
const CustomTooltip = ({ active, payload, translateFn }: any) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;
  const Icon = CATEGORY_ICONS[data.category as CategoryEnum];

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl border border-indigo-100 shadow-xl p-4 min-w-[220px] transition-all duration-200 animate-in fade-in-50 zoom-in-95">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg shadow-sm border border-indigo-100/50">
          <Icon className="w-5 h-5 text-indigo-600" strokeWidth={1.5} />
        </div>
        <span className="font-semibold text-indigo-900 text-base">
          {translateFn(data.category as CategoryEnum)}
        </span>
      </div>
      <div className="flex items-center justify-between bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-100/50">
        <span className="text-sm font-medium text-indigo-500">
          Gastos total
        </span>
        <span className="font-bold text-indigo-900">
          {formatCurrency(Number(data.amount))}
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
      <div className="flex flex-col order-2 sm:order-1">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-sm border border-indigo-100/50">
            <BarChart3 className="size-5 text-indigo-600" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold text-indigo-900">
            Gastos por categoria
          </h3>
        </div>
        <div className="flex flex-col gap-6 py-2">
          <div className="relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-white to-indigo-50 opacity-95" />
            <div className="absolute inset-0 backdrop-blur-[1px]" />
            <div className="absolute top-0 right-0 w-40 h-40 transform translate-x-20 -translate-y-20 bg-indigo-100/30 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 transform -translate-x-20 translate-y-20 bg-violet-100/30 rounded-full blur-2xl" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 rounded-2xl border border-indigo-200 backdrop-blur-sm" />
            </div>
            <div className="relative flex justify-center items-center w-full p-8 gap-4">
              <p className="text-base sm:text-lg font-semibold text-indigo-600">
                Nenhuma despesa registrada
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col order-2 sm:order-1">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-sm border border-indigo-100/50">
          <BarChart3 className="size-5 text-indigo-600" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-bold text-indigo-900">
          Gastos por categoria
        </h3>
      </div>

      <div className="relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl group">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-indigo-50 opacity-95" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 transform translate-x-20 -translate-y-20 bg-indigo-100/30 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 transform -translate-x-20 translate-y-20 bg-violet-100/30 rounded-full blur-2xl" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 transform -translate-y-1/2 bg-indigo-50/50 rounded-full blur-xl" />

        {/* Animated border on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-2xl border border-indigo-200 backdrop-blur-sm" />
        </div>

        <div className="relative p-6 sm:p-8">
          {isLoading ? (
            <HighExpenseChartSkeleton />
          ) : (
            <ChartContainer
              config={chartConfig}
              className="min-h-[400px] h-full w-full"
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
                      stopOpacity={0.9}
                    />
                    <stop
                      offset="95%"
                      stopColor={GRADIENT_COLORS.to}
                      stopOpacity={0.4}
                    />
                  </linearGradient>
                  <linearGradient
                    id="hoverGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={GRADIENT_COLORS.from}
                      stopOpacity={1}
                    />
                    <stop
                      offset="95%"
                      stopColor={GRADIENT_COLORS.to}
                      stopOpacity={0.6}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="#E2E8F0"
                  strokeDasharray="4"
                  strokeOpacity={0.7}
                />
                <XAxis
                  dataKey="category"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12, fontWeight: 500 }}
                  tickMargin={14}
                  tickFormatter={translateCategory}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12, fontWeight: 500 }}
                  tickMargin={10}
                  tickFormatter={(value) => formatCurrency(value, true)}
                />
                <ChartTooltip
                  content={<CustomTooltip translateFn={translateCategory} />}
                  cursor={{ fill: "rgba(79, 70, 229, 0.1)" }}
                  wrapperStyle={{ outline: "none" }}
                />
                <Bar
                  dataKey="amount"
                  fill="url(#colorGradient)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={70}
                  animationDuration={1200}
                  animationEasing="ease-in-out"
                  className="transition-all duration-300 hover:fill-[url(#hoverGradient)]"
                />
              </BarChart>
            </ChartContainer>
          )}
        </div>
      </div>
    </div>
  );
};
