import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonProps {
  columns: number;
  count: number;
}

export function SkeletonCard({ columns, count }: SkeletonProps) {
  return (
    <div className={`w-full grid grid-cols-${columns} gap-4`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-[120px] md:h-[205px] w-full rounded-xl bg-label-disable" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded-xl bg-label-disable" />
            <Skeleton className="h-4 w-40 rounded-xl bg-label-disable" />
          </div>
        </div>
      ))}
    </div>
  );
}
