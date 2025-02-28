import { Skeleton } from "@/components/ui/skeleton";

export const BillsCardSkeleton = () => {
  return (
    <div className="w-full p-4 border-2 border-indigo-100 rounded-xl bg-white">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Icon and Title */}
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-lg" /> {/* Icon */}
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-5 w-32" /> {/* Title */}
              <Skeleton className="h-3.5 w-24" /> {/* Subtitle */}
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />{" "}
            {/* Category Badge */}
            <Skeleton className="h-6 w-16 rounded-full" /> {/* Status Badge */}
          </div>
        </div>

        {/* Menu Button */}
        <Skeleton className="size-8 rounded-lg" />
      </div>

      {/* Expandable Content */}
      <div className="mt-4 px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" /> {/* Due Date Label */}
            <Skeleton className="h-4 w-24" /> {/* Due Date Value */}
          </div>
          <Skeleton className="h-6 w-24" /> {/* Amount */}
        </div>
      </div>
    </div>
  );
};
