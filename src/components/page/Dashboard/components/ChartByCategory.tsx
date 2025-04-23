"use client";

import { motion } from "framer-motion";
import { PieChart as PieChartIcon } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardData } from "@/hooks/useDashboardData";
import { CategoryEnum } from "@/lib/entities/bills/enum";
import { formatCurrency, translateCategory } from "@/lib/utils/index";
import { useMemo } from "react";

const chartConfig = {
  desktop: {
    color: "#4F46E5",
  },
} satisfies ChartConfig;

const CATEGORY_COLORS = {
  [CategoryEnum.Card]: "#4F46E5",
  [CategoryEnum.Food]: "#EC4899",
  [CategoryEnum.Health]: "#10B981",
  [CategoryEnum.House]: "#F59E0B",
  [CategoryEnum.Phone]: "#3B82F6",
  [CategoryEnum.Utilities]: "#8B5CF6",
  [CategoryEnum.Other]: "#6B7280",
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="p-4 bg-white backdrop-blur-xl border border-white/20 shadow-lg rounded-md text-white overflow-hidden relative">
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="flex items-center gap-3 mb-3">
        <div
          className="p-2 rounded-lg shadow-sm border border-indigo-100/50"
          style={{ backgroundColor: `${data.fill}20` }}
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: data.fill }}
          />
        </div>
        <span className="font-semibold text-indigo-900 text-base">
          {translateCategory(data.category as CategoryEnum)}
        </span>
      </div>
      <div className="flex items-center justify-between bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-100/50">
        <span className="text-sm font-medium text-indigo-500">Valor</span>
        <span className="font-bold text-indigo-900">
          {formatCurrency(Number(data.value))}
        </span>
      </div>
      <div className="flex items-center justify-between bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-100/50 mt-2">
        <span className="text-sm font-medium text-indigo-500 mr-4">
          Porcentagem
        </span>
        <span className="font-bold text-indigo-900">
          {data.percentage.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};

export const ChartByCategory = () => {
  const { bills, isLoading } = useDashboardData();

  const chartData = useMemo(() => {
    if (bills) {
      const groupedByCategory = Object.values(
        bills?.reduce(
          (
            acc: Record<
              CategoryEnum,
              { value: number; category: CategoryEnum }
            >,
            bill
          ) => {
            const category = bill.category as CategoryEnum;
            const amount = parseFloat(bill.amount);

            if (!acc[category]) {
              acc[category] = {
                value: 0,
                category,
              };
            }

            acc[category].value += amount;

            return acc;
          },
          {} as Record<CategoryEnum, { value: number; category: CategoryEnum }>
        )
      ).sort((a, b) => b.value - a.value);

      const totalAmount = groupedByCategory.reduce(
        (total, item) => total + item.value,
        0
      );

      return groupedByCategory.map((item) => ({
        ...item,
        percentage: (item.value / totalAmount) * 100,
        fill:
          CATEGORY_COLORS[item.category] || CATEGORY_COLORS[CategoryEnum.Other],
      }));
    }
    return [];
  }, [bills]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-[400px]">
          <Skeleton className="h-[200px] w-[200px] bg-white/10 rounded-full" />
        </div>
      );
    }

    if (chartData.length === 0) {
      return (
        <div className="flex items-center justify-center h-[400px] text-purple-200">
          <p className="text-center">Nenhum dado disponível para exibição</p>
        </div>
      );
    }

    return (
      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              animationDuration={1000}
              animationEasing="ease-in-out"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <ChartTooltip
              content={<CustomTooltip />}
              wrapperStyle={{ outline: "none" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="col-span-1"
    >
      <Card className="h-full bg-white/10 backdrop-blur-xl border-white/20 text-white overflow-hidden relative">
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-20 -left-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />

        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5 text-purple-300" />
            Gastos por Categoria
          </CardTitle>
          <CardDescription className="text-purple-200">
            Distribuição dos seus gastos por categoria
          </CardDescription>
        </CardHeader>

        <CardContent>{renderContent()}</CardContent>
      </Card>
    </motion.div>
  );
};
