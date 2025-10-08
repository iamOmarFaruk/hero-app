function AppItem({ title, image, downloadCount, rating }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* App Image */}
      <div className="mb-4 flex justify-center">
        <div className="h-32 w-32 rounded-lg bg-gray-200 flex items-center justify-center">
          {image ? (
            <img 
              src={image} 
              alt={title}
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <div className="h-full w-full rounded-lg bg-gray-200"></div>
          )}
        </div>
      </div>

      {/* App Title */}
      <h3 className="mb-3 text-center text-sm font-medium text-gray-900 leading-tight">
        {title}
      </h3>

      {/* Download Count and Rating */}
      <div className="flex items-center justify-between text-xs">
        {/* Download Count */}
        <div className="flex items-center text-green-600">
          <span className="mr-1">↓</span>
          <span className="font-medium">{downloadCount}</span>
        </div>

        {/* Star Rating */}
        <div className="flex items-center text-orange-400">
          <span className="mr-1">★</span>
          <span className="font-medium text-gray-700">{rating}</span>
        </div>
      </div>
    </div>
  )
}

export default AppItem