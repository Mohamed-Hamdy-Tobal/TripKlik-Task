import { Skeleton } from "@/components/ui/skeleton";

export const ReviewSkeleton = () => (
  <div className="min-h-screen py-8">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <Skeleton className="h-10 w-1/3" />
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 space-y-4">
        <Skeleton className="h-6 w-1/4" />
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-24 w-full sm:w-1/2" />
              <Skeleton className="h-24 w-full sm:w-1/2" />
            </div>
          ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 space-y-4">
        <Skeleton className="h-6 w-1/3" />
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
      </div>
    </div>
  </div>
);
