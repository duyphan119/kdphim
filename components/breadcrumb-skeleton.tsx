import { Skeleton } from './ui/skeleton';

type Props = {
  totalItems: number;
}

export default function BreadcrumbSkeleton({ totalItems }: Props) {
  return (
    <div className='flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground sm:gap-2.5'>
      {new Array(totalItems).fill("").map((_, index) => <Skeleton key={index} className='h-4 w-20' />)}
    </div>
  )
}