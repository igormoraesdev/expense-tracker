import { Skeleton } from "@/components/ui/skeleton";

export const HighExpenseChartSkeleton = () => {
  return (
    <div className="grid grid-cols-4 items-end w-full p-6 sm:p-8 gap-4 max-h-[400px]">
      <Skeleton className="h-[100px] w-[31px] sm:w-[80px]" />
      <Skeleton className="h-[250px] w-[31px] sm:w-[80px]" />
      <Skeleton className="h-[350px] w-[31px] sm:w-[80px]" />
      <Skeleton className="h-[150px] w-[31px] sm:w-[80px]" />
    </div>
  );
};
