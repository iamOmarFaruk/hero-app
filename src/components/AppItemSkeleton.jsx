function AppItemSkeleton() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm animate-pulse">
      {/* App Image Skeleton */}
      <div className="mb-4 flex justify-center">
        <div className="h-32 w-32 rounded-lg bg-gray-200"></div>
      </div>

      {/* App Title Skeleton */}
      <div className="mb-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded mx-auto w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded mx-auto w-1/2"></div>
      </div>

      {/* Download Count and Rating Skeleton */}
      <div className="flex items-center justify-between">
        {/* Download Count Skeleton */}
        <div className="flex items-center">
          <div className="h-3 w-8 bg-gray-200 rounded mr-1"></div>
        </div>

        {/* Star Rating Skeleton */}
        <div className="flex items-center">
          <div className="h-3 w-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default AppItemSkeleton