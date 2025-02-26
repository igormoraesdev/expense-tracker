import { Skeleton } from "@/components/ui/skeleton";

export const HighExpenseChartSkeleton = () => {
  return (
    <div className="grid grid-cols-4 items-end justify-between w-full p-6 sm:p-8 gap-4 max-h-[400px]">
      <Skeleton className="h-[100px] w-full" />
      <Skeleton className="h-[250px] w-full" />
      <Skeleton className="h-[350px] w-full" />
      <Skeleton className="h-[150px] w-full" />
    </div>
  );
};
