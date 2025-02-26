import { Skeleton } from "@/components/ui/skeleton";

export const HighExpenseChartSkeleton = () => {
  return (
    <div className="grid grid-cols-4 items-end w-full p-6 sm:p-8 border-2 border-gray-200 rounded-md gap-4 max-h-[400px]">
      <Skeleton className="h-[100px] w-[80px]" />
      <Skeleton className="h-[250px] w-[80px]" />
      <Skeleton className="h-[350px] w-[80px]" />
      <Skeleton className="h-[150px] w-[80px]" />
    </div>
  );
};
