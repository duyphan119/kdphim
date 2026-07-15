import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type MovieCardSkeletonProps = {
  direction?: "row" | "col";
  className?: string;
};

export function MovieCardSkeleton({
  direction = "col",
  className,
}: MovieCardSkeletonProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md",
        direction === "col" ? "block space-y-3" : "flex gap-3",
        className
      )}
    >
      <div
        className={cn(
          "relative aspect-[2/3] overflow-hidden rounded-md",
          direction === "col"
            ? "w-full"
            : "w-1/2 flex-shrink-0"
        )}
      >
        <Skeleton className="h-full w-full rounded-md" />

        {/* Episode badge */}
        <Skeleton className="absolute top-2 left-2 h-5 w-20 rounded-md" />

        {/* Language badge */}
        <Skeleton className="absolute bottom-2 left-2 h-5 w-12 rounded-md" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}