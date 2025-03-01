import { Skeleton } from "@/components/ui/skeleton";

export const BillsCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden bg-white rounded-xl border border-indigo-100 transition-all duration-300 hover:shadow-lg hover:border-indigo-300">
      <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-12 translate-y-[-60%] bg-indigo-50/50 rounded-full" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-row items-center gap-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Skeleton className="size-6" />
            </div>
            <div className="flex flex-col items-start gap-1">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>

            <Skeleton className="h-7 w-28" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-indigo-100">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};
