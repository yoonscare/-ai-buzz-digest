import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="bg-white/80 backdrop-blur-xl border border-gray-200/50">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-8 bg-blue-100" />
                <Skeleton className="h-5 w-12 bg-orange-100" />
              </div>
              <Skeleton className="h-4 w-8 bg-gray-100" />
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <Skeleton className="aspect-video w-full rounded-lg bg-gray-100" />

            <div className="space-y-3">
              <Skeleton className="h-6 w-full bg-gray-100" />
              <Skeleton className="h-6 w-3/4 bg-gray-100" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-gray-50" />
                <Skeleton className="h-4 w-5/6 bg-gray-50" />
                <Skeleton className="h-4 w-2/3 bg-gray-50" />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Skeleton className="h-8 flex-1 bg-blue-100" />
                <Skeleton className="h-8 w-8 bg-gray-100" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
