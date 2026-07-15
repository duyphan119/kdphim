import BreadcrumbSkeleton from "@/components/breadcrumb-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return <div className="container p-4 mx-auto space-y-4">
    <BreadcrumbSkeleton totalItems={2} />

    <section className="grid gap-8 grid-cols-12 lg:grid-cols-10">
      <div className="col-span-12 md:col-span-3 lg:col-span-2 relative mx-auto aspect-[2/3] w-full overflow-hidden rounded-2xl">
        <Skeleton className="size-full" />
      </div>

      <div className="col-span-12 md:col-span-9 lg:col-span-8 space-y-6">
        <div>
          <Skeleton className="h-9 w-80" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-zinc-900 p-4 space-y-2">

            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-3.5 w-28" />
          </div>

          <div className="rounded-xl bg-zinc-900 p-4 space-y-2">
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-3.5 w-28" />
          </div>
        </div>

        <div className="space-y-3">
          <Skeleton className="h-3.5 w-16" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </section>
  </div>
}