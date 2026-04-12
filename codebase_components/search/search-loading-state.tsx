import { Skeleton } from "@/components/ui/skeleton"

export function SearchLoadingState() {
  return (
    <div className="p-3 space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-start gap-3">
          <Skeleton className="size-4 rounded mt-1" />
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <Skeleton className="h-3 w-full rounded" />
            <Skeleton className="h-3 w-2/3 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

