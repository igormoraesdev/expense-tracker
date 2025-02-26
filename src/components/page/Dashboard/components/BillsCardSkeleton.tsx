import { Skeleton } from "@/components/ui/skeleton";

export const BillsCardSkeleton = () => {
  return (
    <div className="grid w-full p-4 border-2 border-indigo-100 rounded-md shadow-xl gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col sm:flex-row items-baseline sm:items-center gap-4">
          <Skeleton className="rounded-full h-[36px] w-[36px] sm:h-[48px] sm:w-[48px]" />
          <Skeleton className="h-[20px] w-[120px]" />
          <Skeleton className="h-[22px] w-[70px]" />
        </div>
        <Skeleton className="h-[28px] w-[120px]" />
      </div>
    </div>
  );
};
