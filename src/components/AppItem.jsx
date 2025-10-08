import { useNavigate } from 'react-router-dom'

function AppItem({ id, title, image, downloadCount, rating }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/app/${id}`)
  }

  return (
    <div 
      onClick={handleClick}
      className="rounded-lg bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer group"
    >
      {/* App Image */}
      <div className="mb-4 flex justify-center">
        <div className="h-32 w-32 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
          {image ? (
            <img 
              src={image} 
              alt={title}
              className="h-full w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full rounded-lg bg-gray-200"></div>
          )}
        </div>
      </div>

      {/* App Title */}
      <h3 className="mb-3 text-center text-sm font-medium text-gray-900 leading-tight group-hover:text-[#7C3AED] transition-colors duration-300">
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