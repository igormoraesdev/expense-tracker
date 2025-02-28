import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-r from-indigo-100/60 via-indigo-50/60 to-indigo-100/60",
        "relative overflow-hidden after:absolute after:inset-0 after:translate-x-[-100%]",
        "after:animate-[shimmer_1.5s_infinite] after:bg-gradient-to-r",
        "after:from-transparent after:via-white/60 after:to-transparent",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
