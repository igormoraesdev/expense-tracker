import { Skeleton } from "@/components/ui/skeleton";

export const BillsCardSkeleton = () => {
  return (
    <div className="grid w-full p-6 sm:p-8 border-2 border-gray-200 rounded-md gap-4">
      <div className="flex items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Skeleton className="flex items-center justify-center rounded-full h-[36px] w-[36px] sm:h-[48px] sm:w-[48px]" />
          <Skeleton className="h-[20px] w-[120px]" />
        </div>
        <Skeleton className="h-[28px] w-[120px]" />
      </div>
      <Skeleton className="h-[20px] w-[150px]" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-[20px] w-[130px]" />
        <Skeleton className="h-[32px] w-[32px] rounded-full" />
      </div>
    </div>
  );
};
