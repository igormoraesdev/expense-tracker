import { Skeleton } from "@/components/ui/skeleton";

export const BillsCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl group">
      {/* Card background with glass morphism effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-indigo-50 opacity-95" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 transform translate-x-20 -translate-y-20 bg-indigo-100/30 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-40 h-40 transform -translate-x-20 translate-y-20 bg-violet-100/30 rounded-full blur-2xl" />
      <div className="absolute top-1/2 right-1/4 w-32 h-32 transform -translate-y-1/2 bg-indigo-50/50 rounded-full blur-xl" />

      <div className="relative p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-row items-center gap-4">
            <div className="flex items-center justify-center size-12 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-sm border border-indigo-100/50">
              <Skeleton className="size-6" />
            </div>
            <div className="flex flex-col items-start gap-1.5">
              <Skeleton className="h-5 w-36 bg-indigo-100/70" />
              <Skeleton className="h-6 w-28 rounded-lg bg-indigo-100/70" />
            </div>
          </div>
          <Skeleton className="h-8 w-28 rounded-lg bg-indigo-100/70" />
        </div>

        <div className="flex items-center justify-between gap-2 pt-3 border-t border-indigo-100">
          <Skeleton className="h-9 w-36 rounded-lg bg-indigo-100/70" />
          <Skeleton className="h-9 w-9 rounded-full bg-indigo-100/70" />
        </div>
      </div>
    </div>
  );
};
