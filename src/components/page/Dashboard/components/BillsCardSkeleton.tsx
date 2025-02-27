import { Skeleton } from "@/components/ui/skeleton";

export const BillsCardSkeleton = () => {
  return (
    <div className="grid min-h-[99px] w-full p-4 border-2 border-indigo-100 rounded-xl shadow-xl gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-[16px] w-[16px]" />
          <Skeleton className="h-[20px] w-[60px]" />
          <Skeleton className="h-[22px] w-[60px]" />
          <Skeleton className="h-[22px] w-[60px]" />
        </div>
      </div>
    </div>
  );
};
